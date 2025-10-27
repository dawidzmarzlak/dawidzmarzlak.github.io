import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usługi",
  description: "Kompleksowe usługi web development - Next.js, WordPress, WooCommerce, PrestaShop i aplikacje webowe.",
};

export const dynamic = 'force-static';

export default async function ServicesPage({
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
            Nasze Usługi
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferujemy pełen zakres usług tworzenia stron internetowych i aplikacji webowych
          </p>
        </div>
      </section>

      <Services />
      <Technologies />
      <Process />
      <CTA />
    </>
  );
}
