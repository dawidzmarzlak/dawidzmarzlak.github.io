"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  { id: "client1", image: "/showcase/real-estate/property-1.jpg", rating: 5 },
  { id: "client2", image: "/showcase/real-estate/property-2.jpg", rating: 5 },
  { id: "client3", image: "/showcase/real-estate/property-3.jpg", rating: 5 },
  { id: "client4", image: "/showcase/real-estate/property-4.jpg", rating: 4 },
];

export function EstateTestimonials() {
  const t = useTranslations("showcase.real-estate.testimonials");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
    <section className="py-24 bg-gradient-to-b from-[#F8F6F3] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#C5A572]" />
            <span
              className="text-sm text-[#C5A572] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("label")}
            </span>
            <div className="w-12 h-px bg-[#C5A572]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-semibold text-[#0C1E3C] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#0C1E3C]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-[#C5A572]/20 hover:bg-[#C5A572] text-[#0C1E3C] hover:text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-[#C5A572]/20 hover:bg-[#C5A572] text-[#0C1E3C] hover:text-white flex items-center justify-center transition-colors"
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
                    className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#E5E5E5]"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Avatar */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#C5A572]/20">
                        <Image
                          src={testimonial.image}
                          alt={t(`reviews.${testimonial.id}.name`)}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        {/* Quote icon */}
                        <Quote className="w-10 h-10 text-[#C5A572]/30 mb-4 mx-auto md:mx-0" />

                        {/* Quote */}
                        <blockquote
                          className="text-lg md:text-xl text-[#0C1E3C] leading-relaxed mb-6"
                          style={{ fontFamily: "var(--font-source-sans)" }}
                        >
                          &ldquo;{t(`reviews.${testimonial.id}.quote`)}&rdquo;
                        </blockquote>

                        {/* Rating */}
                        <div className="flex gap-1 justify-center md:justify-start mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "fill-[#C5A572] text-[#C5A572]"
                                  : "text-[#E5E5E5]"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Author */}
                        <div>
                          <p
                            className="text-lg text-[#0C1E3C] font-semibold"
                            style={{ fontFamily: "var(--font-poppins)" }}
                          >
                            {t(`reviews.${testimonial.id}.name`)}
                          </p>
                          <p
                            className="text-sm text-[#C5A572]"
                            style={{ fontFamily: "var(--font-source-sans)" }}
                          >
                            {t(`reviews.${testimonial.id}.property`)}
                          </p>
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
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === index ? "w-8 bg-[#C5A572]" : "bg-[#E5E5E5]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
