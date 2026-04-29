"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { LeadForm } from "./LeadForm";
import { useChat } from "@/lib/chat/useChat";
import { FileText, Phone } from "lucide-react";

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const t = useTranslations("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const {
    messages,
    isLoading,
    sendMessage,
    action,
    leadData,
    updateLeadData,
    showLeadForm,
    setShowLeadForm,
    clearChat,
    dismissAction
  } = useChat();

  // Wrapper for sendMessage that includes turnstile token
  const handleSendMessage = useCallback((content: string) => {
    sendMessage(content, turnstileToken);
  }, [sendMessage, turnstileToken]);

  // Auto-scroll to last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm, showTyping]);

  // Delayed typing indicator for more natural feel
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowTyping(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowTyping(false);
    }
  }, [isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-24 right-6 z-50 bg-bg-card border border-line rounded-[24px] w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-8rem)] flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.20)] overflow-hidden"
    >
      <ChatHeader onClose={onClose} onClear={messages.length > 0 ? clearChat : undefined} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-bg-card">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <ChatMessage
            role="assistant"
            content={t("welcome")}
            timestamp={new Date()}
          />
        )}

        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}

        {/* Loading indicator with delayed appearance */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="flex items-center gap-3"
            >
              {/* Bot avatar */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-alt text-fg flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4" />
                    <circle cx="8" cy="16" r="1" />
                    <circle cx="16" cy="16" r="1" />
                  </svg>
                </motion.div>
              </div>
              {/* Typing bubble */}
              <div className="bg-bg-alt rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5">
                  <motion.span
                    className="w-2 h-2 bg-fg-muted rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-fg-muted rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-fg-muted rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead Form */}
        {showLeadForm && (
          <LeadForm
            leadData={leadData}
            onSubmit={updateLeadData}
            onClose={() => setShowLeadForm(false)}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {action && action !== "collect_lead" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 border-t border-line bg-bg-alt/50"
        >
          <div className="flex gap-2">
            {action === "redirect_quote" && (
              <Link
                href="/pricing"
                onClick={dismissAction}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-accent-fg rounded-full px-5 py-2.5 text-sm font-semibold hover:scale-[1.02] transition-transform"
              >
                <FileText className="w-4 h-4" />
                {t("actions.goToQuote")}
              </Link>
            )}
            {action === "redirect_contact" && (
              <Link
                href="/contact"
                onClick={dismissAction}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-accent-fg rounded-full px-5 py-2.5 text-sm font-semibold hover:scale-[1.02] transition-transform"
              >
                <Phone className="w-4 h-4" />
                {t("actions.goToContact")}
              </Link>
            )}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />

      {/* Invisible Turnstile widget for bot protection */}
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
        onSuccess={setTurnstileToken}
        options={{ size: "invisible" }}
      />
    </motion.div>
  );
}
