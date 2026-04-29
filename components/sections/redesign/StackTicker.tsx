import { Ticker } from "@/components/animations/Ticker";

const PILLS: Array<[string, string, boolean?]> = [
  ["Next.js", "Vercel", true],
  ["React 18", "TypeScript"],
  ["WordPress", "Custom theme"],
  ["WooCommerce", "PayU · Stripe"],
  ["PrestaShop", "1.7 → 8.x"],
  ["Spring Boot", "Java 21"],
  ["PostgreSQL", "MongoDB"],
  ["Tailwind", "Framer Motion"],
  ["Sanity", "Strapi · MDX"],
  ["AWS · Docker", "CI/CD"],
  ["Lighthouse 95+", "Core Web Vitals"],
  ["Schema.org", "SEO-ready"],
];

export function StackTicker() {
  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 pt-2 pb-8" aria-label="Tech stack">
      <div className="bg-bg-card rounded-[24px] py-8 relative overflow-hidden">
        <Ticker speed={45} gap={14}>
          {PILLS.map(([a, b, hot], i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-5 py-2.5 border border-line rounded-full text-[15px] font-medium text-fg whitespace-nowrap"
            >
              {hot && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              {a} <em className="font-display italic text-accent ml-1">{b}</em>
            </span>
          ))}
        </Ticker>
      </div>
    </section>
  );
}
