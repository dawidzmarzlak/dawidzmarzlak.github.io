export const PROJECT_KINDS = ["site", "shop", "app"] as const;
export type ProjectKind = typeof PROJECT_KINDS[number];

// --- SITE ---
export const SITE_GOALS = ["landing", "company", "portfolio", "blog", "showcase"] as const;
export type SiteGoal = typeof SITE_GOALS[number];

export const SITE_INTEGRATIONS = ["analytics", "newsletter", "form", "chat", "map", "booking"] as const;
export type SiteIntegration = typeof SITE_INTEGRATIONS[number];

// --- SHOP ---
export const SHOP_PLATFORMS = ["woo", "presta", "shopify", "custom"] as const;
export type ShopPlatform = typeof SHOP_PLATFORMS[number];

export const CATALOG_SIZES = ["sm", "md", "lg", "xl"] as const;
export type CatalogSize = typeof CATALOG_SIZES[number];

export const PAYMENT_GATEWAYS = ["blik", "p24", "stripe", "paypal", "card"] as const;
export type PaymentGateway = typeof PAYMENT_GATEWAYS[number];

export const SHOP_INTEGRATIONS = ["courier", "newsletter", "crm", "allegro", "marketplace", "subscription"] as const;
export type ShopIntegration = typeof SHOP_INTEGRATIONS[number];

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

export const APP_INTEGRATIONS = ["payments", "sms", "email", "ai", "external-api", "websockets"] as const;
export type AppIntegration = typeof APP_INTEGRATIONS[number];

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
