"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { FloatingElements } from "@/components/animations/FloatingElements";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Company name typewriter effect
  const companyName = useTypewriter({
    text: "IT Solutions",
    speed: 100,
    delay: 300
  });

  // Animation stages
  const [showBadge, setShowBadge] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  // Title typewriter (full text at once, not word by word)
  const titleText = t('title');
  const title = useTypewriter({
    text: titleText,
    speed: 80,
    delay: 0,
    startTyping: showTitle
  });

  // Subtitle typewriter
  const subtitle = useTypewriter({
    text: t('subtitle'),
    speed: 30,
    delay: 0,
    startTyping: showSubtitle
  });

  // Sequential animation chain
  useEffect(() => {
    if (companyName.isComplete && !showBadge) {
      const timer = setTimeout(() => setShowBadge(true), 200);
      return () => clearTimeout(timer);
    }
  }, [companyName.isComplete, showBadge]);

  useEffect(() => {
    if (showBadge && !showTitle) {
      const timer = setTimeout(() => setShowTitle(true), 400);
      return () => clearTimeout(timer);
    }
  }, [showBadge, showTitle]);

  useEffect(() => {
    if (title.isComplete && !showSubtitle) {
      const timer = setTimeout(() => setShowSubtitle(true), 200);
      return () => clearTimeout(timer);
    }
  }, [title.isComplete, showSubtitle]);

  useEffect(() => {
    if (subtitle.isComplete && !showButtons) {
      const timer = setTimeout(() => setShowButtons(true), 300);
      return () => clearTimeout(timer);
    }
  }, [subtitle.isComplete, showButtons]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-8 pb-12 sm:pt-12 md:pt-16 lg:pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10"
        />

        {/* Floating Elements */}
        <FloatingElements />
      </div>

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 sm:px-8 md:px-4 text-center"
      >
        {/* Company Name with Gradient and Typewriter */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent min-h-[2.75rem] sm:min-h-[3rem] md:min-h-[3.5rem] lg:min-h-[4rem] flex items-start justify-center">
            <span className="inline-block text-center">{companyName.displayText}</span>
          </h2>
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showBadge ? 1 : 0, scale: showBadge ? 1 : 0.8 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4 md:mb-6"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">
            {t('badge')}
          </span>
        </motion.div>

        {/* Main Heading with Typewriter */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 min-h-[4rem] sm:min-h-[4.5rem] md:min-h-[6rem] lg:min-h-[7rem] flex items-start justify-center">
          <span className="inline-block text-center">{title.displayText}</span>
        </h1>

        {/* Subtitle with Typewriter */}
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-10 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[5rem] flex items-start justify-center">
          <span className="inline-block text-center">{subtitle.displayText}</span>
        </p>

        {/* CTA Buttons with Slide Animations */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showButtons ? 1 : 0, x: showButtons ? 0 : -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Button size="lg" asChild className="group">
              <Link href="/contact">
                {t('cta')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showButtons ? 1 : 0, x: showButtons ? 0 : 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/portfolio">
                {t('cta_secondary')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showButtons ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 sm:bottom-10 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
