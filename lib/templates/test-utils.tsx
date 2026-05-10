import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { TemplateProvider } from "./provider";
import type { BrandConfig } from "./types";

export function renderWithTemplate(
  ui: ReactElement,
  { config, ...options }: { config: BrandConfig } & Omit<RenderOptions, "wrapper">,
): RenderResult {
  return render(ui, {
    ...options,
    wrapper: ({ children }) => <TemplateProvider config={config}>{children}</TemplateProvider>,
  });
}
