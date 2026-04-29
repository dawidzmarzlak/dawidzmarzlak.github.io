import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  SpaHero,
  SpaAbout,
  SpaTreatments,
  SpaTeam,
  SpaGallery,
  SpaWellnessTips,
  SpaBooking,
  SpaTestimonials,
} from "@/components/showcase/spa-wellness";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function SpaWellnessPage() {
  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <BackToPortfolio />
      <SpaHero />
      <SpaAbout />
      <SpaTreatments />
      <SpaTeam />
      <SpaGallery />
      <SpaWellnessTips />
      <SpaTestimonials />
      <SpaBooking />
      <ShowcaseCTA
        theme="light"
        accentColor="#9CAF88"
        projectName="Serenity Springs"
      />
      <ShowcaseFooter
        projectName="Serenity Springs"
        accentColor="#9CAF88"
        theme="light"
      />
    </div>
  );
}
