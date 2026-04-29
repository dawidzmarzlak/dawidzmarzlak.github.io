"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Clock, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const schedule = {
  monday: [
    { time: "06:00", class: "hiit", trainer: "marcus", duration: 45 },
    { time: "08:00", class: "yoga", trainer: "sarah", duration: 60 },
    { time: "12:00", class: "strength", trainer: "marcus", duration: 60 },
    { time: "17:00", class: "cycling", trainer: "jake", duration: 45 },
    { time: "19:00", class: "hiit", trainer: "marcus", duration: 45 },
  ],
  tuesday: [
    { time: "06:00", class: "cycling", trainer: "jake", duration: 45 },
    { time: "09:00", class: "yoga", trainer: "sarah", duration: 60 },
    { time: "12:00", class: "hiit", trainer: "marcus", duration: 45 },
    { time: "18:00", class: "strength", trainer: "marcus", duration: 60 },
  ],
  wednesday: [
    { time: "06:00", class: "hiit", trainer: "marcus", duration: 45 },
    { time: "08:00", class: "yoga", trainer: "sarah", duration: 60 },
    { time: "12:00", class: "cycling", trainer: "jake", duration: 45 },
    { time: "17:00", class: "strength", trainer: "marcus", duration: 60 },
    { time: "19:00", class: "yoga", trainer: "sarah", duration: 60 },
  ],
  thursday: [
    { time: "06:00", class: "strength", trainer: "marcus", duration: 60 },
    { time: "09:00", class: "cycling", trainer: "jake", duration: 45 },
    { time: "12:00", class: "yoga", trainer: "sarah", duration: 60 },
    { time: "18:00", class: "hiit", trainer: "marcus", duration: 45 },
  ],
  friday: [
    { time: "06:00", class: "hiit", trainer: "marcus", duration: 45 },
    { time: "08:00", class: "strength", trainer: "marcus", duration: 60 },
    { time: "12:00", class: "yoga", trainer: "sarah", duration: 60 },
    { time: "17:00", class: "cycling", trainer: "jake", duration: 45 },
  ],
  saturday: [
    { time: "08:00", class: "yoga", trainer: "sarah", duration: 90 },
    { time: "10:00", class: "hiit", trainer: "marcus", duration: 45 },
    { time: "12:00", class: "strength", trainer: "marcus", duration: 60 },
  ],
  sunday: [
    { time: "09:00", class: "yoga", trainer: "sarah", duration: 90 },
    { time: "11:00", class: "cycling", trainer: "jake", duration: 45 },
  ],
};

const classColors: Record<string, string> = {
  hiit: "#FF4444",
  strength: "#CCFF00",
  yoga: "#44FF88",
  cycling: "#4488FF",
};

export function FitnessSchedule() {
  const t = useTranslations("showcase.fitness-studio");
  const [activeDay, setActiveDay] = useState("monday");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = ["hiit", "strength", "yoga", "cycling"];

  const filteredSchedule = activeFilter
    ? schedule[activeDay as keyof typeof schedule].filter((s) => s.class === activeFilter)
    : schedule[activeDay as keyof typeof schedule];

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl font-normal text-white mb-4 uppercase tracking-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {t("schedule.title")}
          </h2>
          <p
            className="text-base text-[#666666]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("schedule.subtitle")}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-6 py-2 text-sm uppercase tracking-wider transition-all ${
              activeFilter === null
                ? "bg-[#CCFF00] text-[#0A0A0A]"
                : "bg-[#1A1A1A] text-[#666666] hover:text-white"
            }`}
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {t("schedule.all")}
          </button>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeFilter === filter
                  ? "text-[#0A0A0A]"
                  : "bg-[#1A1A1A] text-[#666666] hover:text-white"
              }`}
              style={{
                fontFamily: "var(--font-bebas)",
                backgroundColor: activeFilter === filter ? classColors[filter] : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: classColors[filter] }}
              />
              {t(`classes.${filter}.name`)}
            </button>
          ))}
        </motion.div>

        {/* Days tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto gap-1 mb-8 pb-2"
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3 text-sm uppercase tracking-wider whitespace-nowrap transition-all ${
                activeDay === day
                  ? "bg-[#CCFF00] text-[#0A0A0A]"
                  : "bg-[#1A1A1A] text-[#666666] hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {t(`schedule.days.${day}`)}
            </button>
          ))}
        </motion.div>

        {/* Schedule grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDay}-${activeFilter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-4"
          >
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((item, index) => (
                <motion.div
                  key={`${item.time}-${item.class}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-center gap-6 p-6 bg-[#1A1A1A] border border-[#333333] hover:border-[#CCFF00] transition-colors"
                >
                  {/* Time */}
                  <div className="w-24 flex-shrink-0">
                    <p
                      className="text-3xl text-white"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {item.time}
                    </p>
                  </div>

                  {/* Class indicator */}
                  <div
                    className="w-1 h-16 flex-shrink-0"
                    style={{ backgroundColor: classColors[item.class] }}
                  />

                  {/* Class info */}
                  <div className="flex-1">
                    <h3
                      className="text-2xl text-white mb-1 uppercase"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {t(`classes.${item.class}.name`)}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#666666]">
                      <span className="flex items-center gap-1" style={{ fontFamily: "var(--font-inter)" }}>
                        <Clock className="w-4 h-4" />
                        {item.duration} min
                      </span>
                      <span className="flex items-center gap-1" style={{ fontFamily: "var(--font-inter)" }}>
                        <User className="w-4 h-4" />
                        {t(`trainers.items.${item.trainer}.name`)}
                      </span>
                      <span className="flex items-center gap-1" style={{ fontFamily: "var(--font-inter)" }}>
                        <Zap className="w-4 h-4" />
                        {t(`classes.${item.class}.level`)}
                      </span>
                    </div>
                  </div>

                  {/* Book button */}
                  <Button
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#CCFF00] hover:bg-[#B8E600] text-[#0A0A0A] font-bold px-6 text-sm tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {t("classes.bookClass")}
                  </Button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-[#666666]" style={{ fontFamily: "var(--font-inter)" }}>
                {t("schedule.noClasses")}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
