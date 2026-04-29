"use client";
import { Children, type ReactNode } from "react";

export function Ticker({ children, speed = 45, gap = 56, className = "" }: { children: ReactNode; speed?: number; gap?: number; className?: string }) {
  const items = Children.toArray(children);
  return (
    <div className={`ticker ${className}`}>
      <div className="ticker-track" style={{ animationDuration: `${speed}s`, gap: `${gap}px` }}>
        {[...items, ...items, ...items].map((c, i) => (
          <div key={i} className="shrink-0">{c}</div>
        ))}
      </div>
    </div>
  );
}
