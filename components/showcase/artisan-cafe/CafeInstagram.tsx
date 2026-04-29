"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

const instagramPosts = [
  {
    id: 1,
    image: "/showcase/artisan-cafe/insta-1.jpg",
    likes: 342,
    comments: 28,
  },
  {
    id: 2,
    image: "/showcase/artisan-cafe/insta-2.jpg",
    likes: 589,
    comments: 45,
  },
  {
    id: 3,
    image: "/showcase/artisan-cafe/insta-3.jpg",
    likes: 421,
    comments: 33,
  },
  {
    id: 4,
    image: "/showcase/artisan-cafe/insta-4.jpg",
    likes: 756,
    comments: 67,
  },
  {
    id: 5,
    image: "/showcase/artisan-cafe/insta-5.jpg",
    likes: 298,
    comments: 19,
  },
  {
    id: 6,
    image: "/showcase/artisan-cafe/insta-6.jpg",
    likes: 634,
    comments: 52,
  },
];

export function CafeInstagram() {
  const t = useTranslations("showcase.artisan-cafe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C65D3B] to-[#6B7B3C] flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-normal text-[#5C4033]"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              {t("instagram.title")}
            </h2>
          </div>

          <p
            className="text-2xl text-[#C65D3B] mb-2"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {t("instagram.handle")}
          </p>

          <p
            className="text-lg text-[#5C4033]/60"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("instagram.subtitle")}
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05,
                type: "spring"
              }}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
            >
              {/* Image */}
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/90 via-[#5C4033]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  className="flex items-center gap-6 text-white"
                >
                  {/* Likes */}
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 fill-white" />
                    <span
                      className="text-lg font-medium"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {post.likes}
                    </span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-6 h-6" />
                    <span
                      className="text-lg font-medium"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {post.comments}
                    </span>
                  </div>
                </motion.div>

                {/* View on Instagram text */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 text-white/80 text-sm"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {t("instagram.viewPost")}
                </motion.p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-8 h-1 bg-white/60 rounded" />
                <div className="absolute top-0 right-0 w-1 h-8 bg-white/60 rounded" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#C65D3B] to-[#6B7B3C] hover:from-[#6B7B3C] hover:to-[#C65D3B] text-white rounded-full px-8 transition-all duration-300"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <Instagram className="w-5 h-5 mr-2" />
            {t("instagram.followUs")}
          </Button>

          {/* Handwritten note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 text-xl text-[#C65D3B]"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {t("instagram.tagline")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
