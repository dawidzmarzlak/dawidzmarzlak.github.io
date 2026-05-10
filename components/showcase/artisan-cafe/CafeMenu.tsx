"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Coffee, Leaf, Croissant, Cookie } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import type {
  ArtisanCafeContent,
  CafeMenuCategory,
} from "@/lib/showcase/artisan-cafe/template.config";

const ICONS: Record<CafeMenuCategory["iconName"], LucideIcon> = {
  Coffee,
  Leaf,
  Croissant,
  Cookie,
};

export function CafeMenu() {
  const theme = useTheme();
  const c = useContent<ArtisanCafeContent["menu"]>("menu");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<string>(
    c.categories[0]?.key ?? "coffee"
  );

  const activeItems =
    c.categories.find((cat) => cat.key === activeCategory)?.items ?? [];

  return (
    <section
      ref={ref}
      className="py-24 text-white"
      style={{ backgroundColor: theme.palette.fg }}
    >
      <div className="container mx-auto px-4">
        {/* Chalkboard style */}
        <div
          className="p-8 md:p-12 rounded-lg relative overflow-hidden"
          style={{ backgroundColor: theme.palette.surface }}
        >
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
              style={{ fontFamily: theme.fonts.display }}
            >
              {c.title}
            </h2>
            <p
              className="text-xl text-white/60"
              style={{ fontFamily: theme.fonts.accent }}
            >
              {c.subtitle}
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {c.categories.map((category) => {
              const Icon = ICONS[category.iconName];
              const isActive = activeCategory === category.key;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                  style={{
                    fontFamily: theme.fonts.body,
                    backgroundColor: isActive ? theme.palette.accent : "transparent",
                    color: isActive ? "white" : "rgba(255,255,255,0.6)",
                    border: isActive ? "none" : "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
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
              {activeItems.map((item, index) => (
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
                      style={{ fontFamily: theme.fonts.body }}
                    >
                      {item.name}
                    </span>
                    {item.featured && (
                      <Badge
                        className="text-white border-0 text-xs"
                        style={{ backgroundColor: theme.palette.accent + "80" }}
                      >
                        {c.featuredLabel}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 mx-4 border-b border-dotted border-white/30" />
                  <span
                    className="text-lg"
                    style={{ fontFamily: theme.fonts.accent, color: theme.palette.accent }}
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
