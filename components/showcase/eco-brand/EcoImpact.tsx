"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Leaf, Droplets, Wind, TreePine } from "lucide-react";

// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [target, count, rounded]);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
}

const impactMetrics = [
  {
    icon: TreePine,
    value: 50000,
    suffix: "+",
    color: "#166534",
    bg: "#ECFCCB",
  },
  {
    icon: Droplets,
    value: 2500000,
    suffix: "L",
    color: "#0D9488",
    bg: "#CCFBF1",
  },
  {
    icon: Wind,
    value: 85,
    suffix: "%",
    color: "#D97706",
    bg: "#FEF3C7",
  },
  {
    icon: Leaf,
    value: 100,
    suffix: "%",
    color: "#166534",
    bg: "#ECFCCB",
  },
];

export function EcoImpact() {
  const t = useTranslations("showcase.eco-brand");
  const [isInView, setIsInView] = useState(false);

  return (
    <section className="py-24 bg-[#166534] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.432 0 0 13.432 0 30s13.432 30 30 30 30-13.432 30-30S46.568 0 30 0zm0 55C16.215 55 5 43.785 5 30S16.215 5 30 5s25 11.215 25 25-11.215 25-25 25z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {t("impact.title")}
          </h2>
          <p
            className="text-lg text-white/80 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("impact.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: metric.bg }}
                >
                  <Icon className="w-8 h-8" style={{ color: metric.color }} />
                </div>
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {isInView && (
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                  )}
                </div>
                <p
                  className="text-white/70"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {t(`impact.metrics.${index}`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Carbon footprint visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <h3
              className="text-xl font-bold mb-6 text-center"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {t("impact.carbonTitle")}
            </h3>
            <div className="relative h-8 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ECFCCB] to-[#166534] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-sm font-bold"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                85% {t("impact.carbonReduction")}
              </div>
            </div>
            <div className="flex justify-between mt-4 text-sm text-white/60">
              <span>{t("impact.carbonIndustry")}</span>
              <span>{t("impact.carbonUs")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
