"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterableGridProps<T> {
  title: string;
  subtitle?: string;
  items: T[];
  categories: string[];
  allLabel?: string;
  getCategory: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  theme?: "light" | "dark";
  accentColor?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FilterableGrid<T>({
  title,
  subtitle,
  items,
  categories,
  allLabel = "All",
  getCategory,
  renderItem,
  theme = "light",
  accentColor = "#3B82F6",
  columns = 3,
  className = "",
}: FilterableGridProps<T>) {
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredItems = activeCategory
    ? items.filter((item) => getCategory(item) === activeCategory)
    : items;

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section
      className={`py-24 ${isDark ? "bg-[#0A0A0A]" : "bg-white"} ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? "text-white"
                : isDark
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: activeCategory === null ? accentColor : undefined,
            }}
          >
            {allLabel}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "text-white"
                  : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  activeCategory === category ? accentColor : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className={`grid ${gridCols[columns]} gap-6`}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {renderItem(item, index)}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            No items found in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
}
