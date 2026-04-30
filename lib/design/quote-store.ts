"use client";
import { useEffect, useState } from "react";
import type { AdvancedQuoteInput } from "./calculator";

export interface StoredQuote {
  input: AdvancedQuoteInput;
  total: number;
  supportYearly: number;
  timestamp: number;
}

const KEY = "it-solutions:quote-v1";
const CHANGE_EVENT = "quote-store:change";

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
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function clearQuote(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function useStoredQuote(): StoredQuote | null {
  const [stored, setStored] = useState<StoredQuote | null>(null);
  useEffect(() => {
    setStored(safeGet());
    const handler = () => setStored(safeGet());
    window.addEventListener(CHANGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return stored;
}
