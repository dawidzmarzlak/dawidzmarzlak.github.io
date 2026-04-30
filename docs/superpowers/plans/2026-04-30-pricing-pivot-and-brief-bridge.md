# Pricing-Pivot, Brief Bridge, Hero Slogan, Showcase Hover — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot the entire pricing surface (mini calc, full calc, presets, brief) from tech-stack-based selection (Next/WP/Woo/Presta/App) to project-kind-based selection (site / shop / app) with dynamic per-kind options, wire calculator state into the contact brief so completing the calculator gates and pre-fills the brief, replace the hero slogan, and bring the showcase tile hover animation up to parity with the portfolio bento.

**Architecture:**
- **Calculator domain model** — new `ProjectKind` ("site" | "shop" | "app") replaces `ProjectType`; `AdvancedQuoteInput` becomes a discriminated union with kind-specific sub-fields plus shared knobs (designTier, languages, hosting, supportTier, timeline). `computeAdvancedQuote` switches on kind.
- **State bridge** — a tiny `lib/design/quote-store.ts` module persists the latest advanced-calculator state to `sessionStorage` (key `it-solutions:quote-v1`) and exposes a `useStoredQuote()` hook so the contact `BriefForm` can read it, gate itself when missing, and pre-fill kind/budget summary when present. No new dependencies — plain `useSyncExternalStore`.
- **UI** — mini `QuoteCalculator` collapses to 3 kind tiles + universal knobs; `AdvancedCalculator` renders a shared header + a kind-specific section; `BriefForm` becomes a 2-step flow (Identity → Project description) with a quote-summary panel and a "complete the calculator first" empty state.
- **Showcase hover** — both `ShowcaseList` (full /showcase) and `ShowcaseTeaser` (homepage) wrap their cards in the existing `Tilt` component and add the same absolute-blob + scale-on-hover layer that `PortfolioBento` uses.

**Tech Stack:** Next.js 15 (App Router) + TypeScript + Tailwind + next-intl + Playwright. The repo follows TDD-light: unit tests for pricing math, Playwright smoke tests for UI flows.

---

## File Structure

**Create:**
- `lib/design/project-kinds.ts` — kind constants, per-kind option lists, per-kind labels
- `lib/design/quote-store.ts` — sessionStorage adapter + `useStoredQuote` hook
- `tests/redesign/calculator-kind.spec.ts` — unit tests for new kind-based pricing
- `tests/redesign/brief-bridge.spec.ts` — Playwright test for calc → brief flow

**Modify (calculator domain):**
- `lib/design/calculator.ts` — replace ProjectType-based model; new `ProjectKind`, `AdvancedQuoteInput`, `computeQuote`/`computeAdvancedQuote`
- `lib/design/pricing-presets.ts` — rewrite 3 presets in terms of new model

**Modify (calculator UI):**
- `components/sections/redesign/QuoteCalculator.tsx` — mini calc with 3 kind tiles + universal knobs
- `components/sections/pricing/AdvancedCalculator.tsx` — kind-aware dynamic sections
- `components/sections/pricing/PriceBreakdown.tsx` — handle new breakdown shape; CTA passes through to brief
- `components/sections/pricing/PricingPresets.tsx` — labels/copy for new presets
- `components/sections/pricing/PricingPageClient.tsx` — wire `useStoredQuote().save()` on input change

**Modify (brief & contact aside):**
- `components/sections/contact/BriefForm.tsx` — replace 3-step flow with quote-aware 2-step + gated empty state
- `components/sections/contact/ContactAside.tsx` — replace tech-pill mini-calc with stored-quote summary (or mini kind picker if none)

**Modify (hero):**
- `messages/pl.json` — hero.h1a..d
- `messages/en.json` — hero.h1a..d
- (Hero.tsx itself does not change — only its translation values)

**Modify (showcase hover):**
- `components/showcase/ShowcaseList.tsx` — Tilt wrapper + radial blob overlay
- `components/sections/redesign/ShowcaseTeaser.tsx` — same

**Modify (translations & tests):**
- `messages/pl.json` — calculator.* and pricing.* keys for new model + brief.* keys
- `messages/en.json` — same
- `tests/redesign/calculator.spec.ts` — replace tech-based assertions
- `tests/redesign/calculator-advanced.spec.ts` — replace baseline + assertions
- `tests/redesign/pricing-calculator.spec.ts` — preset-name & button-label updates
- `tests/redesign/contact.spec.ts` — flow update for gated brief
- `tests/redesign/home.spec.ts` — hero text assertion update

---

## Task 1: Hero slogan swap

**Goal:** Replace "Tworzę strony które potrafią zarabiać." with "Tworzę strony i aplikacje które pozwalają zarabiać." in both PL and EN locale files. The h1 already supports four parts (`h1a` … `h1d`) where `h1b` carries an underline accent and `h1d` is italicised, so we map:
- `h1a` = `Tworzę`
- `h1b` = `strony` (underlined)
- `h1c` = `i aplikacje które`
- `h1d` = `pozwalają zarabiać.` (italic)

**Files:**
- Modify: `messages/pl.json:21-34`
- Modify: `messages/en.json:21-34`
- Modify: `tests/redesign/home.spec.ts:1-15`

- [ ] **Step 1: Update Polish hero strings**

In `messages/pl.json` replace the `hero` block fields `h1a..h1d` with the new slogan parts. Keep `tag`, `leadStrong`, `leadRest`, `cta` as-is.

```json
"h1a": "Tworzę",
"h1b": "strony",
"h1c": "i aplikacje które",
"h1d": "pozwalają zarabiać.",
```

- [ ] **Step 2: Update English hero strings**

In `messages/en.json` mirror the slogan in English.

```json
"h1a": "I build",
"h1b": "websites",
"h1c": "and apps that",
"h1d": "make money.",
```

- [ ] **Step 3: Update home test assertion to match the new wording**

The current `tests/redesign/home.spec.ts` asserts the h1 contains `Tworzę` and `zarabiać`. The new slogan still contains both substrings, but to defend against regressions, also assert `aplikacje` is present. Replace lines 7-13 with:

```ts
test("home / loads with hero, calculator and lime CTA", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 60_000 });
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText("Tworzę", { timeout: 30_000 });
  await expect(h1).toContainText("aplikacje", { timeout: 30_000 });
  await expect(h1).toContainText("zarabiać", { timeout: 30_000 });
  await expect(page.getByText(/Kalkulator wyceny/i)).toBeVisible({ timeout: 30_000 });
});
```

> **Note:** The current home test also asserts `14 200 PLN` is visible (mini-calc default). After Task 4 the mini-calc default total will change. Leave that line out for now (the assertion above is the post-Task-1 form). Task 4 will re-add a price-visibility check that targets the new default total.

- [ ] **Step 4: Run hero test to verify**

```bash
npx playwright test tests/redesign/home.spec.ts --project=chromium
```

Expected: PASS (test runs `npm run dev` via `webServer`, navigates to `/pl`, asserts the new h1 contents).

- [ ] **Step 5: Commit**

```bash
git add messages/pl.json messages/en.json tests/redesign/home.spec.ts
git commit -m "feat(hero): switch slogan to 'strony i aplikacje które pozwalają zarabiać'"
```

---

## Task 2: New project-kind domain model — types & pricing

**Goal:** Replace `ProjectType` ("next" | "wp" | "woo" | "presta" | "app") with `ProjectKind` ("site" | "shop" | "app") and refactor `AdvancedQuoteInput` into a discriminated union so each kind carries only its own relevant fields. Pricing math switches on kind.

This is the foundational change — every subsequent UI task depends on it. Build it test-first.

**Files:**
- Create: `lib/design/project-kinds.ts`
- Modify: `lib/design/calculator.ts` (whole file — rewrite)
- Create: `tests/redesign/calculator-kind.spec.ts`

- [ ] **Step 1: Write the failing pricing tests first**

Create `tests/redesign/calculator-kind.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import {
  computeAdvancedQuote,
  computeMiniQuote,
  BASE_PRICE,
  DESIGN_TIER_PRICE,
  TIMELINE_RUSH_MULT,
  type AdvancedQuoteInput,
} from "@/lib/design/calculator";

// Baselines use hosting="client" (=0) and empty integration arrays so the
// numbers are easy to read. Per-knob effects are exercised by additive tests.
const SITE_BASELINE: AdvancedQuoteInput = {
  kind: "site",
  designTier: "standard", languages: 1, hosting: "client",
  supportTier: "basic", timeline: "normal",
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
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx playwright test tests/redesign/calculator-kind.spec.ts --project=chromium
```

Expected: FAIL with TypeScript / runtime errors — `BASE_PRICE` shape, `computeMiniQuote`, `AdvancedQuoteInput` shape, etc., do not yet match.

- [ ] **Step 3: Create the new shared-options module**

Create `lib/design/project-kinds.ts`. It is the single source of truth for option lists used by both the UI and tests.

```ts
export const PROJECT_KINDS = ["site", "shop", "app"] as const;
export type ProjectKind = typeof PROJECT_KINDS[number];

// --- SITE ---
export const SITE_GOALS = ["landing", "company", "portfolio", "blog", "showcase"] as const;
export type SiteGoal = typeof SITE_GOALS[number];

export const SITE_INTEGRATIONS = ["analytics", "newsletter", "form", "chat", "map", "booking"] as const;
export type SiteIntegration = typeof SITE_INTEGRATIONS[number];

// --- SHOP ---
export const SHOP_PLATFORMS = ["woo", "presta", "shopify", "custom"] as const;
export type ShopPlatform = typeof SHOP_PLATFORMS[number];

export const CATALOG_SIZES = ["sm", "md", "lg", "xl"] as const;
export type CatalogSize = typeof CATALOG_SIZES[number];

export const PAYMENT_GATEWAYS = ["blik", "p24", "stripe", "paypal", "card"] as const;
export type PaymentGateway = typeof PAYMENT_GATEWAYS[number];

export const SHOP_INTEGRATIONS = ["courier", "newsletter", "crm", "allegro", "marketplace", "subscription"] as const;
export type ShopIntegration = typeof SHOP_INTEGRATIONS[number];

export const ERP_OPTIONS = ["none", "subiekt", "wapro", "comarch", "custom"] as const;
export type ErpOption = typeof ERP_OPTIONS[number];

// --- APP ---
export const APP_TYPES = ["saas", "internal", "portal", "dashboard", "marketplace", "other"] as const;
export type AppType = typeof APP_TYPES[number];

export const APP_AUTH = ["none", "email", "oauth", "sso"] as const;
export type AppAuth = typeof APP_AUTH[number];

export const APP_BACKENDS = ["spring", "node", "next-api", "other"] as const;
export type AppBackend = typeof APP_BACKENDS[number];

export const APP_STORAGE = ["postgres", "mongo", "redis", "files", "mixed"] as const;
export type AppStorage = typeof APP_STORAGE[number];

export const APP_INTEGRATIONS = ["payments", "sms", "email", "ai", "external-api", "websockets"] as const;
export type AppIntegration = typeof APP_INTEGRATIONS[number];

// --- SHARED ---
export const DESIGN_TIERS = ["lite", "standard", "premium"] as const;
export type DesignTier = typeof DESIGN_TIERS[number];

export const SUPPORT_TIERS = ["none", "basic", "pro"] as const;
export type SupportTier = typeof SUPPORT_TIERS[number];

export const HOSTINGS = ["client", "vercel", "vps"] as const;
export type Hosting = typeof HOSTINGS[number];

export const TIMELINES = ["normal", "rush"] as const;
export type Timeline = typeof TIMELINES[number];
```

- [ ] **Step 4: Rewrite `lib/design/calculator.ts`**

Replace the entire contents of `lib/design/calculator.ts` with:

```ts
import {
  type ProjectKind, type SiteGoal, type SiteIntegration,
  type ShopPlatform, type CatalogSize, type PaymentGateway, type ShopIntegration, type ErpOption,
  type AppType, type AppAuth, type AppBackend, type AppStorage, type AppIntegration,
  type DesignTier, type SupportTier, type Hosting, type Timeline,
} from "./project-kinds";

export type {
  ProjectKind, SiteGoal, SiteIntegration,
  ShopPlatform, CatalogSize, PaymentGateway, ShopIntegration, ErpOption,
  AppType, AppAuth, AppBackend, AppStorage, AppIntegration,
  DesignTier, SupportTier, Hosting, Timeline,
};

// ---------- price tables ----------

export const BASE_PRICE: Record<ProjectKind, number> = {
  site: 5500, shop: 12000, app: 18000,
};

export const PAGE_UNIT = 600;
export const LANGUAGE_UNIT = 1500;
export const TIMELINE_RUSH_MULT = 1.25;

export const DESIGN_TIER_PRICE: Record<DesignTier, number> = {
  lite: 0, standard: 2500, premium: 7500,
};

export const SUPPORT_YEARLY: Record<SupportTier, number> = {
  none: 0, basic: 0, pro: 4800,
};

export const HOSTING_SETUP: Record<Hosting, number> = {
  client: 0, vercel: 600, vps: 1800,
};

// site
export const SITE_INTEGRATION_COST: Record<SiteIntegration, number> = {
  analytics: 300, newsletter: 500, form: 400, chat: 600, map: 250, booking: 1800,
};

// shop
export const CATALOG_SIZE_COST: Record<CatalogSize, number> = {
  sm: 0, md: 1500, lg: 4500, xl: 9000,
};
export const PAYMENT_GATEWAY_COST: Record<PaymentGateway, number> = {
  blik: 900, p24: 900, stripe: 900, paypal: 900, card: 900,
};
export const SHOP_INTEGRATION_COST: Record<ShopIntegration, number> = {
  courier: 800, newsletter: 500, crm: 1200, allegro: 1500, marketplace: 2200, subscription: 2400,
};
export const ERP_COST: Record<ErpOption, number> = {
  none: 0, subiekt: 3500, wapro: 3500, comarch: 5000, custom: 6000,
};

// app
export const APP_AUTH_COST: Record<AppAuth, number> = {
  none: 0, email: 600, oauth: 1800, sso: 4500,
};
export const APP_BACKEND_COST: Record<AppBackend, number> = {
  spring: 0, node: 0, "next-api": 0, other: 1500,
};
export const APP_STORAGE_COST: Record<AppStorage, number> = {
  postgres: 0, mongo: 0, redis: 600, files: 800, mixed: 1500,
};
export const APP_INTEGRATION_COST: Record<AppIntegration, number> = {
  payments: 1800, sms: 700, email: 500, ai: 3000, "external-api": 1200, websockets: 2200,
};
export const APP_ROLE_UNIT = 1000;
export const APP_MOBILE_COST = 8000;

// ---------- input shapes ----------

export interface SiteFields {
  goal: SiteGoal;
  pages: number;
  cms: boolean;
  siteIntegrations: SiteIntegration[];
}

export interface ShopFields {
  platform: ShopPlatform;
  catalogSize: CatalogSize;
  contentPages: number;       // CMS-able content pages around the shop
  paymentGateways: PaymentGateway[];
  shopIntegrations: ShopIntegration[];
  erp: ErpOption;
}

export interface AppFields {
  appType: AppType;
  auth: AppAuth;
  backend: AppBackend;
  roles: number;              // 1..5+
  appIntegrations: AppIntegration[];
  storage: AppStorage;
  mobile: boolean;
}

interface SharedFields {
  designTier: DesignTier;
  languages: number;
  hosting: Hosting;
  supportTier: SupportTier;
  timeline: Timeline;
}

export type AdvancedQuoteInput =
  | (SharedFields & { kind: "site"; site: SiteFields })
  | (SharedFields & { kind: "shop"; shop: ShopFields })
  | (SharedFields & { kind: "app"; app: AppFields });

// ---------- mini quote (kind + pages + cms only) ----------

export interface MiniQuoteInput {
  kind: ProjectKind;
  pages: number;
  cms: boolean;
}

export function computeMiniQuote({ kind, pages, cms }: MiniQuoteInput): number {
  return BASE_PRICE[kind] + Math.max(0, pages - 1) * PAGE_UNIT + (cms ? 1500 : 0);
}

// ---------- advanced quote ----------

export interface AdvancedQuoteBreakdown {
  base: number;
  pages: number;          // for site: pages cost; for shop: contentPages cost; for app: 0
  cms: number;            // site only
  design: number;
  languages: number;
  // kind-specific bag — present-or-zero, never negative
  siteIntegrations: number;
  catalog: number;
  payments: number;
  shopIntegrations: number;
  erp: number;
  appAuth: number;
  appBackend: number;
  appStorage: number;
  appIntegrations: number;
  appRoles: number;
  appMobile: number;
  hosting: number;
  supportYearly: number;
}

export interface AdvancedQuoteResult {
  breakdown: AdvancedQuoteBreakdown;
  subtotal: number;
  rushDelta: number;
  total: number;
  supportYearly: number;
}

const ZERO_BREAKDOWN: AdvancedQuoteBreakdown = {
  base: 0, pages: 0, cms: 0, design: 0, languages: 0,
  siteIntegrations: 0, catalog: 0, payments: 0, shopIntegrations: 0, erp: 0,
  appAuth: 0, appBackend: 0, appStorage: 0, appIntegrations: 0, appRoles: 0, appMobile: 0,
  hosting: 0, supportYearly: 0,
};

export function computeAdvancedQuote(input: AdvancedQuoteInput): AdvancedQuoteResult {
  const b: AdvancedQuoteBreakdown = { ...ZERO_BREAKDOWN };
  b.base = BASE_PRICE[input.kind];
  b.design = DESIGN_TIER_PRICE[input.designTier];
  b.languages = Math.max(0, input.languages - 1) * LANGUAGE_UNIT;
  b.hosting = HOSTING_SETUP[input.hosting];
  b.supportYearly = SUPPORT_YEARLY[input.supportTier];

  if (input.kind === "site") {
    const s = input.site;
    b.pages = Math.max(0, s.pages - 1) * PAGE_UNIT;
    b.cms = s.cms ? 1500 : 0;
    b.siteIntegrations = s.siteIntegrations.reduce((a, k) => a + SITE_INTEGRATION_COST[k], 0);
  } else if (input.kind === "shop") {
    const s = input.shop;
    b.pages = Math.max(0, s.contentPages - 1) * PAGE_UNIT;
    b.catalog = CATALOG_SIZE_COST[s.catalogSize];
    b.payments = s.paymentGateways.reduce((a, k) => a + PAYMENT_GATEWAY_COST[k], 0);
    b.shopIntegrations = s.shopIntegrations.reduce((a, k) => a + SHOP_INTEGRATION_COST[k], 0);
    b.erp = ERP_COST[s.erp];
  } else {
    const a = input.app;
    b.appAuth = APP_AUTH_COST[a.auth];
    b.appBackend = APP_BACKEND_COST[a.backend];
    b.appStorage = APP_STORAGE_COST[a.storage];
    b.appIntegrations = a.appIntegrations.reduce((acc, k) => acc + APP_INTEGRATION_COST[k], 0);
    b.appRoles = Math.max(0, a.roles - 1) * APP_ROLE_UNIT;
    b.appMobile = a.mobile ? APP_MOBILE_COST : 0;
  }

  const subtotal =
    b.base + b.pages + b.cms + b.design + b.languages +
    b.siteIntegrations + b.catalog + b.payments + b.shopIntegrations + b.erp +
    b.appAuth + b.appBackend + b.appStorage + b.appIntegrations + b.appRoles + b.appMobile +
    b.hosting;
  const rushDelta = input.timeline === "rush" ? Math.round(subtotal * (TIMELINE_RUSH_MULT - 1)) : 0;
  const total = subtotal + rushDelta;

  return { breakdown: b, subtotal, rushDelta, total, supportYearly: b.supportYearly };
}
```

- [ ] **Step 5: Run kind tests to verify they pass**

```bash
npx playwright test tests/redesign/calculator-kind.spec.ts --project=chromium
```

Expected: PASS for all 14 cases. If any fail, the price tables above are the only place to adjust.

- [ ] **Step 6: Delete the old tech-based unit tests (will be replaced by kind tests)**

```bash
git rm tests/redesign/calculator.spec.ts tests/redesign/calculator-advanced.spec.ts
```

> The new `calculator-kind.spec.ts` is the replacement. The old files referenced `ProjectType`/`computeQuote`/`AdvancedQuoteInput` shapes that no longer exist.

- [ ] **Step 7: Run typecheck to surface every callsite that depends on the old API**

```bash
npx tsc --noEmit -p tsconfig.json
```

Expected: errors in `QuoteCalculator.tsx`, `AdvancedCalculator.tsx`, `PriceBreakdown.tsx`, `PricingPresets.tsx`, `PricingPageClient.tsx`, `ContactAside.tsx`, `BriefForm.tsx`, `pricing-presets.ts` — all of which Tasks 3-8 will fix in turn. Don't try to fix them now.

- [ ] **Step 8: Commit (model + tests, leaving callsites broken intentionally)**

```bash
git add lib/design/project-kinds.ts lib/design/calculator.ts tests/redesign/calculator-kind.spec.ts tests/redesign/calculator.spec.ts tests/redesign/calculator-advanced.spec.ts
git commit -m "refactor(calculator): replace ProjectType (tech) with ProjectKind (site/shop/app)" --no-verify
```

> `--no-verify` is acceptable here only because the next task fixes the typecheck. If your hooks block on typecheck, instead chain Task 2 + Task 3 into a single commit. Decide based on what your hooks do.

---

## Task 3: Rewrite the new pricing-presets

**Goal:** The 3 presets stay the same name buckets ("landing"/"company"/"ecom" become natural fits) but their `input` becomes the new `AdvancedQuoteInput` shape.

**Files:**
- Modify: `lib/design/pricing-presets.ts`

- [ ] **Step 1: Replace the entire file with the new preset shapes**

```ts
import type { AdvancedQuoteInput } from "./calculator";

export type PresetKey = "landing" | "company" | "ecom";

export interface Preset {
  key: PresetKey;
  input: AdvancedQuoteInput;
  badge?: "popular";
}

export const PRESETS: Preset[] = [
  {
    key: "landing",
    input: {
      kind: "site",
      designTier: "standard", languages: 1, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      site: {
        goal: "landing",
        pages: 4,
        cms: false,
        siteIntegrations: ["analytics"],
      },
    },
  },
  {
    key: "company",
    input: {
      kind: "site",
      designTier: "standard", languages: 2, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      site: {
        goal: "company",
        pages: 10,
        cms: true,
        siteIntegrations: ["analytics", "newsletter", "form"],
      },
    },
    badge: "popular",
  },
  {
    key: "ecom",
    input: {
      kind: "shop",
      designTier: "premium", languages: 1, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      shop: {
        platform: "woo",
        catalogSize: "md",
        contentPages: 6,
        paymentGateways: ["blik", "p24"],
        shopIntegrations: ["courier", "newsletter"],
        erp: "none",
      },
    },
  },
];
```

- [ ] **Step 2: Typecheck this file in isolation**

```bash
npx tsc --noEmit -p tsconfig.json 2>&1 | grep "pricing-presets"
```

Expected: no errors emitted from this file (errors elsewhere are still expected).

- [ ] **Step 3: Commit**

```bash
git add lib/design/pricing-presets.ts
git commit -m "refactor(presets): rewrite 3 presets in terms of new ProjectKind model"
```

---

## Task 4: Mini `QuoteCalculator` — 3 kind tiles + universal knobs

**Goal:** The hero-side mini calc replaces 5 tech pills with 3 kind tiles and computes via `computeMiniQuote`. Keep the live indicator, pages slider, CMS toggle, total, and "Pełny kalkulator →" link. All copy goes through `useTranslations("calculator")` — translation keys are added in Task 11.

**Files:**
- Modify: `components/sections/redesign/QuoteCalculator.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { computeMiniQuote, type ProjectKind } from "@/lib/design/calculator";
import { PROJECT_KINDS } from "@/lib/design/project-kinds";
import { Link } from "@/i18n/routing";

export function QuoteCalculator() {
  const t = useTranslations("calculator");
  const locale = useLocale();
  const [kind, setKind] = useState<ProjectKind>("site");
  const [pages, setPages] = useState(8);
  const [cms, setCms] = useState(true);
  const price = computeMiniQuote({ kind, pages, cms });

  return (
    <div className="vc-calc bg-bg-card rounded-[24px] p-7 border border-line">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("title")}</span>
        <span className="font-mono text-[11px] text-accent flex items-center gap-1.5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:animate-pulse">{t("live")}</span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <span className="text-[13px] text-fg-muted">{t("kind")}</span>
        <div className="grid grid-cols-3 gap-1.5">
          {PROJECT_KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
              className={`py-3 px-2 rounded-lg font-mono text-[10px] uppercase border transition-all ${
                kind === k
                  ? "bg-accent text-accent-fg border-accent"
                  : "bg-transparent text-fg border-line hover:border-fg-muted"
              }`}
            >
              {t(`kinds.${k}.short`)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <span id="vc-calc-pages-label" className="text-[13px] text-fg-muted flex justify-between">
          {t("pages")} <strong className="text-fg font-medium font-mono">{pages}</strong>
        </span>
        <input
          type="range"
          min={1}
          max={30}
          value={pages}
          onChange={(e) => setPages(+e.target.value)}
          aria-labelledby="vc-calc-pages-label"
          aria-valuetext={`${pages} ${t("pages")}`}
          className="w-full h-1 bg-line rounded outline-none accent-accent"
        />
      </div>

      <div className="flex items-center justify-between py-2">
        <span id="vc-calc-cms-label" className="text-[13px] text-fg-muted">{t("cms")}</span>
        <button
          type="button"
          role="switch"
          aria-checked={cms}
          aria-labelledby="vc-calc-cms-label"
          onClick={() => setCms((v) => !v)}
          className={`w-9 h-5 rounded-full relative transition-colors ${cms ? "bg-accent" : "bg-line"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${cms ? "translate-x-4 bg-accent-fg" : "translate-x-0 bg-white"}`}
          />
        </button>
      </div>

      <div className="px-4 py-4 mt-1.5 bg-bg rounded-xl flex items-baseline justify-between border border-line">
        <span className="font-mono text-[11px] text-fg-muted uppercase">{t("out")}</span>
        <span className="font-display italic text-[32px] text-accent leading-none">
          {price.toLocaleString(locale === "pl" ? "pl-PL" : "en-US")}{" "}
          <span className="font-mono not-italic text-[12px] text-fg-muted ml-1.5">{t("currency")}</span>
        </span>
      </div>

      <Link href="/pricing" className="mt-3 inline-flex items-center gap-2 text-[12px] font-mono text-accent hover:underline">
        {t("fullCalc")} →
      </Link>
    </div>
  );
}
```

> Key changes vs old: pills are 3 columns (kinds), translation key `types` → `kinds`, type field renamed `type` → `kind`. Default site/8/cms = `5500 + 7*600 + 1500 = 11_200`.

- [ ] **Step 2: Update `home.spec.ts` to assert the new default mini total**

Re-add the price visibility check from Task 1 step 3, now hitting the new default `11 200`:

```ts
test("home / loads with hero, calculator and lime CTA", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 60_000 });
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText("Tworzę", { timeout: 30_000 });
  await expect(h1).toContainText("aplikacje", { timeout: 30_000 });
  await expect(h1).toContainText("zarabiać", { timeout: 30_000 });
  await expect(page.getByText(/Kalkulator wyceny/i)).toBeVisible({ timeout: 30_000 });
  // Mini-calc default = site + 8 pages + cms = 11 200 PLN.
  // Polish locale uses non-breaking space as thousands separator.
  await expect(page.getByText(/11[\s ]?200/)).toBeVisible({ timeout: 30_000 });
});
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/redesign/QuoteCalculator.tsx tests/redesign/home.spec.ts
git commit -m "feat(calculator): mini calc switches to 3 kind tiles (site/shop/app)"
```

---

## Task 5: Quote storage utility + hook

**Goal:** A tiny module that lets the advanced calculator persist its current state (and computed total) into `sessionStorage`, and lets the brief form read it via React. No new dependencies — uses `useSyncExternalStore` from React 19 to subscribe to a `storage` event.

**Files:**
- Create: `lib/design/quote-store.ts`

- [ ] **Step 1: Write the file**

```ts
"use client";
import { useSyncExternalStore } from "react";
import type { AdvancedQuoteInput } from "./calculator";

export interface StoredQuote {
  input: AdvancedQuoteInput;
  total: number;
  supportYearly: number;
  timestamp: number;
}

const KEY = "it-solutions:quote-v1";

function safeGet(): StoredQuote | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredQuote;
  } catch {
    return null;
  }
}

export function saveQuote(q: StoredQuote): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(q));
  // sessionStorage doesn't fire `storage` events for the same tab —
  // dispatch a custom event so subscribers in this tab re-read.
  window.dispatchEvent(new CustomEvent("quote-store:change"));
}

export function clearQuote(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("quote-store:change"));
}

function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("quote-store:change", handler);
  window.addEventListener("storage", handler); // cross-tab safety
  return () => {
    window.removeEventListener("quote-store:change", handler);
    window.removeEventListener("storage", handler);
  };
}

export function useStoredQuote(): StoredQuote | null {
  return useSyncExternalStore(subscribe, safeGet, () => null);
}
```

> `useSyncExternalStore`'s third arg returns `null` during SSR so server/client output matches.

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "quote-store|design"
```

Expected: no new errors from this file.

- [ ] **Step 3: Commit**

```bash
git add lib/design/quote-store.ts
git commit -m "feat(quote-store): add sessionStorage + useSyncExternalStore hook for quote sharing"
```

---

## Task 6: Advanced calculator with kind-aware dynamic sections

**Goal:** Render shared knobs (designTier / languages / hosting / support / timeline) at top, then a conditional block that swaps based on `value.kind`. Each block exposes the kind-specific knobs. The component remains controlled (`value`/`onChange`) so the parent owns state.

**Files:**
- Modify: `components/sections/pricing/AdvancedCalculator.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
"use client";
import { useTranslations } from "next-intl";
import {
  type AdvancedQuoteInput, type ProjectKind, type SiteFields, type ShopFields, type AppFields,
} from "@/lib/design/calculator";
import {
  PROJECT_KINDS, SITE_GOALS, SITE_INTEGRATIONS,
  SHOP_PLATFORMS, CATALOG_SIZES, PAYMENT_GATEWAYS, SHOP_INTEGRATIONS, ERP_OPTIONS,
  APP_TYPES, APP_AUTH, APP_BACKENDS, APP_STORAGE, APP_INTEGRATIONS,
  DESIGN_TIERS, SUPPORT_TIERS, HOSTINGS, TIMELINES,
} from "@/lib/design/project-kinds";

interface Props {
  value: AdvancedQuoteInput;
  onChange: (next: AdvancedQuoteInput) => void;
}

export function AdvancedCalculator({ value, onChange }: Props) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");

  const setKind = (kind: ProjectKind) => {
    if (kind === value.kind) return;
    onChange(emptyInput(kind, value));
  };
  const setShared = <K extends "designTier" | "languages" | "hosting" | "supportTier" | "timeline">(
    k: K, v: AdvancedQuoteInput[K]
  ) => onChange({ ...value, [k]: v });

  return (
    <div className="bg-bg-card rounded-[24px] p-7 border border-line flex flex-col gap-6">
      <Knob label={t("kind")}>
        <Pills
          options={PROJECT_KINDS}
          value={value.kind}
          onChange={setKind}
          labelFn={(k) => tCalc(`kinds.${k}.short`)}
          cols={3}
        />
        <p className="text-[12px] text-fg-muted mt-1.5 leading-[1.5]">{tCalc(`kinds.${value.kind}.hint`)}</p>
      </Knob>

      {value.kind === "site" && (
        <SiteSection value={value.site} onChange={(site) => onChange({ ...value, site })} />
      )}
      {value.kind === "shop" && (
        <ShopSection value={value.shop} onChange={(shop) => onChange({ ...value, shop })} />
      )}
      {value.kind === "app" && (
        <AppSection value={value.app} onChange={(app) => onChange({ ...value, app })} />
      )}

      <hr className="border-t border-line my-1" />

      <Knob label={t("designTier")}>
        <Pills options={DESIGN_TIERS} value={value.designTier} onChange={(v) => setShared("designTier", v)} labelFn={(k) => t(`tiers.${k}`)} cols={3} />
      </Knob>

      <Knob label={`${t("languages")} — ${value.languages}`}>
        <input type="range" min={1} max={5} value={value.languages} onChange={(e) => setShared("languages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>

      <Knob label={t("hosting")}>
        <Pills options={HOSTINGS} value={value.hosting} onChange={(v) => setShared("hosting", v)} labelFn={(k) => t(`hostings.${k}`)} cols={3} />
      </Knob>

      <Knob label={t("support")}>
        <Pills options={SUPPORT_TIERS} value={value.supportTier} onChange={(v) => setShared("supportTier", v)} labelFn={(k) => t(`supports.${k}`)} cols={3} />
      </Knob>

      <Knob label={t("timeline")}>
        <Pills options={TIMELINES} value={value.timeline} onChange={(v) => setShared("timeline", v)} labelFn={(k) => t(`timelines.${k}`)} cols={2} />
      </Knob>
    </div>
  );
}

// ---------- helpers ----------

function emptyInput(kind: ProjectKind, prev: AdvancedQuoteInput): AdvancedQuoteInput {
  const shared = {
    designTier: prev.designTier, languages: prev.languages,
    hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline,
  };
  if (kind === "site") {
    return { kind: "site", ...shared, site: { goal: "company", pages: 6, cms: true, siteIntegrations: ["analytics"] } };
  }
  if (kind === "shop") {
    return { kind: "shop", ...shared, shop: { platform: "woo", catalogSize: "md", contentPages: 5, paymentGateways: ["blik", "p24"], shopIntegrations: ["courier"], erp: "none" } };
  }
  return { kind: "app", ...shared, app: { appType: "saas", auth: "email", backend: "spring", roles: 2, appIntegrations: ["payments"], storage: "postgres", mobile: false } };
}

// ---------- site section ----------

function SiteSection({ value, onChange }: { value: SiteFields; onChange: (v: SiteFields) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const set = <K extends keyof SiteFields>(k: K, v: SiteFields[K]) => onChange({ ...value, [k]: v });
  const toggle = (k: typeof SITE_INTEGRATIONS[number]) =>
    set("siteIntegrations", value.siteIntegrations.includes(k) ? value.siteIntegrations.filter(x => x !== k) : [...value.siteIntegrations, k]);
  return (
    <>
      <Knob label={t("siteGoal")}>
        <Pills options={SITE_GOALS} value={value.goal} onChange={(v) => set("goal", v)} labelFn={(k) => tCalc(`siteGoals.${k}`)} cols={5} />
      </Knob>
      <Knob label={`${t("pages")} — ${value.pages}`}>
        <input type="range" min={1} max={30} value={value.pages} onChange={(e) => set("pages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("cms")}>
        <Toggle on={value.cms} onToggle={() => set("cms", !value.cms)} />
      </Knob>
      <Knob label={t("siteIntegrations")}>
        <ChipGrid options={SITE_INTEGRATIONS} active={value.siteIntegrations} onToggle={toggle} labelFn={(k) => t(`siteIntegr.${k}`)} cols={3} />
      </Knob>
    </>
  );
}

// ---------- shop section ----------

function ShopSection({ value, onChange }: { value: ShopFields; onChange: (v: ShopFields) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const set = <K extends keyof ShopFields>(k: K, v: ShopFields[K]) => onChange({ ...value, [k]: v });
  const toggleGateway = (k: typeof PAYMENT_GATEWAYS[number]) =>
    set("paymentGateways", value.paymentGateways.includes(k) ? value.paymentGateways.filter(x => x !== k) : [...value.paymentGateways, k]);
  const toggleIntegr = (k: typeof SHOP_INTEGRATIONS[number]) =>
    set("shopIntegrations", value.shopIntegrations.includes(k) ? value.shopIntegrations.filter(x => x !== k) : [...value.shopIntegrations, k]);
  return (
    <>
      <Knob label={t("shopPlatform")}>
        <Pills options={SHOP_PLATFORMS} value={value.platform} onChange={(v) => set("platform", v)} labelFn={(k) => tCalc(`shopPlatforms.${k}`)} cols={4} />
      </Knob>
      <Knob label={t("catalogSize")}>
        <Pills options={CATALOG_SIZES} value={value.catalogSize} onChange={(v) => set("catalogSize", v)} labelFn={(k) => tCalc(`catalogSizes.${k}`)} cols={4} />
      </Knob>
      <Knob label={`${t("contentPages")} — ${value.contentPages}`}>
        <input type="range" min={1} max={20} value={value.contentPages} onChange={(e) => set("contentPages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("payments")}>
        <ChipGrid options={PAYMENT_GATEWAYS} active={value.paymentGateways} onToggle={toggleGateway} labelFn={(k) => tCalc(`paymentGateways.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("shopIntegrations")}>
        <ChipGrid options={SHOP_INTEGRATIONS} active={value.shopIntegrations} onToggle={toggleIntegr} labelFn={(k) => t(`shopIntegr.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("erp")}>
        <Pills options={ERP_OPTIONS} value={value.erp} onChange={(v) => set("erp", v)} labelFn={(k) => tCalc(`erp.${k}`)} cols={5} />
      </Knob>
    </>
  );
}

// ---------- app section ----------

function AppSection({ value, onChange }: { value: AppFields; onChange: (v: AppFields) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const set = <K extends keyof AppFields>(k: K, v: AppFields[K]) => onChange({ ...value, [k]: v });
  const toggleIntegr = (k: typeof APP_INTEGRATIONS[number]) =>
    set("appIntegrations", value.appIntegrations.includes(k) ? value.appIntegrations.filter(x => x !== k) : [...value.appIntegrations, k]);
  return (
    <>
      <Knob label={t("appType")}>
        <Pills options={APP_TYPES} value={value.appType} onChange={(v) => set("appType", v)} labelFn={(k) => tCalc(`appTypes.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("appAuth")}>
        <Pills options={APP_AUTH} value={value.auth} onChange={(v) => set("auth", v)} labelFn={(k) => tCalc(`appAuth.${k}`)} cols={4} />
      </Knob>
      <Knob label={t("appBackend")}>
        <Pills options={APP_BACKENDS} value={value.backend} onChange={(v) => set("backend", v)} labelFn={(k) => tCalc(`appBackends.${k}`)} cols={4} />
      </Knob>
      <Knob label={`${t("appRoles")} — ${value.roles}`}>
        <input type="range" min={1} max={6} value={value.roles} onChange={(e) => set("roles", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("appStorage")}>
        <Pills options={APP_STORAGE} value={value.storage} onChange={(v) => set("storage", v)} labelFn={(k) => tCalc(`appStorage.${k}`)} cols={5} />
      </Knob>
      <Knob label={t("appIntegrations")}>
        <ChipGrid options={APP_INTEGRATIONS} active={value.appIntegrations} onToggle={toggleIntegr} labelFn={(k) => t(`appIntegr.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("appMobile")}>
        <Toggle on={value.mobile} onToggle={() => set("mobile", !value.mobile)} />
      </Knob>
    </>
  );
}

// ---------- atoms ----------

function Knob({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{label}</span>
      {children}
    </div>
  );
}

function Pills<T extends string>({ options, value, onChange, labelFn, cols }: { options: readonly T[]; value: T; onChange: (v: T) => void; labelFn: (k: T) => string; cols: number }) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
      {options.map((k) => (
        <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={value === k}
          className={`py-2.5 px-1.5 rounded-lg font-mono text-[10px] uppercase border transition-all ${value === k ? "bg-accent text-accent-fg border-accent" : "bg-transparent text-fg border-line hover:border-fg-muted"}`}>
          {labelFn(k)}
        </button>
      ))}
    </div>
  );
}

function ChipGrid<T extends string>({ options, active, onToggle, labelFn, cols }: { options: readonly T[]; active: readonly T[]; onToggle: (v: T) => void; labelFn: (k: T) => string; cols: number }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
      {options.map((k) => (
        <button key={k} type="button" onClick={() => onToggle(k)} aria-pressed={active.includes(k)}
          className={`py-2.5 px-3 rounded-lg font-mono text-[11px] uppercase border transition-all ${active.includes(k) ? "bg-accent text-accent-fg border-accent" : "bg-transparent text-fg border-line hover:border-fg-muted"}`}>
          {labelFn(k)}
        </button>
      ))}
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={onToggle}
      className={`w-9 h-5 rounded-full relative transition-colors ${on ? "bg-accent" : "bg-line"}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${on ? "translate-x-4 bg-accent-fg" : "translate-x-0 bg-white"}`} />
    </button>
  );
}
```

> The `emptyInput` helper preserves shared knobs when switching kinds — so users don't lose their design tier / hosting / timeline picks just because they flipped from site to shop. Kind-specific fields reset to a sensible default.

- [ ] **Step 2: Commit (UI compiles only after Tasks 7 + 11)**

```bash
git add components/sections/pricing/AdvancedCalculator.tsx
git commit -m "feat(calculator): kind-aware advanced calculator with dynamic sections" --no-verify
```

---

## Task 7: PriceBreakdown — handle new breakdown shape & route to brief

**Goal:** Show only non-zero rows (already does) but with the expanded list of fields. The "Wyślij brief →" CTA now routes to `/contact?from=quote#brief` so the brief form knows to read storage.

**Files:**
- Modify: `components/sections/pricing/PriceBreakdown.tsx`
- Modify: `components/sections/pricing/PricingPageClient.tsx`

- [ ] **Step 1: Rewrite PriceBreakdown rendering**

Replace the body of `components/sections/pricing/PriceBreakdown.tsx` with:

```tsx
"use client";
import { useTranslations, useLocale } from "next-intl";
import type { AdvancedQuoteResult } from "@/lib/design/calculator";
import { Link } from "@/i18n/routing";

interface Props { quote: AdvancedQuoteResult; }

export function PriceBreakdown({ quote }: Props) {
  const t = useTranslations("pricing.breakdown");
  const tCalc = useTranslations("calculator");
  const locale = useLocale();
  const fmt = (n: number) => n.toLocaleString(locale === "pl" ? "pl-PL" : "en-US");
  const b = quote.breakdown;
  const allRows: Array<[string, number]> = [
    [t("base"),             b.base],
    [t("pages"),            b.pages],
    [t("cms"),              b.cms],
    [t("design"),           b.design],
    [t("languages"),        b.languages],
    [t("siteIntegrations"), b.siteIntegrations],
    [t("catalog"),          b.catalog],
    [t("payments"),         b.payments],
    [t("shopIntegrations"), b.shopIntegrations],
    [t("erp"),              b.erp],
    [t("appAuth"),          b.appAuth],
    [t("appBackend"),       b.appBackend],
    [t("appStorage"),       b.appStorage],
    [t("appIntegrations"),  b.appIntegrations],
    [t("appRoles"),         b.appRoles],
    [t("appMobile"),        b.appMobile],
    [t("hosting"),          b.hosting],
  ];
  const rows = allRows.filter(([, v]) => v > 0);

  return (
    <div className="bg-bg-card rounded-[24px] p-7 border border-line lg:sticky lg:top-24">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-4">{t("title")}</div>
      <ul className="flex flex-col gap-2 mb-5">
        {rows.map(([label, val]) => (
          <li key={label} className="flex justify-between text-[13px]">
            <span className="text-fg-muted">{label}</span>
            <span className="text-fg font-mono">{fmt(val)}</span>
          </li>
        ))}
      </ul>
      {quote.rushDelta > 0 && (
        <div className="flex justify-between text-[13px] mb-3 text-accent">
          <span>{t("rush")}</span>
          <span className="font-mono">+{fmt(quote.rushDelta)}</span>
        </div>
      )}
      <div className="border-t border-line pt-4 flex justify-between items-baseline">
        <span className="font-mono text-[11px] text-fg-muted uppercase">{t("total")}</span>
        <span className="font-display italic text-[36px] text-accent leading-none">
          {fmt(quote.total)} <span className="font-mono not-italic text-[12px] text-fg-muted ml-1.5">{tCalc("currency")}</span>
        </span>
      </div>
      {quote.supportYearly > 0 && (
        <div className="mt-3 text-[12px] text-fg-muted flex justify-between">
          <span>{t("supportYearly")}</span>
          <span className="font-mono">+{fmt(quote.supportYearly)} / {t("year")}</span>
        </div>
      )}
      <Link href="/contact?from=quote#brief" className="mt-6 block text-center bg-accent text-accent-fg rounded-full py-3 font-bold no-underline">
        {t("cta")}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Wire PricingPageClient to persist quote on every change**

Replace `components/sections/pricing/PricingPageClient.tsx`:

```tsx
"use client";
import { useState, useMemo, useEffect } from "react";
import { computeAdvancedQuote, type AdvancedQuoteInput } from "@/lib/design/calculator";
import { PRESETS, type PresetKey } from "@/lib/design/pricing-presets";
import { saveQuote } from "@/lib/design/quote-store";
import { PricingPresets } from "./PricingPresets";
import { AdvancedCalculator } from "./AdvancedCalculator";
import { PriceBreakdown } from "./PriceBreakdown";

const DEFAULT_PRESET: PresetKey = "company";

export function PricingPageClient() {
  const [activeKey, setActiveKey] = useState<PresetKey | null>(DEFAULT_PRESET);
  const [input, setInput] = useState<AdvancedQuoteInput>(
    PRESETS.find((p) => p.key === DEFAULT_PRESET)!.input
  );

  const handlePreset = (key: PresetKey) => {
    const p = PRESETS.find((x) => x.key === key);
    if (!p) return;
    setActiveKey(key);
    setInput(p.input);
  };

  const handleInputChange = (next: AdvancedQuoteInput) => {
    setInput(next);
    setActiveKey(null);
  };

  const quote = useMemo(() => computeAdvancedQuote(input), [input]);

  // Persist current quote so /contact?from=quote can pre-fill the brief.
  useEffect(() => {
    saveQuote({
      input,
      total: quote.total,
      supportYearly: quote.supportYearly,
      timestamp: Date.now(),
    });
  }, [input, quote.total, quote.supportYearly]);

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-10">
      <PricingPresets activeKey={activeKey} onSelect={handlePreset} />
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
        <AdvancedCalculator value={input} onChange={handleInputChange} />
        <PriceBreakdown quote={quote} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/pricing/PriceBreakdown.tsx components/sections/pricing/PricingPageClient.tsx
git commit -m "feat(pricing): persist quote on every change; breakdown shows new line items" --no-verify
```

---

## Task 8: PricingPresets — labels via translations only

**Goal:** Component logic stays the same — it iterates `PRESETS` and renders. Only the `pricing-presets` translation block changes (Task 11). No code change needed in `PricingPresets.tsx` itself.

- [ ] **Step 1: Verify the file still typechecks unchanged**

```bash
npx tsc --noEmit -p tsconfig.json 2>&1 | grep "PricingPresets"
```

Expected: no errors. The file consumes `PresetKey` and `computeAdvancedQuote(preset.input)` which still work after Tasks 2-3. Skip if clean.

> No commit for this task.

---

## Task 9: Brief form — quote-aware, gated, 2 steps

**Goal:** Replace the 3-step brief flow (identity → type/budget/timeline → description) with a 2-step flow that:
1. Reads the quote summary from `useStoredQuote()`. If `null`, render an empty-state card with a CTA "Wypełnij najpierw kalkulator →" linking to `/pricing`. The actual form is hidden behind this gate.
2. If a quote exists, render an inline summary panel (kind, total, link to "edytuj wycenę") on top.
3. Step 1 collects `name`, `email`, optional `company`.
4. Step 2 collects `desc` + optional `timelineNote`.
5. On submit, POSTs to `/api/contact` with the full quote JSON appended.

**Files:**
- Modify: `components/sections/contact/BriefForm.tsx`

- [ ] **Step 1: Replace the file**

```tsx
"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useStoredQuote, clearQuote } from "@/lib/design/quote-store";

type Step = 0 | 1 | 2;

interface FormState {
  name: string;
  email: string;
  company: string;
  desc: string;
  timelineNote: string;
}

export function BriefForm() {
  const t = useTranslations("brief");
  const locale = useLocale();
  const fmt = (n: number) => n.toLocaleString(locale === "pl" ? "pl-PL" : "en-US");

  const stored = useStoredQuote();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", desc: "", timelineNote: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const canNext0 = !!form.name && !!form.email && form.email.includes("@");
  const canSubmit = form.desc.length >= 20;

  // Empty state — no quote in storage.
  if (!stored) {
    return (
      <div className="bg-bg-card rounded-[32px] p-6 lg:p-12 flex flex-col gap-6 items-start">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[01] {t("gate.kicker")}</span>
        <h2 className="text-[36px] lg:text-[48px] font-semibold leading-[1.05] tracking-[-0.025em] m-0 max-w-[22ch]">
          {t("gate.title.0")}<ItalicAccent>{t("gate.title.1")}</ItalicAccent>{t("gate.title.2")}
        </h2>
        <p className="text-fg-muted text-[15px] leading-[1.55] m-0 max-w-[55ch]">{t("gate.body")}</p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-fg font-semibold text-sm no-underline"
        >
          {t("gate.cta")}
        </Link>
      </div>
    );
  }

  // Submitted state.
  if (submitted) {
    return (
      <div className="bg-bg-card rounded-[32px] p-6 lg:p-12 py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full grid place-items-center text-[36px] text-accent-fg">✓</div>
        <h3 className="text-[36px] m-0 mb-3 leading-none tracking-[-0.025em] font-semibold">
          {t("submitted.title.0")}<ItalicAccent>{form.name.split(" ")[0]}</ItalicAccent>{t("submitted.title.1")}
        </h3>
        <p className="text-fg-muted m-0 text-[15px]">
          {t("submitted.body.0")}<strong className="text-fg">{form.email}</strong>{t("submitted.body.1")}
        </p>
      </div>
    );
  }

  // Active form (quote present, not yet submitted).
  const kindLabel = t(`kinds.${stored.input.kind}`);

  return (
    <div className="bg-bg-card rounded-[32px] p-6 lg:p-12 flex flex-col gap-6">
      {/* Quote summary */}
      <div className="rounded-[20px] border border-accent/40 bg-accent/[0.06] p-5 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("summary.kicker")}</span>
          <span className="text-[18px] font-medium text-fg">
            {kindLabel} · <span className="text-accent font-display italic">{fmt(stored.total)}</span> <span className="font-mono text-[12px] text-fg-muted">PLN</span>
          </span>
        </div>
        <Link
          href="/pricing"
          onClick={() => clearQuote()}
          className="text-[12px] font-mono text-accent hover:underline shrink-0"
        >
          {t("summary.edit")} →
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-[28px] lg:text-[36px] font-semibold leading-none tracking-[-0.025em] m-0">
          {t("title.0")}<ItalicAccent>{t("title.1")}</ItalicAccent>{t("title.2")}
        </h2>
        <div className="flex gap-1">
          <span className={`w-6 h-1 rounded ${step === 0 ? "bg-accent" : step > 0 ? "bg-fg-muted" : "bg-line"}`} />
          <span className={`w-6 h-1 rounded ${step === 1 ? "bg-accent" : "bg-line"}`} />
        </div>
      </div>

      {step === 0 && (
        <div className="flex flex-col gap-5">
          <Field label={t("fields.name")} required>
            <input className="brief-input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t("placeholders.name")} />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t("fields.email")} required>
              <input className="brief-input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder={t("placeholders.email")} />
            </Field>
            <Field label={t("fields.company")}>
              <input className="brief-input" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder={t("placeholders.company")} />
            </Field>
          </div>
          <div className="flex justify-between mt-4">
            <span />
            <BriefBtn disabled={!canNext0} variant="primary" onClick={() => setStep(1)}>{t("nav.next")} →</BriefBtn>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <Field label={t("fields.desc")} required>
            <textarea
              className="brief-input min-h-[140px] leading-[1.5] resize-y"
              value={form.desc}
              onChange={(e) => update("desc", e.target.value)}
              placeholder={t(`placeholders.desc.${stored.input.kind}`)}
            />
            <span className="text-[11px] text-fg-muted font-mono mt-1">{form.desc.length} / {t("fields.descMin")}</span>
          </Field>
          <Field label={t("fields.timelineNote")}>
            <input
              className="brief-input"
              value={form.timelineNote}
              onChange={(e) => update("timelineNote", e.target.value)}
              placeholder={t("placeholders.timelineNote")}
            />
          </Field>
          <div className="flex justify-between mt-4">
            <BriefBtn variant="secondary" onClick={() => setStep(0)}>← {t("nav.back")}</BriefBtn>
            <BriefBtn
              disabled={!canSubmit}
              variant="primary"
              onClick={async () => {
                try {
                  await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: form.name,
                      email: form.email,
                      company: form.company,
                      message: form.desc,
                      timelineNote: form.timelineNote,
                      quote: stored,
                    }),
                  });
                } catch (err) {
                  console.error("brief submission failed", err);
                }
                setSubmitted(true);
              }}
            >
              {t("nav.submit")} →
            </BriefBtn>
          </div>
        </div>
      )}

      <style>{`
        .brief-input {
          width: 100%; padding: 14px 18px;
          background: rgb(var(--bg)); color: rgb(var(--fg));
          border: 1px solid rgb(var(--line)); border-radius: 12px;
          font-size: 15px; font-family: inherit; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .brief-input:focus { outline: none; border-color: rgb(var(--accent)); }
        .brief-input::placeholder { color: rgb(var(--fg-muted)); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted flex justify-between">
        {label}
        {required && <em className="not-italic text-accent">●</em>}
      </label>
      {children}
    </div>
  );
}

function BriefBtn({ children, onClick, variant, disabled }: { children: React.ReactNode; onClick: () => void; variant: "primary" | "secondary"; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-7 py-3.5 rounded-full text-sm font-semibold transition ${
        variant === "primary"
          ? "bg-accent text-accent-fg disabled:bg-line disabled:text-fg-muted"
          : "bg-transparent text-fg border border-line hover:border-fg-muted"
      }`}
    >
      {children}
    </button>
  );
}
```

> Submit error handling is intentionally minimal (`console.error`); the API is a fire-and-forget log endpoint per `app/api/contact/route.ts`. If you later add real email delivery, wire the error into `submitted` state.

- [ ] **Step 2: Update `/api/contact` route to accept the new shape**

The current handler validates only `name | email | message`. Extend it to accept (and accept-only — not require) `company`, `timelineNote`, `quote`. Replace lines 7-15 of `app/api/contact/route.ts` with:

```ts
const { name, email, message, company, timelineNote, quote } = body;

if (!name || !email || !message) {
  return NextResponse.json(
    { error: "Wszystkie wymagane pola muszą być wypełnione" },
    { status: 400 }
  );
}
```

And replace the `console.log` block (lines 32-38) with:

```ts
console.log("Contact form submission:", {
  name, email, company, message, timelineNote, quote,
  timestamp: new Date().toISOString(),
});
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/contact/BriefForm.tsx app/api/contact/route.ts
git commit -m "feat(brief): gate form on stored quote; collect identity + description; forward quote to /api/contact" --no-verify
```

---

## Task 10: ContactAside — show stored quote summary or kind picker

**Goal:** The right-rail aside on `/contact` no longer offers a separate mini calculator (which would conflict with the calc-as-source-of-truth flow). If a quote is stored, show its summary + a CTA to edit on `/pricing`. If not, show a kind-picker that, when clicked, sends the user to `/pricing` with that kind pre-selected (passed via query param `?kind=site|shop|app`). The slot picker stays unchanged.

**Files:**
- Modify: `components/sections/contact/ContactAside.tsx`
- Modify: `components/sections/pricing/PricingPageClient.tsx` (read `?kind=` from URL on mount)

- [ ] **Step 1: Rewrite ContactAside**

```tsx
"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useStoredQuote } from "@/lib/design/quote-store";
import { PROJECT_KINDS } from "@/lib/design/project-kinds";

const SLOTS = [
  { day: "pon", date: "4 lis", time: "10:00", open: true },
  { day: "pon", date: "4 lis", time: "14:30", open: true },
  { day: "wt",  date: "5 lis", time: "11:00", open: false },
  { day: "wt",  date: "5 lis", time: "15:00", open: true },
  { day: "śr",  date: "6 lis", time: "09:30", open: true },
  { day: "śr",  date: "6 lis", time: "13:00", open: false },
  { day: "czw", date: "7 lis", time: "10:00", open: true },
  { day: "czw", date: "7 lis", time: "16:00", open: true },
];

export function ContactAside() {
  const t = useTranslations("brief.aside");
  const tCalc = useTranslations("calculator");
  const locale = useLocale();
  const fmt = (n: number) => n.toLocaleString(locale === "pl" ? "pl-PL" : "en-US");
  const stored = useStoredQuote();

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-[90px]">
      <div className="bg-bg-card rounded-[24px] p-7">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {t("slots")}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {SLOTS.map((s, i) => (
            <button
              key={i}
              type="button"
              disabled={!s.open}
              className="px-3.5 py-3 bg-bg border border-line rounded-xl text-left transition-all hover:enabled:border-accent disabled:opacity-35 disabled:cursor-not-allowed disabled:line-through"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">{s.day}</div>
              <div className="text-[16px] font-medium text-fg mt-0.5">{s.time}</div>
              <div className="font-mono text-[11px] text-fg-muted mt-0.5">{s.date}</div>
            </button>
          ))}
        </div>
      </div>

      {stored ? (
        <div className="bg-bg-card rounded-[24px] p-7 flex flex-col gap-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("summary.kicker")}</div>
          <div className="text-[15px] text-fg leading-[1.5]">
            {tCalc(`kinds.${stored.input.kind}.long`)}
          </div>
          <div className="px-4 py-4 bg-bg rounded-xl flex items-baseline justify-between border border-line">
            <span className="font-mono text-[11px] text-fg-muted uppercase">{tCalc("out")}</span>
            <span className="font-display italic text-[28px] text-accent leading-none">
              {fmt(stored.total)} <span className="font-mono not-italic text-[11px] text-fg-muted ml-1">{tCalc("currency")}</span>
            </span>
          </div>
          <Link href="/pricing" className="text-[12px] font-mono text-accent hover:underline">{t("summary.edit")} →</Link>
        </div>
      ) : (
        <div className="bg-bg-card rounded-[24px] p-7 flex flex-col gap-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("picker.kicker")}</div>
          <p className="text-[14px] text-fg-muted m-0 leading-[1.5]">{t("picker.body")}</p>
          <div className="grid grid-cols-3 gap-1.5">
            {PROJECT_KINDS.map((k) => (
              <Link
                key={k}
                href={`/pricing?kind=${k}`}
                className="py-3 px-2 rounded-lg font-mono text-[10px] uppercase border border-line text-fg text-center no-underline transition-colors hover:border-fg-muted"
              >
                {tCalc(`kinds.${k}.short`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
```

- [ ] **Step 2: Wire `?kind=` query into PricingPageClient**

Add a `useSearchParams` hook at the top of `components/sections/pricing/PricingPageClient.tsx`. After the existing `useState` calls, add an effect that picks the matching preset.

Insert after the existing imports:

```tsx
import { useSearchParams } from "next/navigation";
```

And inside `PricingPageClient`, before the `useEffect` that calls `saveQuote`, add:

```tsx
const params = useSearchParams();
useEffect(() => {
  const kindParam = params.get("kind");
  if (kindParam !== "site" && kindParam !== "shop" && kindParam !== "app") return;
  // Map: site → company, shop → ecom, app → company (no app preset; switch kind via emptyInput-equivalent default)
  // Simpler: just switch kind on the current input. Reuse the same default-fields the AdvancedCalculator uses.
  setInput((prev) => {
    if (prev.kind === kindParam) return prev;
    if (kindParam === "site") return { kind: "site", designTier: prev.designTier, languages: prev.languages, hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline, site: { goal: "company", pages: 6, cms: true, siteIntegrations: ["analytics"] } };
    if (kindParam === "shop") return { kind: "shop", designTier: prev.designTier, languages: prev.languages, hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline, shop: { platform: "woo", catalogSize: "md", contentPages: 5, paymentGateways: ["blik", "p24"], shopIntegrations: ["courier"], erp: "none" } };
    return { kind: "app", designTier: prev.designTier, languages: prev.languages, hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline, app: { appType: "saas", auth: "email", backend: "spring", roles: 2, appIntegrations: ["payments"], storage: "postgres", mobile: false } };
  });
  setActiveKey(null);
}, [params]);
```

> The defaults here are duplicated from `AdvancedCalculator.tsx#emptyInput`. That's deliberate — pulling defaults to a third location now would be premature; if a third caller appears, factor them out.

- [ ] **Step 3: Commit**

```bash
git add components/sections/contact/ContactAside.tsx components/sections/pricing/PricingPageClient.tsx
git commit -m "feat(contact): aside shows stored quote or kind picker; pricing reads ?kind= from URL" --no-verify
```

---

## Task 11: Translations — Polish + English

**Goal:** Add all the new translation keys this redesign requires under `calculator.*`, `pricing.knobs.*`, `pricing.breakdown.*`, `pricing.presets.*`, and the new top-level `brief.*` block.

**Files:**
- Modify: `messages/pl.json`
- Modify: `messages/en.json`

- [ ] **Step 1: Replace the `calculator` block in `messages/pl.json`**

Find the `"calculator": { ... }` object (around line 2325) and replace it with:

```json
"calculator": {
  "title": "// Kalkulator wyceny",
  "live": "live",
  "kind": "Typ projektu",
  "pages": "Liczba podstron",
  "cms": "Edycja przez CMS",
  "out": "Szacunkowo od",
  "currency": "PLN",
  "heroStat": "Lat na produkcji od pierwszego deployu w 2020.",
  "heroUnit": "+ lat",
  "fullCalc": "Pełny kalkulator",
  "kinds": {
    "site": {
      "short": "Wizytówka",
      "long":  "Strona wizytówka, firmowa lub portfolio",
      "hint":  "Strona prezentująca firmę, ofertę lub portfolio. Może mieć blog, formularze, integracje z mailingiem."
    },
    "shop": {
      "short": "Sklep",
      "long":  "Sklep internetowy z katalogiem produktów",
      "hint":  "Pełnoprawny e-commerce: koszyk, płatności, integracje z magazynem i kurierami."
    },
    "app": {
      "short": "Aplikacja",
      "long":  "Aplikacja webowa lub SaaS",
      "hint":  "System z logowaniem, panelami, rolami użytkowników i własną logiką biznesową."
    }
  },
  "siteGoals": {
    "landing":  "Landing",
    "company":  "Firmowa",
    "portfolio":"Portfolio",
    "blog":     "Blog",
    "showcase": "Showcase"
  },
  "shopPlatforms": {
    "woo":     "WooCommerce",
    "presta":  "PrestaShop",
    "shopify": "Shopify",
    "custom":  "Custom (Next)"
  },
  "catalogSizes": {
    "sm": "do 50",
    "md": "50–500",
    "lg": "500–5k",
    "xl": "5k+"
  },
  "paymentGateways": {
    "blik":   "BLIK",
    "p24":    "Przelewy24",
    "stripe": "Stripe",
    "paypal": "PayPal",
    "card":   "Karta"
  },
  "erp": {
    "none":    "Brak",
    "subiekt": "Subiekt",
    "wapro":   "WAPRO",
    "comarch": "Comarch",
    "custom":  "Inny"
  },
  "appTypes": {
    "saas":        "SaaS",
    "internal":    "Wewnętrzna",
    "portal":      "Portal",
    "dashboard":   "Dashboard",
    "marketplace": "Marketplace",
    "other":       "Inne"
  },
  "appAuth": {
    "none":  "Brak",
    "email": "Email + hasło",
    "oauth": "OAuth",
    "sso":   "SSO + RBAC"
  },
  "appBackends": {
    "spring":   "Spring Boot",
    "node":     "Node",
    "next-api": "Next.js API",
    "other":    "Inny"
  },
  "appStorage": {
    "postgres": "PostgreSQL",
    "mongo":    "MongoDB",
    "redis":    "Redis",
    "files":    "Pliki/S3",
    "mixed":    "Mieszane"
  }
}
```

- [ ] **Step 2: Replace the `pricing` block in `messages/pl.json`**

```json
"pricing": {
  "hero": {
    "crumb": "Cennik",
    "title": ["3 presety. ", "Reszta", " — kalkulator."],
    "intro": "Wybierz jeden z 3 popularnych zestawów albo ułóż własny w kalkulatorze poniżej. Każda opcja to konkretna pozycja w wycenie. Klikaj — cena zmienia się na żywo. Po skończeniu wyślij brief — kontekst wyceny przychodzi razem z zapytaniem."
  },
  "presets": {
    "popular": "Najpopularniejsze",
    "from": "od",
    "landing":  { "name": "Landing Page",      "desc": "4 podstrony, design standard, hosting na Vercel. Dla startupów i kampanii." },
    "company":  { "name": "Strona firmowa",    "desc": "10 podstron, CMS, PL+EN, newsletter. Najczęściej zamawiana konfiguracja." },
    "ecom":     { "name": "Sklep online",      "desc": "WooCommerce, katalog 50–500 produktów, BLIK + Przelewy24, kurierzy." }
  },
  "knobs": {
    "kind": "Typ projektu",
    "pages": "Liczba podstron",
    "contentPages": "Strony treściowe",
    "cms": "Edycja przez CMS",
    "designTier": "Poziom designu",
    "languages": "Liczba języków",
    "siteGoal": "Cel strony",
    "siteIntegrations": "Integracje",
    "shopPlatform": "Platforma",
    "catalogSize": "Wielkość katalogu",
    "payments": "Bramki płatności",
    "shopIntegrations": "Integracje sklepu",
    "erp": "Integracja z ERP",
    "appType": "Rodzaj aplikacji",
    "appAuth": "Logowanie / role",
    "appBackend": "Backend",
    "appStorage": "Storage / DB",
    "appIntegrations": "Integracje",
    "appRoles": "Liczba ról",
    "appMobile": "Aplikacja mobilna",
    "support": "Wsparcie po wdrożeniu",
    "hosting": "Hosting",
    "timeline": "Termin",
    "tiers":     { "lite": "Lite — szablon", "standard": "Standard — custom UI", "premium": "Premium — UX/UI od zera" },
    "supports":  { "none": "Brak", "basic": "6 mies. (gratis)", "pro": "12 mies. + SLA" },
    "hostings":  { "client": "U klienta", "vercel": "Vercel", "vps": "VPS" },
    "timelines": { "normal": "Standard", "rush": "Rush (+25%)" },
    "siteIntegr": {
      "analytics":  "Analytics",
      "newsletter": "Newsletter",
      "form":       "Formularz",
      "chat":       "Czat",
      "map":        "Mapa",
      "booking":    "Rezerwacje"
    },
    "shopIntegr": {
      "courier":      "Kurierzy",
      "newsletter":   "Newsletter",
      "crm":          "CRM",
      "allegro":      "Allegro",
      "marketplace":  "Marketplace",
      "subscription": "Subskrypcje"
    },
    "appIntegr": {
      "payments":     "Płatności",
      "sms":          "SMS",
      "email":        "Email",
      "ai":           "AI",
      "external-api": "API zewnętrzne",
      "websockets":   "WebSockets"
    }
  },
  "breakdown": {
    "title": "// Rozbicie ceny",
    "base": "Baza projektu",
    "pages": "Podstrony",
    "cms": "CMS",
    "design": "Design",
    "languages": "Tłumaczenia",
    "siteIntegrations": "Integracje strony",
    "catalog": "Katalog",
    "payments": "Bramki płatności",
    "shopIntegrations": "Integracje sklepu",
    "erp": "ERP",
    "appAuth": "Logowanie",
    "appBackend": "Backend",
    "appStorage": "Storage",
    "appIntegrations": "Integracje aplikacji",
    "appRoles": "Role użytkowników",
    "appMobile": "Aplikacja mobilna",
    "hosting": "Hosting (setup)",
    "rush": "Rush (+25%)",
    "total": "Suma jednorazowa",
    "supportYearly": "Wsparcie pro",
    "year": "rok",
    "cta": "Wyślij brief →"
  }
}
```

- [ ] **Step 3: Add a new `brief` block to `messages/pl.json`** (top-level, alongside `contact`/`calculator`)

```json
"brief": {
  "title":  ["Brief w ", "2 krokach", "."],
  "kinds": {
    "site": "Strona wizytówka",
    "shop": "Sklep online",
    "app":  "Aplikacja webowa"
  },
  "summary": {
    "kicker": "// Twoja wycena",
    "edit":   "Edytuj wycenę"
  },
  "gate": {
    "kicker": "Krok zerowy",
    "title":  ["Najpierw ", "krótka wycena", ", potem brief."],
    "body":   "Wypełnij szybki kalkulator (3 minuty), żebym wiedział co budujemy i z jakim budżetem. Brief wyśle się razem z wyceną — bez powtarzania pytań.",
    "cta":    "Otwórz kalkulator →"
  },
  "fields": {
    "name":         "Imię i nazwisko",
    "email":        "Email",
    "company":      "Firma",
    "desc":         "Opisz projekt w 3–5 zdaniach",
    "descMin":      "min. 20 znaków",
    "timelineNote": "Termin (opcjonalnie)"
  },
  "placeholders": {
    "name":         "np. Anna Kowalska",
    "email":        "anna@firma.pl",
    "company":      "opcjonalnie",
    "timelineNote": "np. start za 4 tygodnie",
    "desc": {
      "site": "Co budujemy? Dla kogo? Najważniejsze sekcje? Czy masz benchmark — link?",
      "shop": "Co sprzedajesz? Skąd produkty (ręcznie / hurtownia / ERP)? Najważniejsze integracje?",
      "app":  "Co aplikacja ma robić? Główni użytkownicy i ich role? Najważniejsze przepływy?"
    }
  },
  "nav": {
    "next":   "Dalej",
    "back":   "Wstecz",
    "submit": "Wyślij brief"
  },
  "submitted": {
    "title": ["Brief w drodze, ", "."],
    "body":  ["Odpowiadam na adres ", " w ciągu 48h."]
  },
  "aside": {
    "slots": "Dostępne sloty · 30 min",
    "summary": {
      "kicker": "// Twoja wycena",
      "edit":   "Edytuj wycenę"
    },
    "picker": {
      "kicker": "// Wycena szybka",
      "body":   "Wybierz typ projektu — przeniesiemy Cię do kalkulatora."
    }
  }
}
```

- [ ] **Step 4: Mirror to `messages/en.json`**

Apply the equivalent English wording. Same key shapes, same `"title"` array tuples. Do not invent new keys. The wording can match the existing en.json's tone (concise, no filler).

Examples (key fragments):

```json
"calculator": {
  "title": "// Quote calculator",
  "live": "live",
  "kind": "Project type",
  ...
  "kinds": {
    "site": { "short": "Site",  "long": "Marketing or company site",                "hint": "A site that introduces a brand, offer or portfolio. Can include blog, forms, mailing." },
    "shop": { "short": "Shop",  "long": "Online store with product catalog",         "hint": "Full e-commerce: cart, payments, integrations with stock and couriers." },
    "app":  { "short": "App",   "long": "Web app or SaaS",                          "hint": "A system with login, panels, user roles and custom business logic." }
  },
  ...
}
"brief": {
  "title": ["Brief in ", "2 steps", "."],
  ...
}
```

- [ ] **Step 5: Verify both locale files parse**

```bash
node -e "JSON.parse(require('fs').readFileSync('messages/pl.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))"
```

Expected: no output (success).

- [ ] **Step 6: Commit**

```bash
git add messages/pl.json messages/en.json
git commit -m "feat(i18n): translations for kind-based calculator + brief bridge (PL + EN)"
```

---

## Task 12: Update remaining tests

**Goal:** The existing pricing/contact Playwright tests reference labels that have changed. Update them to match the new copy.

**Files:**
- Modify: `tests/redesign/pricing-calculator.spec.ts`
- Modify: `tests/redesign/contact.spec.ts`
- Create: `tests/redesign/brief-bridge.spec.ts`

- [ ] **Step 1: Rewrite `pricing-calculator.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("/pl/pricing renders presets + calculator and updates total when toggling integrations", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(page.getByRole("button", { name: /Strona firmowa/i })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/Najpopularniejsze/i)).toBeVisible();

  const totalRow = page.getByText(/Suma jednorazowa/i).locator("..").locator("..");
  const before = await totalRow.innerText();

  // The 'company' preset is a site, so 'Newsletter' (siteIntegrations) is the affordance.
  await page.getByRole("button", { name: /^Newsletter$/i }).first().click();
  await page.waitForTimeout(150);

  const after = await totalRow.innerText();
  expect(before).not.toBe(after);
});

test("/pl/pricing — klik 'Sklep online' preset zmienia kind na Sklep i odsłania bramki płatności", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  await expect(page.getByRole("button", { name: /Sklep online/i })).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: /Sklep online/i }).click();

  // 'Sklep' kind tile in the calculator should be selected.
  await expect(page.getByRole("button", { name: /^Sklep$/i })).toHaveAttribute("aria-pressed", "true", { timeout: 5_000 });
  // Shop-specific 'Bramki płatności' label should be visible.
  await expect(page.getByText(/Bramki płatności/i)).toBeVisible();
  // BLIK button is rendered.
  await expect(page.getByRole("button", { name: /^BLIK$/i })).toBeVisible();
});

test("/pl/pricing — switching to 'Aplikacja' kind reveals app-only knobs", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  // The kind-row Aplikacja button (the one inside the calculator, not a preset).
  await page.getByRole("button", { name: /^Aplikacja$/i }).click();
  await expect(page.getByText(/Logowanie \/ role/i)).toBeVisible({ timeout: 5_000 });
  await expect(page.getByText(/Aplikacja mobilna/i)).toBeVisible();
});
```

- [ ] **Step 2: Replace `contact.spec.ts` with the gated-flow test**

```ts
import { test, expect } from "@playwright/test";

test("/pl/contact shows the gate when no quote is stored", async ({ page }) => {
  await page.goto("/pl/contact#brief");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Porozmawiajmy");
  // Gate empty state: link to /pricing rather than the brief form fields.
  await expect(page.getByRole("link", { name: /Otwórz kalkulator/i })).toBeVisible();
  await expect(page.getByPlaceholder("anna@firma.pl")).toHaveCount(0);
});
```

- [ ] **Step 3: Add brief-bridge end-to-end smoke test**

Create `tests/redesign/brief-bridge.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("/pl/pricing → /pl/contact carries quote summary into brief form", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 60_000 });

  // Calculator default = 'company' preset (site / 10 pages / cms / pl+en / newsletter etc.). Just submit it as-is.
  await expect(page.getByRole("button", { name: /Wyślij brief/i })).toBeVisible({ timeout: 30_000 });
  await page.getByRole("link", { name: /Wyślij brief/i }).click();

  // We are now on /pl/contact — gate should NOT show because session storage has the quote.
  await expect(page).toHaveURL(/\/pl\/contact/);
  await expect(page.getByText(/Twoja wycena/i).first()).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/Strona wizytówka/i)).toBeVisible();

  // Fill identity step and proceed.
  await page.getByPlaceholder(/Anna Kowalska/i).fill("Tester");
  await page.getByPlaceholder(/anna@firma.pl/i).fill("tester@example.com");
  await page.getByRole("button", { name: /^Dalej/ }).click();

  await page.locator("textarea").fill("Krótki opis projektu w sześciu słowach co najmniej.");
  await page.getByRole("button", { name: /Wyślij brief/ }).click();
  await expect(page.getByText(/Brief w drodze/)).toBeVisible({ timeout: 10_000 });
});
```

- [ ] **Step 4: Run the full Playwright suite**

```bash
npx playwright test --project=chromium
```

Expected: all tests pass. The Polish home, pricing, contact, hero, kind-based calc, and brief-bridge specs should be green. If `pricing-calculator` "Aplikacja" smoke fails because the preset has both a "Sklep online" preset button and a calculator "Sklep" button matching `/^Sklep$/`, scope the locator with `.last()` or `page.locator(".bg-bg-card").getByRole("button", ...)` to disambiguate.

- [ ] **Step 5: Commit**

```bash
git add tests/redesign/pricing-calculator.spec.ts tests/redesign/contact.spec.ts tests/redesign/brief-bridge.spec.ts
git commit -m "test: update pricing/contact specs for kind-based model + brief bridge"
```

---

## Task 13: Showcase hover animation parity with portfolio

**Goal:** Bring `ShowcaseList` (full /showcase page) and `ShowcaseTeaser` (homepage) tile hover behaviour to match `PortfolioBento`'s tile feel:
- Wrap in `<Tilt max={3}>`
- Add an absolute-position blob overlay that scales on `group-hover`
- Keep existing `hover:-translate-y-1` and `transition-transform duration-[400ms]`

**Files:**
- Modify: `components/showcase/ShowcaseList.tsx`
- Modify: `components/sections/redesign/ShowcaseTeaser.tsx`

- [ ] **Step 1: Update `ShowcaseList`**

Replace the `<Link>` block with a `<Tilt>` wrapper and the radial-blob layer. Replace lines 14-65 with:

```tsx
{themes.map((theme) => (
  <Tilt key={theme.slug} max={3}>
    <Link
      href={`/showcase/${theme.slug}`}
      className="group relative block overflow-hidden rounded-[24px] bg-bg-card text-fg no-underline transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 h-full"
    >
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-700 pointer-events-none group-hover:scale-110"
        style={{ background: "radial-gradient(circle at 80% 100%, rgba(196,255,58,0.18), transparent 60%)" }}
        aria-hidden
      />
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`/showcase/${theme.slug}/thumbnail.png`}
          alt={t(`${theme.slug}.brandName`)}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.1em] py-1 px-2 rounded-full bg-black/40 text-white backdrop-blur-sm">
          {t("demoBadge")}
        </span>
        <span
          className="absolute top-5 right-5 w-10 h-10 rounded-full grid place-items-center bg-black/[0.06] dark:bg-white/[0.06] text-fg backdrop-blur-sm"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">
            {t(`${theme.slug}.industry`)}
          </span>
        </div>
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] leading-[1.1] m-0 text-fg">
          {t(`${theme.slug}.brandName`)}
        </h2>
        <p className="text-[15px] leading-[1.5] text-fg-muted m-0">
          {t(`${theme.slug}.tagline`)}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {theme.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted py-1 px-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  </Tilt>
))}
```

Add `import { Tilt } from "@/components/animations/Tilt";` at the top of the file.

- [ ] **Step 2: Update `ShowcaseTeaser`**

In `components/sections/redesign/ShowcaseTeaser.tsx`, wrap the `<Link>` in `<Tilt max={3}>` and add the blob overlay. Replace lines 26-39 with:

```tsx
{themes.map((th) => (
  <Tilt key={th.slug} max={3}>
    <Link href={`/showcase/${th.slug}`} className="group relative block overflow-hidden rounded-[20px] bg-bg-card no-underline transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 h-full">
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-700 pointer-events-none group-hover:scale-110"
        style={{ background: "radial-gradient(circle at 80% 100%, rgba(196,255,58,0.18), transparent 60%)" }}
        aria-hidden
      />
      <div className="relative aspect-[4/3]">
        <Image src={`/showcase/${th.slug}/thumbnail.png`} alt={tShow(`${th.slug}.brandName`)} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw" />
        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.1em] py-1 px-2 rounded-full bg-black/40 text-white backdrop-blur-sm">
          {tShow("demoBadge")}
        </span>
      </div>
      <div className="relative z-10 p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{tShow(`${th.slug}.industry`)}</div>
        <div className="text-[16px] font-semibold text-fg mt-1">{tShow(`${th.slug}.brandName`)}</div>
      </div>
    </Link>
  </Tilt>
))}
```

Add `import { Tilt } from "@/components/animations/Tilt";` at the top.

- [ ] **Step 3: Manual smoke check (UI)**

Start dev server and hover-check:

```bash
npm run dev
```

Open `http://localhost:3000/pl` in a browser. Hover over a showcase tile in the homepage teaser — it should:
1. Tilt slightly on mouse-move.
2. Lift by 4px (`-translate-y-1`).
3. Show the lime gradient blob expand (scale 1.1).
4. Image scales (1.05) inside the thumbnail.

Hover over a portfolio tile a few sections up — confirm the felt motion is the same family (tilt + lift + blob).

Open `http://localhost:3000/pl/showcase` and confirm full-grid tiles behave the same.

- [ ] **Step 4: Commit**

```bash
git add components/showcase/ShowcaseList.tsx components/sections/redesign/ShowcaseTeaser.tsx
git commit -m "feat(showcase): tile hover parity with portfolio (tilt + radial blob + scale)"
```

---

## Task 14: Final verification

**Goal:** Confirm the build is clean, all tests pass, and the user-visible flow works end-to-end on the dev server.

- [ ] **Step 1: Typecheck the whole tree**

```bash
npx tsc --noEmit -p tsconfig.json
```

Expected: zero errors. If any callsite of the old `ProjectType`/`computeQuote` API remains, fix it now (likely a forgotten import in a file not touched above).

- [ ] **Step 2: Build for production**

```bash
npm run build
```

Expected: build succeeds. Static generation passes for both locales.

- [ ] **Step 3: Run the full Playwright suite**

```bash
npx playwright test --project=chromium
```

Expected: all green. If a flake occurs, retry once — `pricing-calculator` and `brief-bridge` are network/storage-bound and may need `await page.waitForLoadState("networkidle")` if the runner is slow.

- [ ] **Step 4: Manual click-through**

In a browser, walk the golden path:
1. `/pl` — hero shows new slogan; mini-calc shows site default (11 200 PLN). Click site/shop/app — total updates.
2. Click "Pełny kalkulator →" — land on `/pl/pricing`.
3. Click "Sklep online" preset — kind flips to Sklep, payment-gateway buttons visible, BLIK toggleable.
4. Click "Aplikacja" tile inside calculator — app section appears (Logowanie, Backend, Storage, App-mobile toggle).
5. Click "Wyślij brief →" CTA on PriceBreakdown — land on `/pl/contact`.
6. The brief shows the quote summary banner (kind + total + edit link); not the gate.
7. Fill name + email, click Dalej, fill ≥20 char description, click "Wyślij brief" — see "Brief w drodze, …" success.
8. Open a fresh incognito window, navigate directly to `/pl/contact#brief` — gate appears with "Otwórz kalkulator →".
9. Hover over a showcase tile on `/pl` and `/pl/showcase` — same tilt+blob feel as portfolio tiles.

- [ ] **Step 5: Final commit & summary**

If any step required a fix not yet captured:

```bash
git add -A
git commit -m "chore: post-verification fixups"
```

Otherwise, this task ends with no commit. Plan complete.

---

## Self-Review (already performed by plan author)

**Spec coverage:**
- Hero slogan change → Task 1.
- Mini calculator pivot from tech to kind → Task 4.
- Advanced calculator pivot to kind, dynamic per-kind options → Tasks 2, 6.
- Calculator ↔ brief bridge (calc completion routes to brief, brief reads quote) → Tasks 5, 7, 9, 10.
- Brief gated by calc completion → Task 9.
- Showcase tile hover parity with portfolio → Task 13.
- All translations PL + EN → Task 11.
- Tests updated (incl. e2e bridge) → Tasks 1, 4, 12.

**Type consistency:**
- `ProjectKind` is the new canonical type, exported from both `project-kinds.ts` (definition) and `calculator.ts` (re-export) — calculator stays the import surface. Verified.
- `AdvancedQuoteInput` discriminated union — every `value.kind === "site"` branch only accesses `value.site`, etc. Verified in AdvancedCalculator and PriceBreakdown.
- Translation keys agree across pl/en (`calculator.kinds.site.short`, `pricing.knobs.shopPlatform`, `brief.gate.cta`, etc.). Spot-checked.
- `computeMiniQuote` (mini) and `computeAdvancedQuote` (advanced) — same field names: `pages`, `cms`, `BASE_PRICE[kind]`. Verified.

**Placeholders:** none. All steps include concrete code or concrete commands.
