import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactChannels } from "@/components/sections/contact/ContactChannels";
import { BriefForm } from "@/components/sections/contact/BriefForm";
import { ContactAside } from "@/components/sections/contact/ContactAside";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z IT Solutions - odpowiemy w ciągu 48 godzin.",
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
      <section id="brief" className="max-w-[1400px] mx-auto px-5 lg:px-9 mt-6 mb-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 items-start">
        <BriefForm />
        <ContactAside />
      </section>
    </>
  );
}
