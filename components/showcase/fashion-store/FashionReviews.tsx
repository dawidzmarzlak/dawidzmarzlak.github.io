"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    key: "review1",
    rating: 5,
    date: "2025-01-10",
    verified: true,
  },
  {
    key: "review2",
    rating: 5,
    date: "2025-01-05",
    verified: true,
  },
  {
    key: "review3",
    rating: 4,
    date: "2024-12-28",
    verified: true,
  },
  {
    key: "review4",
    rating: 5,
    date: "2024-12-20",
    verified: true,
  },
];

export function FashionReviews() {
  const t = useTranslations("showcase.fashion-store.reviews");
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Average rating */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#D4A5A5] text-[#D4A5A5]"
                />
              ))}
            </div>
            <p
              className="text-sm text-[#666666]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              4.9 {t("outOf")} 5 ({t("basedOn")} 248 {t("reviewsCount")})
            </p>
          </div>
        </motion.div>

        {/* Review Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Review Card */}
          <div className="bg-white p-8 md:p-12 max-w-3xl mx-auto relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-[#D4A5A5] rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentReview.rating
                        ? "fill-[#D4A5A5] text-[#D4A5A5]"
                        : "fill-[#E5E5E5] text-[#E5E5E5]"
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p
                className="text-lg text-[#0A0A0A] mb-6 leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                "{t(`${currentReview.key}.text`)}"
              </p>

              {/* Reviewer info */}
              <div className="flex items-center justify-between pt-6 border-t border-[#E5E5E5]">
                <div>
                  <p
                    className="text-sm font-medium text-[#0A0A0A]"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {t(`${currentReview.key}.name`)}
                  </p>
                  <p
                    className="text-xs text-[#999999] mt-1"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {t(`${currentReview.key}.product`)}
                  </p>
                </div>
                {currentReview.verified && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#D4A5A5] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-xs text-[#999999]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {t("verified")}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="w-12 h-12 border border-[#E5E5E5] hover:border-[#D4A5A5] hover:bg-[#D4A5A5]/10 rounded-full flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#0A0A0A]" />
            </button>
            <button
              onClick={nextReview}
              className="w-12 h-12 border border-[#E5E5E5] hover:border-[#D4A5A5] hover:bg-[#D4A5A5]/10 rounded-full flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5 text-[#0A0A0A]" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#D4A5A5] w-8"
                    : "bg-[#E5E5E5] hover:bg-[#D4A5A5]/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
