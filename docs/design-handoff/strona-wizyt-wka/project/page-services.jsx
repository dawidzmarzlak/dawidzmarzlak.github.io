// Podstrona: Usługi (deep dive)
// Reused styles z variant-c-v2 + własne sekcje:
// - Hero z dużą typografią + nawigacją po stackach
// - 5 kart deep-dive (Next.js, WordPress, WooCommerce, PrestaShop, App)
// - Każda karta: kiedy używamy, co dostajesz, technologie, przykładowe projekty

const PageServices = () => {
  const [active, setActive] = React.useState('next');
  useReveal('.ps .reveal', []);

  const stacks = {
    next: {
      label: 'Next.js',
      tag: '01',
      kicker: 'Production-grade React',
      title: 'Strony, które ładują się błyskawicznie i konwertują.',
      desc: 'Next.js 14, App Router, Server Components. Hosting na Vercel z preview deploymentami z każdego brancha. CMS — Sanity / Strapi / MDX. Wszystko zintegrowane, żebyś mógł pisać teksty bez devów.',
      stack: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind', 'Sanity / Strapi', 'Vercel'],
      use: ['Strony korporacyjne premium', 'Landing pages dla SaaS', 'Sklepy headless', 'Strony lecące powyżej 90 LH'],
      bullets: [
        ['LCP', '< 1.5s', 'Standardowy cel. Zwykle schodzimy do 1.0–1.2s.'],
        ['SEO', 'Schema + OG + sitemap', 'Wszystko domyślnie — bez Yoast, bez wtyczek.'],
        ['CMS', 'Headless lub MDX', 'Sam wybierasz co edytujesz, my budujemy schemat.'],
      ],
      examples: ['FashionHub — sklep premium', 'EduPlatform — platforma kursów'],
      from: '8 500 PLN',
      time: '4–8 tygodni',
    },
    wp: {
      label: 'WordPress',
      tag: '02',
      kicker: 'CMS, który zna każdy',
      title: 'WordPress — ale zrobiony jak należy.',
      desc: 'Custom theme od zera (zero motywów z marketu), bez Elementora, bez page-builderów-zombie. Lekkie wtyczki, ACF dla zaawansowanego CMS, własny edytor blokowy. Editor klienta zna w 30 minut.',
      stack: ['Custom theme PHP 8', 'ACF Pro', 'WPML', 'WP-CLI', 'Lighthouse 90+'],
      use: ['Strony firmowe', 'Blogi i magazyny', 'Strony usługowe z lokalnym SEO', 'Multilanguage'],
      bullets: [
        ['Wydajność', '< 2.0s', 'Bez page-builderów. Cache + lazy load + WebP.'],
        ['CMS', 'Edytor blokowy', 'Klient samodzielnie zarządza treścią.'],
        ['Multilang', 'WPML', 'PL + EN + DE — bez problemów z tłumaczeniem.'],
      ],
      examples: ['TechCorp — strona korporacyjna IT', 'LocalLaw — kancelaria prawna'],
      from: '5 500 PLN',
      time: '3–5 tygodni',
    },
    woo: {
      label: 'WooCommerce',
      tag: '03',
      kicker: 'E-commerce na WordPress',
      title: 'Sklep, który skaluje się do 10 000 SKU.',
      desc: 'Pełna integracja: PayU, Stripe, Przelewy24, kurierzy (InPost, DPD, DHL), Allegro, Baselinker, Subiekt GT. Konfigurator produktów, warianty, abonamenty. Przetestowane na sklepach z 5 cyfrowym ruchem dziennym.',
      stack: ['WooCommerce 8+', 'Custom hooks', 'PayU/Stripe/P24', 'InPost/DPD', 'Baselinker'],
      use: ['Sklepy z 100–10 000 SKU', 'Produkty konfigurowalne', 'Sprzedaż B2B + B2C', 'Sklepy z subskrypcjami'],
      bullets: [
        ['Skalowalność', 'Do 10k SKU', 'Optymalizacja zapytań, cache produktowy.'],
        ['Płatności', '5+ bramek', 'PayU, Stripe, P24, BLIK, raty Allegro.'],
        ['Logistyka', 'Pełna automatyka', 'Etykiety, śledzenie, paragony.'],
      ],
      examples: ['HomeDesign — meble z konfiguratorem 3D', 'BeautyShop — kosmetyki premium'],
      from: '9 500 PLN',
      time: '6–10 tygodni',
    },
    presta: {
      label: 'PrestaShop',
      tag: '04',
      kicker: 'E-commerce dla wymagających',
      title: 'Dla sklepów, gdzie WordPress to za mało.',
      desc: 'Prestashop 8.x — gdy potrzebujesz multistore, zaawansowanej polityki cen, B2B z kontami i zniżkami per klient. Custom moduły gdzie standardowe nie wystarczają. Migracje z 1.7 → 8.x bez utraty SEO.',
      stack: ['PrestaShop 8+', 'Symfony 6', 'Smarty', 'Custom modules', 'Multistore'],
      use: ['Multistore (kilka domen, jeden panel)', 'B2B z indywidualnymi cennikami', 'Hurtownie online', 'Sklepy 10k+ produktów'],
      bullets: [
        ['Multistore', 'Jeden panel', 'Kilka domen, kilka walut, jedna baza.'],
        ['B2B', 'Cennik per klient', 'Negocjowane ceny, dostawy, terminy płatności.'],
        ['Migracje', '1.7 → 8.x', 'Bez utraty SEO, z zachowaniem URL i przekierowań.'],
      ],
      examples: ['FoodDelivery — marketplace restauracji', 'HurtBudowlany — B2B z cennikami'],
      from: '12 000 PLN',
      time: '8–14 tygodni',
    },
    app: {
      label: 'Aplikacje webowe',
      tag: '05',
      kicker: 'Spring Boot + React',
      title: 'Aplikacje, które mają działać latami.',
      desc: 'Backend Spring Boot 3 (Java 21), frontend React/Next.js, PostgreSQL, Redis na cache. CI/CD z GitHub Actions, Docker, monitoring (Sentry, Grafana). Skala do tysięcy concurrent users.',
      stack: ['Spring Boot 3', 'Java 21', 'PostgreSQL', 'Redis', 'React/Next', 'Docker'],
      use: ['Portale klienta (B2B, B2C)', 'Systemy rezerwacyjne', 'Panele administracyjne', 'CRM/ERP custom', 'Aplikacje SaaS'],
      bullets: [
        ['Skala', '10k+ users', 'Architektura mikrousług, kolejkowanie, cache.'],
        ['DevOps', 'CI/CD + Docker', 'Każdy commit testowany, każdy merge wdrażany.'],
        ['Bezpieczeństwo', 'OWASP + audyt', 'Pen-test przed produkcją, MFA, RBAC.'],
      ],
      examples: ['MediClinic — portal pacjenta', 'BookingPro — system rezerwacji'],
      from: '18 000 PLN',
      time: 'Od 12 tygodni',
    },
  };

  const a = stacks[active];

  return (
    <div className="vc ps site-frame">
      <style>{`
        .ps { padding-bottom: 64px; }
        .ps-hero { max-width: 1400px; margin: 0 auto; padding: 32px 36px 16px; }
        .ps-bread { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin-bottom: 28px; display: flex; gap: 12px; }
        .ps-bread a { color: var(--fg-muted); text-decoration: none; }
        .ps-bread a:hover { color: var(--accent); }
        .ps-title { font-size: clamp(56px, 8vw, 128px); line-height: 0.92; letter-spacing: -0.045em; margin: 0 0 24px; font-weight: 600; color: var(--fg); max-width: 18ch; }
        .ps-title .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }
        .ps-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: end; max-width: 1100px; }
        .ps-intro p { font-size: 17px; line-height: 1.55; color: var(--fg-muted); margin: 0; }

        .ps-tabs { max-width: 1400px; margin: 0 auto; padding: 32px 36px 16px; display: flex; gap: 6px; flex-wrap: wrap; position: sticky; top: 70px; z-index: 30; background: var(--bg); }
        .ps-tab { padding: 12px 22px; border: 1px solid var(--line); border-radius: 999px; cursor: pointer; font-size: 14px; font-weight: 500; color: var(--fg); background: transparent; transition: all 0.2s; display: flex; gap: 10px; align-items: center; }
        .ps-tab:hover { border-color: var(--fg-muted); }
        .ps-tab.on { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
        .ps-tab-num { font-family: var(--font-mono); font-size: 11px; opacity: 0.6; }
        .ps-tab.on .ps-tab-num { opacity: 1; }

        .ps-detail { max-width: 1400px; margin: 0 auto; padding: 24px 36px; }
        .ps-card { background: var(--bg-card); border-radius: 32px; padding: 48px; display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; }
        .ps-kicker { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .ps-kicker::before { content: ''; width: 24px; height: 1px; background: var(--accent); }
        .ps-h2 { font-size: clamp(36px, 4.5vw, 64px); line-height: 0.95; letter-spacing: -0.035em; margin: 0 0 24px; font-weight: 600; }
        .ps-desc { font-size: 17px; line-height: 1.6; color: var(--fg-muted); margin: 0 0 32px; }

        .ps-section-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin: 0 0 14px; }
        .ps-bullets { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
        .ps-bullet { display: grid; grid-template-columns: 100px 1fr; gap: 24px; padding: 16px 0; border-top: 1px solid var(--line); }
        .ps-bullet-key { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; color: var(--fg-muted); padding-top: 4px; }
        .ps-bullet-val { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; color: var(--fg); }
        .ps-bullet-val .it { font-family: var(--font-display); font-style: italic; color: var(--accent); font-weight: 400; }
        .ps-bullet-note { font-size: 13px; color: var(--fg-muted); margin-top: 4px; line-height: 1.5; }

        .ps-aside { background: var(--bg); border-radius: 24px; padding: 32px; display: flex; flex-direction: column; gap: 24px; align-self: start; }
        .ps-aside-block + .ps-aside-block { padding-top: 24px; border-top: 1px solid var(--line); }
        .ps-stack { display: flex; flex-wrap: wrap; gap: 6px; }
        .ps-stack span { padding: 6px 12px; background: var(--bg-card); border-radius: 999px; font-size: 12px; font-family: var(--font-mono); color: var(--fg); border: 1px solid var(--line); }
        .ps-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ps-meta-num { font-family: var(--font-display); font-style: italic; font-size: 36px; line-height: 1; color: var(--accent); margin-top: 6px; }
        .ps-use { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .ps-use li { font-size: 14px; color: var(--fg); display: flex; gap: 10px; align-items: baseline; }
        .ps-use li::before { content: '→'; color: var(--accent); font-family: var(--font-mono); }
        .ps-examples { display: flex; flex-direction: column; gap: 8px; }
        .ps-examples a { font-size: 14px; color: var(--fg); text-decoration: none; padding: 12px 14px; background: var(--bg-card); border-radius: 12px; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; }
        .ps-examples a:hover { background: var(--accent); color: var(--accent-fg); }

        .ps-cta { max-width: 1400px; margin: 32px auto 0; padding: 0 36px; }
        .ps-cta-card { background: var(--accent); color: var(--accent-fg); border-radius: 32px; padding: 56px; text-align: center; }
        .ps-cta-card h3 { font-size: 48px; line-height: 1; letter-spacing: -0.03em; margin: 0 0 16px; font-weight: 600; }
        .ps-cta-card h3 .it { font-family: var(--font-display); font-style: italic; font-weight: 400; }
        .ps-cta-card p { font-size: 17px; opacity: 0.85; margin: 0 auto 24px; max-width: 50ch; }
        .ps-cta-btn { background: var(--accent-fg); color: var(--accent); padding: 16px 32px; font-size: 15px; }
        .ps-cta-btn:hover { box-shadow: 0 8px 36px rgba(0,0,0,0.25); }
      `}</style>

      {/* NAV */}
      <header className="vc-nav">
        <div className="vc-nav-in">
          <a href="IT Solutions Redesign.html" className="vc-logo"><span className="vc-logo-mark">i</span> IT Solutions</a>
          <nav className="vc-nav-links" aria-label="Główna nawigacja">
            <a href="page-services.html" style={{opacity: 1, color: 'var(--accent)'}}>Usługi</a>
            <a href="page-portfolio.html">Portfolio</a>
            <a href="page-contact.html">Kontakt</a>
            <a href="#">FAQ</a>
            <a href="#">Blog</a>
          </nav>
          <a href="page-contact.html" className="vc-nav-cta">Wycena →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="ps-hero" data-screen-label="Usługi · Hero">
        <div className="ps-bread">
          <a href="IT Solutions Redesign.html">Start</a>
          <span>/</span>
          <span>Usługi</span>
        </div>
        <h1 className="ps-title">Pięć stosów. <span className="it">Jeden senior</span>. Twój projekt.</h1>
        <div className="ps-intro">
          <p>Buduję strony, sklepy i aplikacje webowe od 2020 roku. Zamiast oferować jeden stack do wszystkiego, dopasowuję narzędzie do problemu — czasem to Next.js, czasem WordPress, a czasem Spring Boot.</p>
          <p style={{textAlign: 'right'}}>Wybierz technologię niżej, żeby zobaczyć szczegóły, zakres prac, czas realizacji i widełki cenowe.</p>
        </div>
      </section>

      {/* TABS */}
      <nav className="ps-tabs" aria-label="Wybór stacku">
        {Object.entries(stacks).map(([k, s]) => (
          <button key={k} className={`ps-tab ${active === k ? 'on' : ''}`} onClick={() => setActive(k)}>
            <span className="ps-tab-num">[{s.tag}]</span> {s.label}
          </button>
        ))}
      </nav>

      {/* DETAIL */}
      <section className="ps-detail reveal" key={active} data-screen-label={`Usługi · ${a.label}`}>
        <div className="ps-card">
          <div>
            <div className="ps-kicker">[{a.tag}] · {a.kicker}</div>
            <h2 className="ps-h2">{a.title}</h2>
            <p className="ps-desc">{a.desc}</p>

            <div className="ps-section-label">Co dostajesz</div>
            <div className="ps-bullets">
              {a.bullets.map(([k, v, n], i) => (
                <div key={i} className="ps-bullet">
                  <div className="ps-bullet-key">{k}</div>
                  <div>
                    <div className="ps-bullet-val">{v}</div>
                    <div className="ps-bullet-note">{n}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="ps-aside">
            <div className="ps-aside-block">
              <div className="ps-section-label">Stack</div>
              <div className="ps-stack">
                {a.stack.map((s, i) => <span key={i}>{s}</span>)}
              </div>
            </div>

            <div className="ps-aside-block">
              <div className="ps-section-label">Kiedy używamy</div>
              <ul className="ps-use">
                {a.use.map((u, i) => <li key={i}>{u}</li>)}
              </ul>
            </div>

            <div className="ps-aside-block">
              <div className="ps-meta">
                <div>
                  <div className="ps-section-label">Od</div>
                  <div className="ps-meta-num">{a.from}</div>
                </div>
                <div>
                  <div className="ps-section-label">Czas</div>
                  <div className="ps-meta-num">{a.time}</div>
                </div>
              </div>
            </div>

            <div className="ps-aside-block">
              <div className="ps-section-label">Zrealizowane</div>
              <div className="ps-examples">
                {a.examples.map((ex, i) => (
                  <a key={i} href="page-portfolio.html">{ex} <span>↗</span></a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="ps-cta reveal">
        <div className="ps-cta-card">
          <h3>Twój projekt zaczyna się od <span className="it">briefu</span>.</h3>
          <p>Wypełnij formularz, opisz w 5 zdaniach co chcesz zrobić — wracam z rekomendowanym stackiem i wyceną w 48h.</p>
          <MagneticCTA href="page-contact.html" variant="primary" className="ps-cta-btn">Umów wycenę →</MagneticCTA>
        </div>
      </section>
    </div>
  );
};

window.PageServices = PageServices;
