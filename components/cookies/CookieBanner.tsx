"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-lg border bg-background/95 backdrop-blur-sm shadow-lg">
            <div className="p-4 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                {/* Icon and content */}
                <div className="flex gap-4 flex-1">
                  <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">
                      {t("title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("description")}{" "}
                      <Link
                        href="/cookies-policy"
                        className="text-primary hover:underline"
                      >
                        {t("learnMore")}
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openSettings}
                    className="order-3 sm:order-1"
                  >
                    {t("settings")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rejectAll}
                    className="order-2"
                  >
                    {t("rejectAll")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="order-1 sm:order-3"
                  >
                    {t("acceptAll")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
