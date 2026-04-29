"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

const attorneys = [
  { image: "/showcase/law-firm/attorney-1.jpg" },
  { image: "/showcase/law-firm/attorney-2.jpg" },
  { image: "/showcase/law-firm/attorney-3.jpg" },
  { image: "/showcase/law-firm/attorney-4.jpg" },
];

export function LawTeam() {
  const t = useTranslations("showcase.law-firm");

  return (
    <section className="py-24 bg-[#FAFBFC]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-4"
            style={{ fontFamily: "var(--font-crimson-pro)" }}
          >
            {t("team.title")}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            {t("team.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {attorneys.map((attorney, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                <Image
                  src={attorney.image}
                  alt={t(`team.members.${index}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#1E3A5F]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#C9A227] hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#C9A227] hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
                {/* Gold accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C9A227] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>
              <h3
                className="text-xl font-bold text-[#1E3A5F] mb-1"
                style={{ fontFamily: "var(--font-crimson-pro)" }}
              >
                {t(`team.members.${index}.name`)}
              </h3>
              <p
                className="text-[#C9A227] font-medium mb-2"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {t(`team.members.${index}.role`)}
              </p>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {t(`team.members.${index}.specialty`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
