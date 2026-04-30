import { test, expect } from "@playwright/test";
import {
  computeAdvancedQuote,
  DESIGN_TIER_PRICE,
  TIMELINE_RUSH_MULT,
  type AdvancedQuoteInput,
} from "@/lib/design/calculator";

test.describe("computeAdvancedQuote", () => {
  const baseline: AdvancedQuoteInput = {
    type: "next", pages: 8, cms: true,
    designTier: "standard", languages: 1, integrations: [],
    supportTier: "basic", hosting: "client", timeline: "normal",
  };

  test("baseline matches mini calculator (next + 8 pages + cms = 14 200)", () => {
    const out = computeAdvancedQuote(baseline);
    // 8500 (next) + 7*600 (pages) + 1500 (cms) = 14_200, design tier=standard adds DESIGN_TIER_PRICE.standard
    expect(out.subtotal).toBe(14_200 + DESIGN_TIER_PRICE.standard);
  });

  test("design tier 'lite' is 0 PLN (matches mini calc exactly)", () => {
    const out = computeAdvancedQuote({ ...baseline, designTier: "lite" });
    expect(out.subtotal).toBe(14_200);
  });

  test("design tier 'premium' adds DESIGN_TIER_PRICE.premium", () => {
    const lite = computeAdvancedQuote({ ...baseline, designTier: "lite" });
    const premium = computeAdvancedQuote({ ...baseline, designTier: "premium" });
    expect(premium.subtotal - lite.subtotal).toBe(DESIGN_TIER_PRICE.premium);
  });

  test("each extra language adds 1500 PLN", () => {
    const a = computeAdvancedQuote({ ...baseline, languages: 1 });
    const b = computeAdvancedQuote({ ...baseline, languages: 2 });
    expect(b.subtotal - a.subtotal).toBe(1500);
  });

  test("rush timeline multiplies subtotal by TIMELINE_RUSH_MULT", () => {
    const normal = computeAdvancedQuote({ ...baseline, timeline: "normal" });
    const rush   = computeAdvancedQuote({ ...baseline, timeline: "rush" });
    expect(rush.total).toBeCloseTo(normal.subtotal * TIMELINE_RUSH_MULT, 0);
  });

  test("integrations add their unit cost", () => {
    const a = computeAdvancedQuote({ ...baseline, integrations: [] });
    const b = computeAdvancedQuote({ ...baseline, integrations: ["payments", "crm"] });
    expect(b.subtotal).toBeGreaterThan(a.subtotal);
  });

  test("support tier 'pro' adds yearly cost separately (in supportYearly)", () => {
    const out = computeAdvancedQuote({ ...baseline, supportTier: "pro" });
    expect(out.supportYearly).toBeGreaterThan(0);
  });
});
