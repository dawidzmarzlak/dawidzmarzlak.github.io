"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import Image from "next/image";

interface Album {
  id: number;
  title: string;
  artist: string;
  year: string;
  genre: string;
  price: string;
  image: string;
}

// Simulated audio waveform visualization
function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-[#8B4513] to-[#FF6B35] rounded-full"
          animate={
            isPlaying
              ? {
                  height: [8, 32 + Math.random() * 16, 8],
                }
              : { height: 8 }
          }
          transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.05,
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  );
}

// Spinning vinyl player component
function VinylPlayer({
  album,
  isPlaying,
}: {
  album: Album;
  isPlaying: boolean;
}) {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Vinyl disc */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#333] shadow-2xl"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
        }}
      >
        {/* Grooves */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-[#444]/20"
            style={{ margin: `${15 + i * 15}px` }}
          />
        ))}
        {/* Center label */}
        <div className="absolute inset-0 m-auto w-24 h-24 rounded-full overflow-hidden border-4 border-[#FF6B35]">
          <Image
            src={album.image}
            alt={album.title}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Tonearm */}
      <motion.div
        className="absolute -right-8 top-0 w-32 h-4 origin-right"
        animate={{ rotate: isPlaying ? -25 : -45 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute right-0 top-0 w-4 h-4 rounded-full bg-[#8B4513]" />
        <div className="absolute right-4 top-1 w-24 h-2 bg-gradient-to-l from-[#8B4513] to-[#C4A460] rounded-full" />
        <div className="absolute left-0 top-0 w-3 h-4 bg-[#666] rounded-sm" />
      </motion.div>
    </div>
  );
}

export function MusicFeatured() {
  const t = useTranslations("showcase.music-store");
  const [currentAlbum, setCurrentAlbum] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const albums: Album[] = [
    {
      id: 1,
      title: "Midnight Grooves",
      artist: "The Vinyl Collective",
      year: "1978",
      genre: "Soul / Funk",
      price: "$34.99",
      image: "/showcase/music-store/album-1.jpg",
    },
    {
      id: 2,
      title: "Electric Dreams",
      artist: "Neon Synthesizer",
      year: "1984",
      genre: "Synth-pop",
      price: "$29.99",
      image: "/showcase/music-store/album-2.jpg",
    },
    {
      id: 3,
      title: "Jazz Café Sessions",
      artist: "Blue Note Trio",
      year: "1962",
      genre: "Jazz",
      price: "$42.99",
      image: "/showcase/music-store/album-3.jpg",
    },
    {
      id: 4,
      title: "Psychedelic Sunrise",
      artist: "The Cosmic Band",
      year: "1969",
      genre: "Psychedelic Rock",
      price: "$38.99",
      image: "/showcase/music-store/album-4.jpg",
    },
  ];

  const album = albums[currentAlbum];

  return (
    <section className="py-24 bg-[#E8DCC8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-4"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {t("featured.title")}
          </h2>
          <p
            className="text-lg text-[#8B4513]"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {t("featured.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#FFF5E6] rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Vinyl Player */}
              <div className="order-2 md:order-1">
                <VinylPlayer album={album} isPlaying={isPlaying} />

                {/* Audio Controls */}
                <div className="mt-8 bg-[#1A1A1A] rounded-2xl p-6">
                  <AudioWaveform isPlaying={isPlaying} />

                  {/* Progress bar */}
                  <div className="mt-4 mb-4">
                    <div className="h-1 bg-[#333] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#8B4513] to-[#FF6B35]"
                        animate={{ width: isPlaying ? "100%" : "0%" }}
                        transition={{ duration: 30, ease: "linear" }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0:00</span>
                      <span>3:45</span>
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() =>
                        setCurrentAlbum((prev) =>
                          prev === 0 ? albums.length - 1 : prev - 1
                        )
                      }
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <SkipBack className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B4513] to-[#FF6B35] flex items-center justify-center text-white hover:scale-105 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-1" />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        setCurrentAlbum((prev) =>
                          prev === albums.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <SkipForward className="w-6 h-6" />
                    </button>
                    <button className="text-white/70 hover:text-white transition-colors ml-4">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Album Info */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className="inline-block px-4 py-1 bg-[#FF6B35]/20 text-[#FF6B35] rounded-full text-sm mb-4"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {album.genre}
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-2"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    {album.title}
                  </h3>
                  <p
                    className="text-xl text-[#8B4513] mb-2"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {album.artist}
                  </p>
                  <p
                    className="text-gray-500 mb-6"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {album.year}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span
                      className="text-3xl font-bold text-[#8B4513]"
                      style={{ fontFamily: "var(--font-archivo-black)" }}
                    >
                      {album.price}
                    </span>
                    <button
                      className="px-6 py-3 bg-[#8B4513] text-white rounded-full hover:bg-[#6B3410] transition-colors"
                      style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                      {t("featured.addToCart")}
                    </button>
                  </div>
                </motion.div>

                {/* Album thumbnails */}
                <div className="flex gap-3 mt-8 justify-center md:justify-start">
                  {albums.map((a, i) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        setCurrentAlbum(i);
                        setIsPlaying(false);
                      }}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === currentAlbum
                          ? "border-[#FF6B35] scale-110"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={a.image}
                        alt={a.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
