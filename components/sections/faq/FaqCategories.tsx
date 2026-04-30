"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Category {
  name: string;
  items: Array<[string, string]>;
}

export function FaqCategories() {
  const t = useTranslations("faq.page");
  const categories = t.raw("categories") as Category[];
  const [openMap, setOpenMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    categories.forEach((c) => { init[c.name] = -1; });
    return init;
  });

  const toggle = (catName: string, idx: number) => {
    setOpenMap((prev) => ({ ...prev, [catName]: prev[catName] === idx ? -1 : idx }));
  };

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-12 flex flex-col gap-12">
      {categories.map((cat) => (
        <div key={cat.name}>
          <h2 className="font-display italic text-[36px] tracking-[-0.02em] text-accent m-0 mb-6">
            {cat.name}
          </h2>
          <div className="flex flex-col gap-2">
            {cat.items.map(([q, a], i) => {
              const isOpen = openMap[cat.name] === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(cat.name, i)}
                  className={`text-left rounded-[18px] py-6 px-7 cursor-pointer transition-colors ${
                    isOpen ? "bg-accent text-accent-fg" : "bg-bg-card text-fg"
                  }`}
                >
                  <div className="flex justify-between items-center gap-6">
                    <h4 className="text-[18px] font-medium m-0 tracking-[-0.01em]">{q}</h4>
                    <span
                      className={`text-[24px] transition-transform ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-[max-height,margin-top] duration-300 ${
                      isOpen ? "max-h-96 mt-3.5" : "max-h-0 mt-0"
                    }`}
                  >
                    <p className="text-[14px] leading-[1.65] opacity-85 m-0">{a}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
