import { useTranslations } from "next-intl";
import { SectionHead } from "./SectionHead";
import { ItalicAccent } from "./ItalicAccent";

interface ServiceItem { num: string; title: string; desc: string; }

const TONES = [
  "bg-bg-light text-fg-on-light",          // 1 — big light card
  "bg-accent text-accent-fg",              // 2 — lime card
  "bg-bg-card text-fg",                    // 3 — dark card
  "bg-bg-card text-fg",                    // 4 — narrow dark card
  "bg-bg-card text-fg border border-accent" // 5 — bordered dark card
];

const TITLE_SIZE = ["text-[56px]", "text-[36px]", "text-[36px]", "text-[26px]", "text-[36px]"];

export function ServicesBento() {
  const t = useTranslations("redesign.sections.services");
  const tSvc = useTranslations("services");
  const items = tSvc.raw("items") as ServiceItem[];
  const titleParts = t.raw("title") as [string, string, string];

  return (
    <section className="max-w-[1400px] mx-auto px-9 py-20" id="services">
      <SectionHead
        kicker={t("kicker")}
        title={<>{titleParts[0]}<ItalicAccent>{titleParts[1]}</ItalicAccent>{titleParts[2]}</>}
        cta={{ href: "/services", label: t("cta") }}
      />
      <style>{`
        .svc-bento { display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: 220px; gap: 16px; }
        .svc-bento > :nth-child(1) { grid-column: span 3; grid-row: span 2; }
        .svc-bento > :nth-child(2) { grid-column: span 3; }
        .svc-bento > :nth-child(3) { grid-column: span 2; }
        .svc-bento > :nth-child(4) { grid-column: span 1; }
        .svc-bento > :nth-child(5) { grid-column: span 3; }
        @media (max-width: 1024px) {
          .svc-bento { grid-template-columns: repeat(4,1fr); grid-auto-rows: 200px; }
          .svc-bento > :nth-child(1) { grid-column: span 4; grid-row: span 2; }
          .svc-bento > :nth-child(2), .svc-bento > :nth-child(5) { grid-column: span 4; }
          .svc-bento > :nth-child(3), .svc-bento > :nth-child(4) { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .svc-bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
          .svc-bento > * { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 200px; }
        }
      `}</style>
      <div className="svc-bento">
        {items.map((s, i) => (
          <article
            key={i}
            className={`relative overflow-hidden rounded-[20px] p-7 transition-transform hover:-translate-y-0.5 flex flex-col cursor-pointer ${TONES[i]}`}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70 mb-auto">
              {s.num}
            </div>
            <h3 className={`${TITLE_SIZE[i]} font-semibold tracking-[-0.03em] leading-none mt-4 mb-3 whitespace-pre-line`}>
              {s.title}
            </h3>
            {s.desc && (
              <p className="text-[14px] opacity-70 leading-[1.5] max-w-[36ch] m-0">{s.desc}</p>
            )}
            <span
              className="absolute bottom-6 right-6 w-10 h-10 rounded-full grid place-items-center bg-black/[0.06] dark:bg-white/[0.06] transition-colors"
              aria-hidden="true"
            >
              →
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
