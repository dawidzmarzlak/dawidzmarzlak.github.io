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
