"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, Brain, Blocks, Shield } from "lucide-react";

const features = [
  { key: "realtime", icon: Activity },
  { key: "ai", icon: Brain },
  { key: "integrations", icon: Blocks },
  { key: "security", icon: Shield },
];

export function SaasFeatures() {
  const t = useTranslations("showcase.saas-dashboard.features");

  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl border border-[#334155] p-8 hover:border-[#6366F1]/50 transition-all duration-300">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/5 to-[#06B6D4]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3
                    className="relative text-xl font-semibold text-white mb-3"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  >
                    {t(`${feature.key}.title`)}
                  </h3>
                  <p
                    className="relative text-[#94A3B8] leading-relaxed"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {t(`${feature.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
