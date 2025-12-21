"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MessageSquare } from "lucide-react";

export function RestaurantReservation() {
  const t = useTranslations("showcase.fine-dining");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
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
              {t("reservation.title")}
            </h2>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1A1A1A] p-8 md:p-12 border border-[#D4AF37]/10"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Date */}
              <div className="space-y-3">
                <label
                  className="text-sm text-[#D4AF37] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {t("reservation.date")}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-4 bg-[#0A0A0A] border border-white/20 text-white focus:border-[#D4AF37] outline-none transition-colors"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50 pointer-events-none" />
                </div>
              </div>

              {/* Time */}
              <div className="space-y-3">
                <label
                  className="text-sm text-[#D4AF37] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {t("reservation.time")}
                </label>
                <div className="relative">
                  <select className="w-full p-4 bg-[#0A0A0A] border border-white/20 text-white focus:border-[#D4AF37] outline-none transition-colors appearance-none">
                    <option>18:00</option>
                    <option>18:30</option>
                    <option>19:00</option>
                    <option>19:30</option>
                    <option>20:00</option>
                    <option>20:30</option>
                    <option>21:00</option>
                  </select>
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50 pointer-events-none" />
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-3">
                <label
                  className="text-sm text-[#D4AF37] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {t("reservation.guests")}
                </label>
                <div className="relative">
                  <select className="w-full p-4 bg-[#0A0A0A] border border-white/20 text-white focus:border-[#D4AF37] outline-none transition-colors appearance-none">
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7+</option>
                  </select>
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50 pointer-events-none" />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-3">
                <label
                  className="text-sm text-[#D4AF37] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {t("reservation.specialRequests")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Allergies, special occasion..."
                    className="w-full p-4 bg-[#0A0A0A] border border-white/20 text-white placeholder:text-white/30 focus:border-[#D4AF37] outline-none transition-colors"
                  />
                  <MessageSquare className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-10 text-center">
              <Button
                size="lg"
                className="bg-[#722F37] hover:bg-[#8B3A44] text-white font-normal px-12 py-6 text-base tracking-wider"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {t("reservation.submit")}
              </Button>
            </div>

            {/* Hours */}
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-white/50 text-sm" style={{ fontFamily: "var(--font-lato)" }}>
                {t("hours.dinner")} • {t("hours.closed")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
