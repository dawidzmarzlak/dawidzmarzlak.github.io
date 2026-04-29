"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Headphones, Play, Mic } from "lucide-react";

// Animated sound wave
function SoundWave() {
  return (
    <div className="flex items-end justify-center gap-1 h-32">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-[#7C3AED] to-[#EC4899] rounded-full"
          animate={{
            height: [
              20 + Math.random() * 40,
              60 + Math.random() * 60,
              20 + Math.random() * 40,
            ],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.05,
          }}
          style={{ height: 20 }}
        />
      ))}
    </div>
  );
}

export function PodcastHero() {
  const t = useTranslations("showcase.podcast-studio");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0F0A1A]">
      {/* Background gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] bg-[#7C3AED]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] bg-[#EC4899]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px] bg-[#F59E0B]" />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7C3AED]/20 to-[#EC4899]/20 border border-[#7C3AED]/30 mb-8"
          >
            <Mic className="w-4 h-4 text-[#EC4899]" />
            <span
              className="text-sm text-white/80"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Microphone icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-2xl shadow-[#7C3AED]/30">
              <Headphones className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Sound wave animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <SoundWave />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 text-white font-bold px-8 py-6 text-lg rounded-2xl gap-2"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <Play className="w-5 h-5" />
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>

          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center justify-center gap-8 text-gray-500"
          >
            <span
              className="text-sm"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {t("hero.availableOn")}
            </span>
            <div className="flex gap-4">
              {["Spotify", "Apple", "YouTube"].map((platform) => (
                <div
                  key={platform}
                  className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {platform}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
