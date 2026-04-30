import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionHead } from "./SectionHead";
import { ItalicAccent } from "./ItalicAccent";

interface Stat { label: string; num: string; foot: string; }

export function AboutBento() {
  const t = useTranslations("redesign.sections.about");
  const tA = useTranslations("about");
  const titleParts = t.raw("title") as [string, string, string];
  const bigParts = tA.raw("big") as [string, string, string];
  const stats = tA.raw("stats") as Stat[];
  const quote = tA.raw("quote") as { label: string; text: string; name: string; role: string };

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20">
      <SectionHead
        kicker={t("kicker")}
        title={<>{titleParts[0]}<ItalicAccent>{titleParts[1]}</ItalicAccent>{titleParts[2]}</>}
      />
      <style>{`
        .ab-bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 260px; gap: 16px; }
        .ab-bento > .ab-big { grid-column: span 2; grid-row: span 2; }
        .ab-bento > .ab-quote { grid-column: span 2; }
        @media (max-width: 1024px) {
          .ab-bento { grid-template-columns: repeat(2, 1fr); }
          .ab-bento > .ab-big { grid-column: span 2; grid-row: span 1; }
          .ab-bento > .ab-quote { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .ab-bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
          .ab-bento > * { grid-column: span 1 !important; min-height: 200px; padding: 28px; }
          .ab-bento > .ab-big { grid-row: span 1; min-height: 220px; }
        }
      `}</style>
      <div className="ab-bento">
        {/* Cell 1 — big lime card → /about */}
        <Link href="/about" className="ab-big bg-accent text-accent-fg rounded-[24px] p-6 lg:p-9 flex flex-col no-underline transition-transform hover:-translate-y-0.5">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">{tA("bigLabel")}</div>
          <div className="text-[clamp(32px,4vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] mt-auto">
            {bigParts[0]}<em className="italic font-medium">{bigParts[1]}</em>{bigParts[2]}
          </div>
        </Link>

        {/* Cell 2 — stat 1 → /about */}
        <Link href="/about" className="bg-bg-card text-fg rounded-[24px] p-7 flex flex-col no-underline transition-transform hover:-translate-y-0.5">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted opacity-70">{stats[0].label}</div>
          <div className="text-[72px] font-semibold tracking-[-0.04em] leading-none mt-auto mb-3 text-accent">{stats[0].num}</div>
          <div className="text-[13px] leading-[1.4] text-fg-muted">{stats[0].foot}</div>
        </Link>

        {/* Cell 3 — stat 2 → /about */}
        <Link href="/about" className="bg-bg-card text-fg rounded-[24px] p-7 flex flex-col no-underline transition-transform hover:-translate-y-0.5">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted opacity-70">{stats[1].label}</div>
          <div className="text-[72px] font-semibold tracking-[-0.04em] leading-none mt-auto mb-3 text-accent">{stats[1].num}</div>
          <div className="text-[13px] leading-[1.4] text-fg-muted">{stats[1].foot}</div>
        </Link>

        {/* Cell 4 — quote (no link, content stands on its own) */}
        <div className="ab-quote bg-bg-light text-fg-on-light rounded-[24px] p-8 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">{quote.label}</div>
            <p className="text-[22px] font-medium leading-[1.3] tracking-[-0.01em] mt-3 m-0">
              {`"${quote.text}"`}
            </p>
          </div>
          <div className="font-mono text-[12px] opacity-60 mt-6">
            <strong className="font-sans not-italic text-[14px] opacity-100 block mb-1">{quote.name}</strong>
            {quote.role}
          </div>
        </div>

        {/* Cell 5 — stat 3 (lime accent) → /about */}
        <Link href="/about" className="bg-accent text-accent-fg rounded-[24px] p-7 flex flex-col no-underline transition-transform hover:-translate-y-0.5">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">{stats[2].label}</div>
          <div className="text-[72px] font-semibold tracking-[-0.04em] leading-none mt-auto mb-3">{stats[2].num}</div>
          <div className="text-[13px] leading-[1.4]">{stats[2].foot}</div>
        </Link>

        {/* Cell 6 — stat 4 → /about */}
        <Link href="/about" className="bg-bg-card text-fg rounded-[24px] p-7 flex flex-col no-underline transition-transform hover:-translate-y-0.5">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted opacity-70">{stats[3].label}</div>
          <div className="text-[72px] font-semibold tracking-[-0.04em] leading-none mt-auto mb-3 text-accent">{stats[3].num}</div>
          <div className="text-[13px] leading-[1.4] text-fg-muted">{stats[3].foot}</div>
        </Link>
      </div>
    </section>
  );
}
