"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Blocks, Shield } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent, SaasFeature } from "@/lib/showcase/saas-dashboard/template.config";

const FEATURE_ICONS: Record<SaasFeature["iconName"], React.ComponentType<{ className?: string }>> = {
  Activity,
  Brain,
  Blocks,
  Shield,
};

export function SaasFeatures() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["features"]>("features");

  return (
    <section
      className="py-24"
      style={{ backgroundColor: theme.palette.bg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {c.items.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.iconName];
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className="relative backdrop-blur-sm rounded-2xl p-8 hover:border-opacity-50 transition-all duration-300"
                  style={{
                    backgroundColor: withAlpha(theme.palette.surface, 50),
                    border: `1px solid ${theme.palette.surfaceLight}`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(to right, ${withAlpha(theme.palette.accent, 5)}, ${withAlpha(theme.palette.accentTertiary, 5)})`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(to right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`,
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3
                    className="relative text-xl font-semibold mb-3"
                    style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="relative leading-relaxed"
                    style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
