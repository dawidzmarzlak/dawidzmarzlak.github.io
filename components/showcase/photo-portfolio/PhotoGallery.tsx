"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const categories = ["All", "Portrait", "Landscape", "Commercial", "Events"];

const photos = [
  { src: "/showcase/photo-portfolio/gallery-1.jpg", category: "Portrait" },
  { src: "/showcase/photo-portfolio/gallery-2.jpg", category: "Landscape" },
  { src: "/showcase/photo-portfolio/gallery-3.jpg", category: "Commercial" },
  { src: "/showcase/photo-portfolio/gallery-4.jpg", category: "Portrait" },
  { src: "/showcase/photo-portfolio/gallery-5.jpg", category: "Events" },
  { src: "/showcase/photo-portfolio/gallery-6.jpg", category: "Landscape" },
  { src: "/showcase/photo-portfolio/gallery-7.jpg", category: "Commercial" },
  { src: "/showcase/photo-portfolio/gallery-8.jpg", category: "Portrait" },
  { src: "/showcase/photo-portfolio/gallery-9.jpg", category: "Events" },
  { src: "/showcase/photo-portfolio/gallery-10.jpg", category: "Landscape" },
  { src: "/showcase/photo-portfolio/gallery-11.jpg", category: "Portrait" },
  { src: "/showcase/photo-portfolio/gallery-12.jpg", category: "Commercial" },
];

export function PhotoGallery() {
  const t = useTranslations("showcase.photo-portfolio");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const filteredPhotos = activeCategory === "All"
    ? photos
    : photos.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("gallery.title")}
          </h2>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-transparent text-white/60 hover:text-white border border-white/20"
              }`}
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid - infinite scroll style */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={`${photo.src}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedPhoto(photo.src)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={photo.src}
                  alt={`Photo ${index + 1}`}
                  width={600}
                  height={400 + (index % 3) * 100}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium tracking-wide">
                    {photo.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedPhoto}
              alt="Selected photo"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
