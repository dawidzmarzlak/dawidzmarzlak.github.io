import { test, expect } from "@playwright/test";
import {
  computeAdvancedQuote,
  computeMiniQuote,
  BASE_PRICE,
  CMS_FLAT,
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
    expect(BASE_PRICE).toEqual({ site: 750, shop: 5500, app: 28000 });
  });
});

test.describe("computeMiniQuote", () => {
  test("site + 8 pages + cms = 750 + 7*350 + 3000 = 6 200", () => {
    expect(computeMiniQuote({ kind: "site", pages: 8, cms: true })).toBe(6_200);
  });
  test("shop + 8 pages + cms = 5500 + 7*350 + 3000 = 10 950", () => {
    expect(computeMiniQuote({ kind: "shop", pages: 8, cms: true })).toBe(10_950);
  });
  test("app + 8 pages + cms = 28000 + 7*350 + 3000 = 33 450", () => {
    expect(computeMiniQuote({ kind: "app", pages: 8, cms: true })).toBe(33_450);
  });
});

test.describe("computeAdvancedQuote — site", () => {
  test("baseline subtotal includes base + pages + cms + design tier", () => {
    const out = computeAdvancedQuote(SITE_BASELINE);
    // 750 (base) + 7*350 (pages) + 3000 (cms) + 700 (design standard) = 6_900
    expect(out.subtotal).toBe(6_900);
  });
  test("each extra page adds 350 PLN", () => {
    const a = computeAdvancedQuote({ ...SITE_BASELINE, site: { ...SITE_BASELINE.site, pages: 8 } });
    const b = computeAdvancedQuote({ ...SITE_BASELINE, site: { ...SITE_BASELINE.site, pages: 9 } });
    expect(b.subtotal - a.subtotal).toBe(350);
  });
  test("design tier 'lite' is 0 PLN", () => {
    const out = computeAdvancedQuote({ ...SITE_BASELINE, designTier: "lite" });
    expect(out.subtotal).toBe(6_900 - DESIGN_TIER_PRICE.standard);
  });
  test("CMS_FLAT exported constant equals 3000", () => {
    expect(CMS_FLAT).toBe(3000);
  });
});

test.describe("computeAdvancedQuote — shop", () => {
  test("baseline subtotal: base + content pages + design + catalog md", () => {
    const out = computeAdvancedQuote(SHOP_BASELINE);
    // 5500 (base) + 5*350 (contentPages 6 → 5 extra) +
    // 700 (design standard) + 1500 (catalog md) = 9_450
    expect(out.subtotal).toBe(9_450);
  });
  test("payment gateways add 600 each", () => {
    const a = computeAdvancedQuote(SHOP_BASELINE);
    const b = computeAdvancedQuote({ ...SHOP_BASELINE, shop: { ...SHOP_BASELINE.shop, paymentGateways: ["blik", "p24"] } });
    expect(b.subtotal - a.subtotal).toBe(1200);
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
    // 28000 (base) + 700 (design standard) + 600 (auth email) +
    // 0 (spring) + 0 (postgres) + 1000 (roles 2 → 1 extra) = 30_300
    expect(out.subtotal).toBe(30_300);
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
  test("each extra language adds 1400 PLN", () => {
    const a = computeAdvancedQuote({ ...SITE_BASELINE, languages: 1 });
    const b = computeAdvancedQuote({ ...SITE_BASELINE, languages: 2 });
    expect(b.subtotal - a.subtotal).toBe(1400);
  });
  test("support tier 'pro' surfaces yearly cost separately", () => {
    const out = computeAdvancedQuote({ ...SITE_BASELINE, supportTier: "pro" });
    expect(out.supportYearly).toBe(4800);
  });
});
