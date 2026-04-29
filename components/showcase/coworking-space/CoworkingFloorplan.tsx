"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Users, Monitor, Coffee, Phone, Check } from "lucide-react";

const spaces = [
  { id: "hotdesk", icon: Monitor, color: "#3B82F6", available: 12, total: 20 },
  { id: "private", icon: Users, color: "#8B5CF6", available: 3, total: 8 },
  { id: "meeting", icon: Phone, color: "#F59E0B", available: 2, total: 4 },
  { id: "lounge", icon: Coffee, color: "#10B981", available: 8, total: 15 },
];

export function CoworkingFloorplan() {
  const t = useTranslations("showcase.coworking-space");
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#18181B] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("floorplan.title")}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("floorplan.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive floorplan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] bg-[#F4F4F5] rounded-xl p-8"
          >
            {/* Simplified floorplan visualization */}
            <div className="relative w-full h-full border-2 border-[#18181B] rounded-lg">
              {/* Hot desks area */}
              <motion.div
                className={`absolute top-4 left-4 w-[45%] h-[45%] rounded-lg cursor-pointer transition-colors ${
                  selectedSpace === "hotdesk"
                    ? "bg-[#3B82F6]/30 border-2 border-[#3B82F6]"
                    : "bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20"
                }`}
                onClick={() => setSelectedSpace("hotdesk")}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#3B82F6] font-bold text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {t("floorplan.areas.hotdesk")}
                  </span>
                </div>
              </motion.div>

              {/* Private offices */}
              <motion.div
                className={`absolute top-4 right-4 w-[45%] h-[40%] rounded-lg cursor-pointer transition-colors ${
                  selectedSpace === "private"
                    ? "bg-[#8B5CF6]/30 border-2 border-[#8B5CF6]"
                    : "bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20"
                }`}
                onClick={() => setSelectedSpace("private")}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#8B5CF6] font-bold text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {t("floorplan.areas.private")}
                  </span>
                </div>
              </motion.div>

              {/* Meeting rooms */}
              <motion.div
                className={`absolute bottom-4 left-4 w-[35%] h-[40%] rounded-lg cursor-pointer transition-colors ${
                  selectedSpace === "meeting"
                    ? "bg-[#F59E0B]/30 border-2 border-[#F59E0B]"
                    : "bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20"
                }`}
                onClick={() => setSelectedSpace("meeting")}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#F59E0B] font-bold text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {t("floorplan.areas.meeting")}
                  </span>
                </div>
              </motion.div>

              {/* Lounge */}
              <motion.div
                className={`absolute bottom-4 right-4 w-[55%] h-[35%] rounded-lg cursor-pointer transition-colors ${
                  selectedSpace === "lounge"
                    ? "bg-[#10B981]/30 border-2 border-[#10B981]"
                    : "bg-[#10B981]/10 hover:bg-[#10B981]/20"
                }`}
                onClick={() => setSelectedSpace("lounge")}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#10B981] font-bold text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {t("floorplan.areas.lounge")}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Legend */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                {t("floorplan.clickToSelect")}
              </span>
            </div>
          </motion.div>

          {/* Space cards */}
          <div className="space-y-4">
            {spaces.map((space, index) => {
              const Icon = space.icon;
              const isSelected = selectedSpace === space.id;
              const availabilityPercent = (space.available / space.total) * 100;

              return (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedSpace(space.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white shadow-xl border-2"
                      : "bg-[#F4F4F5] hover:bg-white hover:shadow-lg"
                  }`}
                  style={{
                    borderColor: isSelected ? space.color : "transparent",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${space.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: space.color }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold text-[#18181B] mb-1"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {t(`floorplan.spaces.${space.id}.title`)}
                      </h3>
                      <p
                        className="text-sm text-gray-600 mb-3"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {t(`floorplan.spaces.${space.id}.description`)}
                      </p>

                      {/* Availability bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${availabilityPercent}%`,
                              backgroundColor: space.color,
                            }}
                          />
                        </div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: space.color, fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {space.available}/{space.total}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: space.color }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
