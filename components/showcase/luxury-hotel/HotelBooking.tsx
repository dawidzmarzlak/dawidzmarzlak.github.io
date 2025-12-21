"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BedDouble } from "lucide-react";

export function HotelBooking() {
  const t = useTranslations("showcase.luxury-hotel");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-px bg-[#C9A962] mx-auto mb-6" />
            <h2
              className="text-4xl md:text-5xl font-light text-[#1A2A4A] mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("booking.title")}
            </h2>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-8 shadow-xl">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Check-in */}
              <div className="space-y-2">
                <label className="text-sm text-[#1A2A4A]/60 uppercase tracking-wider">
                  {t("booking.checkIn")}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-4 border border-[#1A2A4A]/20 focus:border-[#C9A962] outline-none transition-colors"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A2A4A]/40 pointer-events-none" />
                </div>
              </div>

              {/* Check-out */}
              <div className="space-y-2">
                <label className="text-sm text-[#1A2A4A]/60 uppercase tracking-wider">
                  {t("booking.checkOut")}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-4 border border-[#1A2A4A]/20 focus:border-[#C9A962] outline-none transition-colors"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A2A4A]/40 pointer-events-none" />
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-sm text-[#1A2A4A]/60 uppercase tracking-wider">
                  {t("booking.guests")}
                </label>
                <div className="relative">
                  <select className="w-full p-4 border border-[#1A2A4A]/20 focus:border-[#C9A962] outline-none transition-colors appearance-none bg-white">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A2A4A]/40 pointer-events-none" />
                </div>
              </div>

              {/* Rooms */}
              <div className="space-y-2">
                <label className="text-sm text-[#1A2A4A]/60 uppercase tracking-wider">
                  {t("booking.rooms")}
                </label>
                <div className="relative">
                  <select className="w-full p-4 border border-[#1A2A4A]/20 focus:border-[#C9A962] outline-none transition-colors appearance-none bg-white">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <BedDouble className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A2A4A]/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B8954F] text-[#1A2A4A] font-medium px-12 py-6 text-base tracking-wide"
              >
                {t("booking.bookNow")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
