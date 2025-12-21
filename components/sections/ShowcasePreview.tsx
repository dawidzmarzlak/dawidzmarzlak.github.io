"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { getAllThemes } from "@/lib/showcase/themes";

export function ShowcasePreview() {
  const t = useTranslations("showcase");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const themes = getAllThemes();

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("sectionTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("sectionSubtitle")}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/showcase/${theme.slug}`}>
                <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-2xl transition-all duration-500 border-0">
                  {/* Gradient Header */}
                  <div
                    className={`h-56 bg-gradient-to-br ${theme.gradient} relative overflow-hidden`}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Decorative elements based on theme */}
                    {theme.slug === "luxury-hotel" && (
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-8 left-8 w-16 h-16 border border-white/50 rotate-45" />
                        <div className="absolute bottom-8 right-8 w-24 h-24 border border-white/30 rounded-full" />
                      </div>
                    )}
                    {theme.slug === "fine-dining" && (
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/20 rounded-full" />
                      </div>
                    )}
                    {theme.slug === "spa-wellness" && (
                      <div className="absolute inset-0 opacity-20">
                        <svg
                          className="absolute top-4 right-4 w-24 h-24 text-white/50"
                          viewBox="0 0 100 100"
                        >
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    )}
                    {theme.slug === "architecture-studio" && (
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div className="absolute top-4 left-4 text-white font-bold text-6xl opacity-20">01</div>
                        </div>
                      </div>
                    )}
                    {theme.slug === "artisan-cafe" && (
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-8 right-8 w-20 h-20 rounded-full border-2 border-white/50 border-dashed" />
                      </div>
                    )}

                    {/* Brand Name */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                      <motion.div
                        className="text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm uppercase tracking-[0.3em] mb-2 opacity-80">
                          {t(`${theme.slug}.industry`)}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {t(`${theme.slug}.brandName`)}
                        </h3>
                        <div className="flex items-center gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm">{t("viewDemo")}</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-background">
                    <p className="text-muted-foreground mb-4 text-sm">
                      {t(`${theme.slug}.tagline`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {theme.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button size="lg" asChild className="group">
            <Link href="/showcase">
              {t("viewAllProjects")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
