"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    id: "sarah",
    imagePath: "/showcase/architecture-studio/team-1.jpg",
    position: 1,
  },
  {
    id: "michael",
    imagePath: "/showcase/architecture-studio/team-2.jpg",
    position: 2,
  },
  {
    id: "elena",
    imagePath: "/showcase/architecture-studio/team-3.jpg",
    position: 3,
  },
  {
    id: "david",
    imagePath: "/showcase/architecture-studio/team-4.jpg",
    position: 4,
  },
] as const;

export function ArchitectureTeam() {
  const t = useTranslations("showcase.architecture-studio");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#FF4D00]" />
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("team.title")}
            </h2>
          </div>
          <p
            className="text-lg text-black/60 max-w-2xl"
            style={{ fontFamily: "var(--font-ibm-plex)" }}
          >
            {t("team.subtitle")}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-black/5"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Image */}
              <Image
                src={member.imagePath}
                alt={t(`team.members.${member.id}.name`)}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              {/* Number overlay */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className="text-6xl font-bold text-white/20 group-hover:text-[#FF4D00]/50 transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  0{member.position}
                </span>
              </div>

              {/* Hover overlay with bio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredMember === member.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50 flex flex-col justify-end p-6"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{
                    y: hoveredMember === member.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(`team.members.${member.id}.name`)}
                  </h3>
                  <p
                    className="text-sm text-[#FF4D00] mb-4 font-medium"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(`team.members.${member.id}.role`)}
                  </p>
                  <p
                    className="text-sm text-white/80 mb-4 leading-relaxed"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t(`team.members.${member.id}.bio`)}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-3">
                    <button className="w-8 h-8 rounded-full border border-white/20 hover:border-[#FF4D00] hover:bg-[#FF4D00] flex items-center justify-center transition-all group/btn">
                      <Linkedin className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-8 h-8 rounded-full border border-white/20 hover:border-[#FF4D00] hover:bg-[#FF4D00] flex items-center justify-center transition-all group/btn">
                      <Mail className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Default name label (visible when not hovering) */}
              {hoveredMember !== member.id && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(`team.members.${member.id}.name`)}
                  </h3>
                  <p
                    className="text-sm text-white/70"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t(`team.members.${member.id}.role`)}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
