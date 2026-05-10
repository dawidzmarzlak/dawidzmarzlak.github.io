"use client";

// Re-exports the TemplateProvider's internal context object as nullable so shared chrome
// can opportunistically theme itself when wrapped, without hard-requiring a provider.
import { createContext } from "react";
import type { BrandConfig } from "@/lib/templates/types";

export const TemplateContextOptional = createContext<BrandConfig | null>(null);
