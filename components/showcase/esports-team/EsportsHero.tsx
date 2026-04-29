"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Gamepad2, Twitch, Youtube, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

// Glitch text effect
function GlitchText({ children, className }: { children: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{children}</span>
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-[#22C55E] opacity-80"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)", transform: "translate(-2px, 0)" }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-[#A855F7] opacity-80"
            style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)", transform: "translate(2px, 0)" }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// Scanlines effect
function Scanlines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-10"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.3) 2px,
          rgba(0, 0, 0, 0.3) 4px
        )`,
      }}
    />
  );
}

export function EsportsHero() {
  const t = useTranslations("showcase.esports-team");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#09090B]">
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(#22C55E20 1px, transparent 1px),
              linear-gradient(90deg, #22C55E20 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-20 blur-[150px]"
          style={{ background: "radial-gradient(circle, #22C55E, transparent)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #A855F7, transparent)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <Scanlines />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          {/* Team logo placeholder */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-xl bg-gradient-to-br from-[#22C55E] to-[#A855F7] flex items-center justify-center shadow-2xl shadow-[#22C55E]/20 relative">
              <Gamepad2 className="w-12 h-12 text-white" />
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#22C55E]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#A855F7]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#A855F7]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#22C55E]" />
            </div>
          </motion.div>

          {/* Team name with glitch */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-9xl font-bold text-white mb-4 leading-none tracking-tighter"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            <GlitchText>{t("hero.name")}</GlitchText>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-[#22C55E] mb-8 font-medium tracking-widest uppercase"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {t("hero.tagline")}
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-8 md:gap-16 mb-12 py-6 border-y border-[#22C55E]/20"
          >
            {[
              { value: "47", label: t("hero.stats.wins") },
              { value: "12", label: t("hero.stats.championships") },
              { value: "5M+", label: t("hero.stats.followers") },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold px-8 py-6 text-lg relative overflow-hidden group"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              <span className="relative z-10">{t("hero.cta")}</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                style={{ opacity: 0.2 }}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7]/10 px-8 py-6 text-lg font-bold"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Twitch, color: "#9146FF" },
              { icon: Youtube, color: "#FF0000" },
              { icon: Twitter, color: "#1DA1F2" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
              >
                <social.icon className="w-5 h-5" style={{ color: social.color }} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
