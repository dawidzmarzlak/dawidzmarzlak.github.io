"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center"
      >
        <p className="text-green-700 dark:text-green-300 text-sm">
          {t("success")}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-muted/50 rounded-lg p-4 border"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium">{t("title")}</h4>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder={t("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-9 text-sm"
        />
        <Input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 text-sm"
        />
        <Input
          type="tel"
          placeholder={t("phone")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-9 text-sm"
        />
        <Button type="submit" size="sm" className="w-full">
          {t("submit")}
        </Button>
      </form>
    </motion.div>
  );
}
