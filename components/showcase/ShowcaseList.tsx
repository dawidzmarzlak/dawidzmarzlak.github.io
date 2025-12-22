"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { getAllThemes } from "@/lib/showcase/themes";
import Image from "next/image";

export function ShowcaseList() {
  const t = useTranslations("showcase");
  const themes = getAllThemes();

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="backdrop-blur-md bg-white/80 dark:bg-black/80 border-white/20 shadow-lg"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToHome")}
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Portfolio Showcase</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("pageTitle")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("pageSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {themes.map((theme, index) => (
              <motion.div
                key={theme.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/showcase/${theme.slug}`}>
                  <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-2xl transition-all duration-500 border-0">
                    {/* Screenshot Header */}
                    <div className="h-72 md:h-80 relative overflow-hidden">
                      <Image
                        src={`/showcase/${theme.slug}/thumbnail.png`}
                        alt={t(`${theme.slug}.brandName`)}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                        <motion.div
                          className="text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                            {t(`${theme.slug}.industry`)}
                          </p>
                          <h2 className="text-3xl md:text-4xl font-bold mb-3">
                            {t(`${theme.slug}.brandName`)}
                          </h2>
                          <p className="text-lg opacity-90 mb-6 max-w-md">
                            {t(`${theme.slug}.tagline`)}
                          </p>
                          <div className="flex items-center gap-2 justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-sm font-medium">{t("exploreProject")}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-background flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {theme.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("ctaDescription")}
            </p>
            <Button size="lg" asChild className="group">
              <Link href="/contact">
                {t("ctaButton")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
