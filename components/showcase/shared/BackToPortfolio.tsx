"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToPortfolio() {
  const t = useTranslations("showcase");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 left-4 z-50 flex gap-2"
    >
      <Button
        variant="outline"
        size="sm"
        asChild
        className="backdrop-blur-md bg-white/80 dark:bg-black/80 border-white/20 shadow-lg hover:shadow-xl transition-all"
      >
        <Link href="/showcase">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("backToShowcase")}
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="backdrop-blur-md bg-white/80 dark:bg-black/80 border-white/20 shadow-lg hover:shadow-xl transition-all"
      >
        <Link href="/">
          <Home className="w-4 h-4" />
        </Link>
      </Button>
    </motion.div>
  );
}
