// Podstrona: Portfolio
// - Hero z licznikami + filtry
// - Bento siatka projektów (asymetryczna jak na home, ale więcej i większe)
// - Pełne case study: FashionHub (rozwinięte na samym dole)

const PagePortfolio = () => {
  const [filter, setFilter] = React.useState('all');
  useReveal('.pp .reveal', []);

  const projects = [
    { name: 'FashionHub', cat: 'E-commerce', tags: ['next', 'ecom'], year: '2024', metric: '+187%', desc: 'Re-platforming z Magento na Next.js Commerce. Konwersja +187%, LCP z 4.2s do 1.2s.', size: 'big', tone: 'dark', color: '#0e0d0c' },
    { name: 'TechCorp', cat: 'Korporacyjny', tags: ['wp'], year: '2024', metric: 'LCP 1.2s', desc: 'Strona korporacyjna IT z multilang. Custom WP theme bez page-builderów.', size: 'med', tone: 'light' },
    { name: 'MediClinic', cat: 'Aplikacja', tags: ['app'], year: '2023', metric: '12k pacjentów', desc: 'Portal pacjenta z systemem rezerwacji + płatności online. Spring Boot + Next.', size: 'med', tone: 'accent' },
    { name: 'HomeDesign', cat: 'WooCommerce', tags: ['ecom'], year: '2023', metric: '2400 SKU', desc: 'Sklep z meblami + konfigurator 3D. WooCommerce 8 + Three.js.', size: 'small', tone: 'light' },
    { name: 'EduPlatform', cat: 'EdTech', tags: ['next', 'app'], year: '2023', metric: '8k studentów', desc: 'Platforma do nauki online — wideo, quizy, certyfikaty. Next.js + Mux + Sanity.', size: 'small', tone: 'dark' },
    { name: 'FoodDelivery', cat: 'Marketplace', tags: ['ecom'], year: '2022', metric: '150+ restauracji', desc: 'Marketplace z jedzeniem — multistore na PrestaShop, integracja kurierów.', size: 'big', tone: 'accent', color: '#d4ff52' },
    { name: 'LocalLaw', cat: 'Korporacyjny', tags: ['wp'], year: '2022', metric: '230 leadów/mc', desc: 'Strona kancelarii z lokalnym SEO. WordPress + zaawansowane formularze.', size: 'small', tone: 'light' },
    { name: 'BookingPro', cat: 'Aplikacja', tags: ['app'], year: '2024', metric: '+412% rezerwacji', desc: 'System rezerwacji dla hoteli — multi-property, dynamic pricing.', size: 'med', tone: 'dark' },
  ];

  const tabs = [
    ['all', 'Wszystkie', projects.length],
    ['next', 'Next.js', projects.filter(p => p.tags.includes('next')).length],
    ['wp', 'WordPress', projects.filter(p => p.tags.includes('wp')).length],
    ['ecom', 'E-commerce', projects.filter(p => p.tags.includes('ecom')).length],
    ['app', 'Aplikacje', projects.filter(p => p.tags.includes('app')).length],
  ];

  const visible = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <div className="vc pp site-frame">
      <style>{`
        .pp { padding-bottom: 64px; }
        .pp-hero { max-width: 1400px; margin: 0 auto; padding: 32px 36px 24px; }
        .pp-bread { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin-bottom: 28px; display: flex; gap: 12px; }
        .pp-bread a { color: var(--fg-muted); text-decoration: none; }
        .pp-title { font-size: clamp(56px, 8vw, 128px); line-height: 0.92; letter-spacing: -0.045em; margin: 0 0 32px; font-weight: 600; }
        .pp-title .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }

        .pp-hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 48px; }
        .pp-stat { background: var(--bg-card); border-radius: 24px; padding: 28px; }
        .pp-stat-num { font-family: var(--font-display); font-style: italic; font-size: 64px; line-height: 1; color: var(--accent); letter-spacing: -0.04em; }
        .pp-stat-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin-top: 12px; }

        .pp-tabs { max-width: 1400px; margin: 16px auto; padding: 16px 36px; display: flex; gap: 6px; flex-wrap: wrap; position: sticky; top: 70px; z-index: 30; background: var(--bg); }
        .pp-tab { padding: 12px 20px; border: 1px solid var(--line); border-radius: 999px; cursor: pointer; font-size: 14px; color: var(--fg); background: transparent; transition: all 0.2s; display: flex; gap: 10px; align-items: center; font-family: inherit; }
        .pp-tab:hover { border-color: var(--fg-muted); }
        .pp-tab.on { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
        .pp-tab-count { font-family: var(--font-mono); font-size: 11px; opacity: 0.6; }
        .pp-tab.on .pp-tab-count { opacity: 1; }

        /* Bento grid 6 kolumn */
        .pp-grid { max-width: 1400px; margin: 0 auto; padding: 16px 36px; display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: 320px; gap: 16px; }
        .pp-item-big { grid-column: span 4; grid-row: span 2; }
        .pp-item-med { grid-column: span 3; grid-row: span 1; }
        .pp-item-small { grid-column: span 3; grid-row: span 1; }
        .pp-card { border-radius: 24px; padding: 36px; position: relative; overflow: hidden; cursor: pointer; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); display: flex; flex-direction: column; height: 100%; }
        .pp-card:hover { transform: translateY(-4px); }
        .pp-card-light { background: var(--bg-light); color: var(--fg-on-light); }
        .pp-card-dark { background: var(--bg-card); color: var(--fg); }
        .pp-card-accent { background: var(--accent); color: var(--accent-fg); }
        .pp-card-bg { position: absolute; inset: 0; opacity: 0.4; pointer-events: none; transition: transform 0.7s; }
        .pp-card:hover .pp-card-bg { transform: scale(1.1); }
        .pp-card > * { position: relative; z-index: 1; }
        .pp-card-meta { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.7; }
        .pp-card-name { font-size: clamp(32px, 4vw, 64px); font-weight: 600; letter-spacing: -0.035em; line-height: 1; margin: auto 0 8px; }
        .pp-item-big .pp-card-name { font-size: clamp(56px, 6vw, 96px); }
        .pp-card-desc { font-size: 14px; line-height: 1.5; opacity: 0.8; margin: 0 0 16px; max-width: 50ch; }
        .pp-card-foot { display: flex; justify-content: space-between; align-items: center; }
        .pp-card-metric { font-family: var(--font-mono); font-size: 12px; padding: 6px 12px; border-radius: 999px; background: rgba(0,0,0,0.08); }
        .pp-card-dark .pp-card-metric { background: var(--accent); color: var(--accent-fg); }
        .pp-card-arrow { width: 38px; height: 38px; border-radius: 50%; background: rgba(0,0,0,0.08); display: grid; place-items: center; transition: all 0.2s; }
        .pp-card-dark .pp-card-arrow { background: rgba(255,255,255,0.08); }
        .pp-card:hover .pp-card-arrow { background: var(--fg); color: var(--bg); transform: rotate(-45deg); }
        .pp-card-dark:hover .pp-card-arrow { background: var(--accent); color: var(--accent-fg); }
        .pp-card-accent:hover .pp-card-arrow { background: var(--accent-fg); color: var(--accent); }

        /* CASE STUDY */
        .pp-case { max-width: 1400px; margin: 64px auto 0; padding: 0 36px; }
        .pp-case-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 24px; }
        .pp-case-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin-bottom: 12px; }
        .pp-case-title { font-size: clamp(44px, 5vw, 72px); margin: 0; line-height: 0.95; letter-spacing: -0.035em; font-weight: 600; max-width: 22ch; }
        .pp-case-title .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }
        .pp-case-grid { display: grid; grid-template-columns: 4fr 3fr; gap: 16px; }
        .pp-case-hero { background: var(--bg-card); border-radius: 32px; padding: 48px; min-height: 480px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
        .pp-case-hero::before { content: ''; position: absolute; bottom: -200px; right: -200px; width: 500px; height: 500px; background: radial-gradient(circle, var(--accent) 0%, transparent 60%); opacity: 0.18; filter: blur(60px); }
        .pp-case-side { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
        .pp-case-stat { background: var(--bg-light); color: var(--fg-on-light); border-radius: 32px; padding: 36px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
        .pp-case-stat.acc { background: var(--accent); color: var(--accent-fg); }
        .pp-case-stat-num { font-family: var(--font-display); font-style: italic; font-size: clamp(72px, 8vw, 120px); line-height: 0.9; letter-spacing: -0.045em; }
        .pp-case-stat-num span { font-family: var(--font-sans); font-style: normal; font-size: 0.3em; vertical-align: super; opacity: 0.6; }

        .pp-case-content { display: grid; grid-template-columns: 200px 1fr; gap: 48px; margin-top: 32px; padding: 48px; background: var(--bg-card); border-radius: 32px; }
        .pp-case-quote { font-family: var(--font-display); font-style: italic; font-size: clamp(28px, 3vw, 44px); line-height: 1.2; letter-spacing: -0.025em; margin: 0 0 24px; max-width: 28ch; }
        .pp-case-author { font-family: var(--font-mono); font-size: 12px; color: var(--fg-muted); }
        .pp-case-author strong { color: var(--fg); display: block; font-family: var(--font-sans); font-size: 14px; margin-bottom: 4px; }

        .pp-case-deltas { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px; }
        .pp-delta { background: var(--bg); border-radius: 16px; padding: 24px; }
        .pp-delta-from { font-family: var(--font-mono); font-size: 11px; color: var(--fg-muted); text-decoration: line-through; }
        .pp-delta-arrow { font-family: var(--font-mono); color: var(--accent); margin: 4px 0; }
        .pp-delta-to { font-family: var(--font-display); font-style: italic; font-size: 32px; color: var(--accent); line-height: 1; }
        .pp-delta-label { font-size: 12px; color: var(--fg-muted); margin-top: 8px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; }

        .pp-case-cta { margin-top: 48px; text-align: center; padding: 64px; background: var(--accent); color: var(--accent-fg); border-radius: 32px; }
        .pp-case-cta h3 { font-size: 48px; margin: 0 0 16px; line-height: 1; letter-spacing: -0.03em; font-weight: 600; }
        .pp-case-cta h3 .it { font-family: var(--font-display); font-style: italic; font-weight: 400; }
      `}</style>

      {/* NAV */}
      <header className="vc-nav">
        <div className="vc-nav-in">
          <a href="IT Solutions Redesign.html" className="vc-logo"><span className="vc-logo-mark">i</span> IT Solutions</a>
          <nav className="vc-nav-links" aria-label="Główna nawigacja">
            <a href="page-services.html">Usługi</a>
            <a href="page-portfolio.html" style={{opacity: 1, color: 'var(--accent)'}}>Portfolio</a>
            <a href="page-contact.html">Kontakt</a>
            <a href="#">FAQ</a>
            <a href="#">Blog</a>
          </nav>
          <a href="page-contact.html" className="vc-nav-cta">Wycena →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="pp-hero" data-screen-label="Portfolio · Hero">
        <div className="pp-bread">
          <a href="IT Solutions Redesign.html">Start</a>
          <span>/</span>
          <span>Portfolio</span>
        </div>
        <h1 className="pp-title">Projekty, które <span className="it">wyszły</span> na produkcję.</h1>

        <div className="pp-hero-stats">
          <div className="pp-stat reveal">
            <div className="pp-stat-num"><CountUp to={47} /><span style={{fontSize: '0.4em', verticalAlign: 'super', fontFamily: 'var(--font-sans)', fontStyle: 'normal'}}>+</span></div>
            <div className="pp-stat-label">Wdrożonych projektów</div>
          </div>
          <div className="pp-stat reveal reveal-d1">
            <div className="pp-stat-num"><CountUp to={5} /><span style={{fontSize: '0.4em', verticalAlign: 'super', fontFamily: 'var(--font-sans)', fontStyle: 'normal'}}>+</span></div>
            <div className="pp-stat-label">Lat doświadczenia</div>
          </div>
          <div className="pp-stat reveal reveal-d2">
            <div className="pp-stat-num"><CountUp to={12000} format={n => (n >= 1000 ? Math.floor(n/1000) + 'k' : n)} /><span style={{fontSize: '0.4em', verticalAlign: 'super', fontFamily: 'var(--font-sans)', fontStyle: 'normal'}}>+</span></div>
            <div className="pp-stat-label">Codziennych użytkowników</div>
          </div>
          <div className="pp-stat reveal reveal-d3">
            <div className="pp-stat-num"><CountUp to={100} format={n => n + '%'} /></div>
            <div className="pp-stat-label">Wdrożeń na czas</div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <nav className="pp-tabs" aria-label="Filtr projektów">
        {tabs.map(([k, l, c]) => (
          <button key={k} className={`pp-tab ${filter === k ? 'on' : ''}`} onClick={() => setFilter(k)}>
            {l} <span className="pp-tab-count">[{c}]</span>
          </button>
        ))}
      </nav>

      {/* GRID */}
      <section className="pp-grid">
        {visible.map((p, i) => (
          <Tilt key={p.name} max={3} className={`pp-item-${p.size}`}>
            <article className={`pp-card pp-card-${p.tone}`} style={p.color ? {background: p.color} : {}}>
              <div className="pp-card-bg" style={{
                background: p.tone === 'accent'
                  ? 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3), transparent 50%)'
                  : p.tone === 'dark'
                  ? 'radial-gradient(circle at 80% 100%, rgba(212,255,82,0.2), transparent 60%)'
                  : 'radial-gradient(circle at 70% 0%, rgba(0,0,0,0.08), transparent 60%)'
              }}></div>
              <div className="pp-card-meta">
                <span>{p.cat}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="pp-card-name">{p.name}</h3>
              {p.size === 'big' && <p className="pp-card-desc">{p.desc}</p>}
              <div className="pp-card-foot">
                <span className="pp-card-metric">{p.metric}</span>
                <div className="pp-card-arrow">↗</div>
              </div>
            </article>
          </Tilt>
        ))}
      </section>

      {/* CASE STUDY */}
      <section className="pp-case reveal" data-screen-label="Portfolio · Case Study">
        <div className="pp-case-head">
          <div>
            <div className="pp-case-label">[Case Study] · 2024</div>
            <h2 className="pp-case-title">FashionHub — re-platforming, który <span className="it">potroił</span> przychód.</h2>
          </div>
          <a href="#" className="vc-section-cta">Pełne case study ↗</a>
        </div>

        <div className="pp-case-grid">
          <div className="pp-case-hero">
            <div className="pp-case-label">[Brief]</div>
            <h3 style={{fontSize: 36, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0, maxWidth: '20ch'}}>
              Sklep odzieżowy z 2 400 SKU. Magento 2 ledwo działało — LCP 4.2s, koszyk 8s, dotowany hosting.
            </h3>
            <div>
              <div className="pp-case-label" style={{marginBottom: 8}}>[Stack]</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
                {['Next.js 14', 'Sanity CMS', 'Stripe', 'Algolia', 'Vercel'].map(t => (
                  <span key={t} style={{padding: '6px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)'}}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="pp-case-side">
            <div className="pp-case-stat acc">
              <div className="pp-case-label" style={{color: 'inherit', opacity: 0.7}}>[Konwersja]</div>
              <div className="pp-case-stat-num">+187<span>%</span></div>
            </div>
            <div className="pp-case-stat">
              <div className="pp-case-label" style={{color: 'inherit', opacity: 0.7}}>[LCP]</div>
              <div className="pp-case-stat-num" style={{color: 'var(--accent)'}}>1.2<span>s</span></div>
            </div>
          </div>
        </div>

        <div className="pp-case-content">
          <div>
            <div className="pp-case-label">[Klient]</div>
            <div className="pp-case-author">
              <strong>Anna Kowalska</strong>
              CEO, FashionHub<br/>
              2024
            </div>
          </div>
          <div>
            <p className="pp-case-quote">„Strona przekroczyła nasze oczekiwania. Błyskawiczna wydajność i piękny design przełożyły się na <span style={{color: 'var(--accent)'}}>znaczący wzrost sprzedaży</span> już w pierwszym kwartale po wdrożeniu."</p>

            <div className="pp-case-deltas">
              <div className="pp-delta">
                <div className="pp-delta-from">Magento 2 · LCP 4.2s</div>
                <div className="pp-delta-arrow">↓ →</div>
                <div className="pp-delta-to">1.2s</div>
                <div className="pp-delta-label">LCP po wdrożeniu</div>
              </div>
              <div className="pp-delta">
                <div className="pp-delta-from">Bounce rate 67%</div>
                <div className="pp-delta-arrow">↓ →</div>
                <div className="pp-delta-to">28%</div>
                <div className="pp-delta-label">Bounce rate</div>
              </div>
              <div className="pp-delta">
                <div className="pp-delta-from">Konwersja 0.9%</div>
                <div className="pp-delta-arrow">↑ →</div>
                <div className="pp-delta-to">2.6%</div>
                <div className="pp-delta-label">Konwersja koszyka</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pp-case-cta reveal">
          <h3>Twój projekt może być <span className="it">następny</span>.</h3>
          <p style={{maxWidth: '50ch', margin: '0 auto 32px', opacity: 0.85}}>30 minut konsultacji. 48h na wycenę. Zero zobowiązań.</p>
          <MagneticCTA href="page-contact.html" variant="primary" className="pp-cta-btn">Umów konsultację →</MagneticCTA>
        </div>
      </section>

      <style>{`.pp-cta-btn { background: var(--accent-fg); color: var(--accent); padding: 16px 32px; }`}</style>
    </div>
  );
};

window.PagePortfolio = PagePortfolio;
