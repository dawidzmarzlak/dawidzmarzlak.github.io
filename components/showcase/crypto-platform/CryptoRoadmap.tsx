"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, Circle, Rocket } from "lucide-react";

const phases = [
  {
    status: "completed",
    icon: Check,
  },
  {
    status: "completed",
    icon: Check,
  },
  {
    status: "current",
    icon: Rocket,
  },
  {
    status: "upcoming",
    icon: Circle,
  },
];

export function CryptoRoadmap() {
  const t = useTranslations("showcase.crypto-platform");

  return (
    <section className="py-24 bg-[#0D0D1A] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 blur-[100px] bg-[#06FFA5]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5 blur-[80px] bg-[#FF006E]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("roadmap.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-exo)" }}
          >
            {t("roadmap.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B5CF6] via-[#06FFA5] to-[#8B5CF6]/20 hidden md:block" />

          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${isLeft ? "md:pr-12" : "md:pl-12"} ${
                    isLeft ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-6 rounded-2xl border transition-all ${
                      phase.status === "completed"
                        ? "bg-[#06FFA5]/10 border-[#06FFA5]/30"
                        : phase.status === "current"
                        ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50"
                        : "bg-[#1A1A2E] border-[#8B5CF6]/20"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        phase.status === "completed"
                          ? "text-[#06FFA5]"
                          : phase.status === "current"
                          ? "text-[#8B5CF6]"
                          : "text-gray-500"
                      }`}
                      style={{ fontFamily: "var(--font-exo)" }}
                    >
                      {t(`roadmap.phases.${index}.quarter`)}
                    </span>
                    <h3
                      className="text-xl font-bold text-white mt-2 mb-2"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      {t(`roadmap.phases.${index}.title`)}
                    </h3>
                    <p
                      className="text-gray-400 text-sm"
                      style={{ fontFamily: "var(--font-exo)" }}
                    >
                      {t(`roadmap.phases.${index}.description`)}
                    </p>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-10">
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center ${
                      phase.status === "completed"
                        ? "bg-[#06FFA5]"
                        : phase.status === "current"
                        ? "bg-[#8B5CF6] animate-pulse"
                        : "bg-[#1A1A2E] border border-[#8B5CF6]/30"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        phase.status === "completed"
                          ? "text-black"
                          : phase.status === "current"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
