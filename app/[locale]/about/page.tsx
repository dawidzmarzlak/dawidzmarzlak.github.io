import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Nas",
  description: "Poznaj zespół IT Solutions i dowiedz się więcej o naszej misji i wartościach.",
};

export const dynamic = 'force-static';

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            O Nas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Jesteśmy zespołem pasjonatów technologii, który od 2020 roku tworzy nowoczesne rozwiązania webowe
          </p>
        </div>
      </section>

      <About />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
