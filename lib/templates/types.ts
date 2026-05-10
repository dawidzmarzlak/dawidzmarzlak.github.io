export interface BrandMeta {
  slug: string;
  brandName: string;
  industry: string;
  tagline: string;
  locale: string;
}

export interface ThemeTokens {
  palette: ThemePalette;
  fonts: ThemeFonts;
  radius: ThemeRadius;
}

export interface ThemePalette {
  bg: string;
  fg: string;
  accent: string;
  [k: string]: string;
}

export interface ThemeFonts {
  display: string;
  body: string;
  accent: string;
  [k: string]: string;
}

export interface ThemeRadius {
  sm: string;
  md: string;
  lg: string;
  [k: string]: string;
}

export interface BrandContent {
  [section: string]: unknown;
}

export interface MediaRegistry {
  [key: string]: string | string[];
}

export interface BrandConfig {
  meta: BrandMeta;
  theme: ThemeTokens;
  content: BrandContent;
  media: MediaRegistry;
}
