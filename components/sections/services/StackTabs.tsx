"use client";
import { STACKS, type StackKey } from "@/lib/design/services-stacks";

interface Props {
  active: StackKey;
  onChange: (key: StackKey) => void;
}

export function StackTabs({ active, onChange }: Props) {
  return (
    <nav
      className="max-w-[1400px] mx-auto px-9 pt-8 pb-4 flex gap-1.5 flex-wrap sticky top-[70px] z-30 bg-bg"
      aria-label="Wybór stacku"
    >
      {(Object.entries(STACKS) as Array<[StackKey, typeof STACKS[StackKey]]>).map(([key, s]) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={`px-5 py-3 rounded-full text-[14px] font-medium border transition-all flex gap-2.5 items-center ${
              isActive
                ? "bg-accent text-accent-fg border-accent"
                : "bg-transparent text-fg border-line hover:border-fg-muted"
            }`}
          >
            <span className={`font-mono text-[11px] ${isActive ? "opacity-100" : "opacity-60"}`}>[{s.tag}]</span>
            {s.label}
          </button>
        );
      })}
    </nav>
  );
}
