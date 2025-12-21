"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const steps = ["concept", "design", "development", "delivery"] as const;

export function ArchitectureProcess() {
  const t = useTranslations("showcase.architecture-studio");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-px bg-[#FF4D00]" />
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("process.title")}
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-px bg-black/10">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 group hover:bg-black transition-colors"
            >
              <div className="mb-8">
                <span
                  className="text-6xl font-bold text-black/10 group-hover:text-[#FF4D00] transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  0{index + 1}
                </span>
              </div>

              <h3
                className="text-xl font-bold mb-4 group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t(`process.steps.${step}.title`)}
              </h3>

              <p
                className="text-black/60 group-hover:text-white/70 transition-colors"
                style={{ fontFamily: "var(--font-ibm-plex)" }}
              >
                {t(`process.steps.${step}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
