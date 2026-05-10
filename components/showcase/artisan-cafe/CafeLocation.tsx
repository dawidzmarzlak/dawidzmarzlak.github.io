"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation } from "lucide-react";
import { useTheme, useContent } from "@/lib/templates/provider";
import type { ArtisanCafeContent } from "@/lib/showcase/artisan-cafe/template.config";

export function CafeLocation() {
  const theme = useTheme();
  const c = useContent<ArtisanCafeContent["location"]>("location");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: theme.palette.surfaceAlt }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="aspect-square rounded-3xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.muted}33, ${theme.palette.fg}33)`,
            }}
          >
            {/* Illustrated map style */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <MapPin
                    className="w-16 h-16 mx-auto"
                    style={{ color: theme.palette.accent }}
                  />
                </motion.div>
                <p
                  className="text-2xl"
                  style={{ fontFamily: theme.fonts.accent, color: theme.palette.fg }}
                >
                  {c.mapPinLabel}
                </p>
              </div>
            </div>

            {/* Decorative roads */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
              <path d="M0,50 L100,50" stroke={theme.palette.fg} strokeWidth="2" />
              <path d="M50,0 L50,100" stroke={theme.palette.fg} strokeWidth="2" />
              <path d="M0,30 L100,30" stroke={theme.palette.fg} strokeWidth="1" strokeDasharray="4" />
              <path d="M0,70 L100,70" stroke={theme.palette.fg} strokeWidth="1" strokeDasharray="4" />
            </svg>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-4xl md:text-5xl font-normal mb-8"
              style={{ fontFamily: theme.fonts.display, color: theme.palette.fg }}
            >
              {c.title}
            </h2>

            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" style={{ color: theme.palette.accent }} />
                </div>
                <div>
                  <p
                    className="text-lg font-medium"
                    style={{ fontFamily: theme.fonts.body, color: theme.palette.fg }}
                  >
                    {c.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" style={{ color: theme.palette.accent }} />
                </div>
                <div>
                  {c.hours.map((h) => (
                    <p
                      key={h.day}
                      className="text-lg"
                      style={{ fontFamily: theme.fonts.body, color: theme.palette.fg }}
                    >
                      {h.day}: {h.range}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="text-white rounded-full"
              style={{
                fontFamily: theme.fonts.body,
                backgroundColor: theme.palette.fg,
              }}
            >
              <Navigation className="w-4 h-4 mr-2" />
              {c.directionsCta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
