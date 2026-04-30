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
      type: "next", pages: 4, cms: false,
      designTier: "standard", languages: 1, integrations: ["analytics"],
      supportTier: "basic", hosting: "vercel", timeline: "normal",
    },
  },
  {
    key: "company",
    input: {
      type: "wp", pages: 10, cms: true,
      designTier: "standard", languages: 2, integrations: ["analytics", "newsletter"],
      supportTier: "basic", hosting: "vercel", timeline: "normal",
    },
    badge: "popular",
  },
  {
    key: "ecom",
    input: {
      type: "woo", pages: 15, cms: true,
      designTier: "premium", languages: 1, integrations: ["payments", "analytics", "search"],
      supportTier: "basic", hosting: "vercel", timeline: "normal",
    },
  },
];
