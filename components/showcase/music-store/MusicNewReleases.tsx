"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";

const releases = [
  {
    id: 1,
    title: "Retro Wave",
    artist: "Sunset Drive",
    price: "$28.99",
    image: "/showcase/music-store/release-1.jpg",
    isNew: true,
  },
  {
    id: 2,
    title: "Analog Heart",
    artist: "The Romantics",
    price: "$32.99",
    image: "/showcase/music-store/release-2.jpg",
    isNew: true,
  },
  {
    id: 3,
    title: "Bass Culture",
    artist: "Dub Masters",
    price: "$25.99",
    image: "/showcase/music-store/release-3.jpg",
    isNew: false,
  },
  {
    id: 4,
    title: "Northern Soul",
    artist: "Manchester Sound",
    price: "$36.99",
    image: "/showcase/music-store/release-4.jpg",
    isNew: true,
  },
  {
    id: 5,
    title: "Tokyo Nights",
    artist: "City Pop Revival",
    price: "$29.99",
    image: "/showcase/music-store/release-5.jpg",
    isNew: false,
  },
  {
    id: 6,
    title: "Desert Rock",
    artist: "Palm Springs",
    price: "$31.99",
    image: "/showcase/music-store/release-6.jpg",
    isNew: true,
  },
];

export function MusicNewReleases() {
  const t = useTranslations("showcase.music-store");

  return (
    <section className="py-24 bg-[#FFF5E6]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-4"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {t("releases.title")}
          </h2>
          <p
            className="text-lg text-[#8B4513] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {t("releases.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-[#E8DCC8]">
                <Image
                  src={release.image}
                  alt={release.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* New badge */}
                {release.isNew && (
                  <div
                    className="absolute top-2 left-2 px-2 py-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    NEW
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Vinyl peek effect */}
                <motion.div
                  className="absolute -right-6 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#1A1A1A] opacity-0 group-hover:opacity-100 group-hover:right-[-20px] transition-all duration-500"
                >
                  <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#FF6B35]" />
                </motion.div>
              </div>

              <h3
                className="font-bold text-[#1A1A1A] truncate"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                {release.title}
              </h3>
              <p
                className="text-sm text-[#8B4513] truncate"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                {release.artist}
              </p>
              <p
                className="text-lg font-bold text-[#FF6B35] mt-1"
                style={{ fontFamily: "var(--font-archivo-black)" }}
              >
                {release.price}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            className="px-8 py-4 border-2 border-[#8B4513] text-[#8B4513] rounded-full hover:bg-[#8B4513] hover:text-white transition-colors font-semibold"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {t("releases.viewAll")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
