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

/**
 * Append an alpha channel to a hex color. Normalises 3-digit shorthand to 6-digit
 * before appending so the resulting 8-digit hex is always valid CSS.
 *
 *   withAlpha("#5C4033", 20) → "#5C403333"
 *   withAlpha("#fff", 50)    → "#ffffff80"
 */
export function withAlpha(hex: string, alphaPercent: number): string {
  if (!/^#[0-9a-fA-F]{3,8}$/.test(hex)) return hex;
  let normalized = hex;
  if (hex.length === 4) {
    // Expand #RGB to #RRGGBB
    const r = hex[1], g = hex[2], b = hex[3];
    normalized = `#${r}${r}${g}${g}${b}${b}`;
  }
  // Strip any existing alpha to keep the function idempotent
  if (normalized.length === 9) normalized = normalized.slice(0, 7);
  if (normalized.length === 5) normalized = normalized.slice(0, 4); // unlikely but safe
  const clamped = Math.min(100, Math.max(0, alphaPercent));
  const alpha = Math.round((clamped / 100) * 255).toString(16).padStart(2, "0");
  return `${normalized}${alpha}`;
}
