"use client";

import { motion, useInView } from "framer-motion";
import { useRef, Fragment } from "react";
import { Heart, Leaf, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useTheme, useContent } from "@/lib/templates/provider";
import type { ArtisanCafeContent, CafeStoryValue } from "@/lib/showcase/artisan-cafe/template.config";

const VALUE_ICONS: Record<CafeStoryValue["iconName"], LucideIcon> = {
  Heart,
  Leaf,
  Users,
};

export function CafeStory() {
  const theme = useTheme();
  const c = useContent<ArtisanCafeContent["story"]>("story");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Polaroid Photos Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            {c.polaroids.map((p, i) => (
                <motion.div
                  key={i}
                  className={`absolute bg-white p-3 pb-12 shadow-lg ${p.positionClass} ${p.widthClass}`}
                  initial={{ rotate: p.rotation }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={p.imageSrc}
                      alt={p.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p
                    className="text-center mt-3"
                    style={{ fontFamily: theme.fonts.accent, color: theme.palette.fg }}
                  >
                    {p.caption}
                  </p>
                </motion.div>
            ))}

            {/* Decorative sticker */}
            <motion.div
              className="absolute top-1/2 right-8 w-24 h-24 rounded-full flex items-center justify-center text-white rotate-12"
              style={{ backgroundColor: theme.palette.accent }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
            >
              <span
                className="text-center text-sm font-bold"
                style={{ fontFamily: theme.fonts.body }}
              >
                {c.stickerText.split("\n").map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </Fragment>
                ))}
              </span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
            >
              {c.title}
            </h2>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ fontFamily: theme.fonts.body, color: theme.palette.fg + "B3" }}
            >
              {c.description}
            </p>

            {/* Values */}
            <div className="space-y-4">
              {c.values.map((value, index) => {
                const Icon = VALUE_ICONS[value.iconName];
                return (
                  <motion.div
                    key={value.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.palette.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: theme.palette.accent }} />
                    </div>
                    <span
                      className="text-lg"
                      style={{ fontFamily: theme.fonts.body, color: theme.palette.fg }}
                    >
                      {value.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
