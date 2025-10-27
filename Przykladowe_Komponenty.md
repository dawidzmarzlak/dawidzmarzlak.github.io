# 🎨 Przykładowe Komponenty i Kod - Strona Wizytówka Agencji

## Spis Treści
1. [Struktura Projektu](#struktura-projektu)
2. [Komponenty Layout](#komponenty-layout)
3. [Komponenty Sekcji](#komponenty-sekcji)
4. [Komponenty Animacji](#komponenty-animacji)
5. [Utility Functions](#utility-functions)
6. [Przykładowe Testy](#przykładowe-testy)

---

## Struktura Projektu

```
agency-website/
├── app/
│   └── [locale]/
│       ├── layout.tsx              ← Root Layout
│       ├── page.tsx                ← Homepage
│       └── globals.css             ← Global Styles
├── components/
│   ├── ui/                         ← shadcn components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   └── animations/
│       ├── ScrollReveal.tsx
│       └── FloatingElements.tsx
├── lib/
│   ├── utils.ts
│   └── animations.ts
└── messages/
    ├── pl.json
    └── en.json
```

---

## Komponenty Layout

### Root Layout z Providers

```typescript
// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Your Agency | Web Development",
    template: "%s | Your Agency"
  },
  description: "Professional web development services - Next.js, WordPress, WooCommerce, PrestaShop",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Homepage

```typescript
// app/[locale]/page.tsx
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { setRequestLocale } from "next-intl/server";

export default function Home({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
```

### Language Switcher Component

```typescript
// components/layout/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

const languages = [
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "en", label: "English", flag: "🇬🇧" }
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px]">
        <Languages className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

### Footer Component

```typescript
// components/layout/Footer.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                YourAgency
              </span>
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("tagline")}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:hello@youragency.com" className="hover:text-foreground">
                  hello@youragency.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+48123456789" className="hover:text-foreground">
                  +48 123 456 789
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Warszawa, Polska</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["about", "services", "portfolio", "blog", "contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item}`} className="hover:text-foreground">
                    {t(`links.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["nextjs", "wordpress", "woocommerce", "prestashop", "webapp"].map((service) => (
                <li key={service}>
                  <span className="hover:text-foreground cursor-pointer">
                    {t(`servicesList.${service}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">{t("newsletter")}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("newsletterText")}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 px-3 py-2 text-sm border rounded-md"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} YourAgency. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## Komponenty Sekcji

### Portfolio Section z Grid

```typescript
// components/sections/Portfolio.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern online store built with Next.js and Stripe",
    image: "/portfolio/ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    category: "nextjs"
  },
  {
    id: 2,
    title: "Corporate Website",
    description: "Professional business website with CMS",
    image: "/portfolio/corporate.jpg",
    tags: ["WordPress", "WooCommerce", "Custom Theme"],
    liveUrl: "https://example.com",
    category: "wordpress"
  },
  // ... więcej projektów
];

const categories = ["all", "nextjs", "wordpress", "webapp"];

export function Portfolio() {
  const t = useTranslations("portfolio");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {t(`categories.${category}`)}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isInView }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden group cursor-pointer h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4"
          >
            <Button size="icon" variant="secondary" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={20} />
              </a>
            </Button>
            {project.githubUrl && (
              <Button size="icon" variant="secondary" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
```

### Testimonials Section

```typescript
// components/sections/Testimonials.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jan Kowalski",
    role: "CEO, TechCorp",
    avatar: "/avatars/jan.jpg",
    content: "Profesjonalna realizacja projektu. Strona przekroczyła nasze oczekiwania!",
    rating: 5
  },
  {
    id: 2,
    name: "Anna Nowak",
    role: "Marketing Director, FashionHub",
    avatar: "/avatars/anna.jpg",
    content: "Świetna współpraca i doskonałe rezultaty. Polecam!",
    rating: 5
  },
  {
    id: 3,
    name: "Piotr Wiśniewski",
    role: "Owner, LocalBusiness",
    avatar: "/avatars/piotr.jpg",
    content: "Szybka realizacja i pełne wsparcie. Bardzo zadowoleni z efektu.",
    rating: 5
  }
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-shadow">
                <CardContent className="pt-6">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  
                  {/* Content */}
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Komponenty Animacji

### Floating Elements (dla Hero)

```typescript
// components/animations/FloatingElements.tsx
"use client";

import { motion } from "framer-motion";

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circle 1 */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: "20%", left: "10%" }}
      />

      {/* Circle 2 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ top: "40%", right: "10%" }}
      />

      {/* Circle 3 */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ bottom: "20%", left: "30%" }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          animate={{
            y: [0, -1000],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0
          }}
        />
      ))}
    </div>
  );
}
```

### Count Up Animation

```typescript
// components/animations/CountUpAnimation.tsx
"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
}

export function CountUpAnimation({ end, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}
```

### Text Reveal Animation

```typescript
// components/animations/TextReveal.tsx
"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  delay?: number;
}

export function TextReveal({ text, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap gap-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
```

---

## Utility Functions

### Animation Utilities

```typescript
// lib/animations.ts
import { Variants } from "framer-motion";

// Fade In Variants
export const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Slide In Variants
export const slideIn = (direction: "left" | "right" | "up" | "down" = "up"): Variants => ({
  initial: {
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

// Stagger Container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger Item
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Scale on Hover
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300 },
};

// Page Transition
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
```

### GSAP Animations

```typescript
// lib/gsap-animations.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Parallax effect
export function createParallax(element: HTMLElement, speed: number = 0.5) {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// Fade in on scroll
export function fadeInOnScroll(element: HTMLElement) {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

// Stagger animation
export function staggerAnimation(elements: HTMLElement[]) {
  gsap.from(elements, {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elements[0],
      start: "top 80%",
    },
  });
}

// Text split animation
export function splitTextAnimation(element: HTMLElement) {
  const text = element.textContent || "";
  const chars = text.split("");
  
  element.innerHTML = chars
    .map((char) => `<span class="char">${char}</span>`)
    .join("");

  const charElements = element.querySelectorAll(".char");

  gsap.from(charElements, {
    opacity: 0,
    y: 20,
    stagger: 0.02,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
    },
  });
}
```

### Tailwind Utilities

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// Format currency
export function formatCurrency(amount: number, currency: string = "PLN"): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(amount);
}

// Truncate text
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

// Generate slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}
```

---

## Przykładowe Testy

### E2E Tests (Playwright)

```typescript
// tests/homepage.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should load hero section", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
    
    const heading = hero.locator("h1");
    await expect(heading).toContainText("Tworzymy Strony");
  });

  test("should navigate to services section", async ({ page }) => {
    await page.locator('a[href*="services"]').first().click();
    await expect(page).toHaveURL(/.*services/);
  });

  test("should toggle dark mode", async ({ page }) => {
    const html = page.locator("html");
    
    // Initially light mode (or system)
    const initialClass = await html.getAttribute("class");
    
    // Click theme toggle
    await page.locator('[aria-label="Toggle theme"]').click();
    
    // Check if class changed
    const newClass = await html.getAttribute("class");
    expect(initialClass).not.toBe(newClass);
  });

  test("should switch language", async ({ page }) => {
    // Click language switcher
    await page.locator('[aria-label="Select language"]').click();
    
    // Select English
    await page.locator('text=English').click();
    
    // Check URL has /en
    await expect(page).toHaveURL(/\/en/);
  });

  test("should display portfolio items", async ({ page }) => {
    // Scroll to portfolio section
    await page.locator("text=Portfolio").first().scrollIntoViewIfNeeded();
    
    // Wait for items to load
    const portfolioItems = page.locator('[data-testid="portfolio-item"]');
    await expect(portfolioItems).toHaveCount(6, { timeout: 5000 });
  });

  test("should submit contact form", async ({ page }) => {
    await page.goto("http://localhost:3000/contact");
    
    // Fill form
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill('textarea[name="message"]', "Test message");
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Check success message
    await expect(page.locator("text=Dziękujemy")).toBeVisible({
      timeout: 5000
    });
  });

  test("mobile navigation works", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    await page.locator('[aria-label="Open menu"]').click();
    
    // Check menu is visible
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    // Click a link
    await mobileMenu.locator("text=Services").click();
    
    // Menu should close
    await expect(mobileMenu).not.toBeVisible();
  });
});
```

### Component Tests

```typescript
// __tests__/Hero.test.tsx
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";
import { NextIntlClientProvider } from "next-intl";

const messages = {
  hero: {
    title: "Test Title",
    subtitle: "Test Subtitle",
    cta: "Get Started",
    cta_secondary: "Learn More"
  }
};

describe("Hero Component", () => {
  it("renders hero title", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies animations on mount", async () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    // Check for framer-motion animation classes
    const animated = container.querySelector('[style*="opacity"]');
    expect(animated).toBeInTheDocument();
  });
});
```

---

## Performance Optimization

### Image Optimization Config

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
```

### Bundle Analyzer

```typescript
// next.config.ts (continued)
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(nextConfig);
```

---

## Podsumowanie

Ten dokument zawiera:

✅ **Kompletne komponenty** gotowe do użycia  
✅ **Animacje** z Framer Motion i GSAP  
✅ **Utility functions** dla common tasks  
✅ **Testy E2E** z Playwright  
✅ **Best practices** dla performance  

### Kolejne kroki:

1. **Skopiuj komponenty** do swojego projektu
2. **Dostosuj style** według brand guidelines
3. **Dodaj prawdziwe treści** (zamień placeholder text)
4. **Wdróż testy** i uruchom `npm test`
5. **Zoptymalizuj obrazy** i deploy na Vercel

**Powodzenia! 🚀**
