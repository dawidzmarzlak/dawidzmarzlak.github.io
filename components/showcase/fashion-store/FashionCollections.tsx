"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const collections = [
  { key: "spring", image: "/showcase/fashion-store/collection-1.jpg" },
  { key: "autumn", image: "/showcase/fashion-store/collection-2.jpg" },
  { key: "essentials", image: "/showcase/fashion-store/collection-3.jpg" },
];

export function FashionCollections() {
  const t = useTranslations("showcase.fashion-store.collections");

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-light text-[#0A0A0A] mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#666666]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[3/4] mb-6 relative overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.key}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/20 transition-colors duration-500" />

                {/* Arrow icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowUpRight className="w-5 h-5 text-[#0A0A0A]" />
                </motion.div>
              </div>

              {/* Collection info */}
              <h3
                className="text-lg font-light text-[#0A0A0A] group-hover:text-[#D4A5A5] transition-colors"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {t(collection.key)}
              </h3>
              <p
                className="text-xs tracking-wider text-[#666666] uppercase mt-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {t("viewCollection")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
