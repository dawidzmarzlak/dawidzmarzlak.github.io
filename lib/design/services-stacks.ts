export type StackKey = "next" | "wp-woo" | "app" | "maintenance" | "audits" | "migrations";

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
    from: "2 600 PLN",
    time: "4–8 tygodni",
  },
  "wp-woo": {
    label: "WordPress + WooCommerce",
    tag: "02",
    kicker: "CMS + e-commerce, który znasz",
    title: "WordPress i WooCommerce — zrobione jak należy.",
    desc: "Custom theme od zera (zero motywów z marketu, zero page-builderów-zombie), ACF Pro dla zaawansowanego CMS, WooCommerce 8+ dla sklepów do 10 000 SKU. Integracje, których naprawdę używasz: BaseLinker, Subiekt, Allegro, InPost/DPD, KSeF gotowe na 2026. Lighthouse 90+ standardowo.",
    stack: ["Custom theme PHP 8", "WooCommerce 8+", "ACF Pro", "WPML", "Baselinker", "InPost/DPD"],
    use: ["Strony firmowe", "Sklepy 100–10 000 SKU", "B2B z cennikami", "Multilang z WPML"],
    bullets: [
      ["Wydajność", "< 2.0s", "Bez page-builderów. Cache + lazy load + WebP."],
      ["CMS", "Edytor blokowy", "Klient samodzielnie zarządza treścią — bez devów."],
      ["KSeF", "Gotowy na 2026", "Faktury, integracja z Subiektem, eksport do BaseLinkera."],
    ],
    examples: ["TechCorp — strona korporacyjna IT", "BeautyShop — kosmetyki premium"],
    from: "2 900 PLN",
    time: "3–8 tygodni",
  },
  app: {
    label: "Aplikacje webowe",
    tag: "03",
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
    from: "36 000 PLN",
    time: "Od 12 tygodni",
  },
  maintenance: {
    label: "Utrzymanie i hosting",
    tag: "04",
    kicker: "Opieka po wdrożeniu",
    title: "Strona, która zawsze działa.",
    desc: "Trzy pakiety z SLA — Basic 240 / Standard 640 / Premium 1 600 PLN miesięcznie. Hosting na cyber_Folks, Hetzner lub Vercel z pełną administracją. Aktualizacje, backupy, monitoring 24/7, security patches. Reakcja na awarie od 4 do 24h w zależności od pakietu.",
    stack: ["cyber_Folks", "Hetzner", "Vercel", "Uptime Robot", "Sentry", "Cloudflare"],
    use: ["WordPress + Woo z aktualizacjami", "Next.js na Vercel/VPS", "SLA dla aplikacji custom", "Bezobsługowa opieka stron firmowych"],
    bullets: [
      ["SLA", "4–24h reakcji", "Gold 4h, Standard 8h, Basic 24h roboczych."],
      ["Backupy", "7 / 30 dni", "Codzienne, off-site, testowane przywracanie."],
      ["Monitoring", "24/7", "Uptime, błędy aplikacji, certyfikaty SSL, DNS."],
    ],
    examples: ["MediClinic — SLA Gold 24/7", "BeautyShop — Standard z 6h dev/mc"],
    from: "240 PLN / mc",
    time: "Od następnego dnia",
  },
  audits: {
    label: "Audyty i konsultacje",
    tag: "05",
    kicker: "Diagnoza przed inwestycją",
    title: "Wiesz dokładnie, co poprawić — i ile to kosztuje.",
    desc: "Audyty SEO (od 800 zł lokalny, 5 000+ e-commerce), Core Web Vitals, WCAG dostępność, bezpieczeństwo WordPressa (pen-test), code review, compliance RODO/KSeF. Każdy audyt kończy się raportem z konkretnymi rekomendacjami i wyceną wdrożenia poprawek.",
    stack: ["Lighthouse / PSI", "Screaming Frog", "Wordfence", "WAVE / Axe", "OWASP ZAP", "Custom audits"],
    use: ["Strona z niską konwersją", "Sklep przed sezonem", "Migracja CMS", "Wymóg WCAG / RODO"],
    bullets: [
      ["SEO", "TOP 10 fraz", "Analiza techniczna, treści, linkbuildingu i konkurencji."],
      ["CWV", "< 2.5s LCP", "Lighthouse, PSI, real-user monitoring + plan optymalizacji."],
      ["WCAG", "2.1 AA report", "Audyt dostępności z listą fixów priorytetyzowanych po impact."],
    ],
    examples: ["FoodCorp — audyt CWV + plan optymalizacji", "LawFirm — audyt WCAG z planem fixów"],
    from: "800 PLN",
    time: "1–2 tygodnie",
  },
  migrations: {
    label: "Migracje i integracje",
    tag: "06",
    kicker: "Bezpieczne przeprowadzki",
    title: "Z dowolnego systemu do nowoczesnego stacku — bez utraty SEO.",
    desc: "Migracje Shoper / PrestaShop / Magento / Shopify → WooCommerce. Integracje z BaseLinker, Allegro, marketplaces, ERP (Subiekt, Comarch, Wapro, custom). Przenoszenie produktów, klientów, zamówień, redirecty 301 dla zachowania pozycji w Google. Zero downtime, pełna sync ERP w obie strony.",
    stack: ["Custom migration scripts", "Baselinker", "Subiekt GT/nexo", "Comarch ERP", "REST/SOAP API", "301 redirects"],
    use: ["Migracja sklepu na WooCommerce", "Integracja z hurtownią", "Marketplace expansion", "ERP sync (one/two-way)"],
    bullets: [
      ["Downtime", "Zero", "Migracja na środowisku stage, cutover w nocy z DNS TTL 60s."],
      ["SEO", "100% redirectów 301", "Mapa URL stara → nowa, walidacja w Screaming Frog."],
      ["ERP", "Pełna sync", "Produkty, stany, ceny, zamówienia — co 5 minut lub realtime."],
    ],
    examples: ["HurtBudowlany — Shoper → WC z 8k produktów", "FashionHub — integracja Allegro + Empik"],
    from: "2 500 PLN",
    time: "2–6 tygodni",
  },
};
