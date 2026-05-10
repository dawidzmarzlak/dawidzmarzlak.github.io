import { describe, it, expect } from "vitest";
import { BrandConfigSchema } from "../schema";

const minimalValidConfig = {
  meta: {
    slug: "demo",
    brandName: "Demo",
    industry: "Generic",
    tagline: "A demo brand",
    locale: "en",
  },
  theme: {
    palette: { bg: "#fff", fg: "#000", accent: "#0af" },
    fonts: { display: "serif", body: "sans-serif", accent: "cursive" },
    radius: { sm: "4px", md: "8px", lg: "16px" },
  },
  content: {},
  media: {},
};

describe("BrandConfigSchema", () => {
  it("accepts a minimal valid config", () => {
    const r = BrandConfigSchema.safeParse(minimalValidConfig);
    expect(r.success).toBe(true);
  });

  it("rejects missing brandName", () => {
    const bad = { ...minimalValidConfig, meta: { ...minimalValidConfig.meta, brandName: "" } };
    const r = BrandConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });

  it("rejects palette without bg/fg/accent", () => {
    const bad = {
      ...minimalValidConfig,
      theme: { ...minimalValidConfig.theme, palette: { bg: "#fff" } },
    };
    const r = BrandConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });

  it("rejects non-hex palette colors", () => {
    const bad = {
      ...minimalValidConfig,
      theme: { ...minimalValidConfig.theme, palette: { bg: "blue", fg: "#000", accent: "#0af" } },
    };
    const r = BrandConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });

  it("accepts extra palette keys when they are valid hex colors", () => {
    const config = {
      ...minimalValidConfig,
      theme: {
        ...minimalValidConfig.theme,
        palette: { bg: "#fff", fg: "#000", accent: "#0af", muted: "#aaa", border: "#ccc8" },
      },
    };
    const r = BrandConfigSchema.safeParse(config);
    expect(r.success).toBe(true);
  });

  it("rejects extra palette keys whose values are not valid hex", () => {
    const config = {
      ...minimalValidConfig,
      theme: {
        ...minimalValidConfig.theme,
        palette: { bg: "#fff", fg: "#000", accent: "#0af", muted: "red" },
      },
    };
    const r = BrandConfigSchema.safeParse(config);
    expect(r.success).toBe(false);
  });

  it("rejects empty media values", () => {
    const config1 = { ...minimalValidConfig, media: { hero: "" } };
    const config2 = { ...minimalValidConfig, media: { gallery: [] } };
    expect(BrandConfigSchema.safeParse(config1).success).toBe(false);
    expect(BrandConfigSchema.safeParse(config2).success).toBe(false);
  });
});
