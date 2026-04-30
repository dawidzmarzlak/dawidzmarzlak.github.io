import { useTranslations } from "next-intl";
import { SectionHead } from "@/components/sections/redesign/SectionHead";
import { ItalicAccent } from "@/components/sections/redesign/ItalicAccent";

export function ProcessExtended() {
  const tExt = useTranslations("process.page");
  const tPhi = useTranslations("process.page.philosophy");
  const steps = tExt.raw("extended") as Array<[string, string]>;
  const phiTitle = tPhi.raw("title") as [string, string, string];
  const phiItems = tPhi.raw("items") as Array<[string, string]>;

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {steps.map(([title, desc], i) => (
            <article
              key={i}
              className="bg-bg-card text-fg rounded-[24px] p-7 lg:p-9 flex gap-6 items-start"
            >
              <div className="font-mono text-[12px] w-10 h-10 rounded-full grid place-items-center bg-accent text-accent-fg shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-[22px] m-0 mb-3 font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="text-[15px] leading-[1.6] text-fg-muted m-0">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20">
        <SectionHead
          kicker={tPhi("kicker")}
          title={
            <>
              {phiTitle[0]}
              <ItalicAccent>{phiTitle[1]}</ItalicAccent>
              {phiTitle[2]}
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phiItems.map(([title, desc], i) => (
            <div key={i} className="bg-bg-card rounded-[24px] p-7 flex flex-col">
              <h4 className="text-[20px] font-semibold mt-0 mb-3 tracking-[-0.01em] text-accent">{title}</h4>
              <p className="text-[15px] leading-[1.55] text-fg-muted m-0">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
