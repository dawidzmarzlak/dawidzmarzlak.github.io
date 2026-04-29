"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface StatsCounterProps {
  title?: string;
  subtitle?: string;
  stats: Stat[];
  theme?: "light" | "dark";
  accentColor?: string;
  layout?: "horizontal" | "grid";
  className?: string;
}

function CountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsCounter({
  title,
  subtitle,
  stats,
  theme = "light",
  accentColor = "#3B82F6",
  layout = "horizontal",
  className = "",
}: StatsCounterProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`py-24 ${isDark ? "bg-[#0A0A0A]" : "bg-gray-50"} ${className}`}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {title && (
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </h2>
            )}
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
        )}

        <div
          className={`${
            layout === "horizontal"
              ? "flex flex-wrap justify-center gap-8 md:gap-16"
              : "grid grid-cols-2 md:grid-cols-4 gap-8"
          }`}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center ${
                layout === "horizontal" ? "flex-1 min-w-[150px] max-w-[200px]" : ""
              }`}
            >
              <div
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2`}
                style={{ color: accentColor }}
              >
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div
                className={`text-lg font-semibold mb-1 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.label}
              </div>
              {stat.description && (
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
