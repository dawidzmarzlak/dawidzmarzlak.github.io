"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Award, Leaf } from "lucide-react";

const therapists = [
  {
    id: "elena",
    image: "/showcase/spa-wellness/wellness-1.jpg",
    experience: 12,
    specialties: ["massage", "aromatherapy"],
  },
  {
    id: "maya",
    image: "/showcase/spa-wellness/wellness-2.jpg",
    experience: 8,
    specialties: ["facial", "skincare"],
  },
  {
    id: "sophia",
    image: "/showcase/spa-wellness/wellness-3.jpg",
    experience: 10,
    specialties: ["yoga", "meditation"],
  },
  {
    id: "lily",
    image: "/showcase/spa-wellness/wellness-4.jpg",
    experience: 6,
    specialties: ["body", "wellness"],
  },
];

export function SpaTeam() {
  const t = useTranslations("showcase.spa-wellness.team");

  return (
    <section className="py-24 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#9CAF88]" />
            <Leaf className="w-5 h-5 text-[#9CAF88]" />
            <div className="w-12 h-px bg-[#9CAF88]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-[#3A3A3A] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#3A3A3A]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {therapists.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] rounded-t-full overflow-hidden mb-6">
                <Image
                  src={therapist.image}
                  alt={t(`therapists.${therapist.id}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A3A3A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3
                  className="text-xl text-[#3A3A3A] mb-1 font-medium"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {t(`therapists.${therapist.id}.name`)}
                </h3>
                <p
                  className="text-[#9CAF88] text-sm mb-3"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {t(`therapists.${therapist.id}.role`)}
                </p>

                {/* Experience */}
                <div className="flex items-center justify-center gap-2 text-xs text-[#3A3A3A]/60">
                  <Award className="w-3 h-3" />
                  <span style={{ fontFamily: "var(--font-nunito)" }}>
                    {therapist.experience} {t("yearsExperience")}
                  </span>
                </div>

                {/* Specialties on hover */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="mt-4 overflow-hidden"
                >
                  <p
                    className="text-xs text-[#3A3A3A]/50 italic"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {t(`therapists.${therapist.id}.bio`)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
