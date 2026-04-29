"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, CheckCircle } from "lucide-react";

const caseStudies = [
  {
    industry: "Real Estate",
    result: "$12.5M",
    color: "#1E3A5F",
  },
  {
    industry: "Corporate",
    result: "$8.2M",
    color: "#C9A227",
  },
  {
    industry: "Employment",
    result: "$3.5M",
    color: "#1E3A5F",
  },
];

export function LawCaseStudies() {
  const t = useTranslations("showcase.law-firm");
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % caseStudies.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + caseStudies.length) % caseStudies.length
    );

  const study = caseStudies[current];

  return (
    <section className="py-24 bg-[#1E3A5F]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-crimson-pro)" }}
          >
            {t("caseStudies.title")}
          </h2>
          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            {t("caseStudies.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side - Case info */}
              <div className="flex-1">
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                  style={{
                    backgroundColor: `${study.color}15`,
                    color: study.color,
                  }}
                >
                  {study.industry}
                </div>
                <h3
                  className="text-2xl font-bold text-[#1E3A5F] mb-4"
                  style={{ fontFamily: "var(--font-crimson-pro)" }}
                >
                  {t(`caseStudies.cases.${current}.title`)}
                </h3>
                <p
                  className="text-gray-600 mb-6"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  {t(`caseStudies.cases.${current}.description`)}
                </p>

                {/* Key outcomes */}
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#C9A227] mt-0.5 flex-shrink-0" />
                      <span
                        className="text-gray-700"
                        style={{ fontFamily: "var(--font-source-serif)" }}
                      >
                        {t(`caseStudies.cases.${current}.outcomes.${i}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Result */}
              <div className="md:w-48 text-center md:text-right">
                <div
                  className="text-5xl font-bold text-[#C9A227] mb-2"
                  style={{ fontFamily: "var(--font-crimson-pro)" }}
                >
                  {study.result}
                </div>
                <div
                  className="text-gray-500"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  {t("caseStudies.recovered")}
                </div>
              </div>
            </div>

            {/* Client quote */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-[#C9A227] flex-shrink-0" />
                <div>
                  <p
                    className="text-gray-600 italic mb-4"
                    style={{ fontFamily: "var(--font-source-serif)" }}
                  >
                    {t(`caseStudies.cases.${current}.quote`)}
                  </p>
                  <p
                    className="font-semibold text-[#1E3A5F]"
                    style={{ fontFamily: "var(--font-crimson-pro)" }}
                  >
                    — {t(`caseStudies.cases.${current}.client`)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === current ? "bg-[#C9A227]" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
