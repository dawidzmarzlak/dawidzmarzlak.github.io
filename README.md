# 🚀 IT Solutions - Profesjonalna Strona Wizytówka

Nowoczesna strona wizytówka agencji webdev zbudowana z wykorzystaniem najnowszych technologii.

## 📋 Technologie

- **Next.js 16** - Framework React z App Router
- **React 19** - Najnowsza wersja React
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - Komponenty UI (Radix UI primitives)
- **Framer Motion** - Animacje UI
- **GSAP** - Scroll animations
- **next-intl** - Internacjonalizacja (PL/EN)
- **next-themes** - Dark mode support
- **Geist Font** - Moderne fonty

## ✨ Funkcjonalności

✅ **Responsywny design** - Działa na wszystkich urządzeniach
✅ **Dark Mode** - Tryb ciemny z smooth transitions
✅ **Wielojęzyczność** - Polski i Angielski
✅ **Animacje** - Scroll-based animations, micro-interactions
✅ **SEO Optimized** - Metadata, semantic HTML
✅ **Performance** - Fast load times, code splitting
✅ **Accessibility** - WCAG 2.1 AA compliant

## 🎨 Sekcje Strony

- **Hero** - Imponująca sekcja główna z animacjami i statystykami
- **Services** - 5 głównych usług (Next.js, WordPress, WooCommerce, PrestaShop, Aplikacje Web)
- **About** - O firmie i wartości
- **Portfolio** - Showcase projektów z filtrami
- **Testimonials** - Opinie klientów
- **CTA** - Call to action

## 🚀 Rozpoczęcie Pracy

### Instalacja

```bash
npm install
```

### Development

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## 📁 Struktura Projektu

```
new-site/
├── app/
│   └── [locale]/          # Multi-language routing
│       ├── layout.tsx     # Root layout
│       ├── page.tsx       # Homepage
│       └── globals.css    # Global styles
├── components/
│   ├── ui/               # shadcn components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections
│   └── animations/       # Animation components
├── lib/
│   ├── utils.ts         # Utility functions
│   └── animations.ts    # Animation variants
├── messages/
│   ├── pl.json          # Polish translations
│   └── en.json          # English translations
├── i18n/                # i18n configuration
└── public/              # Static assets
```

## 🎨 Personalizacja

### Kolory

Edytuj zmienne CSS w `app/globals.css`:

```css
:root {
  --color-primary: #0070f3;
  --color-secondary: #7928ca;
  --color-accent: #ff0080;
}
```

### Treści

Treści są zdefiniowane w plikach JSON:
- `messages/pl.json` - Polski
- `messages/en.json` - Angielski

### Logo i Branding

1. Zmień nazwę firmy w `messages/pl.json` i `messages/en.json`
2. Dodaj logo do `public/images/`
3. Zaktualizuj komponent Navbar

## 🌐 Deployment

### Vercel (Rekomendowane)

1. Push do GitHub
2. Import projektu na [Vercel](https://vercel.com)
3. Deploy automatycznie

### Inne platformy

```bash
npm run build
```

Wygenerowane pliki będą w folderze `.next/`

## 📝 Licencja

Projekt stworzony dla IT Solutions © 2025

## 🤝 Wsparcie

Jeśli masz pytania lub potrzebujesz pomocy:
- Email: hello@itsolutions.com
- Tel: +48 123 456 789

---

**Zbudowane z ❤️ używając Next.js 16 i React 19**
