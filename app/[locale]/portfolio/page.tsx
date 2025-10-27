import { setRequestLocale } from "next-intl/server";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Poznaj nasze realizacje - ponad 150 projektów dla zadowolonych klientów.",
};

export default async function PortfolioPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Nasze Realizacje
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Poznaj projekty, które stworzyliśmy dla naszych klientów. Od prostych wizytówek po zaawansowane platformy.
          </p>
        </div>
      </section>

      <Portfolio />
      <Testimonials />
      <CTA />
    </>
  );
}
