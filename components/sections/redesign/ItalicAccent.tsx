import { type ReactNode } from "react";

export function ItalicAccent({ children }: { children: ReactNode }) {
  return (
    <span className="font-display italic font-normal text-accent tracking-[-0.02em]">
      {children}
    </span>
  );
}
