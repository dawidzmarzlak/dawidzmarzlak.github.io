"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqItems = [
  { id: "faq1" },
  { id: "faq2" },
  { id: "faq3" },
  { id: "faq4" },
  { id: "faq5" },
  { id: "faq6" },
];

export function SaasFAQ() {
  const t = useTranslations("showcase.saas-dashboard.faq");

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/20 mb-6">
            <HelpCircle className="w-8 h-8 text-[#6366F1]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("subtitle")}
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
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Accordion.Item
                  value={item.id}
                  className="bg-[#1E293B]/50 backdrop-blur-sm border border-[#334155] rounded-xl overflow-hidden group data-[state=open]:border-[#6366F1]/50 transition-colors"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1E293B] transition-colors group">
                      <span
                        className="text-lg font-medium text-white group-data-[state=open]:text-[#6366F1] transition-colors pr-4"
                        style={{ fontFamily: "var(--font-urbanist)" }}
                      >
                        {t(`items.${item.id}.question`)}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-[#6366F1] group-data-[state=open]:border-[#6366F1] transition-all">
                        <ChevronDown className="w-4 h-4 text-[#6366F1] group-data-[state=open]:text-white transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="px-6 pb-6">
                      <p
                        className="text-[#94A3B8] leading-relaxed"
                        style={{ fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        {t(`items.${item.id}.answer`)}
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
          className="mt-12 text-center p-8 bg-gradient-to-r from-[#6366F1]/10 via-[#8B5CF6]/10 to-[#06B6D4]/10 rounded-2xl border border-[#334155]"
        >
          <MessageCircle className="w-10 h-10 text-[#6366F1] mx-auto mb-4" />
          <p
            className="text-white mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("contactPrompt")}
          </p>
          <Button
            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C4FE8] text-white font-medium px-8 py-6 rounded-xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("contactButton")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
