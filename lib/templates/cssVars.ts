import type { CSSProperties } from "react";
import type { ThemeTokens } from "./types";

export function themeToCssVars(theme: ThemeTokens): CSSProperties {
  const out: Record<string, string> = {};

  for (const [k, v] of Object.entries(theme.palette)) {
    if (typeof v === "string") out[`--brand-color-${k}`] = v;
  }
  for (const [k, v] of Object.entries(theme.fonts)) {
    if (typeof v === "string") out[`--brand-font-${k}`] = v;
  }
  for (const [k, v] of Object.entries(theme.radius)) {
    if (typeof v === "string") out[`--brand-radius-${k}`] = v;
  }

  // CSSProperties does not type CSS custom properties; the cast is intentional and matches React's accepted style-prop usage.
  return out as CSSProperties;
}
