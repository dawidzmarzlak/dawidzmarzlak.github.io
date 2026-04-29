import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  EstateHero,
  EstateProperties,
  EstateServices,
  EstateAgents,
  EstateTestimonials,
  EstateFAQ,
  EstateContact,
} from "@/components/showcase/real-estate";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <BackToPortfolio />
      <EstateHero />
      <EstateProperties />
      <EstateServices />
      <EstateAgents />
      <EstateTestimonials />
      <EstateFAQ />
      <EstateContact />
      <ShowcaseCTA
        theme="light"
        accentColor="#C5A572"
        projectName="Skyline Estates"
      />
      <ShowcaseFooter
        projectName="Skyline Estates"
        accentColor="#C5A572"
        theme="light"
      />
    </div>
  );
}
