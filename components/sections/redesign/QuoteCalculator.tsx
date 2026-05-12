"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { computeAdvancedQuote } from "@/lib/design/calculator";
import { PRESETS, type PresetKey } from "@/lib/design/pricing-presets";
import { Link } from "@/i18n/routing";

export function QuoteCalculator() {
  const t = useTranslations("calculator");
  const tPresets = useTranslations("pricing.presets");
  const locale = useLocale();
  const [activeKey, setActiveKey] = useState<PresetKey>("company");
  const activePreset = PRESETS.find((p) => p.key === activeKey)!;
  const price = computeAdvancedQuote(activePreset.input).total;

  return (
    <div className="vc-calc bg-bg-card rounded-[24px] p-7 border border-line">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("title")}</span>
        <span className="font-mono text-[11px] text-accent flex items-center gap-1.5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:animate-pulse">
          {t("live")}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <span className="text-[13px] text-fg-muted">{tPresets("title")}</span>
        <div className="grid grid-cols-2 gap-1.5">
          {PRESETS.map((p) => {
            const isActive = activeKey === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveKey(p.key)}
                aria-pressed={isActive}
                className={`relative py-3 px-2 rounded-lg font-mono text-[10px] uppercase border transition-all ${
                  isActive
                    ? "bg-accent text-accent-fg border-accent"
                    : "bg-transparent text-fg border-line hover:border-fg-muted"
                }`}
              >
                {tPresets(`${p.key}.name`)}
                {p.badge === "popular" && !isActive && (
                  <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-accent" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-4 mt-1.5 bg-bg rounded-xl flex items-baseline justify-between border border-line">
        <span className="font-mono text-[11px] text-fg-muted uppercase">{tPresets("from")}</span>
        <span className="font-display italic text-[32px] text-accent leading-none">
          {price.toLocaleString(locale === "pl" ? "pl-PL" : "en-US")}{" "}
          <span className="font-mono not-italic text-[12px] text-fg-muted ml-1.5">{t("currency")}</span>
        </span>
      </div>

      <Link href="/pricing" className="mt-3 inline-flex items-center gap-2 text-[12px] font-mono text-accent hover:underline">
        {t("fullCalc")} →
      </Link>
    </div>
  );
}
