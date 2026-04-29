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

  "saas-dashboard": {
    name: "Pulse Analytics",
    slug: "saas-dashboard",
    industry: "SaaS / Technology",
    colors: {
      primary: "#6366F1",
      secondary: "#06B6D4",
      accent: "#8B5CF6",
      background: "#0F172A",
      foreground: "#F8FAFC",
      muted: "#1E293B",
    },
    fonts: {
      heading: "var(--font-urbanist)",
      body: "var(--font-plus-jakarta)",
    },
    borderRadius: "12px",
    mode: "dark",
    gradient: "from-[#6366F1] to-[#06B6D4]",
    tags: ["Glassmorphism", "Dark Mode", "Dashboard"],
  },

  "fashion-store": {
    name: "MAISON ÉLISE",
    slug: "fashion-store",
    industry: "Fashion / E-commerce",
    colors: {
      primary: "#000000",
      secondary: "#D4A5A5",
      accent: "#8B7355",
      background: "#FAFAFA",
      foreground: "#0A0A0A",
      muted: "#E5E5E5",
    },
    fonts: {
      heading: "var(--font-cormorant)",
      body: "var(--font-montserrat)",
    },
    borderRadius: "0px",
    mode: "light",
    gradient: "from-[#000000] to-[#D4A5A5]",
    tags: ["Editorial", "Minimal", "Luxury"],
  },

  "fitness-studio": {
    name: "APEX PERFORMANCE",
    slug: "fitness-studio",
    industry: "Fitness / Sports",
    colors: {
      primary: "#CCFF00",
      secondary: "#0A0A0A",
      accent: "#FFFFFF",
      background: "#0A0A0A",
      foreground: "#FFFFFF",
      muted: "#1A1A1A",
    },
    fonts: {
      heading: "var(--font-bebas)",
      body: "var(--font-inter)",
    },
    borderRadius: "0px",
    mode: "dark",
    gradient: "from-[#CCFF00] to-[#0A0A0A]",
    tags: ["Bold", "Energetic", "High-Contrast"],
  },

  "creative-agency": {
    name: "NOVA CREATIVE",
    slug: "creative-agency",
    industry: "Creative Agency",
    colors: {
      primary: "#FF6B6B",
      secondary: "#4ECDC4",
      accent: "#FFE66D",
      background: "#FFF8E7",
      foreground: "#1A1A2E",
      muted: "#F0E6D3",
    },
    fonts: {
      heading: "var(--font-space-grotesk)",
      body: "var(--font-dm-sans)",
    },
    borderRadius: "16px",
    mode: "light",
    gradient: "from-[#FF6B6B] to-[#4ECDC4]",
    tags: ["Brutalist", "Experimental", "Playful"],
  },

  "real-estate": {
    name: "Skyline Estates",
    slug: "real-estate",
    industry: "Real Estate",
    colors: {
      primary: "#0C1E3C",
      secondary: "#C5A572",
      accent: "#1E3A5F",
      background: "#FFFFFF",
      foreground: "#0C1E3C",
      muted: "#F5F5F5",
    },
    fonts: {
      heading: "var(--font-poppins)",
      body: "var(--font-source-sans)",
    },
    borderRadius: "8px",
    mode: "light",
    gradient: "from-[#0C1E3C] to-[#C5A572]",
    tags: ["Prestigious", "Modern", "Parallax"],
  },

  "music-store": {
    name: "Analog Alley",
    slug: "music-store",
    industry: "Vinyl Records Shop",
    colors: {
      primary: "#8B4513",
      secondary: "#FF6B35",
      accent: "#F4A460",
      background: "#FFF5E6",
      foreground: "#1A1A1A",
      muted: "#E8DCC8",
    },
    fonts: {
      heading: "var(--font-archivo-black)",
      body: "var(--font-work-sans)",
      accent: "var(--font-permanent-marker)",
    },
    borderRadius: "12px",
    mode: "light",
    gradient: "from-[#8B4513] to-[#FF6B35]",
    tags: ["Retro", "Audio Player", "Vinyl Animation"],
  },

  "crypto-platform": {
    name: "NexChain",
    slug: "crypto-platform",
    industry: "Web3 / Crypto",
    colors: {
      primary: "#8B5CF6",
      secondary: "#06FFA5",
      accent: "#FF006E",
      background: "#0A0A0F",
      foreground: "#FFFFFF",
      muted: "#1A1A2E",
    },
    fonts: {
      heading: "var(--font-orbitron)",
      body: "var(--font-exo)",
    },
    borderRadius: "16px",
    mode: "dark",
    gradient: "from-[#8B5CF6] via-[#06FFA5] to-[#FF006E]",
    tags: ["Futuristic", "Particles", "Neon"],
  },

  "law-firm": {
    name: "Sterling & Associates",
    slug: "law-firm",
    industry: "Law Firm",
    colors: {
      primary: "#1E3A5F",
      secondary: "#C9A227",
      accent: "#8B7355",
      background: "#FAFBFC",
      foreground: "#1A1A1A",
      muted: "#E8ECF0",
    },
    fonts: {
      heading: "var(--font-crimson-pro)",
      body: "var(--font-source-serif)",
    },
    borderRadius: "4px",
    mode: "light",
    gradient: "from-[#1E3A5F] to-[#C9A227]",
    tags: ["Professional", "Trust", "Classic"],
  },

  "podcast-studio": {
    name: "SoundWave",
    slug: "podcast-studio",
    industry: "Podcast Studio",
    colors: {
      primary: "#7C3AED",
      secondary: "#EC4899",
      accent: "#F59E0B",
      background: "#0F0A1A",
      foreground: "#FAFAFA",
      muted: "#1F1433",
    },
    fonts: {
      heading: "var(--font-syne)",
      body: "var(--font-outfit)",
    },
    borderRadius: "20px",
    mode: "dark",
    gradient: "from-[#7C3AED] via-[#EC4899] to-[#F59E0B]",
    tags: ["Audio Waveform", "Bold Gradients", "Modern"],
  },

  "wedding-planner": {
    name: "Forever & Always",
    slug: "wedding-planner",
    industry: "Wedding Planner",
    colors: {
      primary: "#D4A5A5",
      secondary: "#9CAF88",
      accent: "#C9A962",
      background: "#FFFAF7",
      foreground: "#3A3A3A",
      muted: "#F5EDE8",
    },
    fonts: {
      heading: "var(--font-cormorant)",
      body: "var(--font-nunito)",
      accent: "var(--font-great-vibes)",
    },
    borderRadius: "24px",
    mode: "light",
    gradient: "from-[#D4A5A5] to-[#9CAF88]",
    tags: ["Romantic", "Elegant", "Countdown"],
  },

  "vet-clinic": {
    name: "Happy Paws",
    slug: "vet-clinic",
    industry: "Veterinary Clinic",
    colors: {
      primary: "#0D9488",
      secondary: "#F97316",
      accent: "#FBBF24",
      background: "#F0FDF9",
      foreground: "#1A1A1A",
      muted: "#D1FAE5",
    },
    fonts: {
      heading: "var(--font-fredoka)",
      body: "var(--font-quicksand)",
    },
    borderRadius: "20px",
    mode: "light",
    gradient: "from-[#0D9488] to-[#F97316]",
    tags: ["Friendly", "Warm", "Emergency CTA"],
  },

  "coworking-space": {
    name: "The Hub",
    slug: "coworking-space",
    industry: "Coworking Space",
    colors: {
      primary: "#FACC15",
      secondary: "#18181B",
      accent: "#3B82F6",
      background: "#FAFAFA",
      foreground: "#18181B",
      muted: "#F4F4F5",
    },
    fonts: {
      heading: "var(--font-space-grotesk)",
      body: "var(--font-inter)",
    },
    borderRadius: "8px",
    mode: "light",
    gradient: "from-[#FACC15] to-[#18181B]",
    tags: ["Industrial", "Modern", "Interactive"],
  },

  "photo-portfolio": {
    name: "Lens & Light",
    slug: "photo-portfolio",
    industry: "Photography Portfolio",
    colors: {
      primary: "#1A1A1A",
      secondary: "#FFFFFF",
      accent: "#E11D48",
      background: "#0A0A0A",
      foreground: "#FAFAFA",
      muted: "#262626",
    },
    fonts: {
      heading: "var(--font-playfair)",
      body: "var(--font-lato)",
    },
    borderRadius: "0px",
    mode: "dark",
    gradient: "from-[#1A1A1A] to-[#E11D48]",
    tags: ["Immersive", "Full-bleed", "Before/After"],
  },

  "esports-team": {
    name: "PHANTOM ESPORTS",
    slug: "esports-team",
    industry: "Esports Team",
    colors: {
      primary: "#22C55E",
      secondary: "#A855F7",
      accent: "#EF4444",
      background: "#09090B",
      foreground: "#FAFAFA",
      muted: "#18181B",
    },
    fonts: {
      heading: "var(--font-rajdhani)",
      body: "var(--font-inter)",
    },
    borderRadius: "4px",
    mode: "dark",
    gradient: "from-[#22C55E] to-[#A855F7]",
    tags: ["Cyberpunk", "Glitch", "Gaming"],
  },

  "eco-brand": {
    name: "Terra Collective",
    slug: "eco-brand",
    industry: "Sustainable Brand",
    colors: {
      primary: "#166534",
      secondary: "#D97706",
      accent: "#0D9488",
      background: "#FEFDF8",
      foreground: "#1C1917",
      muted: "#ECFCCB",
    },
    fonts: {
      heading: "var(--font-fraunces)",
      body: "var(--font-dm-sans)",
    },
    borderRadius: "16px",
    mode: "light",
    gradient: "from-[#166534] to-[#D97706]",
    tags: ["Organic", "Impact Metrics", "Sustainable"],
  },
};

export const getTheme = (slug: string): ShowcaseTheme | undefined => {
  return showcaseThemes[slug];
};

export const getAllThemes = (): ShowcaseTheme[] => {
  return Object.values(showcaseThemes);
};
