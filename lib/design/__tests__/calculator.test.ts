import { describe, it, expect } from "vitest";
import { computeAdvancedQuote, type AdvancedQuoteInput } from "../calculator";
import { PRESETS } from "../pricing-presets";

function presetInput(key: string): AdvancedQuoteInput {
  const p = PRESETS.find((p) => p.key === key);
  if (!p) throw new Error(`Preset ${key} not found`);
  return p.input;
}

describe("computeAdvancedQuote — preset calibration (2025/2026)", () => {
  it("LP preset (landing) gives ~3 400 zl (+/-5%)", () => {
    const input = presetInput("landing");
    const result = computeAdvancedQuote(input);
    expect(result.total).toBeGreaterThanOrEqual(3230);
    expect(result.total).toBeLessThanOrEqual(3570);
  });

  it("Strona firmowa preset (company) gives ~10 800 zl (+/-5%)", () => {
    const input = presetInput("company");
    const result = computeAdvancedQuote(input);
    expect(result.total).toBeGreaterThanOrEqual(10260);
    expect(result.total).toBeLessThanOrEqual(11340);
  });

  it("Sklep preset (ecom) gives ~16 900 zl (+/-5%)", () => {
    const input = presetInput("ecom");
    const result = computeAdvancedQuote(input);
    expect(result.total).toBeGreaterThanOrEqual(16055);
    expect(result.total).toBeLessThanOrEqual(17745);
  });

  it("Aplikacja webowa preset (app) gives ~39 900 zl (+/-5%)", () => {
    const preset = PRESETS.find((p) => p.key === "app")!;
    expect(preset).toBeDefined();
    const result = computeAdvancedQuote(preset.input);
    expect(result.total).toBeGreaterThanOrEqual(37905);
    expect(result.total).toBeLessThanOrEqual(41895);
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
