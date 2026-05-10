const EUR_RATE = 4.30; // PLN per 1 EUR — fixed reference rate, updated manually

export function formatPlnWithEurTooltip(plnAmount: number, locale: string): {
  text: string;       // "3 400 zł" or "3,400 PLN" — main display
  tooltip: string | null;  // "~790 EUR" — null when locale !== "en"
} {
  const formatter = new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-US");
  const plnText = `${formatter.format(plnAmount)} ${locale === "pl" ? "zł" : "PLN"}`;
  if (locale !== "en") return { text: plnText, tooltip: null };
  const eur = Math.round(plnAmount / EUR_RATE / 10) * 10; // nearest 10 EUR
  return { text: plnText, tooltip: `~${formatter.format(eur)} EUR` };
}

// Optional convenience: just the EUR string (null for pl)
export function plnToEurTooltip(plnAmount: number, locale: string): string | null {
  if (locale !== "en") return null;
  const eur = Math.round(plnAmount / EUR_RATE / 10) * 10;
  return `~${new Intl.NumberFormat("en-US").format(eur)} EUR`;
}

export const PLN_TO_EUR_RATE = EUR_RATE;
