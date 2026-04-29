// Wariant C — Bento Maximalist
// Czarne tło + jasna karta + neonowy zielony. Bento grid wszędzie.
// Najbardziej "kreatywne studio" — duża typografia, mocny kontrast.

const VariantC = () => {
  const [hoverProj, setHoverProj] = React.useState(null);
  const [openFaq, setOpenFaq] = React.useState(0);

  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.vc .reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const projects = [
    { name: 'FashionHub', cat: 'E-commerce', year: '2024', metric: '+187%', tone: 'dark' },
    { name: 'TechCorp', cat: 'Korporacyjny', year: '2024', metric: 'LCP 1.2s', tone: 'light' },
    { name: 'MediClinic', cat: 'Aplikacja', year: '2023', metric: '12k pacjentów', tone: 'accent' },
    { name: 'HomeDesign', cat: 'WooCommerce', year: '2023', metric: '2400 SKU', tone: 'light' },
    { name: 'EduPlatform', cat: 'EdTech', year: '2023', metric: '8k studentów', tone: 'dark' },
    { name: 'FoodDelivery', cat: 'Marketplace', year: '2022', metric: '150+ restauracji', tone: 'accent' },
  ];

  return (
    <div className="vc site-frame">
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

        /* === HERO === */
        .vc-hero { max-width: 1400px; margin: 0 auto; padding: 48px 36px; }
        .vc-hero-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 16px; }
        .vc-hero-main { background: var(--bg-card); border-radius: 24px; padding: 40px; min-height: 560px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
        .vc-hero-main::before {
          content: ''; position: absolute; bottom: -200px; right: -200px; width: 500px; height: 500px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 60%);
          opacity: 0.18; filter: blur(60px); pointer-events: none;
        }
        .vc-hero-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; background: rgba(255,255,255,0.04); border-radius: 999px; font-size: 12px; color: var(--fg-muted); align-self: flex-start; margin-bottom: 32px; font-family: var(--font-mono); }
        .vc-hero-tag-dot { width: 22px; height: 22px; background: var(--accent); border-radius: 50%; }
        .vc-hero h1 { font-size: clamp(56px, 7vw, 120px); line-height: 0.92; margin: 0 0 auto; letter-spacing: -0.045em; font-weight: 600; color: var(--fg); }
        .vc-hero h1 .accent { color: var(--accent); }
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
        .vc-hero-side { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
        .vc-card { border-radius: 24px; padding: 28px; position: relative; overflow: hidden; }
        .vc-card-light { background: var(--bg-light); color: var(--fg-on-light); }
        .vc-card-accent { background: var(--accent); color: var(--accent-fg); }
        .vc-card-dark { background: var(--bg-card); color: var(--fg); }
        .vc-card-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7; margin-bottom: 12px; }
        .vc-card-h { font-size: 28px; font-weight: 600; line-height: 1.05; letter-spacing: -0.02em; margin: 0; }
        .vc-card-h em { font-style: normal; }

        .vc-card-stat { display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
        .vc-card-num { font-size: 88px; font-weight: 600; line-height: 0.9; letter-spacing: -0.05em; }
        .vc-card-num span { font-size: 0.4em; vertical-align: super; opacity: 0.6; margin-left: 6px; }
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
        .vc-section-title em { font-style: italic; font-weight: 500; }
        .vc-section-cta { font-size: 14px; color: var(--fg-muted); display: flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; }
        .vc-section-cta:hover { color: var(--fg); border-color: var(--fg-muted); }

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
        .vc-srv-title { font-size: 36px; font-weight: 600; letter-spacing: -0.03em; line-height: 1; margin: 16px 0 12px; }
        .vc-srv-1 .vc-srv-title { font-size: 56px; }
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
        .vc-projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .vc-proj { aspect-ratio: 4 / 5; border-radius: 24px; padding: 28px; position: relative; overflow: hidden; cursor: pointer; transition: transform 0.3s; display: flex; flex-direction: column; }
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

        /* === PROCESS — bento horizontal === */
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
        .vc-faq-item.open .vc-faq-a { max-height: 200px; margin-top: 14px; }

        /* === CTA === */
        .vc-cta { max-width: 1400px; margin: 0 auto 36px; padding: 0 36px; }
        .vc-cta-card { background: var(--accent); color: var(--accent-fg); border-radius: 32px; padding: 80px 60px; text-align: center; position: relative; overflow: hidden; }
        .vc-cta-card::before, .vc-cta-card::after { content: ''; position: absolute; width: 220px; height: 220px; border-radius: 50%; background: rgba(0,0,0,0.06); }
        .vc-cta-card::before { top: -80px; left: -80px; }
        .vc-cta-card::after { bottom: -100px; right: -100px; }
        .vc-cta-card h2 { font-size: clamp(56px, 7vw, 112px); margin: 0 0 24px; line-height: 0.95; letter-spacing: -0.045em; font-weight: 600; position: relative; }
        .vc-cta-card p { font-size: 19px; max-width: 50ch; margin: 0 auto 36px; line-height: 1.55; opacity: 0.8; position: relative; }
        .vc-cta-actions { display: inline-flex; gap: 8px; position: relative; }
        .vc-cta-actions .vc-btn-primary { background: var(--accent-fg); color: var(--accent); }
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
        .vc-footer-bottom { padding-top: 24px; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); }
      `}</style>

      {/* NAV */}
      <header className="vc-nav">
        <div className="vc-nav-in">
          <a href="#" className="vc-logo"><span className="vc-logo-mark">i</span> IT Solutions</a>
          <nav className="vc-nav-links" aria-label="Główna nawigacja">
            <a href="#services">Usługi</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#process">Proces</a>
            <a href="#faq">FAQ</a>
            <a href="#blog">Blog</a>
          </nav>
          <a href="#contact" className="vc-nav-cta">Wycena →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="vc-hero" data-screen-label="C · Hero">
        <div className="vc-hero-grid">
          <div className="vc-hero-main">
            <div className="vc-hero-tag"><span className="vc-hero-tag-dot"></span> Available · 5+ lat doświadczenia</div>
            <h1>Tworzę <span className="underline">strony</span><br/>które potrafią<br/><span className="accent">zarabiać.</span></h1>
            <div className="vc-hero-foot">
              <p>
                <strong>IT Solutions</strong> — pracownia stron, sklepów i aplikacji. Rozwiązania, z których codziennie korzystają tysiące użytkowników. Stack dopasowany do problemu — nie odwrotnie.
              </p>
              <div style={{display:'flex', gap: 8, flexShrink: 0}}>
                <a href="#contact" className="vc-btn vc-btn-primary">Wycena →</a>
              </div>
            </div>
          </div>
          <div className="vc-hero-side">
            <div className="vc-card vc-card-accent vc-card-stat">
              <div>
                <div className="vc-card-label">// projects deployed</div>
                <div className="vc-card-h">Tysiące codziennych użytkowników na produkcji</div>
              </div>
              <div className="vc-card-num">1k<span>+ /dzień</span></div>
            </div>
            <div className="vc-card vc-card-light vc-card-stat">
              <div>
                <div className="vc-card-label">// experience</div>
                <div className="vc-card-h">Praca dla dużych firm i mniejszych biznesów</div>
              </div>
              <div className="vc-card-num">5<span>+ lat</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="vc-marquee" aria-hidden="true">
        <div className="vc-marquee-track">
          {Array(2).fill(0).flatMap((_, j) => ['Next.js','React','TypeScript','WordPress','WooCommerce','PrestaShop','Spring Boot','PostgreSQL','Stripe','Vercel','Docker','Tailwind'].map((t,i) => <span key={`${j}-${i}`}>{t}</span>))}
        </div>
      </div>

      {/* SERVICES — Bento */}
      <section className="vc-section reveal" id="services" data-screen-label="C · Usługi">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">[01] Usługi</div>
            <h2 className="vc-section-title">Pięć stosów. <em>Jeden senior</em>. Twój projekt.</h2>
          </div>
          <a href="#" className="vc-section-cta">Wszystkie usługi →</a>
        </div>
        <div className="vc-services">
          <div className="vc-srv vc-srv-1">
            <div className="vc-srv-num">[01]</div>
            <h3 className="vc-srv-title">Strony Next.js</h3>
            <p className="vc-srv-desc">Aplikacje React z SSR, ISR i edge runtime. Lighthouse 95+, TTI poniżej 2 s. Idealne dla SaaS, marketingu, dashboardów.</p>
            <div className="vc-srv-arrow">→</div>
          </div>
          <div className="vc-srv vc-srv-2">
            <div className="vc-srv-num">[02]</div>
            <h3 className="vc-srv-title">WordPress</h3>
            <p className="vc-srv-desc">Headless lub klasyczny. Edycja, której zespół faktycznie używa.</p>
            <div className="vc-srv-arrow">→</div>
          </div>
          <div className="vc-srv vc-srv-3">
            <div className="vc-srv-num">[03]</div>
            <h3 className="vc-srv-title">WooCommerce</h3>
            <p className="vc-srv-desc">Sklepy do 50k SKU, integracje z magazynem, kurierami, Allegro.</p>
            <div className="vc-srv-arrow">→</div>
          </div>
          <div className="vc-srv vc-srv-4">
            <div className="vc-srv-num">[04]</div>
            <h3 className="vc-srv-title" style={{fontSize: 26}}>Presta<br/>Shop</h3>
            <div className="vc-srv-arrow">→</div>
          </div>
          <div className="vc-srv vc-srv-5">
            <div className="vc-srv-num">[05]</div>
            <h3 className="vc-srv-title">Aplikacje webowe</h3>
            <p className="vc-srv-desc">Spring Boot + React/Angular. SSO, RBAC, audyt — gotowe na produkcję enterprise.</p>
            <div className="vc-srv-arrow">→</div>
          </div>
        </div>
      </section>

      {/* ABOUT — Bento z liczbami */}
      <section className="vc-section reveal" data-screen-label="C · O nas">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">[02] O pracowni</div>
            <h2 className="vc-section-title">Pięć lat. <span className="accent">Tysiące</span> użytkowników. Zero zniknięć.</h2>
          </div>
        </div>
        <div className="vc-about">
          <div className="vc-ab-big">
            <div className="vc-card-label">// elastyczność</div>
            <div className="h">Dopasowuję rozwiązanie do <em>Twoich potrzeb</em> — nie odwrotnie.</div>
          </div>
          <div className="vc-ab-stat">
            <div className="vc-ab-stat-label">// experience</div>
            <div className="vc-ab-stat-num acc">5+</div>
            <div className="vc-card-foot" style={{color: 'var(--fg-muted)'}}>lat doświadczenia komercyjnego, w tym z dużymi firmami</div>
          </div>
          <div className="vc-ab-stat">
            <div className="vc-ab-stat-label">// scale</div>
            <div className="vc-ab-stat-num acc">1k+</div>
            <div className="vc-card-foot" style={{color: 'var(--fg-muted)'}}>aktywnych użytkowników korzystających z moich rozwiązań co dzień</div>
          </div>
          <div className="vc-ab-quote">
            <div>
              <div className="vc-card-label">// klient · 2024</div>
              <p className="vc-ab-quote-text">Czas ładowania spadł 4×, sprzedaż wzrosła o 187% w pierwszym kwartale.</p>
            </div>
            <div className="vc-ab-quote-author">
              <strong>Anna Kowalska</strong>CEO, FashionHub
            </div>
          </div>
          <div className="vc-ab-stat" style={{background: 'var(--accent)', color: 'var(--accent-fg)'}}>
            <div className="vc-ab-stat-label">// stack</div>
            <div className="vc-ab-stat-num">8+</div>
            <div className="vc-card-foot">technologii frontend, backend, CMS i e-commerce w aktywnym użyciu</div>
          </div>
          <div className="vc-ab-stat">
            <div className="vc-ab-stat-label">// rating</div>
            <div className="vc-ab-stat-num acc">5★</div>
            <div className="vc-card-foot" style={{color: 'var(--fg-muted)'}}>średnia ocena klientów. 100% projektów wdrożonych na produkcję</div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="vc-section reveal" id="portfolio" data-screen-label="C · Portfolio">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">[03] Portfolio</div>
            <h2 className="vc-section-title">Sześć projektów, które <span className="accent">poszły</span> na produkcję.</h2>
          </div>
          <a href="#" className="vc-section-cta">Wszystkie realizacje →</a>
        </div>
        <div className="vc-projects">
          {projects.map((p, i) => (
            <article key={i} className={`vc-proj vc-proj-${p.tone}`}>
              <div className="vc-proj-meta">
                <span>{p.cat}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="vc-proj-name">{p.name}</h3>
              <span className="vc-proj-metric">{p.metric}</span>
              <div className="vc-proj-arrow">↗</div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — bento */}
      <section className="vc-section reveal" data-screen-label="C · Opinie">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">[04] Opinie</div>
            <h2 className="vc-section-title">Co mówią <em>klienci</em>.</h2>
          </div>
        </div>
        <div className="vc-testi">
          <div className="vc-testi-card big">
            <p className="vc-testi-q">Strona przekroczyła nasze oczekiwania. Czas ładowania spadł z 4,2 s do 1,1 s, sprzedaż w pierwszym kwartale po wdrożeniu wzrosła o 187%.</p>
            <div className="vc-testi-author">
              <div className="vc-testi-avatar">AK</div>
              <div>
                <div className="vc-testi-name">Anna Kowalska</div>
                <div className="vc-testi-role">CEO, FashionHub</div>
              </div>
            </div>
          </div>
          <div className="vc-testi-card med">
            <p className="vc-testi-q">Migracja z monolitu na headless. LCP z 5 s na 1,2 s — redaktorzy pracują 3× szybciej.</p>
            <div className="vc-testi-author">
              <div className="vc-testi-avatar">PN</div>
              <div>
                <div className="vc-testi-name">Piotr Nowak</div>
                <div className="vc-testi-role">Head of Marketing, TechCorp</div>
              </div>
            </div>
          </div>
          <div className="vc-testi-card med">
            <p className="vc-testi-q">12 000 pacjentów / mc. Zero downtime od 14 miesięcy. Dokumentacja, której naprawdę używamy.</p>
            <div className="vc-testi-author">
              <div className="vc-testi-avatar">KW</div>
              <div>
                <div className="vc-testi-name">Dr K. Wiśniewska</div>
                <div className="vc-testi-role">Dyrektor Med., MediClinic</div>
              </div>
            </div>
          </div>
          <div className="vc-testi-card lite">
            <p className="vc-testi-q">Konfigurator 3D mebli + WooCommerce. 2 400 SKU, multi-currency, faktury VAT — wszystko działa z poziomu jednego panelu.</p>
            <div className="vc-testi-author">
              <div className="vc-testi-avatar">MZ</div>
              <div>
                <div className="vc-testi-name">Michał Zieliński</div>
                <div className="vc-testi-role">Founder, HomeDesign</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="vc-section reveal" id="process" data-screen-label="C · Proces">
        <div className="vc-section-head">
          <div>
            <div className="vc-section-label">[05] Proces</div>
            <h2 className="vc-section-title">Od briefu do <span className="accent">live</span>.</h2>
          </div>
        </div>
        <div className="vc-proc">
          <div className="vc-proc-intro">
            <div className="vc-card-label" style={{color: 'var(--fg-muted)'}}>// pipeline</div>
            <h3 className="vc-proc-intro-h">Siedem kroków. <span className="acc">Bez niespodzianek</span>.</h3>
          </div>
          <div className="vc-proc-list">
            {[
              ['Konsultacja', 'Bezpłatne 30 min. Brief, cele, KPI.'],
              ['Wycena', 'Stała cena lub T&M. Harmonogram.'],
              ['UX/UI', 'Wireframe → Figma hi-fi.'],
              ['Development', 'Sprinty 2-tyg. Demo co piątek.'],
              ['Testy', 'E2E, perf, a11y, security.'],
              ['Wdrożenie', 'CI/CD, SSL, monitoring.'],
              ['Wsparcie', '6 mies. w cenie. SLA opcjonalne.'],
            ].map(([t, d], i) => (
              <div key={i} className="vc-proc-step">
                <div className="vc-proc-step-num">{String(i+1).padStart(2,'0')}</div>
                <div>
                  <h4>{t}</h4>
                  <p>{d}</p>
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
            <div className="vc-section-label">[06] FAQ</div>
            <h2 className="vc-section-title">Pytania, które <em>najczęściej słyszę</em>.</h2>
          </div>
        </div>
        <div className="vc-faq">
          <div>
            <p style={{fontSize: 16, color: 'var(--fg-muted)', lineHeight: 1.55, marginTop: 0}}>
              Nie znalazłeś swojego pytania? <a href="#contact" style={{color: 'var(--accent)'}}>Napisz do mnie →</a>
            </p>
          </div>
          <div className="vc-faq-list">
            {[
              ['Ile trwa realizacja projektu?', 'Wizytówka: 3–4 tyg. Sklep: 6–10 tyg. Aplikacja: od 12 tyg. Każdy projekt dostaje dokładny harmonogram tygodniowy.'],
              ['Ile kosztuje strona internetowa?', 'Wizytówka od 5 500 PLN, sklep od 9 500 PLN, aplikacja od 18 000 PLN. Dokładna wycena w 48h od briefu.'],
              ['Czy oferujecie hosting?', 'Tak — Vercel, AWS, OVH lub własny VPS. Doradzam najlepsze rozwiązanie dla danego stacku i budżetu.'],
              ['Czy mogę edytować stronę samodzielnie?', 'Każdy projekt ma CMS (WordPress, Sanity, Strapi) lub panel admina. Po wdrożeniu prowadzę szkolenie + dokumentacja.'],
              ['Co z SEO?', 'Schema.org, meta, OG, sitemap, robots, Lighthouse 95+. Wszystko domyślnie. Plus audyt po wdrożeniu.'],
            ].map(([q, a], i) => (
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
          <h2>Porozmawiajmy.</h2>
          <p>Bezpłatna 30-minutowa konsultacja. Wracam z wyceną w 48h. Bez prezentacji, bez handlowca w pętli.</p>
          <div className="vc-cta-actions">
            <a href="#" className="vc-btn vc-btn-primary">Umów konsultację →</a>
            <a href="#" className="vc-btn vc-btn-secondary">hello@itsolutions.com</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vc-footer">
        <div className="vc-footer-card">
          <div className="vc-footer-grid">
            <div className="vc-footer-brand">
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
          <div className="vc-footer-bottom">
            <span>© 2026 IT Solutions. Wszystkie prawa zastrzeżone.</span>
            <span>NIP: 000-000-00-00 · Polityka prywatności</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

window.VariantC = VariantC;
