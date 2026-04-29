"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Leaf, Recycle, Award, Globe } from "lucide-react";

const milestones = [
  { year: "2020", icon: Leaf, color: "#166534" },
  { year: "2021", icon: Recycle, color: "#D97706" },
  { year: "2023", icon: Award, color: "#0D9488" },
  { year: "2024", icon: Globe, color: "#166534" },
];

export function EcoTimeline() {
  const t = useTranslations("showcase.eco-brand");

  return (
    <section className="py-24 bg-[#ECFCCB]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-[#1C1917] mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {t("timeline.title")}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("timeline.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#166534]/20 hidden md:block" />

            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                  >
                    <div
                      className={`inline-block p-6 bg-white rounded-3xl shadow-lg ${
                        isLeft ? "md:ml-auto" : "md:mr-auto"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${milestone.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: milestone.color }} />
                        </div>
                        <span
                          className="text-2xl font-bold"
                          style={{ color: milestone.color, fontFamily: "var(--font-fraunces)" }}
                        >
                          {milestone.year}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold text-[#1C1917] mb-2"
                        style={{ fontFamily: "var(--font-fraunces)" }}
                      >
                        {t(`timeline.milestones.${index}.title`)}
                      </h3>
                      <p
                        className="text-gray-600"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {t(`timeline.milestones.${index}.description`)}
                      </p>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 items-center justify-center z-10"
                    style={{ borderColor: milestone.color }}
                  >
                    <Icon className="w-5 h-5" style={{ color: milestone.color }} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
