"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Clock, Leaf, Droplets, Sparkles, Heart } from "lucide-react";

const treatments = {
  massage: [
    { name: "Swedish Relaxation", duration: "60 min", price: "250", icon: Heart },
    { name: "Deep Tissue Therapy", duration: "90 min", price: "380", icon: Droplets },
    { name: "Hot Stone Journey", duration: "75 min", price: "320", icon: Sparkles },
  ],
  facial: [
    { name: "Hydrating Glow", duration: "45 min", price: "180", icon: Droplets },
    { name: "Anti-Aging Renewal", duration: "60 min", price: "280", icon: Sparkles },
    { name: "Deep Cleanse", duration: "50 min", price: "200", icon: Leaf },
  ],
  body: [
    { name: "Body Wrap Detox", duration: "90 min", price: "350", icon: Leaf },
    { name: "Salt Scrub Ritual", duration: "45 min", price: "180", icon: Sparkles },
  ],
  packages: [
    { name: "Full Day Retreat", duration: "5 hours", price: "890", icon: Heart },
    { name: "Couples Escape", duration: "3 hours", price: "650", icon: Heart },
  ],
};

const categories = ["massage", "facial", "body", "packages"] as const;

export function SpaTreatments() {
  const t = useTranslations("showcase.spa-wellness");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("massage");

  return (
    <section ref={ref} className="py-24 bg-[#E8DFD0]/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#9CAF88]/50" />
            <Leaf className="w-5 h-5 text-[#9CAF88]" />
            <div className="w-8 h-px bg-[#9CAF88]/50" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-[#3A3A3A] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("treatments.title")}
          </h2>
          <p
            className="text-lg text-[#3A3A3A]/60"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("treatments.subtitle")}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm tracking-wider rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#9CAF88] text-white"
                  : "text-[#3A3A3A]/70 bg-white hover:bg-[#9CAF88]/10"
              }`}
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t(`treatments.categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Treatment Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {treatments[activeCategory].map((treatment, index) => {
            const Icon = treatment.icon;
            return (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#9CAF88]/10 flex items-center justify-center group-hover:bg-[#9CAF88]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#9CAF88]" />
                  </div>
                  <span
                    className="text-2xl font-light text-[#9CAF88]"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    ${treatment.price}
                  </span>
                </div>

                <h3
                  className="text-xl font-medium text-[#3A3A3A] mb-2"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {treatment.name}
                </h3>

                <div className="flex items-center gap-2 text-[#3A3A3A]/50 mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{treatment.duration}</span>
                </div>

                <Button
                  variant="ghost"
                  className="w-full text-[#9CAF88] hover:bg-[#9CAF88]/10 rounded-full"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {t("treatments.book")}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
