import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  FashionHero,
  FashionCollections,
  FashionProducts,
  FashionNewsletter,
} from "@/components/showcase/fashion-store";
import { TemplateProvider } from "@/lib/templates/provider";
import { fashionStoreConfig } from "@/lib/showcase/fashion-store/template.config";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function FashionStorePage() {
  return (
    <TemplateProvider
      config={fashionStoreConfig}
      className="min-h-screen bg-[var(--brand-color-bg)]"
    >
      <BackToPortfolio />
      <FashionHero />
      <FashionCollections />
      <FashionProducts />
      <FashionNewsletter />
      <ShowcaseCTA theme="light" />
      <ShowcaseFooter theme="light" />
    </TemplateProvider>
  );
}
