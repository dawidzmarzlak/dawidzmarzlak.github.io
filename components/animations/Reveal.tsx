"use client";
import { type ReactNode } from "react";
import { useReveal } from "./useReveal";

export function Reveal({ children, delay, className = "" }: { children: ReactNode; delay?: 1 | 2 | 3; className?: string }) {
  useReveal();
  const d = delay ? `reveal-d${delay}` : "";
  return <div className={`reveal ${d} ${className}`}>{children}</div>;
}
