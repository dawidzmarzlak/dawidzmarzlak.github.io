"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface ShowcaseFooterProps {
  projectName: string;
  accentColor?: string;
  theme?: "light" | "dark";
}

export function ShowcaseFooter({
  projectName,
  accentColor = "#3B82F6",
  theme = "light"
}: ShowcaseFooterProps) {
  const t = useTranslations("showcase");

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
            <span className="font-semibold ml-1" style={{ color: accentColor }}>
              {projectName}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className="hover:underline transition-colors"
              style={{ color: accentColor }}
            >
              IT Solutions
            </Link>
            <span className="opacity-50">|</span>
            <Link
              href="/contact"
              className="hover:underline transition-colors"
              style={{ color: accentColor }}
            >
              {t("contactMe")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
