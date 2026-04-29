"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const galleryImages = [
  { src: "/showcase/luxury-hotel/lobby.jpg", tall: true },
  { src: "/showcase/luxury-hotel/room-1.jpg", tall: false },
  { src: "/showcase/luxury-hotel/pool.jpg", tall: false },
  { src: "/showcase/luxury-hotel/room-2.jpg", tall: true },
  { src: "/showcase/luxury-hotel/spa.jpg", tall: false },
  { src: "/showcase/luxury-hotel/room-3.jpg", tall: true },
  { src: "/showcase/luxury-hotel/restaurant.jpg", tall: false },
  { src: "/showcase/luxury-hotel/hero.jpg", tall: false },
];

export function HotelGallery() {
  const t = useTranslations("showcase.luxury-hotel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <>
      <section ref={ref} className="py-24 bg-white">
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
              {t("gallery.title")}
            </h2>
            <p
              className="text-lg text-[#1A2A4A]/60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("gallery.subtitle")}
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden bg-[#F5F1E8]">
                  <div className={`relative ${image.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <Image
                      src={image.src}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#1A2A4A]/0 group-hover:bg-[#1A2A4A]/20 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:bg-white/10 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:bg-white/10 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={`Gallery ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
