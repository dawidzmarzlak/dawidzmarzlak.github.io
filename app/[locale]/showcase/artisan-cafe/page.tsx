import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  CafeHero,
  CafeStory,
  CafeMenu,
  CafeLocation,
} from "@/components/showcase/artisan-cafe";
import { TemplateProvider } from "@/lib/templates/provider";
import { artisanCafeConfig } from "@/lib/showcase/artisan-cafe/template.config";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ArtisanCafePage() {
  return (
    <TemplateProvider config={artisanCafeConfig} className="min-h-screen">
      <BackToPortfolio />
      <CafeHero />
      <CafeStory />
      <CafeMenu />
      <CafeLocation />
      <ShowcaseCTA theme="light" />
      <ShowcaseFooter theme="light" />
    </TemplateProvider>
  );
}
