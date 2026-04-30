import type { Metadata } from "next";
import { FaqHero } from "@/components/sections/faq/FaqHero";
import { FaqCategories } from "@/components/sections/faq/FaqCategories";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "FAQ — Pytania i odpowiedzi",
  description: "Najczęściej zadawane pytania o współpracę, cennik, technologie, terminy i wsparcie po wdrożeniu.",
};

export const dynamic = "force-static";

function FaqCta() {
  const t = useTranslations("cta");
  return (
    <CtaCard
      heading={
        <>
          Twojego pytania tu nie ma? <ItalicAccent>Napisz</ItalicAccent>.
        </>
      }
      sub={t("p")}
      primaryHref="/contact"
      primaryLabel={t("primary")}
      secondaryHref="mailto:hello@itsolutions.com"
      secondaryLabel="hello@itsolutions.com"
    />
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqCategories />
      <FaqCta />
    </>
  );
}
