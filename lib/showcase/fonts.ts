import {
  Cormorant_Garamond,
  Playfair_Display,
  Space_Grotesk,
  DM_Serif_Display,
  DM_Sans,
  Caveat,
  Nunito,
  Lato,
  IBM_Plex_Sans,
  Inter,
  Sacramento,
} from "next/font/google";

// Luxury Hotel fonts
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Fine Dining fonts
export const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

// Spa & Wellness fonts
export const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sacramento",
  display: "swap",
});

// Architecture Studio fonts
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

// Artisan Cafe fonts
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

// Combine all font variables for the showcase layout
export const allShowcaseFonts = [
  cormorantGaramond,
  inter,
  playfairDisplay,
  lato,
  nunito,
  sacramento,
  spaceGrotesk,
  ibmPlexSans,
  dmSerifDisplay,
  dmSans,
  caveat,
];

export const showcaseFontVariables = allShowcaseFonts
  .map((font) => font.variable)
  .join(" ");
