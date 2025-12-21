"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Waves, Utensils, Dumbbell, Car, Sparkles, HeartHandshake } from "lucide-react";

const amenities = [
  { id: "spa", icon: Sparkles },
  { id: "pool", icon: Waves },
  { id: "restaurant", icon: Utensils },
  { id: "gym", icon: Dumbbell },
  { id: "concierge", icon: HeartHandshake },
  { id: "parking", icon: Car },
];

export function HotelAmenities() {
  const t = useTranslations("showcase.luxury-hotel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-[#1A2A4A]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-px bg-[#C9A962] mx-auto mb-6" />
          <h2
            className="text-4xl md:text-5xl font-light text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("amenities.title")}
          </h2>
          <p
            className="text-lg text-white/60"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("amenities.subtitle")}
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 border border-[#C9A962]/30 flex items-center justify-center group-hover:border-[#C9A962] group-hover:bg-[#C9A962]/10 transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#C9A962]" />
                </div>
                <p
                  className="text-white/80 text-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t(`amenities.${amenity.id}`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
