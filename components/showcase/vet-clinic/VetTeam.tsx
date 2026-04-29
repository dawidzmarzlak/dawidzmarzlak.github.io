"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const team = [
  { image: "/showcase/vet-clinic/vet-1.jpg", emoji: "🐕" },
  { image: "/showcase/vet-clinic/vet-2.jpg", emoji: "🐈" },
  { image: "/showcase/vet-clinic/vet-3.jpg", emoji: "🐇" },
  { image: "/showcase/vet-clinic/vet-4.jpg", emoji: "🦜" },
];

export function VetTeam() {
  const t = useTranslations("showcase.vet-clinic");

  return (
    <section className="py-24 bg-[#F0FDF9]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {t("team.title")}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-quicksand)" }}
          >
            {t("team.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={t(`team.members.${index}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Pet badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl">
                  {member.emoji}
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D9488]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3
                className="text-xl font-bold text-[#1A1A1A] mb-1"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {t(`team.members.${index}.name`)}
              </h3>
              <p
                className="text-[#0D9488] font-medium mb-2"
                style={{ fontFamily: "var(--font-quicksand)" }}
              >
                {t(`team.members.${index}.role`)}
              </p>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "var(--font-quicksand)" }}
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
