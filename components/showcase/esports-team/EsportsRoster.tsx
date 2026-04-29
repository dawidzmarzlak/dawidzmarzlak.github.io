"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Twitch, Twitter } from "lucide-react";

const players = [
  { image: "/showcase/esports-team/player-1.jpg", role: "Captain", game: "VALORANT" },
  { image: "/showcase/esports-team/player-2.jpg", role: "Entry", game: "VALORANT" },
  { image: "/showcase/esports-team/player-3.jpg", role: "Controller", game: "VALORANT" },
  { image: "/showcase/esports-team/player-4.jpg", role: "Sentinel", game: "VALORANT" },
  { image: "/showcase/esports-team/player-5.jpg", role: "Flex", game: "VALORANT" },
];

export function EsportsRoster() {
  const t = useTranslations("showcase.esports-team");

  return (
    <section className="py-24 bg-[#09090B] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#22C55E]/30 to-transparent" />
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
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {t("roster.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("roster.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {players.map((player, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#18181B] rounded-lg">
                {/* Player image */}
                <Image
                  src={player.image}
                  alt={t(`roster.players.${index}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />

                {/* Glitch line on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={false}
                >
                  <div className="absolute top-1/3 left-0 right-0 h-1 bg-[#22C55E]/50 blur-sm" />
                  <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-[#A855F7]/50 blur-sm" />
                </motion.div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#22C55E] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Player info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className="text-[#22C55E] text-xs font-medium uppercase tracking-wider mb-1"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {player.role}
                  </div>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {t(`roster.players.${index}.name`)}
                  </h3>
                  <p
                    className="text-sm text-gray-400"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t(`roster.players.${index}.realName`)}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="#" className="w-8 h-8 rounded bg-[#9146FF]/20 flex items-center justify-center hover:bg-[#9146FF]/40">
                      <Twitch className="w-4 h-4 text-[#9146FF]" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded bg-[#1DA1F2]/20 flex items-center justify-center hover:bg-[#1DA1F2]/40">
                      <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
