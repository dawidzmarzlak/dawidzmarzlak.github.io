import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  FashionHero,
  FashionCollections,
  FashionProducts,
  FashionNewsletter,
} from "@/components/showcase/fashion-store";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function FashionStorePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <BackToPortfolio />
      <FashionHero />
      <FashionCollections />
      <FashionProducts />
      <FashionNewsletter />
      <ShowcaseCTA
        theme="light"
        accentColor="#D4A5A5"
        projectName="MAISON ÉLISE"
      />
      <ShowcaseFooter
        projectName="MAISON ÉLISE"
        accentColor="#D4A5A5"
        theme="light"
      />
    </div>
  );
}
