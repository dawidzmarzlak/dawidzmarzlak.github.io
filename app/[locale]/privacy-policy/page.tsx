import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Shield, Mail, MapPin, Lock, Clock, FileText, UserCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export const dynamic = "force-static";

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
    <main className="min-h-screen pb-24">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-9 pt-8 pb-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-7 flex gap-3">
          <Link href="/" className="text-fg-muted no-underline hover:text-accent">
            Start
          </Link>
          <span>/</span>
          <span>Polityka prywatności</span>
        </div>
        <h1 className="text-[clamp(48px,7vw,104px)] leading-[0.95] tracking-[-0.04em] m-0 mb-6 font-semibold text-fg max-w-[18ch]">
          Polityka <ItalicAccent>prywatności</ItalicAccent>.
        </h1>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">
          {t("lastUpdated")}: {new Date().toLocaleDateString("pl-PL")}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-9 flex flex-col gap-6">
        {sections.map(({ key, icon: Icon }) => (
          <section key={key} className="bg-bg-card rounded-[24px] p-7">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[20px] font-semibold tracking-[-0.01em] mb-2 text-fg">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="text-fg-muted leading-relaxed">
                  {t(`sections.${key}.content`)}
                </p>

                {/* Items list if exists */}
                {(key === "dataCollection" ||
                  key === "purposes" ||
                  key === "legalBasis" ||
                  key === "rights") && (
                  <ul className="mt-4 space-y-2">
                    {Object.keys(
                      t.raw(`sections.${key}.items`) as Record<string, string>
                    ).map((itemKey) => (
                      <li
                        key={itemKey}
                        className="flex items-start gap-2 text-fg-muted leading-relaxed"
                      >
                        <span className="text-accent mt-1.5">•</span>
                        <span>{t(`sections.${key}.items.${itemKey}`)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Contact info */}
                {key === "contact" && (
                  <div className="mt-4 space-y-2 text-fg-muted">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-accent" />
                      <span>{t("sections.contact.email")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{t("sections.contact.address")}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
