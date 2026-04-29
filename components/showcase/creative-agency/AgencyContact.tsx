"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AgencyContact() {
  const t = useTranslations("showcase.creative-agency.contact");

  return (
    <section className="py-24 bg-[#FFF8E7] relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ x: -100 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        className="absolute top-1/2 -left-20 w-40 h-40 bg-[#4ECDC4] rounded-full -translate-y-1/2"
      />
      <motion.div
        initial={{ x: 100 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        className="absolute top-1/3 -right-10 w-24 h-24 bg-[#FF6B6B]"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-[#1A1A2E] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg text-[#1A1A2E]/60 mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("description")}
          </p>
          <Button
            size="lg"
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold px-10 py-6 text-base rounded-full group"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
