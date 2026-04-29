"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Play, Pause, Clock, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

interface Episode {
  id: number;
  image: string;
  duration: string;
  date: string;
}

const episodes: Episode[] = [
  { id: 1, image: "/showcase/podcast-studio/ep-1.jpg", duration: "45:23", date: "Dec 15, 2024" },
  { id: 2, image: "/showcase/podcast-studio/ep-2.jpg", duration: "38:45", date: "Dec 8, 2024" },
  { id: 3, image: "/showcase/podcast-studio/ep-3.jpg", duration: "52:10", date: "Dec 1, 2024" },
  { id: 4, image: "/showcase/podcast-studio/ep-4.jpg", duration: "41:32", date: "Nov 24, 2024" },
];

// Waveform component
function Waveform({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-8">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-gradient-to-t from-[#7C3AED] to-[#EC4899] rounded-full"
          animate={
            isPlaying
              ? { height: [4, 20 + Math.random() * 12, 4] }
              : { height: 4 }
          }
          transition={{
            duration: 0.3 + Math.random() * 0.2,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.02,
          }}
          style={{ height: 4 }}
        />
      ))}
    </div>
  );
}

// Transcript component
function Transcript({ episodeId, isOpen }: { episodeId: number; isOpen: boolean }) {
  const t = useTranslations("showcase.podcast-studio");

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="mt-4 p-4 bg-[#1F1433] rounded-xl"
    >
      <h4
        className="text-sm font-semibold text-white mb-3"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {t("episodes.transcript")}
      </h4>
      <div
        className="space-y-3 text-sm text-gray-400 max-h-48 overflow-y-auto"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        <p><span className="text-[#EC4899]">[00:00]</span> {t(`episodes.items.${episodeId - 1}.transcript.0`)}</p>
        <p><span className="text-[#EC4899]">[02:30]</span> {t(`episodes.items.${episodeId - 1}.transcript.1`)}</p>
        <p><span className="text-[#EC4899]">[05:15]</span> {t(`episodes.items.${episodeId - 1}.transcript.2`)}</p>
      </div>
    </motion.div>
  );
}

export function PodcastEpisodes() {
  const t = useTranslations("showcase.podcast-studio");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0F0A1A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {t("episodes.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t("episodes.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-[#1F1433] to-[#0F0A1A] rounded-2xl p-4 border border-[#7C3AED]/20 hover:border-[#7C3AED]/50 transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Episode image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={episode.image}
                    alt={t(`episodes.items.${index}.title`)}
                    fill
                    className="object-cover"
                  />
                  {/* Play button overlay */}
                  <button
                    onClick={() => setPlayingId(playingId === episode.id ? null : episode.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
                  >
                    {playingId === episode.id ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Episode info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-bold text-white truncate"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {t(`episodes.items.${index}.title`)}
                  </h3>
                  <p
                    className="text-sm text-gray-400 truncate"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {t(`episodes.items.${index}.description`)}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {episode.duration}
                    </span>
                    <span>{episode.date}</span>
                  </div>
                </div>

                {/* Waveform */}
                <div className="hidden md:block">
                  <Waveform isPlaying={playingId === episode.id} />
                </div>

                {/* Expand button */}
                <button
                  onClick={() => setExpandedId(expandedId === episode.id ? null : episode.id)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {expandedId === episode.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Transcript */}
              <Transcript episodeId={episode.id} isOpen={expandedId === episode.id} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            className="px-8 py-4 rounded-2xl border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 transition-colors font-semibold"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {t("episodes.viewAll")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
