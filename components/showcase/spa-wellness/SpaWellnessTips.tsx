"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Clock, Leaf } from "lucide-react";

const tips = [
  {
    id: "meditation",
    image: "/showcase/spa-wellness/wellness-1.jpg",
    readTime: 5,
    category: "mindfulness",
  },
  {
    id: "skincare",
    image: "/showcase/spa-wellness/wellness-2.jpg",
    readTime: 4,
    category: "beauty",
  },
  {
    id: "aromatherapy",
    image: "/showcase/spa-wellness/wellness-3.jpg",
    readTime: 6,
    category: "wellness",
  },
];

export function SpaWellnessTips() {
  const t = useTranslations("showcase.spa-wellness.tips");

  return (
    <section className="py-24 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#9CAF88]" />
            <Leaf className="w-5 h-5 text-[#9CAF88]" />
            <div className="w-12 h-px bg-[#9CAF88]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-[#3A3A3A] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#3A3A3A]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Tips grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.article
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={tip.image}
                  alt={t(`articles.${tip.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 bg-white/90 rounded-full text-xs text-[#9CAF88] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {t(`categories.${tip.category}`)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[#3A3A3A]/50 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tip.readTime} {t("minRead")}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl text-[#3A3A3A] mb-3 group-hover:text-[#9CAF88] transition-colors"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {t(`articles.${tip.id}.title`)}
                </h3>

                {/* Excerpt */}
                <p
                  className="text-sm text-[#3A3A3A]/60 mb-4 line-clamp-2"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {t(`articles.${tip.id}.excerpt`)}
                </p>

                {/* Read more */}
                <span
                  className="inline-flex items-center gap-2 text-sm text-[#9CAF88] group-hover:gap-3 transition-all"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {t("readMore")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
