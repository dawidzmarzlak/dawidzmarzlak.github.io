import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  VetHero,
  VetServices,
  VetEmergency,
  VetTeam,
} from "@/components/showcase/vet-clinic";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function VetClinicPage() {
  return (
    <div className="min-h-screen bg-[#F0FDF9]">
      <BackToPortfolio />
      <VetHero />
      <VetServices />
      <VetTeam />
      <VetEmergency />
      <ShowcaseCTA
        theme="light"
        accentColor="#0D9488"
        projectName="Happy Paws"
      />
      <ShowcaseFooter
        projectName="Happy Paws"
        accentColor="#0D9488"
        theme="light"
      />
    </div>
  );
}
