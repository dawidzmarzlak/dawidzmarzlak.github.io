"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
}

interface PartnersMarqueeProps {
  title?: string;
  subtitle?: string;
  partners: Partner[];
  theme?: "light" | "dark";
  speed?: number;
  className?: string;
}

export function PartnersMarquee({
  title,
  subtitle,
  partners,
  theme = "light",
  speed = 30,
  className = "",
}: PartnersMarqueeProps) {
  const isDark = theme === "dark";

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      className={`py-16 overflow-hidden ${
        isDark ? "bg-[#0A0A0A]" : "bg-gray-50"
      } ${className}`}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {title && (
              <h2
                className={`text-2xl md:text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`text-sm ${
                  isDark ? "text-gray-500" : "text-gray-600"
                }`}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
            isDark
              ? "bg-gradient-to-r from-[#0A0A0A] to-transparent"
              : "bg-gradient-to-r from-gray-50 to-transparent"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
            isDark
              ? "bg-gradient-to-l from-[#0A0A0A] to-transparent"
              : "bg-gradient-to-l from-gray-50 to-transparent"
          }`}
        />

        {/* Scrolling Content */}
        <motion.div
          className="flex gap-12 items-center"
          animate={{
            x: [0, -50 * partners.length * 3],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: partners.length * speed / 10,
              ease: "linear",
            },
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className={`flex-shrink-0 h-12 w-32 relative grayscale hover:grayscale-0 transition-all duration-300 ${
                isDark ? "opacity-50 hover:opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
