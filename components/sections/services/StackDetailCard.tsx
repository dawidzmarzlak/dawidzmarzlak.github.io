import { Link } from "@/i18n/routing";
import { type Stack } from "@/lib/design/services-stacks";

interface Props { stack: Stack; }

export function StackDetailCard({ stack: s }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-6" data-stack-detail>
      <div className="bg-bg-card rounded-[32px] p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-4 flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-accent">
            [{s.tag}] · {s.kicker}
          </div>
          <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[0.95] tracking-[-0.035em] m-0 mb-6 font-semibold">
            {s.title}
          </h2>
          <p className="text-[17px] leading-[1.6] text-fg-muted m-0 mb-8">{s.desc}</p>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-4">
            Co dostajesz
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {s.bullets.map(([key, value, note], i) => (
              <div key={i} className="grid grid-cols-[100px_1fr] gap-6 py-4 border-t border-line">
                <div className="font-mono text-[12px] uppercase text-fg-muted pt-1">{key}</div>
                <div>
                  <div className="text-[17px] font-medium text-fg tracking-[-0.01em]">{value}</div>
                  <div className="text-[13px] text-fg-muted mt-1 leading-[1.5]">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-bg rounded-[24px] p-8 flex flex-col gap-6 self-start">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-3.5">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {s.stack.map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-bg-card border border-line rounded-full text-[12px] font-mono text-fg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-line">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-3.5">Kiedy używamy</div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {s.use.map((u, i) => (
                <li key={i} className="text-[14px] text-fg flex gap-2.5 items-baseline before:content-['→'] before:text-accent before:font-mono">
                  {u}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-line grid grid-cols-2 gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">Od</div>
              <div className="font-display italic text-[36px] leading-none text-accent mt-1.5">{s.from}</div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">Czas</div>
              <div className="font-display italic text-[36px] leading-none text-accent mt-1.5">{s.time}</div>
            </div>
          </div>

          <div className="pt-6 border-t border-line">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-3.5">Zrealizowane</div>
            <div className="flex flex-col gap-2">
              {s.examples.map((ex, i) => (
                <Link
                  key={i}
                  href="/portfolio"
                  className="text-[14px] text-fg no-underline px-3.5 py-3 bg-bg-card rounded-xl flex justify-between items-center transition-colors hover:bg-accent hover:text-accent-fg"
                >
                  {ex} <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
