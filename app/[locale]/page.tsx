import { Hero } from "@/components/sections/redesign/Hero";
import { StackTicker } from "@/components/sections/redesign/StackTicker";
import { ServicesBento } from "@/components/sections/redesign/ServicesBento";
import { AboutBento } from "@/components/sections/redesign/AboutBento";
import { ShowcaseTeaser } from "@/components/sections/redesign/ShowcaseTeaser";
import { Testimonials } from "@/components/sections/redesign/Testimonials";
import { Process } from "@/components/sections/redesign/Process";
import { Faq } from "@/components/sections/redesign/Faq";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { useTranslations } from "next-intl";

export const dynamic = "force-static";

function HomeCta() {
  const t = useTranslations("cta");
  return (
    <CtaCard
      heading={t("h")}
      sub={t("p")}
      primaryHref="/contact"
      primaryLabel={t("primary")}
      secondaryHref="mailto:hello@itsolutions.com"
      secondaryLabel="hello@itsolutions.com"
    />
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <Hero />
      <StackTicker />
      <ServicesBento />
      <AboutBento />
      <ShowcaseTeaser />
      <Testimonials />
      <Process />
      <Faq />
      <HomeCta />
    </>
  );
}
