"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Calendar, Clock, MapPin, Twitch } from "lucide-react";

const matches = [
  { status: "live", opponent: "Cloud9", date: "NOW", platform: "VCT Americas" },
  { status: "upcoming", opponent: "Sentinels", date: "Dec 24", platform: "VCT Americas" },
  { status: "upcoming", opponent: "100 Thieves", date: "Dec 28", platform: "VCT Americas" },
  { status: "completed", opponent: "NRG", date: "Dec 18", platform: "VCT Americas", result: "W 2-0" },
];

export function EsportsSchedule() {
  const t = useTranslations("showcase.esports-team");

  return (
    <section className="py-24 bg-[#0F0F11]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {t("schedule.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("schedule.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {matches.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-xl border ${
                match.status === "live"
                  ? "bg-[#22C55E]/10 border-[#22C55E]/50"
                  : match.status === "completed"
                  ? "bg-[#18181B] border-[#27272A]"
                  : "bg-[#18181B] border-[#A855F7]/30"
              }`}
            >
              {/* Live indicator */}
              {match.status === "live" && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-[#22C55E] text-black text-xs font-bold rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  LIVE NOW
                </div>
              )}

              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Match info */}
                <div className="flex items-center gap-6">
                  <div>
                    <div
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {match.platform}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        PHANTOM
                      </span>
                      <span className="text-gray-500">vs</span>
                      <span
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        {match.opponent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date/Result */}
                <div className="flex items-center gap-6">
                  {match.status === "completed" ? (
                    <div
                      className={`text-xl font-bold ${
                        match.result?.startsWith("W") ? "text-[#22C55E]" : "text-[#EF4444]"
                      }`}
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      {match.result}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span style={{ fontFamily: "var(--font-inter)" }}>{match.date}</span>
                    </div>
                  )}

                  {match.status === "live" && (
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 bg-[#9146FF] text-white rounded-lg font-medium hover:bg-[#7C3AED] transition-colors"
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      <Twitch className="w-4 h-4" />
                      Watch
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
