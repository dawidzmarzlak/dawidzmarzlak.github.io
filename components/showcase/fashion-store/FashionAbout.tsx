"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Image from "next/image";

export function FashionAbout() {
  const t = useTranslations("showcase.fashion-store.about");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] order-2 lg:order-1"
          >
            <Image
              src="/showcase/fashion-store/about.jpg"
              alt="MAISON ÉLISE Atelier"
              fill
              className="object-cover"
            />
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-[#D4A5A5]/30 pointer-events-none" />
          </motion.div>

          {/* Right - Content with scroll reveal */}
          <motion.div
            style={{ opacity, y }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p
                className="text-xs tracking-[0.3em] text-[#D4A5A5] uppercase mb-6"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {t("since")}
              </p>

              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0A0A0A] mb-8 leading-tight"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {t("title")}
              </h2>

              <div className="space-y-6 mb-10">
                <p
                  className="text-base text-[#666666] leading-relaxed"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {t("description")}
                </p>

                <p
                  className="text-base text-[#666666] leading-relaxed"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {t("philosophy")}
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#E5E5E5]">
                {[
                  { key: "craftsmanship", value: "100%" },
                  { key: "sustainable", value: "100%" },
                  { key: "exclusive", value: "100%" },
                ].map((item) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p
                      className="text-2xl font-light text-[#D4A5A5] mb-2"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="text-xs tracking-wider text-[#666666] uppercase"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {t(item.key)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
