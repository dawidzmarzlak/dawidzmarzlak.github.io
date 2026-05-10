// Re-exports the TemplateProvider context so shared-chrome components can
// read it via useContext without taking a direct dependency on lib/templates/provider.
// The context lives in lib/templates/context.ts (single source of truth).
export { TemplateContext as TemplateContextOptional } from "@/lib/templates/context";
