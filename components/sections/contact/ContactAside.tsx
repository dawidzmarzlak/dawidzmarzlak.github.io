"use client";
import { useState } from "react";
import { computeQuote, type ProjectType } from "@/lib/design/calculator";

const SLOTS = [
  { day: "pon", date: "4 lis", time: "10:00", open: true },
  { day: "pon", date: "4 lis", time: "14:30", open: true },
  { day: "wt",  date: "5 lis", time: "11:00", open: false },
  { day: "wt",  date: "5 lis", time: "15:00", open: true },
  { day: "śr",  date: "6 lis", time: "09:30", open: true },
  { day: "śr",  date: "6 lis", time: "13:00", open: false },
  { day: "czw", date: "7 lis", time: "10:00", open: true },
  { day: "czw", date: "7 lis", time: "16:00", open: true },
];

const TYPES: Array<[ProjectType, string]> = [
  ["next", "Next"], ["wp", "WP"], ["woo", "Woo"], ["presta", "Presta"], ["app", "App"],
];

export function ContactAside() {
  const [type, setType] = useState<ProjectType>("next");
  const [pages, setPages] = useState(8);
  const [cms, setCms] = useState(true);
  const price = computeQuote({ type, pages, cms });

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-[90px]">
      <div className="bg-bg-card rounded-[24px] p-7">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Dostępne sloty · 30 min
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {SLOTS.map((s, i) => (
            <button
              key={i}
              type="button"
              disabled={!s.open}
              className="px-3.5 py-3 bg-bg border border-line rounded-xl text-left transition-all hover:enabled:border-accent disabled:opacity-35 disabled:cursor-not-allowed disabled:line-through"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">{s.day}</div>
              <div className="text-[16px] font-medium text-fg mt-0.5">{s.time}</div>
              <div className="font-mono text-[11px] text-fg-muted mt-0.5">{s.date}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-card rounded-[24px] p-7">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted mb-5">// Kalkulator wyceny</div>
        <div className="flex flex-col gap-2 mb-3.5">
          <span className="text-[12px] text-fg-muted">Typ projektu</span>
          <div className="grid grid-cols-5 gap-1">
            {TYPES.map(([k, l]) => (
              <button
                key={k}
                type="button"
                onClick={() => setType(k)}
                className={`py-2 px-1 rounded-lg font-mono text-[10px] uppercase border transition-colors ${
                  type === k ? "bg-accent text-accent-fg border-accent" : "bg-transparent text-fg border-line"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-3.5">
          <span className="text-[12px] text-fg-muted flex justify-between">
            Liczba podstron
            <strong className="font-mono text-fg">{pages}</strong>
          </span>
          <input
            type="range"
            min={1}
            max={30}
            value={pages}
            onChange={(e) => setPages(+e.target.value)}
            className="w-full h-1 bg-line rounded outline-none accent-accent"
            aria-label="Liczba podstron"
            aria-valuetext={`${pages} podstron`}
          />
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-[12px] text-fg-muted">Edycja przez CMS</span>
          <button
            type="button"
            role="switch"
            aria-checked={cms}
            aria-label="Edycja przez CMS"
            onClick={() => setCms((v) => !v)}
            className={`w-9 h-5 rounded-full relative transition-colors ${cms ? "bg-accent" : "bg-line"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${cms ? "translate-x-4 bg-accent-fg" : "translate-x-0 bg-white"}`} />
          </button>
        </div>
        <div className="px-4 py-4 mt-2.5 bg-bg rounded-xl flex items-baseline justify-between border border-line">
          <span className="font-mono text-[11px] text-fg-muted uppercase">Szacunkowo od</span>
          <span className="font-display italic text-[28px] text-accent leading-none">
            {price.toLocaleString("pl-PL")} <span className="font-mono not-italic text-[11px] text-fg-muted ml-1">PLN</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
