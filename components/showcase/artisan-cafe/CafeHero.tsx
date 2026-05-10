"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Image from "next/image";
import { useTheme, useContent, useMedia } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { ArtisanCafeContent } from "@/lib/showcase/artisan-cafe/template.config";

export function CafeHero() {
  const theme = useTheme();
  const c = useContent<ArtisanCafeContent["hero"]>("hero");
  const heroSrc = useMedia<string>("hero");

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroSrc}
          alt="Bean & Brew Cafe"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      {/* Hand-drawn elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dashed circle */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full border-2 border-dashed"
          style={{ borderColor: withAlpha(theme.palette.fg, 20) }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Dots pattern */}
        <div className="absolute bottom-20 left-20">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: withAlpha(theme.palette.accent, 30),
                left: `${(i % 3) * 16}px`,
                top: `${Math.floor(i / 3) * 16}px`,
              }}
            />
          ))}
        </div>

        {/* Wavy line */}
        <svg
          className="absolute bottom-1/4 right-1/4 w-48 h-8"
          style={{ color: withAlpha(theme.palette.muted, 30) }}
          viewBox="0 0 200 30"
        >
          <path
            d="M0,15 Q25,0 50,15 Q75,30 100,15 Q125,0 150,15 Q175,30 200,15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Steam animation */}
      <div className="absolute bottom-1/3 right-1/3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-16 opacity-20"
            style={{
              left: `${i * 20}px`,
              background: `linear-gradient(to top, transparent, ${theme.palette.fg}, transparent)`,
              borderRadius: "50%",
            }}
            animate={{
              y: [-20, -60],
              opacity: [0, 0.2, 0],
              scale: [1, 1.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
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
          {/* Coffee icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.palette.fg }}
            >
              <Coffee className="w-10 h-10" style={{ color: theme.palette.bg }} />
            </div>
          </motion.div>

          {/* Brand */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
          >
            {c.eyebrow}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-normal mb-8 leading-tight"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
          >
            {c.title}
          </motion.h1>

          {/* Subtitle - handwritten style */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl max-w-2xl mx-auto mb-12"
            style={{ fontFamily: theme.fonts.accent, color: theme.palette.accent }}
          >
            {c.subtitle}
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
              className="font-normal px-8 py-6 text-base text-white hover:opacity-90 transition-opacity rounded-full"
              style={{
                fontFamily: theme.fonts.body,
                backgroundColor: theme.palette.fg,
              }}
            >
              {c.primaryCta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base hover:opacity-80 transition-opacity rounded-full"
              style={{
                fontFamily: theme.fonts.body,
                borderColor: theme.palette.fg,
                color: theme.palette.fg,
              }}
            >
              {c.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
