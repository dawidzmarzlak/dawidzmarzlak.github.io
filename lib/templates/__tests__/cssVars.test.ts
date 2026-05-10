import { describe, it, expect } from "vitest";
import { themeToCssVars, withAlpha } from "../cssVars";

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
      // Cast is intentional: exercises the runtime typeof-string guard for unvalidated inputs.
      // Once Task 2's Zod schema validates BrandConfig at the boundary, undefined keys can't reach here.
      palette: { bg: "#fff", fg: "#000", accent: "#0af", muted: undefined as unknown as string },
      fonts: { display: "serif", body: "sans-serif", accent: "cursive" },
      radius: { sm: "0", md: "0", lg: "0" },
    });
    expect(vars).not.toHaveProperty("--brand-color-muted");
  });
});

describe("withAlpha", () => {
  it("appends alpha to 6-digit hex", () => {
    expect(withAlpha("#5C4033", 20)).toBe("#5C403333");
    expect(withAlpha("#5C4033", 50)).toBe("#5C403380");
    expect(withAlpha("#5C4033", 100)).toBe("#5C4033ff");
  });

  it("expands 3-digit shorthand before appending", () => {
    expect(withAlpha("#fff", 50)).toBe("#ffffff80");
  });

  it("strips existing alpha (idempotent)", () => {
    expect(withAlpha("#5C403380", 20)).toBe("#5C403333");
  });

  it("returns input unchanged for invalid hex", () => {
    expect(withAlpha("blue", 50)).toBe("blue");
  });
});
