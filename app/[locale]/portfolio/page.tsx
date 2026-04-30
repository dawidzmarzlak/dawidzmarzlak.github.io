import type { Metadata } from "next";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioPageClient } from "@/components/sections/portfolio/PortfolioPageClient";
import { CaseStudy } from "@/components/sections/portfolio/CaseStudy";
import { getDefaultCaseStudy } from "@/lib/design/case-studies";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Poznaj nasze realizacje - ponad 50 projektów dla zadowolonych klientów.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const dynamic = "force-static";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioPageClient />
      <CaseStudy data={getDefaultCaseStudy()} />
      <CtaCard
        heading={<>Twój projekt może być <ItalicAccent>następny</ItalicAccent>.</>}
        sub="30 minut konsultacji. 48h na wycenę. Zero zobowiązań."
        primaryHref="/contact"
        primaryLabel="Umów konsultację →"
      />
    </>
  );
}
