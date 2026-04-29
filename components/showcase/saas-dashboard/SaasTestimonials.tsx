"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  { id: "customer1", image: "/showcase/saas-dashboard/testimonial-1.jpg", rating: 5 },
  { id: "customer2", image: "/showcase/saas-dashboard/testimonial-2.jpg", rating: 5 },
  { id: "customer3", image: "/showcase/saas-dashboard/testimonial-3.jpg", rating: 5 },
];

export function SaasTestimonials() {
  const t = useTranslations("showcase.saas-dashboard.testimonials");
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
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#1E293B] border border-[#334155] hover:border-[#6366F1] text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#1E293B] border border-[#334155] hover:border-[#6366F1] text-white flex items-center justify-center transition-colors"
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
                    className="bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl border border-[#334155] p-8 md:p-12"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-[#6366F1]/20">
                          <Image
                            src={testimonial.image}
                            alt={t(`reviews.${testimonial.id}.name`)}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#6366F1]/20 to-[#06B6D4]/20 rounded-3xl blur-xl -z-10" />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        {/* Quote icon */}
                        <Quote className="w-10 h-10 text-[#6366F1]/30 mb-4 mx-auto md:mx-0" />

                        {/* Quote */}
                        <blockquote
                          className="text-lg md:text-xl text-white leading-relaxed mb-6"
                          style={{ fontFamily: "var(--font-plus-jakarta)" }}
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
                                  ? "fill-[#FFE66D] text-[#FFE66D]"
                                  : "text-[#334155]"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Author */}
                        <div>
                          <p
                            className="text-lg text-white font-semibold"
                            style={{ fontFamily: "var(--font-urbanist)" }}
                          >
                            {t(`reviews.${testimonial.id}.name`)}
                          </p>
                          <p
                            className="text-sm text-[#6366F1]"
                            style={{ fontFamily: "var(--font-plus-jakarta)" }}
                          >
                            {t(`reviews.${testimonial.id}.role`)}
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
                  selectedIndex === index
                    ? "w-8 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                    : "bg-[#334155]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
