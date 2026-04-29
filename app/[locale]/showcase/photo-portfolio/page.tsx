import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  PhotoHero,
  PhotoBeforeAfter,
  PhotoGallery,
} from "@/components/showcase/photo-portfolio";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function PhotoPortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <BackToPortfolio />
      <PhotoHero />
      <PhotoBeforeAfter />
      <PhotoGallery />
      <ShowcaseCTA
        theme="dark"
        accentColor="#E11D48"
        projectName="Lens & Light"
      />
      <ShowcaseFooter
        projectName="Lens & Light"
        accentColor="#E11D48"
        theme="dark"
      />
    </div>
  );
}
