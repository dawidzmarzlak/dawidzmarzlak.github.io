import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Use when rendered inside a bg-accent (green) container — switches to contrasting color with underline so it stays visible. */
  onAccent?: boolean;
}

export function ItalicAccent({ children, onAccent = false }: Props) {
  const colorClasses = onAccent
    ? "text-accent-fg underline decoration-2 underline-offset-[6px] decoration-current"
    : "text-accent";
  return (
    <span className={`font-display italic font-normal tracking-[-0.02em] ${colorClasses}`}>
      {children}
    </span>
  );
}
