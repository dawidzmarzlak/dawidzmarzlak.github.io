"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export function FitnessHero() {
  const t = useTranslations("showcase.fitness-studio");

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Diagonal lines background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-[#CCFF00]"
            style={{
              width: '200%',
              left: '-50%',
              top: `${i * 5}%`,
              transform: 'rotate(-15deg)',
            }}
          />
        ))}
      </div>

      {/* Accent elements */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-2 h-64 bg-[#CCFF00]"
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-64 h-2 bg-[#CCFF00]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-32">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-8 h-1 bg-[#CCFF00]" />
              <span
                className="text-[#CCFF00] text-sm tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("brandName")}
              </span>
            </motion.div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-normal text-white mb-6 leading-[0.9] tracking-tight uppercase"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p
              className="text-base md:text-lg text-[#999999] max-w-md mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#CCFF00] hover:bg-[#B8E600] text-[#0A0A0A] font-bold px-8 py-6 text-sm tracking-wider uppercase group"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-sm tracking-wider uppercase"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                <Play className="w-4 h-4 mr-2" />
                {t("hero.ctaSecondary")}
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-12 mt-16"
            >
              {[
                { value: "50+", label: "Classes" },
                { value: "20", label: "Trainers" },
                { value: "5K+", label: "Members" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-4xl text-[#CCFF00] mb-1"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs text-[#666666] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Fitness image */}
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/showcase/fitness-studio/hero.jpg"
                alt="Fitness Studio"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#CCFF00]" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#CCFF00]" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 top-1/4 bg-[#CCFF00] text-[#0A0A0A] px-6 py-4"
            >
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-bebas)" }}>24/7</p>
              <p className="text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>Access</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
