"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

// Animated particles background
function ParticlesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#06FFA5] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
        />
      ))}
      {/* Glowing orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #06FFA5 0%, transparent 70%)",
          right: "10%",
          bottom: "20%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}

// Grid pattern
function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(#8B5CF620 1px, transparent 1px),
          linear-gradient(90deg, #8B5CF620 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

// Glowing text effect
function GlowingText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative">
      <span className="absolute inset-0 blur-lg bg-gradient-to-r from-[#8B5CF6] via-[#06FFA5] to-[#FF006E] bg-clip-text text-transparent opacity-50">
        {children}
      </span>
      <span className="relative bg-gradient-to-r from-[#8B5CF6] via-[#06FFA5] to-[#FF006E] bg-clip-text text-transparent">
        {children}
      </span>
    </span>
  );
}

export function CryptoHero() {
  const t = useTranslations("showcase.crypto-platform");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0F]">
      <ParticlesBackground />
      <GridPattern />

      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none opacity-20 blur-[80px] z-0"
        style={{
          background: "radial-gradient(circle, #06FFA5, transparent)",
        }}
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", damping: 30 }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 mb-8"
          >
            <Zap className="w-4 h-4 text-[#06FFA5]" />
            <span
              className="text-sm text-[#06FFA5]"
              style={{ fontFamily: "var(--font-exo)" }}
            >
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("hero.titlePart1")}
            <br />
            <GlowingText>{t("hero.titleHighlight")}</GlowingText>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
            style={{ fontFamily: "var(--font-exo)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#06FFA5] hover:opacity-90 text-black font-bold px-8 py-6 text-lg rounded-xl gap-2 group"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <Wallet className="w-5 h-5" />
              {t("hero.cta")}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%", opacity: 0.3 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 px-8 py-6 text-lg rounded-xl gap-2"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {t("hero.ctaSecondary")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: "$2.4B+", label: t("hero.stats.volume") },
              { value: "150K+", label: t("hero.stats.users") },
              { value: "0.01%", label: t("hero.stats.fees") },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm text-gray-500"
                  style={{ fontFamily: "var(--font-exo)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
    </section>
  );
}
