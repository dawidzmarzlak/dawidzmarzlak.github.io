"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useTheme, useContent } from "@/lib/templates/provider";
import type { FashionStoreContent } from "@/lib/showcase/fashion-store/template.config";

export function FashionProducts() {
  const theme = useTheme();
  const c = useContent<FashionStoreContent["products"]>("products");

  return (
    <section className="py-24" style={{ backgroundColor: theme.palette.surface }}>
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

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.items.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Product image */}
              <div
                className="aspect-[3/4] mb-4 relative overflow-hidden"
                style={{ backgroundColor: theme.palette.surfaceAlt }}
              >
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* New badge */}
                {product.badge === "newArrival" && (
                  <div
                    className="absolute top-4 left-4 text-xs tracking-wider uppercase px-3 py-1"
                    style={{
                      backgroundColor: theme.palette.fg,
                      color: theme.palette.surface,
                    }}
                  >
                    {c.newArrivalBadge}
                  </div>
                )}

                {/* Quick add button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Button
                    className="w-full font-normal text-xs tracking-wider uppercase transition-colors"
                    style={{
                      fontFamily: theme.fonts.body,
                      backgroundColor: theme.palette.surface,
                      color: theme.palette.fg,
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.backgroundColor = theme.palette.fg;
                      btn.style.color = theme.palette.surface;
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.backgroundColor = theme.palette.surface;
                      btn.style.color = theme.palette.fg;
                    }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {c.addToCartCta}
                  </Button>
                </motion.div>
              </div>

              {/* Product info */}
              <h3
                className="text-base font-light"
                style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
              >
                {product.name}
              </h3>
              <p
                className="text-sm mt-1"
                style={{ fontFamily: theme.fonts.body, color: theme.palette.muted }}
              >
                {product.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
