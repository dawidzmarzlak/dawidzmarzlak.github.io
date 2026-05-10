import { describe, it, expect } from "vitest";
import { themeToCssVars } from "../cssVars";

describe("themeToCssVars", () => {
  it("flattens palette into --brand-color-* custom properties", () => {
    const vars = themeToCssVars({
      palette: { bg: "#FFF8F0", fg: "#5C4033", accent: "#C65D3B" },
      fonts: { display: "var(--font-dm-serif)", body: "var(--font-dm-sans)", accent: "var(--font-caveat)" },
      radius: { sm: "4px", md: "8px", lg: "16px" },
    });

    expect(vars).toEqual({
      "--brand-color-bg": "#FFF8F0",
      "--brand-color-fg": "#5C4033",
      "--brand-color-accent": "#C65D3B",
      "--brand-font-display": "var(--font-dm-serif)",
      "--brand-font-body": "var(--font-dm-sans)",
      "--brand-font-accent": "var(--font-caveat)",
      "--brand-radius-sm": "4px",
      "--brand-radius-md": "8px",
      "--brand-radius-lg": "16px",
    });
  });

  it("ignores undefined palette entries", () => {
    const vars = themeToCssVars({
      palette: { bg: "#fff", fg: "#000", accent: "#0af", muted: undefined as unknown as string },
      fonts: { display: "serif", body: "sans-serif", accent: "cursive" },
      radius: { sm: "0", md: "0", lg: "0" },
    });
    expect(vars).not.toHaveProperty("--brand-color-muted");
  });
});
