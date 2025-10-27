# Blog - Przykładowe Artykuły (PL)

---

## Artykuł 1: Next.js 15 - Co Nowego? Przegląd Najważniejszych Funkcji

### Meta
- **Kategoria:** Frontend Development
- **Tagi:** Next.js, React, Web Development, JavaScript
- **Data:** 15 października 2025
- **Autor:** Jan Kowalski
- **Czas czytania:** 8 min
- **Poziom:** Średniozaawansowany

### Lead
Next.js 15 wprowadza rewolucyjne zmiany w ekosystemie React. Turbopack jest teraz stabilny, Server Actions zyskały nowe możliwości, a React 19 przynosi długo oczekiwane usprawnienia. Sprawdźmy, co dokładnie się zmieniło i jak możesz wykorzystać te nowinki w swoich projektach.

### Wstęp
Framework Next.js od Vercel to obecnie najbardziej popularny wybór do tworzenia nowoczesnych aplikacji React. Wersja 15, wydana w październiku 2025, przynosi masę ulepszeń, które jeszcze bardziej usprawniają developer experience i wydajność aplikacji.

W tym artykule przyjrzymy się najważniejszym zmianom i pokażemy praktyczne przykłady ich wykorzystania.

### 1. Turbopack - Stabilna Wersja

Turbopack, napisany w Rust bundler, który ma zastąpić Webpack, w końcu osiągnął stabilność produkcyjną.

**Kluczowe zalety:**
- ⚡ **10x szybszy** cold start w porównaniu z Webpack
- 🔥 **700x szybszy** hot module replacement (HMR)
- 📦 Lepsze tree-shaking
- 🎯 Natywne wsparcie dla TypeScript

**Jak włączyć:**
```javascript
// next.config.js
module.exports = {
  experimental: {
    turbo: {
      // Turbopack jest teraz domyślnie włączony w Next.js 15!
    }
  }
}
```

**Benchmarki:**
- Startup aplikacji: 2.5s → 0.3s
- HMR update: 400ms → 50ms
- Production build: 120s → 35s

### 2. React 19 i Nowe Możliwości

Next.js 15 w pełni wspiera React 19, który wprowadza kilka przełomowych funkcji.

**React Compiler**
Automatyczna optymalizacja komponentów bez potrzeby używania `useMemo` i `useCallback`:

```jsx
// Przed (React 18)
const ExpensiveComponent = () => {
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  
  const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  }, [a, b]);

  return <div>{memoizedValue}</div>;
}

// Po (React 19 z compilerem)
const ExpensiveComponent = () => {
  const value = computeExpensiveValue(a, b);
  
  const callback = () => {
    doSomething(a, b);
  };

  return <div>{value}</div>;
}
```

Compiler automatycznie optymalizuje kod!

**use() Hook**
Nowy hook do asynchronicznego pobierania danych:

```jsx
import { use } from 'react';

async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

function UserProfile({ userId }) {
  // use() suspenduje komponent dopóki dane nie będą gotowe
  const user = use(fetchUser(userId));
  
  return <div>{user.name}</div>;
}
```

### 3. Server Actions - Nowe Możliwości

Server Actions stały się jeszcze potężniejsze w Next.js 15.

**Progressive Enhancement**
Formularze działają nawet bez JavaScript:

```jsx
// app/actions.js
'use server'

export async function submitForm(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  await saveToDatabase({ name, email });
  
  return { success: true };
}

// app/contact/page.jsx
import { submitForm } from './actions';

export default function ContactPage() {
  return (
    <form action={submitForm}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Optymistic Updates**
Natywne wsparcie dla optimistic UI:

```jsx
'use client'

import { useOptimistic } from 'react';
import { addTodo } from './actions';

export function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { id: Date.now(), text: newTodo, pending: true }]
  );

  async function formAction(formData) {
    const text = formData.get('todo');
    addOptimisticTodo(text);
    await addTodo(text);
  }

  return (
    <>
      <form action={formAction}>
        <input name="todo" />
        <button>Add</button>
      </form>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

### 4. Partial Prerendering (PPR)

Najbardziej ekscytująca funkcja Next.js 15 - możliwość mieszania statycznych i dynamicznych części strony.

**Jak to działa:**
```jsx
// app/product/[id]/page.jsx
export default async function ProductPage({ params }) {
  return (
    <div>
      {/* Statyczna część - prerendowana */}
      <ProductHeader product={await getProduct(params.id)} />
      
      {/* Dynamiczna część - renderowana w runtime */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={params.id} />
      </Suspense>
      
      {/* Statyczna część */}
      <ProductDescription />
    </div>
  );
}
```

**Korzyści:**
- Szybsze TTFB (Time to First Byte)
- Lepsza cache'owalność
- Dynamiczne treści tam, gdzie potrzeba

### 5. Image Optimization v2

Nowe API dla komponentu Image z lepszą wydajnością:

```jsx
import Image from 'next/image';

export default function Gallery() {
  return (
    <Image
      src="/photo.jpg"
      alt="Description"
      width={800}
      height={600}
      // Nowe w Next.js 15
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      sizes="(max-width: 768px) 100vw, 50vw"
      // Automatyczna optymalizacja formatu (AVIF, WebP)
      format="auto"
      // Lazy loading z threshold
      loading="lazy"
      threshold={0.5}
    />
  );
}
```

### 6. Enhanced Middleware

Middleware teraz działa szybciej i ma więcej możliwości:

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Szybsze geolokalizacja
  const country = request.geo?.country || 'US';
  
  // A/B testing
  const bucket = Math.random() < 0.5 ? 'A' : 'B';
  
  const response = NextResponse.next();
  response.cookies.set('bucket', bucket);
  
  // Feature flags
  if (request.nextUrl.pathname.startsWith('/beta')) {
    const hasAccess = request.cookies.get('beta_access');
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 7. Built-in SEO Components

Next.js 15 wprowadza nowe komponenty do SEO:

```jsx
// app/layout.jsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | My Site',
    default: 'My Site'
  },
  description: 'This is my website',
  openGraph: {
    images: ['/og-image.jpg'],
  },
  // Nowe w Next.js 15
  alternates: {
    canonical: 'https://mysite.com',
    languages: {
      'pl-PL': 'https://mysite.com/pl',
      'en-US': 'https://mysite.com/en',
    },
  },
};
```

### Migracja z Next.js 14 do 15

**Krok 1: Aktualizacja dependencies**
```bash
npm install next@15 react@19 react-dom@19
```

**Krok 2: Codemod**
```bash
npx @next/codemod@latest upgrade
```

**Krok 3: Testowanie**
- Sprawdź console.warnings
- Przetestuj wszystkie funkcjonalności
- Benchmark wydajności

**Breaking changes:**
- `getServerSideProps` → Route Handlers
- `getStaticProps` → React Server Components
- Niektóre middleware API zostały zmienione

### Podsumowanie

Next.js 15 to solidna aktualizacja, która przynosi:
- ✅ Znacznie lepszą wydajność (Turbopack)
- ✅ Lepsze DX (React 19, Server Actions)
- ✅ Nowe możliwości (PPR, Enhanced Middleware)
- ✅ Lepsze SEO out-of-the-box

Warto aktualizować, ale przetestuj dokładnie przed deployem na production!

### Przydatne Linki
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Blog Post](https://react.dev/blog/2025/01/15/react-19)
- [Turbopack Benchmarks](https://turbo.build/pack/docs/benchmarks)

**Co myślicie o Next.js 15? Dajcie znać w komentarzach!**

---

## Artykuł 2: WordPress Security Best Practices 2025

### Meta
- **Kategoria:** WordPress, Security
- **Tagi:** WordPress, Security, Best Practices, CMS
- **Data:** 5 października 2025
- **Autor:** Katarzyna Nowak
- **Czas czytania:** 10 min
- **Poziom:** Początkujący/Średniozaawansowany

### Lead
WordPress zasila ponad 43% wszystkich stron internetowych, co czyni go głównym celem ataków hakerskich. W tym kompleksowym przewodniku pokażemy, jak skutecznie zabezpieczyć swoją stronę WordPress w 2025 roku.

### Wstęp
Bezpieczeństwo WordPress to temat, który powinien być priorytetem dla każdego właściciela strony. Mimo że WordPress jest bezpieczny "out of the box", większość problemów bezpieczeństwa wynika z:
- Przestarzałych wersji WP/wtyczek/motywów
- Słabych haseł
- Niezabezpieczonych plików konfiguracyjnych
- Złośliwych wtyczek

Przyjrzyjmy się, jak skutecznie zabezpieczyć WordPress.

### 1. Aktualizacje - Fundamentalna Zasada

**Dlaczego to ważne?**
- 98% exploitów wykorzystuje znane podatności
- Każda aktualizacja WP zawiera security fixes
- Przestarzałe wtyczki to #1 wektor ataków

**Jak robić to dobrze:**

✅ **Włącz automatyczne aktualizacje minor**
```php
// wp-config.php
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
```

✅ **Regularne aktualizacje wtyczek**
- Co tydzień sprawdzaj dostępne aktualizacje
- Usuń nieużywane wtyczki
- Używaj tylko wtyczek z dobrymi opiniami

✅ **Staging environment**
- Testuj aktualizacje na kopii produkcyjnej
- Sprawdź kompatybilność przed deploy

**Narzędzia do automatyzacji:**
- ManageWP
- InfiniteWP
- MainWP

### 2. Silne Hasła i 2FA

**Problem:**
- "admin/admin" to wciąż popularne hasło (!)
- Brute-force attacks są codziennością
- Dictionary attacks potrafią złamać słabe hasła w minuty

**Rozwiązanie:**

✅ **Silne hasła**
```
Słabe:    admin123
Mocne:    K#9mP$xR2@vL5nQ8
```

Generator haseł:
- 1Password
- LastPass
- Bitwarden

✅ **Dwuskładnikowa autoryzacja (2FA)**

Polecane wtyczki:
```
1. Two-Factor (official)
2. Wordfence 2FA
3. Google Authenticator
```

Konfiguracja:
1. Zainstaluj wtyczkę 2FA
2. Skonfiguruj aplikację (Google Authenticator, Authy)
3. Zapisz backup codes
4. Wymuś 2FA dla wszystkich użytkowników

✅ **Limit prób logowania**

Plugin: **Limit Login Attempts Reloaded**
```
Konfiguracja:
- Max attempts: 3
- Lockout duration: 30 minutes
- Long lockout after: 5 lockouts
```

### 3. Zabezpieczenie wp-config.php

Plik `wp-config.php` zawiera wszystkie kluczowe dane (database credentials, security keys).

**Krok 1: Przenieś poza public_html**
```bash
# Zamiast:
/public_html/wp-config.php

# Użyj:
/wp-config.php (poziom wyżej)
```

**Krok 2: Zmień permissions**
```bash
chmod 400 wp-config.php
```

**Krok 3: Wygeneruj nowe security keys**
```php
// https://api.wordpress.org/secret-key/1.1/salt/

define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');
```

**Krok 4: Wyłącz edycję plików**
```php
// wp-config.php
define( 'DISALLOW_FILE_EDIT', true );
```

### 4. SSL/HTTPS - Obowiązkowe w 2025

**Dlaczego SSL?**
- Szyfrowanie danych
- Lepsze SEO (Google ranking factor)
- Zaufanie użytkowników
- Wymagane przez przeglądarki

**Jak wdrożyć:**

1. **Certyfikat SSL**
   - Let's Encrypt (darmowy)
   - Certyfikat od hostingu
   - Komercyjny certyfikat

2. **Force HTTPS**
```php
// wp-config.php
define('FORCE_SSL_ADMIN', true);

// .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

3. **Really Simple SSL plugin**
   - Automatyczna konfiguracja
   - Mixed content fixer
   - 301 redirects

### 5. Security Plugins - Must Have

#### Wordfence Security
**Co robi:**
- Firewall
- Malware scanning
- Live traffic monitoring
- Login security

**Konfiguracja:**
```
✅ Enable firewall (Extended Protection)
✅ Enable malware scanner (daily)
✅ Enable login security (2FA)
✅ Email alerts dla admin
```

#### Sucuri Security
**Co robi:**
- Security activity auditing
- File integrity monitoring
- Remote malware scanning
- Security hardening

**Konfiguracja:**
```
✅ Post-Hack Security Actions
✅ File Integrity Monitoring
✅ Security Notifications
```

#### iThemes Security Pro
**Co robi:**
- 30+ sposobów zabezpieczenia WP
- Two-Factor Authentication
- Password security
- Database backups

### 6. Regular Backups

**Dlaczego backupy?**
- Recovery po ataku
- Recovery po błędach
- Peace of mind

**Strategia 3-2-1:**
- **3** kopie danych
- **2** różne media
- **1** kopia off-site

**Najlepsze pluginy backup:**

1. **UpdraftPlus**
```
Funkcje:
- Scheduled backups
- Cloud storage (Google Drive, Dropbox, S3)
- One-click restore
- Incremental backups
```

2. **BackupBuddy**
```
Funkcje:
- Real-time backups
- Malware scanning
- Staging sites
```

3. **BackWPup**
```
Funkcje:
- Free & Open Source
- Multiple backup destinations
- Database optimization
```

**Częstotliwość:**
- Database: Daily
- Files: Weekly
- Full backup: Monthly

### 7. Hardening WordPress

**wp-admin Protection**
```apache
# .htaccess w /wp-admin/
AuthType Basic
AuthName "Restricted Area"
AuthUserFile /path/.htpasswd
Require valid-user
```

**Disable XML-RPC**
```php
// functions.php
add_filter('xmlrpc_enabled', '__return_false');
```

**Ukryj wersję WordPress**
```php
// functions.php
remove_action('wp_head', 'wp_generator');

// Remove from RSS
add_filter('the_generator', '__return_empty_string');
```

**Zmień database prefix**
```php
// wp-config.php
$table_prefix = 'xyz123_'; // zamiast 'wp_'
```

**Disable file editing**
```php
// wp-config.php
define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', true);
```

### 8. Monitoring i Alerts

**Co monitorować:**
- Failed login attempts
- File changes
- Database changes
- Plugin/Theme updates
- Uptime

**Narzędzia:**

1. **Sucuri SiteCheck** (darmowy)
   - Malware scanning
   - Blacklist monitoring
   - Website firewall

2. **Jetpack Security**
   - Real-time backups
   - Malware scanning
   - Downtime monitoring

3. **UptimeRobot**
   - Uptime monitoring
   - SMS/Email alerts
   - Free tier dostępny

### 9. Security Headers

**HTTP Security Headers**
```apache
# .htaccess
<IfModule mod_headers.c>
    # X-Frame-Options
    Header always set X-Frame-Options "SAMEORIGIN"
    
    # X-Content-Type-Options
    Header always set X-Content-Type-Options "nosniff"
    
    # X-XSS-Protection
    Header always set X-XSS-Protection "1; mode=block"
    
    # Content Security Policy
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    
    # Referrer Policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

**Test headers:**
- [SecurityHeaders.com](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)

### 10. Security Checklist 2025

#### Daily
- [ ] Check login attempts logs
- [ ] Monitor traffic anomalies
- [ ] Check uptime status

#### Weekly
- [ ] Update plugins/themes
- [ ] Review security logs
- [ ] Check backup status
- [ ] Scan for malware

#### Monthly
- [ ] Update WordPress core
- [ ] Review user accounts
- [ ] Test backups (restore)
- [ ] Security audit
- [ ] Update passwords

#### Quarterly
- [ ] Full security audit
- [ ] Review and update security policies
- [ ] Performance optimization
- [ ] Clean up unused plugins/themes

### Podsumowanie

Bezpieczeństwo WordPress to proces ciągły, nie jednorazowe działanie. Kluczowe punkty:

✅ **Zawsze aktualizuj** WP, wtyczki, motywy  
✅ **Silne hasła + 2FA** dla wszystkich  
✅ **Regularne backupy** (3-2-1 rule)  
✅ **Security plugin** (Wordfence/Sucuri)  
✅ **SSL/HTTPS** obowiązkowo  
✅ **Monitoring** i alerty  
✅ **Hardening** (wyłącz XML-RPC, ukryj wersję)  
✅ **Security headers** w .htaccess  

Pamiętaj: **Prevention > Recovery**

Zainwestuj czas w zabezpieczenie teraz, zaoszczędzisz dni/tygodnie na recovery później!

**Pytania? Napisz w komentarzach!**

---

## Artykuł 3: Optymalizacja WooCommerce - Przewodnik 2025

### Meta
- **Kategoria:** E-commerce, WooCommerce, Performance
- **Tagi:** WooCommerce, Optimization, Performance, E-commerce
- **Data:** 20 września 2025
- **Autor:** Marek Wiśniewski
- **Czas czytania:** 12 min
- **Poziom:** Średniozaawansowany

### Lead
Wolny sklep WooCommerce to utracone sprzedaże. W tym przewodniku pokażemy, jak zoptymalizować WooCommerce, aby zyskać sub-2-second page load time i zwiększyć konwersję nawet o 40%.

### Wstęp
WooCommerce to najpopularniejsza platforma e-commerce na świecie, ale może być wolna jeśli nie jest prawidłowo skonfigurowana. Badania pokazują, że:

- **1 sekunda opóźnienia** = -7% konwersji
- **3 sekundy load time** = 40% bounce rate
- **Amazon zarabia $1.6B więcej rocznie** po skróceniu load time o 1s

Optymalizacja WooCommerce to nie opcja - to konieczność!

(ciąg dalszy artykułu...)

---

## Artykuł 4: React Server Components - Rewolucja w React

*[Podobny format jak powyżej]*

---

## Artykuł 5: Jak Wybrać Hosting dla WordPress w 2025

*[Podobny format jak powyżej]*

---

## Kategorie Bloga

### Frontend Development
- React / Next.js tutorials
- JavaScript best practices
- CSS/Tailwind tips
- Performance optimization

### Backend Development
- Node.js / Spring Boot
- API design
- Database optimization
- Security

### WordPress
- Plugin recommendations
- Theme development
- WooCommerce tips
- Security & maintenance

### E-commerce
- Conversion optimization
- UX best practices
- Payment gateways
- Shipping integrations

### DevOps & Tools
- CI/CD pipelines
- Docker / Kubernetes
- Monitoring
- Cloud platforms

### Business & Strategy
- Web development pricing
- Client management
- Project management
- Industry trends
