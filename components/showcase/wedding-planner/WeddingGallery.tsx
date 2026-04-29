"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/showcase/wedding-planner/gallery-1.jpg", span: "col-span-2 row-span-2" },
  { src: "/showcase/wedding-planner/gallery-2.jpg", span: "col-span-1 row-span-1" },
  { src: "/showcase/wedding-planner/gallery-3.jpg", span: "col-span-1 row-span-1" },
  { src: "/showcase/wedding-planner/gallery-4.jpg", span: "col-span-1 row-span-2" },
  { src: "/showcase/wedding-planner/gallery-5.jpg", span: "col-span-1 row-span-1" },
  { src: "/showcase/wedding-planner/gallery-6.jpg", span: "col-span-2 row-span-1" },
  { src: "/showcase/wedding-planner/gallery-7.jpg", span: "col-span-1 row-span-1" },
  { src: "/showcase/wedding-planner/gallery-8.jpg", span: "col-span-1 row-span-1" },
];

export function WeddingGallery() {
  const t = useTranslations("showcase.wedding-planner");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#F5EDE8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl text-[#3A3A3A] mb-4"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {t("gallery.title")}
          </h2>
          <p
            className="text-lg text-[#3A3A3A]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group ${image.span}`}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={`Wedding photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#D4A5A5]/0 group-hover:bg-[#D4A5A5]/30 transition-colors flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-[#D4A5A5] text-2xl">+</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-5xl max-h-[80vh] aspect-video">
            <Image
              src={selectedImage}
              alt="Selected wedding photo"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
