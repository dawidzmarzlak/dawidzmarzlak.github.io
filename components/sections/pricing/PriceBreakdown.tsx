"use client";
import { useTranslations, useLocale } from "next-intl";
import type { AdvancedQuoteResult } from "@/lib/design/calculator";
import { Link } from "@/i18n/routing";
import { formatPlnWithEurTooltip } from "@/lib/design/format-price";

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
      {(() => {
        const { tooltip } = formatPlnWithEurTooltip(quote.total, locale);
        return (
          <div className="border-t border-line pt-4 flex justify-between items-baseline">
            <span className="font-mono text-[11px] text-fg-muted uppercase">{t("total")}</span>
            <span className="flex flex-col items-end">
              <span className="font-display italic text-[36px] text-accent leading-none" title={tooltip ?? undefined}>
                {fmt(quote.total)} <span className="font-mono not-italic text-[12px] text-fg-muted ml-1.5">{tCalc("currency")}</span>
              </span>
              {tooltip && (
                <span className="font-mono text-[11px] text-fg-muted opacity-70 mt-1">{tooltip}</span>
              )}
            </span>
          </div>
        );
      })()}
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
