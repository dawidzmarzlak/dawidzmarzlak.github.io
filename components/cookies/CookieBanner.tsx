"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCookieConsent } from "./CookieConsentProvider";

export function CookieBanner() {
  const t = useTranslations("cookies.banner");
  const { showBanner, acceptAll, rejectAll, openSettings } = useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-40 bg-bg-card border border-line rounded-[24px] p-7 shadow-[0_8px_36px_rgba(0,0,0,0.12)]"
        >
          <button
            type="button"
            onClick={rejectAll}
            aria-label={t("rejectAll")}
            className="absolute top-4 right-4 text-fg-muted hover:text-fg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-3">
            // cookies
          </div>

          <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-fg m-0 mb-2">
            {t("title")}
          </h3>

          <p className="text-[14px] text-fg leading-[1.55] m-0 mb-5">
            {t("description")}{" "}
            <Link
              href="/cookies-policy"
              className="text-accent hover:underline"
            >
              {t("learnMore")}
            </Link>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={acceptAll}
              className="bg-accent text-accent-fg rounded-full px-5 py-2.5 text-[13px] font-bold hover:opacity-90 transition-opacity"
            >
              {t("acceptAll")}
            </button>
            <button
              type="button"
              onClick={openSettings}
              className="border border-line rounded-full px-5 py-2.5 text-[13px] text-fg hover:border-fg-muted transition-colors"
            >
              {t("settings")}
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="border border-line rounded-full px-5 py-2.5 text-[13px] text-fg hover:border-fg-muted transition-colors"
            >
              {t("rejectAll")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
