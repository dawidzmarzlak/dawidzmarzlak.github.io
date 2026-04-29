"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Award, Dumbbell, Instagram } from "lucide-react";

const trainers = [
  {
    id: "marcus",
    image: "/showcase/fitness-studio/trainer-1.jpg",
    specializations: ["HIIT", "Strength"],
    experience: 8,
    certifications: ["ACE", "NASM"],
  },
  {
    id: "sarah",
    image: "/showcase/fitness-studio/trainer-2.jpg",
    specializations: ["Yoga", "Pilates"],
    experience: 6,
    certifications: ["RYT-500", "ACE"],
  },
  {
    id: "jake",
    image: "/showcase/fitness-studio/hero.jpg",
    specializations: ["Cycling", "CrossFit"],
    experience: 5,
    certifications: ["ISSA", "CrossFit L2"],
  },
  {
    id: "emma",
    image: "/showcase/fitness-studio/gym.jpg",
    specializations: ["Nutrition", "Weight Loss"],
    experience: 7,
    certifications: ["NASM", "Precision Nutrition"],
  },
];

export function FitnessTrainers() {
  const t = useTranslations("showcase.fitness-studio.trainers");

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-normal text-white mb-4 uppercase tracking-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#666666]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Trainers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
                <Image
                  src={trainer.image}
                  alt={t(`items.${trainer.id}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#CCFF00]/0 group-hover:border-[#CCFF00] transition-colors" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#CCFF00]/0 group-hover:border-[#CCFF00] transition-colors" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-2xl text-white mb-1 uppercase"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {t(`items.${trainer.id}.name`)}
                  </h3>
                  <p
                    className="text-[#CCFF00] text-sm mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t(`items.${trainer.id}.role`)}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-[#999999]">
                    <div className="flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>
                        {trainer.experience} {t("experience")}
                      </span>
                    </div>
                  </div>

                  {/* Certifications - shown on hover */}
                  <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {trainer.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#CCFF00]/10 text-[#CCFF00] text-xs"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        <Award className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social on hover */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button className="w-10 h-10 bg-[#CCFF00] flex items-center justify-center hover:bg-[#B8E600] transition-colors">
                    <Instagram className="w-5 h-5 text-[#0A0A0A]" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
