"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, UtensilsCrossed, Clock, Users } from "lucide-react";
import Image from "next/image";

const diningImages = [
  "/showcase/luxury-hotel/restaurant.jpg",
  "/showcase/luxury-hotel/lobby.jpg",
  "/showcase/luxury-hotel/spa.jpg",
  "/showcase/luxury-hotel/pool.jpg",
];

const diningOptions = [
  { id: "breakfast", icon: UtensilsCrossed },
  { id: "lunch", icon: Clock },
  { id: "dinner", icon: Users },
];

export function HotelDining() {
  const t = useTranslations("showcase.luxury-hotel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % diningImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + diningImages.length) % diningImages.length);
  };

  return (
    <section ref={ref} className="py-24 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-px bg-[#C9A962] mx-auto mb-6" />
          <h2
            className="text-4xl md:text-5xl font-light text-[#1A2A4A] mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("dining.title")}
          </h2>
          <p
            className="text-lg text-[#1A2A4A]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("dining.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {diningImages.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentImage ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image}
                    alt={`Dining ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}

              {/* Carousel Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevImage}
                  className="bg-white/90 backdrop-blur-sm border-none hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1A2A4A]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextImage}
                  className="bg-white/90 backdrop-blur-sm border-none hover:bg-white"
                >
                  <ChevronRight className="w-5 h-5 text-[#1A2A4A]" />
                </Button>
              </div>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {diningImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImage
                        ? "bg-[#C9A962] w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#C9A962]/30 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3
              className="text-3xl md:text-4xl font-light text-[#1A2A4A] mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("dining.restaurantName")}
            </h3>

            <p
              className="text-[#1A2A4A]/70 mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("dining.description")}
            </p>

            {/* Dining Options */}
            <div className="space-y-6 mb-8">
              {diningOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-[#C9A962]/30 flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#C9A962]" />
                    </div>
                    <div>
                      <h4
                        className="text-xl font-light text-[#1A2A4A] mb-1"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {t(`dining.${option.id}.title`)}
                      </h4>
                      <p
                        className="text-sm text-[#1A2A4A]/60"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {t(`dining.${option.id}.time`)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="bg-[#C9A962] hover:bg-[#B8954F] text-[#1A2A4A] font-medium px-8"
            >
              {t("dining.cta")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
