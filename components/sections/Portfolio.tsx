"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform 'FashionHub'",
    description: "Nowoczesny sklep internetowy z odzieżą premium, zbudowany w Next.js 14",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    category: "nextjs",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Corporate Website 'TechCorp'",
    description: "Profesjonalna strona korporacyjna dla firmy IT",
    tags: ["WordPress", "Custom Theme", "WPML"],
    category: "wordpress",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "'MediClinic' - Portal Pacjenta",
    description: "Aplikacja webowa dla kliniki medycznej z systemem rezerwacji",
    tags: ["React", "Spring Boot", "PostgreSQL"],
    category: "webapp",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "'HomeDesign' - Sklep WooCommerce",
    description: "Sklep z meblami z zaawansowanym konfiguratorem produktów",
    tags: ["WooCommerce", "3D Viewer", "PayU"],
    category: "wordpress",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "'EduPlatform' - E-learning",
    description: "Platforma do nauki online z video kursami i quizami",
    tags: ["Next.js", "Node.js", "MongoDB"],
    category: "nextjs",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    title: "'FoodDelivery' - Marketplace",
    description: "Marketplace z jedzeniem z lokalnych restauracji",
    tags: ["PrestaShop", "Google Maps", "Socket.io"],
    category: "prestashop",
    gradient: "from-pink-500 to-rose-500"
  }
];

const categories = ["all", "nextjs", "wordpress", "webapp"];

export function Portfolio() {
  const t = useTranslations("portfolio");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {t(`categories.${category}`)}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-2xl transition-all duration-300">
        {/* Gradient Header */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <ExternalLink className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
