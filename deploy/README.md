# VPS Deployment Runbook

Pełna instrukcja postawienia stack'u na VPS — pierwsze uruchomienie, aktualizacje, backupy, troubleshooting.

## Wymagania VPS

- 2 vCPU, 4 GB RAM, 40 GB SSD (rekomendacja: Hetzner CX22, OVH VPS-1, Mikr.us)
- Ubuntu 22.04 LTS lub Debian 12
- Otwarte porty: 80, 443 (publiczne); 22 (SSH — ograniczyć w firewall do swojego IP)
- DNS A/AAAA dla 3 nazw wskazujących na IP VPS:
  - `itsolutions.pl` → frontend
  - `api.itsolutions.pl` → backend API
  - `admin.itsolutions.pl` → BO (rekomendacja: subdomena nielinkowana publicznie)

## Pierwsze uruchomienie

### 1. Setup hosta

```bash
# Update + Docker
apt update && apt upgrade -y
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin git ufw fail2ban apache2-utils

# Firewall
ufw default deny incoming
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# fail2ban (defaultowe reguly dla SSH OK)
systemctl enable --now fail2ban

# Tworzenie uzytkownika aplikacyjnego
useradd -m -s /bin/bash app && usermod -aG docker app
```

### 2. Clone repo

```bash
su - app
git clone https://github.com/<your-org>/itsolutions.git /home/app/itsolutions
cd /home/app/itsolutions
```

### 3. Konfiguracja env

```bash
cp .env.example .env
# Edytuj .env i ustaw wszystkie sekrety:
#   - DB_PASSWORD               (generuj: openssl rand -base64 32)
#   - JWT_SECRET                (generuj: openssl rand -base64 64 | tr -d '\n')
#   - SMTP_HOST/USER/PASSWORD   (Postmark / SendGrid / Mailgun)
#   - GEMINI_API_KEY            (jesli LLM_PRIMARY=gemini)
#   - LLM_PRIMARY/LLM_FALLBACK  (target: primary=gemini, fallback=ollama jesli masz osobny VPS z Ollama)
#   - TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY (z dash.cloudflare.com)
#   - DOMAIN_PUBLIC, DOMAIN_API, DOMAIN_ADMIN
#   - ACME_EMAIL                (Let's Encrypt notifications)
#   - CORS_ORIGINS              (https://itsolutions.pl)
#   - PUBLIC_URL, ADMIN_URL     (uzywane przez email templates jako adminUrl)
```

### 4. Wygeneruj htpasswd dla admina BO

```bash
# Hash haslo i zapisz w bezpiecznym miejscu (Bitwarden/1Password). PASSWORD musi byc silne.
htpasswd -B -c deploy/htpasswd admin
# Dodaj kolejne konta:
htpasswd -B deploy/htpasswd <username>
```

`deploy/htpasswd` jest w `.gitignore` — NIE commituj go.

### 5. Build + start

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker compose ps
docker compose logs -f backend  # zaczekaj az zobaczysz "Started ITSolutionsApplication"
```

Pierwszy build ~5-10 min (Maven pobiera deps, Next builduje statyczny export).

### 6. Sprawdz health

```bash
curl https://api.itsolutions.pl/actuator/health  # → {"status":"UP"}
curl -I https://itsolutions.pl                   # → 200
curl -u admin:<password> https://admin.itsolutions.pl  # → SPA HTML
```

DNS potrzebuje chwili po pierwszym deploy'u; jesli `curl` pokazuje "couldn't resolve" zaczekaj 1-5 min. Jesli Caddy nie wystawia certyfikatu — sprawdz ze porty 80 i 443 sa otwarte (`ufw status`) i ze DNS faktycznie wskazuje na ten VPS (`dig +short itsolutions.pl`).

## Bezpieczeństwo BO (back-office)

Domyślna konfiguracja: **2 warstwy** ochrony.

1. **Osobny subdomain** (`admin.itsolutions.pl`) — nie linkujemy go nigdzie publicznie + Caddy ustawia `X-Robots-Tag: noindex`. Wymusza świadome wpisanie URLa.
2. **Basic Auth w Caddy** (`/etc/caddy/htpasswd`) — pierwsza brama (HTTP 401 zanim ruch dotrze do SPA).
3. **JWT auth w aplikacji** — backend i tak wymaga loginu admina, więc nawet jeśli ktoś przebije Basic Auth, dostanie pustą SPA i 401 na każdym fetchu do `/api/v1/admin/*`.

> **Uwaga:** Basic Auth NIE chroni przed brute-force tak jak IP allowlist. Daje wystarczająco dużo "tarcia" by odbić scannery i boty, ale ktoś z konkretnym celem przejdzie. Dlatego JWT (3) jest realnym mechanizmem autoryzacji, a Basic Auth (2) pełni rolę gate'a żeby BO nie wystawiał zbędnie publicznego API attack-surface.

### Opcjonalne wzmocnienia (do rozważenia po MVP)

Modyfikujesz tylko `Caddyfile`:

**A. IP allowlist** — dodaj do bloku `{$DOMAIN_ADMIN}`:
```caddy
@notallowed not remote_ip 185.1.2.3 192.168.1.0/24
handle @notallowed { respond "Forbidden" 403 }
```
Wymaga znanego stałego IP (Twój dom + biuro + VPN).

**B. Cloudflare Access (Zero Trust)** — wystaw `admin.*` przez Cloudflare Tunnel; identity provider (Google/GitHub) załatwia autentykację, VPS nawet nie ma publicznego DNS dla `admin.*`. Najbezpieczniejsze.

**C. WireGuard VPN** — postaw kontener `wireguard` na VPS, dodaj IP allowlist tylko dla `10.8.0.0/24`. Pracownicy łączą się przez VPN.

**D. SSH tunnel-only** — w `docker-compose.prod.yml` usuń `admin.*` z Caddyfile i opublikuj `admin` service tylko na loopback:
```yaml
admin:
  ports:
    - "127.0.0.1:8090:80"
```
i tunelujesz: `ssh -L 8090:localhost:8090 app@vps`. Zero ekspozycji publicznej, ale wymaga SSH access dla każdej osoby z BO.

## Backupy

`deploy/backup.sh` robi `pg_dump` do `/srv/itsolutions/backups/` raz dziennie. Zaplanuj cron:

```bash
crontab -e
# Add (3:00 AM):
0 3 * * * /home/app/itsolutions/deploy/backup.sh >> /var/log/itsolutions-backup.log 2>&1
```

Restore:
```bash
gunzip -c /srv/itsolutions/backups/dump-2026-04-30.sql.gz | \
  docker compose exec -T postgres psql -U $DB_USER -d $DB_NAME
```

> **Krytyczne:** kopiuj backupy off-site (S3 / Backblaze B2 / restic do drugiego VPSa). Skrypt ma TODO — uzupełnij `aws s3 cp` lub `rclone copy`.

## LLM w produkcji

Default w `.env.example`: `LLM_PRIMARY=ollama, LLM_FALLBACK=` (Ollama only).

Realnie na małym VPS bez GPU Ollama jest wolna (~5-10s/odpowiedź na CPU). Rekomendacje:

- **Najprościej (najszybciej):** `LLM_PRIMARY=gemini, GEMINI_API_KEY=...` — darmowy tier wystarczy dla MVP. Po wyczerpaniu kwoty fallback na Ollamę: `LLM_FALLBACK=ollama` + osobny VPS z Ollamą wskazany przez `OLLAMA_URL=http://other-host:11434`.
- **Tylko Ollama, własny hardware:** wyłącz lokalną Ollamę w `docker-compose.yml` (już jest w profile=dev, nie startuje w prod), postaw kontener Ollama na osobnym VPS z 8 GB RAM lub GPU, wskaż `OLLAMA_URL` w `.env`.
- **Wyłącz chat:** w UI ChatWidget gracefully fallbackuje do "Skorzystaj z formularza" gdy LLM nie odpowiada — można po prostu nie startować Ollamy.

Konfiguracja chain'a w `application.yml`:
- `llm.primary=gemini` + `llm.fallback=ollama` → Gemini → na 429/quota → Ollama
- `llm.primary=ollama` + `llm.fallback=` → tylko Ollama
- Restart backendu po zmianie env.

## Aktualizacje (deploy nowej wersji)

```bash
cd /home/app/itsolutions
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker image prune -f
```

Backend `start_period: 60s` w healthcheck zostawia czas na Flyway migrations. Caddy nadal serwuje stary kontener póki nowy nie odpowie healthy (rolling-style restart).

## Monitoring (opcjonalnie, post-MVP)

- Logs: `docker compose logs -f --tail=200 <service>`
- Metryki: Spring Boot Actuator + Prometheus + Grafana (osobna faza)
- Uptime: UptimeRobot / Better Stack — ping `https://api.itsolutions.pl/actuator/health`

## Troubleshooting

| Symptom | Przyczyna | Fix |
|---|---|---|
| 502 Bad Gateway na `/api/*` | backend nie wystartowal (Flyway, brak DB) | `docker compose logs backend`, sprawdz `DB_*` env |
| Cert Let's Encrypt nie wystawia sie | DNS jeszcze nie dotarl / port 80/443 zablokowany | `dig +short itsolutions.pl`, `ufw status` |
| `401 Unauthorized` na `admin.*` (browser dialog) | brak / zla Basic Auth | wpisz dane z `deploy/htpasswd` lub odswież: `htpasswd -B deploy/htpasswd admin && docker compose up -d caddy` |
| Email nie wysyla sie w prod | SMTP creds zle | sprawdz `email_logs`: `SELECT * FROM email_logs WHERE status='FAILED' ORDER BY created_at DESC LIMIT 10` |
| Chat odpowiada "technical issues" | Ollama nie odpowiada / model nie pobrany | `docker compose exec ollama ollama list`, lub przelacz na Gemini |
| Frontend laduje sie ale `submitBrief` rzuca CORS | `CORS_ORIGINS` nie zawiera `DOMAIN_PUBLIC` | popraw w `.env`, `docker compose up -d backend` |
| `mvn package` w buildzie freezuje | Brak `api/` w kontekscie buildu | upewnij sie ze `docker build -f backend/Dockerfile .` jest uruchamiany Z ROOTA repo (nie z backend/) |
