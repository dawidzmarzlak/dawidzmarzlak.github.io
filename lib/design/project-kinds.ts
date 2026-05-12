export const PROJECT_KINDS = ["site", "shop", "app"] as const;
export type ProjectKind = typeof PROJECT_KINDS[number];

// --- SITE ---
export const SITE_PLATFORMS = ["wp", "nextjs"] as const;
export type SitePlatform = typeof SITE_PLATFORMS[number];

// Content sourcing — does the client provide the content (text/images),
// or do we prepare it? Default 'client' is free; 'creator' adds setup cost.
export const CONTENT_SOURCES = ["client", "creator"] as const;
export type ContentSource = typeof CONTENT_SOURCES[number];

export const SITE_INTEGRATIONS = [
  "analytics", "newsletter", "form", "chat", "map", "booking",
  // New addons (2025/2026 market calibration)
  "wcag-aa", "animations-medium", "animations-premium",
  "cwv-basic", "cwv-full", "seo-onpage", "seo-tech-full",
  "blog-cms", "multistep-form", "configurator", "rodo-pack",
] as const;
export type SiteIntegration = typeof SITE_INTEGRATIONS[number];

// Most commonly requested site addons — shown by default in the calculator.
// Remaining options surface via the "Show all" toggle.
export const POPULAR_SITE_INTEGRATIONS: readonly SiteIntegration[] = [
  "analytics", "form", "newsletter", "blog-cms", "seo-onpage", "wcag-aa", "animations-medium",
];

// --- SHOP ---
export const SHOP_PLATFORMS = ["woo", "presta", "shopify", "custom"] as const;
export type ShopPlatform = typeof SHOP_PLATFORMS[number];

export const CATALOG_SIZES = ["sm", "md", "lg", "xl"] as const;
export type CatalogSize = typeof CATALOG_SIZES[number];

export const PAYMENT_GATEWAYS = ["blik", "p24", "stripe", "paypal", "card"] as const;
export type PaymentGateway = typeof PAYMENT_GATEWAYS[number];

export const SHOP_INTEGRATIONS = [
  "courier", "newsletter", "crm", "allegro", "marketplace", "subscription",
  // New addons (2025/2026 market calibration)
  "baselinker-basic", "baselinker-std", "empik-amazon", "ceneo-google",
  "dropshipping", "wholesale-xml", "ksef", "omnibus", "nip-gus", "vat-faktury",
  "product-configurator", "loyalty", "multi-warehouse", "reviews",
] as const;
export type ShopIntegration = typeof SHOP_INTEGRATIONS[number];

// Most commonly requested shop addons — shown by default in the calculator.
export const POPULAR_SHOP_INTEGRATIONS: readonly ShopIntegration[] = [
  "courier", "newsletter", "crm", "baselinker-basic", "ksef", "allegro", "omnibus", "reviews",
];

export const ERP_OPTIONS = ["none", "subiekt", "wapro", "comarch", "custom"] as const;
export type ErpOption = typeof ERP_OPTIONS[number];

// --- APP ---
export const APP_TYPES = ["saas", "internal", "portal", "dashboard", "marketplace", "other"] as const;
export type AppType = typeof APP_TYPES[number];

export const APP_AUTH = ["none", "email", "oauth", "sso"] as const;
export type AppAuth = typeof APP_AUTH[number];

export const APP_BACKENDS = ["spring", "node", "next-api", "other"] as const;
export type AppBackend = typeof APP_BACKENDS[number];

export const APP_STORAGE = ["postgres", "mongo", "redis", "files", "mixed"] as const;
export type AppStorage = typeof APP_STORAGE[number];

export const APP_INTEGRATIONS = [
  "payments", "sms", "email", "ai", "external-api", "websockets",
  // New addons (2025/2026 market calibration)
  "rbac", "admin-panel", "i18n", "rest-openapi", "graphql",
  "export-files", "import-mass", "push-notifications",
  "search-elastic", "upload-s3", "stripe-subs",
] as const;
export type AppIntegration = typeof APP_INTEGRATIONS[number];

// Most commonly requested app addons — shown by default in the calculator.
export const POPULAR_APP_INTEGRATIONS: readonly AppIntegration[] = [
  "payments", "email", "rbac", "admin-panel", "rest-openapi", "stripe-subs", "ai",
];

// --- SHARED ---
export const DESIGN_TIERS = ["lite", "standard", "premium"] as const;
export type DesignTier = typeof DESIGN_TIERS[number];

export const SUPPORT_TIERS = ["none", "basic", "pro"] as const;
export type SupportTier = typeof SUPPORT_TIERS[number];

export const HOSTINGS = ["client", "vercel", "vps"] as const;
export type Hosting = typeof HOSTINGS[number];

export const TIMELINES = ["normal", "rush"] as const;
export type Timeline = typeof TIMELINES[number];

// --- BUSINESS CONTEXT (zero-cost, informational) ---
export const INDUSTRIES = [
  "services", "ecommerce", "food", "education", "health", "realestate",
  "sport", "travel", "saas", "creative", "nonprofit", "other",
] as const;
export type Industry = typeof INDUSTRIES[number];

export const AUDIENCES = ["b2c", "b2b", "b2b2c", "internal"] as const;
export type Audience = typeof AUDIENCES[number];

export const PROJECT_STAGES = ["new", "redesign", "continuation"] as const;
export type ProjectStage = typeof PROJECT_STAGES[number];
