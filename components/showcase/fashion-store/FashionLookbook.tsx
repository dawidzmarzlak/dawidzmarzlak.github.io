"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const lookbookImages = [
  { src: "/showcase/fashion-store/lookbook-1.jpg", aspect: "tall" },
  { src: "/showcase/fashion-store/lookbook-2.jpg", aspect: "wide" },
  { src: "/showcase/fashion-store/lookbook-3.jpg", aspect: "square" },
  { src: "/showcase/fashion-store/lookbook-4.jpg", aspect: "tall" },
  { src: "/showcase/fashion-store/lookbook-5.jpg", aspect: "square" },
  { src: "/showcase/fashion-store/lookbook-6.jpg", aspect: "wide" },
];

export function FashionLookbook() {
  const t = useTranslations("showcase.fashion-store.lookbook");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-light text-[#0A0A0A] mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#666666]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {lookbookImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative cursor-pointer overflow-hidden ${
                image.aspect === "tall"
                  ? "row-span-2"
                  : image.aspect === "wide"
                  ? "col-span-2"
                  : ""
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={image.src}
                  alt={`Lookbook ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/40 transition-colors duration-500 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-[#0A0A0A]" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lookbookImages[selectedImage].src}
              alt={`Lookbook ${selectedImage + 1}`}
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {lookbookImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImage
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
