"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function FashionHero() {
  const t = useTranslations("showcase.fashion-store");

  return (
    <section className="relative min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <div className="flex items-center justify-center px-8 lg:px-16 py-32 lg:py-0 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm tracking-[0.3em] text-[#8B7355] uppercase mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t("brandName")}
            </motion.p>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light text-[#0A0A0A] mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p
              className="text-base text-[#666666] mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white font-normal px-8 py-6 text-sm tracking-wider uppercase"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white px-8 py-6 text-sm tracking-wider uppercase"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {t("hero.ctaSecondary")}
              </Button>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 pt-12 border-t border-[#E5E5E5]"
            >
              {[t("about.craftsmanship"), t("about.sustainable"), t("about.exclusive")].map((feature) => (
                <div key={feature} className="text-center">
                  <p
                    className="text-xs tracking-wider text-[#666666] uppercase"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative order-1 lg:order-2 min-h-[60vh] lg:min-h-screen"
        >
          <Image
            src="/showcase/fashion-store/hero.jpg"
            alt="Fashion Collection"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Season badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4"
          >
            <p
              className="text-xs tracking-[0.2em] text-[#666666] uppercase mb-1"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t("collections.spring")}
            </p>
            <p
              className="text-sm font-light text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("collections.viewCollection")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
