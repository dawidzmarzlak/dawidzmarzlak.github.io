export type ProjectType = "next" | "wp" | "woo" | "presta" | "app";
export type DesignTier = "lite" | "standard" | "premium";
export type SupportTier = "none" | "basic" | "pro";
export type Hosting = "client" | "vercel" | "vps";
export type Timeline = "normal" | "rush";
export type Integration = "payments" | "crm" | "newsletter" | "analytics" | "search" | "marketplace";

export const BASE_PRICE: Record<ProjectType, number> = {
  next: 8500, wp: 5500, woo: 9500, presta: 12000, app: 18000,
};

export const DESIGN_TIER_PRICE: Record<DesignTier, number> = {
  lite: 0,
  standard: 2500,
  premium: 7500,
};

export const SUPPORT_YEARLY: Record<SupportTier, number> = {
  none: 0,
  basic: 0,
  pro: 4800,
};

export const HOSTING_SETUP: Record<Hosting, number> = {
  client: 0, vercel: 600, vps: 1800,
};

export const INTEGRATION_COST: Record<Integration, number> = {
  payments: 1800, crm: 1200, newsletter: 500, analytics: 300, search: 1500, marketplace: 2200,
};

export const PAGE_UNIT = 600;
export const LANGUAGE_UNIT = 1500;
export const TIMELINE_RUSH_MULT = 1.25;

export interface QuoteInput {
  type: ProjectType;
  pages: number;
  cms: boolean;
}

export function computeQuote({ type, pages, cms }: QuoteInput): number {
  return BASE_PRICE[type] + Math.max(0, pages - 1) * PAGE_UNIT + (cms ? 1500 : 0);
}

export interface AdvancedQuoteInput extends QuoteInput {
  designTier: DesignTier;
  languages: number;
  integrations: Integration[];
  supportTier: SupportTier;
  hosting: Hosting;
  timeline: Timeline;
}

export interface AdvancedQuoteBreakdown {
  base: number;
  pages: number;
  cms: number;
  design: number;
  languages: number;
  integrations: number;
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

export function computeAdvancedQuote(input: AdvancedQuoteInput): AdvancedQuoteResult {
  const base = BASE_PRICE[input.type];
  const pagesCost = Math.max(0, input.pages - 1) * PAGE_UNIT;
  const cmsCost = input.cms ? 1500 : 0;
  const designCost = DESIGN_TIER_PRICE[input.designTier];
  const langCost = Math.max(0, input.languages - 1) * LANGUAGE_UNIT;
  const integrCost = input.integrations.reduce((acc, k) => acc + INTEGRATION_COST[k], 0);
  const hostingCost = HOSTING_SETUP[input.hosting];
  const supportYearly = SUPPORT_YEARLY[input.supportTier];

  const subtotal = base + pagesCost + cmsCost + designCost + langCost + integrCost + hostingCost;
  const rushDelta = input.timeline === "rush" ? Math.round(subtotal * (TIMELINE_RUSH_MULT - 1)) : 0;
  const total = subtotal + rushDelta;

  return {
    breakdown: { base, pages: pagesCost, cms: cmsCost, design: designCost, languages: langCost, integrations: integrCost, hosting: hostingCost, supportYearly },
    subtotal, rushDelta, total, supportYearly,
  };
}
