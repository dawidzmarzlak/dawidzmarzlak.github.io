"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { ChatMessage, LeadData, ChatAction, ChatResponse } from "./types";

export function useChat() {
  const locale = useLocale() as "pl" | "en";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<ChatAction>(null);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string, turnstileToken?: string | null) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setAction(null);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          locale,
          leadData,
          turnstileToken
        })
      });

      const data: ChatResponse = await response.json();

      // Handle bot detection (403)
      if (response.status === 403) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: locale === "pl"
            ? "Nie mogę zweryfikować, że jesteś człowiekiem. Odśwież stronę i spróbuj ponownie."
            : "I couldn't verify that you're human. Please refresh the page and try again.",
          timestamp: new Date()
        }]);
        return;
      }

      if (data.error && !data.message) {
        throw new Error(data.error);
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle action
      if (data.action) {
        setAction(data.action);
        if (data.action === "collect_lead") {
          setShowLeadForm(true);
        }
      }

    } catch (err) {
      console.error("Chat error:", err);
      setError(locale === "pl"
        ? "Wystapil blad. Sprobuj ponownie."
        : "An error occurred. Please try again.");

      // Add error message
      setMessages(prev => [...prev, {
        role: "assistant",
        content: locale === "pl"
          ? "Przepraszam, wystapil blad. Skorzystaj z formularza kontaktowego."
          : "Sorry, an error occurred. Please use the contact form.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, locale, leadData, isLoading]);

  const updateLeadData = useCallback((data: Partial<LeadData>) => {
    setLeadData(prev => {
      const newData = { ...prev, ...data };

      // If we have basic data, we could send it to a backend
      // For now just store locally
      if (newData.name && newData.email) {
        // Could POST to /api/leads here
        console.log("Lead collected:", newData);
      }

      return newData;
    });
    setShowLeadForm(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setAction(null);
    setLeadData({});
    setShowLeadForm(false);
    setError(null);
  }, []);

  const dismissAction = useCallback(() => {
    setAction(null);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    action,
    leadData,
    updateLeadData,
    showLeadForm,
    setShowLeadForm,
    error,
    clearChat,
    dismissAction
  };
}
