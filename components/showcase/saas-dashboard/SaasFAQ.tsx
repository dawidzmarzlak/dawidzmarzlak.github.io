"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent } from "@/lib/showcase/saas-dashboard/template.config";

export function SaasFAQ() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["faq"]>("faq");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ backgroundColor: withAlpha(theme.palette.accentTertiary, 10) }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{
              backgroundColor: withAlpha(theme.palette.accent, 10),
              border: `1px solid ${withAlpha(theme.palette.accent, 20)}`,
            }}
          >
            <HelpCircle className="w-8 h-8" style={{ color: theme.palette.accent }} />
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

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {c.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Accordion.Item
                  value={item.id}
                  className="backdrop-blur-sm rounded-xl overflow-hidden group data-[state=open]:border-opacity-50 transition-colors"
                  style={{
                    backgroundColor: withAlpha(theme.palette.surface, 50),
                    border: `1px solid ${theme.palette.surfaceLight}`,
                  }}
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className="w-full flex items-center justify-between p-6 text-left transition-colors group"
                      style={{ fontFamily: theme.fonts.display }}
                    >
                      <span
                        className="text-lg font-medium pr-4 group-data-[state=open]:opacity-80 transition-opacity"
                        style={{ color: theme.palette.fg }}
                      >
                        {item.question}
                      </span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-data-[state=open]:opacity-80 transition-all"
                        style={{
                          backgroundColor: theme.palette.bg,
                          border: `1px solid ${theme.palette.surfaceLight}`,
                        }}
                      >
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
                          style={{ color: theme.palette.accent }}
                        />
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="px-6 pb-6">
                      <p
                        className="leading-relaxed"
                        style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center p-8 rounded-2xl"
          style={{
            background: `linear-gradient(to right, ${withAlpha(theme.palette.accent, 10)}, ${withAlpha(theme.palette.accentSecondary, 10)}, ${withAlpha(theme.palette.accentTertiary, 10)})`,
            border: `1px solid ${theme.palette.surfaceLight}`,
          }}
        >
          <MessageCircle className="w-10 h-10 mx-auto mb-4" style={{ color: theme.palette.accent }} />
          <p
            className="mb-4"
            style={{ fontFamily: theme.fonts.body, color: theme.palette.fg }}
          >
            {c.contactPrompt}
          </p>
          <Button
            className="text-white font-medium px-8 py-6 rounded-xl hover:opacity-90 transition-opacity"
            style={{
              fontFamily: theme.fonts.body,
              background: `linear-gradient(to right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`,
            }}
          >
            {c.contactButton}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
