"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = ["starter", "pro", "enterprise"];

export function SaasPricing() {
  const t = useTranslations("showcase.saas-dashboard.pricing");

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6366F1]/5 rounded-full blur-[150px]" />

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

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isPro = plan === "pro";
            const features = t.raw(`${plan}.features`) as string[];

            return (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl ${
                  isPro
                    ? "bg-gradient-to-b from-[#6366F1]/20 to-[#1E293B]/50 border-[#6366F1]/50"
                    : "bg-[#1E293B]/50 border-[#334155]"
                } border backdrop-blur-sm p-8`}
              >
                {/* Popular badge */}
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full">
                    <span className="text-xs font-semibold text-white">Popular</span>
                  </div>
                )}

                {/* Plan info */}
                <div className="mb-8">
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  >
                    {t(`${plan}.name`)}
                  </h3>
                  <p
                    className="text-sm text-[#94A3B8] mb-4"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {t(`${plan}.description`)}
                  </p>
                  <div className="flex items-end gap-1">
                    <span
                      className="text-4xl font-bold text-white"
                      style={{ fontFamily: "var(--font-urbanist)" }}
                    >
                      {t(`${plan}.price`)}
                    </span>
                    {plan !== "enterprise" && (
                      <span className="text-[#94A3B8] mb-1">/{t("monthly").toLowerCase()}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isPro ? "bg-[#6366F1]" : "bg-[#334155]"
                      }`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span
                        className="text-[#CBD5E1] text-sm"
                        style={{ fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full py-6 rounded-xl font-semibold ${
                    isPro
                      ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C4FE8] text-white"
                      : "bg-[#1E293B] hover:bg-[#334155] text-white border border-[#334155]"
                  }`}
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {t("cta")}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
