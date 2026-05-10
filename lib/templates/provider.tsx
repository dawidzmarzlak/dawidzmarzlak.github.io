"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { BrandConfig, MediaRegistry, ThemeTokens } from "./types";
import { themeToCssVars } from "./cssVars";

const TemplateContext = createContext<BrandConfig | null>(null);

export interface TemplateProviderProps {
  config: BrandConfig;
  children: ReactNode;
  className?: string;
}

export function TemplateProvider({ config, children, className }: TemplateProviderProps) {
  const style = useMemo(() => themeToCssVars(config.theme), [config]);
  return (
    <TemplateContext.Provider value={config}>
      <div className={className} style={style} data-brand={config.meta.slug}>
        {children}
      </div>
    </TemplateContext.Provider>
  );
}

function useTemplate(): BrandConfig {
  const ctx = useContext(TemplateContext);
  if (!ctx) {
    throw new Error("useTemplate must be used inside <TemplateProvider>");
  }
  return ctx;
}

export function useTheme(): ThemeTokens {
  return useTemplate().theme;
}

export function useContent<T>(section: string): T {
  const content = useTemplate().content;
  if (!(section in content)) {
    throw new Error(`useContent: section "${section}" missing from BrandConfig.content`);
  }
  return content[section] as T;
}

export function useMedia<T extends string | string[]>(key: string): T {
  const media: MediaRegistry = useTemplate().media;
  if (!(key in media)) {
    throw new Error(`useMedia: key "${key}" missing from BrandConfig.media`);
  }
  return media[key] as T;
}

export function useMeta() {
  return useTemplate().meta;
}
