"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

const events = [
  { year: "2019", icon: "💑" },
  { year: "2020", icon: "🌹" },
  { year: "2022", icon: "💍" },
  { year: "2025", icon: "👰" },
];

export function WeddingTimeline() {
  const t = useTranslations("showcase.wedding-planner");

  return (
    <section className="py-24 bg-[#FFFAF7]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl text-[#3A3A3A] mb-4"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {t("timeline.title")}
          </h2>
          <p
            className="text-lg text-[#3A3A3A]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("timeline.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A5A5] via-[#9CAF88] to-[#C9A962] hidden md:block" />

            {events.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center mb-16 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                  >
                    <div
                      className={`inline-block p-6 bg-white rounded-3xl shadow-lg ${
                        isLeft ? "md:ml-auto" : "md:mr-auto"
                      }`}
                    >
                      <span className="text-4xl mb-4 block">{event.icon}</span>
                      <span
                        className="text-[#D4A5A5] font-bold block mb-2"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {event.year}
                      </span>
                      <h3
                        className="text-xl font-bold text-[#3A3A3A] mb-2"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {t(`timeline.events.${index}.title`)}
                      </h3>
                      <p
                        className="text-[#3A3A3A]/60"
                        style={{ fontFamily: "var(--font-nunito)" }}
                      >
                        {t(`timeline.events.${index}.description`)}
                      </p>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A5A5] to-[#9CAF88] items-center justify-center z-10 shadow-lg">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
