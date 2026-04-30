"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  type AdvancedQuoteInput, type ProjectKind, type SiteFields, type ShopFields, type AppFields,
} from "@/lib/design/calculator";
import {
  PROJECT_KINDS, SITE_GOALS, SITE_INTEGRATIONS,
  SHOP_PLATFORMS, CATALOG_SIZES, PAYMENT_GATEWAYS, SHOP_INTEGRATIONS, ERP_OPTIONS,
  APP_TYPES, APP_AUTH, APP_BACKENDS, APP_STORAGE, APP_INTEGRATIONS,
  DESIGN_TIERS, SUPPORT_TIERS, HOSTINGS, TIMELINES,
  INDUSTRIES, AUDIENCES, PROJECT_STAGES,
} from "@/lib/design/project-kinds";

interface Props {
  value: AdvancedQuoteInput;
  onChange: (next: AdvancedQuoteInput) => void;
}

export function AdvancedCalculator({ value, onChange }: Props) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");

  const setKind = (kind: ProjectKind) => {
    if (kind === value.kind) return;
    onChange(emptyInput(kind, value));
  };
  const setShared = <K extends "designTier" | "languages" | "hosting" | "supportTier" | "timeline" | "industry" | "audience" | "stage">(
    k: K, v: AdvancedQuoteInput[K]
  ) => onChange({ ...value, [k]: v });

  return (
    <div className="bg-bg-card rounded-[24px] p-7 border border-line flex flex-col gap-6">
      {/* === BUSINESS CONTEXT (top) === */}
      <Knob label={t("kind")}>
        <Pills
          options={PROJECT_KINDS}
          value={value.kind}
          onChange={setKind}
          labelFn={(k) => tCalc(`kinds.${k}.short`)}
          cols={3}
        />
        <p className="text-[12px] text-fg-muted mt-1.5 leading-[1.5]">{tCalc(`kinds.${value.kind}.hint`)}</p>
      </Knob>

      <Knob label={t("industry")}>
        <Pills options={INDUSTRIES} value={value.industry} onChange={(v) => setShared("industry", v)} labelFn={(k) => tCalc(`industries.${k}`)} cols={4} />
      </Knob>

      <Knob label={t("audience")}>
        <Pills options={AUDIENCES} value={value.audience} onChange={(v) => setShared("audience", v)} labelFn={(k) => tCalc(`audiences.${k}`)} cols={4} />
      </Knob>

      <Knob label={t("stage")}>
        <Pills options={PROJECT_STAGES} value={value.stage} onChange={(v) => setShared("stage", v)} labelFn={(k) => tCalc(`stages.${k}`)} cols={3} />
      </Knob>

      <hr className="border-t border-line my-1" />

      {/* === KIND-SPECIFIC BUSINESS KNOBS === */}
      {value.kind === "site" && (
        <SiteSection value={value.site} onChange={(site) => onChange({ ...value, site })} />
      )}
      {value.kind === "shop" && (
        <ShopSection value={value.shop} onChange={(shop) => onChange({ ...value, shop })} />
      )}
      {value.kind === "app" && (
        <AppSection value={value.app} onChange={(app) => onChange({ ...value, app })} />
      )}

      <hr className="border-t border-line my-1" />

      {/* === SHARED BUSINESS KNOBS === */}
      <Knob label={t("designTier")}>
        <Pills options={DESIGN_TIERS} value={value.designTier} onChange={(v) => setShared("designTier", v)} labelFn={(k) => t(`tiers.${k}`)} cols={3} />
      </Knob>

      <Knob label={`${t("languages")} — ${value.languages}`}>
        <input type="range" min={1} max={5} value={value.languages} onChange={(e) => setShared("languages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>

      <Knob label={t("support")}>
        <Pills options={SUPPORT_TIERS} value={value.supportTier} onChange={(v) => setShared("supportTier", v)} labelFn={(k) => t(`supports.${k}`)} cols={3} />
      </Knob>

      <Knob label={t("timeline")}>
        <Pills options={TIMELINES} value={value.timeline} onChange={(v) => setShared("timeline", v)} labelFn={(k) => t(`timelines.${k}`)} cols={2} />
      </Knob>

      {/* === TECHNICAL PREFERENCES (collapsible) === */}
      <TechPreferencesPanel value={value} onChange={onChange} />
    </div>
  );
}

// ---------- helpers ----------

function emptyInput(kind: ProjectKind, prev: AdvancedQuoteInput): AdvancedQuoteInput {
  const shared = {
    designTier: prev.designTier, languages: prev.languages,
    hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline,
    industry: prev.industry, audience: prev.audience, stage: prev.stage,
  };
  if (kind === "site") {
    return { kind: "site", ...shared, site: { goal: "company", pages: 6, cms: true, siteIntegrations: ["analytics"] } };
  }
  if (kind === "shop") {
    return { kind: "shop", ...shared, shop: { platform: "woo", catalogSize: "md", contentPages: 5, paymentGateways: ["blik", "p24"], shopIntegrations: ["courier"], erp: "none" } };
  }
  return { kind: "app", ...shared, app: { appType: "saas", auth: "email", backend: "spring", roles: 2, appIntegrations: ["payments"], storage: "postgres", mobile: false } };
}

// ---------- site section ----------

function SiteSection({ value, onChange }: { value: SiteFields; onChange: (v: SiteFields) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const set = <K extends keyof SiteFields>(k: K, v: SiteFields[K]) => onChange({ ...value, [k]: v });
  const toggle = (k: typeof SITE_INTEGRATIONS[number]) =>
    set("siteIntegrations", value.siteIntegrations.includes(k) ? value.siteIntegrations.filter(x => x !== k) : [...value.siteIntegrations, k]);
  return (
    <>
      <Knob label={t("siteGoal")}>
        <Pills options={SITE_GOALS} value={value.goal} onChange={(v) => set("goal", v)} labelFn={(k) => tCalc(`siteGoals.${k}`)} cols={5} />
      </Knob>
      <Knob label={`${t("pages")} — ${value.pages}`}>
        <input type="range" min={1} max={30} value={value.pages} onChange={(e) => set("pages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("cms")}>
        <Toggle on={value.cms} onToggle={() => set("cms", !value.cms)} />
      </Knob>
      <Knob label={t("siteIntegrations")}>
        <ChipGrid options={SITE_INTEGRATIONS} active={value.siteIntegrations} onToggle={toggle} labelFn={(k) => t(`siteIntegr.${k}`)} cols={3} />
      </Knob>
    </>
  );
}

// ---------- shop section ----------

function ShopSection({ value, onChange }: { value: ShopFields; onChange: (v: ShopFields) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const set = <K extends keyof ShopFields>(k: K, v: ShopFields[K]) => onChange({ ...value, [k]: v });
  const toggleGateway = (k: typeof PAYMENT_GATEWAYS[number]) =>
    set("paymentGateways", value.paymentGateways.includes(k) ? value.paymentGateways.filter(x => x !== k) : [...value.paymentGateways, k]);
  const toggleIntegr = (k: typeof SHOP_INTEGRATIONS[number]) =>
    set("shopIntegrations", value.shopIntegrations.includes(k) ? value.shopIntegrations.filter(x => x !== k) : [...value.shopIntegrations, k]);
  return (
    <>
      <Knob label={t("catalogSize")}>
        <Pills options={CATALOG_SIZES} value={value.catalogSize} onChange={(v) => set("catalogSize", v)} labelFn={(k) => tCalc(`catalogSizes.${k}`)} cols={4} />
      </Knob>
      <Knob label={`${t("contentPages")} — ${value.contentPages}`}>
        <input type="range" min={1} max={20} value={value.contentPages} onChange={(e) => set("contentPages", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("payments")}>
        <ChipGrid options={PAYMENT_GATEWAYS} active={value.paymentGateways} onToggle={toggleGateway} labelFn={(k) => tCalc(`paymentGateways.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("shopIntegrations")}>
        <ChipGrid options={SHOP_INTEGRATIONS} active={value.shopIntegrations} onToggle={toggleIntegr} labelFn={(k) => t(`shopIntegr.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("erp")}>
        <Pills options={ERP_OPTIONS} value={value.erp} onChange={(v) => set("erp", v)} labelFn={(k) => tCalc(`erp.${k}`)} cols={5} />
      </Knob>
    </>
  );
}

// ---------- app section ----------

function AppSection({ value, onChange }: { value: AppFields; onChange: (v: AppFields) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const set = <K extends keyof AppFields>(k: K, v: AppFields[K]) => onChange({ ...value, [k]: v });
  const toggleIntegr = (k: typeof APP_INTEGRATIONS[number]) =>
    set("appIntegrations", value.appIntegrations.includes(k) ? value.appIntegrations.filter(x => x !== k) : [...value.appIntegrations, k]);
  return (
    <>
      <Knob label={t("appType")}>
        <Pills options={APP_TYPES} value={value.appType} onChange={(v) => set("appType", v)} labelFn={(k) => tCalc(`appTypes.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("appAuth")}>
        <Pills options={APP_AUTH} value={value.auth} onChange={(v) => set("auth", v)} labelFn={(k) => tCalc(`appAuth.${k}`)} cols={4} />
      </Knob>
      <Knob label={`${t("appRoles")} — ${value.roles}`}>
        <input type="range" min={1} max={6} value={value.roles} onChange={(e) => set("roles", +e.target.value)} className="w-full h-1 bg-line rounded outline-none accent-accent" />
      </Knob>
      <Knob label={t("appIntegrations")}>
        <ChipGrid options={APP_INTEGRATIONS} active={value.appIntegrations} onToggle={toggleIntegr} labelFn={(k) => t(`appIntegr.${k}`)} cols={3} />
      </Knob>
      <Knob label={t("appMobile")}>
        <Toggle on={value.mobile} onToggle={() => set("mobile", !value.mobile)} />
      </Knob>
    </>
  );
}

// ---------- tech preferences (collapsible) ----------

function TechPreferencesPanel({ value, onChange }: { value: AdvancedQuoteInput; onChange: (v: AdvancedQuoteInput) => void }) {
  const t = useTranslations("pricing.knobs");
  const tCalc = useTranslations("calculator");
  const [open, setOpen] = useState(false);

  const setShared = <K extends "hosting">(k: K, v: AdvancedQuoteInput[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <div className="border border-line rounded-[16px] overflow-hidden" data-testid="tech-prefs-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-transparent hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("techPreferences")}</span>
          <span className="text-[12px] text-fg-muted opacity-70 mt-0.5">{t("techPreferencesHint")}</span>
        </div>
        <span className={`text-[20px] transition-transform ${open ? "rotate-45" : ""}`} aria-hidden>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 flex flex-col gap-5 border-t border-line">
          {value.kind === "shop" && (
            <Knob label={t("shopPlatform")}>
              <Pills options={SHOP_PLATFORMS} value={value.shop.platform} onChange={(v) => onChange({ ...value, shop: { ...value.shop, platform: v } })} labelFn={(k) => tCalc(`shopPlatforms.${k}`)} cols={4} />
            </Knob>
          )}
          {value.kind === "app" && (
            <>
              <Knob label={t("appBackend")}>
                <Pills options={APP_BACKENDS} value={value.app.backend} onChange={(v) => onChange({ ...value, app: { ...value.app, backend: v } })} labelFn={(k) => tCalc(`appBackends.${k}`)} cols={4} />
              </Knob>
              <Knob label={t("appStorage")}>
                <Pills options={APP_STORAGE} value={value.app.storage} onChange={(v) => onChange({ ...value, app: { ...value.app, storage: v } })} labelFn={(k) => tCalc(`appStorage.${k}`)} cols={5} />
              </Knob>
            </>
          )}
          <Knob label={t("hosting")}>
            <Pills options={HOSTINGS} value={value.hosting} onChange={(v) => setShared("hosting", v)} labelFn={(k) => t(`hostings.${k}`)} cols={3} />
          </Knob>
        </div>
      )}
    </div>
  );
}

// ---------- atoms ----------

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
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
      {options.map((k) => (
        <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={value === k}
          className={`py-2.5 px-1.5 rounded-lg font-mono text-[10px] uppercase border transition-all ${value === k ? "bg-accent text-accent-fg border-accent" : "bg-transparent text-fg border-line hover:border-fg-muted"}`}>
          {labelFn(k)}
        </button>
      ))}
    </div>
  );
}

function ChipGrid<T extends string>({ options, active, onToggle, labelFn, cols }: { options: readonly T[]; active: readonly T[]; onToggle: (v: T) => void; labelFn: (k: T) => string; cols: number }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
      {options.map((k) => (
        <button key={k} type="button" onClick={() => onToggle(k)} aria-pressed={active.includes(k)}
          className={`py-2.5 px-3 rounded-lg font-mono text-[11px] uppercase border transition-all ${active.includes(k) ? "bg-accent text-accent-fg border-accent" : "bg-transparent text-fg border-line hover:border-fg-muted"}`}>
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
