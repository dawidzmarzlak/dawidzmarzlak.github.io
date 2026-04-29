"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getAllThemes } from "@/lib/showcase/themes";
import Image from "next/image";

export function ShowcaseList() {
  const t = useTranslations("showcase");
  const themes = getAllThemes();

  return (
    <div className="max-w-[1400px] mx-auto px-9 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <Link
          key={theme.slug}
          href={`/showcase/${theme.slug}`}
          className="group relative block overflow-hidden rounded-[24px] bg-bg-card text-fg no-underline transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1"
        >
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={`/showcase/${theme.slug}/thumbnail.png`}
              alt={t(`${theme.slug}.brandName`)}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span
              className="absolute top-5 right-5 w-10 h-10 rounded-full grid place-items-center bg-black/[0.06] dark:bg-white/[0.06] text-fg backdrop-blur-sm"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>

          {/* Footer */}
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">
                {t(`${theme.slug}.industry`)}
              </span>
            </div>
            <h2 className="text-[26px] font-semibold tracking-[-0.02em] leading-[1.1] m-0 text-fg">
              {t(`${theme.slug}.brandName`)}
            </h2>
            <p className="text-[15px] leading-[1.5] text-fg-muted m-0">
              {t(`${theme.slug}.tagline`)}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {theme.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted py-1 px-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
