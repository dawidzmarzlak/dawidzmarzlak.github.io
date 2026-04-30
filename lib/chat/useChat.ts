"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { ChatMessage, LeadData, ChatAction } from "./types";
import { sendChatMessage, ChatActionDto } from "@/lib/api/chat";
import { ApiError } from "@/lib/api/client";

const VISITOR_KEY = "chat-visitor-id";
const SESSION_KEY = "chat-session-id";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = window.localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getStoredSessionId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.sessionStorage.getItem(SESSION_KEY) ?? undefined;
}

function setStoredSessionId(id: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SESSION_KEY, id);
}

function clearStoredSessionId(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
}

function mapAction(dto: ChatActionDto | null): ChatAction {
  switch (dto) {
    case "redirect_quote":
      return "redirect_quote";
    case "redirect_contact":
      return "redirect_contact";
    case "collect_lead":
      return "collect_lead";
    default:
      return null;
  }
}

export function useChat() {
  const locale = useLocale() as "pl" | "en";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<ChatAction>(null);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visitorIdRef = useRef<string>("");
  const sessionIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    visitorIdRef.current = getOrCreateVisitorId();
    sessionIdRef.current = getStoredSessionId();
  }, []);

  const sendMessage = useCallback(
    async (content: string, turnstileToken?: string | null) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setAction(null);
      setError(null);

      try {
        const data = await sendChatMessage({
          sessionId: sessionIdRef.current,
          visitorId: visitorIdRef.current || getOrCreateVisitorId(),
          locale,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          leadData: Object.keys(leadData).length > 0 ? leadData : undefined,
          turnstileToken: turnstileToken ?? undefined,
        });

        if (data.sessionId && data.sessionId !== sessionIdRef.current) {
          sessionIdRef.current = data.sessionId;
          setStoredSessionId(data.sessionId);
        }

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        const mapped = mapAction(data.action);
        if (mapped) {
          setAction(mapped);
          if (mapped === "collect_lead") {
            setShowLeadForm(true);
          }
        }
      } catch (err) {
        const isBot = err instanceof ApiError && err.status === 403;
        const fallback: string = isBot
          ? locale === "pl"
            ? "Nie moge zweryfikowac, ze jestes czlowiekiem. Odswiez strone i sprobuj ponownie."
            : "I couldn't verify you're human. Please refresh the page and try again."
          : locale === "pl"
            ? "Przepraszam, wystapil blad. Skorzystaj z formularza kontaktowego."
            : "Sorry, an error occurred. Please use the contact form.";

        setError(fallback);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallback,
            timestamp: new Date(),
          },
        ]);
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, locale, leadData, isLoading],
  );

  const updateLeadData = useCallback((data: Partial<LeadData>) => {
    setLeadData((prev) => ({ ...prev, ...data }));
    setShowLeadForm(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setAction(null);
    setLeadData({});
    setShowLeadForm(false);
    setError(null);
    sessionIdRef.current = undefined;
    clearStoredSessionId();
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
    dismissAction,
  };
}
