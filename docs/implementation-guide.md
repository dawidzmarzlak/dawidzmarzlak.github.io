# Przewodnik implementacji opcji kalkulatora

> **Cel:** dla każdej opcji w kalkulatorze (`/pricing`) podać konkretny sposób realizacji — z rozróżnieniem WordPress vs Next.js, opisem typowych trudności i czasu pracy.
>
> **Legenda trudności:** 🟢 Łatwe (plugin + config) · 🟡 Średnie (custom code) · 🟠 Trudne (integracja, edge cases) · 🔴 Złożone (wiele tygodni) · ⛔ Unikać / push back klientowi.

---

## Decyzja: WordPress czy Next.js?

| Kryterium | WordPress | Next.js |
|---|---|---|
| Klient chce sam edytować w GUI | ✅ Natywne | 🟡 Sanity Studio (też GUI, ale CMS osobny) |
| Wymagane integracje z PL ekosystemem (BaseLinker, Subiekt, Allegro, KSeF) | ✅ Mnogość wtyczek WP Desk | 🟠 Custom kod lub headless WC |
| Lighthouse 95+, idealne CWV | 🟡 Możliwe z customem (bez Elementora) | ✅ Domyślnie |
| Animacje premium (Framer/GSAP/WebGL) | 🟠 Custom JS, trudne w Elementorze | ✅ Natywne |
| Wielojęzyczność | ✅ WPML / Polylang | ✅ next-intl |
| Custom logika biznesowa (panel klienta, RBAC) | 🟠 Mocno custom | ✅ Strong |
| Hosting | 30-100 zł/mc shared | Vercel 85 zł lub Hetzner VPS 75 zł |
| Czas wdrożenia (wizytówka 5-15 podstron) | 7-15 dni | 12-25 dni (jeśli custom design) |

**Reguła kciuka:** Dla 60-70% projektów PL freelance — WordPress wygrywa elastycznością integracji i prędkością wdrożenia. Next.js bierz gdy:
- Klient prowadzi SaaS / startup (modern stack to argument sprzedażowy)
- Performance / CWV ważny biznesowo (e-commerce premium fashion, kampanie konwersyjne)
- Wymaga panelu klienta z RBAC (Next.js + Spring Boot)

---

## A. STRONA (kind=site)

### A.1 Cel strony (siteGoal)

| Cel | WP approach | Next.js approach |
|---|---|---|
| **landing** | 1 podstrona, Astra Pro + Elementor, FlyingPress cache | 1 strona statyczna SSG, hero + sekcje, Framer Motion |
| **company** | Astra/Kadence custom + Gutenberg + ACF Pro | Next.js + Sanity / MDX, multi-page |
| **portfolio** | Custom post types (CPT) Portfolio + ACF | MDX files + dynamic routes `/portfolio/[slug]` |
| **blog** | WP natywny (Gutenberg) | Sanity Schema "Post" + ISR (incremental static regen) |
| **showcase** | CPT showcase z field repeater | Plik konfig per showcase (jak w obecnym `lib/showcase/`) |

**Trudności:**
- Portfolio/showcase wymagają decyzji: ile metadanych per project (technologie, klient, branża, link). Lepiej zaprojektować schema na początku niż dorabiać później.
- Blog z kategoriami + tagami + filtrowaniem = większy scope (dodatkowy `+blog-cms` addon).

---

### A.2 CMS (cms: boolean)

**Co to znaczy:** Czy klient sam edytuje treści przez interfejs admin?

| Stack | Approach | Time |
|---|---|---|
| **WP** | Natywny block editor (Gutenberg) + ACF Pro dla zaawansowanych pól (relacje, repeater, conditional logic) | 0h (wbudowane) |
| **Next.js** | Sanity Studio (default), Strapi (self-host), Payload CMS (modern) lub MDX (devops only) | 4-12h setup |

**Sanity Studio — krok po kroku:**
1. `npm create sanity@latest` w monorepo
2. Schemas w TypeScript (`schemaTypes/post.ts`)
3. Sanity Studio embedded w Next.js (`/studio` route)
4. GROQ queries do pobierania treści w `getStaticProps` / Server Components
5. ISR — content publikuje się w 30s bez rebuilda (revalidate webhook)
6. **Free tier:** do 3 użytkowników, 10 000 dokumentów, 100 GB asset bandwidth/mc → wystarcza dla 90% klientów

**Strapi — kiedy:**
- Klient wymaga self-hosted CMS (compliance, dane w PL/EU)
- Strapi v5 na Hetzner VPS (CX22 75 zł/mc) lub Strapi Cloud ($15/mc)
- **Operacyjny overhead:** backup, security patches, SSL — wlicz w utrzymanie

**Trudności:**
- Sanity ma własny query language (GROQ) — krzywa uczenia ~1 dzień
- ISR revalidation: webhook z Sanity → Vercel deploy hook lub `revalidateTag` w App Router. Łatwo zepsuć cache.
- Strapi v4 vs v5: dużo różnic, używaj v5 dla nowych projektów

---

### A.3 Integracje strony (siteIntegrations)

#### `analytics` 🟢 (300 zł)

**Co:** Google Analytics 4 + Google Tag Manager + Consent Mode v2.

**WP approach:**
- Wtyczki: Site Kit by Google (free), CookieYes/Complianz dla Consent Mode v2
- W Customizer / Site Kit dashboard wklejasz ID GA4 i GTM
- Consent Mode v2: w CookieYes włącz tryb "Google Consent Mode v2" — auto-zaczepia eventy

**Next.js approach:**
- `@next/third-parties/google` (oficjalna paczka Next.js dla GA4 + GTM)
- Consent Mode v2: `cookieconsent` npm package + custom hook synchronizujący ze stanem zgody
- `dataLayer.push` w `useEffect` po `acceptCookies()`

**Trudności:**
- Consent Mode v2 wymaga od marca 2024 dla reklam Google Ads — bez tego eventy nie liczą się do remarketingu
- Server-side GTM (GA4 server-side) to osobny temat (+5 000 zł), nie domyślnie

**Czas:** 2-4h

---

#### `newsletter` 🟢 (500 zł)

**Co:** Formularz zapisu do newslettera + integracja z dostawcą.

**Polski rynek 2025:**
- **MailerLite** — kupił FreshMail w 2025, dominujący w PL, free do 1k subs, od 39 zł/mc
- GetResponse — drogi (49-59 zł/mc start), ale ma WP plugin
- Brevo (Sendinblue) — francuski, od 25 zł/mc, polski język w UI
- Klaviyo — e-commerce-first, drogi (od $45/mc), nie polecam dla wizytówek

**WP approach:**
- Wtyczka MailerLite Forms / GetResponse / Brevo (każdy ma WP plugin)
- Shortcode formularza w stronie
- Double opt-in domyślnie włączony (wymóg RODO)

**Next.js approach:**
- React Hook Form + `fetch` do MailerLite API
- POST `/api/subscribe` → MailerLite REST API (`/api/subscribers`)
- Captcha (hCaptcha lub Cloudflare Turnstile) przed wysyłką — anti-spam
- Server Action w App Router działa świetnie

**Trudności:**
- Double opt-in: email z linkiem aktywacyjnym — wymóg RODO. MailerLite robi to automatycznie.
- API rate limits: MailerLite 100 req/min, w 99% wystarcza

**Czas:** 2-3h

---

#### `form` 🟢 (400 zł)

**Co:** Formularz kontaktowy z walidacją, anti-spam, wysyłką emaila.

**WP approach:**
- **Contact Form 7** (free, podstawowy) lub **WPForms / Forminator** (premium)
- reCAPTCHA v3 lub hCaptcha
- SMTP plugin (WP Mail SMTP) bo PHP `mail()` często nie dociera

**Next.js approach:**
- React Hook Form + Zod (walidacja schematy)
- Server Action / `/api/contact` route → wysyłka przez Resend / SendGrid / SES
- Anti-spam: Cloudflare Turnstile (lepsze niż reCAPTCHA, bez Google)

**Trudności:**
- Dostarczalność emaila: bez SPF/DKIM/DMARC trafia do spamu. **Zawsze** używaj transactional email service (Resend od 0 zł/mc do 100 emaili/dzień, SES najtaniej przy skali)
- reCAPTCHA v3 vs hCaptcha vs Turnstile: Turnstile (Cloudflare) najmniej upierdliwy, free tier wystarcza

**Czas:** 3-5h (z setup transactional email)

---

#### `chat` 🟢 (600 zł)

**Co:** Live chat widget na stronie.

**Opcje:**
- **Tidio** (PL firma, free tier, od 99 zł/mc paid) — najpopularniejszy w PL
- **Crisp** (free do 2 operatorów, $25/mc paid) — czysty UX
- **Intercom** ($74/mc) — premium, AI features
- **HubSpot Chat** (free w CRM) — gdy klient ma już HubSpot

**WP:** Wtyczka dostawcy (Tidio/Crisp mają official WP plugins)
**Next.js:** Skrypt `<Script>` w `layout.tsx` z `strategy="lazyOnload"`

**Trudności:**
- Performance: chat widgets dodają 200-500ms do LCP. Używaj `lazyOnload` lub własny intent-based loader (dopiero gdy user przewinie 50% strony)
- Custom AI chat (jak w `lib/chat/`) — to inny segment, niżej

**Czas:** 1-2h

---

#### `map` 🟢 (250 zł)

**Co:** Mapa Google z lokalizacją firmy.

**WP:** Wtyczka Google Maps Easy / WP Google Maps Pro. Lub Gutenberg block z embedem.
**Next.js:** `@react-google-maps/api` lub iframe `<iframe src="https://www.google.com/maps/embed?...">`

**Trudności:**
- Google Maps API od 2018 wymaga billing account z kartą (free $200/mc credit ≈ wystarcza dla małych stron)
- **Tańsza alternatywa:** **OpenStreetMap + Leaflet** — całkowicie free, BBL plugin dla WP lub `react-leaflet` dla Next.js
- Dla wizytówki najczęściej wystarcza iframe — bez API key

**Czas:** 1-2h

---

#### `booking` 🟡 (1 800 zł)

**Co:** System rezerwacji wizyt / terminów.

**WP approach:**
- **Booknetic** ($79 lifetime) — najbogatszy plugin, salons / kliniki / fitness
- **Amelia** (od $59/year) — premium UI, integracja z Zoom
- **WooCommerce Bookings** ($249/year) — gdy klient już ma Woo

**Next.js approach:**
- **Cal.com** (open source, embeddable) — najprostsze
- **Calendly embed** — szybkie, ale wymaga konta Calendly
- Custom: Next.js + Prisma + FullCalendar.js + cron joby — 20-40h pracy

**Trudności:**
- Strefy czasowe — koszmar. Zawsze testuj z klientem w innej TZ.
- Płatność przed rezerwacją: Booknetic ma Stripe/PayU, ale konfiguracja 2-3h
- Powiadomienia email + SMS — wymaga SMS provider (Twilio, SMSAPI)
- Sync z Google Calendar / Outlook — Cal.com to robi, Booknetic premium tier

**Czas:** 6-12h dla gotowego pluginu, 30-60h custom

---

#### `wcag-aa` 🟠 (2 500 zł)

**Co:** Zgodność z WCAG 2.1 poziom AA — wymagana dla sektora publicznego, coraz częściej żądana B2B.

**WP approach:**
- Theme: zacznij od accessible-ready theme (Astra, Kadence — obie mają WCAG ready oznaczenie)
- Wtyczki: **WP Accessibility** (free), **One Click Accessibility** (free)
- Audyt: WAVE Chrome extension, Lighthouse Accessibility tab
- Manualnie sprawdź: kontrasty, focus styles, ARIA labels, alt na zdjęciach, keyboard nav

**Next.js approach:**
- Komponenty z **Radix UI** lub **Headless UI** — wszystkie dostępne (focus management, ARIA, keyboard) wbudowane
- Tailwind: focus:ring utility, screen-reader-only z `sr-only`
- Testy automatyczne: `jest-axe` w testach komponentów

**Trudności (oba stacki):**
- Custom carousels / sliders — najczęściej łamią WCAG. Używaj Splide.js (a11y-first) lub Embla Carousel
- Modal dialogs — focus trap wymagany. Radix Dialog robi to za Ciebie.
- Color contrast 4.5:1 — sprawdzaj w Figma plugin "Contrast" przy designie, nie po implementacji
- **Post-hoc audyt + fix** kosztuje 2-3× więcej niż "od początku" — komunikuj to klientowi

**Czas:** 8-16h (od początku), 24-50h (post-hoc fix istniejącej strony)

---

#### `animations-medium` 🟡 (3 200 zł)

**Co:** Średnie animacje — scroll-triggered, parallax, fade-in, transition stanów.

**WP approach:**
- W Elementorze: wbudowane Motion Effects (parallax, sticky, scroll animations)
- W custom theme: GSAP ScrollTrigger lub Intersection Observer + CSS keyframes
- Animacje sekcji: AOS.js (Animate On Scroll) — proste, free

**Next.js approach:**
- **Framer Motion** (najpopularniejszy, type-safe) — `motion.div`, `useScroll`, `useInView`
- Tailwind CSS animations dla prostych (fade-in, slide-up)
- View Transitions API — dla page transitions (Chrome only, fallback CSS)

**Trudności:**
- Performance: animacje na `top/left/width/height` wywołują reflow. Używaj `transform` i `opacity`.
- Mobile: scroll-triggered animations często laggują na słabszych telefonach. Testuj na realnym telefonie, nie DevTools.
- Reduced motion: respektuj `prefers-reduced-motion` — disable animations dla użytkowników którzy mają to ustawione.

**Czas:** 8-15h

---

#### `animations-premium` 🟠 (9 000 zł)

**Co:** Premium animacje — GSAP scroll sequences, Lottie animations, WebGL/Three.js efekty.

**WP approach:**
- GSAP w custom theme (bez Elementora — Elementor utrudnia)
- Lottie: wtyczka **Bodymovin LottieFiles for Elementor** lub bezpośrednio `<lottie-player>` web component
- WebGL: praktycznie tylko custom theme, Three.js osadzone w canvas

**Next.js approach:**
- **GSAP** + `@gsap/react` (oficjalny React wrapper, useGSAP hook)
- **Lottie**: `lottie-react` lub `@lottiefiles/react-lottie-player`
- **Three.js**: `@react-three/fiber` + `@react-three/drei` — komponenty 3D w React
- **WebGL postprocessing** (bloom, glitch, glow): `@react-three/postprocessing`

**Trudności:**
- GSAP licencja: free dla projektów komercyjnych od 2024 (wcześniej $99 dla niektórych pluginów). **Sprawdź czy klient nie potrzebuje GSAP Club greensock plugins** (ScrollSmoother, MorphSVG) — to wciąż płatne.
- Lottie pliki .json często wagą 200-500 kB — lazy load
- Three.js scenes na mobile: dropuj quality (mniejsze tekstury, mniej polygonów). Detect mobile via `useMediaQuery`.
- WebGL kompatybilność: ~5% urządzeń nie wspiera WebGL2. Zawsze miej fallback (statyczny obrazek).

**Czas:** 20-50h

---

#### `cwv-basic` / `cwv-full` 🟡-🟠 (1 200 / 4 500 zł)

**Co:** Optymalizacja Core Web Vitals — LCP, INP, CLS.

**WP approach (basic):**
- Cache plugin: **FlyingPress** ($60/year, najlepszy) lub **WP Rocket** ($59/year)
- Image optimization: **ShortPixel** lub **Smush** (auto WebP conversion)
- Critical CSS: FlyingPress robi to automatycznie
- Lazy loading: natywne `loading="lazy"` (WP 5.5+)
- CDN: Cloudflare free plan

**WP approach (full):**
- Wszystko z basic +:
- Refactor motywu: usuń niepotrzebne `enqueue` (każdy plugin dodaje swoje CSS/JS), dequeue niepotrzebnych
- Database cleanup: WP-Optimize (revisions, transients, autoload tuning)
- LCP image: `<img fetchpriority="high">` + preload w `<head>`
- Eliminacja render-blocking JS: defer wszystko poza krytycznymi

**Next.js approach (basic):**
- `next/image` z `priority` na hero — automatyczna optymalizacja, AVIF/WebP fallback
- `next/font` — eliminuje FOIT/FOUT, no layout shift
- Vercel Edge — automatyczny CDN

**Next.js approach (full):**
- ISR / SSG zamiast SSR gdzie możliwe
- React Server Components — wysyła mniej JS do klienta
- Bundle analyzer: `@next/bundle-analyzer` — szukaj bigfish dependencies
- Code splitting: dynamic imports dla ciężkich komponentów (mapy, edytory, charts)
- Preconnect / preload do third-party (Google Fonts, GA4)

**Trudności:**
- INP (Interaction to Next Paint) — nowy metric od 2024, mierzy responsywność. WP z mnóstwem plugins często ma INP > 200ms. Trudne do naprawienia bez refactoru.
- CLS od reklam — jeśli klient pokazuje Google AdSense, CLS leci. Reserve space (`min-height` na containers).
- Cookie banner: jeśli pojawia się PO załadowaniu, daje CLS shift. Pre-render placeholder lub `position: fixed`.

**Czas:** 4-8h (basic), 15-30h (full)

---

#### `seo-onpage` 🟢 (1 800 zł)

**Co:** Meta tags, Open Graph, schema.org structured data, sitemap.xml, robots.txt.

**WP approach:**
- **RankMath** (free, lepszy niż Yoast) lub **Yoast SEO**
- Setup wizard generuje sitemap, robots, schema (Organization, LocalBusiness)
- Per-page: title, meta description, OG image w edytorze
- Schema dla recipes/articles/products — RankMath ma kreator

**Next.js approach:**
- `metadata` export w `layout.tsx` / `page.tsx` (App Router) — Next.js robi resztę
- JSON-LD: dodaj `<Script type="application/ld+json">` w layoucie
- Sitemap: `app/sitemap.ts` (Next.js generuje XML)
- robots.txt: `app/robots.ts`
- Per-stronicowy OG image: `app/opengraph-image.tsx` (dynamic OG image generation)

**Trudności:**
- Open Graph image: 1200x630px, max 8 MB. Generuj dynamicznie z `@vercel/og` (SVG-based) dla każdego artykułu blog.
- Schema.org dla local business: ważne pole `areaServed` — często pomijane, pomaga w lokalnym SEO
- Sitemap dla blogów: priorytety + lastmod — RankMath robi to automatycznie

**Czas:** 4-6h

---

#### `seo-tech-full` 🟠 (5 500 zł)

**Co:** Pełne techniczne SEO — hreflang dla multi-lang, kanonikale, internal linking, rich snippets dla wielu typów, breadcrumbs schema.

**WP approach:**
- RankMath PRO (od $59/year) — hreflang manager, advanced schema, redirect manager
- WPML / Polylang — hreflang generowany automatycznie
- Schema bardziej szczegółowy: Article + Product + FAQPage + HowTo per typ treści

**Next.js approach:**
- next-intl + custom hreflang generator w `metadata` lub `alternates.languages`
- Schema rozbudowane: per-route `<Script type="application/ld+json">`
- Breadcrumbs schema: `BreadcrumbList` + komponent UI

**Trudności:**
- Hreflang: jeśli wersje językowe na różnych domenach (klient.pl vs klient.de), reguły hreflang inne niż na subdomain. Łatwo popełnić błąd.
- Canonical w pagination: rel="canonical" do strony 1 lub do self? Google preferuje self od 2019, ale Yoast/RankMath defaultują do strony 1. Sprawdź ustawienia.
- 301 redirects po migracji — wymaga mapy URL stara → nowa. **Zawsze rób to przed migracją**, nie po.

**Czas:** 12-25h

---

#### `blog-cms` 🟢 (2 200 zł)

**Co:** Blog z kategoryzacją, tagami, autorami, paginacją.

**WP:** Natywne — `wp_query`, taxonomies kategorii i tagów już w core. Custom dla zaawansowanych: ACF dla podsumowania, lead, autor zewnętrzny.

**Next.js + Sanity:**
- Schema `post`, `category`, `author`
- Strony: `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/blog/tag/[slug]`
- Pagination: cursor-based via GROQ
- RSS feed: `app/rss.xml/route.ts` generuje XML

**Trudności:**
- Komentarze: nie polecam wbudowanych w WP (spam) ani Disqus (privacy). Lepiej: Giscus (GitHub Discussions) lub po prostu CTA "Skomentuj na LinkedIn".
- SEO duplicate content: tag pages + category pages = ten sam artykuł na 3 URLach. `noindex` na tag pages.
- Featured image responsive: WP automatically generuje sizes, Next.js wymaga `next/image` z odpowiednimi `sizes`.

**Czas:** 6-10h

---

#### `multistep-form` 🟡 (1 800 zł)

**Co:** Wieloetapowy formularz (np. brief / quote calculator / order configurator) z walidacją per krok.

**WP approach:**
- **WPForms Pro** ($199/year) — drag-drop multistep
- **Forminator** (free + pro) — multistep + conditional logic
- **Gravity Forms** ($59/year) — najmocniejszy ekosystem add-ons

**Next.js approach:**
- React Hook Form + Zod (schema per krok)
- State management: useState lub Zustand (jeśli persist między krokami)
- Stepper UI: Radix UI Tabs lub custom
- Progress save: localStorage (offline) lub Server Action do DB

**Trudności:**
- Walidacja przed przejściem do następnego kroku — łatwo popełnić błąd UX (user wraca, traci dane).
- Conditional logic: "jeśli wybrał X, pokaż pole Y" — Gravity Forms ma to natywnie, custom wymaga uwagi
- File uploads w środku flow: trzeba upload natychmiast (S3) i przekazać URL dalej, nie trzymać w state

**Czas:** 8-14h

---

#### `configurator` 🟠 (4 500 zł)

**Co:** Konfigurator produktu / kalkulator wyceny / cost estimator.

**WP approach:**
- **Uni Calc** (od 79 zł rocznie) — kalkulatory cenowe, formuły
- **Cost Calculator Builder** — drag-drop calc
- WooCommerce: **WooCommerce Product Add-Ons** ($89/year) — wariantowość produktu z cenami

**Next.js approach:**
- Custom React komponent z TypeScript types
- State: Zustand lub React Context
- Logika ceny w `lib/pricing/` (jak w obecnym projekcie!)
- Walidacja inputów: Zod
- Wynik: live preview + opcjonalnie PDF export (react-pdf)

**Trudności:**
- Reguły biznesowe: klient zawsze ma "edge case" (rabat dla stałych klientów, sezon, lokalizacja). Lepiej zaprojektować jako Strategy pattern (interface RuleEngine) niż hardcode if/else.
- Wyświetlanie ceny w czasie rzeczywistym: debounce 100ms przy szybkich zmianach (slider).
- Wysyłka wyceny do CRM/mail: po wypełnieniu konfiguratora — POST do API + email do sprzedaży.
- "Skopiuj link do tej wyceny" feature: serializuj state do URL params (base64).

**Czas:** 16-40h zależnie od liczby zmiennych

---

#### `rodo-pack` 🟢 (1 200 zł)

**Co:** Pakiet RODO — cookie banner z Consent Mode v2, polityka prywatności, regulamin strony.

**WP approach:**
- **CookieYes** (free do 25k sesji/mc) lub **Cookiebot** (od 30 zł/mc do 1.5k sesji)
- Consent Mode v2 włączone w settings
- Polityka prywatności: generator (Cookiebot ma, RODO-online.pl) → review prawniczki
- Regulamin: szablon → review

**Next.js approach:**
- `cookieconsent` npm package (vanilla JS, działa) lub `react-cookie-consent`
- Custom hook `useConsent()` synchronizujący z GTM/GA4
- Polityka i regulamin jako Markdown w repo (MDX)

**Trudności:**
- Consent Mode v2 wymaga dwóch sygnałów: `ad_storage` i `analytics_storage`. Wielu deweloperów ustawia tylko jeden — psuje conversion tracking w Google Ads.
- Polityka prywatności: musi wymieniać KAŻDEGO dostawcę (Google Analytics, Meta Pixel, MailerLite, etc.). Pomiń jednego — narusznie RODO.
- "Cookie wall" (zgoda obowiązkowa) nielegalna w PL. Musi być real choice.

**Czas:** 3-5h (z generatora) + reviewer prawnik (klient załatwia)

---

## B. SKLEP (kind=shop)

### B.1 Platform (shopPlatform)

| Platform | Kiedy | Trudności |
|---|---|---|
| **woo** (WooCommerce) | 80% przypadków, polski ekosystem, KSeF gotowe | Wymaga utrzymania, ataki na WP |
| **presta** (PrestaShop) | B2B z multistore, hurtownie online | Mniejszy ekosystem PL, droższe wdrożenie |
| **shopify** | Klient już go ma lub chce SaaS bez utrzymania | Brak natywnego polskiego BLIK, mniej integracji ERP, fee od przychodu |
| **custom** | Specjalne case'y (Spring Boot custom) | Tylko gdy WooCommerce nie wystarcza — rzadkie |

**Decyzja domyślna:** WooCommerce dla 90%+ klientów. PrestaShop tylko jeśli klient ma realnie multistore z różnymi domenami / cennikami per klient B2B.

---

### B.2 Rozmiar katalogu (catalogSize)

| Size | Zakres | Implikacje |
|---|---|---|
| **sm** | do 50 produktów | WooCommerce out-of-the-box, bez optymalizacji DB |
| **md** | 50-500 | Index na `wp_posts.post_type`, cache produktów |
| **lg** | 500-2000 | Wymagany Redis object cache, Elasticsearch dla wyszukiwania |
| **xl** | 2000+ | Custom DB indexes, query optimization, dedykowany VPS |

**Trudności:**
- `wp_options` autoload: WooCommerce dodaje wpisy które ładują się na każdym zapytaniu. Wyłącz autoload niepotrzebnych.
- Wyszukiwarka WP `LIKE %query%` jest WOLNA przy 2000+ produktów. Użyj **FacetWP** + Elasticsearch lub **Relevanssi**.
- Filtrowanie variation produktów (kolor, rozmiar) — natywne WC ma ograniczenia. **YITH WooCommerce Ajax Product Filter** lub **FacetWP**.

---

### B.3 Bramki płatności (paymentGateways)

#### `blik` 🟢

**Co:** BLIK — najpopularniejsza metoda w PL (>40% płatności online).

**Polski rynek (prowizje 2026):**
- **Autopay** (dawniej BlueMedia): 0.7-1.8% — najtaniej dla wolumenu
- **Paynow** (mBank): 1.0% + 0.30 zł
- **HotPay** (Krajowy Integrator Płatności): 1.5% + 0.30 zł
- BLIK osobno nie ma sensu — zawsze przez agregatora (Przelewy24, Stripe, PayU, Autopay)

**WP approach:**
- Wtyczka dostawcy (P24/Stripe/PayU mają natywne BLIK w polskiej wersji)
- WooCommerce: zaznaczenie "BLIK" w settings bramki
- Test: tryb sandbox dostawcy

**Next.js approach (headless / custom checkout):**
- Stripe API: `payment_method_types: ['blik']` (Stripe BLIK od 2023 w PL)
- P24 REST API: redirect-based, klient wraca po płatności
- Webhook handler: `/api/payment/webhook` weryfikuje signature

**Trudności:**
- BLIK code expiry: 2 minuty. Jeśli checkout wolny, klient nie zdąży.
- Refund BLIK: tylko na pierwotny numer telefonu, w 14 dni. Po 14 dniach przelew na konto.

---

#### `p24` 🟢 (Przelewy24)

**Co:** Najpopularniejsza polska agregatorka — BLIK, karty, szybkie przelewy, raty Allegro.

**Setup:**
- Konto na panel.przelewy24.pl
- Klucz API (CRC, ID merchanta)
- Wtyczka WP (oficjalna od P24) lub `przelewy24-php` package dla custom
- Sandbox: sandbox.przelewy24.pl

**Trudności:**
- Webhook signature: hash MD5 z kluczem CRC. Łatwo pomylić kolejność pól.
- Notyfikacje (powiadomienia o płatności) — P24 wysyła POST na webhook URL. Musi być publicznie dostępny, idempotent (P24 retry).
- Prowizje negocjowalne przy obrocie >50k zł/mc — klient sam negocjuje z P24

---

#### `stripe` 🟢

**Co:** Międzynarodowy gigant, najlepszy DX, dobry dla SaaS / subskrypcji.

**Setup:**
- Konto Stripe (PL od 2017)
- Sekretne klucze (test + live)
- Wtyczka Stripe for WooCommerce (oficjalna, free)
- Custom: `stripe-js` (frontend) + `stripe-node` (backend)

**Trudności:**
- Strong Customer Authentication (SCA / 3D Secure 2) — wymóg EU od 2019. Stripe robi automatycznie z Payment Intents API.
- Subskrypcje: webhook `customer.subscription.updated` — często zapominany. Bez tego status klienta w DB się desyncuje.
- Stripe Customer Portal — gotowy panel klienta do anulowania subskrypcji (free, dosłownie 1 linia kodu).

---

#### `paypal` 🟢

**Co:** Międzynarodowi klienci, niski volume w PL B2C.

**Trudności:**
- Wysokie fee w PL: 2.9% + opłata FX
- Refund proces — czasem zamrożenie środków na 21 dni
- W większości polskich sklepów PayPal można pominąć — chyba że klient ma międzynarodową sprzedaż

---

#### `card` 🟢

**Co:** Karty kredytowe / debetowe.

**Realność:** Karty zawsze idą przez agregatora (P24, Stripe, PayU). "Card" jako osobna opcja w kalkulatorze to redundancja — i tak będzie obsługiwana przez wybraną bramkę. W presetcie ecom usunięte z tego powodu.

---

### B.4 Integracje sklepu (shopIntegrations)

#### `courier` 🟢 (800 zł)

**Co:** Integracja z kurierem (InPost / DHL / DPD / GLS).

**Polski rynek:**
- **InPost** — 70% rynku PL, paczkomaty (małe paczki) + kurier (większe)
- DHL — międzynarodowe + krajowe premium
- DPD / GLS — krajowe średnia półka
- Poczta Polska — najtańsze, najwolniejsze

**WP approach:**
- **WP Desk InPost** (229 zł/year) — najpopularniejsza, integracja z paczkomatami (mapa wyboru)
- DHL/DPD: WP Desk lub native plugins kurierów
- **Furgonetka** (broker do wszystkich kurierów) — wtyczka **darmowa**, klient płaci tylko za przesyłki

**Next.js approach (custom checkout):**
- API kuriera (InPost ShipX API, DHL XML/REST)
- Mapa paczkomatów InPost: oficjalny widget JS lub własna z `geopoint` API

**Trudności:**
- Generowanie etykiet: każdy kurier inny format (PDF / ZPL / EPL). InPost ShipX API daje PDF gotowy do druku.
- Tracking: webhook od kuriera → update status w sklepie → email do klienta. InPost ShipX webhooks niezawodne, DHL czasem opóźnione.
- Cennik wagowy + strefowy: **Flexible Shipping PRO** (199 zł/year) — reguły wagowo-strefowe natywnie w WC.

**Czas:** 3-5h per kurier

---

#### `crm` 🟡 (1 200 zł)

**Co:** Integracja sklepu z CRM (HubSpot, Pipedrive, Salesforce, Zoho).

**WP approach:**
- Każdy CRM ma WordPress plugin: HubSpot Forms / Pipedrive WP / Zoho CRM
- Trigger: po zakupie / po wypełnieniu formularza → contact w CRM
- Webhook lub Zapier / Make.com (no-code)

**Next.js approach:**
- API CRM-a (HubSpot REST, Pipedrive API)
- Server Action: po `purchase` event → `fetch` do CRM API
- Custom mapping pól (klient.email → contact.email, order.value → deal.amount)

**Trudności:**
- Duplikaty: jeśli klient kupuje 2× — tworzą się 2 deals. Lepiej upsert po email.
- CRM rate limits: HubSpot 100 req/10s. Przy masowym imporcie — batchuj.
- Mapowanie pól: każdy CRM ma swoje custom properties. Lepiej zaprojektować w CRM przed integracją.

**Czas:** 6-12h

---

#### `allegro` 🟡 (1 500 zł)

**Co:** Wystawianie produktów ze sklepu na Allegro + sync stanów + import zamówień.

**WP approach:**
- **WP Desk Allegro** (499 zł/year) — najpopularniejsza
- **WP Hocus Allegro** (399 zł dożywotnio) — alternatywa
- Mapowanie kategorii sklep → kategoria Allegro
- Auto sync stanów: cron co 5-15 min

**Next.js approach (mniej naturalne):**
- Allegro REST API — OAuth 2.0 flow
- Wystawianie aukcji: POST /sale/offers
- Import zamówień: GET /order/checkout-forms (paginated)

**Trudności:**
- Kategoryzacja: Allegro ma 30 000+ kategorii. Trzeba mapować ręcznie lub skryptem z AI suggestion.
- Parametry produktów: Allegro wymaga specyficznych parametrów per kategoria (smartfony: ekran, kolor, pamięć). Mapping z WP custom fields wymaga schemy.
- Pricing rules: Allegro Smart! ma własne reguły bezpłatnej dostawy. Zaplanuj cenniki.
- **BaseLinker robi to lepiej** — jeśli klient ma 100+ produktów na Allegro, BaseLinker > bezpośrednia integracja.

**Czas:** 6-12h dla pluginu, 20-40h dla custom

---

#### `marketplace` 🟠 (2 200 zł)

**Co:** Empik Place / Amazon / inne marketplaces.

**WP approach:**
- **Empik Place**: dedykowany plugin lub przez BaseLinker
- **Amazon**: WP Amazon S3 lub przez BaseLinker / GeekSeller
- **Często BaseLinker** to jedyne sensowne rozwiązanie

**Trudności:**
- Każdy marketplace ma własne wymagania (Amazon FBA vs FBM, Empik wymaga GTIN, Allegro Smart)
- Komisja marketplace: Amazon 8-15%, Empik 7-12%, Allegro 7-10%. Cennik klienta musi to uwzględnić.
- VAT OSS dla sprzedaży EU: jeśli klient sprzedaje przez Amazon DE — wymaga VAT OSS registracji

**Czas:** 8-15h per marketplace

---

#### `subscription` 🟠 (2 400 zł)

**Co:** Sprzedaż subskrypcyjna (kawa co miesiąc, fitness, treści premium).

**WP approach:**
- **WooCommerce Subscriptions** ($199/year, oficjalna od Automattic)
- Stripe Subscriptions integracja
- Auto-renewal, anulowanie, grace period

**Next.js approach (SaaS):**
- Stripe Subscriptions API + Customer Portal
- Webhook `customer.subscription.updated/deleted` → update DB
- Self-serve panel: integracja z `https://billing.stripe.com/p/login/...`

**Trudności:**
- Failed payments: retry strategy (Stripe Smart Retries) + dunning emails
- Pro-rated upgrades: klient zmienia plan w środku miesiąca — Stripe oblicza proration
- Free trial → paid conversion: webhook `customer.subscription.trial_will_end` 3 dni przed końcem

**Czas:** 12-25h

---

#### `baselinker-basic` / `baselinker-std` 🟢 (3 500 / 5 500 zł)

**Co:** BaseLinker — integrator multi-channel (sklep + marketplace + kurierzy + księgowość + magazyn).

**Setup basic (WC + Allegro + 1 fakturowanie + 1 kurier):**
1. Konto BaseLinker (99 zł/mc do 100 zamówień)
2. Połącz WooCommerce: API key z WC REST API
3. Połącz Allegro: OAuth z BaseLinker panel
4. Połącz kuriera (InPost) i fakturowanie (Fakturownia/iFirma)
5. Konfiguracja statusów: zamówienia → BaseLinker → automatyczne etykiety + faktury

**Setup standard (+ hurtownia + 2-3 kurierów + szkolenie):**
- Dropshipping XL lub własna hurtownia XML
- Multi-kurier (InPost + DPD + DHL)
- Szkolenie operatora (2h video)

**Trudności:**
- Statusy zamówień: BaseLinker ma swoje (czeka, gotowe, wysłane), WooCommerce ma swoje. Mapowanie 1:1 nie zawsze możliwe.
- Synchronizacja stanów: jeśli klient sprzedaje na 5 kanałach, stany schodzą szybko. BaseLinker robi sync co 1-5 min.
- Faktury: BaseLinker generuje przez integratora (Fakturownia, iFirma). KSeF idzie przez Fakturownię od 04.2026.

**Czas:** 4-8h basic, 10-20h standard

---

#### `empik-amazon` 🟠 (3 500 zł)

**Co:** Wystawianie na Empik Place lub Amazon (poza BaseLinkerem).

**Empik Place:**
- Konto Empik Place (zapis przez Empik Marketplace)
- Plugin: **Empik Place for WooCommerce** (premium, ~600 zł/year)
- Lub przez BaseLinker (taniej długoterminowo)

**Amazon:**
- Amazon Seller Central (PL od 2021)
- API: SP-API (Selling Partner API) — wymaga LWA (Login with Amazon) registration
- Plugin: **Amazon for WooCommerce** lub przez BaseLinker

**Trudności:**
- Empik: wymóg GTIN/EAN dla każdego produktu — bez tego nie wystawisz
- Amazon: surowe wymagania jakości listingów (zdjęcia 1000x1000, descriptions w określonej strukturze). Brand Registry przyspiesza.
- Returns policy różne na każdym marketplace

**Czas:** 8-15h

---

#### `ceneo-google` 🟢 (1 800 zł)

**Co:** Porównywarki cen (Ceneo) + Google Merchant Center.

**Ceneo:**
- Konto Ceneo Sklep
- Feed XML z produktami (Ceneo specyficzny format)
- WC: plugin **Ceneo XML Feed** lub WP Desk
- Mapowanie kategorii sklep → Ceneo (~3000 kategorii)

**Google Merchant Center:**
- Konto GMC (połączenie z Google Ads, free)
- Feed XML lub Google Sheets
- WC: **Google Listings & Ads** (oficjalny plugin Google, free)

**Trudności:**
- Ceneo wymaga aktualizacji feed co 24h — cron job lub zewnętrzne narzędzie
- Google MC: dyscyplina danych — kategorie z Google Taxonomy, GTIN obowiązkowy dla wielu kategorii
- Disapprovals: Google odrzuca produkty bez warranty info, bez precise availability. Skonfiguruj raz, później OK.

**Czas:** 4-7h

---

#### `dropshipping` 🟡 (2 200 zł)

**Co:** Sprzedaż produktów hurtowni bez magazynowania.

**WP approach:**
- **Dropshipping XL** (popularny w PL, własne plugin) — łączy z hurtownią
- **Pi.pl, ABC-Data, BB Mining** — polskie hurtownie z natywnymi integracjami
- Import produktów: CSV / XML automatyczny
- Sync cen: co 6-24h (cron)

**Trudności:**
- Marża: hurtownia daje cenę zakupu, ty ustawiasz markup (typowo 20-50%). Margin rules per kategoria.
- Stocki desynchronizują się: hurtownia ma 100 sztuk, sprzedasz 80 zanim sync — overselling. Lepiej trzymać "bufor" -5% w stockach.
- Wysyłka bezpośrednio z hurtowni: tracking number wraca z opóźnieniem. Klient niecierpliwy.

**Czas:** 8-15h

---

#### `wholesale-xml` 🟡 (1 800 zł)

**Co:** Import produktów z XML/CSV hurtowni (custom format).

**Approach (uniwersalny):**
- Custom skrypt PHP / Node.js do parsowania XML
- Mapowanie pól: `<product_name>` → WC product name
- Cron job: import co 6-24h, update istniejących + dodanie nowych
- Bezpieczeństwo: validate input, sanitize HTML w opisach

**WP plugins:**
- **WP All Import Pro** ($99) — najlepszy do custom XML feeds
- **WooCommerce CSV Import Suite** ($199) — official

**Trudności:**
- Każda hurtownia ma własny XML schema — custom mapping per integracja
- Zdjęcia: hurtownia daje URLe → download + upload do WP media (uważaj na timeout)
- Atrybuty produktu (kolor, rozmiar): jeśli hurtownia daje płaską listę, generowanie wariacji w WC = osobny skrypt
- Update vs new: po SKU sprawdzaj czy produkt istnieje; jeśli tak — update, nie tworz duplikat

**Czas:** 8-14h

---

#### `ksef` 🟠 (1 800 zł)

**Co:** Krajowy System e-Faktur — obowiązkowy od 1.04.2026 dla wszystkich podatników VAT.

**WP approach:**
- **Fakturownia / iFirma / wFirma** — wszystkie mają wtyczki WC z KSeF support
- Webhook po `order.completed` → wystawienie faktury w systemie → wysyłka do KSeF
- Certyfikat kwalifikowany lub Profil Zaufany do autoryzacji

**Custom approach:**
- Bezpośrednio do KSeF API (REST) — XSD walidacja, OAuth z certyfikatem
- Generowanie faktury w XML zgodnym z schemą FA(2)
- Receipt KSeF: numer faktury z systemu rządowego

**Trudności:**
- **KSeF API jeszcze niestabilne** (stan 2026-05) — Ministerstwo Finansów zmienia spec. Najlepiej iść przez Fakturownię/iFirmę które aktualizują integrację za Ciebie.
- B2C: dla osób fizycznych KSeF NIEOBOWIĄZKOWY — paragon fiskalny wystarczy. Wystawiaj fakturę tylko gdy klient zażąda.
- B2B: zawsze KSeF od 04.2026. NIP musi być w zamówieniu (walidacja GUS API).
- Edge case: korekta faktury, anulowanie — KSeF wymaga referencji do oryginału.

**Czas:** 6-12h (przez integratora), 30-60h (custom KSeF API)

---

#### `omnibus` 🟢 (700 zł)

**Co:** Dyrektywa Omnibus — od 2023 obowiązek pokazywania najniższej ceny z ostatnich 30 dni przy każdej promocji.

**WP approach:**
- **WP Desk Omnibus** (149 zł/year) lub **YITH WooCommerce Omnibus** ($79/year)
- Automatyczny tracking historii cen
- Wyświetlanie "Najniższa cena z 30 dni: X zł" pod każdą promocją

**Custom approach:**
- Tabela `price_history` (date, product_id, price)
- Cron job zapisujący snapshots
- Hook `woocommerce_get_price_html` modyfikujący wyświetlanie

**Trudności:**
- Dotyczy WSZYSTKICH promocji, nie tylko "Sale". Nawet rabat z kodu kuponu powinien pokazywać Omnibus price.
- Sankcje UOKiK: do 10% obrotu rocznego. Klient nie chce ryzykować.
- Migracja danych: jeśli sklep istnieje, brak historii cen. Plugin generuje od dnia instalacji — pierwszy miesiąc "Niemożliwe ustalić" (akceptowalne dla UOKiK).

**Czas:** 1-3h (plugin)

---

#### `nip-gus` 🟢 (600 zł)

**Co:** Walidacja NIP/REGON klienta z bazy GUS API.

**WP approach:**
- **WP Desk NIP** (149 zł/year) lub plugin "Polish VAT Validator"
- W checkout: pole NIP z auto-walidacją
- Po walidacji: auto-fill nazwa firmy, adres z GUS

**Custom approach:**
- GUS REST API (BIR1) — wymaga kluczy (free, rejestracja na bir.stat.gov.pl)
- Endpoint: POST z NIP → response z danymi firmy
- Cache: GUS limit 50 req/dzień bez klucza, 1000+ z kluczem

**Trudności:**
- GUS API czasem niedostępne (przerwy techniczne) — fallback: pozwól na ręczne wpisanie
- VIES (VAT EU): dla B2B EU sprzedaż 0% VAT wymaga walidacji VIES — osobne API
- White List MF (Biała Lista) — od 2020 obowiązek sprawdzenia rachunku bankowego kontrahenta przy >15k zł. Osobne API.

**Czas:** 2-3h

---

#### `vat-faktury` 🟢 (900 zł)

**Co:** Generowanie i wysyłka faktur VAT po zamówieniu.

**WP approach:**
- **WooCommerce PDF Invoices & Packing Slips** (free, podstawowe)
- **WooCommerce PDF Invoices Pro** (premium, $69/year) — KSeF ready, custom template
- Plugin generuje PDF, dołącza do email z potwierdzeniem

**Custom approach:**
- DomPDF / TCPDF (PHP) lub `react-pdf` (Next.js)
- Template HTML → PDF
- Numeracja: rok/miesiąc/ID — zachowaj ciągłość

**Trudności:**
- Wzór faktury VAT: wymagane pola określone w ustawie. Większość pluginów ma to OK, ale custom — sprawdź!
- Korekty faktur (faktura korygująca) — osobny numer, referencja do oryginału
- KSeF integration — patrz wyżej

**Czas:** 2-4h (plugin), 8-16h (custom)

---

#### `product-configurator` 🟠 (4 800 zł)

**Co:** Konfigurator produktu — np. komputer (CPU+GPU+RAM), meble (rozmiar+kolor+materiał), biżuteria.

**WP approach:**
- **WooCommerce Product Add-Ons** ($89/year) — wariacje z dynamic price
- **YITH WooCommerce Product Add-Ons** — alternative
- **PPOM (Personalized Product Options Manager)** — free + pro, najmocniejszy
- **Product Configurator for WooCommerce** (Themeforest, $39) — graficzny configurator

**Custom approach (Next.js):**
- React komponent z TypeScript types dla opcji
- State management: Zustand
- Live price calc (jak w kalkulatorze cennika obecnym!)
- 3D preview: Three.js + GLTF model

**Trudności:**
- Kompatybilność opcji: "CPU Intel + chłodzenie AMD" niemożliwe. Constraint engine wymagany.
- Cena dynamiczna: baza + Σ wariantów + opcjonalnie rabat ilościowy
- Stany magazynowe: każda kombinacja ma własny SKU? Trudno zarządzać przy 1000+ kombinacji. Lepiej: stocki na komponenty, nie kombinacje.

**Czas:** 16-40h

---

#### `loyalty` 🟡 (2 200 zł)

**Co:** Program lojalnościowy — punkty za zakupy, nagrody.

**WP approach:**
- **YITH WooCommerce Points and Rewards** ($89/year) — najpopularniejszy
- **WooRewards** — alternative
- Konfiguracja: X punktów za 1 zł, Y punktów = Z zł rabatu

**Trudności:**
- Anti-fraud: klient kupuje, zwraca, zachowuje punkty. Trzeba hook na refund cofający punkty.
- Expiration: punkty wygasają po N miesiącach. Email reminders.
- Tiers (Silver/Gold/Platinum): klient z 10k punktów = wyższy %. Wymaga custom logiki.

**Czas:** 6-12h

---

#### `multi-warehouse` 🟠 (3 500 zł)

**Co:** Wielomagazynowość — sklep ma stany w 2+ lokalizacjach.

**WP approach:**
- **ATUM Multi-Inventory** (od $89/year) — najlepszy plugin
- **Multi Locations Inventory Management for WC**

**Trudności:**
- Order routing: zamówienie z magazynu najbliższego klientowi. Geolocation + algorytm.
- Stock allocation: rezerwacja stanu na koszyk przed checkout. Konflikty przy szybkiej sprzedaży.
- Reporting: per-warehouse turnover, rotacja zapasów

**Czas:** 12-25h

---

#### `reviews` 🟢 (1 200 zł)

**Co:** Recenzje produktów z moderacją + integracja z Trustmate/Opineo.

**WP approach:**
- Natywne WC reviews + manual approval
- **Trustmate.io** — polski lider, integracja z WC (plugin)
- **Opineo** — alternatywa, badge "Opineo" na sklepie
- **Judge.me** — międzynarodowy, lepszy dla skali

**Trudności:**
- Anti-fake: tylko klienci którzy kupili mogą oceniać (Trustmate weryfikuje)
- Moderation queue: spam, mowa nienawiści — wymaga manual review przed publikacją
- Schema.org `AggregateRating` — wymagane dla rich snippets w Google

**Czas:** 3-6h

---

### B.5 ERP integracje (erp)

#### `subiekt` 🟠 (3 500 zł jednostronna / 9 500 dwustronna)

**Co:** Subiekt GT / Subiekt nexo (InsERT) — najpopularniejszy ERP w PL dla MŚP.

**Approach:**
- **WP Desk Subiekt** — natywna integracja (jednostronna sklep → ERP)
- **Sello / Aledo** — premium dwustronna
- **BaseLinker → Subiekt** — często lepsze niż bezpośrednia integracja

**Workflow jednostronna:**
1. Zamówienie w sklepie → API Subiekt → dokument ZK
2. Faktura w Subiekt → opcjonalnie webhook do sklepu (status "fakturowane")

**Workflow dwustronna:**
- Sklep ↔ Subiekt: produkty, ceny, stocki, klienci, zamówienia, faktury, płatności
- Konektor: dedykowany middleware (Sello jako serwis 30-200 zł/mc)

**Trudności:**
- Subiekt GT lokalny: wymaga komputera z bazą lokalnie. API tylko przez Sferę (osobny moduł, dodatkowa licencja).
- Subiekt nexo: cloud-ready, REST API lepsze
- Mapowanie kontrahentów: jeden klient w sklepie = jeden w Subiekt. Po NIP lub email.

**Czas:** 12-25h jednostronna, 40-80h dwustronna

---

#### `wapro` 🟠 (3 500 zł / 9 500 zł)

**Co:** Wapro Mag / Wapro ERP — konkurencja Subiekta, popularny w handlu.

**Approach:**
- Wapro ma REST API (od 2021), wcześniej tylko ODBC
- Bezpośrednia integracja lub przez middleware

**Trudności podobne do Subiekt.** Wapro ma mniej gotowych pluginów WP — więcej custom kodu.

---

#### `comarch` 🟠 (4 200 zł / 12 000 zł)

**Co:** Comarch ERP Optima (MŚP) / Comarch ERP XL (duże firmy).

**Optima approach:**
- Comarch Web Service (SOAP) lub REST API (nowsze wersje)
- **WP Desk Comarch** — natywna integracja jednostronna
- Premium: dedykowany konektor (100-500 zł/mc subskrypcja)

**XL approach:**
- Bardzo złożone, wymaga konsultacji Comarch
- Custom konektor (10 000-30 000 zł)

**Trudności:**
- Comarch Optima często działa lokalnie na komputerze klienta — wymaga VPN / SSH do API
- Licencje Comarch — klient sam dokupuje moduł Web Service
- XL: średnio 6-12 miesięcy projekt z konsultantami Comarch

**Czas:** Optima 15-30h jedno, 50-100h dwu. XL — projekt dedykowany.

---

#### `custom` 🔴 (6 500+ zł)

**Co:** Niestandardowy ERP / własna ewidencja klienta.

**Approach:** Każdy case dedykowany. Wymaga:
- Dokumentacja API klienta
- Sample data
- Test environment
- Mapping pól workshop z klientem

**Czas:** Minimum 30h, typowo 60-150h.

---

## C. APLIKACJA (kind=app)

### C.1 Typ aplikacji (appType)

| Type | Charakterystyka | Stack rekomendacja |
|---|---|---|
| **saas** | Multi-tenant, subskrypcje, dashboard | Spring Boot + Next.js + Stripe + Postgres |
| **internal** | Wewnętrzne narzędzie firmy, jeden tenant | Spring Boot + Next.js + LDAP/AzureAD auth |
| **portal** | Portal klienta B2B/B2C (zamówienia, dokumenty) | Spring Boot + Next.js + RBAC |
| **dashboard** | Read-only analytics + charts | Next.js + Recharts/Tremor + Postgres read-only |
| **marketplace** | Multi-sided (sprzedawcy + kupujący) | Spring Boot + Next.js + Stripe Connect |
| **other** | Custom case | Wycena indywidualna |

**Trudności:**
- Multi-tenant SaaS: schema-per-tenant vs row-level isolation. Postgres ma RLS (Row Level Security) — najbezpieczniejsze.
- Marketplace = Stripe Connect (osobny temat, 30-60h tylko payments)
- Internal apps często wymagają integracji z AD/LDAP — komplikacja

---

### C.2 Autoryzacja (appAuth)

#### `none` 🟢

**Co:** Brak logowania — aplikacja publiczna (np. kalkulator).

**Trudności:** Brak. Walidacja rate-limit po IP (`@upstash/ratelimit` dla Next.js, Bucket4j dla Spring).

---

#### `email` 🟢 (4 000 zł)

**Co:** Logowanie email + hasło + JWT.

**Spring Boot approach:**
- Spring Security + JWT (jjwt library)
- Endpointy: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`
- BCrypt password hashing
- Email verification: token z timestamp, wysyłany email z linkiem

**Next.js approach:**
- **NextAuth.js v5 / Auth.js** — najpopularniejszy
- Provider: Credentials (custom email/password)
- Session w cookies (HttpOnly, Secure)
- DB adapter: Prisma / Drizzle

**Trudności:**
- Refresh token rotation: access token krótko żyje (15 min), refresh token rotuje przy każdym użyciu. Bez tego — wektor ataku.
- Password reset: token z 30 min ważnością, single-use
- "Remember me" — 30-dniowy refresh, vs 1-dniowy bez tego
- Brute force: rate limit + Captcha po 3 failed attempts

**Czas:** 12-22h (Spring) / 8-14h (Next.js z NextAuth)

---

#### `oauth` 🟡 (4 000 zł)

**Co:** Social login — Google, GitHub, Facebook, Apple.

**Spring Boot approach:**
- Spring Security OAuth2 Client
- Konfiguracja providers w `application.yml`
- Endpointy: `/oauth2/authorization/google` (redirect), `/login/oauth2/code/google` (callback)

**Next.js approach:**
- NextAuth.js z OAuth providers (Google, GitHub, etc.)
- Po prostu konfiguracja klucza i secret w `.env`
- Provider list: 50+ providerów out-of-the-box

**Trudności:**
- Google OAuth: wymaga verified domain dla production. Process trwa 2-7 dni.
- Apple Sign-In: wymaga Apple Developer ($99/year)
- Conflict z email: user loguje raz przez Google, drugi raz przez email → 2 konta. Lepiej: zapisuj OAuth identity osobno, łącz po email.

**Czas:** 12-22h

---

#### `sso` 🟠 (4 500 zł)

**Co:** Single Sign-On — SAML/OIDC integracja z firmowym AD/AzureAD/Okta.

**Spring Boot approach:**
- Spring Security SAML2 lub OAuth2 OIDC
- Konfiguracja metadata IdP (Identity Provider)
- Tokenmapping: SAML assertions → user roles

**Next.js approach:**
- NextAuth.js + Azure AD provider lub Okta provider
- Custom SAML implementation: `@boxyhq/saml-jackson` (open source SAML middleware)

**Trudności:**
- SAML spec jest złożony — XML signing, certificates, metadata exchange
- Każdy klient enterprise ma własne wymagania (Just-In-Time provisioning, attribute mapping)
- Testowanie: trudne bez dostępu do prawdziwego IdP klienta. Mock IdP (Keycloak local) na development.

**Czas:** 20-40h

---

### C.3 Backend (appBackend)

#### `spring` 🟢

**Co:** Spring Boot 3 + Java 21 — enterprise default.

**Stack:**
- Spring Boot 3.x, Spring Security, Spring Data JPA
- Maven / Gradle (preferuj Gradle dla większych projektów)
- Jakarta EE (od Spring Boot 3 — namespace change z `javax` na `jakarta`)
- Testing: JUnit 5 + Mockito + Testcontainers (PostgreSQL w Docker dla testów integracyjnych)

**Trudności:**
- Java 21 features (Virtual Threads, Records, Pattern Matching) — używaj!
- N+1 queries w JPA: `@EntityGraph` lub join fetch. Profilowanie Hibernate w log.
- Native compilation z GraalVM — start <100ms zamiast 5s. Worth it dla microservices.

---

#### `node` 🟢

**Co:** Node.js backend — Express / Fastify / NestJS.

**Stack rekomendacja:**
- **NestJS** dla większych aplikacji (TypeScript decorators, DI, modules)
- **Fastify** dla performance-critical (2× szybszy od Express)
- **Express** dla prostych API
- ORM: Prisma (najlepszy DX) lub Drizzle (typesafe SQL)

**Trudności:**
- TypeScript strict mode: włącz od początku. Migracja później = ból.
- Single-threaded: CPU-bound tasks (image processing, ML inference) — używaj worker threads lub osobny serwis.
- Memory leaks: niezmykane EventEmitter, niezmykane connections. Profilowanie z `clinic.js`.

---

#### `next-api` 🟢

**Co:** Next.js API routes / Server Actions — backend w tym samym projekcie co frontend.

**Kiedy:**
- MVP / prototyp — szybkie wdrożenie, jeden deployment
- Małe SaaS bez heavy backend logic
- Aplikacja z głównie CRUD operations

**Kiedy NIE:**
- Heavy computation (ML, image processing)
- Long-running jobs (>10s — Vercel timeout)
- WebSocket / SSE z dużą skalą — lepsze dedicated backend

**Stack:**
- App Router + Server Actions + Server Components
- DB: Postgres (Neon / Supabase / Vercel Postgres)
- ORM: Prisma / Drizzle

**Trudności:**
- Vercel function timeout: Free 10s, Pro 60s, Enterprise 900s. Dla dłuższych — Edge Functions lub osobny worker.
- Edge runtime: szybsze, ale ograniczone API (no fs, no Node.js APIs). Sprawdź `runtime: 'nodejs'` jeśli używasz Prisma.

---

#### `other` 🟠

**Co:** Python (FastAPI / Django), Go, Rust, Ruby on Rails.

**Trudności:**
- Każdy ma swoje patterns — komunikuj klientowi jakie konsekwencje wyboru
- Mniej Twojego doświadczenia = więcej research time
- Hosting / deployment różne — szczegółowo zaplanuj

**Czas:** +20-30% wobec znanego stacku.

---

### C.4 Storage (appStorage)

#### `postgres` 🟢

**Co:** PostgreSQL — relational DB, default.

**Hosting:**
- **Neon** — serverless Postgres, free tier 0.5 GB
- **Supabase** — Postgres + Auth + Storage in one, free 500 MB
- **Vercel Postgres** — managed Neon, gdy używasz Vercel
- **Hetzner managed Postgres** — od 60 zł/mc, dla VPS deploymentów
- **AWS RDS** — gdy klient ma AWS

**Trudności:**
- Connection pooling: PgBouncer dla aplikacji bez built-in poolingu (Lambda functions, serverless)
- Migrations: Flyway (Spring) / Prisma Migrate / Drizzle Kit. **Zawsze test na staging przed prod**.
- Backups: managed services robią automatic, VPS — pg_dump cron + S3.

---

#### `mongo` 🟡

**Co:** MongoDB — NoSQL document DB.

**Kiedy:**
- Dane bez sztywnej struktury (CMS, blog posts z wariantami)
- Embedded documents (komentarze pod postem)
- Real-time chat (z time-based ordering)

**Kiedy NIE:**
- Transactions across multiple documents (Postgres lepszy)
- Complex joins / reporting
- Klient nie chce drugiej technologii

**Trudności:**
- Schema-less ≠ schema-free. Zawsze waliduj input (Zod / Mongoose schemas).
- Aggregations są inne niż SQL — krzywa uczenia
- Indexy: bez nich queries powolne. Sprawdzaj `.explain()`.

---

#### `redis` 🟢

**Co:** Redis — in-memory cache / queue / pub-sub.

**Use cases:**
- Cache: API responses, rendered HTML
- Session store (Express, Spring)
- Queue: BullMQ (Node), Spring Batch with Redis
- Rate limiting: token bucket w Redis

**Trudności:**
- Cache invalidation — "one of two hard problems in CS". Pattern: TTL + manual invalidate on write.
- Memory limits: Redis defaultuje 25% RAM. Set explicit `maxmemory` + eviction policy (`allkeys-lru`).
- Persistence: RDB snapshots vs AOF (Append-Only File). Dla queue — AOF; dla cache — można RDB lub nic.

---

#### `files` 🟢

**Co:** File storage — S3 / Cloudflare R2 / Backblaze B2.

**Approach:**
- **S3** (AWS) — standard, drogie przy outbound
- **Cloudflare R2** — S3-compatible API, **zero egress fees** (najlepsza opcja dla CDN)
- **Backblaze B2** — najtaniej do storage, drogie przy compute

**Workflow upload:**
- Frontend → Server (presigned URL request) → S3 (direct upload z presigned)
- Frontend → S3 z presigned URL (server tylko podpisuje, nie uploads)
- Po upload — server zapisuje URL w DB

**Trudności:**
- File size limits: HTTP requests ≤ 100 MB sensibly. Większe — multipart upload.
- Image processing: thumbnails, WebP conversion — Lambda lub Cloudflare Workers
- Permissions: ACL public vs private. Private = signed URLs z exp time.

---

#### `mixed` 🟡

**Co:** Kombinacja powyższych — np. Postgres dla danych transakcyjnych + Redis cache + S3 dla plików.

**Realna konfiguracja SaaS:**
- Postgres — main DB
- Redis — sessions, cache, rate limit
- S3/R2 — user uploads, generated reports
- Optionally Elasticsearch dla search

**Trudności:**
- Connection management: każdy serwis musi mieć healthy connection. Health checks + auto-reconnect.
- Cost monitoring: łatwo przeskoczyć budżet z 3 serwisami. Set up alerts.

---

### C.5 Integracje aplikacji (appIntegrations)

#### `payments` 🟡 (1 800 zł)

**Co:** Płatności one-time (Stripe / Przelewy24).

**Patrz B.3 Payment Gateways.** Dla aplikacji custom default = **Stripe** (najlepszy DX, międzynarodowy).

**Stripe Spring Boot:**
- `stripe-java` library
- Endpoint: `/api/payments/create-intent` → Stripe Payment Intent
- Webhook: `/api/payments/webhook` weryfikuje sygnaturę, updateuje status

**Stripe Next.js:**
- `stripe-node` (server) + `@stripe/stripe-js` (client)
- App Router: Server Action tworzy Payment Intent, zwraca `client_secret`
- Frontend: `<PaymentElement />` (Stripe Elements)

**Trudności:**
- SCA / 3D Secure: obowiązkowe w EU, Stripe robi automatycznie z Payment Intents
- Webhooks idempotent: Stripe retry → ten sam event 2× → twoja logika nie może doublować

**Czas:** 8-15h

---

#### `sms` 🟢 (700 zł)

**Co:** SMS notyfikacje (potwierdzenia, OTP, kody dostępu).

**Polski rynek:**
- **SMSAPI.pl** — najpopularniejszy w PL, REST API, ~0.10 zł/SMS
- **Twilio** — międzynarodowy, drogi w PL
- **Vonage** — alternative

**Approach (Spring/Node):**
- HTTP client → SMSAPI REST endpoint
- Templates: zachowaj w DB / config, nie hardcode
- Cost monitoring: limit per user per day

**Trudności:**
- Senderid: w PL musisz zarejestrować nadawcę "MOJA-FIRMA" w SMSAPI. Bez tego — fallback na numer.
- Delivery reports: webhook od SMSAPI z status `delivered/failed`. Retry przy `failed` z timeout 5min.
- GDPR: SMS to dane osobowe. Polityka prywatności musi wymieniać dostawcę.

**Czas:** 3-5h

---

#### `email` 🟢 (500 zł)

**Co:** Transactional email (potwierdzenia, reset hasła, faktury PDF).

**Providers:**
- **Resend** — modern, devops-friendly, 100 emaili/dzień free
- **Postmark** — najwyższa deliverability, $15/mc start
- **SendGrid** — duży gracz, free 100/dzień
- **AWS SES** — najtaniej przy skali, $0.10/1000 emaili

**Templates:**
- React Email (komponenty React → HTML email) — modern, type-safe
- MJML — responsive email framework
- Plaintext fallback zawsze

**Trudności:**
- SPF/DKIM/DMARC — bez tego emaile lecą do spamu. Setup zajmuje 30 min, krytyczne.
- Bounces / complaints: webhook z provider → mark email as `invalid`, stop sending
- Suppression lists: nigdy nie spamuj nawet po unsubscribe — ban od providera

**Czas:** 3-5h

---

#### `ai` 🟠 (3 000 zł)

**Co:** Integracja z AI — OpenAI / Anthropic Claude / lokalne LLMy.

**Use cases:**
- Chat / customer support
- Content generation (opisy produktów)
- Document summarization
- Classification / tagging
- Semantic search (z vector DB)

**Approach Next.js:**
- **Vercel AI SDK** — najlepszy DX, streaming, multiple providers
- `useChat` hook dla streaming chat UI
- Provider switching: OpenAI / Anthropic / Google Gemini jednym configiem

**Approach Spring Boot:**
- Spring AI (od 2024) — abstrakcja nad OpenAI/Anthropic
- WebClient (reactive) dla streaming
- Wektor stores: Pgvector (Postgres extension) lub Pinecone

**Trudności:**
- Token costs: GPT-4 ~$0.03/1k tokens. Łatwo zrobić bill $1000+/mc. Set hard limits per user.
- Rate limits: OpenAI 10k req/day default, trzeba aplikować o wyższe
- Hallucinations: AI zmyśla. Dla mission-critical odpowiedzi — RAG (Retrieval-Augmented Generation) z grounding w realnych dokumentach.
- Privacy: dane wysyłane do OpenAI/Anthropic. Klient enterprise wymaga `zero data retention` agreement.

**Czas:** 12-30h (zależnie od use case)

---

#### `external-api` 🟡 (1 200 zł)

**Co:** Integracja z dowolnym zewnętrznym API (CRM, ERP, marketing automation).

**Approach:**
- HTTP client (RestTemplate / WebClient w Spring, fetch / axios w Node)
- Service layer w aplikacji: `ExternalApiService` z metodami per endpoint
- Error handling: retry z exponential backoff (Resilience4j w Spring, axios-retry w Node)
- Caching: Redis dla read-heavy endpoints

**Trudności:**
- Rate limits: każde API inne, sprawdź docs. Implementuj rate limiter po stronie klienta.
- API key management: NIGDY w kodzie. Env vars, Vault, AWS Secrets Manager.
- API versioning: API klienta zmieni się — versioning w URL (`/v1/...`) lub headerze
- Webhooks (incoming): sprawdzaj sygnaturę! Inaczej każdy może udawać callback.

**Czas:** 6-12h per API

---

#### `websockets` 🟠 (2 200 zł)

**Co:** Real-time communication — chat, notifications, live updates, collaboration.

**Spring Boot approach:**
- Spring WebSocket + STOMP protocol
- `@MessageMapping` dla endpointów
- Auth: JWT w `CONNECT` frame headers

**Next.js approach:**
- Socket.io (najpopularniejszy, fallback do polling)
- **Lepsze dla Next.js:** Server-Sent Events (one-way, prostsze) lub Pusher / Ably (managed)

**Hosting issues:**
- Vercel nie wspiera WebSocket — używaj managed (Pusher/Ably) lub dedicated server
- Hetzner VPS + Socket.io to OK
- Scale: ~10k concurrent connections per Node.js process. Cluster mode lub Redis adapter dla horizontal scale.

**Trudności:**
- Reconnection: klient traci połączenie (mobile network), state desync. Implementuj resumable sessions.
- Auth: WebSocket nie ma headerów po connect. Pass JWT in connection URL query lub pierwszy message.
- Sticky sessions: load balancer musi kierować klienta do tego samego serwera. AWS ALB ma session affinity.

**Czas:** 12-25h

---

#### `rbac` 🟡 (11 700 zł)

**Co:** Role-Based Access Control — system ról i uprawnień.

**Spring Boot approach:**
- Spring Security `@PreAuthorize` annotations
- Roles w DB (`User -> UserRole -> Role -> Permission`)
- Method-level security: `@PreAuthorize("hasRole('ADMIN')")`
- Resource-level: `@PreAuthorize("hasPermission(#document, 'WRITE')")`

**Next.js approach:**
- Middleware (`middleware.ts`) sprawdza role z session
- Server Components: `if (!user.hasRole('admin')) redirect('/')`
- Permission lib: **CASL** (popularny, deklaratywne reguły)

**Trudności:**
- Permissions design: 50+ uprawnień przy złożonej aplikacji. Grupuj w roles + per-resource permissions.
- Frontend hiding vs backend enforcing: UI ukrywa przycisk "delete" dla non-admin, ALE backend MUSI też sprawdzić. UI to hint, backend to truth.
- Audit log: kto, co, kiedy zrobił. Append-only table w DB.

**Czas:** 30-60h dla realistycznej implementacji

---

#### `admin-panel` 🟠 (23 400 zł)

**Co:** Panel admin z CRUD + filtry + bulk actions + search + export.

**Approach Spring + Next.js:**
- Backend: REST/GraphQL API per resource
- Frontend: Custom React components LUB low-code (Refine, React-admin)
- **Refine** — open-source admin framework, łączy z dowolnym backendem
- Tabela: TanStack Table (sortowanie, paginacja, filtry)
- Forms: React Hook Form + Zod

**Trudności:**
- Każdy zasób różny: User, Order, Product — kombinacje pól, walidacji
- Performance przy 100k+ records: server-side pagination, sortowanie, filtrowanie. Nigdy client-side dla dużych tabel.
- Inline editing: każda zmiana = API call → walidacja → optimistic update + rollback przy błędzie
- Bulk actions: "delete 50 selected" — soft delete + confirmation modal + undo

**Czas:** 80-200h dla pełnego admin'a z 5-10 zasobami

---

#### `i18n` 🟡 (9 000 zł)

**Co:** Wielojęzyczność backendu (komunikaty błędów, emaile, generated PDFs).

**Spring approach:**
- `MessageSource` + `messages_pl.properties`, `messages_en.properties`
- `LocaleResolver` based on Accept-Language header
- Date/number formatting via `MessageFormat`

**Next.js approach:**
- **next-intl** — najlepszy w 2024/2025
- Tłumaczenia w JSON per locale (`messages/pl.json`, `messages/en.json`)
- Server Components: `await getTranslations('namespace')`
- Client Components: `useTranslations('namespace')`

**Trudności:**
- Plural rules: 1 produkt vs 2 produkty vs 5 produktów. Język polski ma 3 plural forms — `next-intl` obsługuje przez ICU MessageFormat.
- Database content: nazwy produktów, opisy. Dwie opcje: per-row columns (`name_pl`, `name_en`) lub osobna tabela `translations`. Druga bardziej skalowalna.
- Date/time/currency: różne formaty per locale. Używaj `Intl.NumberFormat`, `Intl.DateTimeFormat`.
- RTL languages (arabski) — flexbox + `dir="rtl"`. Większość projektów PL to pomija.

**Czas:** 30-80h zależnie od zakresu (UI / DB / emails)

---

#### `rest-openapi` 🟢 (19 800 zł)

**Co:** REST API z dokumentacją OpenAPI 3.0 (Swagger).

**Spring approach:**
- Spring Web (`@RestController`, `@RequestMapping`)
- `springdoc-openapi` library — generuje OpenAPI z annotacji
- Swagger UI dostępne na `/swagger-ui.html`

**Next.js approach:**
- API routes / Server Actions
- `next-openapi` lub manual `openapi.yaml`
- Generowanie types: `openapi-typescript` (TS types z YAML)

**Trudności:**
- API design: REST principles (resources, HTTP methods, status codes). Łatwo zrobić "RPC-style w HTTP" zamiast prawdziwego REST.
- Versioning: `/v1/users` vs `Accept: application/vnd.api+json;version=1`. URL versioning prostsze, ale brzydsze.
- Pagination: cursor-based (lepsze dla performance) vs offset (prostsze). Default: cursor.
- Validation: input → DTO + validation (Bean Validation w Spring, Zod w Node). Errors → 400 z details w body.

**Czas:** 60-200h zależnie od liczby endpointów

---

#### `graphql` 🟠 (23 400 zł)

**Co:** GraphQL API zamiast REST.

**Spring approach:**
- Spring for GraphQL + GraphQL Java
- Schema w `.graphqls` files (SDL)
- Resolvers: `@QueryMapping`, `@MutationMapping`

**Next.js approach:**
- **Apollo Server** w API route
- **GraphQL Yoga** — alternative, lżejsze
- Schema-first vs code-first: code-first lepszy z TypeScript (`graphql-tools`, `nexus`)

**Trudności:**
- N+1 problem: query z relations → N+1 SQL queries. **DataLoader** to standard solution (batching).
- Authorization per field: różne pola wymagają różnych uprawnień. Resolver-level checks.
- Caching: GraphQL trudniejszy niż REST do cache'owania. Apollo Client cache po stronie klienta.
- Schema evolution: nie usuwaj fieldów, mark `@deprecated` i kontynuuj wsparcie

**Czas:** 80-220h

---

#### `export-files` 🟢 (6 800 zł)

**Co:** Eksport danych do PDF / Excel / CSV.

**PDF:**
- **react-pdf** (Next.js) — komponenty React → PDF
- **iText** / **Apache PDFBox** (Java) — bardziej zaawansowane
- **DomPDF** (PHP, WP) — HTML → PDF

**Excel:**
- **SheetJS** / **xlsx** (Node) — read + write xlsx
- **Apache POI** (Java) — standard dla Excel w Spring

**CSV:**
- Natywnie w obu — string concatenation z escapingiem
- Library: `papaparse` (Node), `OpenCSV` (Java)

**Trudności:**
- Large datasets: 100k+ rows w Excel → memory pressure. **Streaming write** zamiast in-memory.
- Encoding CSV: UTF-8 BOM dla Excel (inaczej polskie znaki łamie się)
- PDF z tabelami: TCPDF / react-pdf wymaga manual layout dla wielostronicowych tabel z headerami

**Czas:** 24-60h zależnie od liczby formatów i złożoności

---

#### `import-mass` 🟡 (9 000 zł)

**Co:** Masowy import danych z CSV/Excel (np. import produktów, klientów).

**Approach:**
- Upload file → walidacja format
- Parse → row-by-row validation (Zod / Bean Validation)
- Error report: które wiersze błędne i dlaczego
- Bulk insert: batches po 1000 rows (nie pojedynczo)
- Async processing: większe pliki → queue (BullMQ / Spring Batch)

**Trudności:**
- Walidacja per row: foreign keys, unique constraints, format. Lepiej validate-then-insert niż insert-and-rollback.
- Encoding: Windows CSV exports często ISO-8859-2, nie UTF-8. Detect + convert.
- Duplicates handling: skip vs update vs error — option dla użytkownika
- Performance: 50k rows w 1 minute = OK; 50k w 1 hour = nie OK. Profilowanie i optimization.

**Czas:** 30-80h

---

#### `push-notifications` 🟡 (9 000 zł)

**Co:** Push notifications na mobile / desktop / web.

**Approach:**
- **Firebase Cloud Messaging (FCM)** — Android + iOS (przez APNs)
- **Apple Push Notification service (APNs)** — direct dla iOS
- **Web Push API** — przeglądarki (Service Worker)
- **OneSignal** (managed) — łatwiejsze, ale subskrypcja

**Workflow:**
1. Client subskrybuje (request permission) → token
2. Token → server (zapis do DB)
3. Trigger event → send notification z FCM/APNs
4. Klient odbiera, klika → deep link do aplikacji

**Trudności:**
- Tokens expire: FCM/APNs co jakiś czas refreshuje. Webhook na invalid token → remove from DB.
- Permission UX: jeśli user odmówi raz, hard to convince later. Pokazuj prompt w odpowiednim momencie (po user action, nie on page load).
- Batching: 1M notifications nie w 1 request. FCM ma multicast (do 500 tokens per request).
- Apple Developer: iOS push wymaga $99/year Apple Developer Program.

**Czas:** 30-80h

---

#### `search-elastic` 🔴 (23 400 zł)

**Co:** Full-text search z Elasticsearch.

**Approach:**
- Elasticsearch self-hosted (Hetzner VPS) lub managed (Elastic Cloud, AWS OpenSearch)
- Index per entity (`products`, `users`, `documents`)
- Sync: DB → ES (real-time via change data capture lub batch cron)
- Library: `elasticsearch-java`, `@elastic/elasticsearch` (Node)

**Trudności:**
- Memory hungry: Elasticsearch wymaga 4+ GB RAM dla średnich indeksów
- Index design: analyzers per język (polski analyzer dla stopwords, stemming)
- Sync consistency: jak DB → ES sync. CDC (Debezium) najlepsze, ale skomplikowane. Cron job prostsze, ale opóźnienia.
- Cost: managed Elastic Cloud od $95/mc start. Self-host = czas administracji.
- Alternatywy: **Meilisearch** (lżejsze, open source, polski stemming) lub **Typesense**

**Czas:** 80-200h

---

#### `upload-s3` 🟢 (9 000 zł)

**Co:** Upload plików do S3 / R2 / B2 z aplikacji.

**Approach:**
- Frontend: file input + chunked upload dla większych plików
- Backend: presigned URL endpoint → klient uploaduje bezpośrednio do S3
- Po upload: callback do backendu z URL → zapis w DB

**Multipart upload (>100 MB files):**
- AWS SDK obsługuje natywnie
- Wymaga init → parts → complete

**Trudności:**
- Security: presigned URLs ważne ~15 min, nigdy permanent
- File type validation: client-side hint, server-side check (magic bytes, nie tylko extension)
- Virus scanning: ClamAV lub managed (Sophos, Cloudmark) dla user uploads
- Image processing: thumbnails, WebP — Lambda lub Cloudflare Workers po upload
- CDN: serve files przez CloudFront / Cloudflare zamiast bezpośrednio z S3 (taniej, szybciej)

**Czas:** 16-30h

---

#### `stripe-subs` 🟠 (16 200 zł)

**Co:** Płatności subskrypcyjne ze Stripe (SaaS pricing models).

**Approach:**
- Stripe Products & Prices (pricing tiers)
- Stripe Checkout (hosted) lub Stripe Elements (embedded)
- Customer Portal: gotowy panel klienta do anulowania / upgrade
- Webhooks: `customer.subscription.*` events → sync z DB

**Pricing models:**
- Flat fee per month/year
- Per-seat (mnożnik × liczba użytkowników)
- Usage-based (metered billing)
- Tiered (do 100 użytkowników $X, 100-500 $Y)

**Trudności:**
- Failed payments: Stripe Smart Retries (3 attempts over 2 weeks) + dunning emails + grace period
- Pro-ration: klient zmienia plan w środku miesiąca, Stripe oblicza credit. Webhook `invoice.created` z pro-ration items.
- Free trial → paid: webhook `customer.subscription.trial_will_end` 3 dni wcześniej → email reminder
- Tax compliance: Stripe Tax (premium) automatically applies VAT EU. Bez tego — własna logika.
- Refunds: pro-rated lub full. Policy decyzja klienta.

**Czas:** 30-80h

---

### C.6 Role users (roles: number)

**Co:** Liczba ról użytkowników (admin, manager, employee, client).

**Implementacja:** Patrz `rbac` integration wyżej.

**Trudności:**
- Roles hierarchy: admin > manager > employee. Manager dziedziczy permissions employee? Zależy od decyzji designerskiej.
- Multi-role: user może mieć kilka ról. Permissions = union of all roles' permissions.
- Tenant isolation: w multi-tenant SaaS, admin tenant A nie widzi danych tenant B. Postgres RLS lub manual `WHERE tenant_id = ?` wszędzie.

**Czas:** 4-8h per dodatkowa rola (powyżej 2 podstawowych)

---

### C.7 Mobile (mobile: boolean)

**Co:** Wersja mobile aplikacji (native iOS/Android lub Progressive Web App).

**Native approach (8 000 zł baseline):**
- **React Native** + Expo — share code z Next.js
- **Flutter** — Dart, performance lepszy niż RN, mniejsze community

**PWA approach (0 zł — wliczone w aplikację web):**
- Service Worker + Web App Manifest
- Install promotion w iOS / Android
- Offline capability via cache
- Push notifications (Web Push API)
- Ograniczenia: brak natywnych API (Bluetooth, NFC, deep iOS integrations)

**Trudności:**
- Native = osobny codebase, osobny deployment, App Store / Play Store fees + review
- PWA = często wystarcza dla 80% use cases
- iOS Safari ma ograniczenia w PWA (no offline cache dla iOS <15)

**Czas:** 60-200h native, 8-20h PWA

---

## D. WSPÓLNE opcje

### D.1 Design Tier (designTier: lite/standard/premium)

| Tier | Co oznacza | Czas |
|---|---|---|
| **lite** | Gotowy szablon / starter kit, light customization (kolory, logo, fonts) | 4-8h |
| **standard** | Custom theme (WP) lub custom Next.js layout, własne komponenty marki | 16-40h |
| **premium** | Pełny design system, Figma → kod, custom animacje, perfekcja UX/UI | 60-150h |

**Trudności:**
- Lite + klient żąda zmian "jak custom" — scope creep. Komunikuj wcześnie.
- Premium z brand book — sprawdź czy klient ma. Jeśli nie — design system trzeba stworzyć (osobna usługa).
- "Pixel perfect z Figmy" — Figma rzadko ma wszystkie stany (hover, error, empty, loading). Negocjuj wcześnie.

---

### D.2 Wielojęzyczność (languages: number)

**Patrz C.5 i18n.**

**WP approach:**
- **WPML** ($99/year) — najpopularniejszy, content + UI translations
- **Polylang** (free + Pro) — lżejsze, free wystarcza dla wielu projektów
- **TranslatePress** — visual translator, dla klienta przyjazne

**Next.js approach:**
- **next-intl** — modern, App Router-friendly
- **next-i18next** — starszy, ale stabilny

**Trudności:**
- 30-50% nakładu projektu dochodzi z 2 język (treści, hreflang, testy)
- Tłumaczenia: AI (ChatGPT/DeepL) + post-editing 800 zł/40k zzs lub biuro 2 600 zł/40k zzs
- SEO hreflang dla różnych domen (klient.pl vs klient.com vs klient.de): subtleties

---

### D.3 Hosting

| Option | Cena/mc | Use case |
|---|---|---|
| **client** | 0 zł | Klient ma własne (cyber_Folks, OVH, własny serwer) |
| **vercel** | 85 zł / seat (Pro) | Next.js apps, projekty z preview deployments |
| **vps** | 50-220 zł | Hetzner CX22 (75 zł) MVP, większe deployments do 220 zł |

**Trudności:**
- Vercel egress fees: Pro plan 1 TB bandwidth/mc free. Przekroczenie $0.40/GB. Sklepy z dużym ruchem mogą szybko nazbierać.
- VPS administration: aktualizacje OS, security patches, backupy — Twoja odpowiedzialność (lub pakiet utrzymania!)
- DNS / domain: zawsze przez Cloudflare (free CDN + DDoS protection)
- SSL: Let's Encrypt auto-renew. Sprawdź czy nie wygasł.

---

### D.4 Support (supportTier: none/basic/pro)

| Tier | Co zawiera | Cena/mc |
|---|---|---|
| **none** | Brak po wdrożeniu | 0 zł |
| **basic** | Aktualizacje, backupy, monitoring uptime | 240 zł |
| **pro** | Basic + 2h dev/mc + SLA 24h reakcji | 640 zł |

**Patrz wcześniejszy plan pakietów utrzymania.**

---

### D.5 Timeline (normal/rush)

**Normal:** Standardowy czas dostawy zgodnie z estymacją per pakiet.

**Rush:** +25% ceny, czas dostawy -30-40%.

**Trudności rush:**
- Ty pracujesz dłużej (12h dni, weekendy)
- Bufor na poprawki mniejszy — testowanie ograniczone
- Większe ryzyko bugów po wdrożeniu
- Komunikuj klientowi że rush ≠ perfect quality

---

## Kolejność implementacji (gdy uczysz się nowej kategorii)

### Strona — kolejność opanowywania
1. ✅ Już umiesz: form, analytics, map, blog-cms, seo-onpage (basic dla wszystkich)
2. 🟢 Łatwe do nauczenia: newsletter, chat, rodo-pack, cwv-basic
3. 🟡 Wymaga ćwiczenia: animations-medium, multistep-form, wcag-aa
4. 🟠 Większe projekty: configurator, animations-premium, cwv-full, seo-tech-full
5. 🔴 Dedykowane: booking (full custom)

### Sklep — kolejność opanowywania
1. ✅ Podstawa: courier (InPost), payments (P24), omnibus, vat-faktury, nip-gus
2. 🟢 Łatwe pluginy: newsletter (MailerLite), allegro (WP Desk), reviews (Trustmate)
3. 🟡 Średnie: baselinker-basic, ceneo-google, ksef (przez Fakturownię), loyalty
4. 🟠 Złożone: baselinker-std, subiekt jednostronna, dropshipping, wholesale-xml
5. 🔴 Dedykowane: subiekt dwustronna, comarch, multi-warehouse, product-configurator z 3D

### Aplikacja — kolejność opanowywania
1. ✅ Podstawa: email auth, REST API, Postgres, Stripe payments, email transactional
2. 🟢 Wbudowane w frameworki: RBAC basic, files upload (S3), admin panel basic
3. 🟡 Standard: OAuth, websockets, sms, external-api, i18n
4. 🟠 Złożone: rbac z hierarchy, admin panel z 5+ resources, push notifications, ai integration
5. 🔴 Specjalizacja: SSO/SAML, GraphQL, Elasticsearch, native mobile, subscription billing
