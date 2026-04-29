"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const clients = [
  "Google",
  "Spotify",
  "Airbnb",
  "Netflix",
  "Slack",
  "Figma",
  "Notion",
  "Discord",
  "Stripe",
  "Shopify",
];

export function AgencyClients() {
  const t = useTranslations("showcase.creative-agency.clients");

  return (
    <section className="py-24 bg-[#1A1A2E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-white/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1A1A2E] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1A1A2E] to-transparent z-10" />

          {/* First row - left to right */}
          <div className="flex mb-8 overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 px-12 py-8 border-2 border-white/10 rounded-2xl hover:border-[#FF6B6B] transition-colors group"
                >
                  <span
                    className="text-2xl md:text-3xl font-bold text-white/40 group-hover:text-[#FF6B6B] transition-colors whitespace-nowrap"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {client}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second row - right to left */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: [-1000, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...clients.reverse(), ...clients].map((client, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 px-12 py-8 border-2 border-white/10 rounded-2xl hover:border-[#4ECDC4] transition-colors group"
                >
                  <span
                    className="text-2xl md:text-3xl font-bold text-white/40 group-hover:text-[#4ECDC4] transition-colors whitespace-nowrap"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {client}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10"
        >
          {[
            { value: "150+", label: t("stats.projects"), color: "#FF6B6B" },
            { value: "50+", label: t("stats.clients"), color: "#4ECDC4" },
            { value: "12", label: t("stats.awards"), color: "#FFE66D" },
            { value: "98%", label: t("stats.satisfaction"), color: "#FF6B6B" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)", color: stat.color }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm text-white/60"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
