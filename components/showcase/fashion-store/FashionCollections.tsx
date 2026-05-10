"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTheme, useContent } from "@/lib/templates/provider";
import { withAlpha } from "@/lib/templates/cssVars";
import type { FashionStoreContent } from "@/lib/showcase/fashion-store/template.config";

export function FashionCollections() {
  const theme = useTheme();
  const c = useContent<FashionStoreContent["collections"]>("collections");

  return (
    <section className="py-24" style={{ backgroundColor: theme.palette.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
          >
            {c.title}
          </h2>
          <p
            className="text-base"
            style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
          >
            {c.subtitle}
          </p>
        </motion.div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.items.map((collection, index) => (
            <motion.div
              key={collection.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[3/4] mb-6 relative overflow-hidden">
                <Image
                  src={collection.imageSrc}
                  alt={collection.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = withAlpha(
                      theme.palette.fg,
                      20,
                    );
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
                  }}
                />

                {/* Arrow icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme.palette.surface }}
                >
                  <ArrowUpRight className="w-5 h-5" style={{ color: theme.palette.fg }} />
                </motion.div>
              </div>

              {/* Collection info */}
              <h3
                className="text-lg font-light transition-colors"
                style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLHeadingElement).style.color = theme.palette.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLHeadingElement).style.color = theme.palette.fg;
                }}
              >
                {collection.label}
              </h3>
              <p
                className="text-xs tracking-wider uppercase mt-2"
                style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
              >
                {c.viewCollectionCta}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
