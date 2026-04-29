"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Leaf, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

export function EcoHero() {
  const t = useTranslations("showcase.eco-brand");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FEFDF8]">
      {/* Organic shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#166534]/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#D97706]/10"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        {/* Floating leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🌿
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#166534]/10 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-[#166534]" />
              <span
                className="text-sm text-[#166534] font-medium"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {t("hero.badge")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl font-bold text-[#1C1917] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {t("hero.title")}
              <span className="text-[#166534]"> {t("hero.titleHighlight")}</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-gray-600 mb-8 max-w-lg"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              {["🌱 100% Organic", "♻️ Zero Waste", "🌍 Carbon Neutral"].map((badge, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-[#ECFCCB] rounded-full text-sm font-medium text-[#166534]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {badge}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#166534] hover:bg-[#14532D] text-white font-semibold px-8 py-6 text-lg rounded-full gap-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <ShoppingBag className="w-5 h-5" />
                {t("hero.cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#D97706] text-[#D97706] hover:bg-[#D97706]/10 px-8 py-6 text-lg rounded-full gap-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {t("hero.ctaSecondary")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main image with organic shape mask */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                }}
              >
                <Image
                  src="/showcase/eco-brand/hero.jpg"
                  alt="Terra Collective"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating product card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-[#ECFCCB] flex items-center justify-center text-3xl">
                    🌱
                  </div>
                  <div>
                    <div
                      className="font-bold text-[#1C1917]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {t("hero.productName")}
                    </div>
                    <div
                      className="text-sm text-gray-500"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {t("hero.productDesc")}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
