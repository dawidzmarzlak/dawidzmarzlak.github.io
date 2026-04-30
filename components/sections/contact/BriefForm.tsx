"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";
import { useStoredQuote, clearQuote } from "@/lib/design/quote-store";

type Step = 0 | 1;

interface FormState {
  name: string;
  email: string;
  company: string;
  desc: string;
  timelineNote: string;
}

export function BriefForm() {
  const t = useTranslations("brief");
  const locale = useLocale();
  const fmt = (n: number) => n.toLocaleString(locale === "pl" ? "pl-PL" : "en-US");

  const stored = useStoredQuote();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", desc: "", timelineNote: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const canNext0 = !!form.name && !!form.email && form.email.includes("@");
  const canSubmit = form.desc.length >= 20;

  if (!stored) {
    return (
      <div className="bg-bg-card rounded-[32px] p-6 lg:p-12 flex flex-col gap-6 items-start">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">[01] {t("gate.kicker")}</span>
        <h2 className="text-[36px] lg:text-[48px] font-semibold leading-[1.05] tracking-[-0.025em] m-0 max-w-[22ch]">
          {t("gate.title.0")}<ItalicAccent>{t("gate.title.1")}</ItalicAccent>{t("gate.title.2")}
        </h2>
        <p className="text-fg-muted text-[15px] leading-[1.55] m-0 max-w-[55ch]">{t("gate.body")}</p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-fg font-semibold text-sm no-underline"
        >
          {t("gate.cta")}
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-bg-card rounded-[32px] p-6 lg:p-12 py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full grid place-items-center text-[36px] text-accent-fg">✓</div>
        <h3 className="text-[36px] m-0 mb-3 leading-none tracking-[-0.025em] font-semibold">
          {t("submitted.title.0")}<ItalicAccent>{form.name.split(" ")[0]}</ItalicAccent>{t("submitted.title.1")}
        </h3>
        <p className="text-fg-muted m-0 text-[15px]">
          {t("submitted.body.0")}<strong className="text-fg">{form.email}</strong>{t("submitted.body.1")}
        </p>
      </div>
    );
  }

  const kindLabel = t(`kinds.${stored.input.kind}`);

  return (
    <div className="bg-bg-card rounded-[32px] p-6 lg:p-12 flex flex-col gap-6">
      <div className="rounded-[20px] border border-accent/40 bg-accent/[0.06] p-5 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">{t("summary.kicker")}</span>
          <span className="text-[18px] font-medium text-fg">
            {kindLabel} · <span className="text-accent font-display italic">{fmt(stored.total)}</span> <span className="font-mono text-[12px] text-fg-muted">PLN</span>
          </span>
        </div>
        <Link
          href="/pricing"
          onClick={() => clearQuote()}
          className="text-[12px] font-mono text-accent hover:underline shrink-0"
        >
          {t("summary.edit")} →
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-[28px] lg:text-[36px] font-semibold leading-none tracking-[-0.025em] m-0">
          {t("title.0")}<ItalicAccent>{t("title.1")}</ItalicAccent>{t("title.2")}
        </h2>
        <div className="flex gap-1">
          <span className={`w-6 h-1 rounded ${step === 0 ? "bg-accent" : "bg-fg-muted"}`} />
          <span className={`w-6 h-1 rounded ${step === 1 ? "bg-accent" : "bg-line"}`} />
        </div>
      </div>

      {step === 0 && (
        <div className="flex flex-col gap-5">
          <Field label={t("fields.name")} required>
            <input className="brief-input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t("placeholders.name")} />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t("fields.email")} required>
              <input className="brief-input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder={t("placeholders.email")} />
            </Field>
            <Field label={t("fields.company")}>
              <input className="brief-input" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder={t("placeholders.company")} />
            </Field>
          </div>
          <div className="flex justify-between mt-4">
            <span />
            <BriefBtn disabled={!canNext0} variant="primary" onClick={() => setStep(1)}>{t("nav.next")} →</BriefBtn>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <Field label={t("fields.desc")} required>
            <textarea
              className="brief-input min-h-[140px] leading-[1.5] resize-y"
              value={form.desc}
              onChange={(e) => update("desc", e.target.value)}
              placeholder={t(`placeholders.desc.${stored.input.kind}`)}
            />
            <span className="text-[11px] text-fg-muted font-mono mt-1">{form.desc.length} / {t("fields.descMin")}</span>
          </Field>
          <Field label={t("fields.timelineNote")}>
            <input
              className="brief-input"
              value={form.timelineNote}
              onChange={(e) => update("timelineNote", e.target.value)}
              placeholder={t("placeholders.timelineNote")}
            />
          </Field>
          <div className="flex justify-between mt-4">
            <BriefBtn variant="secondary" onClick={() => setStep(0)}>← {t("nav.back")}</BriefBtn>
            <BriefBtn
              disabled={!canSubmit}
              variant="primary"
              onClick={async () => {
                try {
                  await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: form.name,
                      email: form.email,
                      company: form.company,
                      message: form.desc,
                      timelineNote: form.timelineNote,
                      quote: stored,
                    }),
                  });
                } catch (err) {
                  console.error("brief submission failed", err);
                }
                setSubmitted(true);
              }}
            >
              {t("nav.submit")} →
            </BriefBtn>
          </div>
        </div>
      )}

      <style>{`
        .brief-input {
          width: 100%; padding: 14px 18px;
          background: rgb(var(--bg)); color: rgb(var(--fg));
          border: 1px solid rgb(var(--line)); border-radius: 12px;
          font-size: 15px; font-family: inherit; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .brief-input:focus { outline: none; border-color: rgb(var(--accent)); }
        .brief-input::placeholder { color: rgb(var(--fg-muted)); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted flex justify-between">
        {label}
        {required && <em className="not-italic text-accent">●</em>}
      </label>
      {children}
    </div>
  );
}

function BriefBtn({ children, onClick, variant, disabled }: { children: React.ReactNode; onClick: () => void; variant: "primary" | "secondary"; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-7 py-3.5 rounded-full text-sm font-semibold transition ${
        variant === "primary"
          ? "bg-accent text-accent-fg disabled:bg-line disabled:text-fg-muted"
          : "bg-transparent text-fg border border-line hover:border-fg-muted"
      }`}
    >
      {children}
    </button>
  );
}
