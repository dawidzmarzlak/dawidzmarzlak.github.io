import type { BrandConfig } from "@/lib/templates/types";

export interface FashionProduct {
  id: string;
  name: string;
  price: string;
  imageSrc: string;
  badge?: "newArrival" | null;
}

export interface FashionCollection {
  key: string;
  label: string;
  imageSrc: string;
}

export interface FashionHeroContent {
  brandLabel: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  seasonLabel: string;
  viewCollectionLabel: string;
  features: string[];
}

export interface FashionCollectionsContent {
  title: string;
  subtitle: string;
  viewCollectionCta: string;
  items: FashionCollection[];
}

export interface FashionProductsContent {
  title: string;
  subtitle: string;
  addToCartCta: string;
  newArrivalBadge: string;
  items: FashionProduct[];
}

export interface FashionNewsletterContent {
  title: string;
  description: string;
  placeholder: string;
  button: string;
}

export interface FashionStoreContent {
  hero: FashionHeroContent;
  collections: FashionCollectionsContent;
  products: FashionProductsContent;
  newsletter: FashionNewsletterContent;
}

export const fashionStoreConfig: BrandConfig = {
  // NOTE: meta.brandName / meta.industry / meta.tagline are also duplicated in
  // messages/en.json and messages/pl.json (showcase.fashion-store.{...}) because
  // the unrefactored ShowcaseList component still reads them from i18n. Keep both
  // in sync until ShowcaseList is refactored (Phase 2 plan).
  meta: {
    slug: "fashion-store",
    brandName: "MAISON ÉLISE",
    industry: "Fashion",
    tagline: "Timeless Elegance",
    locale: "en",
  },
  theme: {
    palette: {
      bg: "#FAFAFA",
      fg: "#0A0A0A",
      fgHover: "#1A1A1A",
      accent: "#D4A5A5",
      muted: "#666666",
      mutedLight: "#999999",
      surface: "#FFFFFF",
      surfaceAlt: "#F5F5F5",
      border: "#E5E5E5",
      brandLabel: "#8B7355",
    },
    fonts: {
      display: "var(--font-cormorant)",
      body: "var(--font-montserrat)",
      accent: "var(--font-montserrat)",
    },
    radius: {
      sm: "0px",
      md: "0px",
      lg: "9999px",
    },
  },
  content: {
    hero: {
      brandLabel: "MAISON ÉLISE",
      title: "New Collection",
      subtitle:
        "Discover sophisticated designs that define modern luxury. Handcrafted with the finest materials.",
      primaryCta: "Discover Collection",
      secondaryCta: "Lookbook",
      seasonLabel: "Spring/Summer 2025",
      viewCollectionLabel: "View Collection",
      // Sourced from the original about.{craftsmanship,sustainable,exclusive} i18n block —
      // FashionAbout was unused so these strings were consolidated into the hero strip.
      // If FashionAbout is wired up in Phase 2, decide whether to duplicate or reference these.
      features: ["Handcrafted", "Sustainable Fashion", "Exclusive Materials"],
    },
    collections: {
      title: "Collections",
      subtitle: "Seasonal inspirations",
      viewCollectionCta: "View Collection",
      items: [
        {
          key: "spring",
          label: "Spring/Summer 2025",
          imageSrc: "/showcase/fashion-store/collection-1.jpg",
        },
        {
          key: "autumn",
          label: "Autumn/Winter 2024",
          imageSrc: "/showcase/fashion-store/collection-2.jpg",
        },
        {
          key: "essentials",
          label: "Essentials",
          imageSrc: "/showcase/fashion-store/collection-3.jpg",
        },
      ],
    },
    products: {
      title: "Bestsellers",
      subtitle: "Our most popular products",
      addToCartCta: "Add to Cart",
      newArrivalBadge: "New Arrival",
      items: [
        {
          id: "silk-blouse",
          name: "Silk Blouse",
          price: "$320",
          imageSrc: "/showcase/fashion-store/product-1.jpg",
          badge: "newArrival",
        },
        {
          id: "wool-coat",
          name: "Wool Coat",
          price: "$890",
          imageSrc: "/showcase/fashion-store/product-2.jpg",
          badge: null,
        },
        {
          id: "cashmere-sweater",
          name: "Cashmere Sweater",
          price: "$450",
          imageSrc: "/showcase/fashion-store/product-3.jpg",
          badge: "newArrival",
        },
        {
          id: "leather-bag",
          name: "Leather Bag",
          price: "$680",
          imageSrc: "/showcase/fashion-store/product-4.jpg",
          badge: null,
        },
      ],
    },
    newsletter: {
      title: "Stay Updated",
      description: "Subscribe and get 10% off your first order",
      placeholder: "Your email",
      button: "Subscribe",
    },
  } satisfies Record<keyof FashionStoreContent, unknown>,
  media: {
    hero: "/showcase/fashion-store/hero.jpg",
  },
};
