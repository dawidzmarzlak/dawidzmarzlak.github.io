import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import type { CaseStudyData } from "@/lib/design/case-studies";

interface Props { data: CaseStudyData }

export function CaseStudy({ data }: Props) {
  const { projectName, brief, stack, hero, secondary, client, testimonialQuote, deltas } = data;
  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 mt-16">
      <div className="flex justify-between items-end mb-6 flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-3">[Case Study] · {client.year}</div>
          <h2 className="text-[clamp(44px,5vw,72px)] m-0 leading-[0.95] tracking-[-0.035em] font-semibold max-w-[22ch]">
            {projectName} — <ItalicAccent>case study</ItalicAccent>.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[4fr_3fr] gap-4">
        <div className="relative overflow-hidden bg-bg-card rounded-[32px] p-6 lg:p-12 min-h-[480px] flex flex-col justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[Brief]</div>
          <h3 className="text-[36px] font-medium leading-[1.15] tracking-[-0.02em] m-0 max-w-[20ch]">{brief}</h3>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-2">[Stack]</div>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-white/[0.06] rounded-full text-[12px] font-mono">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-accent text-accent-fg rounded-[32px] p-6 lg:p-9 flex flex-col justify-between">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">[{hero.label}]</div>
            <div className="font-display italic text-[clamp(72px,8vw,120px)] leading-[0.9] tracking-[-0.045em]">{hero.value}</div>
          </div>
          <div className="bg-bg-light text-fg-on-light rounded-[32px] p-6 lg:p-9 flex flex-col justify-between">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">[{secondary.label}]</div>
            <div className="font-display italic text-[clamp(72px,8vw,120px)] leading-[0.9] tracking-[-0.045em] text-accent">{secondary.value}</div>
          </div>
        </div>
      </div>

      {testimonialQuote && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-12 p-6 lg:p-12 bg-bg-card rounded-[32px]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[Klient]</div>
            <div className="font-mono text-[12px] text-fg-muted mt-3">
              <strong className="font-sans not-italic text-fg text-[14px] block mb-1">{client.name}</strong>
              {client.role}<br />{client.year}
            </div>
          </div>
          <div>
            <p className="font-display italic text-[clamp(28px,3vw,44px)] leading-[1.2] tracking-[-0.025em] m-0 mb-6 max-w-[28ch]">
              {`„${testimonialQuote}”`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {deltas.map((d, i) => (
                <Delta key={i} from={d.from} to={d.to} label={d.label} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Delta({ from, to, label }: { from: string; to: string; label: string }) {
  return (
    <div className="bg-bg rounded-2xl p-6 text-fg">
      <div className="font-mono text-[11px] text-fg-muted line-through">{from}</div>
      <div className="font-mono text-accent my-1">↓ →</div>
      <div className="font-display italic text-[32px] text-accent leading-none">{to}</div>
      <div className="font-mono text-[12px] text-fg-muted mt-2 uppercase tracking-[0.08em]">{label}</div>
    </div>
  );
}
