export type Tone = "dark" | "light" | "accent";
export type Size = "big" | "med" | "small";
export type Tag = "next" | "wp" | "ecom" | "app";

export interface Project {
  name: string;
  cat: string;
  tags: Tag[];
  year: string;
  metric: string;
  desc: string;
  size: Size;
  tone: Tone;
  color?: string;
}

export const PROJECTS: Project[] = [
  { name: "FashionHub",   cat: "E-commerce",   tags: ["next", "ecom"], year: "2024", metric: "+187%",            desc: "Re-platforming z Magento na Next.js Commerce. Konwersja +187%, LCP z 4.2s do 1.2s.", size: "big",   tone: "dark",   color: "#0e0d0c" },
  { name: "TechCorp",     cat: "Korporacyjny", tags: ["wp"],           year: "2024", metric: "LCP 1.2s",         desc: "Strona korporacyjna IT z multilang. Custom WP theme bez page-builderów.",            size: "med",   tone: "light" },
  { name: "MediClinic",   cat: "Aplikacja",    tags: ["app"],          year: "2023", metric: "12k pacjentów",    desc: "Portal pacjenta z systemem rezerwacji + płatności online. Spring Boot + Next.",      size: "med",   tone: "accent" },
  { name: "HomeDesign",   cat: "WooCommerce",  tags: ["ecom"],         year: "2023", metric: "2400 SKU",         desc: "Sklep z meblami + konfigurator 3D. WooCommerce 8 + Three.js.",                       size: "small", tone: "light" },
  { name: "EduPlatform",  cat: "EdTech",       tags: ["next", "app"],  year: "2023", metric: "8k studentów",     desc: "Platforma do nauki online — wideo, quizy, certyfikaty. Next.js + Mux + Sanity.",      size: "small", tone: "dark" },
  { name: "FoodDelivery", cat: "Marketplace",  tags: ["ecom"],         year: "2022", metric: "150+ restauracji", desc: "Marketplace z jedzeniem — multistore na PrestaShop, integracja kurierów.",            size: "big",   tone: "accent", color: "#d4ff52" },
  { name: "LocalLaw",     cat: "Korporacyjny", tags: ["wp"],           year: "2022", metric: "230 leadów/mc",    desc: "Strona kancelarii z lokalnym SEO. WordPress + zaawansowane formularze.",              size: "small", tone: "light" },
  { name: "BookingPro",   cat: "Aplikacja",    tags: ["app"],          year: "2024", metric: "+412% rezerwacji", desc: "System rezerwacji dla hoteli — multi-property, dynamic pricing.",                     size: "med",   tone: "dark" },
];

export type FilterKey = "all" | Tag;

export const FILTERS: Array<[FilterKey, string]> = [
  ["all", "Wszystkie"],
  ["next", "Next.js"],
  ["wp", "WordPress"],
  ["ecom", "E-commerce"],
  ["app", "Aplikacje"],
];

export function filterProjects(filter: FilterKey): Project[] {
  if (filter === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.tags.includes(filter as Tag));
}
