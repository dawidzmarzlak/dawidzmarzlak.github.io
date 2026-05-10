"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { TemplateContextOptional } from "./_templateBridge";

interface ShowcaseCTAProps {
  theme?: "light" | "dark";
  accentColor?: string;
  projectName?: string;
}

export function ShowcaseCTA({ theme = "light", accentColor, projectName }: ShowcaseCTAProps) {
  const t = useTranslations("showcase");
  const ctx = useContext(TemplateContextOptional);
  const resolvedAccent = accentColor ?? ctx?.theme.palette.accent ?? "#3B82F6";

  // projectName intentionally unused in CTA copy (kept for back-compat); ctx available if a future copy variant needs it.
  void projectName;

  return (
    <section className={`py-24 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 dark:bg-gray-900"}`}>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${resolvedAccent}20` }}>
            <MessageCircle className="w-4 h-4" style={{ color: resolvedAccent }} />
            <span className="text-sm font-medium" style={{ color: resolvedAccent }}>
              {t("ctaBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t("ctaTitle")}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("ctaDescription")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group" style={{ backgroundColor: resolvedAccent }}>
              <Link href="/contact">
                {t("ctaButton")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/showcase">{t("viewOtherProjects")}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
