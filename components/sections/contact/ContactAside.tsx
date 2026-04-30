"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useStoredQuote } from "@/lib/design/quote-store";
import { PROJECT_KINDS } from "@/lib/design/project-kinds";

const SLOTS = [
  { day: "pon", date: "4 lis", time: "10:00", open: true },
  { day: "pon", date: "4 lis", time: "14:30", open: true },
  { day: "wt",  date: "5 lis", time: "11:00", open: false },
  { day: "wt",  date: "5 lis", time: "15:00", open: true },
  { day: "śr",  date: "6 lis", time: "09:30", open: true },
  { day: "śr",  date: "6 lis", time: "13:00", open: false },
  { day: "czw", date: "7 lis", time: "10:00", open: true },
  { day: "czw", date: "7 lis", time: "16:00", open: true },
];

export function ContactAside() {
  const t = useTranslations("brief.aside");
  const tCalc = useTranslations("calculator");
  const locale = useLocale();
  const fmt = (n: number) => n.toLocaleString(locale === "pl" ? "pl-PL" : "en-US");
  const stored = useStoredQuote();

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-[90px]">
      <div className="bg-bg-card rounded-[24px] p-7">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {t("slots")}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {SLOTS.map((s, i) => (
            <button
              key={i}
              type="button"
              disabled={!s.open}
              className="px-3.5 py-3 bg-bg border border-line rounded-xl text-left transition-all hover:enabled:border-accent disabled:opacity-35 disabled:cursor-not-allowed disabled:line-through"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">{s.day}</div>
              <div className="text-[16px] font-medium text-fg mt-0.5">{s.time}</div>
              <div className="font-mono text-[11px] text-fg-muted mt-0.5">{s.date}</div>
            </button>
          ))}
        </div>
      </div>

      {stored ? (
        <div className="bg-bg-card rounded-[24px] p-7 flex flex-col gap-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("summary.kicker")}</div>
          <div className="text-[15px] text-fg leading-[1.5]">
            {tCalc(`kinds.${stored.input.kind}.long`)}
          </div>
          <div className="px-4 py-4 bg-bg rounded-xl flex items-baseline justify-between border border-line">
            <span className="font-mono text-[11px] text-fg-muted uppercase">{tCalc("out")}</span>
            <span className="font-display italic text-[28px] text-accent leading-none">
              {fmt(stored.total)} <span className="font-mono not-italic text-[11px] text-fg-muted ml-1">{tCalc("currency")}</span>
            </span>
          </div>
          <Link href="/pricing" className="text-[12px] font-mono text-accent hover:underline">{t("summary.edit")} →</Link>
        </div>
      ) : (
        <div className="bg-bg-card rounded-[24px] p-7 flex flex-col gap-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("picker.kicker")}</div>
          <p className="text-[14px] text-fg-muted m-0 leading-[1.5]">{t("picker.body")}</p>
          <div className="grid grid-cols-3 gap-1.5">
            {PROJECT_KINDS.map((k) => (
              <Link
                key={k}
                href={`/pricing?kind=${k}`}
                className="py-3 px-2 rounded-lg font-mono text-[10px] uppercase border border-line text-fg text-center no-underline transition-colors hover:border-fg-muted"
              >
                {tCalc(`kinds.${k}.short`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
