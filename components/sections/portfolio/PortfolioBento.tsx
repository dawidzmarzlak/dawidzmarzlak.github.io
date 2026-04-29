"use client";
import { Tilt } from "@/components/animations/Tilt";
import { type Project } from "@/lib/design/portfolio-data";

interface Props {
  projects: Project[];
}

const TONE_CLASS: Record<Project["tone"], string> = {
  dark: "bg-bg-card text-fg",
  light: "bg-bg-light text-fg-on-light",
  accent: "bg-accent text-accent-fg",
};

const SIZE_CLASS: Record<Project["size"], string> = {
  big: "lg:col-span-4 lg:row-span-2",
  med: "lg:col-span-3 lg:row-span-1",
  small: "lg:col-span-3 lg:row-span-1",
};

const TONE_BG: Record<Project["tone"], string> = {
  dark: "radial-gradient(circle at 80% 100%, rgba(196,255,58,0.2), transparent 60%)",
  light: "radial-gradient(circle at 70% 0%, rgba(0,0,0,0.08), transparent 60%)",
  accent: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3), transparent 50%)",
};

export function PortfolioBento({ projects }: Props) {
  return (
    <section
      data-portfolio-bento
      className="max-w-[1400px] mx-auto px-5 lg:px-9 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
      style={{ gridAutoRows: "320px" }}
    >
      {projects.map((p) => (
        <Tilt key={p.name} max={3} className={SIZE_CLASS[p.size]}>
          <article
            className={`group relative overflow-hidden rounded-[24px] p-6 lg:p-9 cursor-pointer flex flex-col h-full transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 ${TONE_CLASS[p.tone]}`}
            style={p.color ? { background: p.color } : undefined}
          >
            <div
              className="absolute inset-0 opacity-40 transition-transform duration-700 pointer-events-none group-hover:scale-110"
              style={{ background: TONE_BG[p.tone] }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] opacity-70">
              <span>{p.cat}</span>
              <span>{p.year}</span>
            </div>
            <h3
              className={`relative z-10 font-semibold tracking-[-0.035em] leading-none mt-auto mb-2 ${
                p.size === "big" ? "text-[clamp(56px,6vw,96px)]" : "text-[clamp(32px,4vw,64px)]"
              }`}
            >
              {p.name}
            </h3>
            {p.size === "big" && (
              <p className="relative z-10 text-[14px] leading-[1.5] opacity-80 m-0 mb-4 max-w-[50ch]">{p.desc}</p>
            )}
            <div className="relative z-10 flex justify-between items-center">
              <span
                className={`font-mono text-[12px] py-1.5 px-3 rounded-full ${
                  p.tone === "dark" ? "bg-accent text-accent-fg" : "bg-black/[0.08]"
                }`}
              >
                {p.metric}
              </span>
              <span
                className={`w-[38px] h-[38px] rounded-full grid place-items-center transition-all ${
                  p.tone === "dark" ? "bg-white/[0.08]" : "bg-black/[0.08]"
                }`}
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          </article>
        </Tilt>
      ))}
    </section>
  );
}
