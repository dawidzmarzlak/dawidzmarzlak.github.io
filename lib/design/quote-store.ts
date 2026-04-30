"use client";
import { useSyncExternalStore } from "react";
import type { AdvancedQuoteInput } from "./calculator";

export interface StoredQuote {
  input: AdvancedQuoteInput;
  total: number;
  supportYearly: number;
  timestamp: number;
}

const KEY = "it-solutions:quote-v1";

function safeGet(): StoredQuote | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredQuote;
  } catch {
    return null;
  }
}

export function saveQuote(q: StoredQuote): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(q));
  window.dispatchEvent(new CustomEvent("quote-store:change"));
}

export function clearQuote(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("quote-store:change"));
}

function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("quote-store:change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("quote-store:change", handler);
    window.removeEventListener("storage", handler);
  };
}

export function useStoredQuote(): StoredQuote | null {
  return useSyncExternalStore(subscribe, safeGet, () => null);
}
