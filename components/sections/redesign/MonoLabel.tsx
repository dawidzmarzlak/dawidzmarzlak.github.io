import { type ReactNode } from "react";

export function MonoLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted ${className}`}>
      {children}
    </div>
  );
}
