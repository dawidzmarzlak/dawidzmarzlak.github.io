"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = ["basic", "pro", "elite"];

export function FitnessMembership() {
  const t = useTranslations("showcase.fitness-studio.membership");

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#CCFF00]/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className={`relative p-8 ${
                  isPro
                    ? "bg-[#CCFF00] text-[#0A0A0A]"
                    : "bg-[#1A1A1A] text-white border border-[#333333]"
                }`}
              >
                {/* Popular badge */}
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-[#CCFF00] px-4 py-1">
                    <span className="text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-bebas)" }}>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3
                  className="text-3xl uppercase tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {t(`${plan}.name`)}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {t(`${plan}.price`)}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${isPro ? "text-[#0A0A0A]" : "text-[#CCFF00]"}`} />
                      <span
                        className={`text-sm ${isPro ? "text-[#0A0A0A]/80" : "text-[#999999]"}`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full py-6 font-bold text-sm tracking-wider uppercase ${
                    isPro
                      ? "bg-[#0A0A0A] hover:bg-[#1A1A1A] text-[#CCFF00]"
                      : "bg-[#CCFF00] hover:bg-[#B8E600] text-[#0A0A0A]"
                  }`}
                  style={{ fontFamily: "var(--font-bebas)" }}
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
