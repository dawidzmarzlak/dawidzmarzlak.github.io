import type { BrandConfig } from "@/lib/templates/types";

export interface CafeMenuItem {
  name: string;
  price: string;
  featured: boolean;
}

export interface CafeMenuCategory {
  key: string;
  label: string;
  iconName: "Coffee" | "Leaf" | "Croissant" | "Cookie";
  items: CafeMenuItem[];
}

export interface CafeStoryValue {
  key: string;
  label: string;
  iconName: "Heart" | "Leaf" | "Users";
}

export interface CafePolaroid {
  caption: string;
  rotation: number;
  positionClass: string;
  widthClass: string;
  imageKey: string;
  alt: string;
}

export interface CafeStoryContent {
  title: string;
  description: string;
  values: CafeStoryValue[];
  polaroids: CafePolaroid[];
  stickerText: string;
}

export interface ArtisanCafeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  story: CafeStoryContent;
  menu: {
    title: string;
    subtitle: string;
    featuredLabel: string;
    categories: CafeMenuCategory[];
  };
  location: {
    title: string;
    address: string;
    hours: { day: string; range: string }[];
    mapPinLabel: string;
    directionsCta: string;
  };
}

export const artisanCafeConfig: BrandConfig = {
  meta: {
    slug: "artisan-cafe",
    brandName: "Bean & Brew",
    industry: "Gastronomy",
    tagline: "Coffee with Passion, Taste with Character",
    locale: "en",
  },
  theme: {
    palette: {
      bg: "#FFF8F0",
      fg: "#5C4033",
      accent: "#C65D3B",
      muted: "#6B7B3C",
      surface: "#4A3328",
      surfaceAlt: "#E8DFD0",
    },
    fonts: {
      display: "var(--font-dm-serif)",
      body: "var(--font-dm-sans)",
      accent: "var(--font-caveat)",
    },
    radius: {
      sm: "4px",
      md: "12px",
      lg: "9999px",
    },
  },
  content: {
    hero: {
      eyebrow: "Bean & Brew",
      title: "Every Cup Tells a Story",
      subtitle:
        "Artisan coffee brewed with love. Beans from small farms, baked fresh daily.",
      primaryCta: "Visit Us",
      secondaryCta: "View Menu",
    },
    story: {
      title: "Our Story",
      description:
        "Bean & Brew was born from a love of coffee and the belief that the best cup is one made with heart. Since 2018, we've been serving coffee from the finest micro-roasters.",
      values: [
        { key: "quality", label: "Quality above all", iconName: "Heart" },
        { key: "sustainability", label: "Sustainable sourcing", iconName: "Leaf" },
        { key: "community", label: "Local community", iconName: "Users" },
      ],
      polaroids: [
        {
          caption: "Est. 2018",
          rotation: -8,
          positionClass: "top-0 left-0",
          widthClass: "w-48",
          imageKey: "polaroid1",
          alt: "Coffee beans",
        },
        {
          caption: "Fresh daily",
          rotation: 5,
          positionClass: "top-20 left-32",
          widthClass: "w-52",
          imageKey: "polaroid2",
          alt: "Latte art",
        },
        {
          caption: "Made with love",
          rotation: -3,
          positionClass: "bottom-0 left-16",
          widthClass: "w-44",
          imageKey: "polaroid3",
          alt: "Fresh pastries",
        },
      ],
      stickerText: "100%\nOrganic",
    },
    menu: {
      title: "Our Menu",
      subtitle: "Handcrafted with the finest ingredients",
      featuredLabel: "Featured",
      categories: [
        {
          key: "coffee",
          label: "Coffee",
          iconName: "Coffee",
          items: [
            { name: "Espresso", price: "12", featured: false },
            { name: "Flat White", price: "18", featured: true },
            { name: "Pour Over", price: "22", featured: true },
            { name: "Cold Brew", price: "16", featured: false },
          ],
        },
        {
          key: "tea",
          label: "Tea",
          iconName: "Leaf",
          items: [
            { name: "Matcha Latte", price: "18", featured: true },
            { name: "Earl Grey", price: "14", featured: false },
            { name: "Chai Latte", price: "16", featured: false },
          ],
        },
        {
          key: "food",
          label: "Snacks",
          iconName: "Croissant",
          items: [
            { name: "Avocado Toast", price: "28", featured: true },
            { name: "Granola Bowl", price: "24", featured: false },
            { name: "Eggs Benedict", price: "32", featured: false },
          ],
        },
        {
          key: "pastries",
          label: "Pastries",
          iconName: "Cookie",
          items: [
            { name: "Croissant", price: "12", featured: false },
            { name: "Cinnamon Roll", price: "14", featured: true },
            { name: "Banana Bread", price: "10", featured: false },
          ],
        },
      ],
    },
    location: {
      title: "Visit Us",
      address: "15 Coffee Lane, London",
      hours: [
        { day: "Mon-Fri", range: "7:00 - 20:00" },
        { day: "Sat-Sun", range: "8:00 - 18:00" },
      ],
      mapPinLabel: "Find us here!",
      directionsCta: "Get Directions",
    },
  } satisfies Record<keyof ArtisanCafeContent, unknown>,
  media: {
    hero: "/showcase/artisan-cafe/hero.jpg",
    polaroid1: "/showcase/artisan-cafe/beans.jpg",
    polaroid2: "/showcase/artisan-cafe/latte-art.jpg",
    polaroid3: "/showcase/artisan-cafe/pastry.jpg",
    interior: "/showcase/artisan-cafe/interior.jpg",
  },
};
