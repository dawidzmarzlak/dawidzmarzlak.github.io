"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Star, Award, Quote, ExternalLink } from "lucide-react";
import Image from "next/image";

const pressFeatures = [
  {
    id: "michelin",
    logo: "/showcase/fine-dining/press-michelin.png",
    rating: "2 Stars",
  },
  {
    id: "nytimes",
    logo: "/showcase/fine-dining/press-nytimes.png",
    rating: "4/4",
  },
  {
    id: "zagat",
    logo: "/showcase/fine-dining/press-zagat.png",
    rating: "29/30",
  },
  {
    id: "forbes",
    logo: "/showcase/fine-dining/press-forbes.png",
    rating: "5 Stars",
  },
];

const awards = [
  { id: "award1", year: "2024", icon: Award },
  { id: "award2", year: "2023", icon: Star },
  { id: "award3", year: "2023", icon: Award },
  { id: "award4", year: "2022", icon: Star },
];

export function RestaurantPress() {
  const t = useTranslations("showcase.fine-dining");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#D4AF37]/50" />
            <div className="w-2 h-2 rotate-45 border border-[#D4AF37]/50" />
            <div className="w-12 h-px bg-[#D4AF37]/50" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("press.title")}
          </h2>
          <p
            className="text-lg text-white/50 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("press.subtitle")}
          </p>
        </motion.div>

        {/* Press Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {pressFeatures.map((press, index) => (
            <motion.div
              key={press.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="group relative bg-gradient-to-b from-[#722F37]/10 to-transparent border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 p-8 text-center transition-all duration-300"
            >
              {/* Rating */}
              <div
                className="text-2xl md:text-3xl text-[#D4AF37] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {press.rating}
              </div>

              {/* Publication name */}
              <p
                className="text-sm text-white/70 tracking-wider uppercase"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {t(`press.publications.${press.id}`)}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-[#D4AF37]/5" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative bg-gradient-to-r from-[#722F37]/20 via-[#722F37]/10 to-[#722F37]/20 border border-[#D4AF37]/20 p-12 md:p-16">
            <Quote className="absolute top-6 left-6 text-[#D4AF37]/20 w-16 h-16" />
            <Quote className="absolute bottom-6 right-6 text-[#D4AF37]/20 w-16 h-16 rotate-180" />

            <blockquote
              className="text-2xl md:text-3xl text-white text-center italic leading-relaxed mb-8 relative z-10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("press.featuredQuote")}
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-[#D4AF37]/50" />
              <cite
                className="text-[#D4AF37] not-italic tracking-wider text-sm"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {t("press.featuredSource")}
              </cite>
              <div className="w-8 h-px bg-[#D4AF37]/50" />
            </div>
          </div>
        </motion.div>

        {/* Awards Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3
            className="text-2xl font-normal text-white text-center mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("press.awardsTitle")}
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="group text-center p-8 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors">
                    <Icon className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </div>

                  <div
                    className="text-sm text-[#D4AF37]/70 mb-2"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {award.year}
                  </div>

                  <h4
                    className="text-lg text-white mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {t(`press.awards.${award.id}.name`)}
                  </h4>

                  <p
                    className="text-sm text-white/50"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {t(`press.awards.${award.id}.organization`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Press Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 pt-16 border-t border-[#D4AF37]/10"
        >
          <p
            className="text-center text-white/30 text-sm tracking-widest uppercase mb-8"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("press.featuredIn")}
          </p>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

            <motion.div
              className="flex gap-16 items-center"
              animate={{ x: [0, -800] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[
                "The New York Times",
                "Vogue",
                "Architectural Digest",
                "Food & Wine",
                "Bon Appétit",
                "GQ",
                "Forbes Travel",
                "Condé Nast",
                "The New York Times",
                "Vogue",
                "Architectural Digest",
                "Food & Wine",
              ].map((name, index) => (
                <span
                  key={index}
                  className="text-xl text-white/20 hover:text-[#D4AF37]/50 whitespace-nowrap transition-colors cursor-pointer"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
