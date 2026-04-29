"use client";
import { useTranslations } from "next-intl";
import { SectionHead } from "./SectionHead";
import { ItalicAccent } from "./ItalicAccent";
import { Tilt } from "@/components/animations/Tilt";

interface Project {
  name: string;
  cat: string;
  year: string;
  metric: string;
  tone: "dark" | "light" | "accent";
}

const TONE_CLASS: Record<Project["tone"], string> = {
  dark: "bg-bg-card text-fg",
  light: "bg-bg-light text-fg-on-light",
  accent: "bg-accent text-accent-fg",
};

const TONE_BG: Record<Project["tone"], string> = {
  dark: "radial-gradient(circle at 80% 100%, rgba(196,255,58,0.15), transparent 60%)",
  light: "radial-gradient(circle at 70% 0%, rgba(0,0,0,0.06), transparent 60%)",
  accent: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 50%)",
};

export function PortfolioGrid() {
  const t = useTranslations("redesign.sections.portfolio");
  const tRoot = useTranslations();
  const titleParts = t.raw("title") as [string, string, string];
  const projects = tRoot.raw("projects") as Project[];

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20" id="portfolio">
      <SectionHead
        kicker={t("kicker")}
        title={
          <>
            {titleParts[0]}
            <ItalicAccent>{titleParts[1]}</ItalicAccent>
            {titleParts[2]}
          </>
        }
        cta={{ href: "/portfolio", label: t("cta") }}
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{ perspective: "1200px" }}
      >
        {projects.map((p, i) => (
          <Tilt key={i} max={4}>
            <article
              className={`group relative overflow-hidden rounded-[24px] p-7 cursor-pointer flex flex-col aspect-[4/5] will-change-transform transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 ${TONE_CLASS[p.tone]}`}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none group-hover:scale-110"
                style={{ background: TONE_BG[p.tone] }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] opacity-70">
                <span>{p.cat}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="relative z-10 text-[44px] font-semibold tracking-[-0.03em] leading-none mt-auto mb-4">
                {p.name}
              </h3>
              <span
                className={`relative z-10 self-start font-mono text-[13px] py-1.5 px-3 rounded-full ${
                  p.tone === "dark" ? "bg-accent text-accent-fg" : "bg-black/[0.08]"
                }`}
              >
                {p.metric}
              </span>
              <span
                className="absolute top-7 right-7 w-[38px] h-[38px] rounded-full grid place-items-center bg-black/[0.08] dark:bg-white/[0.08] transition-transform"
                aria-hidden="true"
              >
                ↗
              </span>
            </article>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
