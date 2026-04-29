"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = ["membership", "classes", "trainers", "schedule", "equipment", "parking"];

export function FitnessFAQ() {
  const t = useTranslations("showcase.fitness-studio.faq");

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-normal text-white mb-4 uppercase tracking-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#666666]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={item}
                  className="border-b border-[#333333] hover:border-[#CCFF00] transition-colors"
                >
                  <AccordionTrigger className="py-6 hover:no-underline group text-left">
                    <span className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-10 h-10 bg-[#CCFF00]/10 flex items-center justify-center group-hover:bg-[#CCFF00] transition-colors">
                        <HelpCircle className="w-5 h-5 text-[#CCFF00] group-hover:text-[#0A0A0A] transition-colors" />
                      </span>
                      <span
                        className="text-lg text-white group-hover:text-[#CCFF00] transition-colors uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-bebas)" }}
                      >
                        {t(`items.${item}.question`)}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-14">
                    <p
                      className="text-[#999999] leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {t(`items.${item}.answer`)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p
            className="text-[#666666] mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("moreQuestions")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#CCFF00] hover:underline uppercase tracking-wider"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {t("contactUs")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
