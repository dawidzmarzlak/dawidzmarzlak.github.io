"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { FashionStoreContent } from "@/lib/showcase/fashion-store/template.config";

export function FashionNewsletter() {
  const theme = useTheme();
  const c = useContent<FashionStoreContent["newsletter"]>("newsletter");

  return (
    <section className="py-24" style={{ backgroundColor: theme.palette.fg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.surface }}
          >
            {c.title}
          </h2>
          <p
            className="text-base mb-8"
            style={{ fontFamily: theme.fonts.body, color: theme.palette.mutedLight }}
          >
            {c.description}
          </p>

          {/* Newsletter form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={c.placeholder}
              className="flex-1 px-6 py-4 focus:outline-none"
              style={{
                fontFamily: theme.fonts.body,
                backgroundColor: withAlpha(theme.palette.surface, 5),
                border: `1px solid ${withAlpha(theme.palette.surface, 20)}`,
                color: theme.palette.surface,
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = theme.palette.accent;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = withAlpha(
                  theme.palette.surface,
                  20,
                );
              }}
            />
            <Button
              className="font-normal px-8 py-4 text-sm tracking-wider uppercase transition-colors"
              style={{
                fontFamily: theme.fonts.body,
                backgroundColor: theme.palette.surface,
                color: theme.palette.fg,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.palette.accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  theme.palette.surface;
              }}
            >
              {c.button}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
