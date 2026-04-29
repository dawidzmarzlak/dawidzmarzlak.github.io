export function ContactChannels() {
  return (
    <section className="max-w-[1400px] mx-auto px-9 my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <a href="mailto:hello@itsolutions.com" className="bg-bg-card rounded-[24px] p-7 flex flex-col gap-3 transition-transform hover:-translate-y-0.5 no-underline">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[01] · Email</span>
        <span className="text-[24px] font-medium tracking-[-0.02em] text-fg">hello@itsolutions.com</span>
        <span className="text-[13px] text-fg-muted">
          Odpowiadam <em className="font-display italic text-accent">w 12h</em>, w dni robocze.
        </span>
      </a>
      <a href="tel:+48123456789" className="bg-bg-card rounded-[24px] p-7 flex flex-col gap-3 transition-transform hover:-translate-y-0.5 no-underline">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[02] · Telefon</span>
        <span className="text-[24px] font-medium tracking-[-0.02em] text-fg">+48 123 456 789</span>
        <span className="text-[13px] text-fg-muted">
          Pon–Pt, <em className="font-display italic text-accent">9:00–17:00</em>
        </span>
      </a>
      <a href="#brief" className="bg-bg-card rounded-[24px] p-7 flex flex-col gap-3 transition-transform hover:-translate-y-0.5 no-underline">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[03] · Brief</span>
        <span className="text-[24px] font-medium tracking-[-0.02em] text-fg">
          Formularz <span className="font-display italic text-accent">3 minuty</span>
        </span>
        <span className="text-[13px] text-fg-muted">
          Wracam z wyceną <em className="font-display italic text-accent">w 48h</em>.
        </span>
      </a>
    </section>
  );
}
