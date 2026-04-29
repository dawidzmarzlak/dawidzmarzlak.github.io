"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";

export function EstateHero() {
  const t = useTranslations("showcase.real-estate");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-screen bg-[#0C1E3C] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C1E3C] via-[#0C1E3C]/90 to-[#1E3A5F]" />
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-[#C5A572]/10 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 border border-[#C5A572]/10 rounded-full" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full py-32">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-[#C5A572]" />
              <span
                className="text-[#C5A572] text-sm tracking-wider uppercase"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {t("brandName")}
              </span>
            </motion.div>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-white/60 max-w-md mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#C5A572] hover:bg-[#B8954F] text-[#0C1E3C] font-semibold px-8 py-6 text-base rounded-lg group"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-lg"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <Phone className="w-4 h-4 mr-2" />
                {t("hero.ctaSecondary")}
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-12 mt-16 pt-8 border-t border-white/10"
            >
              {[
                { value: "15+", label: t("about.experience").split(" ")[0] },
                { value: "500+", label: t("about.properties").split(" ")[0] },
                { value: "1000+", label: t("about.clients").split(" ")[0] },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl font-semibold text-[#C5A572] mb-1"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-sm text-white/40"
                    style={{ fontFamily: "var(--font-source-sans)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Property card preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main property card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/showcase/real-estate/hero.jpg"
                    alt="Featured Property"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4 z-10 bg-[#C5A572] text-white text-xs font-medium px-3 py-1 rounded">
                    {t("properties.featured")}
                  </div>
                </div>

                {/* Property info */}
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-[#0C1E3C] mb-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Penthouse Marina Bay
                  </h3>
                  <p
                    className="text-sm text-[#0C1E3C]/60 mb-4"
                    style={{ fontFamily: "var(--font-source-sans)" }}
                  >
                    Downtown, City Center
                  </p>

                  {/* Features */}
                  <div className="flex gap-4 text-sm text-[#0C1E3C]/60 mb-4">
                    <span>4 {t("properties.bedrooms")}</span>
                    <span>•</span>
                    <span>3 {t("properties.bathrooms")}</span>
                    <span>•</span>
                    <span>280 m²</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-2xl font-bold text-[#0C1E3C]"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      $2,450,000
                    </span>
                    <Button
                      size="sm"
                      className="bg-[#0C1E3C] hover:bg-[#1E3A5F] text-white"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {t("properties.viewDetails")}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating element */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-[#0C1E3C] border border-[#C5A572]/30 rounded-xl p-4 shadow-xl"
              >
                <p className="text-[#C5A572] text-sm font-medium" style={{ fontFamily: "var(--font-poppins)" }}>
                  New Listing
                </p>
                <p className="text-white/60 text-xs mt-1" style={{ fontFamily: "var(--font-source-sans)" }}>
                  Just added today
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
