"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Zap, Check } from "lucide-react";

const integrations = [
  { name: "Slack", category: "communication" },
  { name: "GitHub", category: "development" },
  { name: "Salesforce", category: "crm" },
  { name: "Stripe", category: "payments" },
  { name: "HubSpot", category: "marketing" },
  { name: "Jira", category: "development" },
  { name: "Intercom", category: "support" },
  { name: "Zapier", category: "automation" },
  { name: "Google Analytics", category: "analytics" },
  { name: "Mailchimp", category: "marketing" },
  { name: "Zendesk", category: "support" },
  { name: "Notion", category: "productivity" },
];

export function SaasIntegrations() {
  const t = useTranslations("showcase.saas-dashboard.integrations");

  return (
    <section className="py-24 bg-[#1E293B]/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 mb-6">
            <Zap className="w-4 h-4 text-[#6366F1]" />
            <span
              className="text-sm text-[#6366F1]"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {t("badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#0F172A]/80 backdrop-blur-sm rounded-xl border border-[#334155] p-6 hover:border-[#6366F1]/50 transition-all duration-300 group cursor-pointer"
            >
              {/* Icon placeholder */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#06B6D4]/20 flex items-center justify-center mb-4 group-hover:from-[#6366F1]/30 group-hover:to-[#06B6D4]/30 transition-all">
                <span
                  className="text-lg font-bold text-[#6366F1]"
                  style={{ fontFamily: "var(--font-urbanist)" }}
                >
                  {integration.name.charAt(0)}
                </span>
              </div>

              <h3
                className="text-white font-medium mb-1 group-hover:text-[#6366F1] transition-colors"
                style={{ fontFamily: "var(--font-urbanist)" }}
              >
                {integration.name}
              </h3>
              <p
                className="text-xs text-[#64748B] capitalize"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {integration.category}
              </p>

              {/* Check icon on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Check className="w-4 h-4 text-[#22C55E]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p
            className="text-[#64748B]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {t("moreText")}{" "}
            <span className="text-[#6366F1] cursor-pointer hover:underline">
              {t("viewAll")}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
