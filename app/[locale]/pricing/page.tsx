import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { MagneticCTA } from "@/components/animations/MagneticCTA";

export const metadata: Metadata = {
  title: "Cennik",
  description: "Sprawdź nasze ceny i zamów darmową wycenę projektu.",
};

export const dynamic = "force-static";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge: string | null;
}

const pricingPlans: Plan[] = [
  {
    name: "Landing Page",
    price: "od 3000 PLN",
    description: "Idealne dla małych firm i startupów",
    features: [
      "Responsywny design",
      "Optymalizacja SEO",
      "Formularz kontaktowy",
      "Integracja z Google Analytics",
      "1 miesiąc wsparcia",
    ],
    badge: null,
  },
  {
    name: "Strona Firmowa",
    price: "od 6000 PLN",
    description: "Kompleksowa strona dla Twojej firmy",
    features: [
      "Wszystko z Landing Page",
      "Panel administracyjny",
      "Blog / Aktualności",
      "Galeria projektów",
      "Mapy i lokalizacje",
      "3 miesiące wsparcia",
    ],
    badge: "Najpopularniejsze",
  },
  {
    name: "Sklep E-commerce",
    price: "od 12000 PLN",
    description: "Pełna platforma sprzedażowa",
    features: [
      "Wszystko z Strony Firmowej",
      "System płatności online",
      "Zarządzanie produktami",
      "Koszyk i checkout",
      "Panel zamówień",
      "Integracja z kurierami",
      "6 miesięcy wsparcia",
    ],
    badge: null,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-9 pt-8 pb-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
          <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
          <span>/</span>
          <span>Cennik</span>
        </div>
        <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
          Cennik <ItalicAccent>jasny</ItalicAccent> jak rachunek.
        </h1>
        <p className="text-[19px] text-fg-muted max-w-[50ch] leading-[1.55] m-0">
          Wszystkie widełki bez gwiazdek. Każdy pakiet zawiera hosting na pierwszy rok, szkolenie i 6 miesięcy wsparcia.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-9 mt-12 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pricingPlans.map((plan, i) => {
          const featured = !!plan.badge;
          return (
            <article
              key={i}
              className={`relative rounded-[24px] p-9 flex flex-col gap-5 ${
                featured ? "bg-accent text-accent-fg" : "bg-bg-card text-fg border border-line"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 left-9 font-mono text-[11px] uppercase tracking-[0.1em] bg-bg-card text-accent px-3 py-1 rounded-full border border-accent">
                  {plan.badge}
                </span>
              )}
              <div>
                <h3 className="text-[28px] font-semibold tracking-[-0.02em] m-0">{plan.name}</h3>
                <p className={`text-[14px] mt-2 leading-[1.5] m-0 ${featured ? "opacity-80" : "text-fg-muted"}`}>
                  {plan.description}
                </p>
              </div>
              <div className={`font-display italic text-[clamp(40px,5vw,64px)] leading-none ${featured ? "text-accent-fg" : "text-accent"}`}>
                {plan.price}
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex gap-2.5 items-baseline text-[14px]">
                    <span className={`font-mono ${featured ? "text-accent-fg" : "text-accent"}`}>→</span>
                    <span className={featured ? "" : "text-fg"}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <MagneticCTA
                  href="/contact"
                  variant="primary"
                  className={featured ? "!bg-accent-fg !text-accent" : ""}
                >
                  Wycena →
                </MagneticCTA>
              </div>
            </article>
          );
        })}
      </section>

      <CtaCard
        heading={<>Niestandardowy projekt? <ItalicAccent>Porozmawiajmy</ItalicAccent>.</>}
        sub="Każdy projekt jest inny — jeśli żaden z pakietów nie pasuje, wracam z indywidualną wyceną w 48h."
        primaryHref="/contact"
        primaryLabel="Wyślij brief →"
      />
    </>
  );
}
