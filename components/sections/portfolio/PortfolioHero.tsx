"use client";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { CountUp } from "@/components/animations/CountUp";
import { PROJECTS, getPublicProjects } from "@/lib/design/portfolio-data";

export function PortfolioHero() {
  const total = PROJECTS.length;
  const publicCount = getPublicProjects().length;
  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 pt-8 pb-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>Portfolio</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-8 font-semibold text-fg">
        Projekty, które <ItalicAccent>wyszły</ItalicAccent> na produkcję.
      </h1>
      <div className="grid grid-cols-2 gap-4 mt-12 max-w-[800px]">
        <Stat label="Projektów w portfolio" to={total} />
        <Stat label="Mogę pokazać jawnie" to={publicCount} />
      </div>
      <p className="text-[15px] text-fg-muted mt-6 max-w-[60ch]">
        Resztę realizacji obejmuje NDA — szczegóły opowiem na konsultacji.
      </p>
    </section>
  );
}

function Stat({ label, to }: { label: string; to: number }) {
  return (
    <div className="bg-bg-card rounded-[24px] p-7">
      <div className="font-display italic text-[64px] leading-none text-accent tracking-[-0.04em]">
        <CountUp to={to} />
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mt-3">
        {label}
      </div>
    </div>
  );
}
