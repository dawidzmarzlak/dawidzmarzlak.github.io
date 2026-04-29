"use client";
import { FILTERS, filterProjects, type FilterKey } from "@/lib/design/portfolio-data";

interface Props {
  filter: FilterKey;
  onChange: (k: FilterKey) => void;
}

export function PortfolioFilters({ filter, onChange }: Props) {
  return (
    <nav
      className="max-w-[1400px] mx-auto px-5 lg:px-9 py-4 flex gap-1.5 flex-wrap sticky top-[70px] z-30 bg-bg"
      aria-label="Filtr projektów"
    >
      {FILTERS.map(([key, label]) => {
        const isActive = filter === key;
        const count = filterProjects(key).length;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={`px-5 py-3 rounded-full text-[14px] border transition-all flex gap-2.5 items-center ${
              isActive
                ? "bg-accent text-accent-fg border-accent"
                : "bg-transparent text-fg border-line hover:border-fg-muted"
            }`}
          >
            {label}{" "}
            <span className={`font-mono text-[11px] ${isActive ? "opacity-100" : "opacity-60"}`}>[{count}]</span>
          </button>
        );
      })}
    </nav>
  );
}
