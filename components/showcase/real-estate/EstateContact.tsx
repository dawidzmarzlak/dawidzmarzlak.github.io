"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function EstateContact() {
  const t = useTranslations("showcase.real-estate.contact");

  return (
    <section className="py-24 bg-[#0C1E3C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-semibold text-white mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("title")}
            </h2>
            <p
              className="text-lg text-white/60 mb-10"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              {t("description")}
            </p>

            {/* Contact info */}
            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, label: t("phone"), value: "+1 (555) 123-4567" },
                { icon: Mail, label: t("email"), value: "hello@skylineestates.com" },
                { icon: MapPin, label: t("office"), value: "123 Luxury Lane, City Center" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C5A572]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C5A572]" />
                    </div>
                    <div>
                      <p
                        className="text-sm text-white/40"
                        style={{ fontFamily: "var(--font-source-sans)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-white font-medium"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              size="lg"
              className="bg-[#C5A572] hover:bg-[#B8954F] text-[#0C1E3C] font-semibold px-8 py-6 text-base rounded-lg group"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Form placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8"
          >
            <h3
              className="text-2xl font-semibold text-[#0C1E3C] mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Schedule a Viewing
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#C5A572]"
                style={{ fontFamily: "var(--font-source-sans)" }}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#C5A572]"
                style={{ fontFamily: "var(--font-source-sans)" }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#C5A572]"
                style={{ fontFamily: "var(--font-source-sans)" }}
              />
              <select
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#C5A572] text-[#0C1E3C]/60"
                style={{ fontFamily: "var(--font-source-sans)" }}
              >
                <option>Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Penthouse</option>
                <option>Villa</option>
              </select>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#C5A572] resize-none"
                style={{ fontFamily: "var(--font-source-sans)" }}
              />
              <Button
                type="submit"
                className="w-full bg-[#0C1E3C] hover:bg-[#1E3A5F] text-white font-semibold py-6 rounded-lg"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Submit Request
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
