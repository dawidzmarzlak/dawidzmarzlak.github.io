"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { SectionHead } from "./SectionHead";
import { ItalicAccent } from "./ItalicAccent";
import { getAllThemes } from "@/lib/showcase/themes";

const FEATURED_SLUGS = ["fashion-store", "saas-dashboard", "fine-dining", "creative-agency", "fitness-studio", "luxury-hotel"];

export function ShowcaseTeaser() {
  const t = useTranslations("redesign.sections.showcase");
  const tShow = useTranslations("showcase");
  const titleParts = t.raw("title") as [string, string, string];
  const themes = getAllThemes().filter((th) => FEATURED_SLUGS.includes(th.slug));

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20" id="showcase">
      <SectionHead
        kicker={t("kicker")}
        title={<>{titleParts[0]}<ItalicAccent>{titleParts[1]}</ItalicAccent>{titleParts[2]}</>}
        cta={{ href: "/showcase", label: t("cta") }}
      />
      <p className="text-[15px] text-fg-muted max-w-[60ch] mb-8 -mt-4">{t("subtitle")}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((th) => (
          <Link key={th.slug} href={`/showcase/${th.slug}`} className="group relative block overflow-hidden rounded-[20px] bg-bg-card no-underline transition-transform hover:-translate-y-1">
            <div className="relative aspect-[4/3]">
              <Image src={`/showcase/${th.slug}/thumbnail.png`} alt={tShow(`${th.slug}.brandName`)} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw" />
              <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.1em] py-1 px-2 rounded-full bg-black/40 text-white backdrop-blur-sm">
                {tShow("demoBadge")}
              </span>
            </div>
            <div className="p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{tShow(`${th.slug}.industry`)}</div>
              <div className="text-[16px] font-semibold text-fg mt-1">{tShow(`${th.slug}.brandName`)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
