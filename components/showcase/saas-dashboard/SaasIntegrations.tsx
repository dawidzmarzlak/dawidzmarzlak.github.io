"use client";

import { motion } from "framer-motion";
import { Zap, Check } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent } from "@/lib/showcase/saas-dashboard/template.config";

export function SaasIntegrations() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["integrations"]>("integrations");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: withAlpha(theme.palette.surface, 30) }}
    >
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ backgroundColor: withAlpha(theme.palette.accentSecondary, 10) }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: withAlpha(theme.palette.accent, 10),
              border: `1px solid ${withAlpha(theme.palette.accent, 20)}`,
            }}
          >
            <Zap className="w-4 h-4" style={{ color: theme.palette.accent }} />
            <span
              className="text-sm"
              style={{ fontFamily: theme.fonts.body, color: theme.palette.accent }}
            >
              {c.badge}
            </span>
          </div>
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

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {c.items.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative backdrop-blur-sm rounded-xl p-6 transition-all duration-300 group cursor-pointer"
              style={{
                backgroundColor: withAlpha(theme.palette.bg, 80),
                border: `1px solid ${theme.palette.surfaceLight}`,
              }}
            >
              {/* Icon placeholder */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all"
                style={{
                  background: `linear-gradient(to bottom right, ${withAlpha(theme.palette.accent, 20)}, ${withAlpha(theme.palette.accentTertiary, 20)})`,
                }}
              >
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: theme.fonts.display, color: theme.palette.accent }}
                >
                  {integration.name.charAt(0)}
                </span>
              </div>

              <h3
                className="font-medium mb-1 transition-colors group-hover:opacity-80"
                style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
              >
                {integration.name}
              </h3>
              <p
                className="text-xs capitalize"
                style={{ fontFamily: theme.fonts.body, color: withAlpha(theme.palette.muted, 70) }}
              >
                {integration.category}
              </p>

              {/* Check icon on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Check className="w-4 h-4 text-[#22C55E]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p
            style={{ fontFamily: theme.fonts.body, color: withAlpha(theme.palette.muted, 70) }}
          >
            {c.moreText}{" "}
            <span
              className="cursor-pointer hover:underline"
              style={{ color: theme.palette.accent }}
            >
              {c.viewAllCta}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
