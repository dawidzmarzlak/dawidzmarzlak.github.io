"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Building, Users, Wifi, Coffee } from "lucide-react";
import Image from "next/image";

export function CoworkingHero() {
  const t = useTranslations("showcase.coworking-space");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAFAFA]">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#18181B 1px, transparent 1px),
            linear-gradient(90deg, #18181B 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FACC15] text-[#18181B] rounded-full mb-6 font-bold">
              <Building className="w-4 h-4" />
              <span style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {t("hero.badge")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl font-bold text-[#18181B] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-gray-600 mb-8 max-w-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: Wifi, label: t("hero.features.0") },
                { icon: Coffee, label: t("hero.features.1") },
                { icon: Users, label: t("hero.features.2") },
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-[#FACC15]/20 flex items-center justify-center mx-auto mb-2">
                    <feature.icon className="w-6 h-6 text-[#18181B]" />
                  </div>
                  <span
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#18181B] hover:bg-[#27272A] text-white font-bold px-8 py-6 text-lg"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t("hero.cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#FACC15] text-[#18181B] hover:bg-[#FACC15]/10 px-8 py-6 text-lg font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
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
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/showcase/coworking-space/hero.jpg"
                alt="The Hub Coworking Space"
                fill
                className="object-cover"
                priority
              />
              {/* Yellow accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FACC15]" />
            </div>

            {/* Availability indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 left-6 bg-white p-4 rounded-lg shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <div>
                  <div
                    className="font-bold text-[#18181B]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("hero.available")}
                  </div>
                  <div
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("hero.availableDesc")}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
