"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Heart, Leaf, Users } from "lucide-react";
import Image from "next/image";

const values = [
  { key: "quality", icon: Heart },
  { key: "sustainability", icon: Leaf },
  { key: "community", icon: Users },
];

export function CafeStory() {
  const t = useTranslations("showcase.artisan-cafe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Polaroid Photos Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            {/* Polaroid 1 */}
            <motion.div
              className="absolute top-0 left-0 bg-white p-3 pb-12 shadow-lg w-48"
              initial={{ rotate: -8 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/showcase/artisan-cafe/beans.jpg"
                  alt="Coffee beans"
                  fill
                  className="object-cover"
                />
              </div>
              <p
                className="text-center mt-3 text-[#5C4033]"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                Est. 2018
              </p>
            </motion.div>

            {/* Polaroid 2 */}
            <motion.div
              className="absolute top-20 left-32 bg-white p-3 pb-12 shadow-lg w-52"
              initial={{ rotate: 5 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/showcase/artisan-cafe/latte-art.jpg"
                  alt="Latte art"
                  fill
                  className="object-cover"
                />
              </div>
              <p
                className="text-center mt-3 text-[#5C4033]"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                Fresh daily
              </p>
            </motion.div>

            {/* Polaroid 3 */}
            <motion.div
              className="absolute bottom-0 left-16 bg-white p-3 pb-12 shadow-lg w-44"
              initial={{ rotate: -3 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/showcase/artisan-cafe/pastry.jpg"
                  alt="Fresh pastries"
                  fill
                  className="object-cover"
                />
              </div>
              <p
                className="text-center mt-3 text-[#5C4033]"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                Made with love
              </p>
            </motion.div>

            {/* Decorative sticker */}
            <motion.div
              className="absolute top-1/2 right-8 w-24 h-24 rounded-full bg-[#C65D3B] flex items-center justify-center text-white rotate-12"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
            >
              <span
                className="text-center text-sm font-bold"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                100%<br />Organic
              </span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-4xl md:text-5xl font-normal text-[#5C4033] mb-6"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              {t("story.title")}
            </h2>

            <p
              className="text-lg text-[#5C4033]/70 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t("story.description")}
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FFF8F0] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C65D3B]" />
                    </div>
                    <span
                      className="text-lg text-[#5C4033]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {t(`story.values.${value.key}`)}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
