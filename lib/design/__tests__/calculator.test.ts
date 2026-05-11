import { describe, it, expect } from "vitest";
import { computeAdvancedQuote, type AdvancedQuoteInput } from "../calculator";
import { PRESETS } from "../pricing-presets";

function presetInput(key: string): AdvancedQuoteInput {
  const p = PRESETS.find((p) => p.key === key);
  if (!p) throw new Error(`Preset ${key} not found`);
  return p.input;
}

describe("computeAdvancedQuote — preset calibration (2025/2026)", () => {
  it("LP preset (landing) gives ~3 800 zl (+/-5%) - with contact form", () => {
    const input = presetInput("landing");
    const result = computeAdvancedQuote(input);
    expect(result.total).toBeGreaterThanOrEqual(3610);
    expect(result.total).toBeLessThanOrEqual(3990);
  });

  it("Strona firmowa preset (company) gives ~13 000 zl (+/-5%) - with blog CMS", () => {
    const input = presetInput("company");
    const result = computeAdvancedQuote(input);
    expect(result.total).toBeGreaterThanOrEqual(12350);
    expect(result.total).toBeLessThanOrEqual(13650);
  });

  it("Sklep preset (ecom) gives ~9 950 zl (+/-5%) - minimal viable shop", () => {
    const input = presetInput("ecom");
    const result = computeAdvancedQuote(input);
    expect(result.total).toBeGreaterThanOrEqual(9452);
    expect(result.total).toBeLessThanOrEqual(10448);
  });

  it("Wizytowka Express preset (express) gives ~2 900 zl (+/-5%)", () => {
    const preset = PRESETS.find((p) => p.key === "express")!;
    expect(preset).toBeDefined();
    const result = computeAdvancedQuote(preset.input);
    expect(result.total).toBeGreaterThanOrEqual(2755);
    expect(result.total).toBeLessThanOrEqual(3045);
  });

  it("KSeF addon adds 1 800 zl to shop quote", () => {
    const input = presetInput("ecom");
    if (input.kind !== "shop") throw new Error("ecom preset must be a shop");
    const without = computeAdvancedQuote(input).total;
    const withKsef = computeAdvancedQuote({
      ...input,
      shop: {
        ...input.shop,
        shopIntegrations: [...input.shop.shopIntegrations, "ksef"],
      },
    }).total;
    expect(withKsef - without).toBe(1800);
  });

  it("WCAG 2.1 AA addon adds 2 500 zl to site quote", () => {
    const input = presetInput("company");
    if (input.kind !== "site") throw new Error("company preset must be a site");
    const without = computeAdvancedQuote(input).total;
    const withWcag = computeAdvancedQuote({
      ...input,
      site: {
        ...input.site,
        siteIntegrations: [...input.site.siteIntegrations, "wcag-aa"],
      },
    }).total;
    expect(withWcag - without).toBe(2500);
  });
});
