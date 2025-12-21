"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation } from "lucide-react";

export function CafeLocation() {
  const t = useTranslations("showcase.artisan-cafe");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-[#E8DFD0]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-gradient-to-br from-[#6B7B3C]/20 to-[#5C4033]/20 rounded-3xl relative overflow-hidden"
          >
            {/* Illustrated map style */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <MapPin className="w-16 h-16 text-[#C65D3B] mx-auto" />
                </motion.div>
                <p
                  className="text-2xl text-[#5C4033]"
                  style={{ fontFamily: "var(--font-caveat)" }}
                >
                  Find us here!
                </p>
              </div>
            </div>

            {/* Decorative roads */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
              <path d="M0,50 L100,50" stroke="#5C4033" strokeWidth="2" />
              <path d="M50,0 L50,100" stroke="#5C4033" strokeWidth="2" />
              <path d="M0,30 L100,30" stroke="#5C4033" strokeWidth="1" strokeDasharray="4" />
              <path d="M0,70 L100,70" stroke="#5C4033" strokeWidth="1" strokeDasharray="4" />
            </svg>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-4xl md:text-5xl font-normal text-[#5C4033] mb-8"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              {t("location.title")}
            </h2>

            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C65D3B]" />
                </div>
                <div>
                  <p
                    className="text-lg text-[#5C4033] font-medium"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {t("location.address")}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C65D3B]" />
                </div>
                <div>
                  <p
                    className="text-lg text-[#5C4033]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {t("location.hours")}
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-[#5C4033] hover:bg-[#4A3328] text-white rounded-full"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <Navigation className="w-4 h-4 mr-2" />
              {t("location.directions")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
