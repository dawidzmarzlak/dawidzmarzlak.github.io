"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const transformations = [
  {
    id: "john",
    beforeImage: "/showcase/fitness-studio/hero.jpg",
    afterImage: "/showcase/fitness-studio/gym.jpg",
    duration: "6 months",
    weightLost: "25 kg",
  },
  {
    id: "lisa",
    beforeImage: "/showcase/fitness-studio/trainer-1.jpg",
    afterImage: "/showcase/fitness-studio/trainer-2.jpg",
    duration: "4 months",
    weightLost: "15 kg",
  },
  {
    id: "mike",
    beforeImage: "/showcase/fitness-studio/class-hiit.jpg",
    afterImage: "/showcase/fitness-studio/class-yoga.jpg",
    duration: "8 months",
    weightLost: "30 kg",
  },
];

export function FitnessResults() {
  const t = useTranslations("showcase.fitness-studio.results");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const currentTransformation = transformations[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? transformations.length - 1 : prev - 1));
    setSliderPosition(50);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === transformations.length - 1 ? 0 : prev + 1));
    setSliderPosition(50);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-normal text-white mb-4 uppercase tracking-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#666666]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Before/After comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1A1A1A]">
              {/* After image (full) */}
              <Image
                src={currentTransformation.afterImage}
                alt="After"
                fill
                className="object-cover"
              />

              {/* Before image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={currentTransformation.beforeImage}
                  alt="Before"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#CCFF00] z-10"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#CCFF00] rounded-full flex items-center justify-center">
                  <div className="flex gap-1">
                    <ChevronLeft className="w-4 h-4 text-[#0A0A0A]" />
                    <ChevronRight className="w-4 h-4 text-[#0A0A0A]" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A0A0A]/80 text-white text-sm uppercase" style={{ fontFamily: "var(--font-bebas)" }}>
                {t("before")}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#CCFF00] text-[#0A0A0A] text-sm uppercase" style={{ fontFamily: "var(--font-bebas)" }}>
                {t("after")}
              </div>

              {/* Slider input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-[#1A1A1A] hover:bg-[#CCFF00] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-[#1A1A1A] hover:bg-[#CCFF00] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Quote icon */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#CCFF00]/10 flex items-center justify-center">
              <Quote className="w-8 h-8 text-[#CCFF00]" />
            </div>

            <div className="bg-[#1A1A1A] p-8 md:p-12 border border-[#333333]">
              {/* Stats */}
              <div className="flex gap-8 mb-8">
                <div>
                  <p
                    className="text-4xl text-[#CCFF00]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {currentTransformation.weightLost}
                  </p>
                  <p
                    className="text-xs text-[#666666] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("weightLost")}
                  </p>
                </div>
                <div>
                  <p
                    className="text-4xl text-[#CCFF00]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {currentTransformation.duration}
                  </p>
                  <p
                    className="text-xs text-[#666666] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("duration")}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote
                className="text-xl text-white leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                &ldquo;{t(`stories.${currentTransformation.id}.quote`)}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p
                  className="text-lg text-white uppercase"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {t(`stories.${currentTransformation.id}.name`)}
                </p>
                <p
                  className="text-sm text-[#666666]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t(`stories.${currentTransformation.id}.program`)}
                </p>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSliderPosition(50);
                  }}
                  className={`w-3 h-3 transition-colors ${
                    index === currentIndex ? "bg-[#CCFF00]" : "bg-[#333333]"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
