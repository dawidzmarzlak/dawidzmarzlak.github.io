"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Twitter, Linkedin, Dribbble } from "lucide-react";

const teamMembers = [
  {
    id: "maya",
    image: "/showcase/creative-agency/team-1.jpg",
    color: "#FF6B6B",
    social: { twitter: "#", linkedin: "#", dribbble: "#" }
  },
  {
    id: "alex",
    image: "/showcase/creative-agency/team-2.jpg",
    color: "#4ECDC4",
    social: { twitter: "#", linkedin: "#", dribbble: "#" }
  },
  {
    id: "jordan",
    image: "/showcase/creative-agency/team-3.jpg",
    color: "#FFE66D",
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: "sam",
    image: "/showcase/creative-agency/team-4.jpg",
    color: "#FF6B6B",
    social: { twitter: "#", linkedin: "#", dribbble: "#" }
  },
];

export function AgencyTeam() {
  const t = useTranslations("showcase.creative-agency.team");
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-4 h-4 bg-[#FF6B6B] rounded-full" />
            <div className="w-4 h-4 bg-[#4ECDC4]" />
            <div className="w-4 h-4 bg-[#FFE66D] rotate-45" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#1A1A2E]/70 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden">
                {/* Image container */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={t(`members.${member.id}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Colored overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredMember === member.id ? 0.9 : 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    style={{ backgroundColor: member.color }}
                  >
                    {/* Fun quote */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredMember === member.id ? 0 : 20,
                        opacity: hoveredMember === member.id ? 1 : 0
                      }}
                      transition={{ delay: 0.1 }}
                      className="text-white text-center px-6 italic text-lg"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      "{t(`members.${member.id}.quote`)}"
                    </motion.p>

                    {/* Social links */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredMember === member.id ? 0 : 20,
                        opacity: hoveredMember === member.id ? 1 : 0
                      }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-3"
                    >
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                          <Twitter className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                          <Linkedin className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {member.social.dribbble && (
                        <a href={member.social.dribbble} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                          <Dribbble className="w-5 h-5 text-white" />
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3
                    className="text-xl font-bold text-[#1A1A2E] mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(`members.${member.id}.name`)}
                  </h3>
                  <p
                    className="text-sm mb-2"
                    style={{ fontFamily: "var(--font-dm-sans)", color: member.color }}
                  >
                    {t(`members.${member.id}.role`)}
                  </p>
                </div>
              </div>

              {/* Decorative shape */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: hoveredMember === member.id ? 1 : 0 }}
                className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full z-10"
                style={{ backgroundColor: member.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
