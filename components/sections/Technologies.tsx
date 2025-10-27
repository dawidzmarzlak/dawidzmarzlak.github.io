"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const technologies = {
  frontend: ["Next.js", "React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  backend: ["Spring Boot", "Node.js", "Python", "PHP", "Laravel"],
  cms: ["WordPress", "WooCommerce", "PrestaShop", "Shopify", "Strapi"],
  database: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  cloud: ["AWS", "Azure", "Google Cloud", "Vercel", "Docker"]
};

export function Technologies() {
  const t = useTranslations("technologies");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Object.entries(technologies).map(([category, techs], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 capitalize">
                    {category === "frontend" && "Frontend"}
                    {category === "backend" && "Backend"}
                    {category === "cms" && "CMS & E-commerce"}
                    {category === "database" && "Bazy Danych"}
                    {category === "cloud" && "Cloud & DevOps"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
