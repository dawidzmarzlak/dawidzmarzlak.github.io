import { useTranslations } from "next-intl";
import { SectionHead } from "./SectionHead";
import { ItalicAccent } from "./ItalicAccent";

interface Testi {
  q: string;
  name: string;
  role: string;
  avatar: string;
  size: "big" | "med" | "lite";
}

const SIZE_CLASS: Record<Testi["size"], string> = {
  big: "bg-accent text-accent-fg md:col-span-2",
  med: "bg-bg-card text-fg",
  lite: "bg-bg-light text-fg-on-light",
};

const Q_SIZE: Record<Testi["size"], string> = {
  big: "text-[36px]",
  med: "text-[28px]",
  lite: "text-[28px]",
};

const AVATAR_BG: Record<Testi["size"], string> = {
  big: "bg-black/[0.10]",
  med: "bg-white/[0.10]",
  lite: "bg-black/[0.10]",
};

const DIVIDER_BORDER: Record<Testi["size"], string> = {
  big: "border-t-black/[0.15]",
  med: "border-t-white/[0.12]",
  lite: "border-t-black/[0.15]",
};

export function Testimonials() {
  const t = useTranslations("redesign.sections.testi");
  const tT = useTranslations("testimonials");
  const titleParts = t.raw("title") as [string, string, string];
  const items = tT.raw("items") as Testi[];

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-20">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((tm, i) => (
          <article
            key={i}
            className={`p-8 rounded-[24px] flex flex-col ${SIZE_CLASS[tm.size]}`}
          >
            <p
              className={`${Q_SIZE[tm.size]} font-medium leading-[1.25] tracking-[-0.015em] m-0 mb-auto before:content-['"'] after:content-['"']`}
            >
              {tm.q}
            </p>
            <div
              className={`flex items-center gap-3 mt-8 pt-5 border-t ${DIVIDER_BORDER[tm.size]}`}
            >
              <div
                className={`w-10 h-10 rounded-full grid place-items-center text-[13px] font-semibold flex-shrink-0 ${AVATAR_BG[tm.size]}`}
              >
                {tm.avatar}
              </div>
              <div>
                <div className="text-[14px] font-semibold">{tm.name}</div>
                <div className="text-[12px] opacity-60">{tm.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
