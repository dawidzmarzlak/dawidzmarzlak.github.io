"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function ArchitecturePhilosophy() {
  const t = useTranslations("showcase.architecture-studio");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const statements = [
    t("philosophy.statement1"),
    t("philosophy.statement2"),
    t("philosophy.statement3"),
  ];

  return (
    <section ref={ref} className="py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-[#FF4D00]" />
            <span
              className="text-sm tracking-[0.3em] uppercase text-white/50"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("philosophy.title")}
            </span>
            <div className="w-12 h-px bg-[#FF4D00]" />
          </div>

          <div className="space-y-8">
            {statements.map((statement, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="text-3xl md:text-5xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {statement}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
