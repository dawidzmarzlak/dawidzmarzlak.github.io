"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Zap, Globe, Lock, Coins, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Shield,
    gradient: "from-[#8B5CF6] to-[#A855F7]",
  },
  {
    icon: Zap,
    gradient: "from-[#06FFA5] to-[#10B981]",
  },
  {
    icon: Globe,
    gradient: "from-[#FF006E] to-[#F43F5E]",
  },
  {
    icon: Lock,
    gradient: "from-[#F59E0B] to-[#FBBF24]",
  },
  {
    icon: Coins,
    gradient: "from-[#06B6D4] to-[#22D3EE]",
  },
  {
    icon: BarChart3,
    gradient: "from-[#EC4899] to-[#F472B6]",
  },
];

export function CryptoFeatures() {
  const t = useTranslations("showcase.crypto-platform");

  return (
    <section className="py-24 bg-[#0A0A0F] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px] bg-[#8B5CF6]" />
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
            {t("features.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-exo)" }}
          >
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-[#1A1A2E] to-[#0D0D1A] border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all"
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl bg-gradient-to-r ${feature.gradient}`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {t(`features.items.${index}.title`)}
                  </h3>
                  <p
                    className="text-gray-400"
                    style={{ fontFamily: "var(--font-exo)" }}
                  >
                    {t(`features.items.${index}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
