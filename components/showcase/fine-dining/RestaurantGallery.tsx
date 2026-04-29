"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    src: "/showcase/fine-dining/gallery-1.jpg",
    alt: "Signature Wagyu Dish",
    category: "dishes",
  },
  {
    src: "/showcase/fine-dining/gallery-2.jpg",
    alt: "Restaurant Interior",
    category: "interior",
  },
  {
    src: "/showcase/fine-dining/gallery-3.jpg",
    alt: "Black Truffle Risotto",
    category: "dishes",
  },
  {
    src: "/showcase/fine-dining/gallery-4.jpg",
    alt: "Private Dining Room",
    category: "interior",
  },
  {
    src: "/showcase/fine-dining/gallery-5.jpg",
    alt: "Chocolate Soufflé",
    category: "dishes",
  },
  {
    src: "/showcase/fine-dining/gallery-6.jpg",
    alt: "Bar Area",
    category: "interior",
  },
  {
    src: "/showcase/fine-dining/gallery-7.jpg",
    alt: "Lobster Thermidor",
    category: "dishes",
  },
  {
    src: "/showcase/fine-dining/gallery-8.jpg",
    alt: "Main Dining Hall",
    category: "interior",
  },
];

export function RestaurantGallery() {
  const t = useTranslations("showcase.fine-dining");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "dishes" | "interior">("all");

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex(
        (_, index) => index === selectedImage
      );
      const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
      setSelectedImage(prevIndex);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex(
        (_, index) => index === selectedImage
      );
      const nextIndex =
        currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(nextIndex);
    }
  };

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#D4AF37]/50" />
            <div className="w-2 h-2 rotate-45 border border-[#D4AF37]/50" />
            <div className="w-12 h-px bg-[#D4AF37]/50" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("gallery.title")}
          </h2>
          <p
            className="text-lg text-white/50"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {(["all", "dishes", "interior"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 ${
                filter === category
                  ? "bg-[#722F37] text-white border border-[#722F37]"
                  : "text-white/50 border border-white/20 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
              }`}
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t(`gallery.filters.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative aspect-square group cursor-pointer overflow-hidden"
                onClick={() => setSelectedImage(galleryImages.indexOf(image))}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p
                    className="text-white text-sm"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-[#D4AF37] transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#D4AF37] transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft size={48} />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#D4AF37] transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={48} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p
                  className="text-white text-lg text-center"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {galleryImages[selectedImage].alt}
                </p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              <span style={{ fontFamily: "var(--font-lato)" }}>
                {selectedImage + 1} / {galleryImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
