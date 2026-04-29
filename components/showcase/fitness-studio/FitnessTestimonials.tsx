"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  { id: "member1", image: "/showcase/fitness-studio/trainer-1.jpg", rating: 5 },
  { id: "member2", image: "/showcase/fitness-studio/trainer-2.jpg", rating: 5 },
  { id: "member3", image: "/showcase/fitness-studio/hero.jpg", rating: 5 },
  { id: "member4", image: "/showcase/fitness-studio/gym.jpg", rating: 4 },
];

export function FitnessTestimonials() {
  const t = useTranslations("showcase.fitness-studio.testimonials");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
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
    <section className="py-24 bg-[#0A0A0A] overflow-hidden">
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

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#1A1A1A] hover:bg-[#CCFF00] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#1A1A1A] hover:bg-[#CCFF00] text-white hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden px-16" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0.3 }}
                    className="bg-[#1A1A1A] border border-[#333333] p-8 md:p-12"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Avatar */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={t(`reviews.${testimonial.id}.name`)}
                          fill
                          className="object-cover"
                        />
                        {/* Quote icon */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#CCFF00] flex items-center justify-center">
                          <Quote className="w-4 h-4 text-[#0A0A0A]" />
                        </div>
                      </div>

                      <div className="flex-1">
                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonial.rating
                                  ? "fill-[#CCFF00] text-[#CCFF00]"
                                  : "text-[#333333]"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote
                          className="text-lg md:text-xl text-white leading-relaxed mb-6"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          &ldquo;{t(`reviews.${testimonial.id}.quote`)}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                          <div>
                            <p
                              className="text-lg text-white uppercase"
                              style={{ fontFamily: "var(--font-bebas)" }}
                            >
                              {t(`reviews.${testimonial.id}.name`)}
                            </p>
                            <p
                              className="text-sm text-[#CCFF00]"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {t(`reviews.${testimonial.id}.membership`)}
                            </p>
                          </div>
                        </div>
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
                className={`w-3 h-3 transition-all ${
                  selectedIndex === index ? "w-8 bg-[#CCFF00]" : "bg-[#333333]"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
