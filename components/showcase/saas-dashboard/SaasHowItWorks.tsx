"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Upload, Zap, BarChart3 } from "lucide-react";

const steps = [
  { key: "connect", icon: Upload, number: 1 },
  { key: "analyze", icon: Zap, number: 2 },
  { key: "insights", icon: BarChart3, number: 3 },
];

export function SaasHowItWorks() {
  const t = useTranslations("showcase.saas-dashboard.howItWorks");

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
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

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5">
            <div className="relative h-full max-w-5xl mx-auto px-24">
              <div className="h-full bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent" />
            </div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl border border-[#334155] p-8 text-center hover:border-[#6366F1]/50 transition-all duration-300 group">
                  {/* Step number with glassmorphism */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Outer glow */}
                    <div className="absolute w-24 h-24 bg-gradient-to-r from-[#6366F1]/20 to-[#06B6D4]/20 rounded-full blur-xl group-hover:scale-110 transition-transform" />

                    {/* Number circle */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center border-4 border-[#0F172A]">
                      <span
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: "var(--font-urbanist)" }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#0F172A]/50 border border-[#334155] flex items-center justify-center group-hover:border-[#6366F1]/50 transition-colors">
                      <Icon className="w-7 h-7 text-[#6366F1]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-semibold text-white mb-3"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  >
                    {t(`${step.key}.title`)}
                  </h3>
                  <p
                    className="text-[#94A3B8] leading-relaxed"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {t(`${step.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p
            className="text-sm text-[#64748B]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("bottomText")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
