"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Clock, Zap } from "lucide-react";

const classes = ["hiit", "strength", "yoga", "cycling"];

export function FitnessClasses() {
  const t = useTranslations("showcase.fitness-studio.classes");

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Classes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((classKey, index) => (
            <motion.div
              key={classKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#1A1A1A] border border-[#333333] hover:border-[#CCFF00] transition-colors p-8"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#CCFF00]/0 group-hover:border-[#CCFF00] transition-colors" />

              {/* Class name */}
              <h3
                className="text-3xl text-white mb-2 uppercase tracking-tight"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t(`${classKey}.name`)}
              </h3>

              {/* Description */}
              <p
                className="text-sm text-[#999999] mb-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(`${classKey}.description`)}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-[#666666]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {t(`${classKey}.duration`)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#666666]">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {t(`${classKey}.level`)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                className="bg-transparent hover:bg-[#CCFF00] text-[#CCFF00] hover:text-[#0A0A0A] border border-[#CCFF00] font-bold px-6 py-2 text-sm tracking-wider uppercase"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("bookClass")}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
