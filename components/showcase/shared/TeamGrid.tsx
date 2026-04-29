"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface TeamGridProps {
  title: string;
  subtitle?: string;
  members: TeamMember[];
  theme?: "light" | "dark";
  accentColor?: string;
  columns?: 2 | 3 | 4;
  showBio?: boolean;
  className?: string;
}

export function TeamGrid({
  title,
  subtitle,
  members,
  theme = "light",
  accentColor = "#3B82F6",
  columns = 4,
  showBio = false,
  className = "",
}: TeamGridProps) {
  const isDark = theme === "dark";

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section
      className={`py-24 ${isDark ? "bg-[#0A0A0A]" : "bg-white"} ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className={`relative rounded-2xl overflow-hidden ${
                  isDark ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-6xl font-bold text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {member.name.charAt(0)}
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Social Links */}
                    {member.social && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                        {member.social.linkedin && (
                          <motion.a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                        {member.social.twitter && (
                          <motion.a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            aria-label={`${member.name} Twitter`}
                          >
                            <Twitter className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                        {member.social.email && (
                          <motion.a
                            href={`mailto:${member.social.email}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p style={{ color: accentColor }} className="font-medium mb-2">
                    {member.role}
                  </p>
                  {showBio && member.bio && (
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {member.bio}
                    </p>
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
