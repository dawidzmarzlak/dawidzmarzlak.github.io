// Wariant A — Studio Editorial (dark, warm)
// Off-black + cream + electric lime. Serif italic dla headline'ów,
// monospace dla detali. Ticker, hover previews, scroll reveals.

const VariantA = () => {
  const [activeService, setActiveService] = React.useState(0);
  const [hoverProject, setHoverProject] = React.useState(null);
  const [calcType, setCalcType] = React.useState('next');
  const [calcPages, setCalcPages] = React.useState(8);
  const [calcCMS, setCalcCMS] = React.useState(true);

  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.va .reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const basePrice = { next: 8500, wp: 5500, woo: 9500, presta: 12000, app: 18000 };
  const price = basePrice[calcType] + (calcPages - 1) * 600 + (calcCMS ? 1500 : 0);

  const services = [
    { num: '01', title: 'Strony Next.js', desc: 'Aplikacje React z SSR, ISR i edge runtime. Lighthouse 95+, TTI poniżej 2s.', stack: 'Next.js 14 / TypeScript / Vercel' },
    { num: '02', title: 'WordPress', desc: 'Headless lub klasyczny. Własne motywy, ACF Pro, edycja w mgnieniu oka.', stack: 'WordPress / ACF / WPML' },
    { num: '03', title: 'WooCommerce', desc: 'Sklepy do 50 000 SKU. Integracje z magazynem, kurierami, Allegro, Baselinker.', stack: 'WooCommerce / Stripe / PayU' },
    { num: '04', title: 'PrestaShop', desc: 'Platformy e-commerce dla wymagających. Multistore, B2B, faktury, EDI.', stack: 'PrestaShop 8 / B2B / SAP' },
    { num: '05', title: 'Aplikacje webowe', desc: 'Spring Boot + React/Angular. SSO, RBAC, audyt — gotowe na produkcję.', stack: 'Spring / PostgreSQL / Docker' },
  ];

  const projects = [
    { name: 'FashionHub', cat: 'E-commerce', year: '2024', stack: 'Next.js 14 · Stripe · Sanity', metric: '+187% sprzedaży', preview: '#1a1815' },
    { name: 'TechCorp', cat: 'Korporacja', year: '2024', stack: 'WordPress · WPML · Custom theme', metric: 'LCP 1.2 s', preview: '#1c1a17' },
    { name: 'MediClinic', cat: 'Aplikacja', year: '2023', stack: 'React · Spring Boot · PostgreSQL', metric: '12 000 pacjentów / mies.', preview: '#181612' },
    { name: 'HomeDesign', cat: 'WooCommerce', year: '2023', stack: 'WooCommerce · Three.js · PayU', metric: '2 400 SKU', preview: '#1d1b18' },
  ];

  return (
    <div className="va site-frame">
      <style>{`
        .va { font-family: var(--font-sans); }

        /* === NAV === */
        .va-nav { position: sticky; top: 0; z-index: 60; backdrop-filter: blur(14px); background: rgba(14,13,12,0.7); border-bottom: 1px solid var(--line); }
        .va-nav-in { max-width: 1320px; margin: 0 auto; padding: 18px 36px; display: flex; align-items: center; gap: 36px; }
        .va-logo { font-family: var(--font-mono); font-size: 13px; font-weight: 600; letter-spacing: 0; display: flex; align-items: center; gap: 10px; color: var(--fg); text-decoration: none; }
        .va-logo-mark { width: 26px; height: 26px; background: var(--accent); color: var(--accent-fg); display: grid; place-items: center; font-family: var(--font-display); font-style: italic; font-size: 18px; border-radius: 4px; }
        .va-nav-links { display: flex; gap: 28px; margin-left: auto; font-size: 14px; }
        .va-nav-links a { color: var(--fg); text-decoration: none; opacity: 0.65; transition: opacity 0.15s; }
        .va-nav-links a:hover { opacity: 1; }
        .va-nav-cta { padding: 9px 18px; background: var(--accent); color: var(--accent-fg); font-size: 13px; font-weight: 500; border-radius: 999px; text-decoration: none; transition: transform 0.2s; }
        .va-nav-cta:hover { transform: translateY(-1px); }

        /* === HERO === */
        .va-hero { position: relative; max-width: 1320px; margin: 0 auto; padding: 80px 36px 96px; }
        .va-hero::before {
          content: ''; position: absolute; top: 60px; right: 36px; width: 360px; height: 360px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 60%); opacity: 0.18; filter: blur(60px);
          pointer-events: none;
        }
        .va-eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--fg-muted); display: inline-flex; align-items: center; gap: 12px; margin-bottom: 36px; padding: 6px 14px 6px 8px; border: 1px solid var(--line); border-radius: 999px; }
        .va-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        .va-hero h1 { font-size: clamp(64px, 9vw, 132px); margin: 0; max-width: 13ch; line-height: 0.92; letter-spacing: -0.04em; font-weight: 500; }
        .va-hero h1 .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); letter-spacing: -0.02em; }
        .va-hero h1 .strike { position: relative; display: inline-block; }
        .va-hero h1 .strike::after { content: ''; position: absolute; left: 0; right: 0; top: 52%; height: 4px; background: var(--warm); transform: rotate(-3deg); }
        .va-hero-grid { display: grid; grid-template-columns: 1fr 420px; gap: 64px; margin-top: 56px; padding-top: 36px; border-top: 1px solid var(--line); align-items: start; }
        .va-hero-text { font-size: 19px; line-height: 1.55; color: var(--fg-muted); max-width: 56ch; }
        .va-hero-text strong { color: var(--fg); font-weight: 500; }
        .va-hero-actions { display: flex; gap: 8px; margin-top: 32px; }
        .va-btn-primary { padding: 14px 22px; background: var(--accent); color: var(--accent-fg); border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s; }
        .va-btn-primary:hover { transform: translateY(-1px); }
        .va-btn-secondary { padding: 14px 22px; background: transparent; color: var(--fg); border: 1px solid var(--line); border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 500; }
        .va-btn-secondary:hover { border-color: var(--fg-muted); }

        /* === KALKULATOR === */
        .va-calc { background: var(--bg-card); border: 1px solid var(--line); border-radius: 16px; padding: 24px; }
        .va-calc-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .va-calc-title { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); }
        .va-calc-status { font-family: var(--font-mono); font-size: 11px; color: var(--accent); display: flex; align-items: center; gap: 6px; }
        .va-calc-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 1.5s infinite; }
        .va-calc-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
        .va-calc-label { font-size: 13px; color: var(--fg-muted); display: flex; justify-content: space-between; }
        .va-calc-label strong { color: var(--fg); font-weight: 500; font-family: var(--font-mono); }
        .va-calc-types { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
        .va-calc-type { padding: 10px 8px; background: transparent; border: 1px solid var(--line); border-radius: 8px; cursor: pointer; font-size: 11px; color: var(--fg); font-family: var(--font-mono); text-transform: uppercase; transition: all 0.15s; }
        .va-calc-type:hover { border-color: var(--fg-muted); }
        .va-calc-type.on { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
        .va-calc-slider { -webkit-appearance: none; width: 100%; height: 4px; background: var(--line); border-radius: 4px; outline: none; }
        .va-calc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: var(--accent); border-radius: 50%; cursor: pointer; }
        .va-calc-slider::-moz-range-thumb { width: 18px; height: 18px; background: var(--accent); border-radius: 50%; cursor: pointer; border: none; }
        .va-calc-toggle { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; }
        .va-calc-switch { width: 36px; height: 20px; background: var(--line); border-radius: 999px; position: relative; cursor: pointer; transition: background 0.2s; }
        .va-calc-switch.on { background: var(--accent); }
        .va-calc-switch::before { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: transform 0.2s; }
        .va-calc-switch.on::before { transform: translateX(16px); background: var(--accent-fg); }
        .va-calc-out { padding: 18px 20px; margin-top: 8px; background: var(--bg); border-radius: 12px; display: flex; align-items: baseline; justify-content: space-between; border: 1px solid var(--line); }
        .va-calc-out-label { font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); text-transform: uppercase; }
        .va-calc-out-num { font-family: var(--font-display); font-style: italic; font-size: 38px; color: var(--accent); line-height: 1; }
        .va-calc-out-num span { font-family: var(--font-mono); font-style: normal; font-size: 14px; color: var(--fg-muted); margin-left: 6px; }

        /* === MARQUEE === */
        .va-marquee { border-block: 1px solid var(--line); padding: 22px 0; overflow: hidden; }
        .va-marquee-track { display: flex; gap: 64px; white-space: nowrap; animation: marquee 50s linear infinite; font-family: var(--font-mono); font-size: 14px; color: var(--fg-muted); }
        .va-marquee-track span { display: flex; align-items: center; gap: 14px; }
        .va-marquee-track span::before { content: '◆'; color: var(--accent); font-size: 8px; }

        /* === SECTION === */
        .va-section { max-width: 1320px; margin: 0 auto; padding: 120px 36px; }
        .va-section-head { display: grid; grid-template-columns: 280px 1fr; gap: 48px; margin-bottom: 64px; align-items: end; }
        .va-section-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--fg-muted); }
        .va-section-title { font-size: clamp(40px, 5vw, 64px); margin: 0; max-width: 16ch; letter-spacing: -0.03em; line-height: 1.02; font-weight: 500; }
        .va-section-title em { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }

        /* === SERVICES === */
        .va-services-grid { display: grid; grid-template-columns: 280px 1fr; gap: 48px; }
        .va-services-aside p { font-size: 15px; color: var(--fg-muted); line-height: 1.6; max-width: 28ch; }
        .va-services-aside .meta { margin-top: 24px; font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); padding-top: 24px; border-top: 1px solid var(--line); line-height: 1.7; }
        .va-services-list { border-top: 1px solid var(--line); }
        .va-service { display: grid; grid-template-columns: 60px 1fr auto; gap: 24px; padding: 32px 0; border-bottom: 1px solid var(--line); cursor: pointer; transition: padding-left 0.25s; align-items: start; }
        .va-service:hover, .va-service.on { padding-left: 16px; }
        .va-service-num { font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); padding-top: 8px; }
        .va-service-title { font-size: clamp(28px, 3vw, 40px); font-weight: 500; letter-spacing: -0.02em; margin: 0 0 10px; line-height: 1.05; }
        .va-service.on .va-service-title { color: var(--accent); font-family: var(--font-display); font-style: italic; font-weight: 400; }
        .va-service-desc { font-size: 15px; color: var(--fg-muted); line-height: 1.55; max-width: 56ch; }
        .va-service-stack { font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); margin-top: 14px; }
        .va-service-arrow { font-family: var(--font-mono); font-size: 18px; color: var(--fg-muted); transition: transform 0.2s, color 0.2s; padding-top: 6px; }
        .va-service:hover .va-service-arrow { transform: translateX(8px); color: var(--accent); }

        /* === STATS === */
        .va-stats-band { background: var(--accent); color: var(--accent-fg); }
        .va-stats-in { max-width: 1320px; margin: 0 auto; padding: 100px 36px; }
        .va-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1px solid rgba(0,0,0,0.15); margin-top: 56px; }
        .va-stats-head { display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: end; }
        .va-stats-head .va-section-label { color: rgba(0,0,0,0.6); }
        .va-stats-head h2 { font-size: clamp(40px, 5vw, 64px); margin: 0; color: var(--accent-fg); max-width: 16ch; letter-spacing: -0.03em; line-height: 1.02; font-weight: 500; }
        .va-stats-head h2 em { font-family: var(--font-display); font-style: italic; font-weight: 400; }
        .va-stat { padding: 32px 24px 0 0; border-right: 1px solid rgba(0,0,0,0.15); }
        .va-stat:last-child { border-right: none; }
        .va-stat-num { font-family: var(--font-display); font-style: italic; font-size: clamp(72px, 8vw, 112px); font-weight: 400; line-height: 0.95; letter-spacing: -0.04em; }
        .va-stat-num span { font-family: var(--font-sans); font-style: normal; font-size: 0.4em; vertical-align: super; margin-left: 6px; }
        .va-stat-label { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(0,0,0,0.7); margin-top: 14px; }

        /* === PROJECTS === */
        .va-projects { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border-block: 1px solid var(--line); }
        .va-project { background: var(--bg); padding: 36px; min-height: 360px; display: flex; flex-direction: column; cursor: pointer; transition: background 0.3s; position: relative; overflow: hidden; }
        .va-project:hover { background: var(--bg-card); }
        .va-project-meta { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .va-project-name { font-size: clamp(36px, 4vw, 56px); font-weight: 500; letter-spacing: -0.03em; margin: auto 0 18px; line-height: 1; }
        .va-project-name em { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }
        .va-project-stack { font-family: var(--font-mono); font-size: 12px; color: var(--fg-muted); }
        .va-project-metric { position: absolute; top: 36px; right: 36px; padding: 6px 12px; background: var(--accent-soft); color: var(--accent); font-family: var(--font-mono); font-size: 11px; border-radius: 999px; font-weight: 500; border: 1px solid var(--accent); }
        .va-project-preview { position: absolute; inset: 0; opacity: 0; transition: opacity 0.4s; pointer-events: none; background-image: linear-gradient(135deg, rgba(212,255,82,0.05), transparent 50%); }
        .va-project:hover .va-project-preview { opacity: 1; }
        .va-project-preview-frame { position: absolute; right: -40px; bottom: -20px; width: 280px; height: 180px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--line); box-shadow: 0 24px 60px rgba(0,0,0,0.5); transform: rotate(-3deg); display: flex; flex-direction: column; padding: 10px; gap: 6px; }
        .va-project-preview-frame::before { content: ''; height: 8px; border-radius: 2px; background: var(--accent); width: 40%; }
        .va-project-preview-frame::after { content: ''; height: 4px; border-radius: 2px; background: var(--line); width: 80%; box-shadow: 0 8px 0 var(--line), 0 16px 0 var(--line); }

        /* === PROCESS === */
        .va-process { display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-top: 48px; position: relative; }
        .va-process::before { content: ''; position: absolute; top: 9px; left: 0; right: 0; height: 1px; background: var(--line); }
        .va-process-step { position: relative; padding-top: 32px; }
        .va-process-dot { position: absolute; top: 0; left: 0; width: 18px; height: 18px; border-radius: 50%; background: var(--bg); border: 1px solid var(--fg-muted); display: grid; place-items: center; font-family: var(--font-mono); font-size: 9px; font-weight: 600; color: var(--fg-muted); }
        .va-process-step.first .va-process-dot { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); }
        .va-process-step h4 { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px; font-weight: 600; color: var(--fg); }
        .va-process-step p { font-size: 13px; color: var(--fg-muted); line-height: 1.55; margin: 0; }

        /* === FAQ === */
        .va-faq { display: grid; grid-template-columns: 280px 1fr; gap: 48px; }
        .va-faq-list { border-top: 1px solid var(--line); }
        .va-faq-item { padding: 28px 0; border-bottom: 1px solid var(--line); cursor: pointer; }
        .va-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 24px; }
        .va-faq-q h4 { font-size: 22px; font-weight: 500; margin: 0; letter-spacing: -0.01em; }
        .va-faq-q .va-faq-mark { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center; font-family: var(--font-mono); flex-shrink: 0; transition: all 0.2s; }
        .va-faq-item.open .va-faq-mark { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); transform: rotate(45deg); }
        .va-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.3s, margin-top 0.3s; color: var(--fg-muted); font-size: 15px; line-height: 1.6; }
        .va-faq-item.open .va-faq-a { max-height: 200px; margin-top: 16px; }
        .va-faq-num { font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); margin-right: 16px; }

        /* === QUOTE === */
        .va-quote { background: var(--bg-card); }
        .va-quote-in { max-width: 1320px; margin: 0 auto; padding: 120px 36px; display: grid; grid-template-columns: 280px 1fr; gap: 48px; }
        .va-quote-text { font-family: var(--font-display); font-size: clamp(36px, 4vw, 56px); font-style: italic; line-height: 1.2; letter-spacing: -0.02em; max-width: 22ch; font-weight: 400; }
        .va-quote-text::before, .va-quote-text::after { content: '"'; color: var(--accent); }
        .va-quote-author { font-family: var(--font-mono); font-size: 13px; margin-top: 36px; color: var(--fg-muted); display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .va-quote-author strong { color: var(--fg); font-weight: 600; }

        /* === CTA === */
        .va-cta { max-width: 1320px; margin: 0 auto; padding: 140px 36px; text-align: center; position: relative; }
        .va-cta::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; background: radial-gradient(circle, var(--accent) 0%, transparent 60%); opacity: 0.08; filter: blur(60px); pointer-events: none; }
        .va-cta h2 { font-size: clamp(64px, 9vw, 128px); margin: 0; line-height: 0.95; letter-spacing: -0.04em; font-weight: 500; }
        .va-cta h2 em { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }
        .va-cta p { font-size: 19px; color: var(--fg-muted); margin: 28px auto 40px; max-width: 50ch; line-height: 1.55; }
        .va-cta-actions { display: inline-flex; gap: 8px; }

        /* === FOOTER === */
        .va-footer { border-top: 1px solid var(--line); }
        .va-footer-in { max-width: 1320px; margin: 0 auto; padding: 80px 36px 32px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        .va-footer h5 { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin: 0 0 16px; font-weight: 600; }
        .va-footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .va-footer a { color: var(--fg); text-decoration: none; font-size: 14px; opacity: 0.75; }
        .va-footer-brand h3 { font-family: var(--font-display); font-style: italic; font-size: 36px; margin: 0 0 16px; font-weight: 400; }
        .va-footer-brand p { font-size: 14px; color: var(--fg-muted); max-width: 30ch; line-height: 1.55; }
        .va-footer-bottom { max-width: 1320px; margin: 0 auto; padding: 24px 36px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); }
      `}</style>

      {/* NAV */}
      <header className="va-nav">
        <div className="va-nav-in">
          <a href="#" className="va-logo"><span className="va-logo-mark">i</span> IT Solutions</a>
          <nav className="va-nav-links" aria-label="Główna nawigacja">
            <a href="#services">Usługi</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#process">Proces</a>
            <a href="#faq">FAQ</a>
            <a href="#blog">Blog</a>
          </nav>
          <a href="#contact" className="va-nav-cta">Bezpłatna wycena →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="va-hero" data-screen-label="A · Hero">
        <div className="va-eyebrow"><span className="va-eyebrow-dot" /> 5+ lat · Tysiące codziennych użytkowników</div>
        <h1>
          Tworzę <span className="it">strony</span>,<br/>
          które potrafią <br/>
          <span className="it">zarabiać.</span>
        </h1>
        <div className="va-hero-grid">
          <div>
            <p className="va-hero-text">
              <strong>IT Solutions</strong> — pracownia stron, sklepów i aplikacji webowych. Od 2020 roku
              wdrażam projekty dla dużych firm i mniejszych biznesów. Stack dopasowany do problemu, nie
              odwrotnie: <strong>Next.js, WordPress, WooCommerce, PrestaShop, Spring Boot</strong>.
            </p>
            <div className="va-hero-actions">
              <a href="#contact" className="va-btn-primary">Zamów wycenę <span>→</span></a>
              <a href="#portfolio" className="va-btn-secondary">Realizacje</a>
            </div>
          </div>

          {/* CALCULATOR */}
          <div className="va-calc" aria-label="Kalkulator wyceny">
            <div className="va-calc-head">
              <span className="va-calc-title">// Kalkulator wyceny</span>
              <span className="va-calc-status">live</span>
            </div>
            <div className="va-calc-row">
              <span className="va-calc-label">Typ projektu</span>
              <div className="va-calc-types">
                {[['next','Next'],['wp','WP'],['woo','Woo'],['presta','Presta'],['app','App']].map(([k,l]) => (
                  <button key={k} className={`va-calc-type ${calcType===k?'on':''}`} onClick={() => setCalcType(k)}>{l}</button>
                ))}
              </div>
            </div>
            <div className="va-calc-row">
              <span className="va-calc-label">Liczba podstron <strong>{calcPages}</strong></span>
              <input type="range" min="1" max="30" value={calcPages} onChange={e => setCalcPages(+e.target.value)} className="va-calc-slider" />
            </div>
            <div className="va-calc-toggle">
              <span className="va-calc-label">Edycja przez CMS</span>
              <span className={`va-calc-switch ${calcCMS?'on':''}`} onClick={() => setCalcCMS(v => !v)} role="switch" aria-checked={calcCMS} />
            </div>
            <div className="va-calc-out">
              <span className="va-calc-out-label">Szacunkowo od</span>
              <span className="va-calc-out-num">{price.toLocaleString('pl-PL')} <span>PLN netto</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="va-marquee" aria-hidden="true">
        <div className="va-marquee-track">
          {Array(2).fill(0).flatMap((_, j) => ['Next.js 14','TypeScript','React','WordPress','WooCommerce','PrestaShop','Spring Boot','PostgreSQL','Stripe','Vercel','Docker','Tailwind'].map((t,i) => <span key={`${j}-${i}`}>{t}</span>))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="va-section reveal" id="services" data-screen-label="A · Usługi">
        <div className="va-section-head">
          <div className="va-section-label">[01] Usługi</div>
          <h2 className="va-section-title">Pięć stosów, w których jestem <em>naprawdę</em> dobry.</h2>
        </div>
        <div className="va-services-grid">
          <aside className="va-services-aside">
            <p>Nie robię wszystkiego. Robię pięć stosów technologicznych — porządnie. Każdy projekt prowadzi senior, od briefu po wdrożenie.</p>
            <div className="meta">→ Stack handover<br/>→ Dokumentacja techniczna<br/>→ 6 mies. wsparcia w cenie</div>
          </aside>
          <div className="va-services-list">
            {services.map((s, i) => (
              <article key={i} className={`va-service ${activeService === i ? 'on' : ''}`} onMouseEnter={() => setActiveService(i)}>
                <div className="va-service-num">{s.num}</div>
                <div>
                  <h3 className="va-service-title">{s.title}</h3>
                  <p className="va-service-desc">{s.desc}</p>
                  <div className="va-service-stack">{s.stack}</div>
                </div>
                <span className="va-service-arrow">→</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND - lime */}
      <section className="va-stats-band reveal" data-screen-label="A · Liczby">
        <div className="va-stats-in">
          <div className="va-stats-head">
            <div className="va-section-label">[02] W liczbach</div>
            <h2>Pięć lat. <em>Tysiące</em> użytkowników. Zero zniknięć.</h2>
          </div>
          <div className="va-stats-grid">
            <div className="va-stat"><div className="va-stat-num">5<span>+ lat</span></div><div className="va-stat-label">Doświadczenia komercyjnego</div></div>
            <div className="va-stat"><div className="va-stat-num">1000<span>+ /dzień</span></div><div className="va-stat-label">Użytkowników na produkcji</div></div>
            <div className="va-stat"><div className="va-stat-num">5<span>★</span></div><div className="va-stat-label">Średnia ocena klientów</div></div>
            <div className="va-stat"><div className="va-stat-num">100<span>%</span></div><div className="va-stat-label">Projektów wdrożonych</div></div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="reveal" id="portfolio" data-screen-label="A · Portfolio">
        <div className="va-section">
          <div className="va-section-head">
            <div className="va-section-label">[03] Portfolio</div>
            <h2 className="va-section-title">Projekty, które <em>poszły do produkcji.</em></h2>
          </div>
        </div>
        <div className="va-projects">
          {projects.map((p, i) => (
            <article key={i} className="va-project" onMouseEnter={() => setHoverProject(i)} onMouseLeave={() => setHoverProject(null)}>
              <div className="va-project-meta">
                <span>{p.cat}</span>
                <span>{p.year}</span>
              </div>
              <div className="va-project-name"><em>{p.name.charAt(0)}</em>{p.name.slice(1)}</div>
              <div className="va-project-stack">{p.stack}</div>
              <span className="va-project-metric">{p.metric}</span>
              <div className="va-project-preview"><div className="va-project-preview-frame" /></div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="va-section reveal" id="process" data-screen-label="A · Proces">
        <div className="va-section-head">
          <div className="va-section-label">[04] Proces</div>
          <h2 className="va-section-title">Siedem kroków od briefu do <em>live na produkcji.</em></h2>
        </div>
        <div className="va-process">
          {[
            ['Konsultacja', 'Bezpłatne 30 min. Brief, cele, KPI.'],
            ['Wycena', 'Stała cena lub T&M. Harmonogram tygodniowy.'],
            ['UX/UI', 'Wireframe → makieta hi-fi w Figmie.'],
            ['Development', 'Sprinty 2-tygodniowe. Demo co piątek.'],
            ['Testy', 'E2E, perf, a11y, security audit.'],
            ['Wdrożenie', 'CI/CD. Domena, SSL, monitoring 24/7.'],
            ['Wsparcie', '6 miesięcy w cenie. SLA opcjonalnie.'],
          ].map(([t, d], i) => (
            <div key={i} className={`va-process-step ${i === 0 ? 'first' : ''}`}>
              <div className="va-process-dot">{String(i+1).padStart(2,'0')}</div>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="va-section reveal" id="faq" data-screen-label="A · FAQ">
        <div className="va-faq">
          <div>
            <div className="va-section-label">[05] FAQ</div>
            <h2 className="va-section-title" style={{marginTop: 24}}>Pytania, które <em>najczęściej</em> słyszę.</h2>
          </div>
          <div className="va-faq-list">
            {[
              ['Ile trwa realizacja projektu?', 'Strona wizytówka: 3–4 tyg. Sklep: 6–10 tyg. Aplikacja: od 12 tyg. Każdy projekt dostaje dokładny harmonogram.'],
              ['Ile kosztuje strona internetowa?', 'Wizytówka od 5 500 PLN, sklep od 9 500 PLN, aplikacja od 18 000 PLN. Powyżej znajdziesz kalkulator z dokładniejszą wyceną.'],
              ['Czy oferujecie hosting?', 'Tak — Vercel, AWS, OVH lub własny VPS. Doradzam najlepsze rozwiązanie dla danego stacku i budżetu.'],
              ['Czy mogę edytować stronę samodzielnie?', 'Każdy projekt ma CMS (WordPress, Sanity, Strapi) lub panel admina. Po wdrożeniu prowadzę szkolenie.'],
              ['Co z SEO?', 'Schema.org, meta tagi, OG, sitemap, robots, Lighthouse 95+. Wszystko domyślnie. Dodatkowo audyt po wdrożeniu.'],
            ].map(([q, a], i) => (
              <details key={i} className="va-faq-item" open={i===0}>
                <summary className="va-faq-q" style={{listStyle:'none', cursor:'pointer'}}>
                  <h4><span className="va-faq-num">[{String(i+1).padStart(2,'0')}]</span>{q}</h4>
                  <span className="va-faq-mark">+</span>
                </summary>
                <div className="va-faq-a" style={{maxHeight: 'none', marginTop: 16}}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="va-quote reveal" data-screen-label="A · Opinia">
        <div className="va-quote-in">
          <div className="va-section-label">[06] Co mówią klienci</div>
          <div>
            <p className="va-quote-text">
              Strona przekroczyła nasze oczekiwania. Czas ładowania spadł z 4,2 s do 1,1 s, a sprzedaż w pierwszym kwartale po wdrożeniu wzrosła o 187%.
            </p>
            <div className="va-quote-author">
              <strong>Anna Kowalska</strong> · CEO, FashionHub · grudzień 2024
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="va-cta reveal" id="contact" data-screen-label="A · CTA">
        <h2>Porozmawiajmy<br/>o <em>Twoim projekcie.</em></h2>
        <p>Bezpłatna 30-minutowa konsultacja. Wracam z wyceną w 48h. Bez prezentacji, bez handlowca w pętli.</p>
        <div className="va-cta-actions">
          <a href="#" className="va-btn-primary">Umów konsultację →</a>
          <a href="#" className="va-btn-secondary">hello@itsolutions.com</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="va-footer">
        <div className="va-footer-in">
          <div className="va-footer-brand">
            <h3>IT Solutions</h3>
            <p>Pracownia stron, sklepów i aplikacji webowych. Warszawa, działam zdalnie w całej UE.</p>
          </div>
          <div>
            <h5>Usługi</h5>
            <ul><li><a href="#">Next.js</a></li><li><a href="#">WordPress</a></li><li><a href="#">E-commerce</a></li><li><a href="#">Aplikacje</a></li></ul>
          </div>
          <div>
            <h5>Pracownia</h5>
            <ul><li><a href="#">O nas</a></li><li><a href="#">Portfolio</a></li><li><a href="#">Blog</a></li><li><a href="#">Cennik</a></li></ul>
          </div>
          <div>
            <h5>Kontakt</h5>
            <ul><li>hello@itsolutions.com</li><li>+48 123 456 789</li><li>Warszawa, PL</li></ul>
          </div>
        </div>
        <div className="va-footer-bottom">
          <span>© 2026 IT Solutions. Wszystkie prawa zastrzeżone.</span>
          <span>NIP: 000-000-00-00 · Polityka prywatności</span>
        </div>
      </footer>
    </div>
  );
};

window.VariantA = VariantA;
