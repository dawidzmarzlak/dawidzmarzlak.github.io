import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  CryptoHero,
  CryptoTicker,
  CryptoFeatures,
  CryptoRoadmap,
} from "@/components/showcase/crypto-platform";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function CryptoPlatformPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <BackToPortfolio />
      <CryptoHero />
      <CryptoTicker />
      <CryptoFeatures />
      <CryptoRoadmap />
      <ShowcaseCTA
        theme="dark"
        accentColor="#8B5CF6"
        projectName="NexChain"
      />
      <ShowcaseFooter
        projectName="NexChain"
        accentColor="#8B5CF6"
        theme="dark"
      />
    </div>
  );
}
