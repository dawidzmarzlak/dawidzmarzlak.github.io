"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { computeMiniQuote, type ProjectKind } from "@/lib/design/calculator";
import { PROJECT_KINDS } from "@/lib/design/project-kinds";
import { Link } from "@/i18n/routing";

export function QuoteCalculator() {
  const t = useTranslations("calculator");
  const locale = useLocale();
  const [kind, setKind] = useState<ProjectKind>("site");
  const [pages, setPages] = useState(8);
  const [cms, setCms] = useState(true);
  const price = computeMiniQuote({ kind, pages, cms });

  return (
    <div className="vc-calc bg-bg-card rounded-[24px] p-7 border border-line">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("title")}</span>
        <span className="font-mono text-[11px] text-accent flex items-center gap-1.5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:animate-pulse">{t("live")}</span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <span className="text-[13px] text-fg-muted">{t("kind")}</span>
        <div className="grid grid-cols-3 gap-1.5">
          {PROJECT_KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
              className={`py-3 px-2 rounded-lg font-mono text-[10px] uppercase border transition-all ${
                kind === k
                  ? "bg-accent text-accent-fg border-accent"
                  : "bg-transparent text-fg border-line hover:border-fg-muted"
              }`}
            >
              {t(`kinds.${k}.short`)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <span id="vc-calc-pages-label" className="text-[13px] text-fg-muted flex justify-between">
          {t("pages")} <strong className="text-fg font-medium font-mono">{pages}</strong>
        </span>
        <input
          type="range"
          min={1}
          max={30}
          value={pages}
          onChange={(e) => setPages(+e.target.value)}
          aria-labelledby="vc-calc-pages-label"
          aria-valuetext={`${pages} ${t("pages")}`}
          className="w-full h-1 bg-line rounded outline-none accent-accent"
        />
      </div>

      <div className="flex items-center justify-between py-2">
        <span id="vc-calc-cms-label" className="text-[13px] text-fg-muted">{t("cms")}</span>
        <button
          type="button"
          role="switch"
          aria-checked={cms}
          aria-labelledby="vc-calc-cms-label"
          onClick={() => setCms((v) => !v)}
          className={`w-9 h-5 rounded-full relative transition-colors ${cms ? "bg-accent" : "bg-line"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${cms ? "translate-x-4 bg-accent-fg" : "translate-x-0 bg-white"}`}
          />
        </button>
      </div>

      <div className="px-4 py-4 mt-1.5 bg-bg rounded-xl flex items-baseline justify-between border border-line">
        <span className="font-mono text-[11px] text-fg-muted uppercase">{t("out")}</span>
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
