"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { computeAdvancedQuote, type AdvancedQuoteInput } from "@/lib/design/calculator";
import { PRESETS, type PresetKey } from "@/lib/design/pricing-presets";
import { saveQuote } from "@/lib/design/quote-store";
import { PricingPresets } from "./PricingPresets";
import { AdvancedCalculator } from "./AdvancedCalculator";
import { PriceBreakdown } from "./PriceBreakdown";

const DEFAULT_PRESET: PresetKey = "company";

export function PricingPageClient() {
  const [activeKey, setActiveKey] = useState<PresetKey | null>(DEFAULT_PRESET);
  const [input, setInput] = useState<AdvancedQuoteInput>(
    PRESETS.find((p) => p.key === DEFAULT_PRESET)!.input
  );

  const handlePreset = (key: PresetKey) => {
    const p = PRESETS.find((x) => x.key === key);
    if (!p) return;
    setActiveKey(key);
    setInput(p.input);
  };

  const handleInputChange = (next: AdvancedQuoteInput) => {
    setInput(next);
    setActiveKey(null);
  };

  const quote = useMemo(() => computeAdvancedQuote(input), [input]);

  const params = useSearchParams();
  useEffect(() => {
    const kindParam = params.get("kind");
    if (kindParam !== "site" && kindParam !== "shop" && kindParam !== "app") return;
    setInput((prev) => {
      if (prev.kind === kindParam) return prev;
      const shared = {
        designTier: prev.designTier, languages: prev.languages,
        hosting: prev.hosting, supportTier: prev.supportTier, timeline: prev.timeline,
        industry: prev.industry, audience: prev.audience, stage: prev.stage,
      };
      if (kindParam === "site") return { kind: "site", ...shared, site: { platform: "nextjs", pages: 6, cms: true, siteIntegrations: ["analytics"] } };
      if (kindParam === "shop") return { kind: "shop", ...shared, shop: { platform: "woo", catalogSize: "md", contentPages: 5, paymentGateways: ["blik", "p24"], shopIntegrations: ["courier"], erp: "none" } };
      return { kind: "app", ...shared, app: { appType: "saas", auth: "email", backend: "spring", roles: 2, appIntegrations: ["payments"], storage: "postgres", mobile: false } };
    });
    setActiveKey(null);
  }, [params]);

  useEffect(() => {
    saveQuote({
      input,
      total: quote.total,
      supportYearly: quote.supportYearly,
      timestamp: Date.now(),
    });
  }, [input, quote.total, quote.supportYearly]);

  return (
    <section className="max-w-[1400px] mx-auto px-5 lg:px-9 py-10">
      <PricingPresets activeKey={activeKey} onSelect={handlePreset} />
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
        <AdvancedCalculator value={input} onChange={handleInputChange} />
        <PriceBreakdown quote={quote} />
      </div>
    </section>
  );
}
