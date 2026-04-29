import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  FitnessHero,
  FitnessClasses,
  FitnessTrainers,
  FitnessSchedule,
  FitnessResults,
  FitnessTestimonials,
  FitnessFAQ,
  FitnessMembership,
} from "@/components/showcase/fitness-studio";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function FitnessStudioPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <BackToPortfolio />
      <FitnessHero />
      <FitnessClasses />
      <FitnessTrainers />
      <FitnessSchedule />
      <FitnessResults />
      <FitnessTestimonials />
      <FitnessFAQ />
      <FitnessMembership />
      <ShowcaseCTA
        theme="dark"
        accentColor="#CCFF00"
        projectName="APEX PERFORMANCE"
      />
      <ShowcaseFooter
        projectName="APEX PERFORMANCE"
        accentColor="#CCFF00"
        theme="dark"
      />
    </div>
  );
}
