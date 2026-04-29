import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  MusicHero,
  MusicFeatured,
  MusicNewReleases,
  MusicGenres,
} from "@/components/showcase/music-store";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function MusicStorePage() {
  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      <BackToPortfolio />
      <MusicHero />
      <MusicFeatured />
      <MusicNewReleases />
      <MusicGenres />
      <ShowcaseCTA
        theme="dark"
        accentColor="#FF6B35"
        projectName="Analog Alley"
      />
      <ShowcaseFooter
        projectName="Analog Alley"
        accentColor="#FF6B35"
        theme="dark"
      />
    </div>
  );
}
