"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  FileText,
  Palette,
  Code,
  TestTube,
  Rocket,
  HeadphonesIcon
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    key: "consultation",
    number: "01"
  },
  {
    icon: FileText,
    key: "quote",
    number: "02"
  },
  {
    icon: Palette,
    key: "design",
    number: "03"
  },
  {
    icon: Code,
    key: "development",
    number: "04"
  },
  {
    icon: TestTube,
    key: "testing",
    number: "05"
  },
  {
    icon: Rocket,
    key: "deployment",
    number: "06"
  },
  {
    icon: HeadphonesIcon,
    key: "support",
    number: "07"
  }
];

export function Process() {
  const t = useTranslations("process");
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

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="flex-1">
                    <Card className="hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">
                              {t(`steps.${step.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground">
                              {t(`steps.${step.key}.description`)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="flex-shrink-0 relative mx-auto md:mx-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-primary to-secondary opacity-30" />
                    )}
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
