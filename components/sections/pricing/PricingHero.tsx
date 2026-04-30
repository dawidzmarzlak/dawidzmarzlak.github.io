import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useTranslations } from "next-intl";

export function PricingHero() {
  const t = useTranslations("pricing.hero");
  const titleParts = t.raw("title") as [string, string, string];
  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 pt-8 pb-2">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
        <Link href="/" className="text-fg-muted no-underline hover:text-accent">Start</Link>
        <span>/</span>
        <span>{t("crumb")}</span>
      </div>
      <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.92] tracking-[-0.045em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
        {titleParts[0]}<ItalicAccent>{titleParts[1]}</ItalicAccent>{titleParts[2]}
      </h1>
      <p className="text-[19px] text-fg-muted max-w-[60ch] leading-[1.55] m-0">{t("intro")}</p>
    </section>
  );
}
