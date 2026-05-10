import { describe, it, expect } from "vitest";
import { formatPlnWithEurTooltip, plnToEurTooltip, PLN_TO_EUR_RATE } from "../format-price";

describe("formatPlnWithEurTooltip", () => {
  it("returns Polish-formatted text without tooltip for pl locale", () => {
    const r = formatPlnWithEurTooltip(3400, "pl");
    expect(r.text).toContain("zł");
    expect(r.tooltip).toBeNull();
  });

  it("returns PLN text with EUR tooltip for en locale", () => {
    const r = formatPlnWithEurTooltip(3400, "en");
    expect(r.text).toContain("PLN");
    expect(r.tooltip).not.toBeNull();
    expect(r.tooltip).toMatch(/EUR/);
  });

  it("rounds EUR to nearest 10", () => {
    // 3400 / 4.30 = 790.69... → round to 790 (nearest 10)
    const r = formatPlnWithEurTooltip(3400, "en");
    expect(r.tooltip).toBe("~790 EUR");
  });

  it("handles larger amounts (39 900 → ~9 280 EUR)", () => {
    // 39900 / 4.30 = 9279.07 → round to 9280
    const r = formatPlnWithEurTooltip(39900, "en");
    expect(r.tooltip).toBe("~9,280 EUR");
  });

  it("PLN_TO_EUR_RATE is 4.30", () => {
    expect(PLN_TO_EUR_RATE).toBe(4.30);
  });

  it("plnToEurTooltip returns null for non-en locales", () => {
    expect(plnToEurTooltip(3400, "pl")).toBeNull();
    expect(plnToEurTooltip(3400, "de")).toBeNull();
  });
});
