import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  ArchitectureHero,
  ArchitectureProjects,
  ArchitecturePhilosophy,
  ArchitectureProcess,
  ArchitectureTeam,
  ArchitectureAwards,
  ArchitectureContact,
} from "@/components/showcase/architecture-studio";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ArchitectureStudioPage() {
  return (
    <div className="min-h-screen bg-white">
      <BackToPortfolio />
      <ArchitectureHero />
      <ArchitectureProjects />
      <ArchitecturePhilosophy />
      <ArchitectureProcess />
      <ArchitectureTeam />
      <ArchitectureAwards />
      <ArchitectureContact />
      <ShowcaseCTA
        theme="light"
        accentColor="#FF4D00"
        projectName="FORM & VOID"
      />
      <ShowcaseFooter
        projectName="FORM & VOID"
        accentColor="#FF4D00"
        theme="light"
      />
    </div>
  );
}
