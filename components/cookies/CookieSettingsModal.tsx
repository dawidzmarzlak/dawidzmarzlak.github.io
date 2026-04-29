"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Shield, BarChart3, Megaphone, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
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
              className="w-full max-w-lg rounded-lg border bg-background shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">{t("settings.title")}</h2>
                </div>
                <button
                  onClick={closeSettings}
                  className="rounded-full p-2 hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <p className="text-sm text-muted-foreground">
                  {t("settings.description")}
                </p>

                {/* Cookie categories */}
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-start gap-4 rounded-lg border p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium">
                            {t(`categories.${category.id}.title`)}
                          </h3>
                          {category.required ? (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {t("settings.required")}
                            </span>
                          ) : (
                            <Switch
                              checked={
                                preferences[
                                  category.id as keyof typeof preferences
                                ]
                              }
                              onCheckedChange={() =>
                                handleToggle(
                                  category.id as "analytics" | "marketing" | "preferences"
                                )
                              }
                            />
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t(`categories.${category.id}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-2 border-t p-4 md:p-6">
                <Button variant="outline" onClick={rejectAll} className="sm:flex-1">
                  {t("banner.rejectAll")}
                </Button>
                <Button variant="outline" onClick={acceptAll} className="sm:flex-1">
                  {t("banner.acceptAll")}
                </Button>
                <Button onClick={handleSave} className="sm:flex-1">
                  {t("settings.save")}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
