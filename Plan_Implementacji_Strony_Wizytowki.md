# 🚀 Plan Implementacji Strony Wizytówki Agencji Webdev

## 📋 Spis Treści
1. [Stack Technologiczny](#stack-technologiczny)
2. [Trendy Designu 2025](#trendy-designu-2025)
3. [Architektura Projektu](#architektura-projektu)
4. [Serwery MCP - Konfiguracja](#serwery-mcp-konfiguracja)
5. [Plan Implementacji Krok po Kroku](#plan-implementacji-krok-po-kroku)
6. [Struktura Komponentów](#struktura-komponentów)
7. [Animacje i Interakcje](#animacje-i-interakcje)
8. [Internacjonalizacja (PL/EN)](#internacjonalizacja-plen)
9. [Formularz Wyceny](#formularz-wyceny)
10. [SEO i Performance](#seo-i-performance)
11. [Deployment](#deployment)

---

## Stack Technologiczny

### Core Technologies
```json
{
  "framework": "Next.js 15 (App Router)",
  "react": "React 19",
  "typescript": "TypeScript 5",
  "styling": "Tailwind CSS v4",
  "ui_library": "shadcn/ui",
  "animations": ["Framer Motion", "GSAP"],
  "i18n": "next-intl",
  "forms": "React Hook Form + Zod",
  "theme": "next-themes",
  "icons": "lucide-react"
}
```

### Dlaczego Ten Stack?

**Next.js 15 + React 19:**
- Server Components dla lepszej wydajności
- Streaming SSR
- Automatyczna optymalizacja obrazów
- Built-in SEO support

**Tailwind CSS v4:**
- Brak pliku konfiguracyjnego (wszystko w globals.css)
- Lepsze performance
- Modern CSS custom properties

**shadcn/ui:**
- Pełna kontrola nad kodem komponentów
- Accessibility out-of-the-box (Radix UI primitives)
- Łatwa customizacja

**Framer Motion + GSAP:**
- Framer Motion: Dla prostych animacji UI, layout transitions
- GSAP: Dla scroll-based animations, timeline animations, complex sequences

---

## Trendy Designu 2025

### 🎨 Kluczowe Trendy Do Wykorzystania

#### 1. **Micro-Animations & Micro-Interactions**
- Subtle hover effects
- Button ripples
- Loading indicators
- Scroll-triggered animations
- **Impact:** Zwiększa engagement o 20%

#### 2. **Surreal Animations**
- Elementy poruszające się między warstwami
- Transformacje obiektów podczas interakcji
- Depth & dimension w projektowaniu

#### 3. **Scroll-Based Storytelling (Scrollytelling)**
- Parallax effects
- Cinematic scrolling
- Elementy fade-in podczas scrollowania
- Sekcje animowane przy wejściu w viewport

#### 4. **Dark Mode z Smooth Transitions**
- System/Light/Dark modes
- Smooth color transitions (300ms)
- Persistent user preference
- No flash of wrong theme

#### 5. **3D Elements & Interactive Graphics**
- Subtle 3D accents (nie przesadzać!)
- Interactive hover states
- Depth przez shadows i blurs

#### 6. **Organic Shapes & Fluid Motion**
- Curved sections zamiast prostokątów
- Flowing animations
- Natural asymmetrical forms

#### 7. **Bold Typography**
- Large hero text (60-120px)
- Strong font weights (700-900)
- Typography as design element

#### 8. **Grid Layouts z Animation**
- CSS Grid dla portfolio
- Staggered animations przy load
- Hover effects na grid items

---

## Architektura Projektu

### Struktura Folderów

```
my-agency-website/
├── app/
│   ├── [locale]/                 # Multi-language routing
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Hero + sections
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   └── api/
│       └── quote/
│           └── route.ts          # Formularz wyceny API
├── components/
│   ├── ui/                        # shadcn components
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Blog.tsx
│   │   ├── Pricing.tsx
│   │   └── Contact.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── animations/
│   │   ├── ScrollReveal.tsx
│   │   ├── ParallaxSection.tsx
│   │   └── AnimatedText.tsx
│   └── forms/
│       ├── QuoteForm.tsx
│       └── ContactForm.tsx
├── lib/
│   ├── utils.ts
│   ├── animations.ts
│   └── constants.ts
├── schemas/
│   ├── quote-schema.ts
│   └── contact-schema.ts
├── i18n/
│   ├── request.ts
│   └── routing.ts
├── messages/
│   ├── en.json
│   └── pl.json
├── public/
│   ├── images/
│   ├── portfolio/
│   └── logos/
└── styles/
    └── globals.css
```

## Plan Implementacji Krok po Kroku

### Phase 1: Projekt Setup (1-2 dni)

#### Krok 1.1: Inicjalizacja Projektu
```bash
# Tworzenie projektu Next.js 15
npx create-next-app@latest agency-website --typescript --tailwind --app

cd agency-website

# Instalacja głównych dependencies
npm install framer-motion gsap
npm install next-intl
npm install react-hook-form @hookform/resolvers zod
npm install next-themes
npm install lucide-react
npm install @radix-ui/react-icons

# shadcn/ui setup
npx shadcn@latest init

# Dodaj podstawowe komponenty shadcn
npx shadcn@latest add button card input textarea select label form
```

#### Krok 1.2: Konfiguracja Tailwind CSS v4

**globals.css:**
```css
@import "tailwindcss";

/* Theme variables */
@theme inline {
  --color-primary: #0070f3;
  --color-secondary: #7928ca;
  --color-accent: #ff0080;
  
  /* Light mode */
  --color-background: #ffffff;
  --color-foreground: #000000;
  --color-muted: #f3f4f6;
  --color-muted-foreground: #6b7280;
  
  /* Dark mode */
  --color-dark-background: #0a0a0a;
  --color-dark-foreground: #ededed;
  --color-dark-muted: #1a1a1a;
  --color-dark-muted-foreground: #a3a3a3;
  
  /* Animations */
  --animation-duration: 0.3s;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark mode variant */
@custom-variant dark (&:is(.dark *));

/* Global styles */
body {
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  transition: background-color var(--animation-duration) var(--animation-easing),
              color var(--animation-duration) var(--animation-easing);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-muted);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 5px;
}

.dark ::-webkit-scrollbar-track {
  background: var(--color-dark-muted);
}
```

#### Krok 1.3: Setup Dark Mode

**providers/theme-provider.tsx:**
```typescript
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
```

#### Krok 1.4: Setup Internacjonalizacji

**i18n/request.ts:**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**i18n/routing.ts:**
```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'pl',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

**messages/pl.json:**
```json
{
  "nav": {
    "home": "Start",
    "about": "O nas",
    "services": "Usługi",
    "portfolio": "Portfolio",
    "blog": "Blog",
    "pricing": "Cennik",
    "contact": "Kontakt"
  },
  "hero": {
    "title": "Tworzymy Strony, Które Sprzedają",
    "subtitle": "Specjalizujemy się w Next.js, WordPress, WooCommerce, PrestaShop i aplikacjach webowych",
    "cta": "Zamów wycenę",
    "cta_secondary": "Zobacz portfolio"
  },
  "services": {
    "title": "Nasze Usługi",
    "nextjs": {
      "title": "Strony w Next.js",
      "description": "Błyskawicznie szybkie, SEO-friendly aplikacje webowe"
    },
    "wordpress": {
      "title": "WordPress",
      "description": "Profesjonalne strony firmowe i blogi"
    },
    "woocommerce": {
      "title": "WooCommerce",
      "description": "Kompleksowe sklepy internetowe"
    },
    "prestashop": {
      "title": "PrestaShop",
      "description": "Zaawansowane platformy e-commerce"
    },
    "webapp": {
      "title": "Aplikacje Web",
      "description": "Spring Boot backend + React/Next.js/Angular frontend"
    }
  }
}
```

**messages/en.json:**
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "blog": "Blog",
    "pricing": "Pricing",
    "contact": "Contact"
  },
  "hero": {
    "title": "We Build Websites That Sell",
    "subtitle": "Specializing in Next.js, WordPress, WooCommerce, PrestaShop and web applications",
    "cta": "Get a Quote",
    "cta_secondary": "View Portfolio"
  },
  "services": {
    "title": "Our Services",
    "nextjs": {
      "title": "Next.js Websites",
      "description": "Lightning-fast, SEO-friendly web applications"
    },
    "wordpress": {
      "title": "WordPress",
      "description": "Professional business websites and blogs"
    },
    "woocommerce": {
      "title": "WooCommerce",
      "description": "Complete e-commerce solutions"
    },
    "prestashop": {
      "title": "PrestaShop",
      "description": "Advanced e-commerce platforms"
    },
    "webapp": {
      "title": "Web Applications",
      "description": "Spring Boot backend + React/Next.js/Angular frontend"
    }
  }
}
```

### Phase 2: Layout & Navigation (2-3 dni)

#### Navbar Component
```typescript
// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/blog', label: t('blog') },
    { href: '/pricing', label: t('pricing') },
  ];

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-border/40"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              YourAgency
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}
            
            {/* Language Toggle */}
            <LanguageSwitcher />
            
            {/* CTA Button */}
            <Button asChild>
              <Link href="/contact">{t('contact')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-foreground/80 hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
```

### Phase 3: Hero Section (2 dni)

```typescript
// components/sections/Hero.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10"
        />
        
        {/* Floating Elements */}
        <FloatingElements />
      </div>

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
        >
          <Sparkles size={16} />
          <span className="text-sm font-medium">
            Tworzymy od 2020 roku
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          {t('title').split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" asChild className="group">
            <Link href="/contact">
              {t('cta')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link href="/portfolio">
              {t('cta_secondary')}
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <CountUpAnimation end={stat.value} />+
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

const stats = [
  { value: 150, label: "Projektów" },
  { value: 50, label: "Klientów" },
  { value: 5, label: "Lat doświadczenia" }
];
```

### Phase 4: Services Section (2 dni)

```typescript
// components/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { 
  Code2, 
  Wordpress, 
  ShoppingCart, 
  Store, 
  Server 
} from "lucide-react";

const services = [
  {
    icon: Code2,
    key: "nextjs",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Wordpress,
    key: "wordpress",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    icon: ShoppingCart,
    key: "woocommerce",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Store,
    key: "prestashop",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Server,
    key: "webapp",
    gradient: "from-orange-500 to-red-500"
  }
];

export function Services() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,0,128,0.2),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferujemy kompleksowe rozwiązania webowe dostosowane do Twoich potrzeb
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary/50">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`${service.key}.description`)}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### Phase 5: Formularz Wyceny (3 dni)

#### Schema Validation
```typescript
// schemas/quote-schema.ts
import { z } from "zod";

export const quoteSchema = z.object({
  // Dane kontaktowe
  name: z.string().min(2, "Imię musi mieć min. 2 znaki"),
  email: z.string().email("Nieprawidłowy adres email"),
  phone: z.string().regex(/^[0-9\s\+\-\(\)]+$/, "Nieprawidłowy numer telefonu").optional(),
  company: z.string().optional(),

  // Typ projektu
  projectType: z.enum([
    "nextjs",
    "wordpress",
    "woocommerce",
    "prestashop",
    "webapp",
    "other"
  ]),

  // Szczegóły
  budget: z.enum([
    "5000-10000",
    "10000-25000",
    "25000-50000",
    "50000+"
  ]),
  
  deadline: z.enum([
    "asap",
    "1-month",
    "3-months",
    "6-months",
    "flexible"
  ]),

  // Funkcjonalności (multi-select)
  features: z.array(z.string()).min(1, "Wybierz przynajmniej jedną funkcjonalność"),

  // Dodatkowe informacje
  description: z.string().min(50, "Opisz projekt (min. 50 znaków)"),

  // Pliki (opcjonalne)
  attachments: z.array(
    z.object({
      name: z.string(),
      size: z.number(),
      type: z.string()
    })
  ).optional(),

  // Zgody
  marketingConsent: z.boolean().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Musisz zaakceptować politykę prywatności"
  })
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
```

#### Quote Form Component
```typescript
// components/forms/QuoteForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { quoteSchema, type QuoteFormData } from "@/schemas/quote-schema";
import { Loader2, CheckCircle2 } from "lucide-react";

export function QuoteForm() {
  const t = useTranslations('quote');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      description: "",
      features: [],
      marketingConsent: false,
      privacyPolicy: false
    }
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (pokazać toast/notification)
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 4;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">
          {t('title')}
        </CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`text-sm font-medium ${
                  i + 1 <= step ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Krok {i + 1}
              </div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <StepOne form={form} key="step1" />
              )}
              {step === 2 && (
                <StepTwo form={form} key="step2" />
              )}
              {step === 3 && (
                <StepThree form={form} key="step3" />
              )}
              {step === 4 && (
                <StepFour form={form} key="step4" />
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Wstecz
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto"
                >
                  Dalej
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    "Wyślij zapytanie"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>

        {/* Success Message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Dziękujemy za zapytanie!
            </h3>
            <p className="text-muted-foreground">
              Skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// Step Components
function StepOne({ form }: { form: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imię i nazwisko *</FormLabel>
            <FormControl>
              <Input placeholder="Jan Kowalski" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input placeholder="jan@example.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefon</FormLabel>
            <FormControl>
              <Input placeholder="+48 123 456 789" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Firma</FormLabel>
            <FormControl>
              <Input placeholder="Nazwa firmy (opcjonalne)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}

// ... pozostałe kroki (Step Two, Three, Four) podobnie
```

#### API Route dla Formularza
```typescript
// app/api/quote/route.ts
import { NextResponse } from "next/server";
import { quoteSchema } from "@/schemas/quote-schema";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Walidacja danych
    const validatedData = quoteSchema.parse(body);
    
    // Tutaj:
    // 1. Zapisz do bazy danych
    // 2. Wyślij email powiadomienie
    // 3. Zintegruj z CRM
    
    // Przykład wysyłki emaila (możesz użyć Resend, SendGrid, etc.)
    // await sendEmail({
    //   to: validatedData.email,
    //   subject: "Potwierdzenie otrzymania zapytania",
    //   html: emailTemplate(validatedData)
    // });
    
    // await sendEmail({
    //   to: "hello@youragency.com",
    //   subject: "Nowe zapytanie ofertowe",
    //   html: adminEmailTemplate(validatedData)
    // });
    
    return NextResponse.json({
      success: true,
      message: "Zapytanie zostało wysłane"
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Wystąpił błąd podczas przetwarzania zapytania" 
      },
      { status: 500 }
    );
  }
}
```

---

## Animacje i Interakcje

### Biblioteki Animacji

**Framer Motion** - dla prostszych animacji UI:
```typescript
// lib/animations.ts

// Fade In
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 }
};

// Slide In
export const slideIn = (direction: "left" | "right" | "up" | "down") => ({
  initial: {
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
    opacity: 0
  },
  animate: { x: 0, y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
});

// Stagger Children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scale on Hover
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300 }
};
```

**GSAP** - dla scroll-based animations:
```typescript
// components/animations/ScrollReveal.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale";
  direction?: "left" | "right" | "up" | "down";
}

export function ScrollReveal({ 
  children, 
  animation = "fade",
  direction = "up" 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const getAnimationProps = () => {
      switch (animation) {
        case "slide":
          return {
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0
          };
        case "scale":
          return { scale: 0.8, opacity: 0 };
        default:
          return { opacity: 0, y: 50 };
      }
    };

    gsap.from(ref.current, {
      ...getAnimationProps(),
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, [animation, direction]);

  return <div ref={ref}>{children}</div>;
}
```

### Parallax Effect
```typescript
// components/animations/ParallaxSection.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
}

export function ParallaxSection({ 
  children, 
  speed = 0.5 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
```

---

## SEO i Performance

### Metadata Configuration
```typescript
// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ 
  params: { locale } 
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Your Agency" }],
    openGraph: {
      type: "website",
      locale: locale,
      url: "https://youragency.com",
      siteName: t("siteName"),
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("siteName")
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpg"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}
```

### Image Optimization
```typescript
// Zawsze używaj next/image
import Image from "next/image";

<Image
  src="/portfolio/project1.jpg"
  alt="Project description"
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority={false} // true tylko dla above-the-fold images
/>
```

### Performance Best Practices

1. **Code Splitting:**
```typescript
// Dynamic imports for heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("@/components/HeavyComponent"),
  {
    loading: () => <div>Ładowanie...</div>,
    ssr: false // if component doesn't need SSR
  }
);
```

2. **Bundle Analysis:**
```bash
npm install @next/bundle-analyzer

# package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

3. **Font Optimization:**
```typescript
// app/[locale]/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
```

---

## Deployment

### Vercel (Rekomendowane dla Next.js)

1. **Push do GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/agency-website.git
git push -u origin main
```

2. **Deploy na Vercel:**
- Połącz repozytorium z Vercel
- Automatic deployments on push
- Preview deployments for PRs

3. **Environment Variables:**
```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://youragency.com
DATABASE_URL=your_database_url
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

### Docker (opcjonalnie)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

---

## Podsumowanie i Timeline

### Całkowity Czas Realizacji: **3-4 tygodnie**

| Faza | Czas | Zadania |
|------|------|---------|
| **Week 1** | 5 dni | Setup projektu, Layout, Navigation, Hero, Dark Mode |
| **Week 2** | 5 dni | Services, About, Portfolio (grid), Blog setup |
| **Week 3** | 5 dni | Pricing, Formularz wyceny, Contact, Animacje |
| **Week 4** | 5 dni | i18n, SEO, Testing, Optimizacja, Deployment |

### Priorytety Implementacji:

#### Must-Have (MVP):
✅ Hero Section z animacjami  
✅ Services Section  
✅ Portfolio Grid (minimum 6 projektów)  
✅ Contact Form  
✅ Dark Mode  
✅ Mobile Responsive  
✅ SEO basics  

#### Should-Have:
✅ Formularz wyceny (zaawansowany)  
✅ Blog section  
✅ Pricing page  
✅ Testimonials  
✅ Multi-language (PL/EN)  
✅ Scroll animations  

#### Nice-to-Have:
✅ 3D elements  
✅ Advanced parallax  
✅ Blog CMS integration  
✅ Live chat  
✅ Analytics dashboard  

---

## Kolejne Kroki z Claude Code

### 1. Utwórz Projekt
```bash
npx create-next-app@latest agency-website --typescript --tailwind --app
cd agency-website
```

### 2. Skonfiguruj MCP Servers
```bash
# Użyj skryptu setup-mcp-servers.sh z sekcji "Serwery MCP"
chmod +x setup-mcp-servers.sh
./setup-mcp-servers.sh
```

### 3. Rozpocznij Development z Claude Code
```bash
# W terminalu
claude

# W Claude Code możesz:
# - "Create the navbar component with dark mode toggle"
# - "Implement the hero section with scroll animations"
# - "Set up the quote form with React Hook Form and Zod"
# - "Add multilanguage support with next-intl"
```

### 4. Testowanie
```bash
# Użyj Playwright MCP do automatycznego testowania
# Claude może pisać i uruchamiać testy
npm run test:e2e
```

---

## Dodatkowe Zasoby

### Dokumentacja
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com/docs/v3/)
- [next-intl](https://next-intl-docs.vercel.app/)

### Design Inspiration
- [Awwwards](https://www.awwwards.com)
- [Behance](https://www.behance.net)
- [Dribbble](https://dribbble.com)

### Icons & Assets
- [Lucide Icons](https://lucide.dev)
- [Unsplash](https://unsplash.com) - zdjęcia
- [Undraw](https://undraw.co) - ilustracje

---

**Powodzenia w realizacji projektu! 🚀**

Jeśli masz pytania podczas implementacji, możesz używać Claude Code z skonfigurowanymi serwerami MCP - będą one pomagać w:
- Generowaniu komponentów
- Debugowaniu
- Testowaniu
- Optymalizacji
- Dokumentacji

Pamiętaj, aby regularnie commitować zmiany i tworzyć feature branches dla większych funkcjonalności!
