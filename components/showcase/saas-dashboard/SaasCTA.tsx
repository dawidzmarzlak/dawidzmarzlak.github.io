"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent } from "@/lib/showcase/saas-dashboard/template.config";

export function SaasCTA() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["cta"]>("cta");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(to bottom right, ${withAlpha(theme.palette.accent, 10)}, transparent, ${withAlpha(theme.palette.accentTertiary, 10)})`,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl rounded-3xl p-12"
          style={{
            background: `linear-gradient(to right, ${withAlpha(theme.palette.surface, 80)}, ${withAlpha(theme.palette.surface, 50)})`,
            border: `1px solid ${theme.palette.surfaceLight}`,
          }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
          >
            {c.description}
          </p>
          <Button
            size="lg"
            className="text-white font-semibold px-8 py-6 text-base rounded-xl group hover:opacity-90 transition-opacity"
            style={{
              fontFamily: theme.fonts.body,
              background: `linear-gradient(to right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`,
            }}
          >
            {c.button}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
