"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  image?: string;
  content: string;
  rating?: number;
}

interface TestimonialsCarouselProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  theme?: "light" | "dark";
  accentColor?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

export function TestimonialsCarousel({
  title,
  subtitle,
  testimonials,
  theme = "light",
  accentColor = "#3B82F6",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
}: TestimonialsCarouselProps) {
  const isDark = theme === "dark";
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : []
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className={`py-24 overflow-hidden ${
        isDark ? "bg-[#0A0A0A]" : "bg-gray-50"
      } ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden px-12" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: selectedIndex === index ? 1 : 0.5,
                      scale: selectedIndex === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`rounded-2xl p-8 md:p-12 ${
                      isDark ? "bg-gray-900" : "bg-white shadow-xl"
                    }`}
                  >
                    {/* Quote Icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${accentColor}20` }}
                    >
                      <Quote className="w-6 h-6" style={{ color: accentColor }} />
                    </div>

                    {/* Rating */}
                    {testimonial.rating && (
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating!
                                ? "fill-yellow-400 text-yellow-400"
                                : isDark
                                ? "text-gray-700"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Content */}
                    <p
                      className={`text-lg md:text-xl leading-relaxed mb-8 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {testimonial.image ? (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                          style={{ backgroundColor: accentColor }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p
                          className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {testimonial.name}
                        </p>
                        {(testimonial.role || testimonial.company) && (
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-500" : "text-gray-600"
                            }`}
                          >
                            {testimonial.role}
                            {testimonial.role && testimonial.company && " · "}
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === index
                    ? "w-8"
                    : isDark
                    ? "bg-gray-700"
                    : "bg-gray-300"
                }`}
                style={{
                  backgroundColor:
                    selectedIndex === index ? accentColor : undefined,
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
