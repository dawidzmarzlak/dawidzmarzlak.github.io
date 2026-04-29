"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_ITEMS: Array<{ href: string; key: "services" | "portfolio" | "contact"; }> = [
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/contact", key: "contact" },
];

const ANCHOR_ITEMS: Array<{ id: "process" | "faq"; key: "process" | "faq" }> = [
  { id: "process", key: "process" },
  { id: "faq", key: "faq" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = (next: "pl" | "en") => {
    if (next !== locale) router.push(pathname, { locale: next });
  };

  // Smart in-page-or-cross-page anchor navigation. Sections live on the home page (id="process", id="faq").
  // If we're already on home, scroll smoothly. Otherwise, route to home and let the post-navigation scroll
  // be handled by the browser via the URL hash (which Next.js preserves on push when set explicitly).
  const goToAnchor = (id: "process" | "faq") => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-line">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-9 py-4 flex items-center gap-9">
          <Link href="/" className="flex items-center gap-3 text-fg no-underline">
            <span className="w-9 h-9 rounded-full bg-accent text-accent-fg grid place-items-center font-extrabold text-[18px]">i</span>
            <span className="font-semibold text-[18px] tracking-[-0.03em]">IT Solutions</span>
          </Link>

          <nav className="hidden md:flex gap-7 ml-auto text-[14px] font-medium" aria-label={t("menu")}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.key} href={item.href} className="text-fg opacity-70 hover:opacity-100 transition-opacity no-underline">
                {t(item.key)}
              </Link>
            ))}
            {ANCHOR_ITEMS.map((item) => (
              <a key={item.key} href={`#${item.id}`} onClick={goToAnchor(item.id)} className="text-fg opacity-70 hover:opacity-100 transition-opacity no-underline">
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Theme toggle (subtle, mono-styled) */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? t("lightMode") : t("darkMode")}
            className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full border border-line text-fg-muted hover:text-fg hover:border-fg-muted transition"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Lang pill */}
          <div className="hidden md:inline-flex items-center p-[3px] bg-white/[0.04] border border-line rounded-full font-mono">
            {(["pl", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => switchLocale(code)}
                aria-pressed={locale === code}
                className={`px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] uppercase rounded-full transition ${
                  locale === code ? "bg-accent text-accent-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-[18px] py-2.5 bg-accent text-accent-fg rounded-full text-[13px] font-bold no-underline"
          >
            {t("cta")}
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            className={`md:hidden ml-auto w-10 h-10 border border-line rounded-[10px] grid place-items-center transition ${mobileOpen ? "bg-accent border-accent" : "bg-transparent"}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("close") : t("menu")}
            aria-expanded={mobileOpen}
          >
            <span className="relative w-[18px] h-3 block">
              <span className={`absolute left-0 right-0 h-[1.5px] bg-fg transition-transform ${mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 right-0 h-[1.5px] bg-fg transition-transform ${mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE SHEET */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-bg pt-20 px-7 pb-8 overflow-y-auto transition-opacity ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="block py-4 text-[30px] font-semibold tracking-[-0.03em] text-fg no-underline border-b border-line"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          {ANCHOR_ITEMS.map((item) => (
            <li key={item.key}>
              <a
                href={`#${item.id}`}
                onClick={goToAnchor(item.id)}
                className="block py-4 text-[30px] font-semibold tracking-[-0.03em] text-fg no-underline border-b border-line"
              >
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="inline-block mt-7 px-5 py-3.5 bg-accent text-accent-fg rounded-full font-bold no-underline"
        >
          {t("cta")}
        </Link>
        <div className="mt-8 flex flex-col gap-1.5 font-mono text-[12px] text-fg-muted">
          <span>hello@itsolutions.com</span>
          <span>+48 123 456 789</span>
          <span>Warszawa, PL</span>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? t("lightMode") : t("darkMode")}
            className="w-10 h-10 grid place-items-center rounded-full border border-line text-fg-muted"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="inline-flex items-center p-[3px] bg-white/[0.04] border border-line rounded-full font-mono">
            {(["pl", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => switchLocale(code)}
                aria-pressed={locale === code}
                className={`px-3 py-1 text-[11px] font-semibold tracking-[0.06em] uppercase rounded-full transition ${
                  locale === code ? "bg-accent text-accent-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
