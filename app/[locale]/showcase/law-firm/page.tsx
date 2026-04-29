import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  LawHero,
  LawPracticeAreas,
  LawCaseStudies,
  LawTeam,
} from "@/components/showcase/law-firm";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LawFirmPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <BackToPortfolio />
      <LawHero />
      <LawPracticeAreas />
      <LawCaseStudies />
      <LawTeam />
      <ShowcaseCTA
        theme="light"
        accentColor="#C9A227"
        projectName="Sterling & Associates"
      />
      <ShowcaseFooter
        projectName="Sterling & Associates"
        accentColor="#C9A227"
        theme="light"
      />
    </div>
  );
}
