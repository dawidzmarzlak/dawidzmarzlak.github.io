"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent } from "@/lib/showcase/saas-dashboard/template.config";

export function SaasPricing() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["pricing"]>("pricing");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
        style={{ backgroundColor: withAlpha(theme.palette.accent, 5) }}
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

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.tiers.map((tier, index) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl backdrop-blur-sm p-8"
              style={
                tier.featured
                  ? {
                      background: `linear-gradient(to bottom, ${withAlpha(theme.palette.accent, 20)}, ${withAlpha(theme.palette.surface, 50)})`,
                      border: `1px solid ${withAlpha(theme.palette.accent, 50)}`,
                    }
                  : {
                      backgroundColor: withAlpha(theme.palette.surface, 50),
                      border: `1px solid ${theme.palette.surfaceLight}`,
                    }
              }
            >
              {/* Popular badge */}
              {tier.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`,
                  }}
                >
                  <span className="text-xs font-semibold text-white">{c.popularBadge}</span>
                </div>
              )}

              {/* Plan info */}
              <div className="mb-8">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
                >
                  {tier.name}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
                >
                  {tier.description}
                </p>
                <div className="flex items-end gap-1">
                  <span
                    className="text-4xl font-bold"
                    style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
                  >
                    {tier.price}
                  </span>
                  {tier.priceUnit && (
                    <span className="mb-1" style={{ color: theme.palette.muted }}>
                      /{tier.priceUnit}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: tier.featured
                          ? theme.palette.accent
                          : theme.palette.surfaceLight,
                      }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span
                      className="text-sm"
                      style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className="w-full py-6 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                style={
                  tier.featured
                    ? {
                        fontFamily: theme.fonts.body,
                        background: `linear-gradient(to right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`,
                        color: theme.palette.fg,
                      }
                    : {
                        fontFamily: theme.fonts.body,
                        backgroundColor: theme.palette.surface,
                        color: theme.palette.fg,
                        border: `1px solid ${theme.palette.surfaceLight}`,
                      }
                }
              >
                {tier.ctaLabel}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
