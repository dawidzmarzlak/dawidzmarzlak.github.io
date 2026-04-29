"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb, Pencil, Rocket } from "lucide-react";

const steps = [
  {
    key: "discover",
    icon: Lightbulb,
    color: "#FF6B6B",
    number: "01"
  },
  {
    key: "create",
    icon: Pencil,
    color: "#4ECDC4",
    number: "02"
  },
  {
    key: "launch",
    icon: Rocket,
    color: "#FFE66D",
    number: "03"
  },
];

export function AgencyProcess() {
  const t = useTranslations("showcase.creative-agency.process");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] -translate-y-1/2 hidden lg:block" />

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Card */}
                  <div className="bg-[#FFF8E7] rounded-2xl p-8 relative z-10">
                    {/* Number */}
                    <div className="absolute -top-6 -right-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                        style={{
                          backgroundColor: step.color,
                          fontFamily: "var(--font-space-grotesk)"
                        }}
                      >
                        {step.number}
                      </motion.div>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -5 }}
                      className="w-20 h-20 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <Icon className="w-10 h-10" style={{ color: step.color }} />
                    </motion.div>

                    {/* Content */}
                    <h3
                      className="text-2xl font-bold text-[#1A1A2E] mb-3"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p
                      className="text-base text-[#1A1A2E]/70 leading-relaxed"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>

                  {/* Decorative arrow (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-20 -translate-y-1/2">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke={step.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
