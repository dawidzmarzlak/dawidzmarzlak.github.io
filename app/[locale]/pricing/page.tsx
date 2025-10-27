import { QuoteForm } from "@/components/forms/QuoteForm";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cennik",
  description: "Sprawdź nasze ceny i zamów darmową wycenę projektu.",
};

const pricingPlans = [
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

export const dynamic = 'force-static';

export default async function PricingPage({
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
            Cennik
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparentne ceny bez ukrytych kosztów. Wybierz pakiet lub zamów indywidualną wycenę.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.badge ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-4xl font-bold mt-4">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Quote Form */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Potrzebujesz indywidualnej wyceny?
              </h2>
              <p className="text-lg text-muted-foreground">
                Wypełnij formularz, a my przygotujemy dla Ciebie spersonalizowaną ofertę
              </p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Co wpływa na cenę projektu?</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Zakres funkcjonalności</h4>
                <p className="text-sm text-muted-foreground">
                  Liczba podstron, integracje z zewnętrznymi systemami, zaawansowane funkcje
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Projekt graficzny</h4>
                <p className="text-sm text-muted-foreground">
                  Indywidualny design vs. szablon, liczba wersji, animacje i efekty
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Termin realizacji</h4>
                <p className="text-sm text-muted-foreground">
                  Pilne projekty wymagają dodatkowych zasobów i mogą wpłynąć na cenę
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Wsparcie i utrzymanie</h4>
                <p className="text-sm text-muted-foreground">
                  Długość okresu wsparcia, hosting, aktualizacje i rozbudowa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
