"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

const genres = [
  { id: 1, name: "Jazz", count: 234, color: "#2563EB" },
  { id: 2, name: "Soul & Funk", count: 189, color: "#DC2626" },
  { id: 3, name: "Rock", count: 312, color: "#7C3AED" },
  { id: 4, name: "Electronic", count: 156, color: "#0D9488" },
  { id: 5, name: "Hip-Hop", count: 98, color: "#F59E0B" },
  { id: 6, name: "Classical", count: 167, color: "#8B4513" },
];

export function MusicGenres() {
  const t = useTranslations("showcase.music-store");

  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {t("genres.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {t("genres.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {genres.map((genre, index) => (
            <motion.button
              key={genre.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative p-6 rounded-2xl overflow-hidden text-left"
              style={{ backgroundColor: `${genre.color}15` }}
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${genre.color}30, ${genre.color}10)`,
                }}
              />

              {/* Vinyl decoration */}
              <motion.div
                className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: genre.color }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10">
                <h3
                  className="text-xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {genre.name}
                </h3>
                <p
                  className="text-sm text-gray-400 mb-4"
                  style={{ fontFamily: "var(--font-work-sans)" }}
                >
                  {genre.count} {t("genres.albums")}
                </p>
                <ArrowRight
                  className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all"
                  style={{ color: genre.color }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
