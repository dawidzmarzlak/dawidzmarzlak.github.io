import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  EcoHero,
  EcoImpact,
  EcoProducts,
  EcoTimeline,
} from "@/components/showcase/eco-brand";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function EcoBrandPage() {
  return (
    <div className="min-h-screen bg-[#FEFDF8]">
      <BackToPortfolio />
      <EcoHero />
      <EcoImpact />
      <EcoProducts />
      <EcoTimeline />
      <ShowcaseCTA
        theme="light"
        accentColor="#166534"
        projectName="Terra Collective"
      />
      <ShowcaseFooter
        projectName="Terra Collective"
        accentColor="#166534"
        theme="light"
      />
    </div>
  );
}
