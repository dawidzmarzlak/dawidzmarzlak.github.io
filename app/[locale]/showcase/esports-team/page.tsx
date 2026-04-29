import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  EsportsHero,
  EsportsRoster,
  EsportsSchedule,
} from "@/components/showcase/esports-team";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function EsportsTeamPage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <BackToPortfolio />
      <EsportsHero />
      <EsportsRoster />
      <EsportsSchedule />
      <ShowcaseCTA
        theme="dark"
        accentColor="#22C55E"
        projectName="PHANTOM ESPORTS"
      />
      <ShowcaseFooter
        projectName="PHANTOM ESPORTS"
        accentColor="#22C55E"
        theme="dark"
      />
    </div>
  );
}
