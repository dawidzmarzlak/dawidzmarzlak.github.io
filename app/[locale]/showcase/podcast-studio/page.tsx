import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  PodcastHero,
  PodcastEpisodes,
  PodcastHosts,
} from "@/components/showcase/podcast-studio";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function PodcastStudioPage() {
  return (
    <div className="min-h-screen bg-[#0F0A1A]">
      <BackToPortfolio />
      <PodcastHero />
      <PodcastEpisodes />
      <PodcastHosts />
      <ShowcaseCTA
        theme="dark"
        accentColor="#7C3AED"
        projectName="SoundWave"
      />
      <ShowcaseFooter
        projectName="SoundWave"
        accentColor="#7C3AED"
        theme="dark"
      />
    </div>
  );
}
