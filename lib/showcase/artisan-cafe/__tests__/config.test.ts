import { describe, it, expect } from "vitest";
import { BrandConfigSchema } from "@/lib/templates/schema";
import { artisanCafeConfig } from "../template.config";

describe("artisan-cafe config", () => {
  it("conforms to BrandConfigSchema", () => {
    const r = BrandConfigSchema.safeParse(artisanCafeConfig);
    if (!r.success) console.error(r.error.format());
    expect(r.success).toBe(true);
  });

  it("declares all media keys consumed by the section components", () => {
    for (const k of ["hero", "polaroid1", "polaroid2", "polaroid3"]) {
      expect(artisanCafeConfig.media).toHaveProperty(k);
    }
  });

  it("declares all content sections consumed by the section components", () => {
    for (const k of ["hero", "story", "menu", "location"]) {
      expect(artisanCafeConfig.content).toHaveProperty(k);
    }
  });
});
