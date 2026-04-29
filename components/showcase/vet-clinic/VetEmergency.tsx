"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Phone, AlertTriangle, X, Clock } from "lucide-react";

export function VetEmergency() {
  const t = useTranslations("showcase.vet-clinic");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Stop pulsing when expanded
  useEffect(() => {
    if (isExpanded) {
      setIsPulsing(false);
    } else {
      const timer = setTimeout(() => setIsPulsing(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <>
      {/* Floating Emergency Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.button
              key="button"
              onClick={() => setIsExpanded(true)}
              className="relative flex items-center gap-3 px-6 py-4 bg-[#F97316] text-white rounded-full shadow-2xl hover:bg-[#EA580C] transition-colors"
              style={{ fontFamily: "var(--font-fredoka)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing ring */}
              {isPulsing && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#F97316]"
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}
              <AlertTriangle className="w-6 h-6 relative z-10" />
              <span className="text-lg font-bold relative z-10">
                {t("emergency.button")}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl p-6 w-80"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className="font-bold text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {t("emergency.title")}
                  </h3>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <p
                className="text-gray-600 mb-4 text-sm"
                style={{ fontFamily: "var(--font-quicksand)" }}
              >
                {t("emergency.description")}
              </p>

              {/* Available 24/7 */}
              <div className="flex items-center gap-2 mb-4 text-[#0D9488]">
                <Clock className="w-4 h-4" />
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "var(--font-quicksand)" }}
                >
                  {t("emergency.available")}
                </span>
              </div>

              {/* Phone number */}
              <a
                href="tel:+1-800-PET-HELP"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#F97316] text-white rounded-2xl hover:bg-[#EA580C] transition-colors"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg font-bold">1-800-PET-HELP</span>
              </a>

              {/* Warning signs */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p
                  className="text-xs text-gray-500 mb-2"
                  style={{ fontFamily: "var(--font-quicksand)" }}
                >
                  {t("emergency.warningTitle")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#F97316]/10 text-[#F97316] text-xs rounded-full"
                      style={{ fontFamily: "var(--font-quicksand)" }}
                    >
                      {t(`emergency.warnings.${i}`)}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
