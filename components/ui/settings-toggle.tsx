"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SettingsToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export function SettingsToggle({
  checked,
  onCheckedChange,
  leftIcon,
  rightIcon,
  leftLabel,
  rightLabel,
  className,
}: SettingsToggleProps) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative flex items-center justify-between w-full p-1 rounded-full bg-muted/50 hover:bg-muted transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      role="switch"
      aria-checked={checked}
    >
      {/* Left side */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full z-10 transition-colors flex-1 justify-center",
          !checked && "text-primary-foreground"
        )}
      >
        {leftIcon && <span className="text-lg">{leftIcon}</span>}
        {leftLabel && <span className="text-sm font-medium">{leftLabel}</span>}
      </div>

      {/* Right side */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full z-10 transition-colors flex-1 justify-center",
          checked && "text-primary-foreground"
        )}
      >
        {rightIcon && <span className="text-lg">{rightIcon}</span>}
        {rightLabel && <span className="text-sm font-medium">{rightLabel}</span>}
      </div>

      {/* Sliding background */}
      <motion.div
        className="absolute top-1 bottom-1 bg-primary rounded-full"
        initial={false}
        animate={{
          left: checked ? "50%" : "0.25rem",
          right: checked ? "0.25rem" : "50%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </button>
  );
}
