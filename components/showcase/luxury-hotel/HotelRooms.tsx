"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Maximize, Star } from "lucide-react";
import Image from "next/image";

const rooms = [
  {
    id: "deluxe",
    image: "/showcase/luxury-hotel/room-1.jpg",
    featured: false,
  },
  {
    id: "suite",
    image: "/showcase/luxury-hotel/room-2.jpg",
    featured: true,
  },
  {
    id: "penthouse",
    image: "/showcase/luxury-hotel/room-3.jpg",
    featured: false,
  },
];

export function HotelRooms() {
  const t = useTranslations("showcase.luxury-hotel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-white">
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
            className="text-4xl md:text-5xl font-light text-[#1A2A4A] mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("rooms.title")}
          </h2>
          <p
            className="text-lg text-[#1A2A4A]/60"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rooms.subtitle")}
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative ${room.featured ? "md:-mt-8 md:mb-8" : ""}`}
            >
              {room.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-[#C9A962] text-[#1A2A4A] px-4 py-1 text-xs tracking-widest uppercase flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </div>
                </div>
              )}

              <div className="bg-[#F5F1E8] overflow-hidden">
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={room.image}
                    alt={t(`rooms.${room.id}.name`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Room number */}
                  <div className="absolute top-4 left-4 text-white/40 text-6xl font-light drop-shadow-lg" style={{ fontFamily: "var(--font-cormorant)" }}>
                    0{index + 1}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white text-white hover:bg-white hover:text-[#1A2A4A]"
                      >
                        <Maximize className="w-4 h-4 mr-2" />
                        View Gallery
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-2xl font-light text-[#1A2A4A] mb-2"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {t(`rooms.${room.id}.name`)}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-[#1A2A4A]/60 mb-4">
                    <span>{t(`rooms.${room.id}.size`)}</span>
                    <span className="w-1 h-1 bg-[#C9A962] rounded-full" />
                    <span className="text-[#C9A962] font-medium">
                      {t(`rooms.${room.id}.price`)}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-[#1A2A4A] hover:text-[#C9A962] group/btn"
                  >
                    {t("rooms.viewDetails")}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
