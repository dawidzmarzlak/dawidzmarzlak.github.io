import { z } from "zod";

const HexColor = z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);

export const BrandMetaSchema = z.object({
  slug: z.string().min(1),
  brandName: z.string().min(1),
  industry: z.string().min(1),
  tagline: z.string().min(1),
  locale: z.string().min(2),
});

export const ThemePaletteSchema = z.object({
  bg: HexColor,
  fg: HexColor,
  accent: HexColor,
}).catchall(HexColor);

export const ThemeFontsSchema = z.object({
  display: z.string().min(1),
  body: z.string().min(1),
  accent: z.string().min(1),
}).catchall(z.string().min(1));

export const ThemeRadiusSchema = z.object({
  sm: z.string().min(1),
  md: z.string().min(1),
  lg: z.string().min(1),
}).catchall(z.string().min(1));

export const ThemeTokensSchema = z.object({
  palette: ThemePaletteSchema,
  fonts: ThemeFontsSchema,
  radius: ThemeRadiusSchema,
});

export const MediaRegistrySchema = z.record(
  z.string(),
  z.union([z.string(), z.array(z.string())]),
);

export const BrandConfigSchema = z.object({
  meta: BrandMetaSchema,
  theme: ThemeTokensSchema,
  content: z.record(z.string(), z.unknown()),
  media: MediaRegistrySchema,
});

export type BrandConfigParsed = z.infer<typeof BrandConfigSchema>;
