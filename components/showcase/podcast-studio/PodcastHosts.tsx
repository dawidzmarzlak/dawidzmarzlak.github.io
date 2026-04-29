"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const hosts = [
  { image: "/showcase/podcast-studio/host-1.jpg" },
  { image: "/showcase/podcast-studio/host-2.jpg" },
];

export function PodcastHosts() {
  const t = useTranslations("showcase.podcast-studio");

  return (
    <section className="py-24 bg-gradient-to-b from-[#0F0A1A] to-[#1F1433]">
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
            {t("hosts.title")}
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t("hosts.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {hosts.map((host, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src={host.image}
                  alt={t(`hosts.members.${index}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A1A] via-transparent to-transparent" />

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {t(`hosts.members.${index}.name`)}
                  </h3>
                  <p
                    className="text-[#EC4899] mb-3"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {t(`hosts.members.${index}.role`)}
                  </p>
                  <p
                    className="text-gray-400 text-sm mb-4"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {t(`hosts.members.${index}.bio`)}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors">
                      <Instagram className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-xl"
                style={{
                  background: index === 0
                    ? "linear-gradient(135deg, #7C3AED, #EC4899)"
                    : "linear-gradient(135deg, #EC4899, #F59E0B)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
