import type { BrandConfig } from "@/lib/templates/types";

export interface SaasFeature {
  key: string;
  iconName: "Activity" | "Brain" | "Blocks" | "Shield";
  title: string;
  description: string;
}

export interface SaasStep {
  key: string;
  iconName: "Upload" | "Zap" | "BarChart3";
  number: number;
  title: string;
  description: string;
}

export interface SaasIntegration {
  name: string;
  category: string;
}

export interface SaasTestimonial {
  id: string;
  avatarSrc: string;
  rating: number;
  name: string;
  role: string;
  quote: string;
}

export interface SaasFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SaasPricingTier {
  key: string;
  name: string;
  price: string;
  priceUnit: string | null;
  description: string;
  featured: boolean;
  features: string[];
  ctaLabel: string;
}

export interface SaasDashboardContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustedByLabel: string;
    trustedByBrands: string[];
    metrics: { label: string; value: string; change: string; color: string }[];
  };
  features: {
    title: string;
    subtitle: string;
    items: SaasFeature[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    bottomText: string;
    steps: SaasStep[];
  };
  integrations: {
    badge: string;
    title: string;
    subtitle: string;
    moreText: string;
    viewAllCta: string;
    items: SaasIntegration[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: SaasTestimonial[];
  };
  faq: {
    title: string;
    subtitle: string;
    contactPrompt: string;
    contactButton: string;
    items: SaasFaqItem[];
  };
  pricing: {
    title: string;
    subtitle: string;
    popularBadge: string;
    tiers: SaasPricingTier[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

export const saasDashboardConfig: BrandConfig = {
  // NOTE: meta.brandName / meta.industry / meta.tagline are also duplicated in
  // messages/en.json and messages/pl.json (showcase.saas-dashboard.{...}) because
  // the unrefactored ShowcaseList component still reads them from i18n. Keep both
  // in sync until ShowcaseList is refactored (Phase 2 plan).
  meta: {
    slug: "saas-dashboard",
    brandName: "Pulse Analytics",
    industry: "Technology",
    tagline: "Real-Time Data Insights",
    locale: "en",
  },
  theme: {
    palette: {
      bg: "#0F172A",
      fg: "#FFFFFF",
      accent: "#6366F1",
      accentSecondary: "#8B5CF6",
      accentTertiary: "#06B6D4",
      muted: "#94A3B8",
      surface: "#1E293B",
      surfaceLight: "#334155",
      success: "#22C55E",
      warning: "#FFE66D",
    },
    fonts: {
      display: "var(--font-urbanist)",
      body: "var(--font-plus-jakarta)",
      accent: "var(--font-plus-jakarta)",
    },
    radius: {
      sm: "8px",
      md: "12px",
      lg: "20px",
    },
  },
  content: {
    hero: {
      eyebrow: "AI-Powered Analytics Platform",
      title: "Next-Generation Analytics",
      subtitle:
        "Powerful data analysis tools that help you make better business decisions. AI-powered insights and real-time visualizations.",
      primaryCta: "Start for Free",
      secondaryCta: "Watch Demo",
      trustedByLabel: "See what our customers have to say about Pulse Analytics",
      trustedByBrands: ["Stripe", "Vercel", "Linear", "Notion", "Figma"],
      metrics: [
        { label: "Total Revenue", value: "$1.2M", change: "+12.5%", color: "#6366F1" },
        { label: "Active Users", value: "45.2K", change: "+8.2%", color: "#06B6D4" },
        { label: "Conversion Rate", value: "3.45%", change: "+2.1%", color: "#8B5CF6" },
      ],
    },
    features: {
      title: "Features",
      subtitle: "Everything you need for data analysis",
      items: [
        {
          key: "realtime",
          iconName: "Activity",
          title: "Real-Time Data",
          description: "Track metrics live and react instantly to changes.",
        },
        {
          key: "ai",
          iconName: "Brain",
          title: "AI-Powered",
          description: "Automatic anomaly detection and ML-based predictions.",
        },
        {
          key: "integrations",
          iconName: "Blocks",
          title: "100+ Integrations",
          description: "Connect all your data sources in one place.",
        },
        {
          key: "security",
          iconName: "Shield",
          title: "Enterprise Security",
          description: "End-to-end encryption and SOC2, GDPR certified.",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Get started in minutes with our simple three-step process",
      bottomText: "Setup takes less than 5 minutes. No credit card required.",
      steps: [
        {
          key: "connect",
          iconName: "Upload",
          number: 1,
          title: "Connect Your Data",
          description: "Link your existing tools and data sources with one-click integrations.",
        },
        {
          key: "analyze",
          iconName: "Zap",
          number: 2,
          title: "Analyze Automatically",
          description: "Our AI processes your data and identifies patterns and insights.",
        },
        {
          key: "insights",
          iconName: "BarChart3",
          number: 3,
          title: "Get Actionable Insights",
          description: "Receive real-time recommendations to improve your business.",
        },
      ],
    },
    integrations: {
      badge: "200+ Integrations",
      title: "Connect Everything",
      subtitle: "Seamlessly integrate with all your favorite tools and platforms",
      moreText: "And many more.",
      viewAllCta: "View all integrations",
      items: [
        { name: "Slack", category: "communication" },
        { name: "GitHub", category: "development" },
        { name: "Salesforce", category: "crm" },
        { name: "Stripe", category: "payments" },
        { name: "HubSpot", category: "marketing" },
        { name: "Jira", category: "development" },
        { name: "Intercom", category: "support" },
        { name: "Zapier", category: "automation" },
        { name: "Google Analytics", category: "analytics" },
        { name: "Mailchimp", category: "marketing" },
        { name: "Zendesk", category: "support" },
        { name: "Notion", category: "productivity" },
      ],
    },
    testimonials: {
      title: "Loved by Teams Everywhere",
      subtitle: "See what our customers have to say about Pulse Analytics",
      items: [
        {
          id: "customer1",
          avatarSrc: "/showcase/saas-dashboard/testimonial-1.jpg",
          rating: 5,
          name: "Jessica Chen",
          role: "VP of Analytics at TechCorp",
          quote:
            "Pulse Analytics transformed how we understand our data. The AI insights saved us countless hours and helped us identify opportunities we would have missed.",
        },
        {
          id: "customer2",
          avatarSrc: "/showcase/saas-dashboard/testimonial-2.jpg",
          rating: 5,
          name: "Marcus Thompson",
          role: "CTO at StartupFlow",
          quote:
            "The real-time dashboards and integrations are game-changers. We've increased our data-driven decisions by 300% since switching to Pulse.",
        },
        {
          id: "customer3",
          avatarSrc: "/showcase/saas-dashboard/testimonial-3.jpg",
          rating: 5,
          name: "Sarah Williams",
          role: "Head of Growth at ScaleUp",
          quote:
            "Finally, an analytics platform that actually delivers on its promises. The ROI we've seen in just 3 months is incredible.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about Pulse Analytics",
      contactPrompt: "Still have questions? Our team is here to help.",
      contactButton: "Contact Support",
      items: [
        {
          id: "faq1",
          question: "How does the free trial work?",
          answer:
            "Start with a 14-day free trial with full access to all Pro features. No credit card required. At the end of your trial, choose the plan that best fits your needs.",
        },
        {
          id: "faq2",
          question: "Can I upgrade or downgrade my plan?",
          answer:
            "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences.",
        },
        {
          id: "faq3",
          question: "What data sources do you support?",
          answer:
            "We support 200+ integrations including Salesforce, HubSpot, Google Analytics, Stripe, and all major databases. Can't find what you need? Our API allows custom connections.",
        },
        {
          id: "faq4",
          question: "Is my data secure?",
          answer:
            "Security is our top priority. We're SOC2 Type II and GDPR compliant, with end-to-end encryption, regular audits, and enterprise-grade infrastructure.",
        },
        {
          id: "faq5",
          question: "Do you offer onboarding support?",
          answer:
            "Yes! All plans include onboarding support. Pro and Enterprise plans get dedicated account managers and custom training sessions.",
        },
        {
          id: "faq6",
          question: "What's the difference between Pro and Enterprise?",
          answer:
            "Enterprise includes unlimited users, dedicated infrastructure, custom SLAs, advanced security features, and 24/7 priority support with a dedicated success manager.",
        },
      ],
    },
    pricing: {
      title: "Pricing",
      subtitle: "Choose the plan that fits your needs",
      popularBadge: "Popular",
      tiers: [
        {
          key: "starter",
          name: "Starter",
          price: "$29",
          priceUnit: "month",
          description: "For small teams",
          featured: false,
          features: ["5 users", "10 dashboards", "7-day history", "Email support"],
          ctaLabel: "Choose Plan",
        },
        {
          key: "pro",
          name: "Professional",
          price: "$79",
          priceUnit: "month",
          description: "For growing companies",
          featured: true,
          features: ["25 users", "Unlimited dashboards", "1-year history", "Priority support"],
          ctaLabel: "Choose Plan",
        },
        {
          key: "enterprise",
          name: "Enterprise",
          price: "Contact Us",
          priceUnit: null,
          description: "For large organizations",
          featured: false,
          features: [
            "Unlimited users",
            "Dedicated infrastructure",
            "Unlimited history",
            "24/7 support",
          ],
          ctaLabel: "Contact Us",
        },
      ],
    },
    cta: {
      title: "Ready to Get Started?",
      description: "Join thousands of companies already using Pulse Analytics.",
      button: "Start 14-Day Free Trial",
    },
  } satisfies Record<keyof SaasDashboardContent, unknown>,
  media: {},
};
