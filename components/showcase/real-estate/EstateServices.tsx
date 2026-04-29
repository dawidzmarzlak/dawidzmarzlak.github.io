"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Home, DollarSign, TrendingUp } from "lucide-react";

const services = [
  { key: "buying", icon: Home },
  { key: "selling", icon: DollarSign },
  { key: "investment", icon: TrendingUp },
];

export function EstateServices() {
  const t = useTranslations("showcase.real-estate.services");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-semibold text-[#0C1E3C] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center p-8 rounded-2xl border border-[#E5E5E5] hover:border-[#C5A572] hover:shadow-lg transition-all"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0C1E3C] flex items-center justify-center group-hover:bg-[#C5A572] transition-colors">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-semibold text-[#0C1E3C] mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {t(`${service.key}.title`)}
                </h3>
                <p
                  className="text-sm text-[#0C1E3C]/60 leading-relaxed"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  {t(`${service.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
