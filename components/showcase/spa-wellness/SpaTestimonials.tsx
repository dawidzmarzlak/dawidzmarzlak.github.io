"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star, Leaf } from "lucide-react";
import Image from "next/image";

const testimonials = [
  { id: "guest1", image: "/showcase/spa-wellness/wellness-1.jpg", rating: 5 },
  { id: "guest2", image: "/showcase/spa-wellness/wellness-2.jpg", rating: 5 },
  { id: "guest3", image: "/showcase/spa-wellness/wellness-3.jpg", rating: 5 },
  { id: "guest4", image: "/showcase/spa-wellness/wellness-4.jpg", rating: 4 },
];

export function SpaTestimonials() {
  const t = useTranslations("showcase.spa-wellness.testimonials");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
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
    <section className="py-24 bg-[#FEFEFE] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#9CAF88]" />
            <Leaf className="w-5 h-5 text-[#9CAF88]" />
            <div className="w-12 h-px bg-[#9CAF88]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-[#3A3A3A] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#3A3A3A]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-[#9CAF88] text-[#3A3A3A] hover:text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-[#9CAF88] text-[#3A3A3A] hover:text-white flex items-center justify-center transition-colors"
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
                    className="bg-[#F5F0E8] rounded-3xl p-8 md:p-12"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Avatar */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#9CAF88]/20">
                        <Image
                          src={testimonial.image}
                          alt={t(`reviews.${testimonial.id}.name`)}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        {/* Quote icon */}
                        <Quote className="w-10 h-10 text-[#9CAF88]/30 mb-4 mx-auto md:mx-0" />

                        {/* Quote */}
                        <blockquote
                          className="text-lg md:text-xl text-[#3A3A3A] leading-relaxed mb-6 italic"
                          style={{ fontFamily: "var(--font-nunito)" }}
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
                                  ? "fill-[#9CAF88] text-[#9CAF88]"
                                  : "text-[#E8DFD0]"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Author */}
                        <div>
                          <p
                            className="text-lg text-[#3A3A3A] font-medium"
                            style={{ fontFamily: "var(--font-nunito)" }}
                          >
                            {t(`reviews.${testimonial.id}.name`)}
                          </p>
                          <p
                            className="text-sm text-[#9CAF88]"
                            style={{ fontFamily: "var(--font-nunito)" }}
                          >
                            {t(`reviews.${testimonial.id}.treatment`)}
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
                  selectedIndex === index ? "w-8 bg-[#9CAF88]" : "bg-[#E8DFD0]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
