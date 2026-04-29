"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title: string;
  subtitle?: string;
  items: FAQItem[];
  theme?: "light" | "dark";
  accentColor?: string;
  className?: string;
}

export function FAQAccordion({
  title,
  subtitle,
  items,
  theme = "light",
  accentColor = "#3B82F6",
  className = "",
}: FAQAccordionProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`py-24 ${isDark ? "bg-[#0A0A0A]" : "bg-white"} ${className}`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className={`border-b ${
                    isDark ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <AccordionTrigger
                    className={`text-left text-lg font-medium py-6 hover:no-underline group ${
                      isDark
                        ? "text-white hover:text-gray-300"
                        : "text-gray-900 hover:text-gray-700"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        {index + 1}
                      </span>
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className={`text-base leading-relaxed pl-12 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
