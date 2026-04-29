"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHead } from "./SectionHead";
import { ItalicAccent } from "./ItalicAccent";

export function Faq() {
  const t = useTranslations("redesign.sections.faq");
  const tF = useTranslations("faq");
  const titleParts = t.raw("title") as [string, string, string];
  const sideParts = tF.raw("side") as [string, string];
  const items = tF.raw("itemsList") as Array<[string, string]>;
  const [open, setOpen] = useState(0);

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20" id="faq">
      <SectionHead
        kicker={t("kicker")}
        title={
          <>
            {titleParts[0]}
            <ItalicAccent>{titleParts[1]}</ItalicAccent>
            {titleParts[2]}
          </>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <div>
          <p className="text-[16px] text-fg-muted leading-[1.55] mt-0">
            {sideParts[0]}
            <a href="#contact" className="text-accent">
              {sideParts[1]}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`text-left rounded-[18px] py-6 px-7 cursor-pointer transition-colors ${
                  isOpen ? "bg-accent text-accent-fg" : "bg-bg-card text-fg"
                }`}
              >
                <div className="flex justify-between items-center gap-6">
                  <h4 className="text-[19px] font-medium m-0 tracking-[-0.01em]">{q}</h4>
                  <span
                    className={`text-[24px] transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-[max-height,margin-top] duration-300 ${
                    isOpen ? "max-h-60 mt-3.5" : "max-h-0 mt-0"
                  }`}
                >
                  <p className="text-[14px] leading-[1.6] opacity-85 m-0">{a}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
