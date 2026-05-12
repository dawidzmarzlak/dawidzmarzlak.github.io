import type { Metadata } from "next";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { PricingPageClient } from "@/components/sections/pricing/PricingPageClient";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export const metadata: Metadata = {
  title: "Cennik",
  description: "3 ogólne presety + szczegółowy kalkulator. Zobacz wycenę w czasie rzeczywistym, bez gwiazdek.",
};

export const dynamic = "force-static";

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPageClient />
      <CtaCard
        heading={<>Niestandardowy projekt? <ItalicAccent onAccent>Porozmawiajmy</ItalicAccent>.</>}
        sub="Każdy projekt jest inny — jeśli kalkulator nie obejmuje Twojego scenariusza, wracam z indywidualną wyceną w 48h."
        primaryHref="/contact"
        primaryLabel="Wyślij brief →"
      />
    </>
  );
}
