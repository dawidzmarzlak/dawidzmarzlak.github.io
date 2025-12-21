"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Leaf } from "lucide-react";
import Image from "next/image";

export function SpaAbout() {
  const t = useTranslations("showcase.spa-wellness");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-full relative overflow-hidden">
              <Image
                src="/showcase/spa-wellness/treatment.jpg"
                alt="Spa Treatment"
                fill
                className="object-cover"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9CAF88]/10 to-[#E8C4C4]/20" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#E8C4C4]/30" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#9CAF88]/20" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#9CAF88]" />
                <Leaf className="w-4 h-4 text-[#9CAF88]" />
              </div>
              <h2
                className="text-4xl md:text-5xl font-light text-[#3A3A3A] mb-6"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                {t("about.title")}
              </h2>
            </div>

            <p
              className="text-lg text-[#3A3A3A]/70 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("about.description")}
            </p>

            <div className="p-6 bg-[#9CAF88]/10 rounded-2xl">
              <p
                className="text-[#9CAF88] text-lg italic"
                style={{ fontFamily: "var(--font-sacramento)" }}
              >
                {t("about.mission")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
