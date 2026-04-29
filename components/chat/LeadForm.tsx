"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LeadData } from "@/lib/chat/types";
import { X } from "lucide-react";

interface LeadFormProps {
  leadData: LeadData;
  onSubmit: (data: Partial<LeadData>) => void;
  onClose: () => void;
}

export function LeadForm({ leadData, onSubmit, onClose }: LeadFormProps) {
  const t = useTranslations("chat.leadForm");
  const [name, setName] = useState(leadData.name || "");
  const [email, setEmail] = useState(leadData.email || "");
  const [phone, setPhone] = useState(leadData.phone || "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSubmit({ name, email, phone: phone || undefined });
      setSubmitted(true);
      setTimeout(() => onClose(), 2000);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-bg-alt border border-line rounded-2xl p-4 text-center"
      >
        <p className="text-fg text-sm">
          {t("success")}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-alt border border-line rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">
          {t("title")}
        </h4>
        <button
          type="button"
          aria-label="Close form"
          className="h-6 w-6 grid place-items-center rounded-full text-fg-muted hover:text-fg hover:bg-line transition-colors"
          onClick={onClose}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <label htmlFor="lead-name" className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted block">
            {t("name")}
          </label>
          <input
            id="lead-name"
            type="text"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-[14px] text-fg placeholder:text-fg-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-email" className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted block">
            {t("email")}
          </label>
          <input
            id="lead-email"
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-[14px] text-fg placeholder:text-fg-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-phone" className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted block">
            {t("phone")}
          </label>
          <input
            id="lead-phone"
            type="tel"
            placeholder={t("phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-[14px] text-fg placeholder:text-fg-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-accent text-accent-fg rounded-full px-5 py-2.5 text-sm font-semibold hover:scale-[1.02] transition-transform"
        >
          {t("submit")}
        </button>
      </form>
    </motion.div>
  );
}
