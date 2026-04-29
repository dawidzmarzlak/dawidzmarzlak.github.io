"use client";
import { useEffect, type RefObject } from "react";

const findScroller = (el: HTMLElement | null): Window | HTMLElement => {
  let n = el?.parentElement;
  while (n && n !== document.body) {
    const cs = getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight) return n;
    n = n.parentElement;
  }
  return window;
};

export function useParallax<T extends HTMLElement>(ref: RefObject<T | null>, speed = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scroller = findScroller(el);
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const containerRect =
        scroller === window
          ? { top: 0, height: window.innerHeight }
          : (scroller as HTMLElement).getBoundingClientRect();
      const center = rect.top - containerRect.top + rect.height / 2 - containerRect.height / 2;
      ref.current.style.transform = `translate3d(0, ${-center * speed}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    (scroller as Window).addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      (scroller as Window).removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, speed]);
}
