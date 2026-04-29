import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { CountUp } from "@/components/animations/CountUp";

export function PortfolioHero() {
  return (
    <section className="max-w-[1400px] mx-auto px-9 pt-8 pb-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>Portfolio</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-8 font-semibold text-fg">
        Projekty, które <ItalicAccent>wyszły</ItalicAccent> na produkcję.
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        <Stat label="Wdrożonych projektów" to={47} suffix="+" />
        <Stat label="Lat doświadczenia" to={5} suffix="+" />
        <Stat label="Codziennych użytkowników" to={12000} format={(n) => (n >= 1000 ? Math.floor(n / 1000) + "k" : n)} suffix="+" />
        <Stat label="Wdrożeń na czas" to={100} format={(n) => n + "%"} />
      </div>
    </section>
  );
}

function Stat({
  label,
  to,
  suffix,
  format,
}: {
  label: string;
  to: number;
  suffix?: string;
  format?: (n: number) => string | number;
}) {
  return (
    <div className="bg-bg-card rounded-[24px] p-7">
      <div className="font-display italic text-[64px] leading-none text-accent tracking-[-0.04em]">
        <CountUp to={to} format={format} />
        {suffix && <span className="text-[0.4em] align-super font-sans not-italic ml-1">{suffix}</span>}
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mt-3">
        {label}
      </div>
    </div>
  );
}
