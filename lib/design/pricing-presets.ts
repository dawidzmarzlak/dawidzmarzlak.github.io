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
        platform: "wp",
        pages: 5,
        cms: true,
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
        platform: "nextjs",
        pages: 4,
        cms: false,
        // Extended on-page SEO (schema, optimized meta, canonical) — LP relies on
        // organic search traffic, so SEO is core to its purpose (vs Express which
        // gets traffic from direct sources like email signature / printed cards).
        siteIntegrations: ["analytics", "form", "seo-onpage"],
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
        platform: "nextjs",
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
