"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function ArchitectureHero() {
  const t = useTranslations("showcase.architecture-studio");

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/showcase/architecture-studio/hero.jpg"
          alt="FORM & VOID Architecture"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Large number background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 text-[40rem] font-bold leading-none select-none"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        01
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-[#FF4D00]" />
                <span
                  className="text-sm tracking-[0.3em] uppercase font-medium"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t("brandName")}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-8 leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("hero.title").split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-black/60 max-w-xl mb-12"
              style={{ fontFamily: "var(--font-ibm-plex)" }}
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-black hover:bg-black/90 text-white font-medium px-8 py-6 text-base group"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black/5 px-8 py-6 text-base"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t("hero.ctaSecondary")}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 border-l-2 border-t-2 border-black/10" />
      <motion.div
        className="absolute bottom-8 left-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2 text-sm text-black/40" style={{ fontFamily: "var(--font-ibm-plex)" }}>
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-black/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
