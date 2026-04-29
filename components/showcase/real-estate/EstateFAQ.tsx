"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  { id: "faq1" },
  { id: "faq2" },
  { id: "faq3" },
  { id: "faq4" },
  { id: "faq5" },
  { id: "faq6" },
];

export function EstateFAQ() {
  const t = useTranslations("showcase.real-estate.faq");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C5A572]/10 mb-6">
            <HelpCircle className="w-8 h-8 text-[#C5A572]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-semibold text-[#0C1E3C] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#0C1E3C]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-source-sans)" }}
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
                  className="border border-[#E5E5E5] rounded-xl overflow-hidden group data-[state=open]:border-[#C5A572]/50 transition-colors"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F8F6F3] transition-colors group">
                      <div className="flex items-center gap-4">
                        <span
                          className="text-sm font-medium text-[#C5A572]"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-lg font-medium text-[#0C1E3C] group-data-[state=open]:text-[#C5A572] transition-colors"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {t(`items.${item.id}.question`)}
                        </span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-[#C5A572] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="px-6 pb-6 pl-16">
                      <p
                        className="text-[#0C1E3C]/70 leading-relaxed"
                        style={{ fontFamily: "var(--font-source-sans)" }}
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
          className="mt-12 text-center p-8 bg-[#0C1E3C] rounded-2xl"
        >
          <p
            className="text-white/80 mb-4"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            {t("contactPrompt")}
          </p>
          <button
            className="px-8 py-3 bg-[#C5A572] hover:bg-[#B8954F] text-[#0C1E3C] font-semibold rounded-lg transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("contactButton")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
