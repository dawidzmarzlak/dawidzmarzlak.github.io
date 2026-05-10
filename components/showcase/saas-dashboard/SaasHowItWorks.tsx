"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Upload, Zap, BarChart3 } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent, SaasStep } from "@/lib/showcase/saas-dashboard/template.config";

const STEP_ICONS: Record<SaasStep["iconName"], React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Upload,
  Zap,
  BarChart3,
};

export function SaasHowItWorks() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["howItWorks"]>("howItWorks");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ backgroundColor: withAlpha(theme.palette.accentTertiary, 10) }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
          >
            {c.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5">
            <div className="relative h-full max-w-5xl mx-auto px-24">
              <div
                className="h-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${withAlpha(theme.palette.accent, 30)}, transparent)`,
                }}
              />
            </div>
          </div>

          {c.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.iconName];
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div
                  className="backdrop-blur-sm rounded-2xl p-8 text-center transition-all duration-300 group"
                  style={{
                    backgroundColor: withAlpha(theme.palette.surface, 50),
                    border: `1px solid ${theme.palette.surfaceLight}`,
                  }}
                >
                  {/* Step number with glassmorphism */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Outer glow */}
                    <div
                      className="absolute w-24 h-24 rounded-full blur-xl group-hover:scale-110 transition-transform"
                      style={{
                        background: `linear-gradient(to right, ${withAlpha(theme.palette.accent, 20)}, ${withAlpha(theme.palette.accentTertiary, 20)})`,
                      }}
                    />

                    {/* Number circle */}
                    <div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`,
                        border: `4px solid ${theme.palette.bg}`,
                      }}
                    >
                      <span
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: theme.fonts.display }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: withAlpha(theme.palette.bg, 50),
                        border: `1px solid ${theme.palette.surfaceLight}`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: theme.palette.accent }} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p
            className="text-sm"
            style={{ fontFamily: theme.fonts.body, color: withAlpha(theme.palette.muted, 70) }}
          >
            {c.bottomText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
