import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  CoworkingHero,
  CoworkingFloorplan,
  CoworkingPricing,
} from "@/components/showcase/coworking-space";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function CoworkingSpacePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <BackToPortfolio />
      <CoworkingHero />
      <CoworkingFloorplan />
      <CoworkingPricing />
      <ShowcaseCTA
        theme="dark"
        accentColor="#FACC15"
        projectName="The Hub"
      />
      <ShowcaseFooter
        projectName="The Hub"
        accentColor="#FACC15"
        theme="dark"
      />
    </div>
  );
}
