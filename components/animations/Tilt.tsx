"use client";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { useTilt } from "./useTilt";

export function Tilt({ children, max = 5, className = "", style }: { children: ReactNode; max?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, max);
  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transition: "transform 0.25s ease", transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}
