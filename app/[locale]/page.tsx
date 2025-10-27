import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { Technologies } from "@/components/sections/Technologies";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export const dynamic = 'force-static';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Process />
      <Technologies />
      <FAQ />
      <CTA />
    </>
  );
}
