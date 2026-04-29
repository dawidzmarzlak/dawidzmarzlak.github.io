"use client";

import { useTranslations } from "next-intl";
import { Shield, BarChart3, Megaphone, Settings2, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { MagneticCTA } from "@/components/animations/MagneticCTA";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

export function CookiesPolicyClient() {
  const t = useTranslations("legal.cookies");
  const { openSettings } = useCookieConsent();

  const cookieTypes = [
    { key: "necessary", icon: Shield },
    { key: "analytics", icon: BarChart3 },
    { key: "marketing", icon: Megaphone },
    { key: "preferences", icon: Settings2 },
  ];

  const settingsLabel =
    t("sections.manage.items.settings").split('"')[1] || "Cookie Settings";

  return (
    <main className="min-h-screen pb-24">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-9 pt-8 pb-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
          <Link href="/" className="text-fg-muted no-underline hover:text-accent">
            Start
          </Link>
          <span>/</span>
          <span>Polityka cookies</span>
        </div>
        <h1 className="text-[clamp(48px,7vw,104px)] leading-[0.95] tracking-[-0.04em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
          Polityka <ItalicAccent>cookies</ItalicAccent>.
        </h1>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">
          {t("lastUpdated")}: {new Date().toLocaleDateString("pl-PL")}
        </div>
      </section>

      <div className="max-w-[860px] mx-auto px-9 flex flex-col gap-6">
        {/* Intro */}
        <section className="bg-bg-card rounded-[24px] p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] mb-4 text-fg">
            {t("sections.intro.title")}
          </h2>
          <p className="text-fg-muted leading-relaxed">
            {t("sections.intro.content")}
          </p>
        </section>

        {/* Cookie Types */}
        <section>
          <h2 className="text-2xl font-semibold tracking-[-0.01em] mb-6 text-fg px-1">
            {t("sections.types.title")}
          </h2>
          <div className="flex flex-col gap-4">
            {cookieTypes.map(({ key, icon: Icon }) => (
              <div key={key} className="bg-bg-card rounded-[24px] p-7">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] font-semibold tracking-[-0.01em] mb-1.5 text-fg">
                      {t(`sections.types.${key}.title`)}
                    </h3>
                    <p className="text-fg-muted leading-relaxed mb-2">
                      {t(`sections.types.${key}.description`)}
                    </p>
                    <p className="font-mono text-[12px] text-fg-muted/70">
                      {t(`sections.types.${key}.examples`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manage Cookies */}
        <section className="bg-bg-card rounded-[24px] p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] mb-4 text-fg">
            {t("sections.manage.title")}
          </h2>
          <p className="text-fg-muted leading-relaxed mb-4">
            {t("sections.manage.content")}
          </p>
          <ul className="space-y-2 mb-6">
            {Object.keys(
              t.raw("sections.manage.items") as Record<string, string>
            ).map((key) => (
              <li
                key={key}
                className="flex items-start gap-2 text-fg-muted leading-relaxed"
              >
                <span className="text-accent mt-1.5">•</span>
                <span>{t(`sections.manage.items.${key}`)}</span>
              </li>
            ))}
          </ul>
          <MagneticCTA
            href="#"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              openSettings();
            }}
          >
            <Settings2 className="w-4 h-4" />
            {settingsLabel}
          </MagneticCTA>
        </section>

        {/* Third Party */}
        <section className="bg-bg-card rounded-[24px] p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] mb-4 text-fg">
            {t("sections.thirdParty.title")}
          </h2>
          <p className="text-fg-muted leading-relaxed mb-4">
            {t("sections.thirdParty.content")}
          </p>
          <ul className="space-y-2">
            {Object.keys(
              t.raw("sections.thirdParty.items") as Record<string, string>
            ).map((key) => (
              <li
                key={key}
                className="flex items-start gap-2 text-fg-muted leading-relaxed"
              >
                <span className="text-accent mt-1.5">•</span>
                <span>{t(`sections.thirdParty.items.${key}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Changes */}
        <section className="bg-bg-card rounded-[24px] p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] mb-4 text-fg">
            {t("sections.changes.title")}
          </h2>
          <p className="text-fg-muted leading-relaxed">
            {t("sections.changes.content")}
          </p>
        </section>

        {/* Contact */}
        <section className="bg-bg-card rounded-[24px] p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] mb-4 text-fg">
            {t("sections.contact.title")}
          </h2>
          <p className="text-fg-muted leading-relaxed flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            {t("sections.contact.content")}
          </p>
        </section>
      </div>
    </main>
  );
}
