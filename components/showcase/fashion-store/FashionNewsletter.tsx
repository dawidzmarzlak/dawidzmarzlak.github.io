"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FashionNewsletter() {
  const t = useTranslations("showcase.fashion-store.newsletter");

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-light text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#999999] mb-8"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {t("description")}
          </p>

          {/* Newsletter form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("placeholder")}
              className="flex-1 px-6 py-4 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A5A5]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            />
            <Button
              className="bg-white hover:bg-[#D4A5A5] text-[#0A0A0A] font-normal px-8 py-4 text-sm tracking-wider uppercase"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t("button")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
