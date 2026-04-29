import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Shield, Mail, MapPin, Lock, Clock, FileText, UserCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });

  return {
    title: t("title"),
    description:
      locale === "pl"
        ? "Polityka prywatności IT Solutions - dowiedz się jak przetwarzamy Twoje dane osobowe"
        : "IT Solutions Privacy Policy - learn how we process your personal data",
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations("legal.privacy");

  const sections = [
    { key: "intro", icon: FileText },
    { key: "administrator", icon: Shield },
    { key: "dataCollection", icon: UserCheck },
    { key: "purposes", icon: FileText },
    { key: "legalBasis", icon: Lock },
    { key: "rights", icon: UserCheck },
    { key: "retention", icon: Clock },
    { key: "security", icon: Lock },
    { key: "contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground">
            {t("lastUpdated")}: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {sections.map(({ key, icon: Icon }) => (
            <section key={key} className="mb-10 not-prose">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {t(`sections.${key}.title`)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`sections.${key}.content`)}
                  </p>
                </div>
              </div>

              {/* Items list if exists */}
              {(key === "dataCollection" ||
                key === "purposes" ||
                key === "legalBasis" ||
                key === "rights") && (
                <ul className="ml-14 mt-4 space-y-2">
                  {Object.keys(
                    t.raw(`sections.${key}.items`) as Record<string, string>
                  ).map((itemKey) => (
                    <li
                      key={itemKey}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-primary mt-1.5">•</span>
                      <span>{t(`sections.${key}.items.${itemKey}`)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Contact info */}
              {key === "contact" && (
                <div className="ml-14 mt-4 space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{t("sections.contact.email")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t("sections.contact.address")}</span>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
