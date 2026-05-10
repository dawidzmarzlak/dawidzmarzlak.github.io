"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { FashionStoreContent } from "@/lib/showcase/fashion-store/template.config";

export function FashionHero() {
  const theme = useTheme();
  const c = useContent<FashionStoreContent["hero"]>("hero");

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <div className="flex items-center justify-center px-8 lg:px-16 py-32 lg:py-0 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: theme.fonts.body, color: theme.palette.brandLabel }}
            >
              {c.brandLabel}
            </motion.p>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-[1.1]"
              style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
            >
              {c.title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-base mb-10 leading-relaxed"
              style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
            >
              {c.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="font-normal px-8 py-6 text-sm tracking-wider uppercase transition-colors"
                style={{
                  fontFamily: theme.fonts.body,
                  backgroundColor: theme.palette.fg,
                  color: theme.palette.surface,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    theme.palette.fgHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    theme.palette.fg;
                }}
              >
                {c.primaryCta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-normal px-8 py-6 text-sm tracking-wider uppercase transition-colors"
                style={{
                  fontFamily: theme.fonts.body,
                  borderColor: theme.palette.fg,
                  color: theme.palette.fg,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = theme.palette.fg;
                  btn.style.color = theme.palette.surface;
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = "transparent";
                  btn.style.color = theme.palette.fg;
                }}
              >
                {c.secondaryCta}
              </Button>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 pt-12"
              style={{ borderTop: `1px solid ${theme.palette.border}` }}
            >
              {c.features.map((feature) => (
                <div key={feature} className="text-center">
                  <p
                    className="text-xs tracking-wider uppercase"
                    style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative order-1 lg:order-2 min-h-[60vh] lg:min-h-screen"
        >
          <Image
            src="/showcase/fashion-store/hero.jpg"
            alt="Fashion Collection"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${withAlpha(theme.palette.fg, 20)}, transparent)`,
            }}
          />

          {/* Season badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-8 backdrop-blur-sm px-6 py-4"
            style={{ backgroundColor: withAlpha(theme.palette.surface, 90) }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
            >
              {c.seasonLabel}
            </p>
            <p
              className="text-sm font-light"
              style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
            >
              {c.viewCollectionLabel}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
