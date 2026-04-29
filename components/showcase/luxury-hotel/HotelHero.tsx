"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function HotelHero() {
  const t = useTranslations("showcase.luxury-hotel");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        {/* Hero image */}
        <Image
          src="/showcase/luxury-hotel/hero.jpg"
          alt="Grand Riviera Hotel"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1A2A4A]/60" />
        {/* Decorative elements */}
        <div className="absolute inset-0">
          {/* Gold accents */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#C9A962]/30 rotate-45" />
          <div className="absolute bottom-32 right-20 w-48 h-48 border border-[#C9A962]/20 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-[#C9A962]/30 to-transparent" />
          <div className="absolute top-1/2 left-1/3 w-24 h-1 bg-gradient-to-r from-transparent via-[#C9A962]/30 to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          {/* Brand */}
          <div className="mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-24 h-px bg-[#C9A962] mx-auto mb-6"
            />
            <p
              className="text-[#C9A962] text-sm tracking-[0.4em] uppercase font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("brandName")}
            </p>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#C9A962] hover:bg-[#B8954F] text-[#1A2A4A] font-medium px-8 py-6 text-base tracking-wide"
            >
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base tracking-wide"
            >
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/50"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
