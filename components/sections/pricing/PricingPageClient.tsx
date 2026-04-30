"use client";
import { useState, useMemo } from "react";
import { computeAdvancedQuote, type AdvancedQuoteInput } from "@/lib/design/calculator";
import { PRESETS, type PresetKey } from "@/lib/design/pricing-presets";
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
