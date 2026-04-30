# IT Solutions

Strona wizytówka + backend + admin BO. Pełen stack zbudowany z Next.js (static export), Spring Boot 3.4 i Vite + React.

## Architektura

```
                   HTTPS
  Browser  ──────────────────►  Caddy (reverse proxy)
                                  itsolutions.pl       → frontend
                                  api.itsolutions.pl   → backend
                                  admin.itsolutions.pl → admin (BasicAuth + JWT)
                                          │
                  ┌───────────────────────┼───────────────────────┐
                  │                       │                       │
              ┌───▼───┐              ┌────▼────┐             ┌────▼────┐
              │frontend│              │backend  │             │admin SPA│
              │(nginx) │              │Spring 21│             │(nginx)  │
              │ static │              │ Boot    │             │  Vite   │
              └────────┘              └────┬────┘             └────┬────┘
                                           │                       │
                              ┌────────────┼─────────────┐         │
                              │            │             │         │
                        ┌─────▼─┐   ┌──────▼──┐   ┌──────▼─────┐   │
                        │Postgres│  │SMTP     │   │Ollama/Gemini│   │
                        │   16   │  │relay    │   │ LLM gateway │   │
                        └────────┘  └─────────┘   └─────────────┘   │
                              ▲                                     │
                              └─────────────────────────────────────┘
                                            (admin → /api proxy)
```

Ruch z BriefForm i ChatWidget idzie bezpośrednio do `api.itsolutions.pl/api/v1/*` (frontend jest statyczny — nie ma własnego runtime'u API). Admin SPA przechodzi przez wewnętrzny nginx-proxy do backendu.

LLM: dwa providery zawsze zarejestrowane (Ollama, Gemini). `application.yml` wybiera primary + fallback przez `llm.primary` i `llm.fallback` — fallback uruchamia się TYLKO na quota/rate-limit (Gemini 429 → Ollama).

## Quick Start (Docker, lokalnie)

```bash
cp .env.example .env
# (opcjonalnie wyedytuj .env — defaulty wystarcza dla dev)

npm run docker:dev
npm run docker:logs
```

Otwórz:
- http://localhost — strona publiczna
- http://localhost:8025 — MailHog UI (testy maili)
- http://admin.localhost — admin BO (login: `admin@itsolutions.pl` / `admin123`; basic-auth: `admin` / `admin123`)
- http://api.localhost/swagger-ui — OpenAPI docs

> Dla `api.localhost` i `admin.localhost` dodaj do `C:\Windows\System32\drivers\etc\hosts` (Windows) lub `/etc/hosts` (Unix):
> ```
> 127.0.0.1 api.localhost admin.localhost
> ```

Pierwsze uruchomienie buduje obrazy (~5-10 min). Kolejne — sekundy.

## Quick Start (deweloperka bez Dockera)

```bash
# 1. Tylko Postgres + MailHog + Ollama w Dockerze:
docker compose --profile dev up -d postgres mailhog ollama

# 2. Backend lokalnie (wymaga Java 21 + Maven 3.9+):
cd backend && mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 3. Frontend lokalnie:
npm install && npm run dev   # http://localhost:3000

# 4. Admin lokalnie:
cd admin-frontend && npm install && npm run dev   # http://localhost:5173
```

## Deploy na VPS

Pełny runbook: [`deploy/README.md`](deploy/README.md) — wymagania, firewall, htpasswd, backupy, troubleshooting.

```bash
# Skrót — szczegóły w runbooku
git clone https://github.com/<your-org>/itsolutions.git
cd itsolutions
cp .env.example .env  # edytuj!
htpasswd -B -c deploy/htpasswd admin
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Stack

**Frontend (`/`):** Next.js 16, React 19, TypeScript 5, Tailwind 3, next-intl 4, Framer Motion 12, GSAP, Cloudflare Turnstile.

**Backend (`backend/`):** Java 21, Spring Boot 3.4 (web, data-jpa, security, mail, validation), PostgreSQL 16, Flyway, JJWT, Lombok, MapStruct, Testcontainers, GreenMail, WireMock.

**Admin (`admin-frontend/`):** Vite 7, React 19, react-router-dom 7, @tanstack/react-query, axios, Tailwind 4.

**DevOps:** Docker 24+, Docker Compose v2, Caddy 2.x, MailHog (dev), Ollama (dev/optional prod).

## Komendy

```bash
# Docker stack
npm run docker:dev      # full stack with mailhog + ollama
npm run docker:prod     # prod stack (no mailhog/ollama)
npm run docker:logs     # tail logs from all services
npm run docker:down     # stop containers, keep volumes
npm run docker:reset    # stop and DELETE volumes (postgres data!)

# Frontend
npm run dev             # next dev (port 3000)
npm run build           # static export → out/
npm run lint
npm run test            # playwright

# Backend
cd backend && mvn spring-boot:run -Dspring-boot.run.profiles=dev
cd backend && mvn -B verify    # full test suite (Testcontainers + GreenMail + WireMock)

# Admin
cd admin-frontend && npm run dev    # vite dev server (port 5173)
cd admin-frontend && npm run build  # → admin-frontend/dist
```

## Struktura projektu

```
new-site/
├── app/                    # Next.js App Router (static export)
│   └── [locale]/           # Multi-language routing
├── components/             # React components
│   ├── ui/                 # shadcn-style primitives
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Page sections (hero, contact, ...)
│   ├── chat/               # ChatWidget
│   └── forms/              # (deleted — replaced by lib/api clients)
├── lib/
│   ├── api/                # Typed backend clients (contact, chat, lead)
│   ├── chat/               # ChatWidget hook + types
│   └── design/             # Calculator, portfolio data
├── messages/               # next-intl PL/EN translations
├── i18n/                   # next-intl config
├── public/                 # Static assets
├── backend/                # Spring Boot 3.4 (hexagonal architecture)
│   ├── src/main/java/com/itsolutions/
│   │   ├── adapter/        # in/web (controllers) + out/{persistence,email,llm}
│   │   ├── application/    # use case implementations
│   │   ├── domain/         # entities + ports
│   │   └── infrastructure/ # security, config, exceptions
│   └── src/main/resources/db/migration/  # Flyway V1-V8
├── admin-frontend/         # Vite + React BO
│   └── src/
│       ├── pages/          # Login, Dashboard, ContactsList, ...
│       ├── services/       # axios wrappers
│       └── components/     # Layout, UI primitives
├── api/                    # OpenAPI 3.1 spec (consumed by backend's openapi-generator)
├── deploy/                 # VPS runbook + backup script
├── docker-compose.yml      # Full stack (postgres, backend, frontend, admin, caddy)
├── docker-compose.dev.yml  # Override: mailhog/ollama enabled, Caddyfile.dev
├── docker-compose.prod.yml # Override: mailhog/ollama disabled, Caddyfile prod
├── Caddyfile               # Production reverse proxy (HTTPS auto)
├── Caddyfile.dev           # Dev reverse proxy (port 80, no TLS)
└── .env.example            # All stack env vars (frontend + backend + Caddy)
```

## Licencja

Projekt stworzony dla IT Solutions © 2026
