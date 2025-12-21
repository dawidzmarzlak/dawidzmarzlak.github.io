"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    name: "Horizon House",
    year: "2024",
    location: "Warsaw, Poland",
    area: "450 m²",
    image: "/showcase/architecture-studio/project-1.jpg",
  },
  {
    id: "02",
    name: "Urban Loft",
    year: "2023",
    location: "Kraków, Poland",
    area: "180 m²",
    image: "/showcase/architecture-studio/project-2.jpg",
  },
  {
    id: "03",
    name: "Glass Pavilion",
    year: "2023",
    location: "Gdańsk, Poland",
    area: "320 m²",
    image: "/showcase/architecture-studio/project-3.jpg",
  },
  {
    id: "04",
    name: "Concrete Poetry",
    year: "2022",
    location: "Poznań, Poland",
    area: "580 m²",
    image: "/showcase/architecture-studio/interior-1.jpg",
  },
];

export function ArchitectureProjects() {
  const t = useTranslations("showcase.architecture-studio");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#FF4D00]" />
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("works.title")}
            </h2>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-px">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="grid md:grid-cols-12 gap-8 py-8 border-b border-black/10 hover:bg-black/[0.02] transition-colors px-4 -mx-4">
                {/* Number */}
                <div className="md:col-span-1">
                  <span
                    className="text-4xl font-bold text-black/10 group-hover:text-[#FF4D00] transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.id}
                  </span>
                </div>

                {/* Image Preview */}
                <div className="md:col-span-3">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-[#FF4D00]/90">
                      <span className="text-white text-sm font-medium tracking-wider" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {t("works.viewProject")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="md:col-span-6 flex flex-col justify-center">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#FF4D00] transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-black/50" style={{ fontFamily: "var(--font-ibm-plex)" }}>
                    <span>{t("works.year")}: {project.year}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.area}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="md:col-span-2 flex items-center justify-end">
                  <ArrowRight className="w-6 h-6 text-black/20 group-hover:text-[#FF4D00] group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
