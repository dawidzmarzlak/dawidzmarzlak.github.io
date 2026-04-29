"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

// Countdown timer component
function CountdownTimer() {
  const t = useTranslations("showcase.wedding-planner");
  const [timeLeft, setTimeLeft] = useState({
    days: 127,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t("countdown.days") },
    { value: timeLeft.hours, label: t("countdown.hours") },
    { value: timeLeft.minutes, label: t("countdown.minutes") },
    { value: timeLeft.seconds, label: t("countdown.seconds") },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timeUnits.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <span
                className="text-2xl md:text-4xl font-bold text-[#D4A5A5]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            {/* Decorative flower */}
            {i === 0 && (
              <div className="absolute -top-3 -right-3 text-2xl">🌸</div>
            )}
          </div>
          <p
            className="mt-2 text-sm text-[#3A3A3A]/70"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {unit.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// Floating petals animation
function FloatingPetals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        >
          {["🌸", "🌷", "💐", "🌹"][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </div>
  );
}

export function WeddingHero() {
  const t = useTranslations("showcase.wedding-planner");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFFAF7]">
      <FloatingPetals />

      {/* Soft gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[150px] bg-[#D4A5A5]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] bg-[#9CAF88]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          {/* Heart icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#D4A5A5] to-[#9CAF88] flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
          </motion.div>

          {/* Couple names */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#9CAF88] text-lg tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("hero.coupleNames")}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl font-normal text-[#3A3A3A] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-[#D4A5A5] mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("hero.date")}
          </motion.p>

          {/* Venue */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-[#3A3A3A]/60 mb-12"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("hero.venue")}
          </motion.p>

          {/* Countdown */}
          <CountdownTimer />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-[#D4A5A5] hover:bg-[#C49090] text-white font-normal px-8 py-6 text-lg rounded-full gap-2"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              <Calendar className="w-5 h-5" />
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#9CAF88] text-[#9CAF88] hover:bg-[#9CAF88]/10 px-8 py-6 text-lg rounded-full"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-[#F5EDE8]">
          <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}
