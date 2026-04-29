"use client";
import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, delay, className = "" }: { children: ReactNode; delay?: 1 | 2 | 3; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const d = delay ? `reveal-d${delay}` : "";
  return (
    <div ref={ref} className={`reveal ${d} ${className}`}>
      {children}
    </div>
  );
}
