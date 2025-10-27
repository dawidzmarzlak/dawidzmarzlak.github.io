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
        <div className="max-w-5xl mx-auto relative">
          {/* Continuous vertical line for desktop - from first to last number */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-20 -translate-x-1/2" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${isLast ? 'mb-0' : 'mb-8 md:mb-16'}`}
              >
                {/* Mobile Layout: Number on top, continuous line connecting everything */}
                <div className="flex flex-col md:hidden items-center relative">
                  {/* Continuous vertical line on mobile - ends after last content */}
                  {!isLast && (
                    <div className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-20 -translate-x-1/2" style={{height: 'calc(100% + 2rem)'}} />
                  )}

                  {/* Number */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-base shadow-lg z-10 relative">
                    {step.number}
                  </div>

                  {/* Connecting line between number and content */}
                  <div className="w-0.5 h-4 bg-gradient-to-b from-primary to-secondary opacity-20 relative z-0" />

                  {/* Content Card */}
                  <Card className="w-full hover:shadow-xl transition-all duration-300 relative z-10">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">
                            {t(`steps.${step.key}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`steps.${step.key}.description`)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Spacer to next item on mobile */}
                  {!isLast && (
                    <div className="w-0.5 h-8 bg-transparent" />
                  )}
                </div>

                {/* Desktop Layout: Centered numbers with content on both sides */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center">
                  {/* Left side content */}
                  <div className={`flex items-center justify-end ${isEven ? '' : 'invisible'}`}>
                    {isEven && (
                      <>
                        <Card className="hover:shadow-xl transition-all duration-300 flex-1">
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
                        <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-secondary opacity-30 flex-shrink-0" />
                      </>
                    )}
                  </div>

                  {/* Right side content */}
                  <div className={`flex items-center justify-start ${!isEven ? '' : 'invisible'}`}>
                    {!isEven && (
                      <>
                        <div className="h-0.5 w-16 bg-gradient-to-l from-primary to-secondary opacity-30 flex-shrink-0" />
                        <Card className="hover:shadow-xl transition-all duration-300 flex-1">
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
                      </>
                    )}
                  </div>

                  {/* Center: Timeline dot - absolutely positioned at vertical center */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                    {step.number}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
