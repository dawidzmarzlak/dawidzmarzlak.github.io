import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export function CaseStudy() {
  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 mt-16">
      <div className="flex justify-between items-end mb-6 flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-3">[Case Study] · 2024</div>
          <h2 className="text-[clamp(44px,5vw,72px)] m-0 leading-[0.95] tracking-[-0.035em] font-semibold max-w-[22ch]">
            FashionHub — re-platforming, który <ItalicAccent>potroił</ItalicAccent> przychód.
          </h2>
        </div>
        <a href="#" className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted no-underline hover:text-accent">
          Pełne case study ↗
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[4fr_3fr] gap-4">
        <div className="relative overflow-hidden bg-bg-card rounded-[32px] p-6 lg:p-12 min-h-[480px] flex flex-col justify-between">
          <span
            aria-hidden="true"
            className="absolute -bottom-52 -right-52 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgb(var(--accent)) 0%, transparent 60%)",
              opacity: 0.18,
              filter: "blur(60px)",
            }}
          />
          <div className="relative font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[Brief]</div>
          <h3 className="relative text-[36px] font-medium leading-[1.15] tracking-[-0.02em] m-0 max-w-[20ch]">
            Sklep odzieżowy z 2 400 SKU. Magento 2 ledwo działało — LCP 4.2s, koszyk 8s, dotowany hosting.
          </h3>
          <div className="relative">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-2">[Stack]</div>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js 14", "Sanity CMS", "Stripe", "Algolia", "Vercel"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-white/[0.06] rounded-full text-[12px] font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-accent text-accent-fg rounded-[32px] p-6 lg:p-9 flex flex-col justify-between relative overflow-hidden">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">[Konwersja]</div>
            <div className="font-display italic text-[clamp(72px,8vw,120px)] leading-[0.9] tracking-[-0.045em]">
              +187<span className="font-sans not-italic text-[0.3em] align-super opacity-60">%</span>
            </div>
          </div>
          <div className="bg-bg-light text-fg-on-light rounded-[32px] p-6 lg:p-9 flex flex-col justify-between relative overflow-hidden">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">[LCP]</div>
            <div className="font-display italic text-[clamp(72px,8vw,120px)] leading-[0.9] tracking-[-0.045em] text-accent">
              1.2<span className="font-sans not-italic text-[0.3em] align-super opacity-60">s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-12 p-6 lg:p-12 bg-bg-card rounded-[32px]">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[Klient]</div>
          <div className="font-mono text-[12px] text-fg-muted mt-3">
            <strong className="font-sans not-italic text-fg text-[14px] block mb-1">Anna Kowalska</strong>
            CEO, FashionHub
            <br />
            2024
          </div>
        </div>
        <div>
          <p className="font-display italic text-[clamp(28px,3vw,44px)] leading-[1.2] tracking-[-0.025em] m-0 mb-6 max-w-[28ch]">
            „Strona przekroczyła nasze oczekiwania. Błyskawiczna wydajność i piękny design przełożyły się na{" "}
            <span className="text-accent">znaczący wzrost sprzedaży</span> już w pierwszym kwartale po wdrożeniu."
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <Delta from="Magento 2 · LCP 4.2s" arrow="↓ →" to="1.2s" label="LCP po wdrożeniu" />
            <Delta from="Bounce rate 67%" arrow="↓ →" to="28%" label="Bounce rate" />
            <Delta from="Konwersja 0.9%" arrow="↑ →" to="2.6%" label="Konwersja koszyka" />
          </div>
        </div>
      </div>

    </section>
  );
}

function Delta({ from, arrow, to, label }: { from: string; arrow: string; to: string; label: string }) {
  return (
    <div className="bg-bg rounded-2xl p-6 text-fg">
      <div className="font-mono text-[11px] text-fg-muted line-through">{from}</div>
      <div className="font-mono text-accent my-1">{arrow}</div>
      <div className="font-display italic text-[32px] text-accent leading-none">{to}</div>
      <div className="font-mono text-[12px] text-fg-muted mt-2 uppercase tracking-[0.08em]">{label}</div>
    </div>
  );
}
