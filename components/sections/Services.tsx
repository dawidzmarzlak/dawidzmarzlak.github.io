"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Layout,
  ShoppingCart,
  Store,
  Server
} from "lucide-react";

const services = [
  {
    icon: Code2,
    key: "nextjs",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Layout,
    key: "wordpress",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    icon: ShoppingCart,
    key: "woocommerce",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Store,
    key: "prestashop",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Server,
    key: "webapp",
    gradient: "from-orange-500 to-red-500"
  }
];

export function Services() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,0,128,0.2),transparent_50%)]" />
      </div>

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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary/50">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`${service.key}.description`)}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
