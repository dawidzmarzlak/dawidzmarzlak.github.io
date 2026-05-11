import type { AdvancedQuoteInput } from "./calculator";

export type PresetKey = "express" | "landing" | "company" | "ecom" | "app";

export interface Preset {
  key: PresetKey;
  input: AdvancedQuoteInput;
  badge?: "popular";
}

const SHARED_BUSINESS = {
  industry: "services" as const,
  audience: "b2b" as const,
  stage: "new" as const,
};

export const PRESETS: Preset[] = [
  {
    key: "express",
    input: {
      kind: "site",
      designTier: "lite", languages: 1, hosting: "client",
      supportTier: "basic", timeline: "normal",
      ...SHARED_BUSINESS, audience: "b2c",
      site: {
        goal: "company",
        pages: 5,
        cms: false,
        siteIntegrations: ["analytics", "form"],
      },
    },
  },
  {
    key: "landing",
    input: {
      kind: "site",
      designTier: "standard", languages: 1, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      ...SHARED_BUSINESS, audience: "b2c",
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
      ...SHARED_BUSINESS,
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
      ...SHARED_BUSINESS, industry: "ecommerce", audience: "b2c",
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
  {
    key: "app",
    input: {
      kind: "app",
      designTier: "standard", languages: 1, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      ...SHARED_BUSINESS, industry: "saas", audience: "b2b",
      app: {
        appType: "saas",
        auth: "oauth",
        backend: "spring",
        roles: 3,
        appIntegrations: ["payments", "email", "ai"],
        storage: "postgres",
        mobile: false,
      },
    },
  },
];
