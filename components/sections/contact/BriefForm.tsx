"use client";
import { useState } from "react";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

type Step = 0 | 1 | 2 | 3;

interface FormState {
  name: string; email: string; company: string;
  type: string; budget: string; timeline: string;
  desc: string;
}

const TYPE_OPTIONS: Array<[string, string]> = [
  ["next", "Next.js"], ["wp", "WordPress"], ["woo", "WooCommerce"], ["presta", "PrestaShop"], ["app", "Aplikacja"],
];
const BUDGET_OPTIONS: Array<[string, string]> = [
  ["s", "do 10k"], ["m", "10–25k"], ["l", "25–60k"], ["xl", "60k+"],
];
const TIMELINE_OPTIONS: Array<[string, string]> = [
  ["rush", "Asap"], ["1m", "1 mies."], ["3m", "2–3 mies."], ["6m", "6+ mies."],
];

export function BriefForm() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", type: "", budget: "", timeline: "", desc: "" });
  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const canNext0 = !!form.name && !!form.email && form.email.includes("@");
  const canNext1 = !!form.type && !!form.budget;
  const canSubmit = form.desc.length > 20;

  return (
    <div className="bg-bg-card rounded-[32px] p-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[36px] font-semibold leading-none tracking-[-0.025em] m-0">
          {step === 3 ? "Wysłane!" : <>Brief w <ItalicAccent>3 krokach</ItalicAccent></>}
        </h2>
        {step < 3 && (
          <div className="flex gap-1">
            <span className={`w-6 h-1 rounded ${step === 0 ? "bg-accent" : step > 0 ? "bg-fg-muted" : "bg-line"}`} />
            <span className={`w-6 h-1 rounded ${step === 1 ? "bg-accent" : step > 1 ? "bg-fg-muted" : "bg-line"}`} />
            <span className={`w-6 h-1 rounded ${step === 2 ? "bg-accent" : "bg-line"}`} />
          </div>
        )}
      </div>

      {step === 0 && (
        <div className="flex flex-col gap-5">
          <Field label="Imię i nazwisko" required>
            <input className="brief-input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="np. Anna Kowalska" />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Email" required>
              <input className="brief-input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="anna@firma.pl" />
            </Field>
            <Field label="Firma">
              <input className="brief-input" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="opcjonalnie" />
            </Field>
          </div>
          <div className="flex justify-between mt-8">
            <span />
            <BriefBtn disabled={!canNext0} variant="primary" onClick={() => setStep(1)}>Dalej →</BriefBtn>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <Field label="Typ projektu" required>
            <OptionRow options={TYPE_OPTIONS} value={form.type} onChange={(v) => update("type", v)} cols={5} />
          </Field>
          <Field label="Budżet" required>
            <OptionRow options={BUDGET_OPTIONS} value={form.budget} onChange={(v) => update("budget", v)} cols={4} />
          </Field>
          <Field label="Termin">
            <OptionRow options={TIMELINE_OPTIONS} value={form.timeline} onChange={(v) => update("timeline", v)} cols={4} />
          </Field>
          <div className="flex justify-between mt-8">
            <BriefBtn variant="secondary" onClick={() => setStep(0)}>← Wstecz</BriefBtn>
            <BriefBtn disabled={!canNext1} variant="primary" onClick={() => setStep(2)}>Dalej →</BriefBtn>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <Field label="Opisz projekt w 3–5 zdaniach" required>
            <textarea
              className="brief-input min-h-[140px] leading-[1.5] resize-y"
              value={form.desc}
              onChange={(e) => update("desc", e.target.value)}
              placeholder="Co budujemy? Dla kogo? Główne funkcjonalności? Najważniejsze priorytety (szybkość, design, integracje)? Jeśli masz benchmark — link."
            />
            <span className="text-[11px] text-fg-muted font-mono mt-1">{form.desc.length} / min. 20 znaków</span>
          </Field>
          <div className="flex justify-between mt-8">
            <BriefBtn variant="secondary" onClick={() => setStep(1)}>← Wstecz</BriefBtn>
            <BriefBtn disabled={!canSubmit} variant="primary" onClick={() => setStep(3)}>Wyślij brief →</BriefBtn>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full grid place-items-center text-[36px] text-accent-fg">✓</div>
          <h3 className="text-[36px] m-0 mb-3 leading-none tracking-[-0.025em] font-semibold">
            Brief w drodze, <ItalicAccent>{form.name.split(" ")[0]}</ItalicAccent>.
          </h3>
          <p className="text-fg-muted m-0 text-[15px]">
            Odpowiadam na adres <strong className="text-fg">{form.email}</strong> w ciągu 48h. Jeśli sprawa pilna — zadzwoń na <strong className="text-fg">+48 123 456 789</strong>.
          </p>
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
        {required && <em className="not-italic text-accent">wymagane</em>}
      </label>
      {children}
    </div>
  );
}

function OptionRow({ options, value, onChange, cols }: { options: Array<[string, string]>; value: string; onChange: (v: string) => void; cols: number }) {
  return (
    <div className={`grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {options.map(([k, l]) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          className={`py-3.5 px-3 border rounded-xl text-[12px] font-mono uppercase transition-colors text-center ${
            value === k ? "bg-accent text-accent-fg border-accent" : "bg-bg text-fg border-line hover:border-fg-muted"
          }`}
        >
          {l}
        </button>
      ))}
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
