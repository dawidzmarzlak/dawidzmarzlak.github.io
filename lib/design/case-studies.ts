export interface CaseStudyData {
  projectName: string;                              // pasuje do PUBLIC_PROJECTS[i].name
  brief: string;                                    // 2-3 zdania problemu
  stack: string[];
  hero: { label: string; value: string };
  secondary: { label: string; value: string };
  client: { name: string; role: string; year: string };
  testimonialQuote: string;                         // dosłownie cytat (z autoryzacją) lub pusty string
  deltas: Array<{ from: string; to: string; label: string }>;
}

// <<USER_INPUT>> — uzupełnić jednym (lub dwoma) realnymi case'ami później.
// Na razie struktura z placeholderami — strona renderuje się bez błędu.
export const CASE_STUDIES: CaseStudyData[] = [
  {
    projectName: "<<USER_INPUT: nazwa projektu (musi pasować do PUBLIC_PROJECTS[0].name)>>",
    brief: "<<USER_INPUT: 2-3 zdania o problemie i kontekście>>",
    stack: ["<<USER_INPUT: Next.js 14>>", "<<USER_INPUT: ...>>"],
    hero: { label: "<<USER_INPUT: np. Konwersja>>", value: "<<USER_INPUT: np. +43%>>" },
    secondary: { label: "<<USER_INPUT: np. LCP>>", value: "<<USER_INPUT: np. 1.2s>>" },
    client: { name: "<<USER_INPUT>>", role: "<<USER_INPUT>>", year: "2024" },
    testimonialQuote: "",  // pusty string = sekcja cytatu schowana (Task B3)
    deltas: [
      { from: "<<USER_INPUT>>", to: "<<USER_INPUT>>", label: "<<USER_INPUT>>" },
      { from: "<<USER_INPUT>>", to: "<<USER_INPUT>>", label: "<<USER_INPUT>>" },
      { from: "<<USER_INPUT>>", to: "<<USER_INPUT>>", label: "<<USER_INPUT>>" },
    ],
  },
];

export function getDefaultCaseStudy(): CaseStudyData {
  return CASE_STUDIES[0];
}
