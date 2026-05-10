"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent } from "@/lib/showcase/saas-dashboard/template.config";

export function SaasHero() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["hero"]>("hero");

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: withAlpha(theme.palette.accent, 30) }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: withAlpha(theme.palette.accentTertiary, 20) }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{ backgroundColor: withAlpha(theme.palette.accentSecondary, 10) }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${withAlpha(theme.palette.accent, 10)} 1px, transparent 1px), linear-gradient(90deg, ${withAlpha(theme.palette.accent, 10)} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              backgroundColor: withAlpha(theme.palette.accent, 10),
              border: `1px solid ${withAlpha(theme.palette.accent, 20)}`,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: theme.palette.accent }} />
            <span
              className="text-sm"
              style={{ fontFamily: theme.fonts.body, color: theme.palette.accent }}
            >
              {c.eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
          >
            {c.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
          >
            {c.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="text-white font-semibold px-8 py-6 text-base rounded-xl group hover:opacity-90 transition-opacity"
              style={{
                fontFamily: theme.fonts.body,
                background: `linear-gradient(to right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`,
              }}
            >
              {c.primaryCta}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white px-8 py-6 text-base rounded-xl hover:opacity-80 transition-opacity"
              style={{
                fontFamily: theme.fonts.body,
                borderColor: theme.palette.surfaceLight,
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              {c.secondaryCta}
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          {/* Glassmorphism card */}
          <div
            className="relative backdrop-blur-xl rounded-2xl p-6 shadow-2xl"
            style={{
              backgroundColor: withAlpha(theme.palette.surface, 50),
              border: `1px solid ${theme.palette.surfaceLight}`,
            }}
          >
            {/* Window controls */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
            </div>

            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Metric cards */}
              {c.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: withAlpha(theme.palette.bg, 50),
                    border: `1px solid ${theme.palette.surfaceLight}`,
                  }}
                >
                  <p className="text-sm mb-1" style={{ color: theme.palette.muted }}>
                    {metric.label}
                  </p>
                  <div className="flex items-end gap-2">
                    <span
                      className="text-2xl font-bold"
                      style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
                    >
                      {metric.value}
                    </span>
                    <span className="text-sm mb-1 text-[#22C55E]">{metric.change}</span>
                  </div>
                  <div
                    className="mt-3 h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: theme.palette.surface }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      transition={{ delay: 1, duration: 1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div
              className="mt-6 rounded-xl p-4"
              style={{
                backgroundColor: withAlpha(theme.palette.bg, 50),
                border: `1px solid ${theme.palette.surfaceLight}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm" style={{ color: theme.palette.muted }}>
                  Analytics Overview
                </span>
                <div className="flex gap-2">
                  {["7D", "1M", "1Y"].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 text-xs rounded-lg hover:text-white transition-colors"
                      style={{
                        backgroundColor: theme.palette.surface,
                        color: theme.palette.muted,
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              {/* Animated chart bars */}
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 1.2 + i * 0.05, duration: 0.5 }}
                    className="flex-1 rounded-t-sm"
                    style={{
                      background: `linear-gradient(to top, ${theme.palette.accent}, ${theme.palette.accentTertiary})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl -z-10"
            style={{
              background: `linear-gradient(to right, ${withAlpha(theme.palette.accent, 20)}, ${withAlpha(theme.palette.accentSecondary, 10)}, ${withAlpha(theme.palette.accentTertiary, 20)})`,
            }}
          />
        </motion.div>

        {/* Trusted by logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 text-center"
        >
          <p
            className="text-sm mb-6"
            style={{ fontFamily: theme.fonts.body, color: withAlpha(theme.palette.muted, 70) }}
          >
            {c.trustedByLabel}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {c.trustedByBrands.map((company) => (
              <span
                key={company}
                className="text-xl font-bold"
                style={{ fontFamily: theme.fonts.display, color: withAlpha(theme.palette.muted, 70) }}
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
