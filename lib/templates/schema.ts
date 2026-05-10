import { z } from "zod";

// Permits CSS hex color shorthands: #RGB (3), #RGBA (4), #RRGGBB (6), #RRGGBBAA (8).
const HexColor = z.string().regex(/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);

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
  z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
);

/**
 * Boundary contract for showcase-template configs. Validates a `BrandConfig` at the
 * extract-CLI gate and at provider mount in tests. Per-showcase configs live in
 * `lib/showcase/<slug>/template.config.ts` and parse against this schema.
 */
export const BrandConfigSchema = z.object({
  meta: BrandMetaSchema,
  theme: ThemeTokensSchema,
  content: z.record(z.string(), z.unknown()),
  media: MediaRegistrySchema,
});

export type BrandConfigParsed = z.infer<typeof BrandConfigSchema>;
