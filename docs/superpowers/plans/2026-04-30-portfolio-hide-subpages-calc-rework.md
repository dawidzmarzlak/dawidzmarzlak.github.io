# Portfolio Hide + FAQ/Process Subpages + Calculator Business Reframe — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (1) Ukryć (nie usunąć) portfolio z głównej nawigacji, home i sitemapy — komponenty zostają; (2) Dodać dwie pełne podstrony `/process` i `/faq` jako rozszerzenia odpowiednich sekcji home, plus dyskretne linki ze stron home do tych podstron (SEO traffic); (3) Przeredagować kalkulator pod nietechnicznego klienta — biznesowy język na pierwszym planie, techniczne preferencje w opcjonalnym, zwiniętym panelu.

**Architecture:** App Router + next-intl. Wszystkie nowe sekcje używają tokenów `redesign-variant-c` (`bg-card`, `accent`, `font-display`, `ItalicAccent`, `SectionHead`, `CtaCard`). Portfolio "ukryty" = brak linków + `noindex` na `/portfolio` + brak w sitemapie (komponenty i strona zostają, dostępne tylko przez bezpośredni URL). Subpages `/process` i `/faq` używają nowych Hero komponentów (wzorowane na `PortfolioHero`/`AboutHero` w istniejących stronach) plus rozszerzonej zawartości pod nimi (kategorie FAQ, dłuższe opisy kroków procesu). Kalkulator: dodajemy 3 czyste-kontekstowe pola biznesowe (`industry`, `audience`, `stage`) z `cost = 0`; relabelujemy istniejące knoby na biznesowy język; refaktoryzujemy `AdvancedCalculator.tsx` aby techniczne knoby (`shopPlatform`, `appBackend`, `appStorage`, `hosting`) trafiły do zwijanego panelu "Preferowane technologie (opcjonalnie)".

**Tech Stack:** Next 16 + React 19, next-intl 4, TailwindCSS 3, Playwright 1.56 (testy). Brak nowych zależności.

**Scope check / split-plan note:** Plan ma 3 niezależne fazy (A: Hide Portfolio, B: Subpages /process & /faq, C: Calculator Business Reframe). Każda faza produkuje działający, testowalny kod sama z siebie. Można je wdrażać niezależnie/równolegle. Jeśli wolisz po jednej fazie do PR — powiedz, zrobię split.

---

## Status (na 2026-04-30, podsumowanie kontekstu)

- Home (`app/[locale]/page.tsx`) ma sekcje: Hero → StackTicker → ServicesBento → AboutBento → **PortfolioGrid** → ShowcaseTeaser → Testimonials → **Process** (id="process") → **Faq** (id="faq") → CtaCard.
- Navbar (`components/layout/Navbar.tsx`): NAV_ITEMS = `[services, portfolio, showcase, contact]`; ANCHOR_ITEMS = `[process, faq]` — działają przez `goToAnchor` (smooth-scroll na home, `router.push("/#id")` z innych stron).
- Footer (`components/layout/Footer.tsx`): w kolumnie "Studio" pozycja `i === 1` linkuje do `/portfolio`. Pozostałe: 0=`/about`, 2=`/showcase`, 3=`#` (Blog), 4=`/pricing`.
- Sitemap (`app/sitemap.ts`): zawiera `/portfolio` z priority 0.8.
- Strona portfolio (`app/[locale]/portfolio/page.tsx`): metadata bez `robots`, więc indexable.
- Sekcja Faq (`components/sections/redesign/Faq.tsx`): `id="faq"`, używa `SectionHead` bez `cta` — brak linku do podstrony.
- Sekcja Process (`components/sections/redesign/Process.tsx`): `id="process"`, używa `SectionHead` bez `cta`.
- Kalkulator (`components/sections/pricing/AdvancedCalculator.tsx` + `lib/design/calculator.ts`): obecnie pokazuje wszystkie knoby na płasko. Techniczne pozycje zmieszane z biznesowymi: `shopPlatform`, `appBackend`, `appStorage`, `hosting` (technical) plus `siteGoal`, `appType`, `catalogSize`, integracje (business).
- Presety (`lib/design/pricing-presets.ts`): 3 — `landing`, `company`, `ecom`.
- Tłumaczenia: `messages/pl.json`, `messages/en.json` — sekcje `nav`, `process`, `faq`, `calculator`, `pricing.knobs`, `redesign.sections.*` już istnieją.
- Testy Playwright: `tests/redesign/home.spec.ts`, `home-portfolio-grid.spec.ts`, `pricing-calculator.spec.ts`, `calculator-kind.spec.ts` — niektóre asercie zakładają obecność portfolio na home.

---

## File Structure

### Phase A — Hide portfolio
- **Modify** `app/[locale]/page.tsx` — usuń import i renderowanie `<PortfolioGrid />`
- **Modify** `components/layout/Navbar.tsx` — usuń `portfolio` z `NAV_ITEMS`
- **Modify** `components/layout/Footer.tsx` — pozycja `i === 1` (Portfolio) ma href = `"#"` zamiast `/portfolio`; usuń element ze studioLinks
- **Modify** `app/sitemap.ts` — usuń wpis `{ path: '/portfolio', ... }`
- **Modify** `app/[locale]/portfolio/page.tsx` — dodaj `robots: { index: false, follow: false }` w `metadata`
- **Modify** `messages/pl.json`, `messages/en.json` — usuń `"portfolio"` z `footer.linksList.studio` (tylko ten jeden item)
- **Modify** `tests/redesign/home-portfolio-grid.spec.ts` — przerób na test nieobecności (PortfolioGrid nie renderuje się na home)
- **Create** `tests/redesign/portfolio-hidden.spec.ts` — sitemap nie zawiera `/portfolio`, `/portfolio` ma `noindex`, navbar/footer nie mają linku do `/portfolio`, ale strona dostępna pod URL

### Phase B — Subpages /process and /faq
- **Create** `app/[locale]/process/page.tsx` — strona procesu
- **Create** `app/[locale]/faq/page.tsx` — strona FAQ
- **Create** `components/sections/process/ProcessHero.tsx` — hero w stylu PortfolioHero/AboutHero
- **Create** `components/sections/process/ProcessExtended.tsx` — rozszerzona lista 7 kroków z dłuższymi opisami + sekcja "Dlaczego ten proces"
- **Create** `components/sections/faq/FaqHero.tsx` — hero
- **Create** `components/sections/faq/FaqCategories.tsx` — FAQ pogrupowane w 5 kategorii (Współpraca, Cennik, Technologie, Termin, Po wdrożeniu)
- **Modify** `components/layout/Navbar.tsx` — `process` i `faq` przestają być anchor items, stają się normalnymi `Link` w `NAV_ITEMS` (lub osobnej liście) wskazującymi na `/process` i `/faq`
- **Modify** `components/sections/redesign/Process.tsx` — dodaj `cta={{ href: "/process", label: t("cta") }}` do `SectionHead`
- **Modify** `components/sections/redesign/Faq.tsx` — dodaj `cta={{ href: "/faq", label: t("cta") }}` do `SectionHead`
- **Modify** `app/sitemap.ts` — dodaj `/process` i `/faq`
- **Modify** `messages/pl.json`, `messages/en.json` — dodaj `redesign.sections.process.cta`, `redesign.sections.faq.cta`, sekcję `process.page.*`, sekcję `faq.page.*`
- **Modify** `app/[locale]/layout.tsx` — opcjonalnie zaktualizuj `faqJsonLd` (zostawiamy bez zmian — JSON-LD ma już 3 pytania, OK)
- **Create** `tests/redesign/process-page.spec.ts` — `/pl/process` ładuje się, ma h1 z "proces", section z 7 krokami
- **Create** `tests/redesign/faq-page.spec.ts` — `/pl/faq` ładuje się, ma h1 z FAQ, ma minimum 5 kategorii pytań
- **Create** `tests/redesign/home-section-cta.spec.ts` — sekcja Process na home ma link do `/process`, sekcja FAQ na home ma link do `/faq`

### Phase C — Calculator business reframe
- **Modify** `lib/design/project-kinds.ts` — dodaj `INDUSTRIES`, `AUDIENCES`, `PROJECT_STAGES` z odpowiednimi typami
- **Modify** `lib/design/calculator.ts` — rozszerz `SharedFields` o `industry`, `audience`, `stage` (zero cost — tylko kontekst). `computeAdvancedQuote` zostaje numerycznie identyczne dla istniejących pól.
- **Modify** `lib/design/pricing-presets.ts` — dodaj `industry`, `audience`, `stage` z domyślnymi wartościami do każdego z 3 presetów
- **Modify** `components/sections/pricing/AdvancedCalculator.tsx`:
  - Dodaj nowe knoby na górze: `industry`, `audience`, `stage`
  - Relabeluj istniejące knoby (przez `messages.json`) na biznesowy język
  - Wyodrębnij komponent wewnętrzny `TechPreferencesPanel` (`useState collapsed`, default `true`) zawierający: `shopPlatform` (jeśli kind===shop), `appBackend` + `appStorage` (jeśli kind===app), `hosting` (zawsze)
  - W bazowym layoucie zostaw: `kind`, `industry`, `audience`, `stage`, kind-specific business knoby, `designTier`, `languages`, `supportTier`, `timeline`
- **Modify** `messages/pl.json`, `messages/en.json` — dodaj `calculator.industries.*`, `calculator.audiences.*`, `calculator.stages.*`, `pricing.knobs.industry`, `pricing.knobs.audience`, `pricing.knobs.stage`, `pricing.knobs.techPreferences`, `pricing.knobs.techPreferencesHint`. Relabeluj wybrane istniejące klucze (np. `pricing.knobs.cms` na "Samodzielna edycja treści", `pricing.knobs.catalogSize` na "Liczba produktów", `pricing.knobs.payments` na "Metody płatności online", `pricing.knobs.appAuth` na "Konta użytkowników", `appAuth.email` opcje na biznesowy język).
- **Modify** `tests/redesign/calculator-kind.spec.ts` — zaktualizuj `SITE_BASELINE`, `SHOP_BASELINE`, `APP_BASELINE` o nowe pola (zero cost — sumy nie zmieniają się)
- **Create** `tests/redesign/calculator-business-knobs.spec.ts` — sprawdź że nowe knoby renderują się, panel "Preferowane technologie" jest domyślnie zwinięty, można go rozwinąć, biznesowe etykiety widoczne (np. "Liczba produktów" zamiast "Wielkość katalogu")
- **Modify** `tests/redesign/pricing-calculator.spec.ts` — jeśli odwołuje się do starych etykiet, zaktualizuj selektory

---

# Phase A — Hide Portfolio

### Task A1: Remove PortfolioGrid from home page

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Edit `app/[locale]/page.tsx` — remove import and usage**

Replace the file content with:

```tsx
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
```

- [ ] **Step 2: Verify TypeScript build**

Run: `npx tsc --noEmit`
Expected: PASS (no type errors).

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat(home): remove PortfolioGrid from home composition (portfolio hidden)"
```

### Task A2: Remove portfolio link from Navbar

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Update `NAV_ITEMS` array**

In `components/layout/Navbar.tsx`, replace lines 9-14 with:

```tsx
const NAV_ITEMS: Array<{ href: string; key: "services" | "showcase" | "contact"; }> = [
  { href: "/services",  key: "services" },
  { href: "/showcase",  key: "showcase" },
  { href: "/contact",   key: "contact" },
];
```

(Note: `process` and `faq` anchor items will be replaced in Phase B Task B7 — keep them as-is here.)

- [ ] **Step 2: Verify TypeScript build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat(nav): remove portfolio entry from navbar (hidden)"
```

### Task A3: Remove portfolio link from Footer

**Files:**
- Modify: `components/layout/Footer.tsx`
- Modify: `messages/pl.json`
- Modify: `messages/en.json`

- [ ] **Step 1: Locate `footer.linksList.studio` in both message files**

Run: `grep -n "linksList" messages/pl.json` (use Grep tool).
Find the array under `footer.linksList.studio`. It currently contains `["O mnie", "Portfolio", "Showcase", "Blog", "Cennik"]` (PL) and `["About", "Portfolio", "Showcase", "Blog", "Pricing"]` (EN).

- [ ] **Step 2: Edit `messages/pl.json` — remove "Portfolio" from `footer.linksList.studio`**

Change the array from `["O mnie", "Portfolio", "Showcase", "Blog", "Cennik"]` to `["O mnie", "Showcase", "Blog", "Cennik"]`.

- [ ] **Step 3: Edit `messages/en.json` — remove "Portfolio" from `footer.linksList.studio`**

Change the array from `["About", "Portfolio", "Showcase", "Blog", "Pricing"]` to `["About", "Showcase", "Blog", "Pricing"]`.

- [ ] **Step 4: Update `Footer.tsx` index mapping**

The previous mapping (`i === 0 → /about, 1 → /portfolio, 2 → /showcase, 3 → #blog, 4 → /pricing`) shifts now that Portfolio is gone: `0 → /about, 1 → /showcase, 2 → #blog, 3 → /pricing`. Replace the `studioLinks.map` block in `components/layout/Footer.tsx` (around lines 42-67) with:

```tsx
{studioLinks.map((label, i) => {
  // [About, Showcase, Blog, Pricing]
  const href =
    i === 0
      ? "/about"
      : i === 1
        ? "/showcase"
        : i === 3
          ? "/pricing"
          : "#";
  return (
    <li key={i}>
      <Link
        href={href}
        className="text-fg opacity-75 text-[14px] no-underline hover:opacity-100 transition-opacity"
      >
        {label}
      </Link>
    </li>
  );
})}
```

- [ ] **Step 5: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Footer.tsx messages/pl.json messages/en.json
git commit -m "feat(footer): drop portfolio link from studio column"
```

### Task A4: Add noindex to /portfolio page + remove from sitemap

**Files:**
- Modify: `app/[locale]/portfolio/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Edit portfolio page metadata**

In `app/[locale]/portfolio/page.tsx`, replace the `metadata` block with:

```tsx
export const metadata: Metadata = {
  title: "Portfolio",
  description: "Poznaj nasze realizacje - ponad 50 projektów dla zadowolonych klientów.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};
```

- [ ] **Step 2: Edit `app/sitemap.ts` — remove portfolio entry**

Replace the `pages` array (lines 9-16) with:

```tsx
const pages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
]
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/portfolio/page.tsx app/sitemap.ts
git commit -m "feat(seo): noindex /portfolio and drop from sitemap (hidden)"
```

### Task A5: Adapt and add Phase A tests

**Files:**
- Modify: `tests/redesign/home-portfolio-grid.spec.ts`
- Create: `tests/redesign/portfolio-hidden.spec.ts`

- [ ] **Step 1: Read existing `tests/redesign/home-portfolio-grid.spec.ts`**

Use the Read tool to see what asserts. The test currently expects `data-portfolio-card` elements on the home page — these will be gone.

- [ ] **Step 2: Replace `tests/redesign/home-portfolio-grid.spec.ts` with absence assertion**

```ts
import { test, expect } from "@playwright/test";

test("home / does NOT render portfolio grid (portfolio hidden)", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
  // Wait for hero to load so DOM is ready
  await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 15_000 });
  // No portfolio cards on home anymore
  await expect(page.locator("[data-portfolio-card]")).toHaveCount(0);
});
```

- [ ] **Step 3: Create `tests/redesign/portfolio-hidden.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test.describe("portfolio hidden but reachable", () => {
  test("navbar does not link to /portfolio", async ({ page }) => {
    await page.goto("/pl", { waitUntil: "domcontentloaded" });
    const nav = page.getByRole("navigation").first();
    await expect(nav.locator('a[href="/pl/portfolio"]')).toHaveCount(0);
  });

  test("footer does not link to /portfolio", async ({ page }) => {
    await page.goto("/pl", { waitUntil: "domcontentloaded" });
    const footer = page.locator("footer");
    await expect(footer.locator('a[href="/pl/portfolio"]')).toHaveCount(0);
  });

  test("/portfolio page still loads (direct URL access)", async ({ page }) => {
    await page.goto("/pl/portfolio", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("/portfolio page emits robots noindex meta", async ({ page }) => {
    await page.goto("/pl/portfolio", { waitUntil: "domcontentloaded" });
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robotsMeta?.toLowerCase() ?? "").toContain("noindex");
  });

  test("sitemap.xml does not include /portfolio", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).not.toContain("/portfolio");
  });
});
```

- [ ] **Step 4: Run tests**

Run: `npx playwright test tests/redesign/home-portfolio-grid.spec.ts tests/redesign/portfolio-hidden.spec.ts`
Expected: PASS (all 6 tests).
If failing on `sitemap.xml` due to dev server differences, run `npm run build` first or skip in dev mode by checking `process.env`.

- [ ] **Step 5: Commit**

```bash
git add tests/redesign/home-portfolio-grid.spec.ts tests/redesign/portfolio-hidden.spec.ts
git commit -m "test(portfolio): cover hide (no nav/footer links, noindex, sitemap)"
```

---

# Phase B — Subpages /process and /faq

### Task B1: Create i18n entries for new subpages and section CTAs

**Files:**
- Modify: `messages/pl.json`
- Modify: `messages/en.json`

- [ ] **Step 1: Add `cta` key to home section translations (pl.json + en.json)**

In `messages/pl.json`, find `redesign.sections.process` and `redesign.sections.faq`. Update them:

```json
"process": {
  "kicker": "[06] Proces",
  "title": ["Od briefu do ", "live", "."],
  "cta": "Cały proces krok po kroku →"
},
"faq": {
  "kicker": "[07] FAQ",
  "title": ["Pytania, które ", "najczęściej słyszę", "."],
  "cta": "Wszystkie pytania →"
}
```

In `messages/en.json`, equivalent:

```json
"process": {
  "kicker": "[06] Process",
  "title": ["From brief to ", "live", "."],
  "cta": "Full process step-by-step →"
},
"faq": {
  "kicker": "[07] FAQ",
  "title": ["Questions ", "I hear most often", "."],
  "cta": "All questions →"
}
```

- [ ] **Step 2: Add `process.page` block (pl.json)**

Find the `"process": {` block (around line 156). After the existing `stepsList` entry, add a new sibling key `page`:

```json
"page": {
  "hero": {
    "crumb": "Proces",
    "title": ["Od briefu do ", "live", " w siedmiu krokach."],
    "intro": "Współpraca w siedmiu jasnych krokach. Każdy etap ma konkretny rezultat, znany czas trwania i jeden kontakt po Twojej stronie. Demo co piątek — bez prezentacji, bez handlowca w pętli."
  },
  "extended": [
    ["Konsultacja — 30 minut", "Bezpłatne 30 minut. Rozmawiamy o celu projektu, KPI, ograniczeniach budżetowych i terminowych. Wychodzisz z notatką: co budujemy, jakim stackiem, w jakim modelu rozliczeń. Bez zobowiązań."],
    ["Wycena w 48 godzin", "Stała cena (Fixed) lub Time & Materials. Harmonogram tygodniowy z kamieniami milowymi. Wycenę dostajesz mailem — możesz zaakceptować, dopytać albo odpuścić bez kosztów."],
    ["UX/UI — wireframe → Figma hi-fi", "Najpierw szkic — żeby uzgodnić strukturę informacji. Potem hi-fi w Figmie z gotowym design system'em (kolory, typografia, komponenty). Akceptujesz w jednym widoku, nie w 30 mailach."],
    ["Development — sprinty 2-tygodniowe", "Każdy sprint kończy się demo (piątek, 30 min). Widzisz postęp na żywo: na staging URL, klikalna wersja. Bug tracker po Twojej stronie — wszystko transparentnie."],
    ["Testy — E2E, perf, a11y, security", "Playwright (E2E + regresje wizualne), Lighthouse 95+, axe-core (WCAG AA), audyt bezpieczeństwa OWASP Top 10. Raport dostarczany przed wdrożeniem."],
    ["Wdrożenie — CI/CD, SSL, monitoring", "Pipeline GitHub Actions, certyfikat SSL, backup'y, monitoring uptime + błędów. Wdrożenie wieczorem (poza godzinami szczytu) z planem rollback'u."],
    ["Wsparcie — 6 miesięcy w cenie", "6 miesięcy bug-fix'ów gratis (wszystko, co popsuje się z mojej winy). Płatne tylko nowe funkcje. SLA na życzenie."]
  ],
  "philosophy": {
    "kicker": "// Dlaczego ten proces",
    "title": ["Bez ", "niespodzianek", ". Bez prezentacji."],
    "items": [
      ["Demo co tydzień", "Widzisz postęp w piątek, nie w dniu odbioru. Reagujesz wcześniej, zmiany są tańsze."],
      ["Stała cena albo T&M — Twój wybór", "Fixed daje przewidywalność budżetu. T&M elastyczność zakresu. Decydujesz na etapie wyceny."],
      ["Jeden kontakt", "Pracujesz ze mną. Bez handlowca, bez project managera w środku. Decyzje zapadają w 24h."],
      ["Wszystko po polsku", "Dokumentacja, README z runbook'iem, video-walkthrough panelu. Po roku wciąż wiesz, jak edytować."]
    ]
  }
}
```

(Insert as new key inside the existing `process` object, before the closing brace.)

- [ ] **Step 3: Add `process.page` block (en.json)**

```json
"page": {
  "hero": {
    "crumb": "Process",
    "title": ["From brief to ", "live", " in seven steps."],
    "intro": "Collaboration in seven clear steps. Each phase has a concrete deliverable, a known duration and one point of contact on your side. Demo every Friday — no slides, no salesperson in the loop."
  },
  "extended": [
    ["Consultation — 30 minutes", "Free 30 minutes. We talk about project goals, KPIs, budget and timeline constraints. You leave with a note: what we're building, with which stack, in which billing model. No commitments."],
    ["Quote in 48 hours", "Fixed price or Time & Materials. Weekly schedule with milestones. You get the quote by email — accept, ask follow-ups, or pass at no cost."],
    ["UX/UI — wireframe → Figma hi-fi", "Sketch first — to align on information structure. Then hi-fi in Figma with a ready design system (colors, typography, components). Approve in one view, not in 30 emails."],
    ["Development — 2-week sprints", "Every sprint ends with a demo (Friday, 30 min). You see progress live: on a staging URL, a clickable version. Bug tracker on your side — full transparency."],
    ["Testing — E2E, perf, a11y, security", "Playwright (E2E + visual regressions), Lighthouse 95+, axe-core (WCAG AA), OWASP Top 10 security audit. Report delivered before deploy."],
    ["Deploy — CI/CD, SSL, monitoring", "GitHub Actions pipeline, SSL cert, backups, uptime + error monitoring. Deploy in the evening (off-peak) with a rollback plan."],
    ["Support — 6 months included", "6 months of bug-fixes free (anything I broke). Paid only for new features. SLA on request."]
  ],
  "philosophy": {
    "kicker": "// Why this process",
    "title": ["No ", "surprises", ". No slides."],
    "items": [
      ["Weekly demo", "You see progress on Friday, not on delivery day. React earlier — changes are cheaper."],
      ["Fixed price or T&M — your call", "Fixed gives budget predictability. T&M gives scope flexibility. You decide at quote time."],
      ["One contact", "You work with me. No sales rep, no PM in the middle. Decisions in 24h."],
      ["Bilingual docs", "README with runbook, video walkthrough of the admin panel. After a year you still know how to edit."]
    ]
  }
}
```

- [ ] **Step 4: Add `faq.page` block (pl.json)**

Inside the existing `faq` object (after `itemsList`), add:

```json
"page": {
  "hero": {
    "crumb": "FAQ",
    "title": ["Pytania, na które ", "odpowiadam najczęściej", "."],
    "intro": "Pięć kategorii, kilkanaście pytań. Jeśli Twojego pytania tu nie ma — napisz, odpowiadam w 24 godziny."
  },
  "categories": [
    {
      "name": "Współpraca",
      "items": [
        ["Jak zacząć współpracę?", "Wypełnij brief lub umów konsultację (30 min, bezpłatnie). W 48 godzin wracam z wyceną i harmonogramem. Decyzja po Twojej stronie — bez zobowiązań."],
        ["Czy podpisujemy umowę?", "Tak — każdy projekt to umowa B2B z konkretnym zakresem, kamieniami milowymi i warunkami płatności. Wzór wysyłam razem z wyceną."],
        ["Jak wygląda komunikacja?", "Email + Slack/Teams (do wyboru). Codziennie krótki status, w piątki demo. Bug tracker (Linear/GitHub) — pełna transparentność postępu."],
        ["Czy mogę przerwać współpracę w trakcie?", "Tak. Płacisz za zrealizowane kamienie milowe, dostajesz pełen kod i dokumentację. Bez kar i ukrytych klauzul."]
      ]
    },
    {
      "name": "Cennik i płatności",
      "items": [
        ["Jak liczona jest cena?", "Fixed (stała cena) lub T&M (Time & Materials). Stała cena = przewidywalny budżet, jasny zakres. T&M = elastyczność, kiedy zakres się zmienia. Kalkulator pokazuje cenę bazową — finalna w wycenie."],
        ["Kiedy płacę?", "Standardowo: 30% przy starcie, 40% po akceptacji designu, 30% przy wdrożeniu. Negocjowalne. Faktura VAT, B2B."],
        ["Czy są ukryte koszty?", "Nie. Cena obejmuje rozwój, design, testy, wdrożenie, dokumentację i 6 mies. wsparcia. Płatne dodatkowo: licencje (np. fonty premium), hosting po stronie klienta, integracje, które wymagają płatnych SaaS."],
        ["Co jeśli budżet nie wystarczy?", "Rozkładamy projekt na fazy MVP → V1 → V2. Robimy to, co najważniejsze, resztę dorzucamy w kolejnych iteracjach."]
      ]
    },
    {
      "name": "Technologie i kod",
      "items": [
        ["Czym się zajmujesz?", "Strony (Next.js, WordPress), sklepy (WooCommerce, PrestaShop, custom Next), aplikacje webowe (Spring Boot + React/Next/Angular). Stack dobieram do problemu — nie odwrotnie."],
        ["Czyj jest kod?", "Twój. Od pierwszego commit'a. Bez vendor lock-in'u, bez płatnych licencji ukrytych w stacku. Repo trafia do Ciebie po wdrożeniu."],
        ["Czy mogę edytować stronę samodzielnie?", "Tak — każdy projekt ma CMS (WordPress, Sanity, Strapi) lub panel admina. Po wdrożeniu prowadzę szkolenie + dokumentacja w PDF + video-walkthrough."],
        ["A co z SEO?", "Schema.org, meta, OG tags, sitemap, robots.txt, Lighthouse 95+ — wszystko domyślnie. Plus audyt po wdrożeniu z konkretnymi rekomendacjami."]
      ]
    },
    {
      "name": "Termin",
      "items": [
        ["Ile trwa realizacja?", "Wizytówka: 3–4 tygodnie. Sklep: 6–10 tygodni. Aplikacja: od 12 tygodni. Każdy projekt dostaje dokładny harmonogram tygodniowy z wyceną."],
        ["Co spowalnia projekt?", "Zwykle: brak treści (teksty, zdjęcia, logo), długie cykle akceptacji, zmieniający się zakres. Pomagam tego unikać — checklisty contentu, akceptacje w 48h, zmiany w sprincie."],
        ["Czy mogę zamówić ekspresowo?", "Tak — opcja 'Rush' (+25%) skraca czas o 30–40%. Wymagana dostępność zespołu po stronie klienta i jasny zakres od dnia zero."]
      ]
    },
    {
      "name": "Po wdrożeniu",
      "items": [
        ["Co dostaję po wdrożeniu?", "Działającą stronę/aplikację, repo z kodem, dokumentację, panel CMS/admin, szkolenie + video-walkthrough, certyfikat SSL, monitoring."],
        ["Co z hostingiem?", "Doradzam i konfiguruję: Vercel (Next.js), AWS, OVH, własny VPS — co pasuje do stacku i budżetu. Możesz hostować u siebie albo zlecić mi."],
        ["Co jeśli będę potrzebować zmian po wdrożeniu?", "6 miesięcy bug-fix'ów gratis. Nowe funkcje — wycena per zlecenie albo abonament 'Pro' (10–20h/mies.). Bez zaskoczeń."],
        ["Co jeśli serwer padnie?", "Pakiet 'Pro' obejmuje SLA z czasem reakcji. Bez SLA — odpowiadam w godzinach roboczych w ciągu 24h."]
      ]
    }
  ]
}
```

- [ ] **Step 5: Add `faq.page` block (en.json)** — same structure, English copy:

```json
"page": {
  "hero": {
    "crumb": "FAQ",
    "title": ["Questions ", "I answer most often", "."],
    "intro": "Five categories, a dozen questions. If yours isn't here — write to me, I reply within 24 hours."
  },
  "categories": [
    {
      "name": "Collaboration",
      "items": [
        ["How do we start?", "Fill the brief or book a 30-min consultation (free). I come back with a quote and timeline within 48 hours. Decision is yours — no commitment."],
        ["Do we sign a contract?", "Yes — every project is a B2B contract with a defined scope, milestones, and payment terms. I send the template along with the quote."],
        ["How do we communicate?", "Email + Slack/Teams (your pick). Short daily status, demo on Friday. Bug tracker (Linear/GitHub) — full transparency."],
        ["Can I cancel mid-project?", "Yes. You pay for completed milestones, get full code and docs. No penalties, no hidden clauses."]
      ]
    },
    {
      "name": "Pricing & payments",
      "items": [
        ["How is the price calculated?", "Fixed (set price) or T&M (Time & Materials). Fixed = predictable budget, clear scope. T&M = flexibility when scope changes. The calculator shows base price — final one in the quote."],
        ["When do I pay?", "Standard: 30% at kickoff, 40% on design approval, 30% on deploy. Negotiable. VAT invoice, B2B."],
        ["Are there hidden costs?", "No. Price covers development, design, testing, deploy, docs and 6 months of support. Extra: licenses (e.g. premium fonts), client-side hosting, paid SaaS integrations."],
        ["What if my budget falls short?", "We split into phases: MVP → V1 → V2. Build the must-haves first, layer the rest in iterations."]
      ]
    },
    {
      "name": "Technology & code",
      "items": [
        ["What do you build?", "Sites (Next.js, WordPress), stores (WooCommerce, PrestaShop, custom Next), web apps (Spring Boot + React/Next/Angular). Stack picked for the problem — not the other way."],
        ["Who owns the code?", "You. From the first commit. No vendor lock-in, no paid licenses hidden in the stack. Repo handed over after deploy."],
        ["Can I edit the site myself?", "Yes — every project ships with a CMS (WordPress, Sanity, Strapi) or admin panel. After deploy: training + PDF docs + video walkthrough."],
        ["What about SEO?", "Schema.org, meta, OG tags, sitemap, robots.txt, Lighthouse 95+ — all default. Plus a post-deploy audit with concrete recommendations."]
      ]
    },
    {
      "name": "Timeline",
      "items": [
        ["How long does delivery take?", "Marketing site: 3–4 weeks. Shop: 6–10 weeks. App: from 12 weeks. Each project gets an exact weekly schedule with the quote."],
        ["What slows projects down?", "Usually: missing content (copy, photos, logo), long approval cycles, scope creep. I help avoid these — content checklists, 48h approvals, in-sprint changes."],
        ["Can I rush it?", "Yes — 'Rush' option (+25%) cuts time by 30–40%. Requires client-side availability and clear scope from day zero."]
      ]
    },
    {
      "name": "Post-launch",
      "items": [
        ["What do I get after launch?", "Working site/app, repo with code, docs, CMS/admin panel, training + video walkthrough, SSL certificate, monitoring."],
        ["What about hosting?", "I advise and set up: Vercel (Next.js), AWS, OVH, your own VPS — whatever fits the stack and budget. Host on your own or have me handle it."],
        ["What if I need changes after launch?", "6 months of bug-fixes free. New features — quoted per request or 'Pro' subscription (10–20h/mo). No surprises."],
        ["What if the server goes down?", "'Pro' package includes SLA with response times. Without SLA — I reply during business hours within 24h."]
      ]
    }
  ]
}
```

- [ ] **Step 6: Verify JSON validity**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/pl.json'))" && node -e "JSON.parse(require('fs').readFileSync('messages/en.json'))"`
Expected: no output (success).

- [ ] **Step 7: Commit**

```bash
git add messages/pl.json messages/en.json
git commit -m "feat(i18n): copy for /process and /faq subpages + section CTAs"
```

### Task B2: Add CTA pill to home Process and Faq sections

**Files:**
- Modify: `components/sections/redesign/Process.tsx`
- Modify: `components/sections/redesign/Faq.tsx`

- [ ] **Step 1: Update `Process.tsx` — pass `cta` to `SectionHead`**

Replace `components/sections/redesign/Process.tsx` SectionHead block (lines 14-23) with:

```tsx
<SectionHead
  kicker={t("kicker")}
  title={
    <>
      {titleParts[0]}
      <ItalicAccent>{titleParts[1]}</ItalicAccent>
      {titleParts[2]}
    </>
  }
  cta={{ href: "/process", label: t("cta") }}
/>
```

- [ ] **Step 2: Update `Faq.tsx` — pass `cta` to `SectionHead`**

Replace `components/sections/redesign/Faq.tsx` SectionHead block (lines 17-26) with:

```tsx
<SectionHead
  kicker={t("kicker")}
  title={
    <>
      {titleParts[0]}
      <ItalicAccent>{titleParts[1]}</ItalicAccent>
      {titleParts[2]}
    </>
  }
  cta={{ href: "/faq", label: t("cta") }}
/>
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/sections/redesign/Process.tsx components/sections/redesign/Faq.tsx
git commit -m "feat(home): subtle SEO link from Process/Faq sections to subpages"
```

### Task B3: Create ProcessHero component

**Files:**
- Create: `components/sections/process/ProcessHero.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export function ProcessHero() {
  const t = useTranslations("process.page.hero");
  const titleParts = t.raw("title") as [string, string, string];

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 pt-8 pb-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>{t("crumb")}</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[20ch]">
        {titleParts[0]}<ItalicAccent>{titleParts[1]}</ItalicAccent>{titleParts[2]}
      </h1>
      <p className="text-[19px] text-fg-muted max-w-[60ch] leading-[1.55] m-0">
        {t("intro")}
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/sections/process/ProcessHero.tsx
git commit -m "feat(process): hero component for /process page"
```

### Task B4: Create ProcessExtended component

**Files:**
- Create: `components/sections/process/ProcessExtended.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useTranslations } from "next-intl";
import { SectionHead } from "@/components/sections/redesign/SectionHead";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export function ProcessExtended() {
  const tExt = useTranslations("process.page");
  const tPhi = useTranslations("process.page.philosophy");
  const steps = tExt.raw("extended") as Array<[string, string]>;
  const phiTitle = tPhi.raw("title") as [string, string, string];
  const phiItems = tPhi.raw("items") as Array<[string, string]>;

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {steps.map(([title, desc], i) => (
            <article
              key={i}
              className="bg-bg-card text-fg rounded-[24px] p-7 lg:p-9 flex gap-6 items-start"
            >
              <div className="font-mono text-[12px] w-10 h-10 rounded-full grid place-items-center bg-accent text-accent-fg shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-[22px] m-0 mb-3 font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="text-[15px] leading-[1.6] text-fg-muted m-0">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20">
        <SectionHead
          kicker={tPhi("kicker")}
          title={
            <>
              {phiTitle[0]}
              <ItalicAccent>{phiTitle[1]}</ItalicAccent>
              {phiTitle[2]}
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phiItems.map(([title, desc], i) => (
            <div key={i} className="bg-bg-card rounded-[24px] p-7 flex flex-col">
              <h4 className="text-[20px] font-semibold mt-0 mb-3 tracking-[-0.01em] text-accent">{title}</h4>
              <p className="text-[15px] leading-[1.55] text-fg-muted m-0">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/sections/process/ProcessExtended.tsx
git commit -m "feat(process): extended steps + philosophy sections"
```

### Task B5: Create /process page

**Files:**
- Create: `app/[locale]/process/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { Metadata } from "next";
import { ProcessHero } from "@/components/sections/process/ProcessHero";
import { ProcessExtended } from "@/components/sections/process/ProcessExtended";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Proces współpracy",
  description: "Jak wygląda współpraca krok po kroku — od pierwszej konsultacji po wsparcie po wdrożeniu. Siedem etapów, demo co tydzień, jeden kontakt.",
};

export const dynamic = "force-static";

function ProcessCta() {
  const t = useTranslations("cta");
  return (
    <CtaCard
      heading={
        <>
          Krok pierwszy: <ItalicAccent>30 minut konsultacji</ItalicAccent>.
        </>
      }
      sub={t("p")}
      primaryHref="/contact"
      primaryLabel={t("primary")}
    />
  );
}

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <ProcessExtended />
      <ProcessCta />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Manual smoke test (dev server)**

Run: `npm run dev` (in another terminal). Visit `http://localhost:3000/pl/process`.
Expected: Page renders with hero, 7 step cards, philosophy section, CTA.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/process/page.tsx
git commit -m "feat(process): /process subpage extending home process section"
```

### Task B6: Create FaqHero and FaqCategories components + /faq page

**Files:**
- Create: `components/sections/faq/FaqHero.tsx`
- Create: `components/sections/faq/FaqCategories.tsx`
- Create: `app/[locale]/faq/page.tsx`

- [ ] **Step 1: Create `components/sections/faq/FaqHero.tsx`**

```tsx
"use client";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export function FaqHero() {
  const t = useTranslations("faq.page.hero");
  const titleParts = t.raw("title") as [string, string, string];

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 pt-8 pb-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>{t("crumb")}</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
        {titleParts[0]}<ItalicAccent>{titleParts[1]}</ItalicAccent>{titleParts[2]}
      </h1>
      <p className="text-[19px] text-fg-muted max-w-[60ch] leading-[1.55] m-0">
        {t("intro")}
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/faq/FaqCategories.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Category {
  name: string;
  items: Array<[string, string]>;
}

export function FaqCategories() {
  const t = useTranslations("faq.page");
  const categories = t.raw("categories") as Category[];
  const [openMap, setOpenMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    categories.forEach((c) => { init[c.name] = -1; });
    return init;
  });

  const toggle = (catName: string, idx: number) => {
    setOpenMap((prev) => ({ ...prev, [catName]: prev[catName] === idx ? -1 : idx }));
  };

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-12 flex flex-col gap-12">
      {categories.map((cat) => (
        <div key={cat.name}>
          <h2 className="font-display italic text-[36px] tracking-[-0.02em] text-accent m-0 mb-6">
            {cat.name}
          </h2>
          <div className="flex flex-col gap-2">
            {cat.items.map(([q, a], i) => {
              const isOpen = openMap[cat.name] === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(cat.name, i)}
                  className={`text-left rounded-[18px] py-6 px-7 cursor-pointer transition-colors ${
                    isOpen ? "bg-accent text-accent-fg" : "bg-bg-card text-fg"
                  }`}
                >
                  <div className="flex justify-between items-center gap-6">
                    <h4 className="text-[18px] font-medium m-0 tracking-[-0.01em]">{q}</h4>
                    <span
                      className={`text-[24px] transition-transform ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-[max-height,margin-top] duration-300 ${
                      isOpen ? "max-h-96 mt-3.5" : "max-h-0 mt-0"
                    }`}
                  >
                    <p className="text-[14px] leading-[1.65] opacity-85 m-0">{a}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 3: Create `app/[locale]/faq/page.tsx`**

```tsx
import type { Metadata } from "next";
import { FaqHero } from "@/components/sections/faq/FaqHero";
import { FaqCategories } from "@/components/sections/faq/FaqCategories";
import { CtaCard } from "@/components/sections/redesign/CtaCard";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "FAQ — Pytania i odpowiedzi",
  description: "Najczęściej zadawane pytania o współpracę, cennik, technologie, terminy i wsparcie po wdrożeniu.",
};

export const dynamic = "force-static";

function FaqCta() {
  const t = useTranslations("cta");
  return (
    <CtaCard
      heading={
        <>
          Twojego pytania tu nie ma? <ItalicAccent>Napisz</ItalicAccent>.
        </>
      }
      sub={t("p")}
      primaryHref="/contact"
      primaryLabel={t("primary")}
      secondaryHref="mailto:hello@itsolutions.com"
      secondaryLabel="hello@itsolutions.com"
    />
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqCategories />
      <FaqCta />
    </>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Manual smoke test**

Visit `http://localhost:3000/pl/faq`. Expected: Hero + 5 category sections each with collapsible items + CTA card.

- [ ] **Step 6: Commit**

```bash
git add components/sections/faq/FaqHero.tsx components/sections/faq/FaqCategories.tsx app/[locale]/faq/page.tsx
git commit -m "feat(faq): /faq subpage with 5-category grouped Q&A"
```

### Task B7: Update Navbar to link to /process and /faq

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Replace anchor-based items with full-page links**

Edit `components/layout/Navbar.tsx`:

Replace lines 9-19 with:

```tsx
const NAV_ITEMS: Array<{ href: string; key: "services" | "showcase" | "process" | "faq" | "contact"; }> = [
  { href: "/services", key: "services" },
  { href: "/showcase", key: "showcase" },
  { href: "/process",  key: "process" },
  { href: "/faq",      key: "faq" },
  { href: "/contact",  key: "contact" },
];
```

(Note: `ANCHOR_ITEMS` and `goToAnchor` are now unused — see next step.)

- [ ] **Step 2: Remove unused `ANCHOR_ITEMS`, `goToAnchor`, and their usages**

In `Navbar.tsx`:
- Delete the `ANCHOR_ITEMS` constant (was lines 16-19).
- Delete the `goToAnchor` function definition (was lines 36-48).
- In the desktop nav block (was around lines 65-69), delete the `ANCHOR_ITEMS.map(...)` block — it's redundant now.
- In the mobile sheet block (was around lines 141-151), delete the `ANCHOR_ITEMS.map(...)` block.

Final desktop nav block:

```tsx
<nav className="hidden md:flex gap-7 ml-auto text-[14px] font-medium" aria-label={t("menu")}>
  {NAV_ITEMS.map((item) => (
    <Link key={item.key} href={item.href} className="text-fg opacity-70 hover:opacity-100 transition-opacity no-underline">
      {t(item.key)}
    </Link>
  ))}
</nav>
```

Final mobile list block:

```tsx
<ul className="flex flex-col">
  {NAV_ITEMS.map((item) => (
    <li key={item.key}>
      <Link
        href={item.href}
        className="block py-4 text-[30px] font-semibold tracking-[-0.03em] text-fg no-underline border-b border-line"
        onClick={() => setMobileOpen(false)}
      >
        {t(item.key)}
      </Link>
    </li>
  ))}
</ul>
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Manual smoke test**

Visit `/pl`. Click nav items "Proces" and "FAQ" — expected: navigates to `/pl/process` and `/pl/faq`. Resize to mobile, repeat.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat(nav): process/faq become full pages, drop anchor scroll"
```

### Task B8: Add /process and /faq to sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Add new entries**

Replace the `pages` array in `app/sitemap.ts` with:

```tsx
const pages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/process', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
]
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): add /process and /faq to sitemap"
```

### Task B9: Phase B tests

**Files:**
- Create: `tests/redesign/process-page.spec.ts`
- Create: `tests/redesign/faq-page.spec.ts`
- Create: `tests/redesign/home-section-cta.spec.ts`

- [ ] **Step 1: Create `tests/redesign/process-page.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test.describe("/process subpage", () => {
  test("loads with hero + 7 step cards + philosophy + cta", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/process", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible({ timeout: 15_000 });
    await expect(h1).toContainText(/proces|kroków/i);
    // Extended steps — 7 articles
    await expect(page.locator("article").filter({ hasText: /Konsultacja|Wycena|UX|Develop|Test|Wdroż|Wsparcie/ })).toHaveCount(7);
    // CTA card at bottom links to /contact
    await expect(page.locator('a[href="/pl/contact"]')).toBeVisible();
  });

  test("breadcrumb has Start link to home", async ({ page }) => {
    await page.goto("/pl/process", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href="/pl"]').first()).toBeVisible();
  });
});
```

- [ ] **Step 2: Create `tests/redesign/faq-page.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test.describe("/faq subpage", () => {
  test("loads with hero + 5 categories + cta", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/faq", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible({ timeout: 15_000 });
    // 5 category h2 headings
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(5, { timeout: 10_000 });
    // Each category has at least 3 collapsible Q buttons
    const buttons = page.locator('button[aria-expanded]');
    expect(await buttons.count()).toBeGreaterThanOrEqual(15);
  });

  test("Q&A button toggles aria-expanded", async ({ page }) => {
    await page.goto("/pl/faq", { waitUntil: "domcontentloaded" });
    const firstBtn = page.locator('button[aria-expanded]').first();
    await expect(firstBtn).toHaveAttribute("aria-expanded", "false");
    await firstBtn.click();
    await expect(firstBtn).toHaveAttribute("aria-expanded", "true");
  });
});
```

- [ ] **Step 3: Create `tests/redesign/home-section-cta.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test.describe("home section CTAs to subpages", () => {
  test("Process section has link to /process", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const processSection = page.locator("#process");
    await expect(processSection).toBeVisible({ timeout: 15_000 });
    await expect(processSection.locator('a[href="/pl/process"]')).toBeVisible();
  });

  test("Faq section has link to /faq", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl", { waitUntil: "domcontentloaded", timeout: 30_000 });
    const faqSection = page.locator("#faq");
    await expect(faqSection).toBeVisible({ timeout: 15_000 });
    await expect(faqSection.locator('a[href="/pl/faq"]')).toBeVisible();
  });
});
```

- [ ] **Step 4: Run Phase B tests**

Run: `npx playwright test tests/redesign/process-page.spec.ts tests/redesign/faq-page.spec.ts tests/redesign/home-section-cta.spec.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add tests/redesign/process-page.spec.ts tests/redesign/faq-page.spec.ts tests/redesign/home-section-cta.spec.ts
git commit -m "test(subpages): cover /process, /faq and home section CTAs"
```

---

# Phase C — Calculator Business Reframe

### Task C1: Add INDUSTRIES, AUDIENCES, PROJECT_STAGES enums

**Files:**
- Modify: `lib/design/project-kinds.ts`

- [ ] **Step 1: Append new business-context enums to `project-kinds.ts`**

Add after the existing `TIMELINES` line (end of file):

```ts
// --- BUSINESS CONTEXT (zero-cost, informational) ---
export const INDUSTRIES = [
  "services", "ecommerce", "food", "education", "health", "realestate",
  "sport", "travel", "saas", "creative", "nonprofit", "other",
] as const;
export type Industry = typeof INDUSTRIES[number];

export const AUDIENCES = ["b2c", "b2b", "b2b2c", "internal"] as const;
export type Audience = typeof AUDIENCES[number];

export const PROJECT_STAGES = ["new", "redesign", "continuation"] as const;
export type ProjectStage = typeof PROJECT_STAGES[number];
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add lib/design/project-kinds.ts
git commit -m "feat(calc): add Industry, Audience, ProjectStage enums (business context)"
```

### Task C2: Extend `SharedFields` and `AdvancedQuoteInput` with business fields

**Files:**
- Modify: `lib/design/calculator.ts`

- [ ] **Step 1: Update imports**

In `lib/design/calculator.ts`, replace the import block (lines 1-7) with:

```ts
import {
  type ProjectKind, type SiteGoal, type SiteIntegration,
  type ShopPlatform, type CatalogSize, type PaymentGateway, type ShopIntegration, type ErpOption,
  type AppType, type AppAuth, type AppBackend, type AppStorage, type AppIntegration,
  type DesignTier, type SupportTier, type Hosting, type Timeline,
  type Industry, type Audience, type ProjectStage,
} from "./project-kinds";

export type {
  ProjectKind, SiteGoal, SiteIntegration,
  ShopPlatform, CatalogSize, PaymentGateway, ShopIntegration, ErpOption,
  AppType, AppAuth, AppBackend, AppStorage, AppIntegration,
  DesignTier, SupportTier, Hosting, Timeline,
  Industry, Audience, ProjectStage,
};
```

- [ ] **Step 2: Extend `SharedFields` interface**

Replace the `SharedFields` interface (lines 100-106) with:

```ts
interface SharedFields {
  designTier: DesignTier;
  languages: number;
  hosting: Hosting;
  supportTier: SupportTier;
  timeline: Timeline;
  // Business context — zero-cost, used to populate brief / drive consultation
  industry: Industry;
  audience: Audience;
  stage: ProjectStage;
}
```

(Note: `computeAdvancedQuote` does NOT read these — pricing is unchanged.)

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: ERRORS in `pricing-presets.ts` and `AdvancedCalculator.tsx` (missing fields). This is expected — fixed in next tasks.

- [ ] **Step 4: Commit**

```bash
git add lib/design/calculator.ts
git commit -m "feat(calc): extend SharedFields with industry/audience/stage (zero cost)"
```

### Task C3: Update presets with default business fields

**Files:**
- Modify: `lib/design/pricing-presets.ts`

- [ ] **Step 1: Replace `pricing-presets.ts` content**

```ts
import type { AdvancedQuoteInput } from "./calculator";

export type PresetKey = "landing" | "company" | "ecom";

export interface Preset {
  key: PresetKey;
  input: AdvancedQuoteInput;
  badge?: "popular";
}

const SHARED_BUSINESS = {
  industry: "services" as const,
  audience: "b2b" as const,
  stage: "new" as const,
};

export const PRESETS: Preset[] = [
  {
    key: "landing",
    input: {
      kind: "site",
      designTier: "standard", languages: 1, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      ...SHARED_BUSINESS, audience: "b2c",
      site: {
        goal: "landing",
        pages: 4,
        cms: false,
        siteIntegrations: ["analytics"],
      },
    },
  },
  {
    key: "company",
    input: {
      kind: "site",
      designTier: "standard", languages: 2, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      ...SHARED_BUSINESS,
      site: {
        goal: "company",
        pages: 10,
        cms: true,
        siteIntegrations: ["analytics", "newsletter", "form"],
      },
    },
    badge: "popular",
  },
  {
    key: "ecom",
    input: {
      kind: "shop",
      designTier: "premium", languages: 1, hosting: "vercel",
      supportTier: "basic", timeline: "normal",
      ...SHARED_BUSINESS, industry: "ecommerce", audience: "b2c",
      shop: {
        platform: "woo",
        catalogSize: "md",
        contentPages: 6,
        paymentGateways: ["blik", "p24"],
        shopIntegrations: ["courier", "newsletter"],
        erp: "none",
      },
    },
  },
];
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: ERRORS only in `AdvancedCalculator.tsx` (`emptyInput` missing fields) and possibly `PricingPageClient.tsx` (`useEffect` defaults). Expected — fixed next.

- [ ] **Step 3: Commit**

```bash
git add lib/design/pricing-presets.ts
git commit -m "feat(calc): preset defaults for industry/audience/stage"
```

### Task C4: Patch `PricingPageClient.tsx` `useEffect` defaults

**Files:**
- Modify: `components/sections/pricing/PricingPageClient.tsx`

- [ ] **Step 1: Update `useEffect` shared spread (around lines 38-46)**

Replace the `setInput((prev) => { ... })` block with:

```tsx
setInput((prev) => {
  if (prev.kind === kindParam) return prev;
  const shared = {
    designTier: prev.designTier, languages: prev.languages,
    hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline,
    industry: prev.industry, audience: prev.audience, stage: prev.stage,
  };
  if (kindParam === "site") return { kind: "site", ...shared, site: { goal: "company", pages: 6, cms: true, siteIntegrations: ["analytics"] } };
  if (kindParam === "shop") return { kind: "shop", ...shared, shop: { platform: "woo", catalogSize: "md", contentPages: 5, paymentGateways: ["blik", "p24"], shopIntegrations: ["courier"], erp: "none" } };
  return { kind: "app", ...shared, app: { appType: "saas", auth: "email", backend: "spring", roles: 2, appIntegrations: ["payments"], storage: "postgres", mobile: false } };
});
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: only `AdvancedCalculator.tsx` errors remain.

- [ ] **Step 3: Commit**

```bash
git add components/sections/pricing/PricingPageClient.tsx
git commit -m "fix(pricing): preserve business context fields when switching kind"
```

### Task C5: Refactor `AdvancedCalculator.tsx` — business knobs + tech preferences panel

**Files:**
- Modify: `components/sections/pricing/AdvancedCalculator.tsx`

This is the largest task. The component is currently flat — we add 3 new business knobs at the top, hide tech knobs (`shopPlatform`, `appBackend`, `appStorage`, `hosting`) inside a collapsible `TechPreferencesPanel` at the bottom, and patch `emptyInput`.

- [ ] **Step 1: Update import block (lines 1-11)**

Replace with:

```tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  type AdvancedQuoteInput, type ProjectKind, type SiteFields, type ShopFields, type AppFields,
} from "@/lib/design/calculator";
import {
  PROJECT_KINDS, SITE_GOALS, SITE_INTEGRATIONS,
  SHOP_PLATFORMS, CATALOG_SIZES, PAYMENT_GATEWAYS, SHOP_INTEGRATIONS, ERP_OPTIONS,
  APP_TYPES, APP_AUTH, APP_BACKENDS, APP_STORAGE, APP_INTEGRATIONS,
  DESIGN_TIERS, SUPPORT_TIERS, HOSTINGS, TIMELINES,
  INDUSTRIES, AUDIENCES, PROJECT_STAGES,
} from "@/lib/design/project-kinds";
```

- [ ] **Step 2: Patch `emptyInput` to include business defaults**

Replace `emptyInput` (around lines 80-92) with:

```tsx
function emptyInput(kind: ProjectKind, prev: AdvancedQuoteInput): AdvancedQuoteInput {
  const shared = {
    designTier: prev.designTier, languages: prev.languages,
    hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline,
    industry: prev.industry, audience: prev.audience, stage: prev.stage,
  };
  if (kind === "site") {
    return { kind: "site", ...shared, site: { goal: "company", pages: 6, cms: true, siteIntegrations: ["analytics"] } };
  }
  if (kind === "shop") {
    return { kind: "shop", ...shared, shop: { platform: "woo", catalogSize: "md", contentPages: 5, paymentGateways: ["blik", "p24"], shopIntegrations: ["courier"], erp: "none" } };
  }
  return { kind: "app", ...shared, app: { appType: "saas", auth: "email", backend: "spring", roles: 2, appIntegrations: ["payments"], storage: "postgres", mobile: false } };
}
```

- [ ] **Step 3: Patch the `setShared` generic to cover new fields**

Replace `setShared` declaration (around lines 26-29) with:

```tsx
const setShared = <K extends "designTier" | "languages" | "hosting" | "supportTier" | "timeline" | "industry" | "audience" | "stage">(
  k: K, v: AdvancedQuoteInput[K]
) => onChange({ ...value, [k]: v });
```

- [ ] **Step 4: Add business knobs to top of main render block + remove tech knobs from kind-specific sections**

Replace the entire `AdvancedCalculator` function body (return JSX) with:

```tsx
  return (
    <div className="bg-bg-card rounded-[24px] p-7 border border-line flex flex-col gap-6">
      {/* === BUSINESS CONTEXT (top) === */}
      <Knob label={t("kind")}>
        <Pills
          options={PROJECT_KINDS}
          value={value.kind}
          onChange={setKind}
          labelFn={(k) => tCalc(`kinds.${k}.short`)}
          cols={3}
        />
        <p className="text-[12px] text-fg-muted mt-1.5 leading-[1.5]">{tCalc(`kinds.${value.kind}.hint`)}</p>
      </Knob>

      <Knob label={t("industry")}>
        <Pills options={INDUSTRIES} value={value.industry} onChange={(v) => setShared("industry", v)} labelFn={(k) => tCalc(`industries.${k}`)} cols={4} />
      </Knob>

      <Knob label={t("audience")}>
        <Pills options={AUDIENCES} value={value.audience} onChange={(v) => setShared("audience", v)} labelFn={(k) => tCalc(`audiences.${k}`)} cols={4} />
      </Knob>

      <Knob label={t("stage")}>
        <Pills options={PROJECT_STAGES} value={value.stage} onChange={(v) => setShared("stage", v)} labelFn={(k) => tCalc(`stages.${k}`)} cols={3} />
      </Knob>

      <hr className="border-t border-line my-1" />

      {/* === KIND-SPECIFIC BUSINESS KNOBS === */}
      {value.kind === "site" && (
        <SiteSection value={value.site} onChange={(site) => onChange({ ...value, site })} />
      )}
      {value.kind === "shop" && (
        <ShopSection value={value.shop} onChange={(shop) => onChange({ ...value, shop })} />
      )}
      {value.kind === "app" && (
        <AppSection value={value.app} onChange={(app) => onChange({ ...value, app })} />
      )}

      <hr className="border-t border-line my-1" />

      {/* === SHARED BUSINESS KNOBS === */}
      <Knob label={t("designTier")}>
        <Pills options={DESIGN_TIERS} value={value.designTier} onChange={(v) => setShared("designTier", v)} labelFn={(k) => t(`tiers.${k}`)} cols={3} />
      </Knob>

      <Knob label={`${t("languages")} — ${value.languages}`}>
        <input type="range" min={1} max={5} value={value.languages} onChange={(e) => setShared("languages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>

      <Knob label={t("support")}>
        <Pills options={SUPPORT_TIERS} value={value.supportTier} onChange={(v) => setShared("supportTier", v)} labelFn={(k) => t(`supports.${k}`)} cols={3} />
      </Knob>

      <Knob label={t("timeline")}>
        <Pills options={TIMELINES} value={value.timeline} onChange={(v) => setShared("timeline", v)} labelFn={(k) => t(`timelines.${k}`)} cols={2} />
      </Knob>

      {/* === TECHNICAL PREFERENCES (collapsible) === */}
      <TechPreferencesPanel value={value} onChange={onChange} />
    </div>
  );
}
```

- [ ] **Step 5: Patch `SiteSection` — no tech knobs to remove (site has none); leave as-is**

Site section in current file already only has `siteGoal`, `pages`, `cms`, `siteIntegrations` — all business. Skip.

- [ ] **Step 6: Patch `ShopSection` — remove `shopPlatform` Knob (moved to TechPreferencesPanel)**

Replace `ShopSection`'s return JSX (around lines 130-152) with:

```tsx
  return (
    <>
      <Knob label={t("catalogSize")}>
        <Pills options={CATALOG_SIZES} value={value.catalogSize} onChange={(v) => set("catalogSize", v)} labelFn={(k) => tCalc(`catalogSizes.${k}`)} cols={4} />
      </Knob>
      <Knob label={`${t("contentPages")} — ${value.contentPages}`}>
        <input type="range" min={1} max={20} value={value.contentPages} onChange={(e) => set("contentPages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("payments")}>
        <ChipGrid options={PAYMENT_GATEWAYS} active={value.paymentGateways} onToggle={toggleGateway} labelFn={(k) => tCalc(`paymentGateways.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("shopIntegrations")}>
        <ChipGrid options={SHOP_INTEGRATIONS} active={value.shopIntegrations} onToggle={toggleIntegr} labelFn={(k) => t(`shopIntegr.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("erp")}>
        <Pills options={ERP_OPTIONS} value={value.erp} onChange={(v) => set("erp", v)} labelFn={(k) => tCalc(`erp.${k}`)} cols={5} />
      </Knob>
    </>
  );
}
```

- [ ] **Step 7: Patch `AppSection` — remove `appBackend` and `appStorage` Knobs**

Replace `AppSection`'s return JSX (around lines 162-187) with:

```tsx
  return (
    <>
      <Knob label={t("appType")}>
        <Pills options={APP_TYPES} value={value.appType} onChange={(v) => set("appType", v)} labelFn={(k) => tCalc(`appTypes.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("appAuth")}>
        <Pills options={APP_AUTH} value={value.auth} onChange={(v) => set("auth", v)} labelFn={(k) => tCalc(`appAuth.${k}`)} cols={4} />
      </Knob>
      <Knob label={`${t("appRoles")} — ${value.roles}`}>
        <input type="range" min={1} max={6} value={value.roles} onChange={(e) => set("roles", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("appIntegrations")}>
        <ChipGrid options={APP_INTEGRATIONS} active={value.appIntegrations} onToggle={toggleIntegr} labelFn={(k) => t(`appIntegr.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("appMobile")}>
        <Toggle on={value.mobile} onToggle={() => set("mobile", !value.mobile)} />
      </Knob>
    </>
  );
}
```

- [ ] **Step 8: Add `TechPreferencesPanel` component — append before the `// ---------- atoms ----------` comment**

Insert this new function before the line `// ---------- atoms ----------`:

```tsx
// ---------- tech preferences (collapsible) ----------

function TechPreferencesPanel({ value, onChange }: { value: AdvancedQuoteInput; onChange: (v: AdvancedQuoteInput) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const [open, setOpen] = useState(false);

  const setShared = <K extends "hosting">(k: K, v: AdvancedQuoteInput[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <div className="border border-line rounded-[16px] overflow-hidden" data-testid="tech-prefs-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-transparent hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("techPreferences")}</span>
          <span className="text-[12px] text-fg-muted opacity-70 mt-0.5">{t("techPreferencesHint")}</span>
        </div>
        <span className={`text-[20px] transition-transform ${open ? "rotate-45" : ""}`} aria-hidden>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 flex flex-col gap-5 border-t border-line">
          {value.kind === "shop" && (
            <Knob label={t("shopPlatform")}>
              <Pills options={SHOP_PLATFORMS} value={value.shop.platform} onChange={(v) => onChange({ ...value, shop: { ...value.shop, platform: v } })} labelFn={(k) => tCalc(`shopPlatforms.${k}`)} cols={4} />
            </Knob>
          )}
          {value.kind === "app" && (
            <>
              <Knob label={t("appBackend")}>
                <Pills options={APP_BACKENDS} value={value.app.backend} onChange={(v) => onChange({ ...value, app: { ...value.app, backend: v } })} labelFn={(k) => tCalc(`appBackends.${k}`)} cols={4} />
              </Knob>
              <Knob label={t("appStorage")}>
                <Pills options={APP_STORAGE} value={value.app.storage} onChange={(v) => onChange({ ...value, app: { ...value.app, storage: v } })} labelFn={(k) => tCalc(`appStorage.${k}`)} cols={5} />
              </Knob>
            </>
          )}
          <Knob label={t("hosting")}>
            <Pills options={HOSTINGS} value={value.hosting} onChange={(v) => setShared("hosting", v)} labelFn={(k) => t(`hostings.${k}`)} cols={3} />
          </Knob>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 9: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 10: Manual smoke test**

Visit `/pl/pricing`. Expected:
- Top: kind / industry / audience / stage knobs (4 new business pills)
- Middle: kind-specific business knobs (site goal, pages, etc. — no shop platform, no backend, no storage)
- Bottom: design / languages / support / timeline
- Last item: collapsed "Preferowane technologie (opcjonalnie)" panel — click it to expand and see hosting + (kind-specific tech knob)
- Total price unchanged from before

- [ ] **Step 11: Commit**

```bash
git add components/sections/pricing/AdvancedCalculator.tsx
git commit -m "feat(calc): business knobs first, tech preferences in collapsible panel"
```

### Task C6: i18n — business labels and relabels

**Files:**
- Modify: `messages/pl.json`
- Modify: `messages/en.json`

- [ ] **Step 1: Add `industries`, `audiences`, `stages` to `calculator` block (pl.json)**

Inside the `calculator` object (around line 2325-2413), append (before the closing `}` of `calculator`):

```json
"industry": "Branża",
"audience": "Odbiorcy",
"stage": "Etap projektu",
"industries": {
  "services":   "Usługi profesjonalne",
  "ecommerce":  "E-commerce",
  "food":       "Gastronomia",
  "education":  "Edukacja",
  "health":     "Zdrowie & uroda",
  "realestate": "Nieruchomości",
  "sport":      "Sport & fitness",
  "travel":     "Turystyka",
  "saas":       "Software / SaaS",
  "creative":   "Kreatywne",
  "nonprofit":  "Non-profit",
  "other":      "Inne"
},
"audiences": {
  "b2c":      "Klienci końcowi (B2C)",
  "b2b":      "Firmy (B2B)",
  "b2b2c":    "B2B2C",
  "internal": "Zespół wewnętrzny"
},
"stages": {
  "new":          "Nowy projekt",
  "redesign":     "Redesign istniejącego",
  "continuation": "Kontynuacja prac"
}
```

(Insert these as siblings of `kinds`, `siteGoals`, etc. — i.e., directly inside `calculator`.)

- [ ] **Step 2: Add same keys to en.json (English copy)**

```json
"industry": "Industry",
"audience": "Audience",
"stage": "Project stage",
"industries": {
  "services":   "Professional services",
  "ecommerce":  "E-commerce",
  "food":       "Food & restaurants",
  "education":  "Education",
  "health":     "Health & beauty",
  "realestate": "Real estate",
  "sport":      "Sport & fitness",
  "travel":     "Travel & hotels",
  "saas":       "Software / SaaS",
  "creative":   "Creative",
  "nonprofit":  "Non-profit",
  "other":      "Other"
},
"audiences": {
  "b2c":      "End customers (B2C)",
  "b2b":      "Businesses (B2B)",
  "b2b2c":    "B2B2C",
  "internal": "Internal team"
},
"stages": {
  "new":          "New project",
  "redesign":     "Redesign of existing",
  "continuation": "Continuation"
}
```

- [ ] **Step 3: Add `industry`, `audience`, `stage`, `techPreferences`, `techPreferencesHint` to `pricing.knobs` (pl.json)**

Inside `pricing.knobs` (around line 2427), add these keys as siblings of existing knob labels:

```json
"industry": "Branża / sektor",
"audience": "Grupa docelowa",
"stage": "Etap projektu",
"techPreferences": "Preferowane technologie (opcjonalnie)",
"techPreferencesHint": "Te wybory omówimy na konsultacji. Pomijaj, jeśli nie masz preferencji."
```

- [ ] **Step 4: Same for en.json**

```json
"industry": "Industry / sector",
"audience": "Target audience",
"stage": "Project stage",
"techPreferences": "Preferred technologies (optional)",
"techPreferencesHint": "We discuss these at the consultation. Skip if you have no preferences."
```

- [ ] **Step 5: Relabel selected existing knobs to business-friendlier wording (pl.json)**

In `pricing.knobs` block, change these values:
- `"cms": "Edycja przez CMS"` → `"cms": "Samodzielna edycja treści"`
- `"catalogSize": "Wielkość katalogu"` → `"catalogSize": "Liczba produktów"`
- `"payments": "Bramki płatności"` → `"payments": "Metody płatności online"`
- `"appAuth": "Logowanie / role"` → `"appAuth": "Konta użytkowników"`
- `"appRoles": "Liczba ról"` → `"appRoles": "Liczba ról użytkowników"`
- `"erp": "Integracja z ERP"` → keep
- `"siteGoal": "Cel strony"` → keep
- `"appType": "Rodzaj aplikacji"` → keep

Also relabel `calculator.appAuth` options for clearer business meaning (pl.json, around line 2394):

```json
"appAuth": {
  "none":  "Bez logowania",
  "email": "Konto z hasłem",
  "oauth": "Logowanie przez Google / Microsoft",
  "sso":   "SSO firmowe + role"
}
```

- [ ] **Step 6: Same relabels for en.json**

In `pricing.knobs`:
- `"cms": "CMS editing"` → `"cms": "Self-edit content"`
- `"catalogSize": "Catalog size"` → `"catalogSize": "Number of products"`
- `"payments": "Payment gateways"` → `"payments": "Online payment methods"`
- `"appAuth": "Login / roles"` → `"appAuth": "User accounts"`
- `"appRoles": "Number of roles"` → `"appRoles": "Number of user roles"`

In `calculator.appAuth`:

```json
"appAuth": {
  "none":  "No login",
  "email": "Account with password",
  "oauth": "Login via Google / Microsoft",
  "sso":   "Corporate SSO + roles"
}
```

- [ ] **Step 7: Verify JSON validity**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/pl.json'))" && node -e "JSON.parse(require('fs').readFileSync('messages/en.json'))"`
Expected: no output.

- [ ] **Step 8: Commit**

```bash
git add messages/pl.json messages/en.json
git commit -m "feat(i18n): business-friendly knob labels + industry/audience/stage copy"
```

### Task C7: Update `calculator-kind.spec.ts` baselines with business fields

**Files:**
- Modify: `tests/redesign/calculator-kind.spec.ts`

- [ ] **Step 1: Patch the three baseline objects**

In `tests/redesign/calculator-kind.spec.ts`, add `industry`, `audience`, `stage` to each baseline. Replace `SITE_BASELINE`, `SHOP_BASELINE`, `APP_BASELINE`:

```ts
const SITE_BASELINE: AdvancedQuoteInput = {
  kind: "site",
  designTier: "standard", languages: 1, hosting: "client",
  supportTier: "basic", timeline: "normal",
  industry: "services", audience: "b2b", stage: "new",
  site: {
    goal: "company",
    pages: 8,
    cms: true,
    siteIntegrations: [],
  },
};

const SHOP_BASELINE: AdvancedQuoteInput = {
  kind: "shop",
  designTier: "standard", languages: 1, hosting: "client",
  supportTier: "basic", timeline: "normal",
  industry: "ecommerce", audience: "b2c", stage: "new",
  shop: {
    platform: "woo",
    catalogSize: "md",
    contentPages: 6,
    paymentGateways: [],
    shopIntegrations: [],
    erp: "none",
  },
};

const APP_BASELINE: AdvancedQuoteInput = {
  kind: "app",
  designTier: "standard", languages: 1, hosting: "client",
  supportTier: "basic", timeline: "normal",
  industry: "saas", audience: "b2b", stage: "new",
  app: {
    appType: "saas",
    auth: "email",
    backend: "spring",
    roles: 2,
    appIntegrations: [],
    storage: "postgres",
    mobile: false,
  },
};
```

- [ ] **Step 2: Run unit tests**

Run: `npx playwright test tests/redesign/calculator-kind.spec.ts`
Expected: PASS — all numeric assertions still hold (business fields are zero-cost).

- [ ] **Step 3: Commit**

```bash
git add tests/redesign/calculator-kind.spec.ts
git commit -m "test(calc): add business context fields to baselines (zero-cost invariant)"
```

### Task C8: Add `tests/redesign/calculator-business-knobs.spec.ts`

**Files:**
- Create: `tests/redesign/calculator-business-knobs.spec.ts`

- [ ] **Step 1: Create the test file**

```ts
import { test, expect } from "@playwright/test";

test.describe("calculator business reframe", () => {
  test("industry/audience/stage knobs render at top", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/pl/pricing", { waitUntil: "domcontentloaded", timeout: 30_000 });
    await expect(page.getByText(/Branża \/ sektor/i)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Grupa docelowa/i)).toBeVisible();
    await expect(page.getByText(/Etap projektu/i)).toBeVisible();
  });

  test("relabeled business knobs visible (CMS, catalog, payments)", async ({ page }) => {
    await page.goto("/pl/pricing", { waitUntil: "domcontentloaded" });
    // Default preset is 'company' → site → CMS visible
    await expect(page.getByText(/Samodzielna edycja treści/i)).toBeVisible({ timeout: 15_000 });
    // Switch to shop kind to see catalog + payments
    await page.getByRole("button", { name: /^Sklep$/i }).click();
    await expect(page.getByText(/Liczba produktów/i)).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText(/Metody płatności online/i)).toBeVisible();
  });

  test("tech preferences panel collapsed by default", async ({ page }) => {
    await page.goto("/pl/pricing", { waitUntil: "domcontentloaded" });
    const panel = page.getByTestId("tech-prefs-panel");
    await expect(panel).toBeVisible({ timeout: 15_000 });
    const toggle = panel.locator('button[aria-expanded]').first();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    // Hosting label hidden until panel is opened
    await expect(panel.getByText(/^Hosting$/)).toHaveCount(0);
  });

  test("tech preferences panel expands and shows hosting", async ({ page }) => {
    await page.goto("/pl/pricing", { waitUntil: "domcontentloaded" });
    const panel = page.getByTestId("tech-prefs-panel");
    await panel.locator('button[aria-expanded]').first().click();
    await expect(panel.getByText(/^Hosting$/)).toBeVisible({ timeout: 5_000 });
  });

  test("tech preferences shows shopPlatform when kind=shop", async ({ page }) => {
    await page.goto("/pl/pricing?kind=shop", { waitUntil: "domcontentloaded" });
    const panel = page.getByTestId("tech-prefs-panel");
    await panel.locator('button[aria-expanded]').first().click();
    await expect(panel.getByText(/Platforma/i)).toBeVisible({ timeout: 5_000 });
  });

  test("tech preferences shows backend+storage when kind=app", async ({ page }) => {
    await page.goto("/pl/pricing?kind=app", { waitUntil: "domcontentloaded" });
    const panel = page.getByTestId("tech-prefs-panel");
    await panel.locator('button[aria-expanded]').first().click();
    await expect(panel.getByText(/^Backend$/)).toBeVisible({ timeout: 5_000 });
    await expect(panel.getByText(/Storage \/ DB/i)).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npx playwright test tests/redesign/calculator-business-knobs.spec.ts`
Expected: PASS (6 tests).

- [ ] **Step 3: Commit**

```bash
git add tests/redesign/calculator-business-knobs.spec.ts
git commit -m "test(calc): cover business-knobs reframe and tech-prefs collapse"
```

### Task C9: Adapt `pricing-calculator.spec.ts` if it broke

**Files:**
- Modify (if needed): `tests/redesign/pricing-calculator.spec.ts`

- [ ] **Step 1: Run the full suite to check for regressions**

Run: `npx playwright test tests/redesign/pricing-calculator.spec.ts`

- [ ] **Step 2: If failures relate to old labels (e.g., "Wielkość katalogu", "Bramki płatności"), update selectors to new labels**

Use the Read + Edit tools to update affected selectors. Run again until PASS.

- [ ] **Step 3: Commit (only if changes were needed)**

```bash
git add tests/redesign/pricing-calculator.spec.ts
git commit -m "test(pricing): align selectors with business-friendly labels"
```

If no changes were needed, skip this commit.

### Task C10: Final verification — all suites pass

- [ ] **Step 1: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 2: Run full Playwright suite**

Run: `npx playwright test`
Expected: PASS (all suites). If anything fails that's unrelated to this plan (e.g., flaky network), inspect, fix or quarantine.

- [ ] **Step 3: Build the production bundle**

Run: `npm run build`
Expected: succeed.

- [ ] **Step 4: Manual smoke test in dev server**

Run: `npm run dev` and verify the following user flows:
- `/pl` — no portfolio section, Process and FAQ have small CTA pills, nav has Process and FAQ items
- `/pl/process` — full process page renders
- `/pl/faq` — full FAQ page with 5 categories, expand/collapse works
- `/pl/portfolio` — direct URL still works (rendered, but `<meta name="robots" content="noindex">` is present)
- `/pl/pricing` — calculator: top 4 business knobs (kind/industry/audience/stage), kind-specific business knobs in middle, design/languages/support/timeline below, collapsed "Preferowane technologie" panel at the bottom that expands on click

- [ ] **Step 5: Final commit (if anything trivial needed adjustment) — otherwise skip**

---

## Self-Review (run before handoff)

**1. Spec coverage:**
- ✅ Hide portfolio (don't delete) — Phase A: home, navbar, footer, sitemap, noindex meta, components untouched.
- ✅ Subpages /process and /faq with subtle SEO links from home sections — Phase B: SectionHead `cta` plus dedicated full pages.
- ✅ Calculator: business language first, technical as optional collapsed panel — Phase C: 3 new context fields + relabels + `TechPreferencesPanel`.
- ✅ Calculator scoped as "business brief / wytyczne dla wykonawcy" — `industry` + `audience` + `stage` give domain context without affecting price; existing kind/goal/integrations remain.

**2. Placeholder scan:** No "TODO", "TBD", or "similar to Task N" — every step has full code or full file content.

**3. Type consistency:**
- `Industry`, `Audience`, `ProjectStage` declared in `project-kinds.ts` (Task C1) and re-exported by `calculator.ts` (Task C2).
- Method signatures match: `setShared` covers `industry|audience|stage` after Task C5/Step 3.
- `emptyInput` keeps prev business fields (Task C5/Step 2).
- Test baselines updated (Task C7).
- Presets updated (Task C3) and `PricingPageClient.tsx` `useEffect` updated (Task C4) — both before `AdvancedCalculator.tsx` rewrite (Task C5), so build remains valid step-by-step.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-04-30-portfolio-hide-subpages-calc-rework.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
