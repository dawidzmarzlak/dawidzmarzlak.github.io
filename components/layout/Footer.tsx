import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const studioLinks = t.raw("linksList.studio") as string[];
  const serviceLinks = t.raw("linksList.services") as string[];

  return (
    <footer className="max-w-[1400px] mx-auto px-9 py-10">
      <div className="bg-bg-card rounded-[32px] p-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-9 border-b border-line">
          <div>
            <h3 className="text-[32px] m-0 mb-4 font-semibold tracking-[-0.02em] text-fg">
              {t("brand")}
            </h3>
            <p className="text-[14px] text-fg-muted max-w-[32ch] leading-[1.55] m-0">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted m-0 mb-4">
              {t("colServices")}
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {serviceLinks.map((label, i) => (
                <li key={i}>
                  <Link
                    href="/services"
                    className="text-fg opacity-75 text-[14px] no-underline hover:opacity-100 transition-opacity"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted m-0 mb-4">
              {t("colStudio")}
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {studioLinks.map((label, i) => {
                // [About, Portfolio, Blog, Pricing] — Portfolio (1) -> /portfolio,
                // About (0) -> /about, Pricing (3) -> /pricing; Blog (2) stubs to "#"
                // until that page lands.
                const href =
                  i === 1 ? "/portfolio" : i === 0 ? "/about" : i === 3 ? "/pricing" : "#";
                return (
                  <li key={i}>
                    <Link
                      href={href}
                      className="text-fg opacity-75 text-[14px] no-underline hover:opacity-100 transition-opacity"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted m-0 mb-4">
              {t("colContact")}
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-fg opacity-75 text-[14px]">
              <li>hello@itsolutions.com</li>
              <li>+48 123 456 789</li>
              <li>Warszawa, PL</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex justify-between gap-4 flex-wrap font-mono text-[11px] text-fg-muted">
          <span>{t("copy")}</span>
          <span>{t("legal")}</span>
        </div>
      </div>
    </footer>
  );
}
