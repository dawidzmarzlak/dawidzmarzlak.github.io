import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  CafeHero,
  CafeStory,
  CafeMenu,
  CafeLocation,
} from "@/components/showcase/artisan-cafe";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ArtisanCafePage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <BackToPortfolio />
      <CafeHero />
      <CafeStory />
      <CafeMenu />
      <CafeLocation />
      <ShowcaseCTA
        theme="light"
        accentColor="#C65D3B"
        projectName="Bean & Brew"
      />
      <ShowcaseFooter
        projectName="Bean & Brew"
        accentColor="#C65D3B"
        theme="light"
      />
    </div>
  );
}
