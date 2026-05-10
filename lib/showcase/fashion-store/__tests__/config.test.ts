import { describe, it, expect } from "vitest";
import { BrandConfigSchema } from "@/lib/templates/schema";
import { fashionStoreConfig } from "../template.config";

describe("fashion-store config", () => {
  it("conforms to BrandConfigSchema", () => {
    const r = BrandConfigSchema.safeParse(fashionStoreConfig);
    if (!r.success) console.error(r.error.format());
    expect(r.success).toBe(true);
  });

  it("declares content for every rendered section", () => {
    for (const k of ["hero", "collections", "products", "newsletter"]) {
      expect(fashionStoreConfig.content).toHaveProperty(k);
    }
  });

  it("declares at least 3 collections and at least 4 products", () => {
    const collections = fashionStoreConfig.content.collections as { items: unknown[] };
    const products = fashionStoreConfig.content.products as { items: unknown[] };
    expect(collections.items.length).toBeGreaterThanOrEqual(3);
    expect(products.items.length).toBeGreaterThanOrEqual(4);
  });
});
