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

  it("renders 3 collections and 4 products (visual layout requirement)", () => {
    const collections = fashionStoreConfig.content.collections as { items: unknown[] };
    const products = fashionStoreConfig.content.products as { items: unknown[] };
    // Visual layout is a 3-column collection grid + 4-card product row.
    // If a buyer adds/removes items, the grid will visually break — keep these exact counts.
    expect(collections.items.length).toBe(3);
    expect(products.items.length).toBe(4);
  });
});
