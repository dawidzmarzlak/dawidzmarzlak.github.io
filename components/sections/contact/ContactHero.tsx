import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export function ContactHero() {
  return (
    <section className="max-w-[1400px] mx-auto px-9 pt-8 pb-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>Kontakt</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[14ch]">
        Porozmawiajmy o <ItalicAccent>Twoim projekcie</ItalicAccent>.
      </h1>
      <p className="text-[19px] text-fg-muted max-w-[50ch] leading-[1.55] m-0">
        Wybierz wygodną formę kontaktu — krótki brief poniżej (3 minuty), bezpośredni email, telefon albo umów się od razu na 30-minutową konsultację.
      </p>
    </section>
  );
}
