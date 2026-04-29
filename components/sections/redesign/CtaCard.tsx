import { type ReactNode } from "react";
import { MagneticCTA } from "@/components/animations/MagneticCTA";

interface Props {
  /** Big lime card heading. Use <ItalicAccent> for the italic display accent. */
  heading: ReactNode;
  /** Lead paragraph below the heading. */
  sub: string;
  primaryHref: string;
  primaryLabel: string;
  /** Optional secondary CTA (e.g. plain email link). */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Outer section id (default: "contact"). */
  id?: string;
}

export function CtaCard({ heading, sub, primaryHref, primaryLabel, secondaryHref, secondaryLabel, id = "contact" }: Props) {
  return (
    <section id={id} className="max-w-[1400px] mx-auto px-9 mb-9">
      <div className="relative overflow-hidden bg-accent text-accent-fg rounded-[32px] py-20 px-[60px] text-center">
        <span aria-hidden="true" className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-black/[0.06] pointer-events-none" />
        <span aria-hidden="true" className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full bg-black/[0.06] pointer-events-none" />
        <h2 className="relative text-[clamp(56px,7vw,112px)] m-0 mb-6 leading-[0.95] tracking-[-0.045em] font-semibold">
          {heading}
        </h2>
        <p className="relative text-[19px] max-w-[50ch] m-0 mx-auto mb-9 leading-[1.55] opacity-80">
          {sub}
        </p>
        <div className="relative inline-flex gap-2 flex-wrap justify-center">
          <MagneticCTA href={primaryHref} variant="primary" className="!bg-accent-fg !text-accent">
            {primaryLabel}
          </MagneticCTA>
          {secondaryHref && secondaryLabel && (
            <a
              href={secondaryHref}
              className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-semibold border border-black/20 text-accent-fg"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
