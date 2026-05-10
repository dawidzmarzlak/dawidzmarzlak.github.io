// Single source of truth for the TemplateProvider's React context object.
// Both the provider (lib/templates/provider.tsx) and the shared-chrome bridge
// (components/showcase/shared/_templateBridge.ts) import this same instance,
// so context values flow through whichever entry point reads them.
import { createContext } from "react";
import type { BrandConfig } from "./types";

export const TemplateContext = createContext<BrandConfig | null>(null);
