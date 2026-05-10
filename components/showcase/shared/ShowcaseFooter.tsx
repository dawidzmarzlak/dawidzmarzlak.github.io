"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import { Link } from "@/i18n/routing";
import { TemplateContextOptional } from "./_templateBridge";

interface ShowcaseFooterProps {
  projectName?: string;
  accentColor?: string;
  theme?: "light" | "dark";
}

export function ShowcaseFooter({
  projectName,
  accentColor,
  theme = "light",
}: ShowcaseFooterProps) {
  const t = useTranslations("showcase");
  const ctx = useContext(TemplateContextOptional);
  const resolvedName = projectName ?? ctx?.meta.brandName ?? "";
  const resolvedAccent = accentColor ?? ctx?.theme.palette.accent ?? "#3B82F6";

  return (
    <footer
      className={`py-8 border-t ${
        theme === "dark"
          ? "bg-gray-950 border-gray-800 text-gray-400"
          : "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-center md:text-left">
            <span className="opacity-70">{t("demoNote")}</span>
            <span className="font-semibold ml-1" style={{ color: resolvedAccent }}>
              {resolvedName}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="hover:underline transition-colors" style={{ color: resolvedAccent }}>
              IT Solutions
            </Link>
            <span className="opacity-50">|</span>
            <Link href="/contact" className="hover:underline transition-colors" style={{ color: resolvedAccent }}>
              {t("contactMe")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
