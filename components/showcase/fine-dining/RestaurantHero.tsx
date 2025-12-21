"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function RestaurantHero() {
  const t = useTranslations("showcase.fine-dining");

  return (
    <section className="relative h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/showcase/fine-dining/hero.jpg"
          alt="Noir et Or Restaurant"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

        {/* Animated smoke effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(114,47,55,0.1) 0%, transparent 70%)`,
                left: `${20 + i * 15}%`,
                bottom: "0%",
              }}
              animate={{
                y: [0, -200, -400],
                opacity: [0, 0.3, 0],
                scale: [1, 1.5, 2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#D4AF37]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#D4AF37]/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-[#D4AF37]/10 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <p
              className="text-[#D4AF37] text-lg tracking-[0.5em] uppercase mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("brandName")}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-[#D4AF37]/50" />
              <div className="w-2 h-2 rotate-45 border border-[#D4AF37]/50" />
              <div className="w-12 h-px bg-[#D4AF37]/50" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-normal text-white mb-8 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-[#722F37] hover:bg-[#8B3A44] text-white font-normal px-8 py-6 text-base tracking-wider border border-[#722F37]"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 text-base tracking-wider"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
