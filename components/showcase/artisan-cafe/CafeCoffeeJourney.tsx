"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Sprout, Flame, Coffee, ArrowRight } from "lucide-react";

const journeySteps = [
  {
    key: "origin",
    icon: Sprout,
    color: "#6B7B3C"
  },
  {
    key: "roasting",
    icon: Flame,
    color: "#C65D3B"
  },
  {
    key: "brewing",
    icon: Coffee,
    color: "#5C4033"
  },
];

export function CafeCoffeeJourney() {
  const t = useTranslations("showcase.artisan-cafe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-normal text-[#5C4033] mb-4"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            {t("coffeeJourney.title")}
          </h2>
          <p
            className="text-2xl text-[#C65D3B]"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {t("coffeeJourney.subtitle")}
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E8DFD0] -translate-y-1/2 hidden md:block" />

          {/* Progress line */}
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-[#C65D3B] -translate-y-1/2 hidden md:block"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === journeySteps.length - 1;

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="relative"
                >
                  {/* Connector arrow (desktop only) */}
                  {!isLast && (
                    <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 1 + index * 0.3 }}
                      >
                        <ArrowRight className="w-6 h-6 text-[#C65D3B]" />
                      </motion.div>
                    </div>
                  )}

                  {/* Step card */}
                  <div className="bg-[#FFF8F0] rounded-2xl p-8 text-center relative z-20">
                    {/* Icon circle */}
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: step.color }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Step number */}
                    <div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-caveat)",
                        color: step.color
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl font-normal mb-4"
                      style={{
                        fontFamily: "var(--font-dm-serif)",
                        color: step.color
                      }}
                    >
                      {t(`coffeeJourney.steps.${step.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[#5C4033]/70 leading-relaxed"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {t(`coffeeJourney.steps.${step.key}.description`)}
                    </p>

                    {/* Decorative coffee bean dots */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#C65D3B]/30"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <p
            className="text-xl text-[#5C4033]/60"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {t("coffeeJourney.tagline")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
