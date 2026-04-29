"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Building2,
  Users,
  Briefcase,
  FileText,
  Home,
  Shield,
  ArrowRight,
} from "lucide-react";

const areas = [
  { icon: Building2, color: "#1E3A5F" },
  { icon: Users, color: "#C9A227" },
  { icon: Briefcase, color: "#1E3A5F" },
  { icon: FileText, color: "#C9A227" },
  { icon: Home, color: "#1E3A5F" },
  { icon: Shield, color: "#C9A227" },
];

export function LawPracticeAreas() {
  const t = useTranslations("showcase.law-firm");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-4"
            style={{ fontFamily: "var(--font-crimson-pro)" }}
          >
            {t("areas.title")}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            {t("areas.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-[#FAFBFC] hover:bg-white rounded-lg border border-gray-100 hover:border-[#C9A227] hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-colors"
                  style={{ backgroundColor: `${area.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: area.color }} />
                </div>
                <h3
                  className="text-xl font-bold text-[#1E3A5F] mb-3"
                  style={{ fontFamily: "var(--font-crimson-pro)" }}
                >
                  {t(`areas.items.${index}.title`)}
                </h3>
                <p
                  className="text-gray-600 mb-4"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  {t(`areas.items.${index}.description`)}
                </p>
                <div className="flex items-center gap-2 text-[#C9A227] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span style={{ fontFamily: "var(--font-source-serif)" }}>
                    {t("areas.learnMore")}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
