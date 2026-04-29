"use client";
import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useMagnetic } from "./useMagnetic";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:shadow-[0_8px_36px_rgb(var(--accent)/0.45)]",
  secondary: "bg-transparent text-current border border-current/40",
  ghost: "bg-white/[0.06] text-current backdrop-blur",
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function MagneticCTA({ variant = "primary", className = "", children, ...rest }: Props) {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  useMagnetic(wrapRef, 0.25);
  useMagnetic(innerRef, 0.4);
  return (
    <a
      ref={wrapRef}
      {...rest}
      className={`inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform ${VARIANT[variant]} ${className}`}
    >
      <span ref={innerRef} className="inline-flex items-center gap-2.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform">
        {children}
      </span>
    </a>
  );
}
