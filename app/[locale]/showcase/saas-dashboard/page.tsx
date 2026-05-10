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
import { TemplateProvider } from "@/lib/templates/provider";
import { saasDashboardConfig } from "@/lib/showcase/saas-dashboard/template.config";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function SaasDashboardPage() {
  return (
    <TemplateProvider config={saasDashboardConfig} className="min-h-screen">
      <div style={{ backgroundColor: saasDashboardConfig.theme.palette.bg }}>
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
          accentColor={saasDashboardConfig.theme.palette.accent}
          projectName={saasDashboardConfig.meta.brandName}
        />
        <ShowcaseFooter
          projectName={saasDashboardConfig.meta.brandName}
          accentColor={saasDashboardConfig.theme.palette.accent}
          theme="dark"
        />
      </div>
    </TemplateProvider>
  );
}
