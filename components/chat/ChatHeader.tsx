"use client";

import { X, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatHeaderProps {
  onClose: () => void;
  onClear?: () => void;
}

export function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
  const t = useTranslations("chat");

  return (
    <div className="bg-accent text-accent-fg rounded-t-[24px] p-5 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-2 h-2 bg-black/60 rounded-full animate-pulse flex-shrink-0" />
        <div className="min-w-0">
          <h3 className="font-semibold text-[16px] leading-tight truncate">
            {t("title")}
          </h3>
          <p className="text-[12px] text-accent-fg/70 mt-0.5 truncate">
            {t("subtitle")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] bg-black/[0.10] rounded-full px-2 py-0.5">
          ONLINE
        </span>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear chat"
            className="h-8 w-8 grid place-items-center rounded-full text-accent-fg hover:bg-black/[0.10] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="h-8 w-8 grid place-items-center rounded-full text-accent-fg hover:bg-black/[0.10] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
