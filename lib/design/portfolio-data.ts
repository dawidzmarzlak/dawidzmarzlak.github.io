export type Tone = "dark" | "light" | "accent";
export type Size = "big" | "med" | "small";
export type Tag = "next" | "wp" | "ecom" | "app";
export type ClientSize = "small" | "large";

export interface PublicProject {
  kind: "public";
  name: string;
  url: string;           // pusty string = brak publicznego linku
  cat: string;
  tags: Tag[];
  year: string;
  size: Size;
  tone: Tone;
  color?: string;
}

export interface PrivateCase {
  kind: "private";
  clientSize: ClientSize;
  tags: Tag[];           // jakie technologie pokazać (np. ["app"])
  year: string;
  size: Size;
  tone: Tone;
}

export type Project = PublicProject | PrivateCase;

// <<USER_INPUT>> — wypełnić 2 realnymi publicznymi projektami później:
export const PUBLIC_PROJECTS: PublicProject[] = [
  {
    kind: "public",
    name: "<<USER_INPUT: nazwa #1>>",
    url:  "<<USER_INPUT: https://... lub ''>>",
    cat:  "<<USER_INPUT: kategoria, np. E-commerce>>",
    tags: ["next"],
    year: "2024",
    size: "big",
    tone: "dark",
  },
  {
    kind: "public",
    name: "<<USER_INPUT: nazwa #2>>",
    url:  "<<USER_INPUT>>",
    cat:  "<<USER_INPUT>>",
    tags: ["wp"],
    year: "2024",
    size: "med",
    tone: "light",
  },
];

// Anonimowe case'y — tylko clientSize + rok + tagi stacku, bez branży i metryk.
export const PRIVATE_CASES: PrivateCase[] = [
  { kind: "private", clientSize: "large", tags: ["app"],  year: "2024", size: "med",   tone: "accent" },
  { kind: "private", clientSize: "large", tags: ["ecom"], year: "2023", size: "small", tone: "dark"   },
  { kind: "private", clientSize: "small", tags: ["wp"],   year: "2024", size: "small", tone: "light"  },
  { kind: "private", clientSize: "small", tags: ["next"], year: "2023", size: "med",   tone: "dark"   },
];

export const PROJECTS: Project[] = [...PUBLIC_PROJECTS, ...PRIVATE_CASES];

export function getPublicProjects(): PublicProject[] { return PUBLIC_PROJECTS; }
export function getPrivateProjects(): PrivateCase[] { return PRIVATE_CASES; }

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
