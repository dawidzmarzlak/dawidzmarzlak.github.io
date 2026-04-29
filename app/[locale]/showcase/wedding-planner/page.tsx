import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  WeddingHero,
  WeddingGallery,
  WeddingTimeline,
} from "@/components/showcase/wedding-planner";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function WeddingPlannerPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF7]">
      <BackToPortfolio />
      <WeddingHero />
      <WeddingTimeline />
      <WeddingGallery />
      <ShowcaseCTA
        theme="light"
        accentColor="#D4A5A5"
        projectName="Forever & Always"
      />
      <ShowcaseFooter
        projectName="Forever & Always"
        accentColor="#D4A5A5"
        theme="light"
      />
    </div>
  );
}
