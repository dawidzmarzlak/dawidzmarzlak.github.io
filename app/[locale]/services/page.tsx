import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesPageClient } from "@/components/sections/services/ServicesPageClient";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export const dynamic = "force-static";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <>
      <ServicesHero />
      <ServicesPageClient />
      <CtaCard
        heading={<>Twój projekt zaczyna się od <ItalicAccent onAccent>briefu</ItalicAccent>.</>}
        sub="Wypełnij formularz, opisz w 5 zdaniach co chcesz zrobić — wracam z rekomendowanym stackiem i wyceną w 48h."
        primaryHref="/contact"
        primaryLabel="Umów wycenę →"
      />
    </>
  );
}
