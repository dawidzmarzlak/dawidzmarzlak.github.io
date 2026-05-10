import { describe, it, expect } from "vitest";
import { BrandConfigSchema } from "@/lib/templates/schema";
import { saasDashboardConfig } from "../template.config";

describe("saas-dashboard config", () => {
  it("conforms to BrandConfigSchema", () => {
    const r = BrandConfigSchema.safeParse(saasDashboardConfig);
    if (!r.success) console.error(r.error.format());
    expect(r.success).toBe(true);
  });

  it("declares all content sections consumed by the section components", () => {
    for (const k of ["hero", "features", "howItWorks", "integrations", "testimonials", "faq", "pricing", "cta"]) {
      expect(saasDashboardConfig.content).toHaveProperty(k);
    }
  });

  it("declares at least 3 pricing tiers and at least 5 FAQ items", () => {
    const pricing = saasDashboardConfig.content.pricing as { tiers: unknown[] };
    const faq = saasDashboardConfig.content.faq as { items: unknown[] };
    expect(pricing.tiers.length).toBeGreaterThanOrEqual(3);
    expect(faq.items.length).toBeGreaterThanOrEqual(5);
  });
});
