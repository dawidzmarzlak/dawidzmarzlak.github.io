import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  SaasHero,
  SaasFeatures,
  SaasHowItWorks,
  SaasIntegrations,
  SaasTestimonials,
  SaasFAQ,
  SaasPricing,
  SaasCTA,
} from "@/components/showcase/saas-dashboard";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function SaasDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <BackToPortfolio />
      <SaasHero />
      <SaasFeatures />
      <SaasHowItWorks />
      <SaasIntegrations />
      <SaasTestimonials />
      <SaasFAQ />
      <SaasPricing />
      <SaasCTA />
      <ShowcaseCTA
        theme="dark"
        accentColor="#6366F1"
        projectName="Pulse Analytics"
      />
      <ShowcaseFooter
        projectName="Pulse Analytics"
        accentColor="#6366F1"
        theme="dark"
      />
    </div>
  );
}
