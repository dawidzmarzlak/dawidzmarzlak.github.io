import type { Metadata } from "next";
import { ProcessHero } from "@/components/sections/process/ProcessHero";
import { ProcessExtended } from "@/components/sections/process/ProcessExtended";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Proces współpracy",
  description: "Jak wygląda współpraca krok po kroku — od pierwszej konsultacji po wsparcie po wdrożeniu. Siedem etapów, demo co tydzień, jeden kontakt.",
};

export const dynamic = "force-static";

function ProcessCta() {
  const t = useTranslations("cta");
  return (
    <CtaCard
      heading={
        <>
          Krok pierwszy: <ItalicAccent>30 minut konsultacji</ItalicAccent>.
        </>
      }
      sub={t("p")}
      primaryHref="/contact"
      primaryLabel={t("primary")}
    />
  );
}

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <ProcessExtended />
      <ProcessCta />
    </>
  );
}
