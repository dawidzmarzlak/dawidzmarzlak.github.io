"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, BarChart3, Megaphone, Settings2 } from "lucide-react";
import { useCookieConsent } from "./CookieConsentProvider";

interface CookieCategory {
  id: "necessary" | "analytics" | "marketing" | "preferences";
  icon: React.ReactNode;
  required?: boolean;
}

const categories: CookieCategory[] = [
  { id: "necessary", icon: <Shield className="h-5 w-5" />, required: true },
  { id: "analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { id: "marketing", icon: <Megaphone className="h-5 w-5" /> },
  { id: "preferences", icon: <Settings2 className="h-5 w-5" /> },
];

export function CookieSettingsModal() {
  const t = useTranslations("cookies");
  const { showSettings, closeSettings, savePreferences, consent, acceptAll, rejectAll } =
    useCookieConsent();

  const [preferences, setPreferences] = useState({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
    preferences: consent?.preferences ?? false,
  });

  // Sync preferences with consent when modal opens
  useEffect(() => {
    if (showSettings) {
      setPreferences({
        analytics: consent?.analytics ?? false,
        marketing: consent?.marketing ?? false,
        preferences: consent?.preferences ?? false,
      });
    }
  }, [showSettings, consent]);

  const handleToggle = (category: "analytics" | "marketing" | "preferences") => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {showSettings && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeSettings}
          >
            <div
              className="w-full max-w-2xl bg-bg-card border border-line rounded-[24px] p-9 md:p-12 my-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeSettings}
                aria-label="Close"
                className="absolute top-5 right-5 text-fg-muted hover:text-fg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-3">
                // cookie settings
              </div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-fg m-0 mb-2">
                {t("settings.title")}
              </h2>
              <p className="text-fg-muted leading-[1.55] m-0 mb-6">
                {t("settings.description")}
              </p>

              {/* Cookie categories */}
              <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                {categories.map((category) => {
                  const isToggleable = !category.required;
                  const isOn = isToggleable
                    ? preferences[category.id as keyof typeof preferences]
                    : true;
                  return (
                    <div
                      key={category.id}
                      className="bg-bg rounded-[16px] p-5 border border-line"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg">
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-1">
                                {category.id}
                              </div>
                              <h3 className="text-[15px] font-semibold text-fg m-0">
                                {t(`categories.${category.id}.title`)}
                              </h3>
                            </div>
                            {category.required ? (
                              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted border border-line rounded-full px-2.5 py-1">
                                {t("settings.required")}
                              </span>
                            ) : (
                              <button
                                type="button"
                                role="switch"
                                aria-checked={isOn}
                                aria-label={t(`categories.${category.id}.title`)}
                                onClick={() =>
                                  handleToggle(
                                    category.id as "analytics" | "marketing" | "preferences"
                                  )
                                }
                                className={`shrink-0 w-9 h-5 rounded-full relative transition-colors ${
                                  isOn ? "bg-accent" : "bg-line"
                                }`}
                              >
                                <span
                                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${
                                    isOn
                                      ? "translate-x-4 bg-accent-fg"
                                      : "translate-x-0 bg-white"
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                          <p className="mt-2 text-[14px] text-fg-muted leading-[1.55]">
                            {t(`categories.${category.id}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-2 mt-7">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="border border-line rounded-full px-6 py-3 text-fg hover:border-fg-muted transition-colors text-[14px] sm:flex-1"
                >
                  {t("banner.rejectAll")}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="border border-line rounded-full px-6 py-3 text-fg hover:border-fg-muted transition-colors text-[14px] sm:flex-1"
                >
                  {t("banner.acceptAll")}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-accent text-accent-fg rounded-full px-6 py-3 font-bold text-[14px] hover:opacity-90 transition-opacity sm:flex-1"
                >
                  {t("settings.save")}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
