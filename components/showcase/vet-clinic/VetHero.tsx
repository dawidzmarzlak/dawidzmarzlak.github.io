"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PawPrint, Phone, Calendar } from "lucide-react";
import Image from "next/image";

export function VetHero() {
  const t = useTranslations("showcase.vet-clinic");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F0FDF9]">
      {/* Decorative paw prints */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#0D9488]/10 text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🐾
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D9488]/10 rounded-full mb-6">
              <PawPrint className="w-4 h-4 text-[#0D9488]" />
              <span
                className="text-sm text-[#0D9488] font-medium"
                style={{ fontFamily: "var(--font-quicksand)" }}
              >
                {t("hero.badge")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {t("hero.title")}
              <span className="text-[#F97316]"> {t("hero.titleHighlight")}</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-gray-600 mb-8 max-w-lg"
              style={{ fontFamily: "var(--font-quicksand)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                >
                  <span className="text-xl">
                    {["🐕", "🐈", "🐇"][i]}
                  </span>
                  <span
                    className="text-sm text-gray-700"
                    style={{ fontFamily: "var(--font-quicksand)" }}
                  >
                    {t(`hero.features.${i}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#0D9488] hover:bg-[#0B7A70] text-white font-semibold px-8 py-6 text-lg rounded-2xl gap-2"
                style={{ fontFamily: "var(--font-quicksand)" }}
              >
                <Calendar className="w-5 h-5" />
                {t("hero.cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10 px-8 py-6 text-lg rounded-2xl gap-2"
                style={{ fontFamily: "var(--font-quicksand)" }}
              >
                <Phone className="w-5 h-5" />
                {t("hero.ctaSecondary")}
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
              {/* Main image */}
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/showcase/vet-clinic/hero.jpg"
                  alt="Happy Paws Veterinary Clinic"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FBBF24] flex items-center justify-center text-2xl">
                    🐕
                  </div>
                  <div>
                    <div
                      className="font-bold text-[#1A1A1A]"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      2,500+
                    </div>
                    <div
                      className="text-sm text-gray-500"
                      style={{ fontFamily: "var(--font-quicksand)" }}
                    >
                      {t("hero.stats.pets")}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-xl">
                    ⭐
                  </div>
                  <div>
                    <div
                      className="font-bold text-[#1A1A1A]"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      4.9/5
                    </div>
                    <div
                      className="text-sm text-gray-500"
                      style={{ fontFamily: "var(--font-quicksand)" }}
                    >
                      {t("hero.stats.rating")}
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
