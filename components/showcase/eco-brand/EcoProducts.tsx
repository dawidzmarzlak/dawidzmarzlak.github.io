"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Leaf, ShoppingCart } from "lucide-react";

const products = [
  { image: "/showcase/eco-brand/product-1.jpg", badge: "Bestseller" },
  { image: "/showcase/eco-brand/product-2.jpg", badge: "New" },
  { image: "/showcase/eco-brand/product-3.jpg", badge: null },
  { image: "/showcase/eco-brand/product-4.jpg", badge: "Limited" },
];

export function EcoProducts() {
  const t = useTranslations("showcase.eco-brand");

  return (
    <section className="py-24 bg-[#FEFDF8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-[#1C1917] mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {t("products.title")}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("products.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#ECFCCB] mb-4">
                <Image
                  src={product.image}
                  alt={t(`products.items.${index}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#166534] text-white text-xs font-bold rounded-full">
                    {product.badge}
                  </div>
                )}
                {/* Quick add button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#166534] hover:text-white"
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
                {/* Eco badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full text-xs text-[#166534] font-medium">
                  <Leaf className="w-3 h-3" />
                  100% Organic
                </div>
              </div>
              <div className="text-center">
                <h3
                  className="text-lg font-bold text-[#1C1917] mb-1"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {t(`products.items.${index}.name`)}
                </h3>
                <p
                  className="text-sm text-gray-500 mb-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {t(`products.items.${index}.description`)}
                </p>
                <p
                  className="text-xl font-bold text-[#166534]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {t(`products.items.${index}.price`)}
                </p>
              </div>
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
            className="px-8 py-4 border-2 border-[#166534] text-[#166534] rounded-full hover:bg-[#166534] hover:text-white transition-colors font-semibold"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("products.viewAll")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
