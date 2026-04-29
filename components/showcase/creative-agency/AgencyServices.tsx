"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Palette, Globe, Play, Megaphone } from "lucide-react";

const services = [
  { key: "branding", icon: Palette, color: "#FF6B6B" },
  { key: "web", icon: Globe, color: "#4ECDC4" },
  { key: "motion", icon: Play, color: "#FFE66D" },
  { key: "marketing", icon: Megaphone, color: "#1A1A2E" },
];

export function AgencyServices() {
  const t = useTranslations("showcase.creative-agency.services");

  return (
    <section className="py-24 bg-[#1A1A2E]">
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
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-white/60"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: service.color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-semibold text-white mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t(`${service.key}.name`)}
                </h3>
                <p
                  className="text-sm text-white/60 leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
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
