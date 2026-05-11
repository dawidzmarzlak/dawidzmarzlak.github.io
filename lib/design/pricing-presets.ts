import type { AdvancedQuoteInput } from "./calculator";

export type PresetKey = "express" | "landing" | "company" | "ecom";

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
        siteIntegrations: ["analytics", "form"],
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
        siteIntegrations: ["analytics", "newsletter", "form", "blog-cms"],
      },
    },
    badge: "popular",
  },
  {
    key: "ecom",
    input: {
      kind: "shop",
      designTier: "standard", languages: 1, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      ...SHARED_BUSINESS, industry: "ecommerce", audience: "b2c",
      shop: {
        platform: "woo",
        catalogSize: "sm",
        contentPages: 4,
        paymentGateways: ["p24"],
        shopIntegrations: ["courier", "omnibus"],
        erp: "none",
      },
    },
  },
];
