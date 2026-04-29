"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Scale, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";

export function LawHero() {
  const t = useTranslations("showcase.law-firm");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAFBFC]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A5F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/10 rounded-full mb-6">
              <Scale className="w-4 h-4 text-[#C9A227]" />
              <span
                className="text-sm text-[#1E3A5F] font-medium"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {t("hero.badge")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl font-bold text-[#1E3A5F] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-crimson-pro)" }}
            >
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-gray-600 mb-8 max-w-lg"
              style={{ fontFamily: "var(--font-source-serif)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { value: "25+", label: t("hero.stats.years") },
                { value: "500+", label: t("hero.stats.cases") },
                { value: "98%", label: t("hero.stats.success") },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-3xl font-bold text-[#C9A227]"
                    style={{ fontFamily: "var(--font-crimson-pro)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "var(--font-source-serif)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#1E3A5F] hover:bg-[#152D4A] text-white font-semibold px-8 py-6 text-lg gap-2"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                <Phone className="w-5 h-5" />
                {t("hero.cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F]/10 px-8 py-6 text-lg gap-2"
                style={{ fontFamily: "var(--font-source-serif)" }}
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
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/showcase/law-firm/hero.jpg"
                alt="Sterling & Associates"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/50 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A227] rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div
                    className="text-2xl font-bold text-[#1E3A5F]"
                    style={{ fontFamily: "var(--font-crimson-pro)" }}
                  >
                    {t("hero.consultation")}
                  </div>
                  <div
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "var(--font-source-serif)" }}
                  >
                    {t("hero.consultationSub")}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gold accent line */}
            <div className="absolute -right-4 top-1/4 w-2 h-32 bg-[#C9A227]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
