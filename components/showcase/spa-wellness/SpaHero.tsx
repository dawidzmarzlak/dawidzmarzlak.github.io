"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SpaHero() {
  const t = useTranslations("showcase.spa-wellness");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FEFEFE]">
      {/* Background with organic shapes */}
      <div className="absolute inset-0">
        <Image
          src="/showcase/spa-wellness/hero.jpg"
          alt="Serenity Springs Spa"
          fill
          className="object-cover"
          priority
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8DFD0]/80 via-[#FEFEFE]/70 to-[#E8C4C4]/50" />

        {/* Organic blob shapes */}
        <svg
          className="absolute -top-20 -right-20 w-[600px] h-[600px] text-[#9CAF88]/20"
          viewBox="0 0 200 200"
        >
          <motion.path
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1.1C86.3,14.2,80,28.4,71.7,41.1C63.3,53.9,52.9,65.2,40.1,73.1C27.3,81,12.2,85.5,-2.4,89.1C-17,92.8,-31.1,95.5,-43.4,88.9C-55.8,82.4,-66.3,66.6,-75.1,50.5C-83.9,34.4,-91,18.2,-91.1,1.9C-91.3,-14.5,-84.6,-31.1,-74.8,-45.1C-65,-59.2,-52.1,-70.7,-37.8,-77.7C-23.5,-84.7,-7.8,-87.2,4.8,-95.4C17.4,-103.5,34.7,-117.3,44.7,-76.4Z"
            fill="currentColor"
            animate={{
              d: [
                "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1.1C86.3,14.2,80,28.4,71.7,41.1C63.3,53.9,52.9,65.2,40.1,73.1C27.3,81,12.2,85.5,-2.4,89.1C-17,92.8,-31.1,95.5,-43.4,88.9C-55.8,82.4,-66.3,66.6,-75.1,50.5C-83.9,34.4,-91,18.2,-91.1,1.9C-91.3,-14.5,-84.6,-31.1,-74.8,-45.1C-65,-59.2,-52.1,-70.7,-37.8,-77.7C-23.5,-84.7,-7.8,-87.2,4.8,-95.4C17.4,-103.5,34.7,-117.3,44.7,-76.4Z",
                "M39.9,-67.4C52.4,-60.5,63.5,-50.7,71.6,-38.4C79.7,-26.1,84.9,-11.3,85.5,4.1C86.1,19.6,82.2,35.6,73.1,48.5C64,61.3,49.8,71,34.6,76.5C19.3,82,3,83.3,-13.5,81.8C-30,80.2,-46.7,75.7,-60.5,66.4C-74.3,57.1,-85.2,42.9,-89.8,26.7C-94.3,10.6,-92.5,-7.5,-86.1,-23.8C-79.7,-40.1,-68.7,-54.6,-54.9,-61.1C-41.1,-67.6,-24.5,-66.1,-9.4,-64.1C5.7,-62,27.5,-59.4,39.9,-67.4Z",
                "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1.1C86.3,14.2,80,28.4,71.7,41.1C63.3,53.9,52.9,65.2,40.1,73.1C27.3,81,12.2,85.5,-2.4,89.1C-17,92.8,-31.1,95.5,-43.4,88.9C-55.8,82.4,-66.3,66.6,-75.1,50.5C-83.9,34.4,-91,18.2,-91.1,1.9C-91.3,-14.5,-84.6,-31.1,-74.8,-45.1C-65,-59.2,-52.1,-70.7,-37.8,-77.7C-23.5,-84.7,-7.8,-87.2,4.8,-95.4C17.4,-103.5,34.7,-117.3,44.7,-76.4Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] text-[#E8C4C4]/30"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>

        {/* Concentric circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <div className="w-[300px] h-[300px] rounded-full border border-[#9CAF88]" />
          <div className="absolute top-4 left-4 w-[268px] h-[268px] rounded-full border border-[#9CAF88]" />
          <div className="absolute top-8 left-8 w-[236px] h-[236px] rounded-full border border-[#9CAF88]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p
              className="text-[#9CAF88] text-lg tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("brandName")}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-[#9CAF88]/50" />
              <div className="w-2 h-2 rounded-full bg-[#9CAF88]/50" />
              <div className="w-8 h-px bg-[#9CAF88]/50" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-light text-[#3A3A3A] mb-8 leading-tight"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-[#3A3A3A]/70 max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-[#9CAF88] hover:bg-[#8A9D78] text-white font-normal px-8 py-6 text-base rounded-full"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#9CAF88] text-[#9CAF88] hover:bg-[#9CAF88]/10 px-8 py-6 text-base rounded-full"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
