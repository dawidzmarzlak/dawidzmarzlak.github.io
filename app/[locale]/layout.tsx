import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { CookieSettingsModal } from "@/components/cookies/CookieSettingsModal";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ChatWidget } from "@/components/chat";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";

const baseUrl = "https://itsolutions.pl";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "IT Solutions | Freelance Web Developer - Strony Internetowe",
    template: "%s | IT Solutions"
  },
  description: "Freelance web developer - tworzę profesjonalne strony internetowe i aplikacje webowe. Next.js, WordPress, WooCommerce, PrestaShop. Indywidualne podejście do każdego projektu.",
  keywords: [
    "freelance web developer",
    "strony internetowe",
    "web developer polska",
    "tworzenie stron www",
    "Next.js developer",
    "WordPress developer",
    "sklepy internetowe",
    "WooCommerce",
    "PrestaShop",
    "aplikacje webowe"
  ],
  authors: [{ name: "IT Solutions" }],
  creator: "IT Solutions",
  publisher: "IT Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    alternateLocale: "en_US",
    url: baseUrl,
    siteName: "IT Solutions",
    title: "IT Solutions | Freelance Web Developer",
    description: "Profesjonalne strony internetowe i aplikacje webowe. Indywidualne podejście do każdego projektu.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IT Solutions - Freelance Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Solutions | Freelance Web Developer",
    description: "Profesjonalne strony internetowe i aplikacje webowe. Indywidualne podejście do każdego projektu.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "pl": `${baseUrl}/pl`,
      "en": `${baseUrl}/en`,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params as it's now a Promise in Next.js 15+
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for this locale
  const messages = await getMessages({ locale });

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "IT Solutions",
    "description": locale === "pl"
      ? "Freelance web developer - tworzę profesjonalne strony internetowe i aplikacje webowe"
      : "Freelance web developer - I create professional websites and web applications",
    "url": baseUrl,
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "Country",
        "name": "Poland"
      },
      {
        "@type": "Continent",
        "name": "Europe"
      }
    ],
    "serviceType": [
      "Web Development",
      "E-commerce Development",
      "WordPress Development",
      "Next.js Development",
      "WooCommerce Development",
      "PrestaShop Development"
    ],
    "knowsLanguage": ["pl", "en"],
    "sameAs": []
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": locale === "pl" ? "Jak długo trwa realizacja projektu?" : "How long does project delivery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === "pl"
            ? "Czas realizacji zależy od skomplikowania projektu. Prosta strona wizytówka to 2-3 tygodnie, bardziej zaawansowany e-commerce to 6-12 tygodni."
            : "Delivery time depends on project complexity. A simple business card website takes 2-3 weeks, more advanced e-commerce takes 6-12 weeks."
        }
      },
      {
        "@type": "Question",
        "name": locale === "pl" ? "Ile kosztuje strona internetowa?" : "How much does a website cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === "pl"
            ? "Ceny są indywidualne i zależą od zakresu projektu. Proste strony wizytówki startują od 5000 zł, zaawansowane sklepy internetowe od 15000 zł."
            : "Prices are individual and depend on project scope. Simple business card websites start from $1,200, advanced online stores from $3,500."
        }
      },
      {
        "@type": "Question",
        "name": locale === "pl" ? "Czy oferujesz hosting?" : "Do you offer hosting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === "pl"
            ? "Tak, mogę zająć się hostingiem Twojej strony. Współpracuję z najlepszymi dostawcami hostingu w Polsce i za granicą."
            : "Yes, I can handle your website hosting. I work with the best hosting providers in Poland and abroad."
        }
      }
    ]
  };

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CookieConsentProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
            >
              <GoogleAnalytics />
              <div className="relative min-h-screen flex flex-col overflow-x-hidden">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <ChatWidget />
              <CookieBanner />
              <CookieSettingsModal />
            </ThemeProvider>
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
