import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  AgencyHero,
  AgencyWork,
  AgencyServices,
  AgencyProcess,
  AgencyTeam,
  AgencyClients,
  AgencyTestimonials,
  AgencyContact,
} from "@/components/showcase/creative-agency";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function CreativeAgencyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <BackToPortfolio />
      <AgencyHero />
      <AgencyWork />
      <AgencyServices />
      <AgencyProcess />
      <AgencyTeam />
      <AgencyClients />
      <AgencyTestimonials />
      <AgencyContact />
      <ShowcaseCTA
        theme="light"
        accentColor="#FF6B6B"
        projectName="NOVA CREATIVE"
      />
      <ShowcaseFooter
        projectName="NOVA CREATIVE"
        accentColor="#FF6B6B"
        theme="light"
      />
    </div>
  );
}
