"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Camera, Instagram, Mail } from "lucide-react";
import Image from "next/image";

export function PhotoHero() {
  const t = useTranslations("showcase.photo-portfolio");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/showcase/photo-portfolio/hero.jpg"
          alt="Photography Portfolio"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-4 pb-24 pt-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            {/* Camera icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-8"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-9xl font-bold text-white mb-4 leading-none tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("hero.name")}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-white/70 mb-8 max-w-lg"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("hero.tagline")}
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <a
                href="#"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span style={{ fontFamily: "var(--font-lato)" }}>
                  {t("hero.instagram")}
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span style={{ fontFamily: "var(--font-lato)" }}>
                  {t("hero.email")}
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
