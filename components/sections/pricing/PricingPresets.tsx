"use client";
import { useTranslations, useLocale } from "next-intl";
import { PRESETS, type PresetKey } from "@/lib/design/pricing-presets";
import { computeAdvancedQuote } from "@/lib/design/calculator";

interface Props {
  activeKey: PresetKey | null;
  onSelect: (key: PresetKey) => void;
}

export function PricingPresets({ activeKey, onSelect }: Props) {
  const t = useTranslations("pricing.presets");
  const tCalc = useTranslations("calculator");
  const locale = useLocale();
  const fmt = (n: number) => n.toLocaleString(locale === "pl" ? "pl-PL" : "en-US");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {PRESETS.map((preset, idx) => {
        const quote = computeAdvancedQuote(preset.input);
        const active = activeKey === preset.key;
        return (
          <button
            key={preset.key}
            type="button"
            onClick={() => onSelect(preset.key)}
            aria-pressed={active}
            className={`text-left p-6 rounded-[20px] border transition-all relative ${
              active ? "bg-accent text-accent-fg border-accent" : "bg-bg-card text-fg border-line hover:border-fg-muted"
            }`}
          >
            {preset.badge === "popular" && (
              <span className={`absolute -top-2.5 left-6 font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1 rounded-full ${active ? "bg-bg-card text-accent" : "bg-accent text-accent-fg"}`}>
                {t("popular")}
              </span>
            )}
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-60 mb-2">[0{idx + 1}]</div>
            <h3 className="text-[24px] font-semibold tracking-[-0.02em] m-0 mb-1">{t(`${preset.key}.name`)}</h3>
            <p className={`text-[13px] m-0 mb-4 leading-[1.5] ${active ? "opacity-80" : "text-fg-muted"}`}>
              {t(`${preset.key}.desc`)}
            </p>
            <div className={`font-display italic text-[32px] leading-none ${active ? "text-accent-fg" : "text-accent"}`}>
              {t("from")} {fmt(quote.total)} <span className="font-mono not-italic text-[12px] opacity-70 ml-1.5">{tCalc("currency")}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
