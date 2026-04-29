"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Wine, MapPin, Calendar, Award } from "lucide-react";

const wineCollections = [
  {
    name: "Château Margaux 2015",
    region: "Bordeaux, France",
    vintage: "2015",
    description: "Premier Grand Cru Classé with exceptional balance and elegance",
    image: "/showcase/fine-dining/wine-1.jpg",
    price: "890",
    rating: "98 pts",
  },
  {
    name: "Dom Pérignon Vintage",
    region: "Champagne, France",
    vintage: "2012",
    description: "Iconic champagne with remarkable depth and precision",
    image: "/showcase/fine-dining/wine-2.jpg",
    price: "420",
    rating: "96 pts",
  },
  {
    name: "Opus One Overture",
    region: "Napa Valley, USA",
    vintage: "2018",
    description: "Bordeaux-style blend of power and finesse",
    image: "/showcase/fine-dining/wine-3.jpg",
    price: "650",
    rating: "95 pts",
  },
  {
    name: "Sassicaia",
    region: "Tuscany, Italy",
    vintage: "2017",
    description: "Super Tuscan icon with extraordinary structure",
    image: "/showcase/fine-dining/wine-4.jpg",
    price: "380",
    rating: "97 pts",
  },
  {
    name: "Penfolds Grange",
    region: "South Australia",
    vintage: "2016",
    description: "Australia's most celebrated wine with intense complexity",
    image: "/showcase/fine-dining/wine-5.jpg",
    price: "720",
    rating: "99 pts",
  },
  {
    name: "Screaming Eagle",
    region: "Napa Valley, USA",
    vintage: "2015",
    description: "Cult Cabernet with legendary status and rarity",
    image: "/showcase/fine-dining/wine-6.jpg",
    price: "3200",
    rating: "100 pts",
  },
];

export function RestaurantWine() {
  const t = useTranslations("showcase.fine-dining");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#722F37]/10 overflow-hidden">
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
            <Wine className="text-[#D4AF37]" size={24} />
            <div className="w-12 h-px bg-[#D4AF37]/50" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("wine.title")}
          </h2>
          <p
            className="text-lg text-white/50 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("wine.subtitle")}
          </p>
        </motion.div>

        {/* Wine Cellar Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto"
        >
          {[
            { label: t("wine.stats.bottles"), value: "2,500+" },
            { label: t("wine.stats.regions"), value: "15" },
            { label: t("wine.stats.vintages"), value: "1950-2023" },
            { label: t("wine.stats.rare"), value: "120+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-3xl md:text-4xl text-[#D4AF37] mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm text-white/50 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Horizontal Scroll Wine Collection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* Gradient overlays for scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {wineCollections.map((wine, index) => (
              <motion.div
                key={wine.name}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex-none w-[350px] snap-center group"
              >
                <div className="relative h-[450px] mb-6 overflow-hidden bg-gradient-to-b from-[#722F37]/20 to-[#0A0A0A] border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                  <Image
                    src={wine.image}
                    alt={wine.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-[#722F37] text-[#D4AF37] px-4 py-2 text-sm flex items-center gap-2">
                    <Award size={16} />
                    <span style={{ fontFamily: "var(--font-lato)" }}>
                      {wine.rating}
                    </span>
                  </div>

                  {/* Wine Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3
                      className="text-2xl text-white mb-2 group-hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {wine.name}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-[#D4AF37]" />
                        <span style={{ fontFamily: "var(--font-lato)" }}>
                          {wine.region}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-[#D4AF37]" />
                        <span style={{ fontFamily: "var(--font-lato)" }}>
                          {wine.vintage}
                        </span>
                      </div>
                    </div>

                    <p
                      className="text-sm text-white/60 mb-4 leading-relaxed"
                      style={{ fontFamily: "var(--font-lato)" }}
                    >
                      {wine.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
                      <span
                        className="text-2xl text-[#D4AF37]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        ${wine.price}
                      </span>
                      <Wine className="text-[#D4AF37]/50" size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sommelier Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="border-l-2 border-[#D4AF37] pl-6 text-left">
            <p
              className="text-lg text-white/70 italic mb-4 leading-relaxed"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("wine.sommelierNote")}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-[#D4AF37]/50" />
              <span
                className="text-[#D4AF37] text-sm tracking-wider"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {t("wine.sommelierName")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
