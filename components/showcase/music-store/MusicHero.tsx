"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Disc3, Play, ShoppingBag } from "lucide-react";

export function MusicHero() {
  const t = useTranslations("showcase.music-store");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFF5E6]">
      {/* Vinyl record decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large spinning vinyl */}
        <motion.div
          className="absolute -right-32 top-1/4 w-[500px] h-[500px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#333] relative">
            {/* Vinyl grooves */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-[#444]/30"
                style={{
                  margin: `${20 + i * 25}px`,
                }}
              />
            ))}
            {/* Center label */}
            <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#1A1A1A]" />
            </div>
          </div>
        </motion.div>

        {/* Smaller vinyl */}
        <motion.div
          className="absolute -left-20 bottom-20 w-[300px] h-[300px] opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-[#1A1A1A]">
            <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#8B4513]" />
          </div>
        </motion.div>

        {/* Floating music notes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl text-[#8B4513]/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#8B4513] to-[#FF6B35] flex items-center justify-center shadow-2xl">
              <Disc3 className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Brand */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#FF6B35] text-xl tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-permanent-marker)" }}
          >
            {t("brandName")}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl font-black text-[#1A1A1A] mb-6 leading-none"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-[#8B4513] max-w-2xl mx-auto mb-12"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-[#8B4513] hover:bg-[#6B3410] text-white font-semibold px-8 py-6 text-lg rounded-full gap-2"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              <ShoppingBag className="w-5 h-5" />
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 px-8 py-6 text-lg rounded-full gap-2"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              <Play className="w-5 h-5" />
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-[#E8DCC8]">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}
