"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  Bone,
  Activity,
} from "lucide-react";

const services = [
  { icon: Stethoscope, color: "#0D9488", emoji: "🩺" },
  { icon: Syringe, color: "#F97316", emoji: "💉" },
  { icon: Scissors, color: "#8B5CF6", emoji: "✂️" },
  { icon: Heart, color: "#EC4899", emoji: "❤️" },
  { icon: Bone, color: "#FBBF24", emoji: "🦴" },
  { icon: Activity, color: "#3B82F6", emoji: "📊" },
];

// Pet type tabs
const petTypes = [
  { id: "dogs", emoji: "🐕", label: "Dogs" },
  { id: "cats", emoji: "🐈", label: "Cats" },
  { id: "exotic", emoji: "🐇", label: "Exotic" },
];

export function VetServices() {
  const t = useTranslations("showcase.vet-clinic");
  const [activeType, setActiveType] = useState("dogs");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {t("services.title")}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-quicksand)" }}
          >
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Pet type tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {petTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeType === type.id
                  ? "bg-[#0D9488] text-white shadow-lg"
                  : "bg-[#F0FDF9] text-[#0D9488] hover:bg-[#0D9488]/10"
              }`}
              style={{ fontFamily: "var(--font-quicksand)" }}
            >
              <span className="text-xl">{type.emoji}</span>
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 bg-[#F0FDF9] rounded-3xl hover:bg-white hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#0D9488]/20"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    {service.emoji}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold text-[#1A1A1A] mb-2"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {t(`services.items.${index}.title`)}
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "var(--font-quicksand)" }}
                    >
                      {t(`services.items.${index}.description`)}
                    </p>
                    <p
                      className="mt-3 font-bold"
                      style={{ color: service.color, fontFamily: "var(--font-fredoka)" }}
                    >
                      {t(`services.items.${index}.price`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
