"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { SaasDashboardContent } from "@/lib/showcase/saas-dashboard/template.config";

export function SaasTestimonials() {
  const theme = useTheme();
  const c = useContent<SaasDashboardContent["testimonials"]>("testimonials");
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
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: theme.palette.bg }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{ backgroundColor: withAlpha(theme.palette.accent, 5) }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
          >
            {c.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
          >
            {c.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:border-opacity-100"
            style={{
              backgroundColor: theme.palette.surface,
              border: `1px solid ${theme.palette.surfaceLight}`,
              color: theme.palette.fg,
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:border-opacity-100"
            style={{
              backgroundColor: theme.palette.surface,
              border: `1px solid ${theme.palette.surfaceLight}`,
              color: theme.palette.fg,
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden px-16" ref={emblaRef}>
            <div className="flex">
              {c.items.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0.3 }}
                    className="backdrop-blur-sm rounded-2xl p-8 md:p-12"
                    style={{
                      backgroundColor: withAlpha(theme.palette.surface, 50),
                      border: `1px solid ${theme.palette.surfaceLight}`,
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Avatar */}
                      <div className="relative">
                        <div
                          className="w-20 h-20 rounded-2xl overflow-hidden"
                          style={{ boxShadow: `0 0 0 4px ${withAlpha(theme.palette.accent, 20)}` }}
                        >
                          <Image
                            src={testimonial.avatarSrc}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Glow effect */}
                        <div
                          className="absolute -inset-2 rounded-3xl blur-xl -z-10"
                          style={{
                            background: `linear-gradient(to right, ${withAlpha(theme.palette.accent, 20)}, ${withAlpha(theme.palette.accentTertiary, 20)})`,
                          }}
                        />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        {/* Quote icon */}
                        <Quote
                          className="w-10 h-10 mb-4 mx-auto md:mx-0"
                          style={{ color: withAlpha(theme.palette.accent, 30) }}
                        />

                        {/* Quote */}
                        <blockquote
                          className="text-lg md:text-xl leading-relaxed mb-6"
                          style={{ fontFamily: theme.fonts.body, color: theme.palette.fg }}
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        {/* Rating */}
                        <div className="flex gap-1 justify-center md:justify-start mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4"
                              style={
                                i < testimonial.rating
                                  ? { fill: theme.palette.warning, color: theme.palette.warning }
                                  : { color: theme.palette.surfaceLight }
                              }
                            />
                          ))}
                        </div>

                        {/* Author */}
                        <div>
                          <p
                            className="text-lg font-semibold"
                            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
                          >
                            {testimonial.name}
                          </p>
                          <p
                            className="text-sm"
                            style={{ fontFamily: theme.fonts.body, color: theme.palette.accent }}
                          >
                            {testimonial.role}
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
            {c.items.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => emblaApi?.scrollTo(index)}
                className="h-2 rounded-full transition-all"
                style={{
                  width: selectedIndex === index ? "2rem" : "0.5rem",
                  background:
                    selectedIndex === index
                      ? `linear-gradient(to right, ${theme.palette.accent}, ${theme.palette.accentSecondary})`
                      : theme.palette.surfaceLight,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
