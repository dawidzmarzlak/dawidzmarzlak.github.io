"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: "guest1",
    rating: 5,
    verified: true,
  },
  {
    id: "guest2",
    rating: 5,
    verified: true,
  },
  {
    id: "guest3",
    rating: 5,
    verified: true,
  },
  {
    id: "guest4",
    rating: 4,
    verified: true,
  },
];

export function HotelReviews() {
  const t = useTranslations("showcase.luxury-hotel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
            {t("reviews.title")}
          </h2>
          <p
            className="text-lg text-white/60"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("reviews.subtitle")}
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-16 h-16 text-[#C9A962]" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-[#C9A962] text-[#C9A962]"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <blockquote
                className="text-white/80 mb-6 leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                "{t(`reviews.${review.id}.quote`)}"
              </blockquote>

              {/* Guest info */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div>
                  <p
                    className="text-white font-medium mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {t(`reviews.${review.id}.name`)}
                  </p>
                  <p
                    className="text-sm text-white/50"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t(`reviews.${review.id}.stay`)}
                  </p>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-2 text-[#C9A962] text-sm">
                    <div className="w-5 h-5 rounded-full border border-[#C9A962] flex items-center justify-center">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span style={{ fontFamily: "var(--font-inter)" }}>
                      {t("reviews.verified")}
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-[#C9A962]/20" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 pt-16 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {["rating", "reviews", "recommend", "excellence"].map((stat, index) => (
              <motion.div
                key={stat}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-4xl md:text-5xl font-light text-[#C9A962] mb-2"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {t(`reviews.stats.${stat}.value`)}
                </div>
                <p
                  className="text-sm text-white/60"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t(`reviews.stats.${stat}.label`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
