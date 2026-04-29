"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AgencyHero() {
  const t = useTranslations("showcase.creative-agency");

  return (
    <section className="relative min-h-screen bg-[#FFF8E7] overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-20 right-20 w-40 h-40 bg-[#FF6B6B] rounded-full"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-40 left-20 w-32 h-32 bg-[#4ECDC4]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-1/2 right-1/4 w-20 h-20 border-4 border-[#FFE66D] rotate-45"
      />

      {/* Marquee text */}
      <div className="absolute top-8 left-0 right-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-[#1A1A2E]/10 text-6xl font-bold uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              NOVA CREATIVE •
            </span>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-3xl py-32">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-4 h-4 bg-[#FF6B6B] rounded-full" />
            <div className="w-4 h-4 bg-[#4ECDC4]" />
            <div className="w-4 h-4 bg-[#FFE66D] rotate-45" />
            <span
              className="text-[#1A1A2E] text-sm tracking-wider uppercase ml-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t("brandName")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1A1A2E] mb-6 leading-[0.95]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#1A1A2E]/70 max-w-xl mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold px-8 py-6 text-base rounded-full group"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white px-8 py-6 text-base rounded-full"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        <div className="flex-1 bg-[#FF6B6B]" />
        <div className="flex-1 bg-[#4ECDC4]" />
        <div className="flex-1 bg-[#FFE66D]" />
        <div className="flex-1 bg-[#1A1A2E]" />
      </div>
    </section>
  );
}
