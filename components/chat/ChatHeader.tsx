"use client";

import { X, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ChatHeaderProps {
  onClose: () => void;
  onClear?: () => void;
}

export function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
  const t = useTranslations("chat");

  return (
    <CardHeader className="p-4 pb-3 border-b bg-primary text-primary-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <CardTitle className="text-base font-medium">
            {t("title")}
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          {onClear && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-primary-foreground/70 mt-1">
        {t("subtitle")}
      </p>
    </CardHeader>
  );
}
