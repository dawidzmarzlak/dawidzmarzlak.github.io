// Podstrona: Kontakt
// - Hero (krótki) + briefing form (real form, walidacja inline)
// - Sticky boczna karta: dostępne sloty + kalkulator wyceny
// - 3 kanały kontaktu (email, telefon, kalendarz)
// - Mini FAQ kontaktowe

const PageContact = () => {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    name: '', email: '', company: '', type: '', budget: '', timeline: '', desc: '',
  });
  const [calcType, setCalcType] = React.useState('next');
  const [calcPages, setCalcPages] = React.useState(8);
  const [calcCMS, setCalcCMS] = React.useState(true);

  useReveal('.pc .reveal', []);

  const basePrice = { next: 8500, wp: 5500, woo: 9500, presta: 12000, app: 18000 };
  const price = (basePrice[calcType] || 0) + (calcPages - 1) * 600 + (calcCMS ? 1500 : 0);

  const slots = [
    { day: 'pon', date: '4 lis', time: '10:00', open: true },
    { day: 'pon', date: '4 lis', time: '14:30', open: true },
    { day: 'wt', date: '5 lis', time: '11:00', open: false },
    { day: 'wt', date: '5 lis', time: '15:00', open: true },
    { day: 'śr', date: '6 lis', time: '09:30', open: true },
    { day: 'śr', date: '6 lis', time: '13:00', open: false },
    { day: 'czw', date: '7 lis', time: '10:00', open: true },
    { day: 'czw', date: '7 lis', time: '16:00', open: true },
  ];

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canNext0 = form.name && form.email && form.email.includes('@');
  const canNext1 = form.type && form.budget;
  const canSubmit = form.desc.length > 20;

  return (
    <div className="vc pc site-frame">
      <style>{`
        .pc { padding-bottom: 64px; }
        .pc-hero { max-width: 1400px; margin: 0 auto; padding: 32px 36px 24px; }
        .pc-bread { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); margin-bottom: 28px; display: flex; gap: 12px; }
        .pc-bread a { color: var(--fg-muted); text-decoration: none; }
        .pc-title { font-size: clamp(56px, 8vw, 128px); line-height: 0.92; letter-spacing: -0.045em; margin: 0 0 24px; font-weight: 600; max-width: 14ch; }
        .pc-title .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }
        .pc-sub { font-size: 19px; color: var(--fg-muted); max-width: 50ch; line-height: 1.55; margin: 0; }

        .pc-channels { max-width: 1400px; margin: 24px auto; padding: 0 36px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .pc-channel { background: var(--bg-card); border-radius: 24px; padding: 28px; display: flex; flex-direction: column; gap: 12px; transition: transform 0.25s; cursor: pointer; }
        .pc-channel:hover { transform: translateY(-3px); }
        .pc-channel-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); }
        .pc-channel-val { font-size: 24px; font-weight: 500; letter-spacing: -0.02em; color: var(--fg); }
        .pc-channel-val .it { font-family: var(--font-display); font-style: italic; color: var(--accent); }
        .pc-channel-note { font-size: 13px; color: var(--fg-muted); }

        /* MAIN GRID — form + sidebar */
        .pc-main { max-width: 1400px; margin: 24px auto 0; padding: 0 36px; display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; align-items: start; }

        /* FORM */
        .pc-form { background: var(--bg-card); border-radius: 32px; padding: 48px; }
        .pc-form-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .pc-form-title { font-size: 36px; line-height: 1; letter-spacing: -0.025em; margin: 0; font-weight: 600; }
        .pc-form-title .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }
        .pc-steps { display: flex; gap: 4px; }
        .pc-step-dot { width: 24px; height: 4px; border-radius: 2px; background: var(--line); transition: background 0.2s; }
        .pc-step-dot.on { background: var(--accent); }
        .pc-step-dot.done { background: var(--fg-muted); }

        .pc-fields { display: flex; flex-direction: column; gap: 20px; }
        .pc-field { display: flex; flex-direction: column; gap: 8px; }
        .pc-field-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); display: flex; justify-content: space-between; }
        .pc-field-label em { color: var(--accent); font-style: normal; font-family: var(--font-mono); }
        .pc-input, .pc-textarea, .pc-select { width: 100%; padding: 14px 18px; background: var(--bg); border: 1px solid var(--line); border-radius: 12px; font-size: 15px; color: var(--fg); font-family: inherit; transition: border-color 0.2s; box-sizing: border-box; }
        .pc-input:focus, .pc-textarea:focus, .pc-select:focus { outline: none; border-color: var(--accent); }
        .pc-textarea { min-height: 140px; resize: vertical; line-height: 1.5; }
        .pc-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .pc-options { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
        .pc-option { padding: 14px 12px; background: var(--bg); border: 1px solid var(--line); border-radius: 12px; cursor: pointer; font-size: 12px; color: var(--fg); font-family: var(--font-mono); text-transform: uppercase; transition: all 0.15s; text-align: center; }
        .pc-option:hover { border-color: var(--fg-muted); }
        .pc-option.on { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }

        .pc-budget-options { grid-template-columns: repeat(4, 1fr); }

        .pc-actions { display: flex; gap: 12px; justify-content: space-between; margin-top: 32px; }
        .pc-btn { padding: 14px 28px; border-radius: 999px; font-size: 14px; font-weight: 600; border: none; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .pc-btn-primary { background: var(--accent); color: var(--accent-fg); }
        .pc-btn-primary:hover { box-shadow: 0 8px 36px rgba(212,255,82,0.45); }
        .pc-btn-primary:disabled { background: var(--line); color: var(--fg-muted); cursor: not-allowed; box-shadow: none; }
        .pc-btn-secondary { background: transparent; color: var(--fg); border: 1px solid var(--line); }
        .pc-btn-secondary:hover { border-color: var(--fg-muted); }

        .pc-success { padding: 64px 32px; text-align: center; }
        .pc-success-mark { width: 80px; height: 80px; margin: 0 auto 24px; background: var(--accent); border-radius: 50%; display: grid; place-items: center; font-size: 36px; color: var(--accent-fg); }
        .pc-success h3 { font-size: 36px; margin: 0 0 12px; line-height: 1; letter-spacing: -0.025em; font-weight: 600; }
        .pc-success h3 .it { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--accent); }
        .pc-success p { color: var(--fg-muted); margin: 0; font-size: 15px; }

        /* SIDEBAR */
        .pc-aside { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 90px; }
        .pc-card { background: var(--bg-card); border-radius: 24px; padding: 28px; }
        .pc-card-h { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-muted); display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
        .pc-card-h .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 1.5s infinite; }

        .pc-slots { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
        .pc-slot { padding: 12px 14px; background: var(--bg); border: 1px solid var(--line); border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: left; }
        .pc-slot:hover:not(:disabled) { border-color: var(--accent); }
        .pc-slot:disabled { opacity: 0.35; cursor: not-allowed; text-decoration: line-through; }
        .pc-slot-day { font-family: var(--font-mono); font-size: 10px; color: var(--fg-muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .pc-slot-time { font-size: 16px; font-weight: 500; color: var(--fg); margin-top: 2px; }
        .pc-slot-date { font-size: 11px; color: var(--fg-muted); margin-top: 2px; font-family: var(--font-mono); }

        /* CALC (mini) */
        .pc-calc-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        .pc-calc-types { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
        .pc-calc-type { padding: 8px 4px; background: transparent; border: 1px solid var(--line); border-radius: 8px; cursor: pointer; font-size: 10px; color: var(--fg); font-family: var(--font-mono); text-transform: uppercase; }
        .pc-calc-type.on { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
        .pc-calc-out { padding: 16px 18px; background: var(--bg); border-radius: 12px; display: flex; align-items: baseline; justify-content: space-between; border: 1px solid var(--line); margin-top: 10px; }
        .pc-calc-out-num { font-family: var(--font-display); font-style: italic; font-size: 28px; color: var(--accent); line-height: 1; }
        .pc-calc-out-num span { font-family: var(--font-mono); font-style: normal; font-size: 11px; color: var(--fg-muted); margin-left: 4px; }
        .pc-slider { -webkit-appearance: none; width: 100%; height: 4px; background: var(--line); border-radius: 4px; outline: none; }
        .pc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: var(--accent); border-radius: 50%; cursor: pointer; }
        .pc-toggle { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; }
        .pc-switch { width: 36px; height: 20px; background: var(--line); border-radius: 999px; position: relative; cursor: pointer; transition: background 0.2s; }
        .pc-switch.on { background: var(--accent); }
        .pc-switch::before { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: transform 0.2s; }
        .pc-switch.on::before { transform: translateX(16px); background: var(--accent-fg); }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* NAV */}
      <header className="vc-nav">
        <div className="vc-nav-in">
          <a href="IT Solutions Redesign.html" className="vc-logo"><span className="vc-logo-mark">i</span> IT Solutions</a>
          <nav className="vc-nav-links" aria-label="Główna nawigacja">
            <a href="page-services.html">Usługi</a>
            <a href="page-portfolio.html">Portfolio</a>
            <a href="page-contact.html" style={{opacity: 1, color: 'var(--accent)'}}>Kontakt</a>
            <a href="#">FAQ</a>
            <a href="#">Blog</a>
          </nav>
          <a href="#brief" className="vc-nav-cta">Wycena →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="pc-hero" data-screen-label="Kontakt · Hero">
        <div className="pc-bread">
          <a href="IT Solutions Redesign.html">Start</a>
          <span>/</span>
          <span>Kontakt</span>
        </div>
        <h1 className="pc-title">Porozmawiajmy o <span className="it">Twoim projekcie</span>.</h1>
        <p className="pc-sub">Wybierz wygodną formę kontaktu — krótki brief poniżej (3 minuty), bezpośredni email, telefon albo umów się od razu na 30-minutową konsultację.</p>
      </section>

      {/* CHANNELS */}
      <section className="pc-channels reveal">
        <a href="mailto:hello@itsolutions.com" className="pc-channel" style={{textDecoration: 'none'}}>
          <span className="pc-channel-label">[01] · Email</span>
          <span className="pc-channel-val">hello@itsolutions.com</span>
          <span className="pc-channel-note">Odpowiadam <em style={{fontStyle: 'normal', color: 'var(--accent)'}}>w 12h</em>, w dni robocze.</span>
        </a>
        <a href="tel:+48123456789" className="pc-channel" style={{textDecoration: 'none'}}>
          <span className="pc-channel-label">[02] · Telefon</span>
          <span className="pc-channel-val">+48 123 456 789</span>
          <span className="pc-channel-note">Pon–Pt, <em style={{fontStyle: 'normal', color: 'var(--accent)'}}>9:00–17:00</em></span>
        </a>
        <a href="#brief" className="pc-channel" style={{textDecoration: 'none'}}>
          <span className="pc-channel-label">[03] · Brief</span>
          <span className="pc-channel-val">Formularz <span className="it">3 minuty</span></span>
          <span className="pc-channel-note">Wracam z wyceną <em style={{fontStyle: 'normal', color: 'var(--accent)'}}>w 48h</em>.</span>
        </a>
      </section>

      {/* MAIN */}
      <section className="pc-main" id="brief">
        <div className="pc-form reveal">
          <div className="pc-form-head">
            <h2 className="pc-form-title">{step === 3 ? 'Wysłane!' : <>Brief w <span className="it">3 krokach</span></>}</h2>
            {step < 3 && (
              <div className="pc-steps">
                <span className={`pc-step-dot ${step === 0 ? 'on' : 'done'}`}></span>
                <span className={`pc-step-dot ${step === 1 ? 'on' : step > 1 ? 'done' : ''}`}></span>
                <span className={`pc-step-dot ${step === 2 ? 'on' : ''}`}></span>
              </div>
            )}
          </div>

          {step === 0 && (
            <div className="pc-fields">
              <div className="pc-field">
                <label className="pc-field-label">Imię i nazwisko <em>wymagane</em></label>
                <input className="pc-input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="np. Anna Kowalska" />
              </div>
              <div className="pc-row2">
                <div className="pc-field">
                  <label className="pc-field-label">Email <em>wymagane</em></label>
                  <input className="pc-input" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="anna@firma.pl" />
                </div>
                <div className="pc-field">
                  <label className="pc-field-label">Firma</label>
                  <input className="pc-input" value={form.company} onChange={e => update('company', e.target.value)} placeholder="opcjonalnie" />
                </div>
              </div>
              <div className="pc-actions">
                <span></span>
                <button className="pc-btn pc-btn-primary" disabled={!canNext0} onClick={() => setStep(1)}>Dalej →</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="pc-fields">
              <div className="pc-field">
                <label className="pc-field-label">Typ projektu <em>wymagane</em></label>
                <div className="pc-options">
                  {[['next', 'Next.js'], ['wp', 'WordPress'], ['woo', 'WooCommerce'], ['presta', 'PrestaShop'], ['app', 'Aplikacja']].map(([k, l]) => (
                    <button key={k} className={`pc-option ${form.type === k ? 'on' : ''}`} onClick={() => update('type', k)}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="pc-field">
                <label className="pc-field-label">Budżet <em>wymagane</em></label>
                <div className="pc-options pc-budget-options">
                  {[['s', 'do 10k'], ['m', '10–25k'], ['l', '25–60k'], ['xl', '60k+']].map(([k, l]) => (
                    <button key={k} className={`pc-option ${form.budget === k ? 'on' : ''}`} onClick={() => update('budget', k)}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="pc-field">
                <label className="pc-field-label">Termin</label>
                <div className="pc-options pc-budget-options">
                  {[['rush', 'Asap'], ['1m', '1 mies.'], ['3m', '2–3 mies.'], ['6m', '6+ mies.']].map(([k, l]) => (
                    <button key={k} className={`pc-option ${form.timeline === k ? 'on' : ''}`} onClick={() => update('timeline', k)}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="pc-actions">
                <button className="pc-btn pc-btn-secondary" onClick={() => setStep(0)}>← Wstecz</button>
                <button className="pc-btn pc-btn-primary" disabled={!canNext1} onClick={() => setStep(2)}>Dalej →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="pc-fields">
              <div className="pc-field">
                <label className="pc-field-label">Opisz projekt w 3–5 zdaniach <em>wymagane</em></label>
                <textarea className="pc-textarea" value={form.desc} onChange={e => update('desc', e.target.value)} placeholder="Co budujemy? Dla kogo? Główne funkcjonalności? Najważniejsze priorytety (szybkość, design, integracje)? Jeśli masz benchmark — link." />
                <span style={{fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', marginTop: 4}}>{form.desc.length} / min. 20 znaków</span>
              </div>
              <div className="pc-actions">
                <button className="pc-btn pc-btn-secondary" onClick={() => setStep(1)}>← Wstecz</button>
                <button className="pc-btn pc-btn-primary" disabled={!canSubmit} onClick={() => setStep(3)}>Wyślij brief →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="pc-success">
              <div className="pc-success-mark">✓</div>
              <h3>Brief w drodze, <span className="it">{form.name.split(' ')[0]}</span>.</h3>
              <p>Odpowiadam na adres <strong style={{color: 'var(--fg)'}}>{form.email}</strong> w ciągu 48h. Jeśli sprawa pilna — zadzwoń na <strong style={{color: 'var(--fg)'}}>+48 123 456 789</strong>.</p>
            </div>
          )}
        </div>

        <aside className="pc-aside">
          <div className="pc-card">
            <div className="pc-card-h"><span className="dot"></span> Dostępne sloty · 30 min</div>
            <div className="pc-slots">
              {slots.map((s, i) => (
                <button key={i} className="pc-slot" disabled={!s.open}>
                  <div className="pc-slot-day">{s.day}</div>
                  <div className="pc-slot-time">{s.time}</div>
                  <div className="pc-slot-date">{s.date}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pc-card">
            <div className="pc-card-h">// Kalkulator wyceny</div>
            <div className="pc-calc-row">
              <span style={{fontSize: 12, color: 'var(--fg-muted)'}}>Typ projektu</span>
              <div className="pc-calc-types">
                {[['next', 'Next'], ['wp', 'WP'], ['woo', 'Woo'], ['presta', 'Presta'], ['app', 'App']].map(([k, l]) => (
                  <button key={k} className={`pc-calc-type ${calcType === k ? 'on' : ''}`} onClick={() => setCalcType(k)}>{l}</button>
                ))}
              </div>
            </div>
            <div className="pc-calc-row">
              <span style={{fontSize: 12, color: 'var(--fg-muted)', display: 'flex', justifyContent: 'space-between'}}>
                Liczba podstron
                <strong style={{fontFamily: 'var(--font-mono)', color: 'var(--fg)'}}>{calcPages}</strong>
              </span>
              <input type="range" min="1" max="30" value={calcPages} onChange={e => setCalcPages(+e.target.value)} className="pc-slider" />
            </div>
            <div className="pc-toggle">
              <span style={{fontSize: 12, color: 'var(--fg-muted)'}}>Edycja przez CMS</span>
              <span className={`pc-switch ${calcCMS ? 'on' : ''}`} onClick={() => setCalcCMS(v => !v)}></span>
            </div>
            <div className="pc-calc-out">
              <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase'}}>Szacunkowo od</span>
              <span className="pc-calc-out-num">{price.toLocaleString('pl-PL')} <span>PLN</span></span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

window.PageContact = PageContact;
