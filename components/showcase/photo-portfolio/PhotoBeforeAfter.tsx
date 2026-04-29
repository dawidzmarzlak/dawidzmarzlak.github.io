"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import Image from "next/image";

interface ComparisonImage {
  before: string;
  after: string;
  title: string;
}

const comparisons: ComparisonImage[] = [
  {
    before: "/showcase/photo-portfolio/before-1.jpg",
    after: "/showcase/photo-portfolio/after-1.jpg",
    title: "Portrait Retouching",
  },
  {
    before: "/showcase/photo-portfolio/before-2.jpg",
    after: "/showcase/photo-portfolio/after-2.jpg",
    title: "Color Grading",
  },
  {
    before: "/showcase/photo-portfolio/before-3.jpg",
    after: "/showcase/photo-portfolio/after-3.jpg",
    title: "Product Photography",
  },
];

function BeforeAfterSlider({ comparison }: { comparison: ComparisonImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] overflow-hidden rounded-lg cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After image (full width, underneath) */}
      <div className="absolute inset-0">
        <Image
          src={comparison.after}
          alt="After"
          fill
          className="object-cover"
        />
        {/* Label */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-white text-black text-sm font-medium rounded-full">
          After
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: `${100 / (sliderPosition / 100)}%` }}>
          <Image
            src={comparison.before}
            alt="Before"
            fill
            className="object-cover"
          />
        </div>
        {/* Label */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black text-white text-sm font-medium rounded-full">
          Before
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-black/50 rounded-full" />
            <div className="w-0.5 h-4 bg-black/50 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhotoBeforeAfter() {
  const t = useTranslations("showcase.photo-portfolio");

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("beforeAfter.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("beforeAfter.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <BeforeAfterSlider comparison={comparison} />
              <h3
                className="mt-4 text-lg text-white text-center"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {comparison.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
