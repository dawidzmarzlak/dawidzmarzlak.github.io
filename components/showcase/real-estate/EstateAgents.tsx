"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const agents = [
  {
    key: "sarah",
    image: "/showcase/real-estate/property-1.jpg",
    phone: "+1 (555) 123-4567",
    email: "sarah.miller@skylineestates.com",
    properties: 150,
  },
  {
    key: "michael",
    image: "/showcase/real-estate/property-2.jpg",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@skylineestates.com",
    properties: 120,
  },
  {
    key: "emma",
    image: "/showcase/real-estate/property-3.jpg",
    phone: "+1 (555) 345-6789",
    email: "emma.rodriguez@skylineestates.com",
    properties: 180,
  },
  {
    key: "james",
    image: "/showcase/real-estate/property-4.jpg",
    phone: "+1 (555) 456-7890",
    email: "james.wilson@skylineestates.com",
    properties: 95,
  },
];

export function EstateAgents() {
  const t = useTranslations("showcase.real-estate.agents");
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#0C1E3C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-white/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredAgent(agent.key)}
              onMouseLeave={() => setHoveredAgent(null)}
              className="group relative"
            >
              {/* Agent card */}
              <div className="relative overflow-hidden rounded-2xl bg-white">
                {/* Image */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={t(`${agent.key}.name`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover overlay with contact info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredAgent === agent.key ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#0C1E3C]/95 flex flex-col items-center justify-center p-6"
                  >
                    <div className="space-y-4 w-full">
                      {/* Phone */}
                      <motion.a
                        href={`tel:${agent.phone}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredAgent === agent.key ? 0 : 20,
                          opacity: hoveredAgent === agent.key ? 1 : 0
                        }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 text-white hover:text-[#C5A572] transition-colors group/item"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#C5A572] flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <Phone className="w-5 h-5 text-[#0C1E3C]" />
                        </div>
                        <span className="text-sm font-medium" style={{ fontFamily: "var(--font-source-sans)" }}>
                          {agent.phone}
                        </span>
                      </motion.a>

                      {/* Email */}
                      <motion.a
                        href={`mailto:${agent.email}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredAgent === agent.key ? 0 : 20,
                          opacity: hoveredAgent === agent.key ? 1 : 0
                        }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 text-white hover:text-[#C5A572] transition-colors group/item"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#C5A572] flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <Mail className="w-5 h-5 text-[#0C1E3C]" />
                        </div>
                        <span className="text-sm font-medium truncate" style={{ fontFamily: "var(--font-source-sans)" }}>
                          {agent.email}
                        </span>
                      </motion.a>

                      {/* Message */}
                      <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredAgent === agent.key ? 0 : 20,
                          opacity: hoveredAgent === agent.key ? 1 : 0
                        }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 text-white hover:text-[#C5A572] transition-colors group/item w-full"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#C5A572] flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <MessageSquare className="w-5 h-5 text-[#0C1E3C]" />
                        </div>
                        <span className="text-sm font-medium" style={{ fontFamily: "var(--font-source-sans)" }}>
                          {t("sendMessage")}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3
                    className="text-xl font-semibold text-[#0C1E3C] mb-1"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {t(`${agent.key}.name`)}
                  </h3>
                  <p
                    className="text-sm text-[#0C1E3C]/60 mb-3"
                    style={{ fontFamily: "var(--font-source-sans)" }}
                  >
                    {t(`${agent.key}.role`)}
                  </p>

                  {/* Stats */}
                  <div className="pt-3 border-t border-[#E5E5E5]">
                    <p className="text-xs text-[#0C1E3C]/40" style={{ fontFamily: "var(--font-source-sans)" }}>
                      {agent.properties}+ {t("propertiesSold")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
