"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, HeadphonesIcon, Eye } from "lucide-react";
import { CountUpAnimation } from "@/components/animations/CountUpAnimation";

const values = [
  {
    icon: Award,
    key: "quality",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Clock,
    key: "timeliness",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: HeadphonesIcon,
    key: "support",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Eye,
    key: "transparency",
    gradient: "from-green-500 to-emerald-500"
  }
];

export function About() {
  const t = useTranslations('about');
  const tStats = useTranslations('stats');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { value: 150, label: tStats('projects.label'), suffix: "+" },
    { value: 80, label: tStats('clients.label'), suffix: "+" },
    { value: 5, label: tStats('years.label'), suffix: "" },
    { value: 98, label: tStats('satisfaction.label'), suffix: "%" }
  ];

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {t('description')}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('mission')}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <CountUpAnimation end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="pt-6 text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3">
                      {t(`values.${value.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {t(`values.${value.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
