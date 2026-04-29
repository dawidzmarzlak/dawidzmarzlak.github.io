"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { MagneticCTA } from "@/components/animations/MagneticCTA";
import { useParallax } from "@/components/animations/useParallax";
import { ItalicAccent } from "./ItalicAccent";
import { QuoteCalculator } from "./QuoteCalculator";

export function Hero() {
  const t = useTranslations("hero");
  const tCalc = useTranslations("calculator");
  const blobRef = useRef<HTMLDivElement>(null);
  useParallax(blobRef, 0.18);

  return (
    <section className="vc-hero max-w-[1400px] mx-auto px-5 lg:px-9 pt-6 pb-8 lg:pt-12 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-4">
        {/* LEFT — main */}
        <div className="vc-hero-main relative overflow-hidden bg-bg-card rounded-[24px] p-6 sm:p-8 lg:p-10 min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex flex-col">
          <div
            ref={blobRef}
            aria-hidden="true"
            className="absolute -bottom-72 -right-36 w-[600px] h-[600px] pointer-events-none will-change-transform"
            style={{ background: "radial-gradient(circle, rgb(var(--accent)) 0%, transparent 60%)", opacity: 0.22, filter: "blur(80px)" }}
          />
          <div className="inline-flex items-center gap-2 self-start mb-8 px-3 py-1.5 pl-1.5 bg-white/[0.04] rounded-full text-[12px] text-fg-muted font-mono">
            <span className="w-[22px] h-[22px] bg-accent rounded-full" />
            {t("tag")}
          </div>
          <h1 className="text-[clamp(56px,7vw,120px)] leading-[0.92] tracking-[-0.045em] font-semibold m-0 mb-auto text-fg">
            {t("h1a")}{" "}
            <span className="relative inline-block before:content-[''] before:absolute before:bottom-[0.05em] before:left-0 before:right-0 before:h-[0.12em] before:bg-accent before:-skew-x-12 before:opacity-85 before:-z-10">
              {t("h1b")}
            </span>
            <br />
            {t("h1c")}
            <br />
            <ItalicAccent>{t("h1d")}</ItalicAccent>
          </h1>
          <div className="flex items-end justify-between gap-6 mt-8 lg:mt-14 max-lg:flex-col max-lg:items-stretch">
            <p className="text-[17px] text-fg-muted leading-[1.5] max-w-[44ch] m-0">
              <strong className="text-fg font-medium">{t("leadStrong")}</strong>
              {t("leadRest")}
            </p>
            <div className="flex gap-2 shrink-0">
              <MagneticCTA href="#contact" variant="primary">{t("cta")}</MagneticCTA>
            </div>
          </div>
        </div>

        {/* RIGHT — calculator + stat card */}
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <QuoteCalculator />
          <div className="vc-stat-card bg-accent text-accent-fg rounded-[24px] p-6 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">// experience</div>
              <div className="text-[18px] font-medium leading-[1.2] mt-2 tracking-[-0.01em]">{tCalc("heroStat")}</div>
            </div>
            <div className="font-display italic text-[64px] font-normal leading-none tracking-[-0.04em]">
              5<span className="font-sans not-italic text-[0.35em] align-super opacity-60 ml-1">+ lat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
