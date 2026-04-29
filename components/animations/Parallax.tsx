"use client";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { useParallax } from "./useParallax";

export function Parallax({ children, speed = 0.15, className, style }: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, speed);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}
