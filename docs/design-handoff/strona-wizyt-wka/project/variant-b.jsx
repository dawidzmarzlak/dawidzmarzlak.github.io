// Wariant B — Live Workspace
// Deep navy + magenta + cyan. Monospace dla całych zdań w nagłówkach,
// terminal-like vibe, grid 12-kol, dane jako kod.

const VariantB = () => {
  const [selectedTech, setSelectedTech] = React.useState('Next.js');
  const [activeTab, setActiveTab] = React.useState('overview');

  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.vb .reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const techStack = {
    'Next.js': { tag: 'frontend', use: 'Strony marketingowe, dashboardy, SaaS', perf: 'LCP 0.8s · TTI 1.4s', best: 'FashionHub, EduPlatform' },
    'WordPress': { tag: 'cms', use: 'Strony korporacyjne z dużą edycją', perf: 'LCP 1.4s · 50+ podstron', best: 'TechCorp, lokalne biznesy' },
    'WooCommerce': { tag: 'e-commerce', use: 'Sklepy do 50k SKU', perf: '12k zamówień / mc', best: 'HomeDesign' },
    'PrestaShop': { tag: 'e-commerce', use: 'B2B, multistore, EDI', perf: 'Multi-currency, multi-lang', best: 'FoodDelivery' },
    'Spring Boot': { tag: 'backend', use: 'API, mikroserwisy, integracje', perf: 'p99 < 50ms', best: 'MediClinic' },
  };

  const projects = [
    { name: 'FashionHub', tags: ['e-commerce', 'next.js'], year: '2024', metric: '+187%', metricLabel: 'sprzedaży', color: '#ff3d8b' },
    { name: 'TechCorp', tags: ['corporate', 'wordpress'], year: '2024', metric: '1.2s', metricLabel: 'LCP', color: '#4dffd4' },
    { name: 'MediClinic', tags: ['healthcare', 'react', 'spring'], year: '2023', metric: '12k', metricLabel: 'pacjentów / mc', color: '#ffb84d' },
    { name: 'HomeDesign', tags: ['e-commerce', 'woocommerce'], year: '2023', metric: '2400', metricLabel: 'SKU', color: '#a78bfa' },
    { name: 'EduPlatform', tags: ['edtech', 'next.js'], year: '2023', metric: '8k', metricLabel: 'studentów', color: '#ff3d8b' },
    { name: 'FoodDelivery', tags: ['marketplace', 'prestashop'], year: '2022', metric: '150+', metricLabel: 'restauracji', color: '#4dffd4' },
  ];

  return (
    <div className="vb site-frame">
      <style>{`
        .vb { font-family: var(--font-mono); }
        .vb h1, .vb h2, .vb h3 { font-family: var(--font-mono); font-weight: 500; letter-spacing: -0.02em; }

        /* === GRID OVERLAY === */
        .vb-grid-bg { position: relative; }
        .vb-grid-bg::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }

        /* === NAV === */
        .vb-nav { position: sticky; top: 0; z-index: 60; backdrop-filter: blur(14px); background: rgba(10,10,20,0.7); border-bottom: 1px solid var(--line); font-family: var(--font-mono); }
        .vb-nav-in { max-width: 1320px; margin: 0 auto; padding: 14px 36px; display: flex; align-items: center; gap: 24px; }
        .vb-logo { display: flex; align-items: center; gap: 10px; color: var(--fg); text-decoration: none; font-size: 13px; font-weight: 600; }
        .vb-logo-mark { width: 28px; height: 28px; display: grid; place-items: center; border: 1px solid var(--accent); color: var(--accent); border-radius: 4px; font-size: 14px; position: relative; }
        .vb-logo-mark::after { content: ''; position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; background: var(--accent-2); border-radius: 50%; animation: pulse 2s infinite; }
        .vb-nav-status { font-size: 11px; color: var(--fg-muted); border-left: 1px solid var(--line); padding-left: 16px; display: flex; align-items: center; gap: 6px; }
        .vb-nav-status::before { content: ''; width: 6px; height: 6px; background: var(--accent-2); border-radius: 50%; animation: pulse 2s infinite; }
        .vb-nav-links { display: flex; gap: 2px; margin-left: auto; }
        .vb-nav-links a { color: var(--fg); text-decoration: none; font-size: 12px; padding: 8px 14px; border-radius: 6px; opacity: 0.7; transition: all 0.15s; }
        .vb-nav-links a:hover { opacity: 1; background: var(--bg-card); }
        .vb-nav-cta { padding: 9px 16px; background: var(--accent); color: var(--accent-fg); font-size: 12px; font-weight: 600; border-radius: 6px; text-decoration: none; }

        /* === HERO === */
        .vb-hero { position: relative; max-width: 1320px; margin: 0 auto; padding: 80px 36px 80px; }
        .vb-hero-tag { display: inline-flex; align-items: center; gap: 10px; padding: 6px 14px; border: 1px solid var(--line); border-radius: 6px; font-size: 11px; color: var(--fg-muted); margin-bottom: 32px; }
        .vb-hero-tag::before { content: '$'; color: var(--accent-2); }
        .vb-hero h1 { font-size: clamp(48px, 6.5vw, 96px); line-height: 1; margin: 0; max-width: 18ch; font-family: var(--font-mono); font-weight: 500; letter-spacing: -0.04em; }
        .vb-hero h1 .accent { color: var(--accent); }
        .vb-hero h1 .accent2 { color: var(--accent-2); }
        .vb-hero h1 .cursor { display: inline-block; width: 0.55em; height: 0.85em; background: var(--accent); margin-left: 0.05em; vertical-align: -0.05em; animation: blink 1.1s steps(2) infinite; }

        .vb-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 56px; }
        .vb-hero-col p { font-size: 16px; line-height: 1.6; color: var(--fg-muted); max-width: 50ch; }
        .vb-hero-col p strong { color: var(--fg); font-weight: 500; }
        .vb-hero-actions { display: flex; gap: 8px; margin-top: 24px; }
        .vb-btn-primary { padding: 12px 20px; background: var(--accent); color: var(--accent-fg); border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
        .vb-btn-secondary { padding: 12px 20px; border: 1px solid var(--line); color: var(--fg); border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500; }
        .vb-btn-secondary:hover { border-color: var(--fg-muted); }

        /* === TERMINAL CARD === */
        .vb-terminal { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
        .vb-terminal-bar { padding: 10px 14px; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--fg-muted); }
        .vb-terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
        .vb-terminal-dot.r { background: #ff5f56; }
        .vb-terminal-dot.y { background: #ffbd2e; }
        .vb-terminal-dot.g { background: #27c93f; }
        .vb-terminal-tabs { margin-left: 16px; display: flex; gap: 4px; }
        .vb-terminal-tab { padding: 4px 10px; border-radius: 4px; cursor: pointer; }
        .vb-terminal-tab.on { background: rgba(255,255,255,0.06); color: var(--fg); }
        .vb-terminal-body { padding: 18px; font-size: 13px; line-height: 1.7; }
        .vb-terminal-line { display: flex; gap: 10px; }
        .vb-terminal-prompt { color: var(--accent-2); flex-shrink: 0; }
        .vb-terminal-cmd { color: var(--fg); }
        .vb-terminal-out { color: var(--fg-muted); }
        .vb-terminal-out .key { color: var(--accent); }
        .vb-terminal-out .val { color: var(--accent-2); }
        .vb-terminal-out .num { color: var(--fg); }

        /* === MARQUEE === */
        .vb-marquee { border-block: 1px solid var(--line); padding: 18px 0; overflow: hidden; }
        .vb-marquee-track { display: flex; gap: 48px; white-space: nowrap; animation: marquee 40s linear infinite; font-size: 13px; color: var(--fg-muted); }
        .vb-marquee-track span { display: flex; align-items: center; gap: 12px; }
        .vb-marquee-track span::before { content: '//'; color: var(--accent); }

        /* === SECTION === */
        .vb-section { max-width: 1320px; margin: 0 auto; padding: 100px 36px; }
        .vb-section-head { display: flex; align-items: end; justify-content: space-between; gap: 48px; margin-bottom: 56px; padding-bottom: 24px; border-bottom: 1px solid var(--line); }
        .vb-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--fg-muted); }
        .vb-section-label::before { content: '#'; color: var(--accent); margin-right: 4px; }
        .vb-section-title { font-size: clamp(36px, 4.5vw, 56px); margin: 8px 0 0; max-width: 22ch; line-height: 1.05; font-weight: 500; }
        .vb-section-title .a { color: var(--accent); }
        .vb-section-title .b { color: var(--accent-2); }

        /* === SERVICES — Tech selector === */
        .vb-services { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
        .vb-services-list { display: flex; flex-direction: column; gap: 4px; }
        .vb-service-tab { padding: 16px 18px; border: 1px solid var(--line); border-radius: 8px; cursor: pointer; transition: all 0.15s; background: transparent; text-align: left; font-family: var(--font-mono); }
        .vb-service-tab:hover { border-color: var(--fg-muted); }
        .vb-service-tab.on { border-color: var(--accent); background: var(--accent-soft); }
        .vb-service-tab-head { display: flex; align-items: center; justify-content: space-between; }
        .vb-service-tab-name { color: var(--fg); font-size: 16px; font-weight: 500; }
        .vb-service-tab.on .vb-service-tab-name { color: var(--accent); }
        .vb-service-tab-tag { font-size: 10px; padding: 2px 8px; border-radius: 999px; background: var(--bg-card); color: var(--fg-muted); }
        .vb-service-detail { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; padding: 32px; }
        .vb-service-detail h3 { font-size: 32px; color: var(--accent); margin: 0 0 24px; }
        .vb-service-detail-row { padding: 16px 0; border-bottom: 1px dashed var(--line); display: grid; grid-template-columns: 140px 1fr; gap: 16px; align-items: baseline; }
        .vb-service-detail-row:last-child { border: none; }
        .vb-service-detail-row .k { font-size: 11px; color: var(--fg-muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .vb-service-detail-row .v { color: var(--fg); font-size: 15px; }

        /* === STATS === */
        .vb-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
        .vb-stat { background: var(--bg); padding: 32px 24px; }
        .vb-stat-num { font-size: 56px; font-weight: 500; color: var(--accent); letter-spacing: -0.04em; line-height: 1; font-family: var(--font-mono); }
        .vb-stat-num span { color: var(--fg-muted); font-size: 0.4em; margin-left: 4px; }
        .vb-stat-label { font-size: 12px; color: var(--fg-muted); margin-top: 14px; text-transform: uppercase; letter-spacing: 0.06em; }

        /* === PROJECTS — bento === */
        .vb-projects { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 280px; gap: 16px; }
        .vb-project { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; padding: 28px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
        .vb-project:hover { transform: translateY(-2px); border-color: var(--accent); }
        .vb-project.large { grid-column: span 2; }
        .vb-project-tags { display: flex; gap: 6px; margin-bottom: auto; flex-wrap: wrap; }
        .vb-project-tag { font-size: 10px; padding: 3px 8px; background: rgba(255,255,255,0.05); color: var(--fg-muted); border-radius: 999px; text-transform: lowercase; }
        .vb-project-name { font-size: 32px; color: var(--fg); font-weight: 500; letter-spacing: -0.02em; margin: 24px 0 16px; line-height: 1; }
        .vb-project.large .vb-project-name { font-size: 56px; }
        .vb-project-metric { display: flex; align-items: baseline; gap: 8px; }
        .vb-project-metric-num { font-size: 36px; font-weight: 500; }
        .vb-project-metric-label { font-size: 12px; color: var(--fg-muted); }
        .vb-project-orb { position: absolute; right: -60px; bottom: -60px; width: 200px; height: 200px; border-radius: 50%; opacity: 0.15; filter: blur(40px); pointer-events: none; transition: opacity 0.3s; }
        .vb-project:hover .vb-project-orb { opacity: 0.35; }
        .vb-project-year { position: absolute; top: 28px; right: 28px; font-size: 11px; color: var(--fg-muted); }

        /* === TESTIMONIALS === */
        .vb-testi { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .vb-testi-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; padding: 28px; display: flex; flex-direction: column; }
        .vb-testi-card-head { display: flex; gap: 8px; margin-bottom: 18px; }
        .vb-testi-card-head .vb-terminal-dot { width: 8px; height: 8px; }
        .vb-testi-text { font-size: 16px; line-height: 1.55; color: var(--fg); margin: 0 0 24px; flex: 1; }
        .vb-testi-text::before { content: '> '; color: var(--accent-2); }
        .vb-testi-author { display: flex; align-items: center; gap: 12px; padding-top: 20px; border-top: 1px dashed var(--line); }
        .vb-testi-avatar { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; font-size: 14px; font-weight: 600; flex-shrink: 0; }
        .vb-testi-name { font-size: 13px; color: var(--fg); font-weight: 600; }
        .vb-testi-role { font-size: 11px; color: var(--fg-muted); }

        /* === PROCESS — vertical timeline === */
        .vb-process { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 8px; }
        .vb-process-step { position: relative; padding: 24px 20px; background: var(--bg-card); border: 1px solid var(--line); border-radius: 10px; }
        .vb-process-step:hover { border-color: var(--accent); }
        .vb-process-num { font-size: 11px; color: var(--accent); margin-bottom: 12px; }
        .vb-process-step h4 { font-size: 15px; margin: 0 0 8px; color: var(--fg); }
        .vb-process-step p { font-size: 12px; color: var(--fg-muted); line-height: 1.5; margin: 0; }

        /* === FAQ === */
        .vb-faq { display: flex; flex-direction: column; gap: 6px; }
        .vb-faq-item { background: var(--bg-card); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
        .vb-faq-item summary { list-style: none; padding: 22px 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; gap: 24px; }
        .vb-faq-item summary::-webkit-details-marker { display: none; }
        .vb-faq-item h4 { font-size: 17px; font-weight: 500; margin: 0; color: var(--fg); display: flex; align-items: center; gap: 16px; }
        .vb-faq-item h4 .num { color: var(--accent); font-size: 13px; }
        .vb-faq-mark { font-size: 18px; color: var(--accent); transition: transform 0.2s; }
        .vb-faq-item[open] .vb-faq-mark { transform: rotate(45deg); }
        .vb-faq-content { padding: 0 24px 24px 60px; color: var(--fg-muted); font-size: 14px; line-height: 1.6; }

        /* === CTA === */
        .vb-cta { max-width: 1320px; margin: 0 auto; padding: 140px 36px; text-align: center; position: relative; }
        .vb-cta::before, .vb-cta::after { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(80px); opacity: 0.15; pointer-events: none; }
        .vb-cta::before { background: var(--accent); top: 20%; left: 10%; }
        .vb-cta::after { background: var(--accent-2); bottom: 20%; right: 10%; }
        .vb-cta h2 { font-size: clamp(48px, 6vw, 88px); line-height: 1; margin: 0 0 24px; letter-spacing: -0.04em; font-weight: 500; position: relative; }
        .vb-cta h2 .a { color: var(--accent); }
        .vb-cta p { font-size: 17px; color: var(--fg-muted); max-width: 50ch; margin: 0 auto 36px; line-height: 1.55; position: relative; }
        .vb-cta-actions { display: inline-flex; gap: 8px; position: relative; }

        /* === FOOTER === */
        .vb-footer { border-top: 1px solid var(--line); }
        .vb-footer-in { max-width: 1320px; margin: 0 auto; padding: 64px 36px 28px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        .vb-footer h5 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin: 0 0 16px; }
        .vb-footer h5::before { content: '#'; color: var(--accent); margin-right: 4px; }
        .vb-footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .vb-footer a { color: var(--fg); text-decoration: none; font-size: 13px; opacity: 0.75; }
        .vb-footer-brand h3 { font-size: 24px; margin: 0 0 16px; color: var(--accent); }
        .vb-footer-brand p { font-size: 13px; color: var(--fg-muted); max-width: 32ch; line-height: 1.55; }
        .vb-footer-bottom { max-width: 1320px; margin: 0 auto; padding: 24px 36px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-size: 11px; color: var(--fg-muted); }
      `}</style>

      {/* NAV */}
      <header className="vb-nav">
        <div className="vb-nav-in">
          <a href="#" className="vb-logo"><span className="vb-logo-mark">⌬</span> IT_Solutions</a>
          <span className="vb-nav-status">build:stable v6.2</span>
          <nav className="vb-nav-links">
            <a href="#services">~/services</a>
            <a href="#portfolio">~/portfolio</a>
            <a href="#process">~/process</a>
            <a href="#faq">~/faq</a>
            <a href="#blog">~/blog</a>
          </nav>
          <a href="#contact" className="vb-nav-cta">./wycena.sh →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="vb-hero vb-grid-bg" data-screen-label="B · Hero">
        <div className="vb-hero-tag">tworze --strony --od=2020 --uzytkownikow=tysiace</div>
        <h1>
          Tworzę <span className="accent">strony</span>,<br/>
          które potrafią<br/>
          <span className="accent2">zarabiać</span><span className="cursor"></span>
        </h1>
        <div className="vb-hero-grid">
          <div className="vb-hero-col">
            <p>
              <strong>5+ lat doświadczenia</strong> w pracy z dużymi i małymi firmami. Rozwiązania, z których codziennie korzystają tysiące użytkowników. Dopasowuję stack do problemu — nie odwrotnie.
            </p>
            <div className="vb-hero-actions">
              <a href="#contact" className="vb-btn-primary">$ start_project →</a>
              <a href="#portfolio" className="vb-btn-secondary">→ portfolio</a>
            </div>
          </div>
          <div className="vb-terminal">
            <div className="vb-terminal-bar">
              <span className="vb-terminal-dot r"></span>
              <span className="vb-terminal-dot y"></span>
              <span className="vb-terminal-dot g"></span>
              <span className="vb-terminal-tabs">
                <span className={`vb-terminal-tab ${activeTab==='overview'?'on':''}`} onClick={() => setActiveTab('overview')}>about.json</span>
                <span className={`vb-terminal-tab ${activeTab==='stack'?'on':''}`} onClick={() => setActiveTab('stack')}>stack.txt</span>
              </span>
            </div>
            <div className="vb-terminal-body">
              {activeTab === 'overview' ? (
                <>
                  <div className="vb-terminal-line"><span className="vb-terminal-prompt">→</span><span className="vb-terminal-cmd">cat about.json</span></div>
                  <div className="vb-terminal-out">{'{'}</div>
                  <div className="vb-terminal-out">  <span className="key">"experience"</span>: <span className="val">"5+ lat"</span>,</div>
                  <div className="vb-terminal-out">  <span className="key">"focus"</span>: <span className="val">"performance × konwersja"</span>,</div>
                  <div className="vb-terminal-out">  <span className="key">"clients"</span>: [<span className="val">"enterprise"</span>, <span className="val">"sme"</span>, <span className="val">"startup"</span>],</div>
                  <div className="vb-terminal-out">  <span className="key">"daily_users"</span>: <span className="num">"thousands"</span>,</div>
                  <div className="vb-terminal-out">  <span className="key">"avg_lcp"</span>: <span className="num">"1.2s"</span>,</div>
                  <div className="vb-terminal-out">  <span className="key">"available"</span>: <span className="num">true</span></div>
                  <div className="vb-terminal-out">{'}'}</div>
                </>
              ) : (
                <>
                  <div className="vb-terminal-line"><span className="vb-terminal-prompt">→</span><span className="vb-terminal-cmd">ls -la stack/</span></div>
                  <div className="vb-terminal-out">drwxr-xr-x  <span className="key">frontend</span>     Next.js · React · TypeScript</div>
                  <div className="vb-terminal-out">drwxr-xr-x  <span className="key">backend</span>      Spring Boot · Node.js · PHP</div>
                  <div className="vb-terminal-out">drwxr-xr-x  <span className="key">cms</span>          WordPress · Sanity · Strapi</div>
                  <div className="vb-terminal-out">drwxr-xr-x  <span className="key">commerce</span>     WooCommerce · PrestaShop</div>
                  <div className="vb-terminal-out">drwxr-xr-x  <span className="key">db</span>           PostgreSQL · MySQL · MongoDB</div>
                  <div className="vb-terminal-out">drwxr-xr-x  <span className="key">cloud</span>        AWS · Vercel · GCP · OVH</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="vb-marquee" aria-hidden="true">
        <div className="vb-marquee-track">
          {Array(2).fill(0).flatMap((_, j) => ['Next.js','React','TypeScript','Spring Boot','PostgreSQL','WooCommerce','PrestaShop','Vercel','AWS','Docker','Tailwind','Stripe'].map((t,i) => <span key={`${j}-${i}`}>{t}</span>))}
        </div>
      </div>

      {/* STATS */}
      <section className="vb-section reveal" data-screen-label="B · Liczby">
        <div className="vb-section-head">
          <div>
            <div className="vb-section-label">stats.metrics</div>
            <h2 className="vb-section-title">Liczby, które się <span className="a">liczą</span>.</h2>
          </div>
        </div>
        <div className="vb-stats">
          <div className="vb-stat"><div className="vb-stat-num">5<span>+ lat</span></div><div className="vb-stat-label">doświadczenia</div></div>
          <div className="vb-stat"><div className="vb-stat-num">1k<span>+ /dzień</span></div><div className="vb-stat-label">aktywnych użytkowników</div></div>
          <div className="vb-stat"><div className="vb-stat-num">5<span>★</span></div><div className="vb-stat-label">średnia ocena</div></div>
          <div className="vb-stat"><div className="vb-stat-num">100<span>%</span></div><div className="vb-stat-label">projektów wdrożonych</div></div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="vb-section reveal" id="services" data-screen-label="B · Usługi">
        <div className="vb-section-head">
          <div>
            <div className="vb-section-label">services.list</div>
            <h2 className="vb-section-title">Stack <span className="a">dopasowany</span> do problemu — <span className="b">nie odwrotnie</span>.</h2>
          </div>
        </div>
        <div className="vb-services">
          <div className="vb-services-list">
            {Object.keys(techStack).map((k) => (
              <button key={k} className={`vb-service-tab ${selectedTech===k?'on':''}`} onClick={() => setSelectedTech(k)}>
                <div className="vb-service-tab-head">
                  <span className="vb-service-tab-name">{k}</span>
                  <span className="vb-service-tab-tag">{techStack[k].tag}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="vb-service-detail">
            <h3>{selectedTech}</h3>
            <div className="vb-service-detail-row"><span className="k">use_case</span><span className="v">{techStack[selectedTech].use}</span></div>
            <div className="vb-service-detail-row"><span className="k">performance</span><span className="v">{techStack[selectedTech].perf}</span></div>
            <div className="vb-service-detail-row"><span className="k">deployed_for</span><span className="v">{techStack[selectedTech].best}</span></div>
            <div className="vb-service-detail-row"><span className="k">tag</span><span className="v">#{techStack[selectedTech].tag}</span></div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO — Bento */}
      <section className="vb-section reveal" id="portfolio" data-screen-label="B · Portfolio">
        <div className="vb-section-head">
          <div>
            <div className="vb-section-label">portfolio.recent</div>
            <h2 className="vb-section-title">Sześć wdrożeń, które <span className="a">poszły</span> na produkcję.</h2>
          </div>
        </div>
        <div className="vb-projects">
          {projects.map((p, i) => (
            <article key={i} className={`vb-project ${i===0?'large':''}`}>
              <div className="vb-project-year">{p.year}</div>
              <div className="vb-project-tags">
                {p.tags.map(t => <span key={t} className="vb-project-tag">#{t}</span>)}
              </div>
              <div className="vb-project-name">{p.name}</div>
              <div className="vb-project-metric">
                <span className="vb-project-metric-num" style={{color: p.color}}>{p.metric}</span>
                <span className="vb-project-metric-label">{p.metricLabel}</span>
              </div>
              <div className="vb-project-orb" style={{background: p.color}}></div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="vb-section reveal" data-screen-label="B · Opinie">
        <div className="vb-section-head">
          <div>
            <div className="vb-section-label">clients.feedback</div>
            <h2 className="vb-section-title">Co mówią <span className="a">klienci</span>.</h2>
          </div>
        </div>
        <div className="vb-testi">
          {[
            { text: 'Czas ładowania spadł z 4,2s do 1,1s, sprzedaż w pierwszym kwartale wzrosła o 187%. Dawid odebrał telefon w sobotę o 22.', name: 'Anna Kowalska', role: 'CEO, FashionHub', avatar: 'AK', color: '#ff3d8b' },
            { text: 'Migrowaliśmy z monolitu na headless WordPress + Next.js. LCP z 5s na 1.2s, redaktorzy pracują 3× szybciej.', name: 'Piotr Nowak', role: 'Head of Marketing, TechCorp', avatar: 'PN', color: '#4dffd4' },
            { text: 'Aplikacja obsługuje 12 000 pacjentów miesięcznie. Zero downtime od 14 miesięcy. Dokumentacja, której naprawdę używamy.', name: 'Dr K. Wiśniewska', role: 'Dyrektor Med., MediClinic', avatar: 'KW', color: '#ffb84d' },
          ].map((t, i) => (
            <div key={i} className="vb-testi-card">
              <div className="vb-testi-card-head">
                <span className="vb-terminal-dot r"></span>
                <span className="vb-terminal-dot y"></span>
                <span className="vb-terminal-dot g"></span>
              </div>
              <p className="vb-testi-text">{t.text}</p>
              <div className="vb-testi-author">
                <div className="vb-testi-avatar" style={{background: t.color, color: 'var(--accent-fg)'}}>{t.avatar}</div>
                <div>
                  <div className="vb-testi-name">{t.name}</div>
                  <div className="vb-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="vb-section reveal" id="process" data-screen-label="B · Proces">
        <div className="vb-section-head">
          <div>
            <div className="vb-section-label">workflow.pipeline</div>
            <h2 className="vb-section-title">Pipeline od briefu do <span className="a">live</span>.</h2>
          </div>
        </div>
        <div className="vb-process">
          {[
            ['Konsultacja', '30 min, bezpłatne'],
            ['Wycena', 'Stała cena lub T&M'],
            ['UX/UI', 'Wireframe + Figma'],
            ['Dev', 'Sprinty 2-tyg'],
            ['Testy', 'E2E + perf + a11y'],
            ['Deploy', 'CI/CD + monitoring'],
            ['Support', '6 mies w cenie'],
          ].map(([t, d], i) => (
            <div key={i} className="vb-process-step">
              <div className="vb-process-num">step.{String(i+1).padStart(2,'0')}</div>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="vb-section reveal" id="faq" data-screen-label="B · FAQ">
        <div className="vb-section-head">
          <div>
            <div className="vb-section-label">faq.common</div>
            <h2 className="vb-section-title">Najczęstsze <span className="a">pytania</span>.</h2>
          </div>
        </div>
        <div className="vb-faq">
          {[
            ['Ile trwa realizacja projektu?', 'Wizytówka: 3–4 tyg. Sklep: 6–10 tyg. Aplikacja: od 12 tyg. Dokładny harmonogram dostajesz przed startem.'],
            ['Ile kosztuje strona internetowa?', 'Wizytówka od 5 500 PLN, sklep od 9 500 PLN, aplikacja od 18 000 PLN. Dokładna wycena: kalkulator w hero.'],
            ['Czy oferujecie hosting?', 'Tak — Vercel, AWS, OVH lub własny VPS. Doradzam najlepsze rozwiązanie dla danego stacku i budżetu.'],
            ['Czy mogę edytować stronę samodzielnie?', 'Każdy projekt ma CMS (WordPress, Sanity, Strapi) lub panel admina. Po wdrożeniu prowadzę szkolenie.'],
            ['Co z SEO?', 'Schema.org, meta, OG, sitemap, robots, Lighthouse 95+. Wszystko domyślnie. Plus audyt po wdrożeniu.'],
          ].map(([q, a], i) => (
            <details key={i} className="vb-faq-item" open={i===0}>
              <summary>
                <h4><span className="num">[{String(i+1).padStart(2,'0')}]</span>{q}</h4>
                <span className="vb-faq-mark">+</span>
              </summary>
              <div className="vb-faq-content">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="vb-cta reveal" id="contact" data-screen-label="B · CTA">
        <h2>Gotowy na <span className="a">start</span>?</h2>
        <p>Bezpłatna 30-minutowa konsultacja. Wracam z wyceną w 48h. Bez prezentacji, bez handlowca w pętli.</p>
        <div className="vb-cta-actions">
          <a href="#" className="vb-btn-primary">$ ./umow_konsultacje →</a>
          <a href="#" className="vb-btn-secondary">hello@itsolutions.com</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vb-footer">
        <div className="vb-footer-in">
          <div className="vb-footer-brand">
            <h3>IT_Solutions</h3>
            <p>Pracownia stron, sklepów i aplikacji webowych. Warszawa, działam zdalnie w całej UE.</p>
          </div>
          <div>
            <h5>services</h5>
            <ul><li><a href="#">Next.js</a></li><li><a href="#">WordPress</a></li><li><a href="#">E-commerce</a></li><li><a href="#">Aplikacje</a></li></ul>
          </div>
          <div>
            <h5>links</h5>
            <ul><li><a href="#">Portfolio</a></li><li><a href="#">Blog</a></li><li><a href="#">Cennik</a></li><li><a href="#">FAQ</a></li></ul>
          </div>
          <div>
            <h5>contact</h5>
            <ul><li>hello@itsolutions.com</li><li>+48 123 456 789</li><li>Warszawa, PL</li></ul>
          </div>
        </div>
        <div className="vb-footer-bottom">
          <span>© 2026 IT_Solutions / build stable v6.2</span>
          <span>NIP: 000-000-00-00 // privacy.md</span>
        </div>
      </footer>
    </div>
  );
};

window.VariantB = VariantB;
