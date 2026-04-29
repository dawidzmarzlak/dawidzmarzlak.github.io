// Wariant C v2 — Bento Maximalist + kalkulator + serif italic
// Bazuje na C, dodaje kalkulator z A i typograficzne smaczki (Instrument Serif italic).
// + i18n PL/EN, + mobile responsive, + uproszczona prawa kolumna hero (jeden combo-card).

const VC_I18N = {
  pl: {
    nav: { services: 'Usługi', portfolio: 'Portfolio', process: 'Proces', faq: 'FAQ', contact: 'Kontakt', cta: 'Wycena →' },
    hero: {
      tag: 'Available · 5+ lat doświadczenia',
      h1a: 'Tworzę', h1b: 'strony', h1c: 'które potrafią', h1d: 'zarabiać.',
      lead: ['IT Solutions', ' — pracownia stron, sklepów i aplikacji. Rozwiązania, z których codziennie korzystają tysiące użytkowników. Stack dopasowany do problemu — nie odwrotnie.'],
      cta: 'Wycena →',
    },
    calc: {
      title: '// Kalkulator wyceny',
      live: 'live',
      type: 'Typ projektu',
      pages: 'Liczba podstron',
      cms: 'Edycja przez CMS',
      out: 'Szacunkowo od',
      currency: 'PLN',
      scale: 'Tysiące codziennych użytkowników na produkcji',
      scaleLabel: '+/dzień',
      types: { next: 'Next', wp: 'WP', woo: 'Woo', presta: 'Presta', app: 'App' },
    },
    sections: {
      services: { kicker: '[01] Usługi', title: ['Pięć stosów. ', 'Jeden senior', '. Twój projekt.'], cta: 'Wszystkie usługi →' },
      about: { kicker: '[02] O pracowni', title: ['Pięć lat. ', 'Tysiące', ' użytkowników. Zero zniknięć.'] },
      portfolio: { kicker: '[03] Portfolio', title: ['Sześć projektów, które ', 'poszły', ' na produkcję.'], cta: 'Wszystkie realizacje →' },
      testi: { kicker: '[04] Opinie', title: ['Co mówią ', 'klienci', '.'] },
      process: { kicker: '[05] Proces', title: ['Od briefu do ', 'live', '.'] },
      faq: { kicker: '[06] FAQ', title: ['Pytania, które ', 'najczęściej słyszę', '.'] },
    },
    services: [
      { num: '[01]', title: 'Strony Next.js', desc: 'Aplikacje React z SSR, ISR i edge runtime. Lighthouse 95+, TTI poniżej 2 s. Idealne dla SaaS, marketingu, dashboardów.' },
      { num: '[02]', title: 'WordPress', desc: 'Headless lub klasyczny. Edycja, której zespół faktycznie używa.' },
      { num: '[03]', title: 'WooCommerce', desc: 'Sklepy do 50k SKU, integracje z magazynem, kurierami, Allegro.' },
      { num: '[04]', title: 'Presta\nShop', desc: '' },
      { num: '[05]', title: 'Aplikacje webowe', desc: 'Spring Boot + React/Angular. SSO, RBAC, audyt — gotowe na produkcję enterprise.' },
    ],
    about: {
      bigLabel: '// elastyczność',
      big: ['Dopasowuję rozwiązanie do ', 'Twoich potrzeb', ' — nie odwrotnie.'],
      stat1: { label: '// experience', num: '5+', foot: 'lat doświadczenia komercyjnego, w tym z dużymi firmami' },
      stat2: { label: '// scale', num: '1k+', foot: 'aktywnych użytkowników korzystających z moich rozwiązań co dzień' },
      quote: { label: '// klient · 2024', text: 'Czas ładowania spadł 4×, sprzedaż wzrosła o 187% w pierwszym kwartale.', name: 'Anna Kowalska', role: 'CEO, FashionHub' },
      stat3: { label: '// stack', num: '8+', foot: 'technologii frontend, backend, CMS i e-commerce w aktywnym użyciu' },
      stat4: { label: '// rating', num: '5★', foot: 'średnia ocena klientów. 100% projektów wdrożonych na produkcję' },
    },
    projects: [
      { name: 'FashionHub', cat: 'E-commerce', year: '2024', metric: '+187%', tone: 'dark' },
      { name: 'TechCorp', cat: 'Korporacyjny', year: '2024', metric: 'LCP 1.2s', tone: 'light' },
      { name: 'MediClinic', cat: 'Aplikacja', year: '2023', metric: '12k pacjentów', tone: 'accent' },
      { name: 'HomeDesign', cat: 'WooCommerce', year: '2023', metric: '2400 SKU', tone: 'light' },
      { name: 'EduPlatform', cat: 'EdTech', year: '2023', metric: '8k studentów', tone: 'dark' },
      { name: 'FoodDelivery', cat: 'Marketplace', year: '2022', metric: '150+ restauracji', tone: 'accent' },
    ],
    testimonials: [
      { q: 'Strona przekroczyła nasze oczekiwania. Czas ładowania spadł z 4,2 s do 1,1 s, sprzedaż w pierwszym kwartale po wdrożeniu wzrosła o 187%.', name: 'Anna Kowalska', role: 'CEO, FashionHub', avatar: 'AK', size: 'big' },
      { q: 'Migracja z monolitu na headless. LCP z 5 s na 1,2 s — redaktorzy pracują 3× szybciej.', name: 'Piotr Nowak', role: 'Head of Marketing, TechCorp', avatar: 'PN', size: 'med' },
      { q: '12 000 pacjentów / mc. Zero downtime od 14 miesięcy. Dokumentacja, której naprawdę używamy.', name: 'Dr K. Wiśniewska', role: 'Dyrektor Med., MediClinic', avatar: 'KW', size: 'med' },
      { q: 'Konfigurator 3D mebli + WooCommerce. 2 400 SKU, multi-currency, faktury VAT — wszystko działa z poziomu jednego panelu.', name: 'Michał Zieliński', role: 'Founder, HomeDesign', avatar: 'MZ', size: 'lite' },
    ],
    process: {
      label: '// pipeline',
      h: ['Siedem kroków. ', 'Bez niespodzianek', '.'],
      steps: [
        ['Konsultacja', 'Bezpłatne 30 min. Brief, cele, KPI.'],
        ['Wycena', 'Stała cena lub T&M. Harmonogram.'],
        ['UX/UI', 'Wireframe → Figma hi-fi.'],
        ['Development', 'Sprinty 2-tyg. Demo co piątek.'],
        ['Testy', 'E2E, perf, a11y, security.'],
        ['Wdrożenie', 'CI/CD, SSL, monitoring.'],
        ['Wsparcie', '6 mies. w cenie. SLA opcjonalne.'],
      ],
    },
    faq: {
      side: ['Nie znalazłeś swojego pytania? ', 'Napisz do mnie →'],
      items: [
        ['Ile trwa realizacja projektu?', 'Wizytówka: 3–4 tyg. Sklep: 6–10 tyg. Aplikacja: od 12 tyg. Każdy projekt dostaje dokładny harmonogram tygodniowy.'],
        ['Ile kosztuje strona internetowa?', 'Wizytówka od 5 500 PLN, sklep od 9 500 PLN, aplikacja od 18 000 PLN. Dokładna wycena w 48h od briefu.'],
        ['Czy oferujecie hosting?', 'Tak — Vercel, AWS, OVH lub własny VPS. Doradzam najlepsze rozwiązanie dla danego stacku i budżetu.'],
        ['Czy mogę edytować stronę samodzielnie?', 'Każdy projekt ma CMS (WordPress, Sanity, Strapi) lub panel admina. Po wdrożeniu prowadzę szkolenie + dokumentacja.'],
        ['Co z SEO?', 'Schema.org, meta, OG, sitemap, robots, Lighthouse 95+. Wszystko domyślnie. Plus audyt po wdrożeniu.'],
      ],
    },
    cta: { h: 'Porozmawiajmy.', p: 'Bezpłatna 30-minutowa konsultacja. Wracam z wyceną w 48h. Bez prezentacji, bez handlowca w pętli.', primary: 'Umów konsultację →' },
    footer: {
      brand: 'IT Solutions', desc: 'Pracownia stron, sklepów i aplikacji webowych. Warszawa, działam zdalnie w całej UE.',
      colServices: 'Usługi', colStudio: 'Pracownia', colContact: 'Kontakt',
      links: { studio: ['O nas', 'Portfolio', 'Blog', 'Cennik'], services: ['Next.js', 'WordPress', 'E-commerce', 'Aplikacje'] },
      copy: '© 2026 IT Solutions. Wszystkie prawa zastrzeżone.',
      legal: 'NIP: 000-000-00-00 · Polityka prywatności',
    },
    menu: 'Menu', close: 'Zamknij',
  },
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', process: 'Process', faq: 'FAQ', contact: 'Contact', cta: 'Get a quote →' },
    hero: {
      tag: 'Available · 5+ years of experience',
      h1a: 'I build', h1b: 'websites', h1c: 'that actually', h1d: 'earn.',
      lead: ['IT Solutions', ' — a studio for websites, shops and web apps. Solutions used daily by thousands of users. Stack tailored to the problem — not the other way around.'],
      cta: 'Get a quote →',
    },
    calc: {
      title: '// Quote calculator',
      live: 'live',
      type: 'Project type',
      pages: 'Number of pages',
      cms: 'CMS editing',
      out: 'Estimated from',
      currency: 'PLN',
      scale: 'Thousands of daily users in production',
      scaleLabel: '+/day',
      types: { next: 'Next', wp: 'WP', woo: 'Woo', presta: 'Presta', app: 'App' },
    },
    sections: {
      services: { kicker: '[01] Services', title: ['Five stacks. ', 'One senior', '. Your project.'], cta: 'All services →' },
      about: { kicker: '[02] About', title: ['Five years. ', 'Thousands', ' of users. Zero ghosting.'] },
      portfolio: { kicker: '[03] Portfolio', title: ['Six projects that ', 'shipped', ' to production.'], cta: 'All work →' },
      testi: { kicker: '[04] Testimonials', title: ['What ', 'clients', ' say.'] },
      process: { kicker: '[05] Process', title: ['From brief to ', 'live', '.'] },
      faq: { kicker: '[06] FAQ', title: ['Questions ', 'I hear most often', '.'] },
    },
    services: [
      { num: '[01]', title: 'Next.js sites', desc: 'React apps with SSR, ISR and edge runtime. Lighthouse 95+, TTI under 2s. Ideal for SaaS, marketing, dashboards.' },
      { num: '[02]', title: 'WordPress', desc: 'Headless or classic. Editing your team will actually use.' },
      { num: '[03]', title: 'WooCommerce', desc: 'Shops up to 50k SKUs, integrations with warehouse, couriers, Allegro.' },
      { num: '[04]', title: 'Presta\nShop', desc: '' },
      { num: '[05]', title: 'Web apps', desc: 'Spring Boot + React/Angular. SSO, RBAC, audit — ready for enterprise production.' },
    ],
    about: {
      bigLabel: '// flexibility',
      big: ['I tailor the solution to ', 'your needs', ' — not the other way around.'],
      stat1: { label: '// experience', num: '5+', foot: 'years of commercial experience, including with large companies' },
      stat2: { label: '// scale', num: '1k+', foot: 'active users using my solutions every single day' },
      quote: { label: '// client · 2024', text: 'Load time dropped 4×, sales grew 187% in the first quarter.', name: 'Anna Kowalska', role: 'CEO, FashionHub' },
      stat3: { label: '// stack', num: '8+', foot: 'frontend, backend, CMS and e-commerce technologies in active use' },
      stat4: { label: '// rating', num: '5★', foot: 'average client rating. 100% of projects shipped to production' },
    },
    projects: [
      { name: 'FashionHub', cat: 'E-commerce', year: '2024', metric: '+187%', tone: 'dark' },
      { name: 'TechCorp', cat: 'Corporate', year: '2024', metric: 'LCP 1.2s', tone: 'light' },
      { name: 'MediClinic', cat: 'Web app', year: '2023', metric: '12k patients', tone: 'accent' },
      { name: 'HomeDesign', cat: 'WooCommerce', year: '2023', metric: '2400 SKU', tone: 'light' },
      { name: 'EduPlatform', cat: 'EdTech', year: '2023', metric: '8k students', tone: 'dark' },
      { name: 'FoodDelivery', cat: 'Marketplace', year: '2022', metric: '150+ restaurants', tone: 'accent' },
    ],
    testimonials: [
      { q: 'The site exceeded our expectations. Load time dropped from 4.2s to 1.1s, sales grew 187% in the first quarter after launch.', name: 'Anna Kowalska', role: 'CEO, FashionHub', avatar: 'AK', size: 'big' },
      { q: 'Migration from monolith to headless. LCP from 5s to 1.2s — editors work 3× faster.', name: 'Piotr Nowak', role: 'Head of Marketing, TechCorp', avatar: 'PN', size: 'med' },
      { q: '12,000 patients / month. Zero downtime for 14 months. Documentation we actually use.', name: 'Dr K. Wiśniewska', role: 'Medical Director, MediClinic', avatar: 'KW', size: 'med' },
      { q: '3D furniture configurator + WooCommerce. 2,400 SKUs, multi-currency, VAT invoices — all from one panel.', name: 'Michał Zieliński', role: 'Founder, HomeDesign', avatar: 'MZ', size: 'lite' },
    ],
    process: {
      label: '// pipeline',
      h: ['Seven steps. ', 'No surprises', '.'],
      steps: [
        ['Consultation', 'Free 30 min. Brief, goals, KPIs.'],
        ['Quote', 'Fixed price or T&M. Timeline.'],
        ['UX/UI', 'Wireframe → Figma hi-fi.'],
        ['Development', '2-week sprints. Demo every Friday.'],
        ['Testing', 'E2E, perf, a11y, security.'],
        ['Deployment', 'CI/CD, SSL, monitoring.'],
        ['Support', '6 months included. Optional SLA.'],
      ],
    },
    faq: {
      side: ['Didn\'t find your question? ', 'Write to me →'],
      items: [
        ['How long does a project take?', 'Brochure site: 3–4 weeks. Shop: 6–10 weeks. App: from 12 weeks. Every project gets a precise weekly timeline.'],
        ['How much does a website cost?', 'Brochure from 5,500 PLN, shop from 9,500 PLN, app from 18,000 PLN. Detailed quote in 48h from the brief.'],
        ['Do you offer hosting?', 'Yes — Vercel, AWS, OVH or your own VPS. I recommend the best option for your stack and budget.'],
        ['Can I edit the site myself?', 'Every project has a CMS (WordPress, Sanity, Strapi) or admin panel. After launch I run training + documentation.'],
        ['What about SEO?', 'Schema.org, meta, OG, sitemap, robots, Lighthouse 95+. All by default. Plus a post-launch audit.'],
      ],
    },
    cta: { h: 'Let\'s talk.', p: 'Free 30-minute consultation. Quote back in 48h. No slide decks, no sales loop.', primary: 'Book a call →' },
    footer: {
      brand: 'IT Solutions', desc: 'Studio for websites, shops and web apps. Warsaw, working remotely across the EU.',
      colServices: 'Services', colStudio: 'Studio', colContact: 'Contact',
      links: { studio: ['About', 'Portfolio', 'Blog', 'Pricing'], services: ['Next.js', 'WordPress', 'E-commerce', 'Web apps'] },
      copy: '© 2026 IT Solutions. All rights reserved.',
      legal: 'VAT: 000-000-00-00 · Privacy policy',
    },
    menu: 'Menu', close: 'Close',
  },
};

const VariantC = () => {
  const [hoverProj, setHoverProj] = React.useState(null);
  const [openFaq, setOpenFaq] = React.useState(0);
  const [calcType, setCalcType] = React.useState('next');
  const [calcPages, setCalcPages] = React.useState(8);
  const [calcCMS, setCalcCMS] = React.useState(true);
  const [lang, setLang] = React.useState('pl');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [mobilePreview, setMobilePreview] = React.useState(false);
  const t = VC_I18N[lang];

  const heroBlobRef = React.useRef(null);
  useParallax(heroBlobRef, 0.18);
  useReveal('.vc .reveal', []);

  const basePrice = { next: 8500, wp: 5500, woo: 9500, presta: 12000, app: 18000 };
  const price = basePrice[calcType] + (calcPages - 1) * 600 + (calcCMS ? 1500 : 0);

  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.vc .reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`vc site-frame ${mobilePreview ? 'vc-mobile-mode' : ''}`} lang={lang}>
      <style>{`
        .vc { font-family: var(--font-sans); }

        /* === NAV === */
        .vc-nav { position: sticky; top: 0; z-index: 60; background: var(--bg); border-bottom: 1px solid var(--line); }
        .vc-nav-in { max-width: 1400px; margin: 0 auto; padding: 18px 36px; display: flex; align-items: center; gap: 36px; }
        .vc-logo { font-size: 18px; font-weight: 700; letter-spacing: -0.03em; display: flex; align-items: center; gap: 12px; color: var(--fg); text-decoration: none; }
        .vc-logo-mark { width: 36px; height: 36px; background: var(--accent); color: var(--accent-fg); display: grid; place-items: center; border-radius: 50%; font-weight: 800; font-size: 18px; }
        .vc-nav-links { display: flex; gap: 28px; margin-left: auto; font-size: 14px; font-weight: 500; }
        .vc-nav-links a { color: var(--fg); text-decoration: none; opacity: 0.7; transition: opacity 0.15s; }
        .vc-nav-links a:hover { opacity: 1; }
        .vc-nav-cta { padding: 10px 18px; background: var(--accent); color: var(--accent-fg); font-size: 13px; font-weight: 700; border-radius: 999px; text-decoration: none; }

        /* Language switcher */
        .vc-lang { display: inline-flex; align-items: center; padding: 3px; background: rgba(255,255,255,0.04); border: 1px solid var(--line); border-radius: 999px; font-family: var(--font-mono); }
        .vc-lang button { background: transparent; border: 0; color: var(--fg-muted); padding: 5px 10px; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; border-radius: 999px; font-family: inherit; transition: all 0.15s; }
        .vc-lang button.on { background: var(--accent); color: var(--accent-fg); }
        .vc-lang button:not(.on):hover { color: var(--fg); }

        /* Mobile preview toggle */
        .vc-mobile-toggle { width: 36px; height: 36px; border: 1px solid var(--line); background: transparent; border-radius: 50%; cursor: pointer; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.15s; }
        .vc-mobile-toggle:hover { border-color: var(--fg-muted); }
        .vc-mobile-toggle.on { background: var(--accent); border-color: var(--accent); }

        /* Mobile preview frame — simulates 390px viewport inside artboard */
        .vc.vc-mobile-mode { background: #18181a; padding: 0; }
        .vc.vc-mobile-mode > .vc-nav { position: sticky; top: 0; }

        /* Hamburger */
        .vc-burger { display: none; width: 40px; height: 40px; border: 1px solid var(--line); background: transparent; border-radius: 10px; cursor: pointer; padding: 0; align-items: center; justify-content: center; }
        .vc-burger-bars { width: 18px; height: 12px; position: relative; }
        .vc-burger-bars::before, .vc-burger-bars::after { content: ''; position: absolute; left: 0; right: 0; height: 1.5px; background: var(--fg); transition: transform 0.25s; }
        .vc-burger-bars::before { top: 0; }
        .vc-burger-bars::after { bottom: 0; }
        .vc-burger.on .vc-burger-bars::before { transform: translateY(5px) rotate(45deg); }
        .vc-burger.on .vc-burger-bars::after { transform: translateY(-5px) rotate(-45deg); }

        /* Mobile menu sheet */
        .vc-mobile-sheet { display: none; }

        /* === HERO === */
        .vc-hero { max-width: 1400px; margin: 0 auto; padding: 48px 36px; }
        .vc-hero-grid { display: grid; grid-template-columns: 6fr 4fr; gap: 16px; }
        .vc-hero-main { background: var(--bg-card); border-radius: 24px; padding: 40px; min-height: 620px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
        .vc-hero-main::before {
          content: ''; position: absolute; bottom: -200px; right: -200px; width: 500px; height: 500px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 60%);
          opacity: 0.18; filter: blur(60px); pointer-events: none;
          will-change: transform;
        }
        .vc-hero-blob { position: absolute; bottom: -300px; right: -150px; width: 600px; height: 600px; background: radial-gradient(circle, var(--accent) 0%, transparent 60%); opacity: 0.22; filter: blur(80px); pointer-events: none; will-change: transform; }
        .vc-hero-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; background: rgba(255,255,255,0.04); border-radius: 999px; font-size: 12px; color: var(--fg-muted); align-self: flex-start; margin-bottom: 32px; font-family: var(--font-mono); }
        .vc-hero-tag-dot { width: 22px; height: 22px; background: var(--accent); border-radius: 50%; }
        .vc-hero h1 { font-size: clamp(56px, 7vw, 120px); line-height: 0.92; margin: 0 0 auto; letter-spacing: -0.045em; font-weight: 600; color: var(--fg); }
        .vc-hero h1 .accent { color: var(--accent); }
        .vc-hero h1 .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); letter-spacing: -0.02em; }
        .vc-hero h1 .underline { display: inline-block; position: relative; }
        .vc-hero h1 .underline::after { content: ''; position: absolute; bottom: 0.05em; left: 0; right: 0; height: 0.12em; background: var(--accent); transform: skew(-12deg); z-index: -1; opacity: 0.85; }
        .vc-hero-foot { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-top: 56px; }
        .vc-hero-foot p { font-size: 17px; color: var(--fg-muted); line-height: 1.5; max-width: 44ch; margin: 0; }
        .vc-hero-foot p strong { color: var(--fg); font-weight: 500; }

        .vc-btn { padding: 14px 22px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s; flex-shrink: 0; }
        .vc-btn:hover { transform: translateY(-1px); }
        .vc-btn-primary { background: var(--accent); color: var(--accent-fg); }
        .vc-btn-secondary { background: transparent; color: var(--fg); border: 1px solid var(--line); }

        /* === HERO RIGHT — bento === */
        .vc-hero-side { display: grid; grid-template-rows: auto 1fr; gap: 16px; }

        /* === CALCULATOR === */
        .vc-calc { background: var(--bg-card); border-radius: 24px; padding: 28px; border: 1px solid var(--line); }
        .vc-calc-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .vc-calc-title { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); }
        .vc-calc-status { font-family: var(--font-mono); font-size: 11px; color: var(--accent); display: flex; align-items: center; gap: 6px; }
        .vc-calc-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 1.5s infinite; }
        .vc-calc-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .vc-calc-label { font-size: 13px; color: var(--fg-muted); display: flex; justify-content: space-between; }
        .vc-calc-label strong { color: var(--fg); font-weight: 500; font-family: var(--font-mono); }
        .vc-calc-types { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
        .vc-calc-type { padding: 9px 6px; background: transparent; border: 1px solid var(--line); border-radius: 8px; cursor: pointer; font-size: 10px; color: var(--fg); font-family: var(--font-mono); text-transform: uppercase; transition: all 0.15s; }
        .vc-calc-type:hover { border-color: var(--fg-muted); }
        .vc-calc-type.on { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
        .vc-calc-slider { -webkit-appearance: none; width: 100%; height: 4px; background: var(--line); border-radius: 4px; outline: none; }
        .vc-calc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: var(--accent); border-radius: 50%; cursor: pointer; }
        .vc-calc-slider::-moz-range-thumb { width: 18px; height: 18px; background: var(--accent); border-radius: 50%; cursor: pointer; border: none; }
        .vc-calc-toggle { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
        .vc-calc-switch { width: 36px; height: 20px; background: var(--line); border-radius: 999px; position: relative; cursor: pointer; transition: background 0.2s; }
        .vc-calc-switch.on { background: var(--accent); }
        .vc-calc-switch::before { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: transform 0.2s; }
        .vc-calc-switch.on::before { transform: translateX(16px); background: var(--accent-fg); }
        .vc-calc-out { padding: 16px 18px; margin-top: 6px; background: var(--bg); border-radius: 12px; display: flex; align-items: baseline; justify-content: space-between; border: 1px solid var(--line); }
        .vc-calc-out-label { font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); text-transform: uppercase; }
        .vc-calc-out-num { font-family: var(--font-display); font-style: italic; font-size: 32px; color: var(--accent); line-height: 1; }
        .vc-calc-out-num span { font-family: var(--font-mono); font-style: normal; font-size: 12px; color: var(--fg-muted); margin-left: 6px; }
        .vc-stat-card { background: var(--bg-light); color: var(--fg-on-light); border-radius: 24px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; }
        .vc-stat-card.acc { background: var(--accent); color: var(--accent-fg); }
        .vc-stat-card-num { font-family: var(--font-display); font-style: italic; font-size: 64px; font-weight: 400; line-height: 1; letter-spacing: -0.04em; }
        .vc-stat-card-num span { font-family: var(--font-sans); font-style: normal; font-size: 0.35em; vertical-align: super; opacity: 0.6; margin-left: 4px; }

        .vc-card { border-radius: 24px; padding: 28px; position: relative; overflow: hidden; }
        .vc-card-light { background: var(--bg-light); color: var(--fg-on-light); }
        .vc-card-accent { background: var(--accent); color: var(--accent-fg); }
        .vc-card-dark { background: var(--bg-card); color: var(--fg); }
        .vc-card-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7; margin-bottom: 12px; }
        .vc-card-h { font-size: 28px; font-weight: 600; line-height: 1.05; letter-spacing: -0.02em; margin: 0; }
        .vc-card-h em { font-style: normal; }

        .vc-card-foot { font-size: 13px; opacity: 0.7; line-height: 1.4; }

        /* === MARQUEE === */
        .vc-marquee { padding: 24px 0; overflow: hidden; border-block: 1px solid var(--line); }
        .vc-marquee-track { display: flex; gap: 56px; white-space: nowrap; animation: marquee 45s linear infinite; font-size: 22px; font-weight: 500; color: var(--fg); letter-spacing: -0.02em; }
        .vc-marquee-track span { display: flex; align-items: center; gap: 28px; }
        .vc-marquee-track span::before { content: '✦'; color: var(--accent); font-size: 18px; }

        /* === SECTION === */
        .vc-section { max-width: 1400px; margin: 0 auto; padding: 80px 36px; }
        .vc-section-head { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: end; margin-bottom: 40px; }
        .vc-section-label { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--fg-muted); margin-bottom: 12px; }
        .vc-section-title { font-size: clamp(48px, 6vw, 88px); margin: 0; line-height: 0.95; letter-spacing: -0.04em; max-width: 18ch; font-weight: 600; }
        .vc-section-title .accent { color: var(--accent); }
        .vc-section-title .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); letter-spacing: -0.02em; }
        .vc-section-title em { font-style: italic; font-weight: 500; }
        .vc-section-cta { font-size: 14px; color: var(--fg-muted); display: flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; }
        .vc-section-cta:hover { color: var(--fg); border-color: var(--fg-muted); }

        /* === TICKER === */
        .vc-ticker-section { max-width: 1400px; margin: 0 auto; padding: 8px 36px 32px; }
        .vc-ticker-wrap { background: var(--bg-card); border-radius: 24px; padding: 32px 0; position: relative; overflow: hidden; }
        .vc-ticker-label { position: absolute; left: 36px; top: 50%; transform: translateY(-50%); z-index: 2; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); background: var(--bg-card); padding-right: 24px; }
        .vc-ticker-pill { display: inline-flex; align-items: center; gap: 12px; padding: 10px 20px; border: 1px solid var(--line); border-radius: 999px; font-size: 15px; font-weight: 500; color: var(--fg); white-space: nowrap; }
        .vc-ticker-pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
        .vc-ticker-pill em { font-family: var(--font-display); font-style: italic; color: var(--accent); margin-left: 4px; }

        /* === SERVICES — BENTO === */
        .vc-services { display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: 220px; gap: 16px; }
        .vc-srv { border-radius: 20px; padding: 28px; position: relative; overflow: hidden; cursor: pointer; transition: transform 0.25s; display: flex; flex-direction: column; }
        .vc-srv:hover { transform: translateY(-2px); }
        .vc-srv-1 { grid-column: span 3; grid-row: span 2; background: var(--bg-light); color: var(--fg-on-light); }
        .vc-srv-2 { grid-column: span 3; background: var(--accent); color: var(--accent-fg); }
        .vc-srv-3 { grid-column: span 2; background: var(--bg-card); }
        .vc-srv-4 { grid-column: span 1; background: var(--bg-card); }
        .vc-srv-5 { grid-column: span 3; background: var(--bg-card); border: 1px solid var(--accent); }
        .vc-srv-num { font-family: var(--font-mono); font-size: 11px; opacity: 0.7; margin-bottom: auto; text-transform: uppercase; letter-spacing: 0.1em; }
        .vc-srv-title { font-size: 36px; font-weight: 600; letter-spacing: -0.03em; line-height: 1; margin: 16px 0 12px; white-space: pre-line; }
        .vc-srv-1 .vc-srv-title { font-size: 56px; }
        .vc-srv-4 .vc-srv-title { font-size: 26px; }
        .vc-srv-desc { font-size: 14px; opacity: 0.7; line-height: 1.5; max-width: 36ch; }
        .vc-srv-arrow { position: absolute; bottom: 24px; right: 24px; width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.06); display: grid; place-items: center; transition: all 0.2s; }
        .vc-srv-1 .vc-srv-arrow { background: rgba(0,0,0,0.06); }
        .vc-srv-2 .vc-srv-arrow { background: rgba(0,0,0,0.12); }
        .vc-srv-3 .vc-srv-arrow, .vc-srv-4 .vc-srv-arrow, .vc-srv-5 .vc-srv-arrow { background: rgba(255,255,255,0.06); }
        .vc-srv:hover .vc-srv-arrow { background: var(--accent); color: var(--accent-fg); }

        /* === ABOUT BENTO === */
        .vc-about { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 260px; gap: 16px; }
        .vc-ab-big { grid-column: span 2; grid-row: span 2; background: var(--accent); color: var(--accent-fg); padding: 36px; border-radius: 24px; display: flex; flex-direction: column; }
        .vc-ab-big .h { font-size: clamp(32px, 4vw, 56px); font-weight: 600; line-height: 1.05; letter-spacing: -0.03em; margin: auto 0 0; }
        .vc-ab-big .h em { font-style: italic; font-weight: 500; }
        .vc-ab-stat { background: var(--bg-card); padding: 28px; border-radius: 24px; display: flex; flex-direction: column; }
        .vc-ab-stat-num { font-size: 72px; font-weight: 600; letter-spacing: -0.04em; line-height: 1; margin: auto 0 12px; }
        .vc-ab-stat-num span { font-size: 0.35em; vertical-align: super; opacity: 0.6; margin-left: 4px; }
        .vc-ab-stat-num.acc { color: var(--accent); }
        .vc-ab-stat-label { font-family: var(--font-mono); font-size: 11px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.1em; }
        .vc-ab-quote { grid-column: span 2; background: var(--bg-light); color: var(--fg-on-light); padding: 32px; border-radius: 24px; display: flex; flex-direction: column; justify-content: space-between; }
        .vc-ab-quote-text { font-size: 22px; font-weight: 500; line-height: 1.3; letter-spacing: -0.01em; }
        .vc-ab-quote-text::before, .vc-ab-quote-text::after { content: '"'; }
        .vc-ab-quote-author { font-family: var(--font-mono); font-size: 12px; opacity: 0.6; margin-top: 24px; }
        .vc-ab-quote-author strong { font-family: var(--font-sans); font-size: 14px; opacity: 1; display: block; margin-bottom: 4px; }

        /* === PROJECTS === */
        .vc-projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; perspective: 1200px; }
        .vc-proj { aspect-ratio: 4 / 5; border-radius: 24px; padding: 28px; position: relative; overflow: hidden; cursor: pointer; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); display: flex; flex-direction: column; will-change: transform; }
        .vc-proj-bg { position: absolute; inset: 0; transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); pointer-events: none; }
        .vc-proj:hover .vc-proj-bg { transform: scale(1.08); }
        .vc-proj > * { position: relative; z-index: 1; }
        .vc-proj:hover { transform: translateY(-4px); }
        .vc-proj-dark { background: var(--bg-card); color: var(--fg); }
        .vc-proj-light { background: var(--bg-light); color: var(--fg-on-light); }
        .vc-proj-accent { background: var(--accent); color: var(--accent-fg); }
        .vc-proj-meta { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.08em; }
        .vc-proj-name { font-size: 44px; font-weight: 600; letter-spacing: -0.03em; line-height: 1; margin: auto 0 16px; }
        .vc-proj-metric { font-family: var(--font-mono); font-size: 13px; padding: 6px 12px; background: rgba(0,0,0,0.08); border-radius: 999px; align-self: flex-start; }
        .vc-proj-dark .vc-proj-metric { background: var(--accent); color: var(--accent-fg); }
        .vc-proj-arrow { position: absolute; top: 28px; right: 28px; width: 38px; height: 38px; border-radius: 50%; background: rgba(0,0,0,0.08); display: grid; place-items: center; transition: all 0.2s; }
        .vc-proj-dark .vc-proj-arrow { background: rgba(255,255,255,0.08); }
        .vc-proj:hover .vc-proj-arrow { background: var(--fg); color: var(--bg); transform: rotate(-45deg); }
        .vc-proj-dark:hover .vc-proj-arrow { background: var(--accent); color: var(--accent-fg); }
        .vc-proj-accent:hover .vc-proj-arrow { background: var(--accent-fg); color: var(--accent); }

        /* === TESTIMONIALS — bento === */
        .vc-testi { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .vc-testi-card { padding: 32px; border-radius: 24px; display: flex; flex-direction: column; }
        .vc-testi-card.big { grid-column: span 2; background: var(--accent); color: var(--accent-fg); }
        .vc-testi-card.med { background: var(--bg-card); }
        .vc-testi-card.lite { background: var(--bg-light); color: var(--fg-on-light); }
        .vc-testi-q { font-size: 28px; font-weight: 500; line-height: 1.25; letter-spacing: -0.015em; margin: 0 0 auto; }
        .vc-testi-card.big .vc-testi-q { font-size: 36px; }
        .vc-testi-card .vc-testi-q::before { content: '"'; }
        .vc-testi-card .vc-testi-q::after { content: '"'; }
        .vc-testi-author { display: flex; align-items: center; gap: 12px; margin-top: 32px; padding-top: 20px; border-top: 1px solid currentColor; }
        .vc-testi-card .vc-testi-author { border-top-color: rgba(0,0,0,0.15); }
        .vc-testi-card.med .vc-testi-author { border-top-color: rgba(255,255,255,0.12); }
        .vc-testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.1); display: grid; place-items: center; font-size: 13px; font-weight: 600; flex-shrink: 0; }
        .vc-testi-card.med .vc-testi-avatar { background: rgba(255,255,255,0.1); }
        .vc-testi-name { font-size: 14px; font-weight: 600; }
        .vc-testi-role { font-size: 12px; opacity: 0.6; }

        /* === PROCESS === */
        .vc-proc { display: grid; grid-template-columns: 380px 1fr; gap: 16px; }
        .vc-proc-intro { background: var(--bg-card); border-radius: 24px; padding: 36px; display: flex; flex-direction: column; }
        .vc-proc-intro-h { font-size: 40px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.05; margin: auto 0 0; }
        .vc-proc-intro-h .acc { color: var(--accent); }
        .vc-proc-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .vc-proc-step { background: var(--bg-card); border-radius: 18px; padding: 24px; display: flex; gap: 20px; align-items: start; transition: background 0.2s; }
        .vc-proc-step:hover { background: var(--accent); color: var(--accent-fg); }
        .vc-proc-step-num { font-family: var(--font-mono); font-size: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.06); display: grid; place-items: center; flex-shrink: 0; }
        .vc-proc-step:hover .vc-proc-step-num { background: rgba(0,0,0,0.12); }
        .vc-proc-step h4 { font-size: 17px; margin: 0 0 6px; font-weight: 600; }
        .vc-proc-step p { font-size: 13px; opacity: 0.7; line-height: 1.5; margin: 0; }

        /* === FAQ === */
        .vc-faq { display: grid; grid-template-columns: 1fr 2fr; gap: 32px; }
        .vc-faq-list { display: flex; flex-direction: column; gap: 8px; }
        .vc-faq-item { background: var(--bg-card); border-radius: 18px; padding: 24px 28px; cursor: pointer; transition: background 0.2s; }
        .vc-faq-item.open { background: var(--accent); color: var(--accent-fg); }
        .vc-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 24px; }
        .vc-faq-q h4 { font-size: 19px; font-weight: 500; margin: 0; letter-spacing: -0.01em; }
        .vc-faq-mark { font-size: 24px; transition: transform 0.2s; }
        .vc-faq-item.open .vc-faq-mark { transform: rotate(45deg); }
        .vc-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s, margin-top 0.3s; font-size: 14px; line-height: 1.6; opacity: 0.85; }
        .vc-faq-item.open .vc-faq-a { max-height: 240px; margin-top: 14px; }

        /* === CTA === */
        .vc-cta { max-width: 1400px; margin: 0 auto 36px; padding: 0 36px; }
        .vc-cta-card { background: var(--accent); color: var(--accent-fg); border-radius: 32px; padding: 80px 60px; text-align: center; position: relative; overflow: hidden; }
        .vc-cta-card::before, .vc-cta-card::after { content: ''; position: absolute; width: 220px; height: 220px; border-radius: 50%; background: rgba(0,0,0,0.06); }
        .vc-cta-card::before { top: -80px; left: -80px; }
        .vc-cta-card::after { bottom: -100px; right: -100px; }
        .vc-cta-card h2 { font-size: clamp(56px, 7vw, 112px); margin: 0 0 24px; line-height: 0.95; letter-spacing: -0.045em; font-weight: 600; position: relative; }
        .vc-cta-card p { font-size: 19px; max-width: 50ch; margin: 0 auto 36px; line-height: 1.55; opacity: 0.8; position: relative; }
        .vc-cta-actions { display: inline-flex; gap: 8px; position: relative; flex-wrap: wrap; justify-content: center; }
        .vc-cta-actions .anim-mag-primary { background: var(--accent-fg); color: var(--accent); }
        .vc-cta-actions .vc-btn-secondary { color: var(--accent-fg); border-color: rgba(0,0,0,0.2); }

        /* === FOOTER === */
        .vc-footer { max-width: 1400px; margin: 0 auto; padding: 40px 36px; }
        .vc-footer-card { background: var(--bg-card); border-radius: 32px; padding: 56px; }
        .vc-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 36px; border-bottom: 1px solid var(--line); }
        .vc-footer h5 { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin: 0 0 16px; }
        .vc-footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .vc-footer a { color: var(--fg); text-decoration: none; font-size: 14px; opacity: 0.75; }
        .vc-footer-brand h3 { font-size: 32px; margin: 0 0 16px; font-weight: 600; letter-spacing: -0.02em; }
        .vc-footer-brand p { font-size: 14px; color: var(--fg-muted); max-width: 32ch; line-height: 1.55; }
        .vc-footer-bottom { padding-top: 24px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); }


        /* ============================================ */
        /* === RESPONSIVE — TABLET (≤1024px) === */
        /* ============================================ */
        @media (max-width: 1024px) {
          .vc-nav-in { padding: 14px 24px; gap: 16px; }
          .vc-nav-links { gap: 18px; }

          .vc-hero { padding: 32px 24px; }
          .vc-hero-grid { grid-template-columns: 1fr; }
          .vc-hero-main { min-height: 0; padding: 36px 32px 40px; }


          .vc-section { padding: 56px 24px; }
          .vc-ticker-section { padding: 8px 24px 24px; }
          .vc-section-head { grid-template-columns: 1fr; align-items: start; gap: 20px; }
          .vc-section-cta { justify-self: start; }

          .vc-services { grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; }
          .vc-srv-1 { grid-column: span 4; grid-row: span 2; }
          .vc-srv-2 { grid-column: span 4; }
          .vc-srv-3 { grid-column: span 2; }
          .vc-srv-4 { grid-column: span 2; }
          .vc-srv-5 { grid-column: span 4; }

          .vc-about { grid-template-columns: repeat(2, 1fr); }
          .vc-ab-big { grid-column: span 2; grid-row: span 1; }
          .vc-ab-quote { grid-column: span 2; }

          .vc-projects { grid-template-columns: repeat(2, 1fr); }

          .vc-testi { grid-template-columns: repeat(2, 1fr); }
          .vc-testi-card.big { grid-column: span 2; }

          .vc-proc { grid-template-columns: 1fr; }
          .vc-proc-intro { padding: 28px; }
          .vc-proc-intro-h { font-size: 32px; }

          .vc-faq { grid-template-columns: 1fr; gap: 20px; }

          .vc-cta-card { padding: 56px 32px; }
          .vc-footer-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
          .vc-footer-card { padding: 36px; }
        }

        /* ============================================ */
        /* === RESPONSIVE — MOBILE (≤640px) === */
        /* ============================================ */
        /* === Mobile preview mode (class-based, mirrors @640px) === */
        .vc.vc-mobile-mode { max-width: 390px; margin: 0 auto; box-shadow: 0 0 0 1px var(--line), 0 30px 80px rgba(0,0,0,0.5); border-radius: 28px; }
        .vc-mobile-mode .vc-nav { border-radius: 28px 28px 0 0; }
        .vc-mobile-mode .vc-nav-in { padding: 12px 16px; gap: 8px; max-width: none; }
        .vc-mobile-mode .vc-nav-links { display: none; }
        .vc-mobile-mode .vc-nav-cta { display: none; }
        .vc-mobile-mode .vc-burger { display: flex; }
        .vc-mobile-mode .vc-lang { padding: 2px; }
        .vc-mobile-mode .vc-lang button { padding: 4px 8px; font-size: 10px; }
        .vc-mobile-mode .vc-mobile-toggle { width: 32px; height: 32px; font-size: 14px; }
        .vc-mobile-mode .vc-mobile-sheet { display: block; position: absolute; inset: 0; z-index: 80; background: var(--bg); opacity: 0; pointer-events: none; transition: opacity 0.25s; padding: 80px 28px 32px; overflow-y: auto; }
        .vc-mobile-mode .vc-mobile-sheet.on { opacity: 1; pointer-events: auto; }
        .vc-mobile-mode .vc-mobile-sheet ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .vc-mobile-mode .vc-mobile-sheet li a { display: block; padding: 18px 0; font-size: 30px; font-weight: 600; letter-spacing: -0.03em; color: var(--fg); text-decoration: none; border-bottom: 1px solid var(--line); }
        .vc-mobile-mode .vc-mobile-sheet .sheet-cta { margin-top: 28px; display: inline-block; padding: 14px 22px; background: var(--accent); color: var(--accent-fg); border-radius: 999px; font-weight: 700; text-decoration: none; }
        .vc-mobile-mode .vc-mobile-sheet .sheet-meta { margin-top: 32px; font-family: var(--font-mono); font-size: 12px; color: var(--fg-muted); display: flex; flex-direction: column; gap: 6px; }

        .vc-mobile-mode .vc-hero { padding: 16px 12px 8px; max-width: none; }
        .vc-mobile-mode .vc-hero-grid { grid-template-columns: 1fr; gap: 10px; }
        .vc-mobile-mode .vc-hero-main { padding: 24px 22px 28px; min-height: 0; border-radius: 24px; overflow: hidden; }
        .vc-mobile-mode .vc-hero-blob { width: 320px; height: 320px; bottom: -180px; right: -100px; opacity: 0.28; }
        .vc-mobile-mode .vc-hero-tag { margin-bottom: 24px; font-size: 10px; padding: 4px 10px 4px 4px; gap: 6px; }
        .vc-mobile-mode .vc-hero-tag-dot { width: 16px; height: 16px; }
        .vc-mobile-mode .vc-hero h1 { font-size: clamp(44px, 13.5vw, 56px); line-height: 0.92; letter-spacing: -0.045em; }
        .vc-mobile-mode .vc-hero h1 .underline::after { height: 0.14em; }
        .vc-mobile-mode .vc-hero-foot { flex-direction: column; align-items: stretch; gap: 18px; margin-top: 32px; }
        .vc-mobile-mode .vc-hero-foot p { font-size: 14.5px; max-width: none; line-height: 1.5; }
        .vc-mobile-mode .vc-hero-foot > div { width: 100%; }
        .vc-mobile-mode .vc-hero-foot .vc-btn, .vc-mobile-mode .vc-hero-foot .anim-mag { width: 100%; justify-content: center; }

        .vc-mobile-mode .vc-hero-side { grid-template-rows: auto auto; gap: 12px; }
        .vc-mobile-mode .vc-calc { padding: 24px 22px; border-radius: 22px; }
        .vc-mobile-mode .vc-calc-head { margin-bottom: 18px; }
        .vc-mobile-mode .vc-calc-row { margin-bottom: 14px; }
        .vc-mobile-mode .vc-calc-types { grid-template-columns: repeat(5, 1fr); gap: 4px; }
        .vc-mobile-mode .vc-calc-type { padding: 9px 2px; font-size: 10px; }
        .vc-mobile-mode .vc-calc-out { padding: 14px 16px; flex-wrap: wrap; gap: 8px; }
        .vc-mobile-mode .vc-calc-out-num { font-size: 28px; }
        .vc-mobile-mode .vc-stat-card { min-height: 0; padding: 22px; border-radius: 22px; }
        .vc-mobile-mode .vc-stat-card-num { font-size: 52px; margin-top: 14px; }

        .vc-mobile-mode .vc-section { padding: 48px 16px; max-width: none; }
        .vc-mobile-mode .vc-ticker-section { padding: 8px 16px 16px; max-width: none; }
        .vc-mobile-mode .vc-section-head { grid-template-columns: 1fr; align-items: start; gap: 20px; margin-bottom: 28px; }
        .vc-mobile-mode .vc-section-cta { justify-self: start; }
        .vc-mobile-mode .vc-section-title { font-size: 38px; }

        .vc-mobile-mode .vc-services { grid-template-columns: 1fr; grid-auto-rows: auto; gap: 12px; }
        .vc-mobile-mode .vc-srv { grid-column: span 1 !important; grid-row: span 1 !important; padding: 24px; min-height: 200px; }
        .vc-mobile-mode .vc-srv-1 .vc-srv-title { font-size: 40px; }
        .vc-mobile-mode .vc-srv-title, .vc-mobile-mode .vc-srv-4 .vc-srv-title { font-size: 30px; }

        .vc-mobile-mode .vc-about { grid-template-columns: 1fr; grid-auto-rows: auto; gap: 12px; }
        .vc-mobile-mode .vc-ab-big { grid-column: span 1; grid-row: span 1; padding: 28px; min-height: 220px; }
        .vc-mobile-mode .vc-ab-stat { padding: 24px; min-height: 180px; }
        .vc-mobile-mode .vc-ab-stat-num { font-size: 56px; }
        .vc-mobile-mode .vc-ab-quote { grid-column: span 1; padding: 28px; }
        .vc-mobile-mode .vc-ab-quote-text { font-size: 19px; }

        .vc-mobile-mode .vc-projects { grid-template-columns: 1fr; gap: 12px; }
        .vc-mobile-mode .vc-proj { aspect-ratio: 5 / 4; padding: 24px; }
        .vc-mobile-mode .vc-proj-name { font-size: 34px; }

        .vc-mobile-mode .vc-testi { grid-template-columns: 1fr; gap: 12px; }
        .vc-mobile-mode .vc-testi-card { padding: 24px; }
        .vc-mobile-mode .vc-testi-card.big { grid-column: span 1; }
        .vc-mobile-mode .vc-testi-q { font-size: 19px; }
        .vc-mobile-mode .vc-testi-card.big .vc-testi-q { font-size: 22px; }

        .vc-mobile-mode .vc-proc { grid-template-columns: 1fr; }
        .vc-mobile-mode .vc-proc-intro { padding: 24px; }
        .vc-mobile-mode .vc-proc-intro-h { font-size: 28px; }
        .vc-mobile-mode .vc-proc-list { grid-template-columns: 1fr; }
        .vc-mobile-mode .vc-proc-step { padding: 20px; }

        .vc-mobile-mode .vc-faq { grid-template-columns: 1fr; gap: 20px; }
        .vc-mobile-mode .vc-faq-item { padding: 18px 22px; }
        .vc-mobile-mode .vc-faq-q h4 { font-size: 16px; }

        .vc-mobile-mode .vc-cta { padding: 0 16px; margin-bottom: 16px; max-width: none; }
        .vc-mobile-mode .vc-cta-card { padding: 48px 24px; border-radius: 24px; }
        .vc-mobile-mode .vc-cta-card h2 { font-size: 56px; }
        .vc-mobile-mode .vc-cta-card p { font-size: 16px; margin-bottom: 28px; }
        .vc-mobile-mode .vc-cta-actions { flex-direction: column; gap: 8px; width: 100%; align-items: stretch; }
        .vc-mobile-mode .vc-cta-actions .anim-mag, .vc-mobile-mode .vc-cta-actions .vc-btn { width: 100%; justify-content: center; }

        .vc-mobile-mode .vc-footer { padding: 24px 16px; max-width: none; }
        .vc-mobile-mode .vc-footer-card { padding: 28px; border-radius: 24px; }
        .vc-mobile-mode .vc-footer-grid { grid-template-columns: 1fr; gap: 28px; padding-bottom: 24px; }
        .vc-mobile-mode .vc-footer-bottom { flex-direction: column; gap: 8px; padding-top: 20px; }

        .vc-mobile-mode .vc-marquee-track { font-size: 16px; gap: 36px; }

        @media (max-width: 640px) {
          .vc-nav-in { padding: 12px 16px; gap: 8px; }
          .vc-nav-links { display: none; }
          .vc-nav-cta { display: none; }
          .vc-burger { display: flex; }
          .vc-lang { padding: 2px; }
          .vc-lang button { padding: 4px 8px; font-size: 10px; }

          .vc-mobile-sheet { display: block; position: fixed; inset: 0; z-index: 80; background: var(--bg); opacity: 0; pointer-events: none; transition: opacity 0.25s; padding: 80px 28px 32px; overflow-y: auto; }
          .vc-mobile-sheet.on { opacity: 1; pointer-events: auto; }
          .vc-mobile-sheet ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
          .vc-mobile-sheet li a { display: block; padding: 18px 0; font-size: 30px; font-weight: 600; letter-spacing: -0.03em; color: var(--fg); text-decoration: none; border-bottom: 1px solid var(--line); }
          .vc-mobile-sheet li a:hover { color: var(--accent); }
          .vc-mobile-sheet .sheet-cta { margin-top: 28px; display: inline-block; padding: 14px 22px; background: var(--accent); color: var(--accent-fg); border-radius: 999px; font-weight: 700; text-decoration: none; }
          .vc-mobile-sheet .sheet-meta { margin-top: 32px; font-family: var(--font-mono); font-size: 12px; color: var(--fg-muted); display: flex; flex-direction: column; gap: 6px; }

          .vc-hero { padding: 16px 12px 8px; }
          .vc-hero-grid { gap: 10px; }
          .vc-hero-main { padding: 24px 22px 28px; min-height: 0; border-radius: 24px; overflow: hidden; }
          .vc-hero-blob { width: 320px; height: 320px; bottom: -180px; right: -100px; opacity: 0.28; }
          .vc-hero-tag { margin-bottom: 24px; font-size: 10px; padding: 4px 10px 4px 4px; gap: 6px; }
          .vc-hero-tag-dot { width: 16px; height: 16px; }
          .vc-hero h1 { font-size: clamp(44px, 13.5vw, 56px); line-height: 0.92; letter-spacing: -0.045em; }
          .vc-hero h1 .underline::after { height: 0.14em; }
          .vc-hero-foot { flex-direction: column; align-items: stretch; gap: 18px; margin-top: 32px; }
          .vc-hero-foot p { font-size: 14.5px; max-width: none; line-height: 1.5; }
          .vc-hero-foot > div { width: 100%; }
          .vc-hero-foot .vc-btn, .vc-hero-foot .anim-mag { width: 100%; justify-content: center; }

          .vc-hero-side { gap: 12px; }
          .vc-calc { padding: 24px 22px; border-radius: 22px; }
          .vc-calc-head { margin-bottom: 18px; }
          .vc-calc-row { margin-bottom: 14px; }
          .vc-calc-types { grid-template-columns: repeat(5, 1fr); gap: 4px; }
          .vc-calc-type { padding: 9px 2px; font-size: 10px; }
          .vc-calc-out { padding: 14px 16px; flex-wrap: wrap; gap: 8px; }
          .vc-calc-out-num { font-size: 28px; }
          .vc-stat-card { min-height: 0; padding: 22px; border-radius: 22px; }
          .vc-stat-card-num { font-size: 52px; margin-top: 14px; }

          .vc-section { padding: 48px 16px; }
          .vc-ticker-section { padding: 8px 16px 16px; }
          .vc-section-head { margin-bottom: 28px; }
          .vc-section-title { font-size: clamp(36px, 9vw, 52px); }

          .vc-services { grid-template-columns: 1fr; grid-auto-rows: auto; gap: 12px; }
          .vc-srv { grid-column: span 1 !important; grid-row: span 1 !important; padding: 24px; min-height: 200px; }
          .vc-srv-1 .vc-srv-title { font-size: 40px; }
          .vc-srv-title, .vc-srv-4 .vc-srv-title { font-size: 30px; }

          .vc-about { grid-template-columns: 1fr; grid-auto-rows: auto; gap: 12px; }
          .vc-ab-big { grid-column: span 1; padding: 28px; min-height: 220px; }
          .vc-ab-stat { padding: 24px; min-height: 180px; }
          .vc-ab-stat-num { font-size: 56px; }
          .vc-ab-quote { grid-column: span 1; padding: 28px; }
          .vc-ab-quote-text { font-size: 19px; }

          .vc-projects { grid-template-columns: 1fr; gap: 12px; }
          .vc-proj { aspect-ratio: 5 / 4; padding: 24px; }
          .vc-proj-name { font-size: 34px; }

          .vc-testi { grid-template-columns: 1fr; gap: 12px; }
          .vc-testi-card { padding: 24px; }
          .vc-testi-card.big { grid-column: span 1; }
          .vc-testi-q { font-size: 19px; }
          .vc-testi-card.big .vc-testi-q { font-size: 22px; }
          .vc-testi-author { margin-top: 24px; padding-top: 16px; }

          .vc-proc-intro { padding: 24px; }
          .vc-proc-intro-h { font-size: 28px; }
          .vc-proc-list { grid-template-columns: 1fr; }
          .vc-proc-step { padding: 20px; }

          .vc-faq-item { padding: 18px 22px; }
          .vc-faq-q h4 { font-size: 16px; }

          .vc-cta { padding: 0 16px; margin-bottom: 16px; }
          .vc-cta-card { padding: 48px 24px; border-radius: 24px; }
          .vc-cta-card p { font-size: 16px; margin-bottom: 28px; }
          .vc-cta-actions { flex-direction: column; gap: 8px; width: 100%; align-items: stretch; }
          .vc-cta-actions .anim-mag, .vc-cta-actions .vc-btn { width: 100%; justify-content: center; }

          .vc-footer { padding: 24px 16px; }
          .vc-footer-card { padding: 28px; border-radius: 24px; }
          .vc-footer-grid { grid-template-columns: 1fr; gap: 28px; padding-bottom: 24px; }
          .vc-footer-bottom { flex-direction: column; gap: 8px; padding-top: 20px; }
        }
      `}</style>

      {/* NAV */}
      <header className="vc-nav">
        <div className="vc-nav-in">
          <a href="#" className="vc-logo"><span className="vc-logo-mark">i</span> IT Solutions</a>
          <nav className="vc-nav-links" aria-label="Główna nawigacja">
            <a href="page-services.html">{t.nav.services}</a>
            <a href="page-portfolio.html">{t.nav.portfolio}</a>
            <a href="#process">{t.nav.process}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a href="page-contact.html">{t.nav.contact}</a>
          </nav>
          <button className={`vc-mobile-toggle ${mobilePreview ? 'on' : ''}`} onClick={() => setMobilePreview(v => !v)} aria-pressed={mobilePreview} title={mobilePreview ? 'Wyjdź z podglądu mobile' : 'Podgląd mobile (390px)'}>
            <span aria-hidden="true">📱</span>
          </button>
          <div className="vc-lang" role="group" aria-label="Language">
            <button className={lang === 'pl' ? 'on' : ''} onClick={() => setLang('pl')} aria-pressed={lang === 'pl'}>PL</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
          </div>
          <a href="page-contact.html" className="vc-nav-cta">{t.nav.cta}</a>
          <button className={`vc-burger ${mobileMenu ? 'on' : ''}`} onClick={() => setMobileMenu(v => !v)} aria-label={mobileMenu ? t.close : t.menu}>
            <span className="vc-burger-bars"></span>
          </button>
        </div>
      </header>

      {/* MOBILE SHEET */}
      <div className={`vc-mobile-sheet ${mobileMenu ? 'on' : ''}`} aria-hidden={!mobileMenu}>
        <ul>
          <li><a href="page-services.html" onClick={() => setMobileMenu(false)}>{t.nav.services}</a></li>
          <li><a href="page-portfolio.html" onClick={() => setMobileMenu(false)}>{t.nav.portfolio}</a></li>
          <li><a href="#process" onClick={() => setMobileMenu(false)}>{t.nav.process}</a></li>
          <li><a href="#faq" onClick={() => setMobileMenu(false)}>{t.nav.faq}</a></li>
          <li><a href="page-contact.html" onClick={() => setMobileMenu(false)}>{t.nav.contact}</a></li>
        </ul>
        <a href="page-contact.html" className="sheet-cta" onClick={() => setMobileMenu(false)}>{t.nav.cta}</a>
        <div className="sheet-meta">
          <span>hello@itsolutions.com</span>
          <span>+48 123 456 789</span>
          <span>Warszawa, PL</span>
        </div>
      </div>

      {/* HERO */}
      <section className="vc-hero" data-screen-label="C · Hero">
        <div className="vc-hero-grid">
          <div className="vc-hero-main">
            <div ref={heroBlobRef} className="vc-hero-blob" aria-hidden="true"></div>
            <div className="vc-hero-tag"><span className="vc-hero-tag-dot"></span> {t.hero.tag}</div>
            <h1>{t.hero.h1a} <span className="underline">{t.hero.h1b}</span><br/>{t.hero.h1c}<br/><span className="it">{t.hero.h1d}</span></h1>
            <div className="vc-hero-foot">
              <p>
                <strong>{t.hero.lead[0]}</strong>{t.hero.lead[1]}
              </p>
              <div style={{display:'flex', gap: 8, flexShrink: 0}}>
                <MagneticCTA href="#contact" variant="primary">{t.hero.cta}</MagneticCTA>
              </div>
            </div>
          </div>

          <div className="vc-hero-side">
            <div className="vc-calc" aria-label={t.calc.title}>
              <div className="vc-calc-head">
                <span className="vc-calc-title">{t.calc.title}</span>
                <span className="vc-calc-status">{t.calc.live}</span>
              </div>
              <div className="vc-calc-row">
                <span className="vc-calc-label">{t.calc.type}</span>
                <div className="vc-calc-types">
                  {Object.entries(t.calc.types).map(([k, l]) => (
                    <button key={k} className={`vc-calc-type ${calcType===k?'on':''}`} onClick={() => setCalcType(k)}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="vc-calc-row">
                <span className="vc-calc-label">{t.calc.pages} <strong>{calcPages}</strong></span>
                <input type="range" min="1" max="30" value={calcPages} onChange={e => setCalcPages(+e.target.value)} className="vc-calc-slider" />
              </div>
              <div className="vc-calc-toggle">
                <span className="vc-calc-label">{t.calc.cms}</span>
                <span className={`vc-calc-switch ${calcCMS?'on':''}`} onClick={() => setCalcCMS(v => !v)} role="switch" aria-checked={calcCMS} />
              </div>
              <div className="vc-calc-out">
                <span className="vc-calc-out-label">{t.calc.out}</span>
                <span className="vc-calc-out-num">{price.toLocaleString(lang === 'pl' ? 'pl-PL' : 'en-US')} <span>{t.calc.currency}</span></span>
              </div>
            </div>
            <div className="vc-stat-card acc">
              <div>
                <div className="vc-card-label">// scale</div>
                <div style={{fontSize: 18, fontWeight: 500, lineHeight: 1.2, marginTop: 8, letterSpacing: '-0.01em'}}>{t.calc.scale}</div>
              </div>
              <div className="vc-stat-card-num"><CountUp to={1000} duration={1800} format={n => (n >= 1000 ? Math.floor(n/100)/10 + 'k' : n)} /><span>{t.calc.scaleLabel}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <section className="vc-ticker-section" aria-label="Tech stack">
        <div className="vc-ticker-wrap">
          <Ticker speed={45} gap={14}>
            {[
              ['Next.js', 'Vercel', true],
              ['React 18', 'TypeScript'],
              ['WordPress', 'Custom theme'],
              ['WooCommerce', 'PayU · Stripe'],
              ['PrestaShop', '1.7 → 8.x'],
              ['Spring Boot', 'Java 21'],
              ['PostgreSQL', 'MongoDB'],
              ['Tailwind', 'Framer Motion'],
              ['Sanity', 'Strapi · MDX'],
              ['AWS · Docker', 'CI/CD'],
              ['Lighthouse 95+', 'Core Web Vitals'],
              ['Schema.org', 'SEO-ready'],
            ].map(([a, b, hot], i) => (
              <span key={i} className="vc-ticker-pill">
                {hot && <span className="dot"></span>}
                {a} <em>{b}</em>
              </span>
            ))}
          </Ticker>
        </div>
      </section>

      {/* SERVICES */}
      <section className="vc-section reveal" id="services" data-screen-label="C · Services">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">{t.sections.services.kicker}</div>
            <h2 className="vc-section-title">{t.sections.services.title[0]}<span className="it">{t.sections.services.title[1]}</span>{t.sections.services.title[2]}</h2>
          </div>
          <a href="page-services.html" className="vc-section-cta">{t.sections.services.cta}</a>
        </div>
        <div className="vc-services">
          {t.services.map((s, i) => (
            <div key={i} className={`vc-srv vc-srv-${i+1}`}>
              <div className="vc-srv-num">{s.num}</div>
              <h3 className="vc-srv-title">{s.title}</h3>
              {s.desc && <p className="vc-srv-desc">{s.desc}</p>}
              <div className="vc-srv-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="vc-section reveal" data-screen-label="C · About">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">{t.sections.about.kicker}</div>
            <h2 className="vc-section-title">{t.sections.about.title[0]}<span className="it">{t.sections.about.title[1]}</span>{t.sections.about.title[2]}</h2>
          </div>
        </div>
        <div className="vc-about">
          <div className="vc-ab-big">
            <div className="vc-card-label">{t.about.bigLabel}</div>
            <div className="h">{t.about.big[0]}<em>{t.about.big[1]}</em>{t.about.big[2]}</div>
          </div>
          <div className="vc-ab-stat">
            <div className="vc-ab-stat-label">{t.about.stat1.label}</div>
            <div className="vc-ab-stat-num acc">{t.about.stat1.num}</div>
            <div className="vc-card-foot" style={{color: 'var(--fg-muted)'}}>{t.about.stat1.foot}</div>
          </div>
          <div className="vc-ab-stat">
            <div className="vc-ab-stat-label">{t.about.stat2.label}</div>
            <div className="vc-ab-stat-num acc">{t.about.stat2.num}</div>
            <div className="vc-card-foot" style={{color: 'var(--fg-muted)'}}>{t.about.stat2.foot}</div>
          </div>
          <div className="vc-ab-quote">
            <div>
              <div className="vc-card-label">{t.about.quote.label}</div>
              <p className="vc-ab-quote-text">{t.about.quote.text}</p>
            </div>
            <div className="vc-ab-quote-author">
              <strong>{t.about.quote.name}</strong>{t.about.quote.role}
            </div>
          </div>
          <div className="vc-ab-stat" style={{background: 'var(--accent)', color: 'var(--accent-fg)'}}>
            <div className="vc-ab-stat-label">{t.about.stat3.label}</div>
            <div className="vc-ab-stat-num">{t.about.stat3.num}</div>
            <div className="vc-card-foot">{t.about.stat3.foot}</div>
          </div>
          <div className="vc-ab-stat">
            <div className="vc-ab-stat-label">{t.about.stat4.label}</div>
            <div className="vc-ab-stat-num acc">{t.about.stat4.num}</div>
            <div className="vc-card-foot" style={{color: 'var(--fg-muted)'}}>{t.about.stat4.foot}</div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="vc-section reveal" id="portfolio" data-screen-label="C · Portfolio">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">{t.sections.portfolio.kicker}</div>
            <h2 className="vc-section-title">{t.sections.portfolio.title[0]}<span className="it">{t.sections.portfolio.title[1]}</span>{t.sections.portfolio.title[2]}</h2>
          </div>
          <a href="page-portfolio.html" className="vc-section-cta">{t.sections.portfolio.cta}</a>
        </div>
        <div className="vc-projects">
          {t.projects.map((p, i) => (
            <Tilt key={i} max={4}>
              <article className={`vc-proj vc-proj-${p.tone}`}>
                <div className="vc-proj-bg" style={{
                  background: p.tone === 'accent'
                    ? 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 50%)'
                    : p.tone === 'dark'
                    ? 'radial-gradient(circle at 80% 100%, rgba(212,255,82,0.15), transparent 60%)'
                    : 'radial-gradient(circle at 70% 0%, rgba(0,0,0,0.06), transparent 60%)'
                }}></div>
                <div className="vc-proj-meta">
                  <span>{p.cat}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="vc-proj-name">{p.name}</h3>
                <span className="vc-proj-metric">{p.metric}</span>
                <div className="vc-proj-arrow">↗</div>
              </article>
            </Tilt>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="vc-section reveal" data-screen-label="C · Testimonials">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">{t.sections.testi.kicker}</div>
            <h2 className="vc-section-title">{t.sections.testi.title[0]}<span className="it">{t.sections.testi.title[1]}</span>{t.sections.testi.title[2]}</h2>
          </div>
        </div>
        <div className="vc-testi">
          {t.testimonials.map((tm, i) => (
            <div key={i} className={`vc-testi-card ${tm.size}`}>
              <p className="vc-testi-q">{tm.q}</p>
              <div className="vc-testi-author">
                <div className="vc-testi-avatar">{tm.avatar}</div>
                <div>
                  <div className="vc-testi-name">{tm.name}</div>
                  <div className="vc-testi-role">{tm.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="vc-section reveal" id="process" data-screen-label="C · Process">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">{t.sections.process.kicker}</div>
            <h2 className="vc-section-title">{t.sections.process.title[0]}<span className="it">{t.sections.process.title[1]}</span>{t.sections.process.title[2]}</h2>
          </div>
        </div>
        <div className="vc-proc">
          <div className="vc-proc-intro">
            <div className="vc-card-label" style={{color: 'var(--fg-muted)'}}>{t.process.label}</div>
            <h3 className="vc-proc-intro-h">{t.process.h[0]}<span className="acc">{t.process.h[1]}</span>{t.process.h[2]}</h3>
          </div>
          <div className="vc-proc-list">
            {t.process.steps.map(([title, desc], i) => (
              <div key={i} className="vc-proc-step">
                <div className="vc-proc-step-num">{String(i+1).padStart(2,'0')}</div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="vc-section reveal" id="faq" data-screen-label="C · FAQ">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">{t.sections.faq.kicker}</div>
            <h2 className="vc-section-title">{t.sections.faq.title[0]}<span className="it">{t.sections.faq.title[1]}</span>{t.sections.faq.title[2]}</h2>
          </div>
        </div>
        <div className="vc-faq">
          <div>
            <p style={{fontSize: 16, color: 'var(--fg-muted)', lineHeight: 1.55, marginTop: 0}}>
              {t.faq.side[0]}<a href="#contact" style={{color: 'var(--accent)'}}>{t.faq.side[1]}</a>
            </p>
          </div>
          <div className="vc-faq-list">
            {t.faq.items.map(([q, a], i) => (
              <div key={i} className={`vc-faq-item ${openFaq===i?'open':''}`} onClick={() => setOpenFaq(openFaq===i?-1:i)}>
                <div className="vc-faq-q">
                  <h4>{q}</h4>
                  <span className="vc-faq-mark">+</span>
                </div>
                <div className="vc-faq-a">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vc-cta reveal" id="contact" data-screen-label="C · CTA">
        <div className="vc-cta-card">
          <h2>{t.cta.h}</h2>
          <p>{t.cta.p}</p>
          <div className="vc-cta-actions">
            <MagneticCTA href="#" variant="primary">{t.cta.primary}</MagneticCTA>
            <a href="#" className="vc-btn vc-btn-secondary">hello@itsolutions.com</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vc-footer">
        <div className="vc-footer-card">
          <div className="vc-footer-grid">
            <div className="vc-footer-brand">
              <h3>{t.footer.brand}</h3>
              <p>{t.footer.desc}</p>
            </div>
            <div>
              <h5>{t.footer.colServices}</h5>
              <ul>{t.footer.links.services.map((l, i) => <li key={i}><a href="page-services.html">{l}</a></li>)}</ul>
            </div>
            <div>
              <h5>{t.footer.colStudio}</h5>
              <ul>{t.footer.links.studio.map((l, i) => <li key={i}><a href={i === 1 ? 'page-portfolio.html' : '#'}>{l}</a></li>)}</ul>
            </div>
            <div>
              <h5>{t.footer.colContact}</h5>
              <ul><li>hello@itsolutions.com</li><li>+48 123 456 789</li><li>Warszawa, PL</li></ul>
            </div>
          </div>
          <div className="vc-footer-bottom">
            <span>{t.footer.copy}</span>
            <span>{t.footer.legal}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

window.VariantC = VariantC;
