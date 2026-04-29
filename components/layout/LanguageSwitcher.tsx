"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center p-[3px] bg-white/[0.04] border border-line rounded-full font-mono" role="group" aria-label="Language">
      {(["pl", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.push(pathname, { locale: code })}
          aria-pressed={locale === code}
          className={`px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] uppercase rounded-full transition ${
            locale === code ? "bg-accent text-accent-fg" : "text-fg-muted hover:text-fg"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
