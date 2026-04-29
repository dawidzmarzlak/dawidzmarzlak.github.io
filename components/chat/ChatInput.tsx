"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const t = useTranslations("chat");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-line p-3 flex gap-2 bg-bg-card">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("placeholder")}
        disabled={disabled}
        rows={1}
        className="flex-1 bg-bg border border-line rounded-3xl px-5 py-3 text-[14px] text-fg placeholder:text-fg-muted resize-none focus:outline-none focus:border-accent transition-colors min-h-[44px] max-h-[120px] disabled:opacity-50"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        aria-label="Send message"
        className="w-11 h-11 bg-accent text-accent-fg rounded-full grid place-items-center flex-shrink-0 hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
