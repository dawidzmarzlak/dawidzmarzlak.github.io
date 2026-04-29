"use client";
import { useEffect, useRef } from "react";

export function TextReveal({ children, delay = 0, stagger = 30, className = "" }: { children: string; delay?: number; stagger?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const words = String(children).split(" ");
  return (
    <span ref={ref} className={`anim-reveal-text inline ${className}`}>
      {words.map((w, wi) => (
        <span key={wi} className="anim-rt-word inline-flex overflow-hidden">
          {w.split("").map((ch, ci) => (
            <span
              key={ci}
              className="anim-rt-char inline-block translate-y-[110%] transition-transform duration-700 ease-[cubic-bezier(0.2,0.85,0.2,1)] will-change-transform"
              style={{ transitionDelay: `${delay + (wi * 80 + ci * stagger)}ms` }}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span className="anim-rt-space inline-block w-[0.3em]" />}
        </span>
      ))}
    </span>
  );
}
