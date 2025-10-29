"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    id: 1,
    name: "Anna Kowalska",
    role: "CEO, FashionHub",
    content: "Strona przekroczyła nasze oczekiwania! Błyskawiczna wydajność i piękny design przełożyły się na znaczący wzrost sprzedaży.",
    rating: 5,
    initials: "AK"
  },
  {
    id: 2,
    name: "Piotr Nowak",
    role: "Head of Marketing, TechCorp",
    content: "Profesjonalizm na najwyższym poziomie. Strona spełnia wszystkie nasze wymagania i jest łatwa w zarządzaniu.",
    rating: 5,
    initials: "PN"
  },
  {
    id: 3,
    name: "Dr. Katarzyna Wiśniewska",
    role: "Dyrektor Medyczny, MediClinic",
    content: "System zrewolucjonizował naszą pracę. Pacjenci uwielbiają możliwość rezerwacji online i dostępu do wyników.",
    rating: 5,
    initials: "KW"
  }
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  // Embla Carousel setup with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      autoplay.current.reset();
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      autoplay.current.reset();
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        autoplay.current.reset();
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  // Update selected index and reset autoplay on user interaction
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Handle pointer/drag interactions to reset autoplay
  const onPointerDownRef = useRef(() => {
    autoplay.current.reset();
  });

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDownRef.current);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDownRef.current);
    };
  }, [emblaApi, onSelect]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex pb-4">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="max-w-3xl mx-auto"
                  >
                    <Card className="h-full shadow-lg">
                      <CardContent className="pt-8 pb-8">
                        {/* Quote Icon */}
                        <Quote className="w-12 h-12 text-primary/20 mb-6 mx-auto" />

                        {/* Content */}
                        <p className="text-muted-foreground mb-8 italic text-lg text-center">
                          "{testimonial.content}"
                        </p>

                        {/* Rating */}
                        <div className="flex gap-1 mb-8 justify-center">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-500 text-2xl">★</span>
                          ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4 justify-center">
                          <Avatar className="h-14 w-14">
                            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                              {testimonial.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-lg">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background border border-border rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background border border-border rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
