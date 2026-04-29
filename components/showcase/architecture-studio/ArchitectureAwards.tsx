"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Award, Trophy, Star, Calendar } from "lucide-react";

const awards = [
  {
    id: "award1",
    icon: Trophy,
    year: "2024",
  },
  {
    id: "award2",
    icon: Award,
    year: "2023",
  },
  {
    id: "award3",
    icon: Star,
    year: "2023",
  },
  {
    id: "award4",
    icon: Trophy,
    year: "2022",
  },
] as const;

const pressMentions = [
  "Architectural Digest",
  "Dezeen",
  "ArchDaily",
  "Wallpaper",
  "Frame Magazine",
  "Azure Magazine",
  "Dwell",
  "Architect Magazine",
] as const;

export function ArchitectureAwards() {
  const t = useTranslations("showcase.architecture-studio");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#FF4D00]" />
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("awards.title")}
            </h2>
          </div>
          <p
            className="text-lg text-white/60 max-w-2xl"
            style={{ fontFamily: "var(--font-ibm-plex)" }}
          >
            {t("awards.subtitle")}
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-white/10 p-8 group hover:border-[#FF4D00] transition-all relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/5 rounded-full blur-3xl group-hover:bg-[#FF4D00]/10 transition-all" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <Icon className="w-12 h-12 text-[#FF4D00] group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Year */}
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <span
                      className="text-sm text-white/40"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {award.year}
                    </span>
                  </div>

                  {/* Award name */}
                  <h3
                    className="text-xl font-bold mb-3 group-hover:text-[#FF4D00] transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(`awards.items.${award.id}.name`)}
                  </h3>

                  {/* Organization */}
                  <p
                    className="text-sm text-white/60"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t(`awards.items.${award.id}.organization`)}
                  </p>

                  {/* Project */}
                  <p
                    className="text-xs text-white/40 mt-2"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t(`awards.items.${award.id}.project`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Press Mentions */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl font-bold mb-8 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("awards.pressMentions")}
          </motion.h3>

          {/* Infinite marquee */}
          <div className="relative">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Marquee container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-12"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {/* First set */}
                {pressMentions.map((publication, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 flex items-center"
                  >
                    <span
                      className="text-2xl font-bold text-white/30 hover:text-[#FF4D00] transition-colors cursor-pointer whitespace-nowrap"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {publication}
                    </span>
                  </div>
                ))}
                {/* Second set (duplicate for seamless loop) */}
                {pressMentions.map((publication, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 flex items-center"
                  >
                    <span
                      className="text-2xl font-bold text-white/30 hover:text-[#FF4D00] transition-colors cursor-pointer whitespace-nowrap"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {publication}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/10"
        >
          <div className="text-center">
            <div
              className="text-5xl md:text-6xl font-bold text-[#FF4D00] mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              15+
            </div>
            <p
              className="text-white/60"
              style={{ fontFamily: "var(--font-ibm-plex)" }}
            >
              {t("awards.stats.awards")}
            </p>
          </div>
          <div className="text-center">
            <div
              className="text-5xl md:text-6xl font-bold text-[#FF4D00] mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              50+
            </div>
            <p
              className="text-white/60"
              style={{ fontFamily: "var(--font-ibm-plex)" }}
            >
              {t("awards.stats.features")}
            </p>
          </div>
          <div className="text-center">
            <div
              className="text-5xl md:text-6xl font-bold text-[#FF4D00] mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              8+
            </div>
            <p
              className="text-white/60"
              style={{ fontFamily: "var(--font-ibm-plex)" }}
            >
              {t("awards.stats.countries")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
