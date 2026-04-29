import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { AboutBento } from "@/components/sections/redesign/AboutBento";
import { Process } from "@/components/sections/redesign/Process";
import { Testimonials } from "@/components/sections/redesign/Testimonials";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "O nas",
  description: "Poznaj zespół IT Solutions i dowiedz się więcej o naszej misji i wartościach.",
};

export const dynamic = "force-static";

function AboutHero() {
  return (
    <section className="max-w-[1400px] mx-auto px-9 pt-8 pb-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>O pracowni</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
        Pięć lat. <ItalicAccent>Tysiące</ItalicAccent> użytkowników. Zero zniknięć.
      </h1>
      <p className="text-[19px] text-fg-muted max-w-[60ch] leading-[1.55] m-0">
        Od 2020 roku buduję strony, sklepy i aplikacje webowe. Niezależnie od tego, czy klient chce Next.js, WordPress, czy Spring Boot — dostarczam rozwiązanie dopasowane do problemu, a nie do mojego ulubionego stacku.
      </p>
    </section>
  );
}

function AboutCta() {
  const t = useTranslations("cta");
  return (
    <CtaCard
      heading={t("h")}
      sub={t("p")}
      primaryHref="/contact"
      primaryLabel={t("primary")}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBento />
      <Process />
      <Testimonials />
      <AboutCta />
    </>
  );
}
