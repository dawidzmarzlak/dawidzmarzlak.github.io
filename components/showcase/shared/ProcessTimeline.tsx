"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ProcessStep {
  number?: number;
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface ProcessTimelineProps {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
  theme?: "light" | "dark";
  accentColor?: string;
  layout?: "horizontal" | "vertical";
  className?: string;
}

export function ProcessTimeline({
  title,
  subtitle,
  steps,
  theme = "light",
  accentColor = "#3B82F6",
  layout = "horizontal",
  className = "",
}: ProcessTimelineProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`py-24 ${isDark ? "bg-[#0A0A0A]" : "bg-gray-50"} ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {layout === "horizontal" ? (
          <div className="relative">
            {/* Connecting Line */}
            <div
              className={`hidden lg:block absolute top-12 left-0 right-0 h-0.5 ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative text-center"
                >
                  {/* Step Number/Icon */}
                  <div className="relative z-10 mx-auto mb-6">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto"
                      style={{ backgroundColor: accentColor }}
                    >
                      {step.icon ? (
                        <step.icon className="w-10 h-10" />
                      ) : (
                        step.number || index + 1
                      )}
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-bold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Step Number/Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                    style={{ backgroundColor: accentColor }}
                  >
                    {step.icon ? (
                      <step.icon className="w-6 h-6" />
                    ) : (
                      step.number || index + 1
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
