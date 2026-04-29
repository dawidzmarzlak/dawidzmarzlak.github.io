"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles } from "lucide-react";

export function SaasHero() {
  const t = useTranslations("showcase.saas-dashboard");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#6366F1]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <span
              className="text-sm text-[#6366F1]"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              AI-Powered Analytics Platform
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C4FE8] text-white font-semibold px-8 py-6 text-base rounded-xl group"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#334155] text-white hover:bg-[#1E293B] px-8 py-6 text-base rounded-xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              <Play className="w-4 h-4 mr-2" />
              {t("hero.ctaSecondary")}
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          {/* Glassmorphism card */}
          <div className="relative bg-[#1E293B]/50 backdrop-blur-xl rounded-2xl border border-[#334155] p-6 shadow-2xl">
            {/* Window controls */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
            </div>

            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Metric cards */}
              {[
                { label: "Total Revenue", value: "$1.2M", change: "+12.5%", color: "#6366F1" },
                { label: "Active Users", value: "45.2K", change: "+8.2%", color: "#06B6D4" },
                { label: "Conversion Rate", value: "3.45%", change: "+2.1%", color: "#8B5CF6" },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="bg-[#0F172A]/50 rounded-xl p-4 border border-[#334155]"
                >
                  <p className="text-sm text-[#94A3B8] mb-1">{metric.label}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-urbanist)" }}>
                      {metric.value}
                    </span>
                    <span className="text-sm text-[#22C55E] mb-1">{metric.change}</span>
                  </div>
                  <div className="mt-3 h-1 bg-[#1E293B] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      transition={{ delay: 1, duration: 1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="mt-6 bg-[#0F172A]/50 rounded-xl p-4 border border-[#334155]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#94A3B8]">Analytics Overview</span>
                <div className="flex gap-2">
                  {["7D", "1M", "1Y"].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 text-xs rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-white transition-colors"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              {/* Animated chart bars */}
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 1.2 + i * 0.05, duration: 0.5 }}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#6366F1] to-[#06B6D4]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#6366F1]/20 via-[#8B5CF6]/10 to-[#06B6D4]/20 rounded-3xl blur-2xl -z-10" />
        </motion.div>

        {/* Trusted by logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-[#64748B] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            {t("testimonials.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((company) => (
              <span
                key={company}
                className="text-xl font-bold text-[#64748B]"
                style={{ fontFamily: "var(--font-urbanist)" }}
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
