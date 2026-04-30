import { useTranslations } from "next-intl";
import { SectionHead } from "./SectionHead";
import { ItalicAccent } from "./ItalicAccent";

export function Process() {
  const t = useTranslations("redesign.sections.process");
  const tP = useTranslations("process");
  const titleParts = t.raw("title") as [string, string, string];
  const introParts = tP.raw("h") as [string, string, string];
  const steps = tP.raw("stepsList") as Array<[string, string]>;

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20" id="process">
      <SectionHead
        kicker={t("kicker")}
        title={
          <>
            {titleParts[0]}
            <ItalicAccent>{titleParts[1]}</ItalicAccent>
            {titleParts[2]}
          </>
        }
        cta={{ href: "/process", label: t("cta") }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4">
        <div className="bg-bg-card rounded-[24px] p-6 lg:p-9 flex flex-col">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">
            {tP("label")}
          </div>
          <h3 className="text-[40px] font-semibold tracking-[-0.03em] leading-[1.05] mt-auto m-0">
            {introParts[0]}
            <span className="text-accent">{introParts[1]}</span>
            {introParts[2]}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {steps.map(([title, desc], i) => (
            <div
              key={i}
              className="group bg-bg-card text-fg rounded-[18px] p-6 flex gap-5 items-start transition-colors hover:bg-accent hover:text-accent-fg"
            >
              <div className="font-mono text-[12px] w-8 h-8 rounded-full grid place-items-center bg-white/[0.06] group-hover:bg-black/[0.12] shrink-0 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h4 className="text-[17px] m-0 mb-1.5 font-semibold">{title}</h4>
                <p className="text-[13px] opacity-70 leading-[1.5] m-0">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
