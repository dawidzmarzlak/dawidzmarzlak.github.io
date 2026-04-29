"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { featured: false, color: "#18181B" },
  { featured: true, color: "#FACC15" },
  { featured: false, color: "#18181B" },
];

export function CoworkingPricing() {
  const t = useTranslations("showcase.coworking-space");

  return (
    <section className="py-24 bg-[#18181B]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("pricing.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                plan.featured
                  ? "bg-[#FACC15] text-[#18181B]"
                  : "bg-[#27272A] text-white"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#18181B] text-white text-sm font-bold rounded-full">
                  {t("pricing.popular")}
                </div>
              )}

              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t(`pricing.plans.${index}.name`)}
              </h3>
              <p
                className={`text-sm mb-6 ${plan.featured ? "text-[#18181B]/70" : "text-gray-400"}`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(`pricing.plans.${index}.description`)}
              </p>

              <div className="mb-6">
                <span
                  className="text-5xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t(`pricing.plans.${index}.price`)}
                </span>
                <span
                  className={`text-sm ${plan.featured ? "text-[#18181B]/70" : "text-gray-400"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  /{t("pricing.perMonth")}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.featured ? "bg-[#18181B]" : "bg-[#FACC15]"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${plan.featured ? "text-[#FACC15]" : "text-[#18181B]"}`}
                      />
                    </div>
                    <span style={{ fontFamily: "var(--font-inter)" }}>
                      {t(`pricing.plans.${index}.features.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 font-bold ${
                  plan.featured
                    ? "bg-[#18181B] text-white hover:bg-[#27272A]"
                    : "bg-[#FACC15] text-[#18181B] hover:bg-[#EAB308]"
                }`}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t("pricing.cta")}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
