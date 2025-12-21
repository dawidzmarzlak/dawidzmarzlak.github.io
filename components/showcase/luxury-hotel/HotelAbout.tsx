"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Award, Clock } from "lucide-react";
import Image from "next/image";

export function HotelAbout() {
  const t = useTranslations("showcase.luxury-hotel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image */}
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/showcase/luxury-hotel/lobby.jpg"
                alt="Hotel Lobby"
                fill
                className="object-cover"
              />
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-[#C9A962]/30" />
            </div>

            {/* Floating accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#C9A962] flex items-center justify-center"
            >
              <div className="text-center text-[#1A2A4A]">
                <p className="text-5xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                  100
                </p>
                <p className="text-sm tracking-wider uppercase">Years</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="w-16 h-px bg-[#C9A962] mb-6" />
              <h2
                className="text-4xl md:text-5xl font-light text-[#1A2A4A] mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {t("about.title")}
              </h2>
            </div>

            <p
              className="text-lg text-[#1A2A4A]/70 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.description")}
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A2A4A] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A2A4A]" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {t("about.heritage")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A2A4A] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A2A4A]" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {t("about.awards")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
