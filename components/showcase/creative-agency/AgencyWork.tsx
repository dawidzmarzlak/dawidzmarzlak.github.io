"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  { name: "Bloom Botanics", category: "Branding", image: "/showcase/creative-agency/work-1.jpg" },
  { name: "TechFlow App", category: "Web Design", image: "/showcase/creative-agency/work-2.jpg" },
  { name: "Urban Eats", category: "Marketing", image: "/showcase/creative-agency/work-3.jpg" },
  { name: "Mindful Studio", category: "Motion", image: "/showcase/creative-agency/work-4.jpg" },
];

export function AgencyWork() {
  const t = useTranslations("showcase.creative-agency.work");

  return (
    <section className="py-24 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("title")}
            </h2>
            <p
              className="text-base text-[#1A1A2E]/60"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t("subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Project image */}
              <div className="aspect-[4/3] mb-6 relative overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#1A1A2E]/0 group-hover:bg-[#1A1A2E]/40 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className="w-6 h-6 text-[#1A1A2E]" />
                  </motion.div>
                </div>

                {/* Project name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span
                    className="text-white/80 text-8xl font-bold opacity-20"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Project info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className="text-xl font-semibold text-[#1A1A2E] mb-1 group-hover:text-[#FF6B6B] transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-sm text-[#1A1A2E]/60"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {project.category}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#1A1A2E]/40 group-hover:text-[#FF6B6B] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
