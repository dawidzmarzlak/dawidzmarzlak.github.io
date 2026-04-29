"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  { id: "client1", image: "/showcase/creative-agency/testimonial-1.jpg", color: "#FF6B6B" },
  { id: "client2", image: "/showcase/creative-agency/testimonial-2.jpg", color: "#4ECDC4" },
  { id: "client3", image: "/showcase/creative-agency/testimonial-3.jpg", color: "#FFE66D" },
];

export function AgencyTestimonials() {
  const t = useTranslations("showcase.creative-agency.testimonials");
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#1A1A2E]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-[#1A1A2E] hover:bg-[#FF6B6B] text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-[#1A1A2E] hover:bg-[#FF6B6B] text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden px-20" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0.3 }}
                    className="relative rounded-3xl overflow-hidden"
                    style={{ backgroundColor: `${testimonial.color}10` }}
                  >
                    {/* Decorative shape */}
                    <div
                      className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/2"
                      style={{ backgroundColor: `${testimonial.color}30` }}
                    />

                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                      {/* Avatar */}
                      <div className="relative">
                        <div
                          className="w-28 h-28 rounded-2xl rotate-6 absolute -top-2 -left-2"
                          style={{ backgroundColor: testimonial.color }}
                        />
                        <div className="relative w-28 h-28 rounded-2xl overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={t(`reviews.${testimonial.id}.name`)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        {/* Quote icon */}
                        <Quote
                          className="w-12 h-12 mb-4 mx-auto md:mx-0"
                          style={{ color: testimonial.color }}
                        />

                        {/* Quote */}
                        <blockquote
                          className="text-xl md:text-2xl text-[#1A1A2E] leading-relaxed mb-6"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          &ldquo;{t(`reviews.${testimonial.id}.quote`)}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div>
                          <p
                            className="text-lg font-bold text-[#1A1A2E]"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {t(`reviews.${testimonial.id}.name`)}
                          </p>
                          <p
                            className="text-sm"
                            style={{ fontFamily: "var(--font-dm-sans)", color: testimonial.color }}
                          >
                            {t(`reviews.${testimonial.id}.company`)}
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
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  selectedIndex === index
                    ? "w-10"
                    : "bg-[#1A1A2E]/20"
                }`}
                style={{
                  backgroundColor: selectedIndex === index ? testimonial.color : undefined
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
