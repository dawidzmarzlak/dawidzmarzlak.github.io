import {
  type ProjectKind, type SiteIntegration,
  type ShopPlatform, type CatalogSize, type PaymentGateway, type ShopIntegration, type ErpOption,
  type AppType, type AppAuth, type AppBackend, type AppStorage, type AppIntegration,
  type DesignTier, type SupportTier, type Hosting, type Timeline,
  type Industry, type Audience, type ProjectStage,
} from "./project-kinds";

export type {
  ProjectKind, SiteIntegration,
  ShopPlatform, CatalogSize, PaymentGateway, ShopIntegration, ErpOption,
  AppType, AppAuth, AppBackend, AppStorage, AppIntegration,
  DesignTier, SupportTier, Hosting, Timeline,
  Industry, Audience, ProjectStage,
};

// ---------- price tables ----------
//
// Calibration: 2025/2026 Polish market (senior freelancer, ~180 PLN/h reference).
// Goal: 3 simple-calculator presets land in target ranges (±5%):
//   landing ~3 400 PLN, company ~10 800 PLN, ecom ~16 900 PLN.
// App preset (~39 900 PLN) is added in Task 6; BASE_PRICE.app pre-sized for it.

export const BASE_PRICE: Record<ProjectKind, number> = {
  site: 750, shop: 5500, app: 28000,
};

export const PAGE_UNIT = 350;
export const LANGUAGE_UNIT = 1400;
export const CMS_FLAT = 3000;
export const TIMELINE_RUSH_MULT = 1.25;

export const DESIGN_TIER_PRICE: Record<DesignTier, number> = {
  lite: 0, standard: 700, premium: 5050,
};

export const SUPPORT_YEARLY: Record<SupportTier, number> = {
  none: 0, basic: 0, pro: 4800,
};

export const HOSTING_SETUP: Record<Hosting, number> = {
  client: 0, vercel: 600, vps: 1800,
};

// site
export const SITE_INTEGRATION_COST: Record<SiteIntegration, number> = {
  // Existing
  analytics: 300, newsletter: 500, form: 400, chat: 600, map: 250, booking: 1800,
  // New (2025/2026)
  "wcag-aa": 2500,
  "animations-medium": 3200,
  "animations-premium": 9000,
  "cwv-basic": 1200,
  "cwv-full": 4500,
  "seo-onpage": 1800,
  "seo-tech-full": 5500,
  "blog-cms": 2200,
  "multistep-form": 1800,
  configurator: 4500,
  "rodo-pack": 1200,
};

// shop
export const CATALOG_SIZE_COST: Record<CatalogSize, number> = {
  sm: 0, md: 1500, lg: 4500, xl: 9000,
};
export const PAYMENT_GATEWAY_COST: Record<PaymentGateway, number> = {
  blik: 600, p24: 600, stripe: 600, paypal: 600, card: 600,
};
export const SHOP_INTEGRATION_COST: Record<ShopIntegration, number> = {
  // Existing
  courier: 800, newsletter: 500, crm: 1200, allegro: 1500, marketplace: 2200, subscription: 2400,
  // New (2025/2026) — KSeF mandatory from 2026-04-01 in Poland
  "baselinker-basic": 3500,
  "baselinker-std": 5500,
  "empik-amazon": 3500,
  "ceneo-google": 1800,
  dropshipping: 2200,
  "wholesale-xml": 1800,
  ksef: 1800,
  omnibus: 700,
  "nip-gus": 600,
  "vat-faktury": 900,
  "product-configurator": 4800,
  loyalty: 2200,
  "multi-warehouse": 3500,
  reviews: 1200,
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
  // Existing
  payments: 1800, sms: 700, email: 500, ai: 3000, "external-api": 1200, websockets: 2200,
  // New (2025/2026)
  rbac: 11700,
  "admin-panel": 23400,
  i18n: 9000,
  "rest-openapi": 19800,
  graphql: 23400,
  "export-files": 6800,
  "import-mass": 9000,
  "push-notifications": 9000,
  "search-elastic": 23400,
  "upload-s3": 9000,
  "stripe-subs": 16200,
};
export const APP_ROLE_UNIT = 1000;
export const APP_MOBILE_COST = 8000;

// ---------- input shapes ----------

export interface SiteFields {
  pages: number;
  cms: boolean;
  siteIntegrations: SiteIntegration[];
}

export interface ShopFields {
  platform: ShopPlatform;
  catalogSize: CatalogSize;
  contentPages: number;
  paymentGateways: PaymentGateway[];
  shopIntegrations: ShopIntegration[];
  erp: ErpOption;
}

export interface AppFields {
  appType: AppType;
  auth: AppAuth;
  backend: AppBackend;
  roles: number;
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
  // Business context — zero-cost, used to populate brief / drive consultation
  industry: Industry;
  audience: Audience;
  stage: ProjectStage;
}

export type AdvancedQuoteInput =
  | (SharedFields & { kind: "site"; site: SiteFields })
  | (SharedFields & { kind: "shop"; shop: ShopFields })
  | (SharedFields & { kind: "app"; app: AppFields });

// ---------- mini quote ----------

export interface MiniQuoteInput {
  kind: ProjectKind;
  pages: number;
  cms: boolean;
}

export function computeMiniQuote({ kind, pages, cms }: MiniQuoteInput): number {
  return BASE_PRICE[kind] + Math.max(0, pages - 1) * PAGE_UNIT + (cms ? CMS_FLAT : 0);
}

// ---------- advanced quote ----------

export interface AdvancedQuoteBreakdown {
  base: number;
  pages: number;
  cms: number;
  design: number;
  languages: number;
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
    b.cms = s.cms ? CMS_FLAT : 0;
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
