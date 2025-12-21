"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

const menuItems = {
  appetizers: [
    { name: "Tartare de Boeuf", price: "68", seasonal: true },
    { name: "Foie Gras Torchon", price: "89", seasonal: false },
    { name: "Oysters Rockefeller", price: "72", seasonal: true },
  ],
  mains: [
    { name: "Wagyu A5 Ribeye", price: "189", seasonal: false },
    { name: "Black Truffle Risotto", price: "128", seasonal: true },
    { name: "Lobster Thermidor", price: "156", seasonal: false },
  ],
  desserts: [
    { name: "Chocolate Soufflé", price: "48", seasonal: false },
    { name: "Crème Brûlée", price: "42", seasonal: false },
    { name: "Seasonal Fruit Tart", price: "45", seasonal: true },
  ],
  wine: [
    { name: "Château Margaux 2015", price: "890", seasonal: false },
    { name: "Dom Pérignon 2012", price: "420", seasonal: false },
    { name: "Opus One 2018", price: "650", seasonal: false },
  ],
};

const categories = ["appetizers", "mains", "desserts", "wine"] as const;

export function RestaurantMenu() {
  const t = useTranslations("showcase.fine-dining");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("appetizers");

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#D4AF37]/50" />
            <div className="w-2 h-2 rotate-45 border border-[#D4AF37]/50" />
            <div className="w-12 h-px bg-[#D4AF37]/50" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("menu.title")}
          </h2>
          <p
            className="text-lg text-white/50"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("menu.subtitle")}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#722F37] text-white border border-[#722F37]"
                  : "text-white/50 border border-white/20 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
              }`}
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t(`menu.categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-8">
            {menuItems[activeCategory].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-xl text-white group-hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.name}
                    </h3>
                    {item.seasonal && (
                      <Badge className="bg-[#722F37]/50 text-[#D4AF37] text-xs">
                        {t("menu.seasonal")}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 border-b border-dotted border-white/20 mx-4" />
                  <span
                    className="text-[#D4AF37] text-lg"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    ${item.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
