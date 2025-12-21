export interface ShowcaseTheme {
  name: string;
  slug: string;
  industry: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
    accent?: string;
  };
  borderRadius: string;
  mode: "light" | "dark";
  gradient: string;
  tags: string[];
}

export const showcaseThemes: Record<string, ShowcaseTheme> = {
  "luxury-hotel": {
    name: "Grand Riviera",
    slug: "luxury-hotel",
    industry: "Luksusowy Hotel",
    colors: {
      primary: "#C9A962",
      secondary: "#1A2A4A",
      accent: "#E5D4A1",
      background: "#F5F1E8",
      foreground: "#0A0A0A",
      muted: "#E8E4DC",
    },
    fonts: {
      heading: "var(--font-cormorant)",
      body: "var(--font-inter)",
      accent: "var(--font-cinzel)",
    },
    borderRadius: "0px",
    mode: "light",
    gradient: "from-[#C9A962] to-[#1A2A4A]",
    tags: ["Quiet Luxury", "Minimalizm", "Parallax"],
  },

  "fine-dining": {
    name: "Noir et Or",
    slug: "fine-dining",
    industry: "Restauracja Fine Dining",
    colors: {
      primary: "#722F37",
      secondary: "#D4AF37",
      accent: "#1A1A1A",
      background: "#0A0A0A",
      foreground: "#FAFAFA",
      muted: "#2A2A2A",
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-lato)",
      accent: "var(--font-italiana)",
    },
    borderRadius: "4px",
    mode: "dark",
    gradient: "from-[#722F37] to-[#D4AF37]",
    tags: ["Dark Mode", "Elegancja", "Animacje"],
  },

  "spa-wellness": {
    name: "Serenity Springs",
    slug: "spa-wellness",
    industry: "Spa & Wellness",
    colors: {
      primary: "#9CAF88",
      secondary: "#E8C4C4",
      accent: "#C4B7A6",
      background: "#FEFEFE",
      foreground: "#3A3A3A",
      muted: "#E8DFD0",
    },
    fonts: {
      heading: "var(--font-tenor)",
      body: "var(--font-nunito)",
      accent: "var(--font-sacramento)",
    },
    borderRadius: "16px",
    mode: "light",
    gradient: "from-[#9CAF88] to-[#E8C4C4]",
    tags: ["Biophilic", "Zen", "Organic"],
  },

  "architecture-studio": {
    name: "FORM & VOID",
    slug: "architecture-studio",
    industry: "Studio Architektoniczne",
    colors: {
      primary: "#000000",
      secondary: "#FF4D00",
      accent: "#808080",
      background: "#FFFFFF",
      foreground: "#000000",
      muted: "#E5E5E5",
    },
    fonts: {
      heading: "var(--font-space-grotesk)",
      body: "var(--font-ibm-plex)",
    },
    borderRadius: "0px",
    mode: "light",
    gradient: "from-[#000000] to-[#FF4D00]",
    tags: ["Ultra-Minimal", "Portfolio", "Bold"],
  },

  "artisan-cafe": {
    name: "Bean & Brew",
    slug: "artisan-cafe",
    industry: "Kawiarnia Rzemieślnicza",
    colors: {
      primary: "#5C4033",
      secondary: "#C65D3B",
      accent: "#6B7B3C",
      background: "#FFF8F0",
      foreground: "#1A1A1A",
      muted: "#E8DFD0",
    },
    fonts: {
      heading: "var(--font-dm-serif)",
      body: "var(--font-dm-sans)",
      accent: "var(--font-caveat)",
    },
    borderRadius: "8px",
    mode: "light",
    gradient: "from-[#5C4033] to-[#C65D3B]",
    tags: ["Hand-Crafted", "Warm", "Scrapbook"],
  },
};

export const getTheme = (slug: string): ShowcaseTheme | undefined => {
  return showcaseThemes[slug];
};

export const getAllThemes = (): ShowcaseTheme[] => {
  return Object.values(showcaseThemes);
};
