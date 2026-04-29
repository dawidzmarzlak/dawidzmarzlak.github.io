"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import { X, ChevronLeft, ChevronRight, Leaf, ZoomIn } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  { src: "/showcase/spa-wellness/hero.jpg", category: "spa" },
  { src: "/showcase/spa-wellness/wellness-1.jpg", category: "treatments" },
  { src: "/showcase/spa-wellness/wellness-2.jpg", category: "treatments" },
  { src: "/showcase/spa-wellness/wellness-3.jpg", category: "relaxation" },
  { src: "/showcase/spa-wellness/wellness-4.jpg", category: "spa" },
  { src: "/showcase/spa-wellness/wellness-5.jpg", category: "relaxation" },
  { src: "/showcase/spa-wellness/wellness-6.jpg", category: "treatments" },
  { src: "/showcase/spa-wellness/wellness-7.jpg", category: "spa" },
];

export function SpaGallery() {
  const t = useTranslations("showcase.spa-wellness.gallery");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: selectedIndex });

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.scrollTo(selectedIndex, true);
    }
  }, [emblaApi, isOpen, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, scrollPrev, scrollNext]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <section className="py-24 bg-[#FEFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className={`relative ${index % 5 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                  <Image
                    src={image.src}
                    alt={`Spa gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#9CAF88]/0 group-hover:bg-[#9CAF88]/30 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-[#9CAF88]" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3A3A3A]/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); scrollNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div
              className="w-full h-full max-w-5xl max-h-[80vh] mx-auto px-16"
              ref={emblaRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full items-center">
                {galleryImages.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center px-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === selectedIndex}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 text-white/60 text-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
