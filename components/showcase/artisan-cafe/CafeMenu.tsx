"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Coffee, Leaf, Croissant, Cookie } from "lucide-react";

const menuItems = {
  coffee: [
    { name: "Espresso", price: "12", featured: false },
    { name: "Flat White", price: "18", featured: true },
    { name: "Pour Over", price: "22", featured: true },
    { name: "Cold Brew", price: "16", featured: false },
  ],
  tea: [
    { name: "Matcha Latte", price: "18", featured: true },
    { name: "Earl Grey", price: "14", featured: false },
    { name: "Chai Latte", price: "16", featured: false },
  ],
  food: [
    { name: "Avocado Toast", price: "28", featured: true },
    { name: "Granola Bowl", price: "24", featured: false },
    { name: "Eggs Benedict", price: "32", featured: false },
  ],
  pastries: [
    { name: "Croissant", price: "12", featured: false },
    { name: "Cinnamon Roll", price: "14", featured: true },
    { name: "Banana Bread", price: "10", featured: false },
  ],
};

const categories = [
  { key: "coffee", icon: Coffee },
  { key: "tea", icon: Leaf },
  { key: "food", icon: Croissant },
  { key: "pastries", icon: Cookie },
] as const;

export function CafeMenu() {
  const t = useTranslations("showcase.artisan-cafe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]["key"]>("coffee");

  return (
    <section ref={ref} className="py-24 bg-[#5C4033] text-white">
      <div className="container mx-auto px-4">
        {/* Chalkboard style */}
        <div className="bg-[#4A3328] p-8 md:p-12 rounded-lg relative overflow-hidden">
          {/* Chalk dust effect */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,...')] pointer-events-none" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl md:text-5xl font-normal mb-4"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              {t("menu.title")}
            </h2>
            <p
              className="text-xl text-white/60"
              style={{ fontFamily: "var(--font-caveat)" }}
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
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === category.key
                      ? "bg-[#C65D3B] text-white"
                      : "text-white/60 border border-white/20 hover:border-white/40"
                  }`}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <Icon className="w-4 h-4" />
                  {t(`menu.categories.${category.key}`)}
                </button>
              );
            })}
          </motion.div>

          {/* Menu Items */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="space-y-6">
              {menuItems[activeCategory].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-lg"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item.name}
                    </span>
                    {item.featured && (
                      <Badge className="bg-[#C65D3B]/50 text-white border-0 text-xs">
                        {t("menu.featured")}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 mx-4 border-b border-dotted border-white/30" />
                  <span
                    className="text-lg text-[#C65D3B]"
                    style={{ fontFamily: "var(--font-caveat)" }}
                  >
                    ${item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
