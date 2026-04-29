import { type ReactNode } from "react";
import { MonoLabel } from "./MonoLabel";

interface Props {
  kicker: string;
  /** Use <ItalicAccent>…</ItalicAccent> inline to render the italic display accent. */
  title: ReactNode;
  cta?: { href: string; label: string };
}

export function SectionHead({ kicker, title, cta }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">
      <div>
        <MonoLabel className="mb-3">{kicker}</MonoLabel>
        <h2 className="text-[clamp(48px,6vw,88px)] leading-[0.95] tracking-[-0.04em] font-semibold max-w-[18ch] m-0">
          {title}
        </h2>
      </div>
      {cta && (
        <a
          href={cta.href}
          className="self-start lg:self-end inline-flex items-center gap-2 rounded-full border border-line text-fg-muted px-4 py-2.5 text-sm hover:text-fg hover:border-fg-muted transition"
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
