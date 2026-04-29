import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export function ServicesHero() {
  return (
    <section className="max-w-[1400px] mx-auto px-9 pt-8 pb-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>Usługi</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
        Pięć stosów. <ItalicAccent>Jeden senior</ItalicAccent>. Twój projekt.
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end max-w-[1100px]">
        <p className="text-[17px] leading-[1.55] text-fg-muted m-0">
          Buduję strony, sklepy i aplikacje webowe od 2020 roku. Zamiast oferować jeden stack do wszystkiego, dopasowuję narzędzie do problemu — czasem to Next.js, czasem WordPress, a czasem Spring Boot.
        </p>
        <p className="text-[17px] leading-[1.55] text-fg-muted m-0 lg:text-right">
          Wybierz technologię niżej, żeby zobaczyć szczegóły, zakres prac, czas realizacji i widełki cenowe.
        </p>
      </div>
    </section>
  );
}
