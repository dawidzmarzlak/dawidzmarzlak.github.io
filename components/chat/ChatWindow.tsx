"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]"
    >
      <Card className="shadow-2xl border-0 overflow-hidden">
        <ChatHeader onClose={onClose} onClear={messages.length > 0 ? clearChat : undefined} />

        <CardContent className="p-0">
          {/* Messages Area */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-background">
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
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
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1.5">
                      <motion.span
                        className="w-2 h-2 bg-foreground/40 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-foreground/40 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-foreground/40 rounded-full"
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
              className="p-3 border-t bg-muted/30"
            >
              <div className="flex gap-2">
                {action === "redirect_quote" && (
                  <Button asChild className="flex-1" size="sm">
                    <Link href="/pricing" onClick={dismissAction}>
                      <FileText className="w-4 h-4 mr-2" />
                      {t("actions.goToQuote")}
                    </Link>
                  </Button>
                )}
                {action === "redirect_contact" && (
                  <Button asChild className="flex-1" size="sm">
                    <Link href="/contact" onClick={dismissAction}>
                      <Phone className="w-4 h-4 mr-2" />
                      {t("actions.goToContact")}
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </CardContent>

        {/* Invisible Turnstile widget for bot protection */}
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          onSuccess={setTurnstileToken}
          options={{ size: "invisible" }}
        />
      </Card>
    </motion.div>
  );
}
