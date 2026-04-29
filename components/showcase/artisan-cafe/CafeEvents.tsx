"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

const events = [
  {
    key: "tasting",
    image: "/showcase/artisan-cafe/event-tasting.jpg",
    date: "2024-03-15",
    duration: "2h",
    spots: 12,
    color: "#C65D3B",
  },
  {
    key: "brewing",
    image: "/showcase/artisan-cafe/event-brewing.jpg",
    date: "2024-03-22",
    duration: "3h",
    spots: 8,
    color: "#6B7B3C",
  },
  {
    key: "latte-art",
    image: "/showcase/artisan-cafe/event-latte.jpg",
    date: "2024-03-29",
    duration: "2.5h",
    spots: 10,
    color: "#5C4033",
  },
];

export function CafeEvents() {
  const t = useTranslations("showcase.artisan-cafe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-[#FFF8F0]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-normal text-[#5C4033] mb-4"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            {t("events.title")}
          </h2>
          <p
            className="text-xl text-[#5C4033]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("events.subtitle")}
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.key}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={t(`events.items.${event.key}.title`)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Color overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: event.color }}
                  />

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg"
                      style={{
                        backgroundColor: event.color,
                        fontFamily: "var(--font-dm-sans)"
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {t("events.upcoming")}
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3
                    className="text-2xl font-normal mb-3 text-[#5C4033]"
                    style={{ fontFamily: "var(--font-dm-serif)" }}
                  >
                    {t(`events.items.${event.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[#5C4033]/60 mb-6 leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {t(`events.items.${event.key}.description`)}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    {/* Date */}
                    <div className="flex items-center gap-3 text-sm text-[#5C4033]/70">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${event.color}20` }}
                      >
                        <Calendar className="w-4 h-4" style={{ color: event.color }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-3 text-sm text-[#5C4033]/70">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${event.color}20` }}
                      >
                        <Clock className="w-4 h-4" style={{ color: event.color }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {event.duration}
                      </span>
                    </div>

                    {/* Spots */}
                    <div className="flex items-center gap-3 text-sm text-[#5C4033]/70">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${event.color}20` }}
                      >
                        <Users className="w-4 h-4" style={{ color: event.color }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {event.spots} {t("events.spotsLeft")}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full rounded-full group/btn"
                    style={{
                      backgroundColor: event.color,
                      fontFamily: "var(--font-dm-sans)"
                    }}
                  >
                    {t("events.bookNow")}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p
            className="text-lg text-[#5C4033]/60"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("events.allEvents")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
