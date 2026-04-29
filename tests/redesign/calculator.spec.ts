import { test, expect } from "@playwright/test";
import { computeQuote, BASE_PRICE } from "@/lib/design/calculator";

test.describe("calculator.computeQuote", () => {
  test("matches design defaults: next + 8 pages + cms = 14 200", () => {
    expect(computeQuote({ type: "next", pages: 8, cms: true })).toBe(14_200);
  });
  test("base prices match the handoff", () => {
    expect(BASE_PRICE).toEqual({ next: 8500, wp: 5500, woo: 9500, presta: 12000, app: 18000 });
  });
  test("wp + 1 page + no cms = WP base price exactly", () => {
    expect(computeQuote({ type: "wp", pages: 1, cms: false })).toBe(5500);
  });
  test("each extra page adds 600 PLN", () => {
    const a = computeQuote({ type: "next", pages: 1, cms: false });
    const b = computeQuote({ type: "next", pages: 2, cms: false });
    expect(b - a).toBe(600);
  });
  test("cms toggle adds 1500 PLN", () => {
    const off = computeQuote({ type: "app", pages: 5, cms: false });
    const on  = computeQuote({ type: "app", pages: 5, cms: true });
    expect(on - off).toBe(1500);
  });
});
