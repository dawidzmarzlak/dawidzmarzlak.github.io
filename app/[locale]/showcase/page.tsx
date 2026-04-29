import { ShowcaseList } from "@/components/showcase/ShowcaseList";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Galeria projektów: różne branże, różne stacki — jeden senior.",
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ShowcasePage() {
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-5 lg:px-9 pt-8 pb-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
          <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
          <span>/</span>
          <span>Showcase</span>
        </div>
        <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
          24 branże, <ItalicAccent>jedna pracownia</ItalicAccent>.
        </h1>
        <p className="text-[19px] text-fg-muted max-w-[60ch] leading-[1.55] m-0">
          Każdy projekt to inny stack, inny system kolorów, inny ton. Kliknij dowolny, żeby zobaczyć pełny prototyp z dedykowaną typografią i animacjami.
        </p>
      </section>

      <ShowcaseList />

      <CtaCard
        heading={<>Twoja branża nie znalazła się w galerii? <ItalicAccent>Porozmawiajmy</ItalicAccent>.</>}
        sub="Każdy showcase to przykład — nie szablon. Pod Twoje wymagania budujemy od zera."
        primaryHref="/contact"
        primaryLabel="Wycena →"
      />
    </>
  );
}
