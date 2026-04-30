import { test, expect } from "@playwright/test";
import {
  computeAdvancedQuote,
  computeMiniQuote,
  BASE_PRICE,
  DESIGN_TIER_PRICE,
  TIMELINE_RUSH_MULT,
  type AdvancedQuoteInput,
} from "@/lib/design/calculator";

const SITE_BASELINE: AdvancedQuoteInput = {
  kind: "site",
  designTier: "standard", languages: 1, hosting: "client",
  supportTier: "basic", timeline: "normal",
  industry: "other", audience: "b2c", stage: "new",
  site: {
    goal: "company",
    pages: 8,
    cms: true,
    siteIntegrations: [],
  },
};

const SHOP_BASELINE: AdvancedQuoteInput = {
  kind: "shop",
  designTier: "standard", languages: 1, hosting: "client",
  supportTier: "basic", timeline: "normal",
  industry: "other", audience: "b2c", stage: "new",
  shop: {
    platform: "woo",
    catalogSize: "md",
    contentPages: 6,
    paymentGateways: [],
    shopIntegrations: [],
    erp: "none",
  },
};

const APP_BASELINE: AdvancedQuoteInput = {
  kind: "app",
  designTier: "standard", languages: 1, hosting: "client",
  supportTier: "basic", timeline: "normal",
  industry: "other", audience: "b2c", stage: "new",
  app: {
    appType: "saas",
    auth: "email",
    backend: "spring",
    roles: 2,
    appIntegrations: [],
    storage: "postgres",
    mobile: false,
  },
};

test.describe("BASE_PRICE — project kinds", () => {
  test("site/shop/app base prices match handoff", () => {
    expect(BASE_PRICE).toEqual({ site: 5500, shop: 12000, app: 18000 });
  });
});

test.describe("computeMiniQuote", () => {
  test("site + 8 pages + cms = 5500 + 7*600 + 1500 = 11 200", () => {
    expect(computeMiniQuote({ kind: "site", pages: 8, cms: true })).toBe(11_200);
  });
  test("shop + 8 pages + cms = 12000 + 7*600 + 1500 = 17 700", () => {
    expect(computeMiniQuote({ kind: "shop", pages: 8, cms: true })).toBe(17_700);
  });
  test("app + 8 pages + cms = 18000 + 7*600 + 1500 = 23 700", () => {
    expect(computeMiniQuote({ kind: "app", pages: 8, cms: true })).toBe(23_700);
  });
});

test.describe("computeAdvancedQuote — site", () => {
  test("baseline subtotal includes base + pages + cms + design tier", () => {
    const out = computeAdvancedQuote(SITE_BASELINE);
    // 5500 + 7*600 + 1500 + 2500 = 13_700
    expect(out.subtotal).toBe(13_700);
  });
  test("each extra page adds 600 PLN", () => {
    const a = computeAdvancedQuote({ ...SITE_BASELINE, site: { ...SITE_BASELINE.site, pages: 8 } });
    const b = computeAdvancedQuote({ ...SITE_BASELINE, site: { ...SITE_BASELINE.site, pages: 9 } });
    expect(b.subtotal - a.subtotal).toBe(600);
  });
  test("design tier 'lite' is 0 PLN", () => {
    const out = computeAdvancedQuote({ ...SITE_BASELINE, designTier: "lite" });
    expect(out.subtotal).toBe(13_700 - DESIGN_TIER_PRICE.standard);
  });
});

test.describe("computeAdvancedQuote — shop", () => {
  test("baseline subtotal: base + content pages + design + catalog md", () => {
    const out = computeAdvancedQuote(SHOP_BASELINE);
    // 12000 (base) + 5*600 (contentPages 6 → 5 extra) +
    // 2500 (design standard) + 1500 (catalog md) = 19_000
    expect(out.subtotal).toBe(19_000);
  });
  test("payment gateways add 900 each", () => {
    const a = computeAdvancedQuote(SHOP_BASELINE);
    const b = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, paymentGateways: ["blik", "p24"] } });
    expect(b.subtotal - a.subtotal).toBe(1800);
  });
  test("shop integration 'courier' adds 800", () => {
    const a = computeAdvancedQuote(SHOP_BASELINE);
    const b = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, shopIntegrations: ["courier"] } });
    expect(b.subtotal - a.subtotal).toBe(800);
  });
  test("erp 'subiekt' adds 3500", () => {
    const a = computeAdvancedQuote(SHOP_BASELINE);
    const b = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, erp: "subiekt" } });
    expect(b.subtotal - a.subtotal).toBe(3500);
  });
  test("catalog size scaling: sm=0, md=1500, lg=4500, xl=9000", () => {
    const sm = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, catalogSize: "sm" } });
    const md = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, catalogSize: "md" } });
    const lg = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, catalogSize: "lg" } });
    const xl = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, catalogSize: "xl" } });
    expect(md.subtotal - sm.subtotal).toBe(1500);
    expect(lg.subtotal - sm.subtotal).toBe(4500);
    expect(xl.subtotal - sm.subtotal).toBe(9000);
  });
});

test.describe("computeAdvancedQuote — app", () => {
  test("baseline subtotal: base + design + email auth + 1 extra role", () => {
    const out = computeAdvancedQuote(APP_BASELINE);
    // 18000 (base) + 2500 (design) + 600 (auth email) +
    // 0 (spring) + 0 (postgres) + 1000 (roles 2 → 1 extra) = 22_100
    expect(out.subtotal).toBe(22_100);
  });
  test("payments integration adds 1800", () => {
    const a = computeAdvancedQuote(APP_BASELINE);
    const b = computeAdvancedQuote({ ...APP_BASELINE, app: { ...APP_BASELINE.app, appIntegrations: ["payments"] } });
    expect(b.subtotal - a.subtotal).toBe(1800);
  });
  test("auth 'sso' adds 4500 over baseline", () => {
    const a = computeAdvancedQuote({ ...APP_BASELINE, app: { ...APP_BASELINE.app, auth: "none" } });
    const b = computeAdvancedQuote({ ...APP_BASELINE, app: { ...APP_BASELINE.app, auth: "sso" } });
    expect(b.subtotal - a.subtotal).toBe(4500);
  });
  test("mobile companion adds 8000", () => {
    const a = computeAdvancedQuote({ ...APP_BASELINE, app: { ...APP_BASELINE.app, mobile: false } });
    const b = computeAdvancedQuote({ ...APP_BASELINE, app: { ...APP_BASELINE.app, mobile: true } });
    expect(b.subtotal - a.subtotal).toBe(8000);
  });
});

test.describe("computeAdvancedQuote — shared knobs", () => {
  test("rush timeline multiplies subtotal by TIMELINE_RUSH_MULT", () => {
    const normal = computeAdvancedQuote(SITE_BASELINE);
    const rush   = computeAdvancedQuote({ ...SITE_BASELINE, timeline: "rush" });
    expect(rush.total).toBeCloseTo(normal.subtotal * TIMELINE_RUSH_MULT, 0);
  });
  test("each extra language adds 1500 PLN", () => {
    const a = computeAdvancedQuote({ ...SITE_BASELINE, languages: 1 });
    const b = computeAdvancedQuote({ ...SITE_BASELINE, languages: 2 });
    expect(b.subtotal - a.subtotal).toBe(1500);
  });
  test("support tier 'pro' surfaces yearly cost separately", () => {
    const out = computeAdvancedQuote({ ...SITE_BASELINE, supportTier: "pro" });
    expect(out.supportYearly).toBe(4800);
  });
});
