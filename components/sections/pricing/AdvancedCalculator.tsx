"use client";
import { useTranslations } from "next-intl";
import {
  type ProjectType, type DesignTier, type SupportTier,
  type Hosting, type Timeline, type Integration,
  type AdvancedQuoteInput,
} from "@/lib/design/calculator";

const TYPES: ProjectType[] = ["next", "wp", "woo", "presta", "app"];
const TIERS: DesignTier[]  = ["lite", "standard", "premium"];
const SUPPORTS: SupportTier[] = ["none", "basic", "pro"];
const HOSTINGS: Hosting[]     = ["client", "vercel", "vps"];
const INTEGRATIONS: Integration[] = ["payments", "crm", "newsletter", "analytics", "search", "marketplace"];
const TIMELINES: Timeline[] = ["normal", "rush"];

interface Props {
  value: AdvancedQuoteInput;
  onChange: (next: AdvancedQuoteInput) => void;
}

export function AdvancedCalculator({ value, onChange }: Props) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const set = <K extends keyof AdvancedQuoteInput>(k: K, v: AdvancedQuoteInput[K]) => onChange({ ...value, [k]: v });
  const toggleIntegr = (k: Integration) => onChange({ ...value, integrations: value.integrations.includes(k) ? value.integrations.filter((x) => x !== k) : [...value.integrations, k] });

  return (
    <div className="bg-bg-card rounded-[24px] p-7 border border-line flex flex-col gap-6">
      <Knob label={t("type")}>
        <Pills options={TYPES} value={value.type} onChange={(v) => set("type", v)} labelFn={(k) => tCalc(`types.${k}`)} cols={5} />
      </Knob>

      <Knob label={`${t("pages")} — ${value.pages}`}>
        <input type="range" min={1} max={50} value={value.pages} onChange={(e) => set("pages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>

      <Knob label={t("cms")}>
        <Toggle on={value.cms} onToggle={() => set("cms", !value.cms)} />
      </Knob>

      <Knob label={t("designTier")}>
        <Pills options={TIERS} value={value.designTier} onChange={(v) => set("designTier", v)} labelFn={(k) => t(`tiers.${k}`)} cols={3} />
      </Knob>

      <Knob label={`${t("languages")} — ${value.languages}`}>
        <input type="range" min={1} max={5} value={value.languages} onChange={(e) => set("languages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>

      <Knob label={t("integrations")}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {INTEGRATIONS.map((k) => (
            <button key={k} type="button" onClick={() => toggleIntegr(k)}
              className={`py-2.5 px-3 rounded-lg font-mono text-[11px] uppercase border transition-all ${value.integrations.includes(k) ? "bg-accent text-accent-fg border-accent" : "bg-transparent text-fg border-line hover:border-fg-muted"}`}>
              {t(`integr.${k}`)}
            </button>
          ))}
        </div>
      </Knob>

      <Knob label={t("support")}>
        <Pills options={SUPPORTS} value={value.supportTier} onChange={(v) => set("supportTier", v)} labelFn={(k) => t(`supports.${k}`)} cols={3} />
      </Knob>

      <Knob label={t("hosting")}>
        <Pills options={HOSTINGS} value={value.hosting} onChange={(v) => set("hosting", v)} labelFn={(k) => t(`hostings.${k}`)} cols={3} />
      </Knob>

      <Knob label={t("timeline")}>
        <Pills options={TIMELINES} value={value.timeline} onChange={(v) => set("timeline", v)} labelFn={(k) => t(`timelines.${k}`)} cols={2} />
      </Knob>
    </div>
  );
}

function Knob({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{label}</span>
      {children}
    </div>
  );
}

function Pills<T extends string>({ options, value, onChange, labelFn, cols }: { options: readonly T[]; value: T; onChange: (v: T) => void; labelFn: (k: T) => string; cols: number }) {
  return (
    <div className={`grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
      {options.map((k) => (
        <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={value === k}
          className={`py-2.5 px-1.5 rounded-lg font-mono text-[10px] uppercase border transition-all ${value === k ? "bg-accent text-accent-fg border-accent" : "bg-transparent text-fg border-line hover:border-fg-muted"}`}>
          {labelFn(k)}
        </button>
      ))}
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={onToggle}
      className={`w-9 h-5 rounded-full relative transition-colors ${on ? "bg-accent" : "bg-line"}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${on ? "translate-x-4 bg-accent-fg" : "translate-x-0 bg-white"}`} />
    </button>
  );
}
