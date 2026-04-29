"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

const products = [
  { name: "Silk Blouse", price: "$320", image: "/showcase/fashion-store/product-1.jpg", isNew: true },
  { name: "Wool Coat", price: "$890", image: "/showcase/fashion-store/product-2.jpg", isNew: false },
  { name: "Cashmere Sweater", price: "$450", image: "/showcase/fashion-store/product-3.jpg", isNew: true },
  { name: "Leather Bag", price: "$680", image: "/showcase/fashion-store/product-4.jpg", isNew: false },
];

export function FashionProducts() {
  const t = useTranslations("showcase.fashion-store.products");

  return (
    <section className="py-24 bg-white">
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

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Product image */}
              <div className="aspect-[3/4] mb-4 relative overflow-hidden bg-[#F5F5F5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* New badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-[#0A0A0A] text-white text-xs tracking-wider uppercase px-3 py-1">
                    {t("newArrival")}
                  </div>
                )}

                {/* Quick add button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Button
                    className="w-full bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white font-normal text-xs tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {t("addToCart")}
                  </Button>
                </motion.div>
              </div>

              {/* Product info */}
              <h3
                className="text-base font-light text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {product.name}
              </h3>
              <p
                className="text-sm text-[#666666] mt-1"
                style={{ fontFamily: "var(--font-montserrat)" }}
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
