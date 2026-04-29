export type StackKey = "next" | "wp" | "woo" | "presta" | "app";

export interface Stack {
  label: string;
  tag: string;
  kicker: string;
  title: string;
  desc: string;
  stack: string[];
  use: string[];
  bullets: Array<[string, string, string]>;
  examples: string[];
  from: string;
  time: string;
}

export const STACKS: Record<StackKey, Stack> = {
  next: {
    label: "Next.js",
    tag: "01",
    kicker: "Production-grade React",
    title: "Strony, które ładują się błyskawicznie i konwertują.",
    desc: "Next.js 14, App Router, Server Components. Hosting na Vercel z preview deploymentami z każdego brancha. CMS — Sanity / Strapi / MDX. Wszystko zintegrowane, żebyś mógł pisać teksty bez devów.",
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind", "Sanity / Strapi", "Vercel"],
    use: ["Strony korporacyjne premium", "Landing pages dla SaaS", "Sklepy headless", "Strony lecące powyżej 90 LH"],
    bullets: [
      ["LCP", "< 1.5s", "Standardowy cel. Zwykle schodzimy do 1.0–1.2s."],
      ["SEO", "Schema + OG + sitemap", "Wszystko domyślnie — bez Yoast, bez wtyczek."],
      ["CMS", "Headless lub MDX", "Sam wybierasz co edytujesz, my budujemy schemat."],
    ],
    examples: ["FashionHub — sklep premium", "EduPlatform — platforma kursów"],
    from: "8 500 PLN",
    time: "4–8 tygodni",
  },
  wp: {
    label: "WordPress",
    tag: "02",
    kicker: "CMS, który zna każdy",
    title: "WordPress — ale zrobiony jak należy.",
    desc: "Custom theme od zera (zero motywów z marketu), bez Elementora, bez page-builderów-zombie. Lekkie wtyczki, ACF dla zaawansowanego CMS, własny edytor blokowy. Editor klienta zna w 30 minut.",
    stack: ["Custom theme PHP 8", "ACF Pro", "WPML", "WP-CLI", "Lighthouse 90+"],
    use: ["Strony firmowe", "Blogi i magazyny", "Strony usługowe z lokalnym SEO", "Multilanguage"],
    bullets: [
      ["Wydajność", "< 2.0s", "Bez page-builderów. Cache + lazy load + WebP."],
      ["CMS", "Edytor blokowy", "Klient samodzielnie zarządza treścią."],
      ["Multilang", "WPML", "PL + EN + DE — bez problemów z tłumaczeniem."],
    ],
    examples: ["TechCorp — strona korporacyjna IT", "LocalLaw — kancelaria prawna"],
    from: "5 500 PLN",
    time: "3–5 tygodni",
  },
  woo: {
    label: "WooCommerce",
    tag: "03",
    kicker: "E-commerce na WordPress",
    title: "Sklep, który skaluje się do 10 000 SKU.",
    desc: "Pełna integracja: PayU, Stripe, Przelewy24, kurierzy (InPost, DPD, DHL), Allegro, Baselinker, Subiekt GT. Konfigurator produktów, warianty, abonamenty. Przetestowane na sklepach z 5 cyfrowym ruchem dziennym.",
    stack: ["WooCommerce 8+", "Custom hooks", "PayU/Stripe/P24", "InPost/DPD", "Baselinker"],
    use: ["Sklepy z 100–10 000 SKU", "Produkty konfigurowalne", "Sprzedaż B2B + B2C", "Sklepy z subskrypcjami"],
    bullets: [
      ["Skalowalność", "Do 10k SKU", "Optymalizacja zapytań, cache produktowy."],
      ["Płatności", "5+ bramek", "PayU, Stripe, P24, BLIK, raty Allegro."],
      ["Logistyka", "Pełna automatyka", "Etykiety, śledzenie, paragony."],
    ],
    examples: ["HomeDesign — meble z konfiguratorem 3D", "BeautyShop — kosmetyki premium"],
    from: "9 500 PLN",
    time: "6–10 tygodni",
  },
  presta: {
    label: "PrestaShop",
    tag: "04",
    kicker: "E-commerce dla wymagających",
    title: "Dla sklepów, gdzie WordPress to za mało.",
    desc: "Prestashop 8.x — gdy potrzebujesz multistore, zaawansowanej polityki cen, B2B z kontami i zniżkami per klient. Custom moduły gdzie standardowe nie wystarczają. Migracje z 1.7 → 8.x bez utraty SEO.",
    stack: ["PrestaShop 8+", "Symfony 6", "Smarty", "Custom modules", "Multistore"],
    use: ["Multistore (kilka domen, jeden panel)", "B2B z indywidualnymi cennikami", "Hurtownie online", "Sklepy 10k+ produktów"],
    bullets: [
      ["Multistore", "Jeden panel", "Kilka domen, kilka walut, jedna baza."],
      ["B2B", "Cennik per klient", "Negocjowane ceny, dostawy, terminy płatności."],
      ["Migracje", "1.7 → 8.x", "Bez utraty SEO, z zachowaniem URL i przekierowań."],
    ],
    examples: ["FoodDelivery — marketplace restauracji", "HurtBudowlany — B2B z cennikami"],
    from: "12 000 PLN",
    time: "8–14 tygodni",
  },
  app: {
    label: "Aplikacje webowe",
    tag: "05",
    kicker: "Spring Boot + React",
    title: "Aplikacje, które mają działać latami.",
    desc: "Backend Spring Boot 3 (Java 21), frontend React/Next.js, PostgreSQL, Redis na cache. CI/CD z GitHub Actions, Docker, monitoring (Sentry, Grafana). Skala do tysięcy concurrent users.",
    stack: ["Spring Boot 3", "Java 21", "PostgreSQL", "Redis", "React/Next", "Docker"],
    use: ["Portale klienta (B2B, B2C)", "Systemy rezerwacyjne", "Panele administracyjne", "CRM/ERP custom", "Aplikacje SaaS"],
    bullets: [
      ["Skala", "10k+ users", "Architektura mikrousług, kolejkowanie, cache."],
      ["DevOps", "CI/CD + Docker", "Każdy commit testowany, każdy merge wdrażany."],
      ["Bezpieczeństwo", "OWASP + audyt", "Pen-test przed produkcją, MFA, RBAC."],
    ],
    examples: ["MediClinic — portal pacjenta", "BookingPro — system rezerwacji"],
    from: "18 000 PLN",
    time: "Od 12 tygodni",
  },
};
