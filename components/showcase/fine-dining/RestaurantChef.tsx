"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import Image from "next/image";

export function RestaurantChef() {
  const t = useTranslations("showcase.fine-dining");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src="/showcase/fine-dining/chef.jpg"
                alt="Chef Antoine Noir"
                fill
                className="object-cover"
              />
              {/* Decorative frame */}
              <div className="absolute inset-6 border border-[#D4AF37]/20" />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37]/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37]/30" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#D4AF37]/50" />
                <span className="text-[#D4AF37] text-sm tracking-widest uppercase">
                  {t("chef.title")}
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-normal text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t("chef.name")}
              </h2>
              <p className="text-[#D4AF37] tracking-wider" style={{ fontFamily: "var(--font-lato)" }}>
                {t("chef.role")}
              </p>
            </div>

            <p
              className="text-lg text-white/70 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("chef.bio")}
            </p>

            {/* Quote */}
            <div className="relative pl-8 border-l-2 border-[#722F37]">
              <Quote className="absolute -left-3 -top-1 w-6 h-6 text-[#D4AF37] bg-[#1A1A1A]" />
              <p
                className="text-xl text-white/90 italic leading-relaxed"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                "{t("chef.quote")}"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
