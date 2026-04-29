export type ProjectType = "next" | "wp" | "woo" | "presta" | "app";

export const BASE_PRICE: Record<ProjectType, number> = {
  next: 8500,
  wp: 5500,
  woo: 9500,
  presta: 12000,
  app: 18000,
};

export interface QuoteInput {
  type: ProjectType;
  pages: number;
  cms: boolean;
}

export function computeQuote({ type, pages, cms }: QuoteInput): number {
  return BASE_PRICE[type] + Math.max(0, pages - 1) * 600 + (cms ? 1500 : 0);
}
