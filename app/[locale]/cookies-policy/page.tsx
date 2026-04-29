"use client";

import { useTranslations } from "next-intl";
import { Cookie, Shield, BarChart3, Megaphone, Settings2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

export default function CookiesPolicyPage() {
  const t = useTranslations("legal.cookies");
  const { openSettings } = useCookieConsent();

  const cookieTypes = [
    { key: "necessary", icon: Shield },
    { key: "analytics", icon: BarChart3 },
    { key: "marketing", icon: Megaphone },
    { key: "preferences", icon: Settings2 },
  ];

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Cookie className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground">
            {t("lastUpdated")}: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {t("sections.intro.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("sections.intro.content")}
          </p>
        </section>

        {/* Cookie Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6">
            {t("sections.types.title")}
          </h2>
          <div className="space-y-4">
            {cookieTypes.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">
                      {t(`sections.types.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t(`sections.types.${key}.description`)}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {t(`sections.types.${key}.examples`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manage Cookies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {t("sections.manage.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("sections.manage.content")}
          </p>
          <ul className="space-y-2 mb-6">
            {Object.keys(
              t.raw("sections.manage.items") as Record<string, string>
            ).map((key) => (
              <li key={key} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1.5">•</span>
                <span>{t(`sections.manage.items.${key}`)}</span>
              </li>
            ))}
          </ul>
          <Button onClick={openSettings} variant="outline">
            <Settings2 className="w-4 h-4 mr-2" />
            {t("sections.manage.items.settings").split('"')[1] || "Cookie Settings"}
          </Button>
        </section>

        {/* Third Party */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {t("sections.thirdParty.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("sections.thirdParty.content")}
          </p>
          <ul className="space-y-2">
            {Object.keys(
              t.raw("sections.thirdParty.items") as Record<string, string>
            ).map((key) => (
              <li key={key} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1.5">•</span>
                <span>{t(`sections.thirdParty.items.${key}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Changes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {t("sections.changes.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("sections.changes.content")}
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {t("sections.contact.title")}
          </h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {t("sections.contact.content")}
          </p>
        </section>
      </div>
    </div>
  );
}
