# Backend Wiring + Docker / VPS Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Spiąć frontend redesignu (Next.js, static export) z backendem Spring Boot (zbieranie briefów, czat, leady, wycena), zbudować brakującą warstwę persistence + email + LLM gateway w backendzie, zbudować podstawowy admin (auth + listy), i przygotować pełny Docker Compose stack gotowy do wdrożenia na VPS — z izolacją back-office (BO) za odrębnym hostnamem + opcjonalnym Basic Auth + IP allowlist (BO niedostępny z publicznego internetu w domyślnym profilu).

**Architecture:**
- **Frontend (public):** Next.js 16 z `output: 'export'` → statyczne pliki serwowane przez `nginx` na `https://itsolutions.pl`. Brief/contact form i chat NIE używają Next API routes (nie działają w static export); strzelają bezpośrednio w `https://api.itsolutions.pl/api/v1/*` (CORS wpięty w Spring Security).
- **Backend (API):** Spring Boot 3.4 z Hexagonal Architecture (już są domain models + use cases + controllers). Dopisujemy brakujące porty wyjściowe: JPA repositories, SMTP email sender, Ollama/Gemini LLM gateway, AdminUser repo + LoginController, Lead public POST endpoint.
- **Admin BO (panel):** Vite + React (już zescaffoldowany, ale `App.tsx` to default Vite). Budujemy minimum: Login + 4 listy (contacts/quotes/leads/chats) + detail view + reply dialog. Serwowany jako static przez **osobną** instancję nginx pod `https://admin.itsolutions.pl` z Basic Auth + IP allowlist (lub VPN-only — opisane w deployment).
- **Persistence:** PostgreSQL 16 w kontenerze, Flyway już uruchamia V1+V2 migrations.
- **Email (dev):** MailHog kontener (port 1025 SMTP, 8025 UI). **Email (prod):** SMTP relay (Postmark/SendGrid/Mailgun — env-driven).
- **LLM (dev):** Ollama kontener z `llama3.2`. **Prod:** opcjonalnie Ollama na osobnym VPS lub Gemini API.
- **Reverse proxy:** Caddy (preferowane — auto-HTTPS via Let's Encrypt) ALBO nginx z certbotem. Cały stack za jednym Caddyfile, traffic routing po hoście (`itsolutions.pl` → site, `api.itsolutions.pl` → backend, `admin.itsolutions.pl` → admin + Basic Auth).
- **Sekrety:** `.env` per env (dev/prod), commitowany jest tylko `.env.example`.

**Tech Stack:**
- Frontend: Next 16, React 19, Tailwind 3, next-intl 4 — bez zmian
- Backend: Java 21, Spring Boot 3.4, PostgreSQL 16, Flyway, JJWT, MapStruct, Lombok — bez zmian, dopisujemy adaptery
- Admin: React 19, Vite 7, react-router-dom 7, axios, @tanstack/react-query, recharts — bez zmian
- DevOps: Docker 24+, Docker Compose v2, Caddy 2.x, Postgres 16-alpine, MailHog (dev), Ollama (dev/prod opc.)
- Testy backend: JUnit 5 + Spring Boot Test + Testcontainers (Postgres) — już skonfigurowane

**Scope check / split-plan note:** To trzy niezależne podsystemy:
- **A. Frontend → Backend wiring** (BriefForm/Chat/Lead bez API routes, CORS, walidacja end-to-end)
- **B. Backend implementation** (porty out + adaptery JPA/SMTP/LLM + Login + tests + Lead public)
- **C. Docker / VPS deployment** (Dockerfile per service + compose + Caddy + admin isolation + production runbook)
- **D. Admin minimum-viable BO** (login + 4 listy)

Każdy podsystem produkuje samodzielny mergowalny inkrement. Jeśli wolisz split na 3-4 osobne PRy, wykonuj fazy w kolejności **B → A → D → C** (najpierw real backend, potem klienci, potem opakowanie deploy). W planie idą w tej kolejności.

---

## File Structure

### Nowe pliki — Backend (Spring Boot)
- `backend/src/main/java/com/itsolutions/domain/contact/port/out/ContactRepository.java` — port (interfejs)
- `backend/src/main/java/com/itsolutions/domain/quote/port/out/QuoteRepository.java` — port
- `backend/src/main/java/com/itsolutions/domain/lead/port/out/LeadRepository.java` — port
- `backend/src/main/java/com/itsolutions/domain/chat/port/out/ChatRepository.java` — port
- `backend/src/main/java/com/itsolutions/domain/chat/port/out/LlmGateway.java` — port (req/resp records)
- `backend/src/main/java/com/itsolutions/domain/email/port/out/EmailSender.java` — port (z `EmailRequest`/`EmailResult`)
- `backend/src/main/java/com/itsolutions/domain/email/port/out/EmailTemplateRepository.java` — port
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactJpaEntity.java` — JPA entity
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactJpaRepository.java` — Spring Data
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactRepositoryAdapter.java` — implementacja portu
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactMapper.java` — MapStruct
- (analogicznie po 4 pliki per moduł: quote, lead, chat — `chat_sessions` + `chat_messages`)
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/admin/AdminUserJpaEntity.java`
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/admin/AdminUserJpaRepository.java`
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailTemplateJpaEntity.java`
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailTemplateJpaRepository.java`
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailLogJpaEntity.java`
- `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailLogJpaRepository.java`
- `backend/src/main/java/com/itsolutions/adapter/out/email/SmtpEmailSender.java` — implementacja portu via JavaMailSender
- `backend/src/main/java/com/itsolutions/adapter/out/email/EmailTemplateRenderer.java` — rendering `{{var}}` → wartości
- `backend/src/main/java/com/itsolutions/adapter/out/llm/OllamaLlmGateway.java` — implementacja portu (HTTP)
- `backend/src/main/java/com/itsolutions/adapter/out/llm/GeminiLlmGateway.java` — implementacja portu
- `backend/src/main/java/com/itsolutions/adapter/out/llm/LlmGatewayConfig.java` — wybór beana po `llm.provider`
- `backend/src/main/java/com/itsolutions/adapter/in/web/auth/AuthController.java` — login/refresh/me
- `backend/src/main/java/com/itsolutions/adapter/in/web/lead/LeadController.java` — public POST `/api/v1/leads`
- `backend/src/main/java/com/itsolutions/application/lead/LeadApplicationService.java` — uzupełnić jeśli niepełny (już istnieje)
- `backend/src/main/java/com/itsolutions/domain/lead/port/in/CreateLeadUseCase.java` — uzupełnić Command/Result jeśli brak (już istnieje)
- `backend/src/main/java/com/itsolutions/infrastructure/security/AuthApplicationService.java` — login + JWT issue + refresh
- `backend/src/main/java/com/itsolutions/infrastructure/security/CurrentAdminProvider.java` — pomocniczy (`getCurrentAdminId()`)
- `backend/src/main/resources/db/migration/V3__add_contact_extras.sql` — dodać `subject`, `company`, `locale`, `quote_total_pln`, `quote_payload_json` do `contact_requests` (BriefForm wysyła wycenę razem z briefem)
- `backend/Dockerfile` — multi-stage Maven build → minimal JRE runtime
- `backend/.dockerignore`
- `backend/src/main/resources/application-prod.yml` — profil prod (logi, mail real, CORS prod)
- `backend/src/test/java/com/itsolutions/adapter/in/web/contact/ContactControllerIT.java` — testy IT (Testcontainers) — submit + walidacja
- `backend/src/test/java/com/itsolutions/adapter/in/web/auth/AuthControllerIT.java` — login happy + 401
- `backend/src/test/java/com/itsolutions/adapter/in/web/lead/LeadControllerIT.java` — public POST + walidacja
- `backend/src/test/java/com/itsolutions/adapter/out/email/SmtpEmailSenderTest.java` — z fake SMTP (GreenMail)

### Nowe pliki — Frontend (Next.js)
- `lib/api/client.ts` — cienki klient backendu z `NEXT_PUBLIC_API_URL`, fetch wrapper, walidacja zod
- `lib/api/contact.ts` — `submitBrief(payload)` (mapuje BriefForm → `POST /api/v1/contact`)
- `lib/api/chat.ts` — `sendChatMessage(payload)` (zastąpi `/api/chat` route)
- `Dockerfile.frontend` (root) — multi-stage: build statycznych plików → nginx-alpine
- `nginx.frontend.conf` — config dla statycznego serwowania (gzip, cache headers)
- `.dockerignore` (root)

### Nowe pliki — Admin Frontend (Vite/React)
- `admin-frontend/src/App.tsx` — **rewrite** (router + auth gate)
- `admin-frontend/src/pages/LoginPage.tsx`
- `admin-frontend/src/pages/DashboardPage.tsx` (placeholder z 4 kartami)
- `admin-frontend/src/pages/ContactsListPage.tsx`
- `admin-frontend/src/pages/ContactDetailPage.tsx`
- `admin-frontend/src/pages/QuotesListPage.tsx`
- `admin-frontend/src/pages/LeadsListPage.tsx`
- `admin-frontend/src/pages/ChatsListPage.tsx`
- `admin-frontend/src/components/ProtectedRoute.tsx`
- `admin-frontend/src/hooks/useAuth.ts`
- `admin-frontend/src/main.tsx` — **modify** (BrowserRouter + QueryClientProvider)
- `admin-frontend/Dockerfile` — multi-stage: vite build → nginx-alpine
- `admin-frontend/nginx.admin.conf`
- `admin-frontend/.dockerignore`
- `admin-frontend/.env.example`

### Nowe pliki — Deployment
- `docker-compose.yml` — full stack (postgres, mailhog, ollama, backend, frontend, admin, caddy)
- `docker-compose.prod.yml` — overrides dla prod (no mailhog, no ollama if Gemini, real Caddy domains)
- `docker-compose.dev.yml` — overrides dla dev (volume mounts, hot-reload nie wymagany)
- `Caddyfile` — reverse proxy z hostami i Basic Auth + IP allowlist na admin
- `Caddyfile.dev` — wersja dev (localhost, brak HTTPS)
- `.env.example` — root env (zawiera wszystkie zmienne stosu)
- `deploy/README.md` — runbook VPS (pierwsze uruchomienie, backupy, rotacja sekretów)
- `deploy/backup.sh` — pg_dump cron skrypt
- `deploy/htpasswd.example` — przykład pliku Basic Auth (do uzupełnienia)

### Modyfikowane pliki
- `components/sections/contact/BriefForm.tsx` — POST do `lib/api/contact.ts` zamiast `/api/contact`, dodać error state i Turnstile token
- `components/chat/ChatWidget.tsx` / `lib/chat/useChat.ts` — używać `lib/api/chat.ts` zamiast `/api/chat`
- `app/api/contact/route.ts` — **DELETE** (static export i tak ich nie buduje)
- `app/api/quote/route.ts` — **DELETE**
- `app/api/chat/route.ts` — **DELETE**
- `next.config.js` / `next.config.ts` — usunąć duplikat (jest dwie config files), zostawić tylko `.js` lub `.ts`
- `.env.example` — wymienić niepotrzebne klucze, dodać `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `backend/src/main/java/com/itsolutions/infrastructure/config/SecurityConfig.java` — dodać `/api/v1/auth/login` permit, dodać `actuator/health` permit, reszta `actuator/**` admin only
- `backend/src/main/java/com/itsolutions/infrastructure/config/CorsConfig.java` — dopisać `https://itsolutions.pl` do origins (env-driven)
- `backend/src/main/resources/application.yml` — dodać `app.admin.email`, `app.public.url` (do template adminUrl), `app.admin.url`
- `admin-frontend/src/lib/api.ts` — `VITE_API_URL` default `'/api/v1'` (relative — nginx proxypass), token z react-query state, redirect na `/login` zamiast `window.location`
- `package.json` (root) — dodać script `docker:dev`, `docker:prod`, `docker:logs`
- `README.md` — sekcja Quick Start z dockerem + diagram architektury

---

## Pre-flight checks

- [ ] **Step 0a: Verify Docker Desktop / Docker Engine + Compose v2 zainstalowane**

Run: `docker --version && docker compose version`
Expected: `Docker version 24+` i `Docker Compose version v2.20+`. Jeśli niedostępne — zainstaluj Docker Desktop (Win) lub `docker.io + docker-compose-plugin` (Linux).

- [ ] **Step 0b: Sprawdź wolne porty na host machine**

Run: `netstat -ano | findstr :3000` (Windows) / `lsof -i :3000` (Unix). Powtórz dla 5173, 8080, 5432, 8025, 11434, 80, 443. Wszystkie muszą być wolne, w przeciwnym razie zmień port w `docker-compose.yml`.
Expected: Brak wyniku.

- [ ] **Step 0c: Verify Java 21 + Maven 3.9+**

Run: `java -version && mvn -version`
Expected: `21.x` i `3.9+`. Jeśli brak — można pominąć (wszystko buduje się w Dockerze), ale lokalna iteracja będzie wolniejsza.

- [ ] **Step 0d: Verify Node 20+**

Run: `node -v && npm -v`
Expected: `v20+`, `10+`.

---

## Phase B — Backend Implementation

### Task B1: Wire JPA persistence — Contact module

**Files:**
- Create: `backend/src/main/java/com/itsolutions/domain/contact/port/out/ContactRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactJpaRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactMapper.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactRepositoryAdapter.java`
- Create: `backend/src/main/resources/db/migration/V3__add_contact_extras.sql`
- Test: `backend/src/test/java/com/itsolutions/adapter/out/persistence/contact/ContactRepositoryIT.java`

- [ ] **Step 1: Dopisz migrację V3 dla pól używanych przez BriefForm (subject, company, locale, quote payload)**

Plik `backend/src/main/resources/db/migration/V3__add_contact_extras.sql`:
```sql
ALTER TABLE contact_requests
  ADD COLUMN IF NOT EXISTS subject       VARCHAR(200),
  ADD COLUMN IF NOT EXISTS company       VARCHAR(255),
  ADD COLUMN IF NOT EXISTS locale        VARCHAR(5)  NOT NULL DEFAULT 'pl',
  ADD COLUMN IF NOT EXISTS quote_total   NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS quote_payload JSONB,
  ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS replied_by    UUID;

ALTER TABLE contact_requests
  DROP CONSTRAINT IF EXISTS chk_contact_status;
ALTER TABLE contact_requests
  ADD CONSTRAINT chk_contact_status CHECK (status IN ('new','read','replied','archived','spam'));

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contact_requests(email);
```

- [ ] **Step 2: Stwórz port `ContactRepository`**

Plik `backend/src/main/java/com/itsolutions/domain/contact/port/out/ContactRepository.java`:
```java
package com.itsolutions.domain.contact.port.out;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContactRepository {
    ContactRequest save(ContactRequest contact);
    Optional<ContactRequest> findById(UUID id);
    List<ContactRequest> findAll(ContactStatus status, String search, int page, int size, String sortBy, String sortDirection);
    long count(ContactStatus status, String search);
}
```

- [ ] **Step 3: Stwórz JPA entity**

Plik `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactJpaEntity.java`:
```java
package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "contact_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ContactJpaEntity {

    @Id
    private UUID id;

    @Column(nullable = false) private String name;
    @Column(nullable = false) private String email;
    private String phone;
    private String company;
    private String subject;
    @Column(nullable = false, columnDefinition = "TEXT") private String message;

    @Column(nullable = false) @Enumerated(EnumType.STRING)
    private ContactStatus status;

    @Column(nullable = false, length = 5) private String locale;

    @Column(name = "ip_address")  private String ipAddress;
    @Column(name = "user_agent", columnDefinition = "TEXT") private String userAgent;

    @Column(name = "quote_total") private BigDecimal quoteTotal;

    @Column(name = "quote_payload", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private String quotePayload;

    @Column(name = "reply_message", columnDefinition = "TEXT") private String replyMessage;
    @Column(name = "replied_by") private UUID repliedBy;
    @Column(name = "replied_at") private Instant repliedAt;

    @Column(name = "created_at", nullable = false) private Instant createdAt;
    @Column(name = "updated_at") private Instant updatedAt;
}
```

- [ ] **Step 4: Stwórz Spring Data repo**

Plik `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactJpaRepository.java`:
```java
package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactJpaRepository extends JpaRepository<ContactJpaEntity, UUID> {

    @Query("""
       SELECT c FROM ContactJpaEntity c
       WHERE (:status IS NULL OR c.status = :status)
         AND (:search IS NULL OR :search = ''
              OR LOWER(c.name)  LIKE LOWER(CONCAT('%', :search, '%'))
              OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')))
       """)
    Page<ContactJpaEntity> search(@Param("status") ContactStatus status,
                                  @Param("search") String search,
                                  Pageable pageable);

    @Query("""
       SELECT COUNT(c) FROM ContactJpaEntity c
       WHERE (:status IS NULL OR c.status = :status)
         AND (:search IS NULL OR :search = ''
              OR LOWER(c.name)  LIKE LOWER(CONCAT('%', :search, '%'))
              OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')))
       """)
    long countSearch(@Param("status") ContactStatus status, @Param("search") String search);
}
```

- [ ] **Step 5: Stwórz mapper (MapStruct)**

Plik `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactMapper.java`:
```java
package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    ContactJpaEntity toEntity(ContactRequest domain);

    ContactRequest toDomain(ContactJpaEntity entity);

    void updateEntity(ContactRequest domain, @MappingTarget ContactJpaEntity entity);
}
```

> Uwaga: `ContactRequest` to immutable (Lombok `@Builder` + getters). MapStruct wygeneruje konwersje. Jeśli nie zadziała ze względu na `final` pola — można dodać explicit setter `quotePayload` ręcznie.

- [ ] **Step 6: Stwórz adapter portu**

Plik `backend/src/main/java/com/itsolutions/adapter/out/persistence/contact/ContactRepositoryAdapter.java`:
```java
package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;
import com.itsolutions.domain.contact.port.out.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ContactRepositoryAdapter implements ContactRepository {

    private final ContactJpaRepository jpa;
    private final ContactMapper mapper;

    @Override
    public ContactRequest save(ContactRequest contact) {
        ContactJpaEntity saved = jpa.save(mapper.toEntity(contact));
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<ContactRequest> findById(UUID id) {
        return jpa.findById(id).map(mapper::toDomain);
    }

    @Override
    public List<ContactRequest> findAll(ContactStatus status, String search, int page, int size, String sortBy, String sortDirection) {
        Sort.Direction dir = "asc".equalsIgnoreCase(sortDirection) ? Sort.Direction.ASC : Sort.Direction.DESC;
        String prop = sortBy != null ? sortBy : "createdAt";
        return jpa.search(status, search, PageRequest.of(page, size, Sort.by(dir, prop)))
                .map(mapper::toDomain).getContent();
    }

    @Override
    public long count(ContactStatus status, String search) {
        return jpa.countSearch(status, search);
    }
}
```

- [ ] **Step 7: Stwórz integration test (Testcontainers Postgres)**

Plik `backend/src/test/java/com/itsolutions/adapter/out/persistence/contact/ContactRepositoryIT.java`:
```java
package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;
import com.itsolutions.domain.contact.port.out.ContactRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ContactRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired ContactRepository repository;

    @Test
    void saves_and_loads_contact() {
        ContactRequest c = ContactRequest.create(
            "Jan Kowalski", "jan@example.com", null, "Acme",
            "Brief", "Potrzebuję strony", "pl", "127.0.0.1", "test-agent"
        );
        ContactRequest saved = repository.save(c);

        Optional<ContactRequest> loaded = repository.findById(saved.getId());
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getEmail()).isEqualTo("jan@example.com");
        assertThat(loaded.get().getStatus()).isEqualTo(ContactStatus.NEW);
    }
}
```

- [ ] **Step 8: Run integration test — verify it fails (no MapStruct mapper yet generated, or compilation issue)**

Run: `mvn -pl backend -am test -Dtest=ContactRepositoryIT`
Expected: FAIL — albo brak Mappera, albo brak `quote_payload` w bazie. To dowód, że test naprawdę testuje migrations + mapper.

- [ ] **Step 9: Run `mvn compile` w `backend/`, naprawić wszystkie błędy MapStructa**

Run: `mvn -pl backend -am compile`
Expected: BUILD SUCCESS. Jeśli `ContactMapper` nie kompiluje (immutable domain) — zmień podejście: zrób `@Mapper` z explicit metodami i builderem:
```java
default ContactJpaEntity toEntity(ContactRequest d) {
    return ContactJpaEntity.builder().id(d.getId())
       .name(d.getName()).email(d.getEmail()).phone(d.getPhone())
       .company(d.getCompany()).subject(d.getSubject()).message(d.getMessage())
       .status(d.getStatus()).locale(d.getLocale())
       .ipAddress(d.getIpAddress()).userAgent(d.getUserAgent())
       .createdAt(d.getCreatedAt()).updatedAt(d.getUpdatedAt())
       .repliedAt(d.getRepliedAt()).repliedBy(d.getRepliedBy())
       .replyMessage(d.getReplyContent())
       .build();
}
default ContactRequest toDomain(ContactJpaEntity e) {
    return ContactRequest.builder().id(e.getId())
       .name(e.getName()).email(e.getEmail()).phone(e.getPhone())
       .company(e.getCompany()).subject(e.getSubject()).message(e.getMessage())
       .status(e.getStatus()).locale(e.getLocale())
       .ipAddress(e.getIpAddress()).userAgent(e.getUserAgent())
       .createdAt(e.getCreatedAt()).updatedAt(e.getUpdatedAt())
       .repliedAt(e.getRepliedAt()).repliedBy(e.getRepliedBy())
       .replyContent(e.getReplyMessage())
       .build();
}
```

- [ ] **Step 10: Run integration test ponownie — verify pass**

Run: `mvn -pl backend -am test -Dtest=ContactRepositoryIT`
Expected: PASS.

- [ ] **Step 11: Commit**

```bash
git add backend/src/main/java/com/itsolutions/domain/contact/port/out \
        backend/src/main/java/com/itsolutions/adapter/out/persistence/contact \
        backend/src/main/resources/db/migration/V3__add_contact_extras.sql \
        backend/src/test/java/com/itsolutions/adapter/out/persistence/contact
git commit -m "feat(backend): wire ContactRepository (JPA + Postgres + Testcontainers IT)"
```

---

### Task B2: Wire JPA persistence — Quote module

**Files:**
- Create: `backend/src/main/java/com/itsolutions/domain/quote/port/out/QuoteRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/quote/QuoteJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/quote/QuoteJpaRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/quote/QuoteMapper.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/quote/QuoteRepositoryAdapter.java`
- Test: `backend/src/test/java/com/itsolutions/adapter/out/persistence/quote/QuoteRepositoryIT.java`

- [ ] **Step 1: Stwórz port `QuoteRepository`** (analogicznie do ContactRepository, sygnatury z `domain.quote.port.in.GetQuotesUseCase`)

```java
package com.itsolutions.domain.quote.port.out;

import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuoteRepository {
    QuoteRequest save(QuoteRequest quote);
    Optional<QuoteRequest> findById(UUID id);
    Optional<QuoteRequest> findByReferenceNumber(String reference);
    List<QuoteRequest> findAll(QuoteStatus status, String search, int page, int size, String sortBy, String sortDirection);
    long count(QuoteStatus status, String search);
    String generateReferenceNumber();
}
```

- [ ] **Step 2: Stwórz `QuoteJpaEntity` (mapping na `quote_requests` table)** — kolumny zgodne z V1 migracją (reference_number, service, project_size, quoted_amount, etc.)

- [ ] **Step 3: Stwórz `QuoteJpaRepository` (Spring Data) z metodami `findByReferenceNumber`, `search`, `countSearch` analogicznie do ContactJpaRepository**

- [ ] **Step 4: Implementacja `generateReferenceNumber()` w adapterze: użyj `quote_reference_seq` przez native query**

```java
@Override
public String generateReferenceNumber() {
    Long n = jpa.nextReferenceSeqValue();
    return "Q-" + String.format("%06d", n);
}
```
W `QuoteJpaRepository`:
```java
@Query(value = "SELECT nextval('quote_reference_seq')", nativeQuery = true)
Long nextReferenceSeqValue();
```

- [ ] **Step 5: Mapper + adapter analogicznie do ContactRepositoryAdapter**

- [ ] **Step 6: Stwórz `QuoteRepositoryIT` analogiczny do `ContactRepositoryIT`** — test save + reference number unique.

- [ ] **Step 7: Run test, fix until green**

Run: `mvn -pl backend -am test -Dtest=QuoteRepositoryIT`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add backend/src/main/java/com/itsolutions/domain/quote/port/out \
        backend/src/main/java/com/itsolutions/adapter/out/persistence/quote \
        backend/src/test/java/com/itsolutions/adapter/out/persistence/quote
git commit -m "feat(backend): wire QuoteRepository with reference number sequence"
```

---

### Task B3: Wire JPA persistence — Lead module

**Files:**
- Create: `backend/src/main/java/com/itsolutions/domain/lead/port/out/LeadRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/lead/LeadJpaEntity.java`, `LeadNoteJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/lead/LeadJpaRepository.java`, `LeadNoteJpaRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/lead/LeadMapper.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/lead/LeadRepositoryAdapter.java`
- Test: `backend/src/test/java/com/itsolutions/adapter/out/persistence/lead/LeadRepositoryIT.java`

- [ ] **Step 1: Port `LeadRepository`** — sygnatury wynikają z `LeadApplicationService` (sprawdź jak go używa). Powinno być: `save(Lead)`, `findById`, `findAll(...)`, `count(...)`, `addNote(LeadNote)`.

- [ ] **Step 2: Entity `LeadJpaEntity` + `LeadNoteJpaEntity` (z relacją FK leadId)**

- [ ] **Step 3: Spring Data repos**

- [ ] **Step 4: Mapper + adapter**

- [ ] **Step 5: Test IT — save + addNote + findAll**

```java
@Test
void saves_lead_and_adds_note() {
    Lead lead = Lead.create("Anna", "anna@example.com", null, null, LeadSource.CONTACT, null);
    Lead saved = repository.save(lead);
    LeadNote note = LeadNote.create(saved.getId(), "Pierwszy kontakt", "admin@itsolutions.pl");
    repository.addNote(note);

    Lead loaded = repository.findById(saved.getId()).orElseThrow();
    assertThat(loaded.getNotes()).hasSize(1);
}
```

- [ ] **Step 6: Run, fix, pass**

- [ ] **Step 7: Commit**

```bash
git add backend/src/main/java/com/itsolutions/domain/lead \
        backend/src/main/java/com/itsolutions/adapter/out/persistence/lead \
        backend/src/test/java/com/itsolutions/adapter/out/persistence/lead
git commit -m "feat(backend): wire LeadRepository with notes association"
```

---

### Task B4: Wire JPA persistence — Chat module

**Files:**
- Create: `backend/src/main/java/com/itsolutions/domain/chat/port/out/ChatRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/chat/ChatSessionJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/chat/ChatMessageJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/chat/ChatJpaRepositories.java` (SessionJpa + MessageJpa Spring Data interfaces)
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/chat/ChatMapper.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/chat/ChatRepositoryAdapter.java`
- Test: `backend/src/test/java/com/itsolutions/adapter/out/persistence/chat/ChatRepositoryIT.java`

- [ ] **Step 1: Port `ChatRepository`**

Sygnatury wynikają z `ChatService` (czytaj `application/chat/ChatService.java`). Minimum:
```java
public interface ChatRepository {
    ChatSession saveSession(ChatSession session);
    Optional<ChatSession> findSessionById(UUID id);
    Optional<ChatSession> findSessionByVisitorId(String visitorId);
    ChatMessage saveMessage(ChatMessage message);
    List<ChatMessage> findMessagesBySession(UUID sessionId);
    List<ChatSession> findAllSessions(ChatSessionStatus status, int page, int size);
    long countSessions(ChatSessionStatus status);
}
```

- [ ] **Step 2-6: Entity + Spring Data + mapper + adapter + test (analogicznie do B1)**

- [ ] **Step 7: Commit**

```bash
git commit -am "feat(backend): wire ChatRepository (sessions + messages)"
```

---

### Task B5: Email module — port + SMTP adapter + template renderer

**Files:**
- Create: `backend/src/main/java/com/itsolutions/domain/email/port/out/EmailSender.java`
- Create: `backend/src/main/java/com/itsolutions/domain/email/port/out/EmailTemplateRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailTemplateJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailLogJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailTemplateJpaRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailLogJpaRepository.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/email/EmailTemplateRepositoryAdapter.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/email/EmailTemplateRenderer.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/email/SmtpEmailSender.java`
- Test: `backend/src/test/java/com/itsolutions/adapter/out/email/SmtpEmailSenderTest.java`

- [ ] **Step 1: Stwórz port `EmailSender`**

```java
package com.itsolutions.domain.email.port.out;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

public interface EmailSender {

    EmailResult send(EmailRequest request);

    EmailResult sendTemplate(String templateName, String to, String locale, Map<String, Object> variables);

    @Getter @Builder
    class EmailRequest {
        private final String to;
        private final String subject;
        private final String body;
        private final boolean html;
        private final String relatedEntityType;
        private final java.util.UUID relatedEntityId;
    }

    @Getter @Builder
    class EmailResult {
        private final boolean success;
        private final String providerMessageId;
        private final String errorMessage;
    }
}
```

- [ ] **Step 2: Port `EmailTemplateRepository`** — `Optional<EmailTemplate> findByName(String name)`.

- [ ] **Step 3: JPA entity + Spring Data dla `email_templates` i `email_logs`**

- [ ] **Step 4: Stwórz `EmailTemplateRenderer`** — prosty `{{var}}` replace:

```java
package com.itsolutions.adapter.out.email;

import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class EmailTemplateRenderer {
    private static final Pattern VAR = Pattern.compile("\\{\\{\\s*(\\w+)\\s*\\}\\}");

    public String render(String template, Map<String, Object> vars) {
        if (template == null) return "";
        Matcher m = VAR.matcher(template);
        StringBuilder out = new StringBuilder();
        while (m.find()) {
            Object v = vars.get(m.group(1));
            m.appendReplacement(out, Matcher.quoteReplacement(v != null ? v.toString() : ""));
        }
        m.appendTail(out);
        return out.toString();
    }
}
```

- [ ] **Step 5: Stwórz `SmtpEmailSender` (implementacja `EmailSender` via JavaMailSender + log do `email_logs`)**

```java
package com.itsolutions.adapter.out.email;

import com.itsolutions.adapter.out.persistence.email.EmailLogJpaEntity;
import com.itsolutions.adapter.out.persistence.email.EmailLogJpaRepository;
import com.itsolutions.domain.email.model.EmailLogStatus;
import com.itsolutions.domain.email.model.EmailTemplate;
import com.itsolutions.domain.email.port.out.EmailSender;
import com.itsolutions.domain.email.port.out.EmailTemplateRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;
    private final EmailTemplateRepository templateRepo;
    private final EmailTemplateRenderer renderer;
    private final EmailLogJpaRepository logRepo;

    @Value("${spring.mail.from:noreply@itsolutions.pl}")
    private String from;

    @Override
    public EmailResult send(EmailRequest request) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper h = new MimeMessageHelper(msg, true, "UTF-8");
            h.setFrom(from);
            h.setTo(request.getTo());
            h.setSubject(request.getSubject());
            h.setText(request.getBody(), request.isHtml());
            mailSender.send(msg);
            logSuccess(null, request.getTo(), request.getSubject(), request.getRelatedEntityType(), request.getRelatedEntityId());
            return EmailResult.builder().success(true).build();
        } catch (Exception e) {
            log.error("Email send failed: {}", e.getMessage(), e);
            logFailure(null, request.getTo(), request.getSubject(), e.getMessage());
            return EmailResult.builder().success(false).errorMessage(e.getMessage()).build();
        }
    }

    @Override
    public EmailResult sendTemplate(String templateName, String to, String locale, Map<String, Object> variables) {
        EmailTemplate tpl = templateRepo.findByName(templateName)
            .orElseThrow(() -> new IllegalArgumentException("Email template not found: " + templateName));
        String subject = "pl".equalsIgnoreCase(locale) ? tpl.getSubjectPl() : tpl.getSubjectEn();
        String body    = "pl".equalsIgnoreCase(locale) ? tpl.getBodyPl()    : tpl.getBodyEn();

        return send(EmailRequest.builder()
            .to(to)
            .subject(renderer.render(subject, variables))
            .body(renderer.render(body, variables))
            .html(true)
            .build());
    }

    private void logSuccess(UUID tplId, String to, String subject, String entityType, UUID entityId) {
        logRepo.save(EmailLogJpaEntity.builder()
            .id(UUID.randomUUID()).templateId(tplId).recipient(to).subject(subject)
            .status(EmailLogStatus.SENT).relatedEntityType(entityType).relatedEntityId(entityId)
            .createdAt(Instant.now()).build());
    }
    private void logFailure(UUID tplId, String to, String subject, String error) {
        logRepo.save(EmailLogJpaEntity.builder()
            .id(UUID.randomUUID()).templateId(tplId).recipient(to).subject(subject)
            .status(EmailLogStatus.FAILED).errorMessage(error)
            .createdAt(Instant.now()).build());
    }
}
```

- [ ] **Step 6: Stwórz test z GreenMail** (in-memory SMTP):

Dodaj do `backend/pom.xml` w sekcji `<dependencies>`:
```xml
<dependency>
    <groupId>com.icegreen</groupId>
    <artifactId>greenmail-junit5</artifactId>
    <version>2.0.1</version>
    <scope>test</scope>
</dependency>
```

Plik `backend/src/test/java/com/itsolutions/adapter/out/email/SmtpEmailSenderTest.java`:
```java
package com.itsolutions.adapter.out.email;

import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.util.ServerSetupTest;
import com.itsolutions.domain.email.port.out.EmailSender;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(properties = {
    "spring.mail.host=localhost",
    "spring.mail.port=3025",  // GreenMail SMTP
    "spring.flyway.enabled=true"
})
class SmtpEmailSenderTest {

    @RegisterExtension
    static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP)
        .withConfiguration(GreenMailConfiguration.aConfig().withUser("test", "test"));

    @Autowired EmailSender emailSender;

    @Test
    void sends_plain_email() throws Exception {
        var result = emailSender.send(EmailSender.EmailRequest.builder()
            .to("recipient@example.com")
            .subject("Test")
            .body("<p>Hi</p>")
            .html(true)
            .build());

        assertThat(result.isSuccess()).isTrue();
        var msgs = greenMail.getReceivedMessages();
        assertThat(msgs).hasSize(1);
        assertThat(msgs[0].getSubject()).isEqualTo("Test");
    }
}
```

- [ ] **Step 7: Run test — verify pass**

Run: `mvn -pl backend -am test -Dtest=SmtpEmailSenderTest`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add backend/pom.xml \
        backend/src/main/java/com/itsolutions/domain/email \
        backend/src/main/java/com/itsolutions/adapter/out/persistence/email \
        backend/src/main/java/com/itsolutions/adapter/out/email \
        backend/src/test/java/com/itsolutions/adapter/out/email
git commit -m "feat(backend): SMTP email sender + template renderer + logs"
```

---

### Task B6: LLM gateway — Ollama + Gemini adapters with primary/fallback chain

**Files:**
- Create: `backend/src/main/java/com/itsolutions/domain/chat/port/out/LlmGateway.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/llm/OllamaLlmGateway.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/llm/GeminiLlmGateway.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/llm/ChainedLlmGateway.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/llm/LlmGatewayConfig.java`
- Modify: `backend/src/main/resources/application.yml` (add `llm.primary`/`llm.fallback`)
- Test: `backend/src/test/java/com/itsolutions/adapter/out/llm/OllamaLlmGatewayTest.java` (z WireMockiem)
- Test: `backend/src/test/java/com/itsolutions/adapter/out/llm/GeminiLlmGatewayTest.java`
- Test: `backend/src/test/java/com/itsolutions/adapter/out/llm/ChainedLlmGatewayTest.java`

**Design — primary + fallback chain:**

User chce mieć obie opcje działające jednocześnie i sterowanie konfiguracją:
- `llm.primary=gemini` + `llm.fallback=ollama` → próbuje Gemini; gdy `QUOTA_EXCEEDED`/HTTP 429 → fallback na Ollama
- `llm.primary=ollama` + `llm.fallback=` (puste) → tylko Ollama, żadnego fallbacku
- `llm.primary=gemini` + `llm.fallback=` → tylko Gemini, błąd surowy

Oba beany (`OllamaLlmGateway`, `GeminiLlmGateway`) są **zawsze** zarejestrowane (`@Component` bez `@ConditionalOnProperty`) — tylko `ChainedLlmGateway` wybiera kolejność na podstawie configu. Dzięki temu można w runtime przełączyć providera przez restart aplikacji ze zmianą env var, bez rebuildu.

`ChainedLlmGateway` rozpoznaje "wyczerpany limit / quota" jako sygnał do fallbacku przez specjalny error type w `LlmResponse` (`errorType = QUOTA_EXCEEDED` / `RATE_LIMITED` / `TRANSIENT` / `FATAL`). Fallback przeskakuje TYLKO na `QUOTA_EXCEEDED` i `RATE_LIMITED` (czyli "limit", nie "API padło"). Inne błędy zwraca surowo.

- [ ] **Step 1: Stwórz port `LlmGateway` z error type enum**

Plik `backend/src/main/java/com/itsolutions/domain/chat/port/out/LlmGateway.java`:
```java
package com.itsolutions.domain.chat.port.out;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

public interface LlmGateway {

    LlmResponse chat(LlmRequest request);

    /** Identifier used by the chain to know which provider answered. */
    String providerName();

    @Getter @Builder
    class LlmRequest {
        private final String systemPrompt;
        private final List<Message> messages;
        private final String locale;
        private final String model;
        private final Double temperature;
        private final Integer maxTokens;
        public record Message(String role, String content) {}
    }

    @Getter @Builder
    class LlmResponse {
        private final boolean success;
        private final String content;
        private final Integer tokensUsed;
        private final Long responseTimeMs;
        private final String errorMessage;
        private final ErrorType errorType;
        private final String providerName;
    }

    enum ErrorType {
        /** Provider returned out-of-quota / billing exhausted (Gemini 429 RESOURCE_EXHAUSTED, Ollama N/A). */
        QUOTA_EXCEEDED,
        /** Provider rate-limited request (HTTP 429 without quota signal). */
        RATE_LIMITED,
        /** Network blip, 5xx, timeout — retry-able / fallback-able. */
        TRANSIENT,
        /** Bad request, schema error, auth — should not fallback. */
        FATAL
    }
}
```

- [ ] **Step 2: Stwórz `OllamaLlmGateway`** (zarejestrowany ZAWSZE — bez `@ConditionalOnProperty`):

Plik `backend/src/main/java/com/itsolutions/adapter/out/llm/OllamaLlmGateway.java`:
```java
package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component("ollamaLlmGateway")
@Slf4j
public class OllamaLlmGateway implements LlmGateway {

    @Value("${llm.ollama.url:http://localhost:11434}") private String url;
    @Value("${llm.ollama.model:llama3.2}")             private String defaultModel;
    @Value("${llm.ollama.api-key:}")                    private String apiKey;

    @Override public String providerName() { return "ollama"; }

    @Override
    public LlmResponse chat(LlmRequest request) {
        long t0 = System.currentTimeMillis();
        try {
            List<Map<String, String>> msgs = new ArrayList<>();
            if (request.getSystemPrompt() != null && !request.getSystemPrompt().isBlank()) {
                msgs.add(Map.of("role", "system", "content", request.getSystemPrompt()));
            }
            for (var m : request.getMessages()) {
                msgs.add(Map.of("role", m.role(), "content", m.content()));
            }
            Map<String, Object> body = new HashMap<>();
            body.put("model", request.getModel() != null ? request.getModel() : defaultModel);
            body.put("messages", msgs);
            body.put("stream", false);
            body.put("options", Map.of(
                "temperature", request.getTemperature() != null ? request.getTemperature() : 0.5,
                "num_predict", request.getMaxTokens() != null ? request.getMaxTokens() : 500
            ));

            var spec = RestClient.create().post().uri(url + "/api/chat").body(body);
            if (apiKey != null && !apiKey.isBlank()) spec.header("Authorization", "Bearer " + apiKey);

            Map<?, ?> resp = spec.retrieve().body(Map.class);
            String content = "";
            if (resp != null && resp.get("message") instanceof Map<?, ?> mm) {
                content = String.valueOf(mm.get("content"));
            }
            return LlmResponse.builder()
                .success(true).content(content)
                .responseTimeMs(System.currentTimeMillis() - t0)
                .providerName(providerName())
                .build();
        } catch (HttpClientErrorException.TooManyRequests e) {
            return error(t0, ErrorType.RATE_LIMITED, e.getMessage());
        } catch (HttpClientErrorException e) {
            return error(t0, ErrorType.FATAL, "Ollama 4xx: " + e.getStatusCode() + " " + e.getMessage());
        } catch (HttpServerErrorException | ResourceAccessException e) {
            return error(t0, ErrorType.TRANSIENT, "Ollama transient: " + e.getMessage());
        } catch (Exception e) {
            log.error("Ollama unexpected error: {}", e.getMessage(), e);
            return error(t0, ErrorType.TRANSIENT, e.getMessage());
        }
    }

    private LlmResponse error(long t0, ErrorType type, String msg) {
        return LlmResponse.builder()
            .success(false).errorType(type).errorMessage(msg)
            .responseTimeMs(System.currentTimeMillis() - t0)
            .providerName(providerName())
            .build();
    }
}
```

- [ ] **Step 3: Stwórz `GeminiLlmGateway`** — z mapowaniem quoty na `QUOTA_EXCEEDED`:

Plik `backend/src/main/java/com/itsolutions/adapter/out/llm/GeminiLlmGateway.java`:
```java
package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component("geminiLlmGateway")
@Slf4j
public class GeminiLlmGateway implements LlmGateway {

    private static final String BASE = "https://generativelanguage.googleapis.com/v1beta/models";

    @Value("${llm.gemini.api-key:}") private String apiKey;
    @Value("${llm.gemini.model:gemini-1.5-flash}") private String defaultModel;

    @Override public String providerName() { return "gemini"; }

    @Override
    public LlmResponse chat(LlmRequest request) {
        long t0 = System.currentTimeMillis();
        if (apiKey == null || apiKey.isBlank()) {
            return error(t0, ErrorType.FATAL, "GEMINI_API_KEY not configured");
        }
        try {
            String model = request.getModel() != null ? request.getModel() : defaultModel;

            List<Map<String, Object>> contents = new ArrayList<>();
            for (var m : request.getMessages()) {
                contents.add(Map.of(
                    "role", "assistant".equals(m.role()) ? "model" : "user",
                    "parts", List.of(Map.of("text", m.content()))
                ));
            }
            Map<String, Object> body = new java.util.HashMap<>();
            if (request.getSystemPrompt() != null && !request.getSystemPrompt().isBlank()) {
                body.put("systemInstruction", Map.of("parts", List.of(Map.of("text", request.getSystemPrompt()))));
            }
            body.put("contents", contents);
            body.put("generationConfig", Map.of(
                "temperature", request.getTemperature() != null ? request.getTemperature() : 0.3,
                "maxOutputTokens", request.getMaxTokens() != null ? request.getMaxTokens() : 500
            ));

            Map<?,?> resp = RestClient.create()
                .post()
                .uri(BASE + "/" + model + ":generateContent?key={k}", apiKey)
                .body(body)
                .retrieve()
                .body(Map.class);

            String content = extractText(resp);
            return LlmResponse.builder()
                .success(true).content(content)
                .responseTimeMs(System.currentTimeMillis() - t0)
                .providerName(providerName())
                .build();
        } catch (HttpClientErrorException.TooManyRequests e) {
            // Gemini uses 429 RESOURCE_EXHAUSTED for both per-minute rate limit AND daily/monthly quota.
            // Body usually contains "RESOURCE_EXHAUSTED" + reason. Treat any 429 as quota exhausted
            // for fallback purposes (over-eager fallback is fine; under-eager strands users).
            return error(t0, ErrorType.QUOTA_EXCEEDED, "Gemini quota: " + e.getResponseBodyAsString());
        } catch (HttpClientErrorException e) {
            HttpStatusCode sc = e.getStatusCode();
            if (sc.value() == 401 || sc.value() == 403) {
                return error(t0, ErrorType.FATAL, "Gemini auth/permission: " + e.getResponseBodyAsString());
            }
            return error(t0, ErrorType.FATAL, "Gemini 4xx: " + sc + " " + e.getResponseBodyAsString());
        } catch (HttpServerErrorException | ResourceAccessException e) {
            return error(t0, ErrorType.TRANSIENT, "Gemini transient: " + e.getMessage());
        } catch (Exception e) {
            log.error("Gemini unexpected error: {}", e.getMessage(), e);
            return error(t0, ErrorType.TRANSIENT, e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map<?,?> resp) {
        if (resp == null) return "";
        Object cand = resp.get("candidates");
        if (cand instanceof List<?> list && !list.isEmpty() && list.get(0) instanceof Map<?,?> c0) {
            Object content = c0.get("content");
            if (content instanceof Map<?,?> ct && ct.get("parts") instanceof List<?> parts && !parts.isEmpty()) {
                Object p0 = parts.get(0);
                if (p0 instanceof Map<?,?> pp && pp.get("text") != null) return String.valueOf(pp.get("text"));
            }
        }
        return "";
    }

    private LlmResponse error(long t0, ErrorType type, String msg) {
        return LlmResponse.builder()
            .success(false).errorType(type).errorMessage(msg)
            .responseTimeMs(System.currentTimeMillis() - t0)
            .providerName(providerName())
            .build();
    }
}
```

- [ ] **Step 4: Stwórz `ChainedLlmGateway` + `LlmGatewayConfig`**

Plik `backend/src/main/java/com/itsolutions/adapter/out/llm/ChainedLlmGateway.java`:
```java
package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.EnumSet;
import java.util.Set;

/**
 * LlmGateway that tries `primary`, falls back to `fallback` on quota/rate-limit errors.
 * Used as the @Primary bean injected into ChatService.
 */
@Slf4j
@RequiredArgsConstructor
public class ChainedLlmGateway implements LlmGateway {

    private static final Set<ErrorType> FALLBACK_TRIGGERS =
        EnumSet.of(ErrorType.QUOTA_EXCEEDED, ErrorType.RATE_LIMITED);

    private final LlmGateway primary;
    private final LlmGateway fallback;   // may be null

    @Override public String providerName() {
        return fallback == null
            ? primary.providerName()
            : primary.providerName() + "→" + fallback.providerName();
    }

    @Override
    public LlmResponse chat(LlmRequest request) {
        LlmResponse r = primary.chat(request);
        if (r.isSuccess()) return r;

        if (fallback != null && r.getErrorType() != null && FALLBACK_TRIGGERS.contains(r.getErrorType())) {
            log.warn("LLM primary={} returned {} (\"{}\") — falling back to {}",
                primary.providerName(), r.getErrorType(), r.getErrorMessage(), fallback.providerName());
            LlmResponse f = fallback.chat(request);
            if (!f.isSuccess()) {
                log.error("LLM fallback={} also failed: {} (\"{}\")",
                    fallback.providerName(), f.getErrorType(), f.getErrorMessage());
            }
            return f;
        }
        return r;
    }
}
```

Plik `backend/src/main/java/com/itsolutions/adapter/out/llm/LlmGatewayConfig.java`:
```java
package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.Locale;
import java.util.Map;

@Configuration
@Slf4j
public class LlmGatewayConfig {

    @Bean
    @Primary
    public LlmGateway llmGateway(
            @Qualifier("ollamaLlmGateway") LlmGateway ollama,
            @Qualifier("geminiLlmGateway") LlmGateway gemini,
            @Value("${llm.primary:ollama}")  String primary,
            @Value("${llm.fallback:}")       String fallback
    ) {
        Map<String, LlmGateway> beans = Map.of("ollama", ollama, "gemini", gemini);

        LlmGateway p = beans.get(primary.toLowerCase(Locale.ROOT));
        if (p == null) throw new IllegalStateException(
            "Unknown llm.primary=" + primary + " (allowed: ollama, gemini)");

        LlmGateway f = (fallback == null || fallback.isBlank())
            ? null
            : beans.get(fallback.toLowerCase(Locale.ROOT));
        if (fallback != null && !fallback.isBlank() && f == null) {
            throw new IllegalStateException(
                "Unknown llm.fallback=" + fallback + " (allowed: ollama, gemini, or empty)");
        }
        if (f == p) {
            log.warn("llm.fallback equals llm.primary ({}). Ignoring fallback.", primary);
            f = null;
        }

        log.info("LLM chain: primary={} fallback={}", p.providerName(), f != null ? f.providerName() : "<none>");
        return new ChainedLlmGateway(p, f);
    }
}
```

- [ ] **Step 5: Modify `application.yml` — wymień stary `llm.provider` na `llm.primary` + `llm.fallback`**

Zmień sekcję `llm:`:
```yaml
llm:
  primary:  ${LLM_PRIMARY:ollama}    # ollama | gemini
  fallback: ${LLM_FALLBACK:}         # ollama | gemini | <empty> (no fallback)
  ollama:
    url: ${OLLAMA_URL:http://localhost:11434}
    model: ${OLLAMA_MODEL:llama3.2}
    api-key: ${OLLAMA_API_KEY:}
  gemini:
    api-key: ${GEMINI_API_KEY:}
    model: ${GEMINI_MODEL:gemini-1.5-flash}
```

> **Backward compat:** stara zmienna `LLM_PROVIDER` z compose'a zostaje zignorowana (nikt jej już nie czyta po refactorze). Compose'y z Task C4/C5 i `.env.example` używają `LLM_PRIMARY`/`LLM_FALLBACK`.

- [ ] **Step 6: Dodaj WireMock do `backend/pom.xml`**

```xml
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock-standalone</artifactId>
    <version>3.10.0</version>
    <scope>test</scope>
</dependency>
```

- [ ] **Step 7: Test `OllamaLlmGatewayTest` — happy path + 5xx → TRANSIENT**

Plik `backend/src/test/java/com/itsolutions/adapter/out/llm/OllamaLlmGatewayTest.java`:
```java
package com.itsolutions.adapter.out.llm;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.itsolutions.domain.chat.port.out.LlmGateway;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;
import static org.assertj.core.api.Assertions.assertThat;

class OllamaLlmGatewayTest {

    WireMockServer server;
    OllamaLlmGateway gateway;

    @BeforeEach void setUp() {
        server = new WireMockServer(options().dynamicPort());
        server.start();
        gateway = new OllamaLlmGateway();
        ReflectionTestUtils.setField(gateway, "url", server.baseUrl());
        ReflectionTestUtils.setField(gateway, "defaultModel", "llama3.2");
        ReflectionTestUtils.setField(gateway, "apiKey", "");
    }
    @AfterEach void tearDown() { server.stop(); }

    @Test
    void returns_content_on_happy_path() {
        server.stubFor(post(urlEqualTo("/api/chat"))
            .willReturn(aResponse().withHeader("Content-Type","application/json")
                .withBody("""
                  {"model":"llama3.2","message":{"role":"assistant","content":"hello world"},"done":true}
                """)));

        var resp = gateway.chat(LlmGateway.LlmRequest.builder()
            .systemPrompt("sys")
            .messages(List.of(new LlmGateway.LlmRequest.Message("user","hi")))
            .build());

        assertThat(resp.isSuccess()).isTrue();
        assertThat(resp.getContent()).isEqualTo("hello world");
        assertThat(resp.getProviderName()).isEqualTo("ollama");
    }

    @Test
    void maps_5xx_to_transient() {
        server.stubFor(post(urlEqualTo("/api/chat"))
            .willReturn(aResponse().withStatus(503)));

        var resp = gateway.chat(LlmGateway.LlmRequest.builder()
            .messages(List.of(new LlmGateway.LlmRequest.Message("user","hi"))).build());

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.TRANSIENT);
    }

    @Test
    void maps_429_to_rate_limited() {
        server.stubFor(post(urlEqualTo("/api/chat"))
            .willReturn(aResponse().withStatus(429)));

        var resp = gateway.chat(LlmGateway.LlmRequest.builder()
            .messages(List.of(new LlmGateway.LlmRequest.Message("user","hi"))).build());

        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.RATE_LIMITED);
    }
}
```

- [ ] **Step 8: Test `GeminiLlmGatewayTest` — happy path + 429 → QUOTA_EXCEEDED + 401 → FATAL**

Plik `backend/src/test/java/com/itsolutions/adapter/out/llm/GeminiLlmGatewayTest.java`:
```java
package com.itsolutions.adapter.out.llm;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.itsolutions.domain.chat.port.out.LlmGateway;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;
import static org.assertj.core.api.Assertions.assertThat;

class GeminiLlmGatewayTest {

    WireMockServer server;
    GeminiLlmGateway gateway;

    @BeforeEach void setUp() {
        server = new WireMockServer(options().dynamicPort());
        server.start();
        gateway = new GeminiLlmGateway();
        // Monkey-patch the gateway BASE via reflection — alternatively use a `baseUrl` field
        // and inject; for simplicity we change BASE via property in source if needed,
        // OR use WireMock as a forward proxy. Simplest fix: add `@Value("${llm.gemini.base-url:...}")`
        // field `baseUrl` to gateway and set it here.
        ReflectionTestUtils.setField(gateway, "baseUrl", server.baseUrl() + "/v1beta/models");
        ReflectionTestUtils.setField(gateway, "apiKey", "fake-key");
        ReflectionTestUtils.setField(gateway, "defaultModel", "gemini-1.5-flash");
    }
    @AfterEach void tearDown() { server.stop(); }

    @Test
    void returns_content_on_happy_path() {
        server.stubFor(post(urlPathMatching("/v1beta/models/.*:generateContent"))
            .willReturn(aResponse().withHeader("Content-Type","application/json")
                .withBody("""
                  {"candidates":[{"content":{"parts":[{"text":"hi from gemini"}]}}]}
                """)));

        var resp = gateway.chat(LlmGateway.LlmRequest.builder()
            .messages(List.of(new LlmGateway.LlmRequest.Message("user","hi"))).build());

        assertThat(resp.isSuccess()).isTrue();
        assertThat(resp.getContent()).isEqualTo("hi from gemini");
    }

    @Test
    void maps_429_to_quota_exceeded() {
        server.stubFor(post(urlPathMatching("/v1beta/models/.*:generateContent"))
            .willReturn(aResponse().withStatus(429)
                .withBody("{\"error\":{\"code\":429,\"status\":\"RESOURCE_EXHAUSTED\"}}")));

        var resp = gateway.chat(LlmGateway.LlmRequest.builder()
            .messages(List.of(new LlmGateway.LlmRequest.Message("user","hi"))).build());

        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.QUOTA_EXCEEDED);
    }

    @Test
    void maps_401_to_fatal() {
        server.stubFor(post(urlPathMatching("/v1beta/models/.*:generateContent"))
            .willReturn(aResponse().withStatus(401)));

        var resp = gateway.chat(LlmGateway.LlmRequest.builder()
            .messages(List.of(new LlmGateway.LlmRequest.Message("user","hi"))).build());

        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.FATAL);
    }
}
```

> **Note:** żeby test mógł podmienić Gemini URL, w `GeminiLlmGateway` zmień `private static final String BASE = ...` na `@Value("${llm.gemini.base-url:https://generativelanguage.googleapis.com/v1beta/models}") private String baseUrl;` i użyj `baseUrl` zamiast `BASE` w metodzie `chat`.

- [ ] **Step 9: Test `ChainedLlmGatewayTest` — verify fallback semantics**

Plik `backend/src/test/java/com/itsolutions/adapter/out/llm/ChainedLlmGatewayTest.java`:
```java
package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import com.itsolutions.domain.chat.port.out.LlmGateway.ErrorType;
import com.itsolutions.domain.chat.port.out.LlmGateway.LlmRequest;
import com.itsolutions.domain.chat.port.out.LlmGateway.LlmResponse;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

class ChainedLlmGatewayTest {

    LlmRequest req() {
        return LlmRequest.builder().messages(List.of(new LlmRequest.Message("user","hi"))).build();
    }

    @Test
    void returns_primary_on_success_no_fallback_call() {
        AtomicInteger fallbackCalls = new AtomicInteger();
        var primary  = stub("p", true,  null,             "ok");
        var fallback = countingStub(fallbackCalls);

        var chain = new ChainedLlmGateway(primary, fallback);
        var r = chain.chat(req());

        assertThat(r.isSuccess()).isTrue();
        assertThat(r.getContent()).isEqualTo("ok");
        assertThat(fallbackCalls.get()).isZero();
    }

    @Test
    void falls_back_on_quota_exceeded() {
        var primary  = stub("p", false, ErrorType.QUOTA_EXCEEDED, null);
        var fallback = stub("f", true,  null,                     "from-fb");

        var r = new ChainedLlmGateway(primary, fallback).chat(req());

        assertThat(r.isSuccess()).isTrue();
        assertThat(r.getContent()).isEqualTo("from-fb");
    }

    @Test
    void falls_back_on_rate_limited() {
        var primary  = stub("p", false, ErrorType.RATE_LIMITED, null);
        var fallback = stub("f", true,  null,                   "from-fb");

        assertThat(new ChainedLlmGateway(primary, fallback).chat(req()).getContent()).isEqualTo("from-fb");
    }

    @Test
    void does_not_fallback_on_fatal() {
        AtomicInteger fallbackCalls = new AtomicInteger();
        var primary  = stub("p", false, ErrorType.FATAL, null);
        var fallback = countingStub(fallbackCalls);

        var r = new ChainedLlmGateway(primary, fallback).chat(req());

        assertThat(r.isSuccess()).isFalse();
        assertThat(r.getErrorType()).isEqualTo(ErrorType.FATAL);
        assertThat(fallbackCalls.get()).isZero();
    }

    @Test
    void does_not_fallback_on_transient() {
        AtomicInteger fallbackCalls = new AtomicInteger();
        var primary  = stub("p", false, ErrorType.TRANSIENT, null);
        var fallback = countingStub(fallbackCalls);

        new ChainedLlmGateway(primary, fallback).chat(req());

        assertThat(fallbackCalls.get()).isZero();
    }

    @Test
    void no_fallback_returns_primary_error_directly() {
        var primary = stub("p", false, ErrorType.QUOTA_EXCEEDED, null);

        var r = new ChainedLlmGateway(primary, null).chat(req());

        assertThat(r.isSuccess()).isFalse();
        assertThat(r.getErrorType()).isEqualTo(ErrorType.QUOTA_EXCEEDED);
    }

    // ---- test stubs ----
    private static LlmGateway stub(String name, boolean ok, ErrorType err, String content) {
        return new LlmGateway() {
            public String providerName() { return name; }
            public LlmResponse chat(LlmRequest r) {
                return LlmResponse.builder()
                    .success(ok).content(content).errorType(err).providerName(name).build();
            }
        };
    }

    private static LlmGateway countingStub(AtomicInteger calls) {
        return new LlmGateway() {
            public String providerName() { return "f"; }
            public LlmResponse chat(LlmRequest r) {
                calls.incrementAndGet();
                return LlmResponse.builder().success(true).content("fb").providerName("f").build();
            }
        };
    }
}
```

- [ ] **Step 10: Run all 3 LLM tests**

Run: `mvn -pl backend -am test -Dtest='OllamaLlmGatewayTest,GeminiLlmGatewayTest,ChainedLlmGatewayTest'`
Expected: ALL PASS.

- [ ] **Step 11: Sprawdź że `ChatService` (już istniejący) dostaje `@Primary` LlmGateway (`ChainedLlmGateway`) bez modyfikacji**

W `ChatService.java` jest `private final LlmGateway llmGateway;` — Spring wstrzyknie bean `@Primary` z `LlmGatewayConfig`. Zweryfikuj uruchomieniem `mvn -pl backend -am test` (cały moduł) — kontekst Springa nie powinien się sypać przez ambiguity.

- [ ] **Step 12: Commit**

```bash
git add backend/pom.xml \
        backend/src/main/java/com/itsolutions/domain/chat/port/out/LlmGateway.java \
        backend/src/main/java/com/itsolutions/adapter/out/llm \
        backend/src/main/resources/application.yml \
        backend/src/test/java/com/itsolutions/adapter/out/llm
git commit -m "feat(backend): LLM gateway chain (primary + fallback on quota/rate-limit)"
```

---

### Task B7: Auth — login endpoint + JWT issuance

**Files:**
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/admin/AdminUserJpaEntity.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/out/persistence/admin/AdminUserJpaRepository.java`
- Create: `backend/src/main/java/com/itsolutions/infrastructure/security/AuthApplicationService.java`
- Create: `backend/src/main/java/com/itsolutions/adapter/in/web/auth/AuthController.java`
- Modify: `backend/src/main/java/com/itsolutions/infrastructure/security/AdminUserDetailsService.java` (jeśli niepełny)
- Test: `backend/src/test/java/com/itsolutions/adapter/in/web/auth/AuthControllerIT.java`

- [ ] **Step 1: Stwórz JPA entity + repo dla `admin_users`**

- [ ] **Step 2: Sprawdź / dokończ `AdminUserDetailsService`** — `loadUserByUsername(email)` → wczytuje z `AdminUserJpaRepository`, mapuje role → `GrantedAuthority`.

- [ ] **Step 3: Stwórz `AuthApplicationService`** z metodami `login(email, password)` (zwraca access+refresh tokens), `refresh(refreshToken)`, `me(token)`.

- [ ] **Step 4: Stwórz `AuthController`** zgodnie z `api/paths/auth.yaml`:

```java
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthApplicationService authService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest req) { ... }

    @PostMapping("/refresh")
    public TokenResponse refresh(@RequestBody RefreshRequest req) { ... }

    @GetMapping("/me")
    public AdminUserDto me(Principal principal) { ... }

    record LoginRequest(@NotBlank String email, @NotBlank String password) {}
    record LoginResponse(String accessToken, String refreshToken, AdminUserDto user) {}
    record RefreshRequest(@NotBlank String refreshToken) {}
    record TokenResponse(String accessToken, String refreshToken) {}
    record AdminUserDto(UUID id, String email, String name, String role) {}
}
```

- [ ] **Step 5: Hash hasła seed-admina musi być prawidłowy**. Zweryfikuj: BCrypt hash w `V2__seed_data.sql` dla `admin123`. Jeśli pass `admin123` nie zgadza się z hashem — zaktualizuj seed:

Run lokalnie:
```java
new BCryptPasswordEncoder().encode("admin123")
```

Wstaw nowy hash do `V2__seed_data.sql` (lub do nowej `V4__fix_admin_password.sql` aby nie modyfikować istniejącej migracji jeśli już została zapuszczona).

- [ ] **Step 6: Test IT — login happy + 401**

```java
@Test
void login_returns_token_for_valid_credentials() throws Exception {
    mvc.perform(post("/api/v1/auth/login")
            .contentType(APPLICATION_JSON)
            .content("""
                {"email":"admin@itsolutions.pl","password":"admin123"}
                """))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").exists());
}

@Test
void login_returns_401_for_invalid_credentials() throws Exception {
    mvc.perform(post("/api/v1/auth/login")
            .contentType(APPLICATION_JSON)
            .content("""
                {"email":"admin@itsolutions.pl","password":"wrong"}
                """))
        .andExpect(status().isUnauthorized());
}
```

- [ ] **Step 7: Run test, fix, pass**

- [ ] **Step 8: Commit**

```bash
git commit -am "feat(backend): admin auth — login/refresh/me + JWT issuance + IT"
```

---

### Task B8: Public Lead endpoint + service wiring

**Files:**
- Create: `backend/src/main/java/com/itsolutions/adapter/in/web/lead/LeadController.java`
- Modify: `backend/src/main/java/com/itsolutions/application/lead/LeadApplicationService.java` (jeśli niekompletny — sprawdź `CreateLeadUseCase` interface i upewnij się, że metoda `execute(CreateLeadCommand)` istnieje)
- Test: `backend/src/test/java/com/itsolutions/adapter/in/web/lead/LeadControllerIT.java`

- [ ] **Step 1: Stwórz `LeadController` (POST /api/v1/leads)** — analogiczny do `ContactController`, walidacja, IP capture, source z body.

- [ ] **Step 2: Test IT — POST happy + walidacja email**

- [ ] **Step 3: Run, pass, commit**

```bash
git commit -am "feat(backend): public lead intake endpoint"
```

---

### Task B9: Spot-check — ContactController submit zachodzi end-to-end (z bazą + emailem)

**Files:**
- Create: `backend/src/test/java/com/itsolutions/adapter/in/web/contact/ContactControllerIT.java`

- [ ] **Step 1: Test integracyjny** — pełen flow: POST → DB save → admin email do GreenMail + user confirm email do GreenMail. To jest najważniejszy "smoke test" całej Phase B.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureMockMvc
class ContactControllerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @RegisterExtension
    static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP);

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
        r.add("spring.mail.host", () -> "localhost");
        r.add("spring.mail.port", () -> 3025);
        r.add("turnstile.secret-key", () -> "1x0000000000000000000000000000000AA");
    }

    @Autowired MockMvc mvc;

    @Test
    void submit_brief_persists_and_emails() throws Exception {
        mvc.perform(post("/api/v1/contact")
                .contentType(APPLICATION_JSON)
                .header("Accept-Language", "pl")
                .content("""
                  {"name":"Anna","email":"anna@example.com","message":"Potrzebuję strony","subject":"Brief"}
                """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.contactId").exists());

        // 2 emails: admin notification + user confirmation
        await().atMost(5, SECONDS).untilAsserted(() ->
            assertThat(greenMail.getReceivedMessages()).hasSize(2)
        );
    }
}
```

- [ ] **Step 2: Run, pass, commit**

```bash
git commit -am "test(backend): end-to-end contact submission IT"
```

---

### Task B10: Profile prod + CORS + actuator hardening

**Files:**
- Create: `backend/src/main/resources/application-prod.yml`
- Modify: `backend/src/main/java/com/itsolutions/infrastructure/config/SecurityConfig.java`
- Modify: `backend/src/main/java/com/itsolutions/infrastructure/config/CorsConfig.java`
- Modify: `backend/src/main/resources/application.yml`

- [ ] **Step 1: Stwórz `application-prod.yml`**

```yaml
spring:
  jpa:
    show-sql: false
  mail:
    host: ${SMTP_HOST}
    port: ${SMTP_PORT:587}

logging:
  level:
    root: WARN
    com.itsolutions: INFO
    org.springframework.security: WARN
    org.hibernate.SQL: WARN
    org.hibernate.type.descriptor.sql.BasicBinder: WARN

springdoc:
  swagger-ui:
    enabled: false   # disable Swagger UI in prod
```

- [ ] **Step 2: Modify `SecurityConfig.java` — actuator hardening**

Zmień:
```java
.requestMatchers("/actuator/**").permitAll()
```
na:
```java
.requestMatchers("/actuator/health", "/actuator/info").permitAll()
.requestMatchers("/actuator/**").authenticated()
.requestMatchers("/api/v1/auth/login", "/api/v1/auth/refresh").permitAll()
```

- [ ] **Step 3: Modify `application.yml` — dodaj `app.*` konfiguracje**

```yaml
app:
  admin:
    email: ${ADMIN_EMAIL:admin@itsolutions.pl}
    url:   ${ADMIN_URL:http://localhost:5173}
  public:
    url:   ${PUBLIC_URL:http://localhost:3000}

management:
  endpoint:
    health:
      show-details: never
  endpoints:
    web:
      exposure:
        include: health,info
```

- [ ] **Step 4: Modify CorsConfig** — origins z env (już jest, ale upewnij się że dla prod default to pusty string, nie wildcard)

- [ ] **Step 5: Run pełen `mvn test` lokalnie żeby upewnić się, że nic nie pęka**

Run: `mvn -pl backend -am test`
Expected: ALL PASS.

- [ ] **Step 6: Commit**

```bash
git commit -am "feat(backend): prod profile + actuator hardening + app.* config"
```

---

## Phase A — Frontend → Backend wiring

### Task A1: Stwórz API client + types

**Files:**
- Create: `lib/api/client.ts`
- Create: `lib/api/contact.ts`
- Create: `lib/api/chat.ts`
- Create: `lib/api/lead.ts`
- Create: `tests/api/api-client.spec.ts`

- [ ] **Step 1: Stwórz `lib/api/client.ts`** — wrapper na `fetch` z baseURL z env i errorami:

```ts
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message);
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text();
  let body: unknown = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    throw new ApiError(res.status, (body as { error?: string })?.error ?? `HTTP ${res.status}`, body);
  }
  return body as T;
}
```

- [ ] **Step 2: Stwórz `lib/api/contact.ts`** — typowany helper dla BriefForm:

```ts
import { apiFetch } from "./client";

export interface BriefSubmitPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
  turnstileToken?: string;
  // BriefForm-specific extras (mapowane na backendzie do quote_payload jsonb i quote_total)
  quotePayload?: {
    input: unknown;
    total: number;
    supportYearly: number;
    timestamp: number;
  };
  timelineNote?: string;
}

export interface BriefSubmitResult {
  contactId: string;
  emailSent: boolean;
}

export async function submitBrief(payload: BriefSubmitPayload, locale: "pl" | "en"): Promise<BriefSubmitResult> {
  return apiFetch<BriefSubmitResult>("/api/v1/contact", {
    method: "POST",
    headers: { "Accept-Language": locale },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      subject: payload.subject ?? buildSubject(payload),
      message: buildMessage(payload),
      turnstileToken: payload.turnstileToken,
    }),
  });
}

function buildSubject(p: BriefSubmitPayload): string {
  const total = p.quotePayload?.total;
  return total ? `Brief — szacunkowa wycena ${total.toLocaleString("pl-PL")} PLN` : "Brief — formularz kontaktowy";
}

function buildMessage(p: BriefSubmitPayload): string {
  let msg = p.message;
  if (p.timelineNote) msg += `\n\nTermin / uwagi: ${p.timelineNote}`;
  if (p.quotePayload) {
    msg += `\n\n--- Konfiguracja kalkulatora ---\n${JSON.stringify(p.quotePayload.input, null, 2)}`;
    msg += `\nSzacunkowa cena: ${p.quotePayload.total} PLN`;
    msg += `\nWsparcie roczne: ${p.quotePayload.supportYearly} PLN`;
  }
  return msg;
}
```

- [ ] **Step 3: Stwórz `lib/api/chat.ts`** — wrapper dla useChat:

```ts
import { apiFetch } from "./client";

export interface ChatMessageDto { role: "user" | "assistant"; content: string }
export interface SendChatRequest {
  sessionId?: string;
  visitorId: string;
  locale: "pl" | "en";
  messages: ChatMessageDto[];
  turnstileToken?: string;
}
export interface SendChatResponse {
  sessionId: string;
  message: string;
  action?: "redirect_quote" | "redirect_contact" | "collect_lead" | null;
  tokensUsed?: number;
}

export async function sendChatMessage(req: SendChatRequest): Promise<SendChatResponse> {
  return apiFetch<SendChatResponse>("/api/v1/chat/messages", {
    method: "POST",
    body: JSON.stringify(req),
  });
}
```

- [ ] **Step 4: Stwórz `lib/api/lead.ts`** — POST /api/v1/leads.

- [ ] **Step 5: Test jednostkowy `tests/api/api-client.spec.ts`** — z `MSW` lub stub `global.fetch`:

```ts
import { test, expect } from "@playwright/test";

test("apiFetch maps non-2xx to ApiError", async ({ page }) => {
  await page.route("http://localhost:8080/api/v1/contact", async (route) => {
    await route.fulfill({ status: 400, body: JSON.stringify({ error: "validation failed" }) });
  });
  // page-level eval — łatwiej z node test, ale Playwright robi robotę
  const result = await page.evaluate(async () => {
    const { apiFetch } = await import("/lib/api/client.ts");
    try { await apiFetch("/api/v1/contact", { method: "POST" }); return null; }
    catch (e) { return (e as Error).message; }
  });
  expect(result).toBe("validation failed");
});
```

> Uwaga: jeśli setup Playwright dla node-only modułów jest niewygodny, użyj `vitest`. Jeśli nie ma vitest — pomiń ten test, ale zostaw integracyjne testy E2E w Task A4 jako weryfikację.

- [ ] **Step 6: Commit**

```bash
git add lib/api tests/api
git commit -m "feat(api): typed client for backend (contact/chat/lead)"
```

---

### Task A2: Przepnij BriefForm na backend + Turnstile

**Files:**
- Modify: `components/sections/contact/BriefForm.tsx`
- Modify: `.env.example`

- [ ] **Step 1: Przeczytaj aktualny `components/sections/contact/BriefForm.tsx`** (linijki 168-186 — submit handler).

- [ ] **Step 2: Modify submit handler — usuń `fetch("/api/contact"...)`, użyj `submitBrief`:**

```tsx
import { submitBrief } from "@/lib/api/contact";
import { Turnstile } from "@marsidev/react-turnstile";

// W komponencie:
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState<string | null>(null);
const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

// Submit:
onClick={async () => {
  setSubmitting(true);
  setError(null);
  try {
    await submitBrief({
      name: form.name,
      email: form.email,
      company: form.company,
      message: form.desc,
      timelineNote: form.timelineNote,
      quotePayload: stored,
      turnstileToken: turnstileToken ?? undefined,
    }, locale as "pl" | "en");
    setSubmitted(true);
  } catch (e) {
    setError((e as Error).message ?? t("errors.submit"));
  } finally {
    setSubmitting(false);
  }
}}
```

- [ ] **Step 3: Dodaj Turnstile widget** w step 1 (przed submit):

```tsx
{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
  <Turnstile
    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
    onSuccess={setTurnstileToken}
  />
)}
```

- [ ] **Step 4: Dodaj error UI** — jeśli `error`, pokaż czerwony banner z `error`.

- [ ] **Step 5: Modify `.env.example`** — usuń niepotrzebne, dodaj te które są używane:

```bash
# Public — frontend
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

- [ ] **Step 6: Smoke test ręczny** — lokalnie:
1. Postaw backend (Task C2 / `docker compose up backend mailhog postgres`).
2. `npm run dev`
3. Otwórz `/pl/contact`, wybierz wycenę z `/pl/pricing`, wypełnij brief, submit.
4. Sprawdź: contact w bazie, email w MailHog (http://localhost:8025).

- [ ] **Step 7: Test E2E Playwright**

Plik `tests/redesign/brief-form-backend.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("brief form submits to backend", async ({ page }) => {
  // Pre-seed quote
  await page.goto("/pl/pricing");
  // ... klik na preset ...
  await page.goto("/pl/contact");
  await page.fill('[name="name"]', "Anna Test");
  await page.fill('[name="email"]', "anna@test.pl");
  await page.click('text=Dalej');
  await page.fill('textarea', "To jest opis projektu na potrzeby testu, długi na ponad dwadzieścia znaków.");
  await page.click('text=Wyślij');
  await expect(page.locator('text=Anna')).toBeVisible();  // submitted state
});
```

- [ ] **Step 8: Commit**

```bash
git add components/sections/contact/BriefForm.tsx .env.example tests/redesign/brief-form-backend.spec.ts
git commit -m "feat(brief): submit to backend API + Turnstile + error state"
```

---

### Task A3: Przepnij chat (useChat) na backend

**Files:**
- Modify: `lib/chat/useChat.ts`
- Modify: `lib/chat/types.ts` (jeśli sygnatury się różnią)

- [ ] **Step 1: Modify `useChat.ts`** — zamień `fetch("/api/chat", ...)` na `sendChatMessage(...)`. Dodaj `sessionId` w state (zwracany przez backend, persist w `sessionStorage`).

- [ ] **Step 2: Smoke test ręczny** — postaw `ollama` w docker, otwórz chat widget, wyślij wiadomość.

- [ ] **Step 3: Commit**

```bash
git commit -am "feat(chat): route chat through backend API instead of /api/chat"
```

---

### Task A4: Usuń Next API routes (nie działają w static export)

**Files:**
- Delete: `app/api/contact/route.ts`
- Delete: `app/api/quote/route.ts`
- Delete: `app/api/chat/route.ts`
- Delete: `app/api/` (cały katalog jeśli pusty)
- Delete: `components/forms/ContactForm.tsx` (nieużywany)
- Delete: `components/forms/QuoteForm.tsx` (nieużywany — zweryfikuj jeszcze raz `grep -rn QuoteForm app components`)

- [ ] **Step 1: Verify że ContactForm/QuoteForm nie są nigdzie importowane**

Run: `grep -rn "ContactForm\|QuoteForm" app components --include="*.tsx" --include="*.ts" | grep -v "components/forms/"`
Expected: brak wyników.

- [ ] **Step 2: Usuń pliki**

```bash
rm app/api/contact/route.ts app/api/quote/route.ts app/api/chat/route.ts
rmdir app/api/contact app/api/quote app/api/chat app/api 2>/dev/null || true
rm components/forms/ContactForm.tsx components/forms/QuoteForm.tsx
rmdir components/forms 2>/dev/null || true
```

- [ ] **Step 3: Run `npm run build`** — sprawdź że static export działa bez błędów (i bez API routes)

Run: `npm run build`
Expected: BUILD SUCCESS, output w `out/`.

- [ ] **Step 4: Cleanup duplikatu next.config**

`next.config.js` i `next.config.ts` istnieją oba. Next preferuje `.ts`. Usuń `.js` (skopiuj różnice do `.ts` jeśli są — `.ts` ma lepszy gating na production env).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused Next API routes and legacy forms (static export)"
```

---

## Phase D — Admin Frontend MVP

### Task D1: Bootstrap admin app — router + auth gate

**Files:**
- Modify: `admin-frontend/src/main.tsx`
- Modify: `admin-frontend/src/App.tsx`
- Create: `admin-frontend/src/pages/LoginPage.tsx`
- Create: `admin-frontend/src/pages/DashboardPage.tsx`
- Create: `admin-frontend/src/components/ProtectedRoute.tsx`
- Create: `admin-frontend/src/hooks/useAuth.ts`
- Modify: `admin-frontend/src/lib/api.ts` (już istnieje, drobne zmiany)
- Create: `admin-frontend/.env.example`

- [ ] **Step 1: Modify `admin-frontend/src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
```

- [ ] **Step 2: Stwórz `useAuth.ts`** — token w localStorage, callback `login(email, pwd)` strzelający `/auth/login`, `logout`, `isAuthenticated`.

- [ ] **Step 3: Stwórz `ProtectedRoute.tsx`** — `<Navigate to="/login" />` jeśli `!isAuthenticated`, inaczej `<Outlet />`.

- [ ] **Step 4: Stwórz `LoginPage.tsx`** — formularz email+password, error state.

- [ ] **Step 5: Stwórz `DashboardPage.tsx`** — placeholder z 4 kafelkami: "Contacts", "Quotes", "Leads", "Chats".

- [ ] **Step 6: Modify `App.tsx`** — definicja routes:

```tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContactsListPage from "./pages/ContactsListPage";
import QuotesListPage from "./pages/QuotesListPage";
import LeadsListPage from "./pages/LeadsListPage";
import ChatsListPage from "./pages/ChatsListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/contacts" element={<ContactsListPage />} />
          <Route path="/quotes" element={<QuotesListPage />} />
          <Route path="/leads" element={<LeadsListPage />} />
          <Route path="/chats" element={<ChatsListPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

- [ ] **Step 7: Modify `lib/api.ts`** — `VITE_API_URL` default `'/api/v1'` (Caddy zrobi proxy_pass), 401 handler nie używa `window.location` lecz event/state.

- [ ] **Step 8: Stwórz `.env.example`**

```bash
VITE_API_URL=http://localhost:8080/api/v1
```

- [ ] **Step 9: Smoke test**

Run: `cd admin-frontend && npm install && npm run dev`
Expected: Vite dev server na `:5173`, otworzysz przeglądarkę, klikasz login, używasz `admin@itsolutions.pl / admin123`, dostajesz dashboard.

- [ ] **Step 10: Commit**

```bash
git add admin-frontend/src admin-frontend/.env.example
git commit -m "feat(admin): bootstrap router + auth gate + login page"
```

---

### Task D2: Lista contacts — read + status update + reply

**Files:**
- Create: `admin-frontend/src/pages/ContactsListPage.tsx`
- Create: `admin-frontend/src/pages/ContactDetailPage.tsx`

- [ ] **Step 1: ContactsListPage** — tabela z `useQuery(['contacts', filters], () => contactsService.getContacts(filters))`. Kolumny: data, name, email, status, akcje (Detail).

- [ ] **Step 2: ContactDetailPage** — pełna treść + przycisk "Mark as read" + dialog "Reply" (subject + body) + "Archive" + "Mark as spam".

- [ ] **Step 3: Smoke test ręczny** — utwórz brief w publicznym formularzu, sprawdź że pojawia się w liście, otwórz detail, odpowiedz, sprawdź email w MailHog.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat(admin): contacts list + detail view + reply"
```

---

### Task D3: Listy quotes/leads/chats (skeletony)

**Files:**
- Create: `admin-frontend/src/pages/QuotesListPage.tsx`
- Create: `admin-frontend/src/pages/LeadsListPage.tsx`
- Create: `admin-frontend/src/pages/ChatsListPage.tsx`

- [ ] **Step 1-3: Tabela read-only** dla każdego — wystarczy listing + detail-modal w MVP. Update statusu można zostawić na późniejszy commit.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat(admin): quotes/leads/chats list skeletons"
```

---

## Phase C — Docker / VPS Deployment

### Task C1: Dockerfile dla backendu (multi-stage)

**Files:**
- Create: `backend/Dockerfile`
- Create: `backend/.dockerignore`

- [ ] **Step 1: Stwórz `backend/Dockerfile`**

```dockerfile
# syntax=docker/dockerfile:1.7

# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

# Cache deps
COPY backend/pom.xml backend/pom.xml
COPY api api
RUN cd backend && mvn -B -q dependency:go-offline -DskipTests

# Build
COPY backend/src backend/src
RUN cd backend && mvn -B -q -DskipTests package

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-alpine AS runtime

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app
COPY --from=build /workspace/backend/target/*.jar /app/app.jar

USER app
EXPOSE 8080

# Slim JVM tuning for ~512MB containers
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+UseContainerSupport -Djava.security.egd=file:/dev/./urandom"

HEALTHCHECK --interval=20s --timeout=3s --start-period=40s --retries=5 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java","-jar","/app/app.jar"]
```

- [ ] **Step 2: `.dockerignore`**

```
backend/target
backend/**/.idea
**/*.log
**/.DS_Store
.git
.github
.claude
.next
out
node_modules
admin-frontend/node_modules
admin-frontend/dist
docs
deploy/htpasswd
*.env
!.env.example
```

- [ ] **Step 3: Build local — verify**

Run: `docker build -f backend/Dockerfile -t itsolutions/backend:dev .`
Expected: Image built, ~250MB. Jeśli build crash'uje — typowo problem z OpenAPI generator pluginem szuka `api/openapi.yaml` względem `${project.basedir}/../api/`. Workdir w build stage to `/workspace`, więc `api/` musi być na root.

- [ ] **Step 4: Run smoke**

Run: `docker run --rm -p 8080:8080 -e DB_HOST=host.docker.internal itsolutions/backend:dev` (z lokalnym Postgresem) lub poczekaj do Task C5 z compose'em.

- [ ] **Step 5: Commit**

```bash
git add backend/Dockerfile backend/.dockerignore
git commit -m "feat(deploy): backend Dockerfile (multi-stage, JRE-21-alpine)"
```

---

### Task C2: Dockerfile dla frontendu (Next.js static → nginx)

**Files:**
- Create: `Dockerfile.frontend`
- Create: `nginx.frontend.conf`
- Create: `.dockerignore` (root, jeśli nie ma)

- [ ] **Step 1: Stwórz `Dockerfile.frontend`**

```dockerfile
# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev=false

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID} \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY} \
    NODE_ENV=production
RUN npm run build  # output: 'export' → produces ./out

FROM nginx:1.27-alpine AS runtime
COPY nginx.frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=20s --timeout=3s CMD wget -qO- http://localhost/health || exit 1
```

- [ ] **Step 2: Stwórz `nginx.frontend.conf`**

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # health
    location = /health { return 200 'ok'; add_header Content-Type text/plain; }

    # locale-aware fallback (next-intl trailingSlash)
    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    # cache static assets long, html short
    location ~* \.(?:css|js|png|jpg|jpeg|gif|svg|woff2?|ico)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
        try_files $uri =404;
    }
    location ~* \.html$ {
        expires 60s;
        add_header Cache-Control "public, must-revalidate";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;
    gzip_min_length 1024;
}
```

- [ ] **Step 3: Build local**

Run:
```bash
docker build -f Dockerfile.frontend \
  --build-arg NEXT_PUBLIC_API_URL=https://api.itsolutions.pl \
  -t itsolutions/frontend:dev .
```
Expected: Image built. Jeśli OOM — upewnij się że Docker Desktop ma przydzielone min. 4GB RAM.

- [ ] **Step 4: Smoke run**

Run: `docker run --rm -p 8081:80 itsolutions/frontend:dev`
Open: http://localhost:8081 — strona ładuje się.

- [ ] **Step 5: Commit**

```bash
git add Dockerfile.frontend nginx.frontend.conf .dockerignore
git commit -m "feat(deploy): frontend Dockerfile (static export + nginx)"
```

---

### Task C3: Dockerfile dla admin-frontend

**Files:**
- Create: `admin-frontend/Dockerfile`
- Create: `admin-frontend/nginx.admin.conf`
- Create: `admin-frontend/.dockerignore`

- [ ] **Step 1: Dockerfile** (analogicznie do C2 — Vite build → nginx-alpine):

```dockerfile
# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS build
WORKDIR /app
COPY admin-frontend/package.json admin-frontend/package-lock.json ./
RUN npm ci
COPY admin-frontend/ .
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build  # → ./dist

FROM nginx:1.27-alpine AS runtime
COPY admin-frontend/nginx.admin.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

- [ ] **Step 2: `nginx.admin.conf`**

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (relative URL — admin calls /api/v1/* and we proxy to backend service)
    location /api/ {
        proxy_pass http://backend:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 90s;
    }

    location ~* \.(?:css|js|png|jpg|jpeg|gif|svg|woff2?|ico)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;
}
```

- [ ] **Step 3: Build + smoke**

Run: `docker build -f admin-frontend/Dockerfile -t itsolutions/admin:dev . && docker run --rm -p 8082:80 itsolutions/admin:dev`
Expected: SPA ładuje się na :8082.

- [ ] **Step 4: Commit**

```bash
git add admin-frontend/Dockerfile admin-frontend/nginx.admin.conf admin-frontend/.dockerignore
git commit -m "feat(deploy): admin-frontend Dockerfile"
```

---

### Task C4: docker-compose dev stack (PostgreSQL + MailHog + Ollama + backend + frontend + admin + Caddy)

**Files:**
- Create: `docker-compose.yml`
- Create: `Caddyfile.dev`
- Create: `.env.example` (root, super-set wszystkich envów)

- [ ] **Step 1: Stwórz `docker-compose.yml`**

```yaml
name: itsolutions

services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
      POSTGRES_DB: ${DB_NAME:-itsolutions}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER}"]
      interval: 10s
      timeout: 3s
      retries: 5

  mailhog:
    image: mailhog/mailhog:v1.0.1
    restart: unless-stopped
    ports:
      - "1025:1025"
      - "8025:8025"
    profiles: ["dev"]

  ollama:
    image: ollama/ollama:0.4.6
    restart: unless-stopped
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    profiles: ["dev"]
    # Initial pull happens on first chat call. To pre-pull:
    # docker compose --profile dev exec ollama ollama pull llama3.2

  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    restart: unless-stopped
    depends_on:
      postgres: { condition: service_healthy }
    environment:
      SPRING_PROFILES_ACTIVE: ${SPRING_PROFILE:-prod}
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: ${DB_NAME:-itsolutions}
      DB_USER: ${DB_USER:-postgres}
      DB_PASSWORD: ${DB_PASSWORD:-postgres}
      JWT_SECRET: ${JWT_SECRET}
      SMTP_HOST: ${SMTP_HOST:-mailhog}
      SMTP_PORT: ${SMTP_PORT:-1025}
      SMTP_USER: ${SMTP_USER:-}
      SMTP_PASSWORD: ${SMTP_PASSWORD:-}
      MAIL_FROM: ${MAIL_FROM:-noreply@itsolutions.pl}
      LLM_PRIMARY: ${LLM_PRIMARY:-ollama}
      LLM_FALLBACK: ${LLM_FALLBACK:-}
      OLLAMA_URL: ${OLLAMA_URL:-http://ollama:11434}
      OLLAMA_MODEL: ${OLLAMA_MODEL:-llama3.2}
      GEMINI_API_KEY: ${GEMINI_API_KEY:-}
      GEMINI_MODEL: ${GEMINI_MODEL:-gemini-1.5-flash}
      TURNSTILE_SECRET_KEY: ${TURNSTILE_SECRET_KEY:-1x0000000000000000000000000000000AA}
      CORS_ORIGINS: ${CORS_ORIGINS:-http://localhost,https://itsolutions.pl}
      ADMIN_EMAIL: ${ADMIN_EMAIL:-admin@itsolutions.pl}
      ADMIN_URL: ${ADMIN_URL:-http://localhost:5173}
      PUBLIC_URL: ${PUBLIC_URL:-http://localhost:3000}
    expose:
      - "8080"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:8080/actuator/health"]
      interval: 20s
      timeout: 3s
      start_period: 40s
      retries: 5

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
      args:
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL:-http://localhost:8080}
        NEXT_PUBLIC_GA_MEASUREMENT_ID: ${NEXT_PUBLIC_GA_MEASUREMENT_ID:-}
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: ${NEXT_PUBLIC_TURNSTILE_SITE_KEY:-1x00000000000000000000AA}
    restart: unless-stopped
    expose:
      - "80"

  admin:
    build:
      context: .
      dockerfile: admin-frontend/Dockerfile
      args:
        VITE_API_URL: /api/v1
    restart: unless-stopped
    depends_on:
      backend: { condition: service_healthy }
    expose:
      - "80"

  caddy:
    image: caddy:2.9-alpine
    restart: unless-stopped
    depends_on: [frontend, backend, admin]
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - ./deploy/htpasswd:/etc/caddy/htpasswd:ro
      - caddy_data:/data
      - caddy_config:/config

volumes:
  postgres_data:
  ollama_data:
  caddy_data:
  caddy_config:
```

- [ ] **Step 2: Stwórz `Caddyfile.dev`** (lokalny, port 80, bez TLS)

```caddy
{
    auto_https off
}

# Public site
:80 {
    reverse_proxy frontend:80
}

# Backend API (na osobnym hoście via /etc/hosts)
api.localhost:80 {
    reverse_proxy backend:8080
}

# Admin BO — basic auth (dev). W prod: ten sam pattern, ale przez {$DOMAIN_ADMIN} z HTTPS.
admin.localhost:80 {
    basicauth {
        # dev-only credentials — admin / admin123
        # generated via: docker run --rm caddy:2.9-alpine caddy hash-password --plaintext "admin123"
        admin $2a$14$1kVHaGiYYgaY/VMFIwJ9/.SJqVnwmU7ckV9Ce3AMSk/5OGkcFp1Ce
    }
    reverse_proxy admin:80
}
```

- [ ] **Step 3: Stwórz `Caddyfile`** (production — będzie używane w prod, na dev też). Dwie wersje obsłużymy przez `docker-compose.dev.yml`/`prod.yml` override:

```caddy
{
    email {$ACME_EMAIL}
}

# Public site — HTTPS auto via Let's Encrypt
{$DOMAIN_PUBLIC} {
    encode zstd gzip
    reverse_proxy frontend:80
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
        Permissions-Policy "camera=(), microphone=(), geolocation=()"
    }
}

# Backend API
{$DOMAIN_API} {
    encode zstd gzip
    reverse_proxy backend:8080
    header Strict-Transport-Security "max-age=31536000; includeSubDomains"

    # Block actuator from internet (only health passes — backend itself filters)
    @actuator path /actuator/* /actuator
    handle @actuator {
        @notlocal not remote_ip 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 127.0.0.1/32
        respond @notlocal "Forbidden" 403
    }
}

# Admin BO — basic auth + osobny subdomain (HTTPS auto). JWT w aplikacji jest 2. warstwą.
# IP allowlist można dodać później jeśli zajdzie potrzeba — patrz deploy/README.md.
{$DOMAIN_ADMIN} {
    basicauth {
        import /etc/caddy/htpasswd
    }

    encode zstd gzip
    reverse_proxy admin:80
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        # Hint dla wyszukiwarek — nie indeksuj BO
        X-Robots-Tag "noindex, nofollow"
    }
}
```

- [ ] **Step 4: Stwórz `.env.example`** (root)

```bash
# === Database ===
DB_NAME=itsolutions
DB_USER=postgres
DB_PASSWORD=please-change-me
POSTGRES_PORT=5432

# === Backend ===
SPRING_PROFILE=prod
JWT_SECRET=please-generate-a-256-bit-secret-here
ADMIN_EMAIL=admin@itsolutions.pl

# === Email ===
SMTP_HOST=mailhog          # dev: mailhog. prod: smtp.postmarkapp.com / smtp.sendgrid.net
SMTP_PORT=1025             # prod: 587
SMTP_USER=                 # prod: API key login
SMTP_PASSWORD=             # prod: API key
MAIL_FROM=noreply@itsolutions.pl

# === LLM ===
# Two providers always available; switch by changing primary/fallback. Restart backend for changes.
# Examples:
#   LLM_PRIMARY=gemini  LLM_FALLBACK=ollama   → Gemini first; on quota/429 → Ollama
#   LLM_PRIMARY=ollama  LLM_FALLBACK=         → Ollama only, no fallback
#   LLM_PRIMARY=gemini  LLM_FALLBACK=         → Gemini only, no fallback
LLM_PRIMARY=ollama
LLM_FALLBACK=
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=llama3.2
GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-flash

# === Bot protection ===
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA   # test key
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA  # test key

# === Frontend ===
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# === Domains (Caddy) — used in prod ===
DOMAIN_PUBLIC=itsolutions.pl
DOMAIN_API=api.itsolutions.pl
DOMAIN_ADMIN=admin.itsolutions.pl
ACME_EMAIL=admin@itsolutions.pl

# === BO isolation ===
# Domyślnie: osobny subdomain `admin.*` + Basic Auth (Caddy) + JWT (aplikacja).
# Opcjonalnie później: IP allowlist / Cloudflare Access — patrz deploy/README.md.
ADMIN_URL=https://admin.itsolutions.pl
PUBLIC_URL=https://itsolutions.pl
CORS_ORIGINS=https://itsolutions.pl
```

- [ ] **Step 5: Stwórz pusty plik htpasswd** (do uzupełnienia ręcznie)

```bash
mkdir -p deploy
touch deploy/htpasswd
```

I `deploy/htpasswd.example`:
```
# Generate with: htpasswd -nbB admin "your-password"
# Or via Caddy: docker run --rm caddy:2.9-alpine caddy hash-password --plaintext "your-password"
admin:$2a$14$REPLACE_WITH_GENERATED_HASH
```

- [ ] **Step 6: Smoke test pełnego stosu (lokalnie, dev profile)**

```bash
cp .env.example .env
# Edit .env if needed, default values OK for first run
docker compose --profile dev up -d --build
docker compose ps
```

Otwórz:
- http://localhost — frontend (przez Caddy)
- http://api.localhost — backend (dodaj do `C:\Windows\System32\drivers\etc\hosts`: `127.0.0.1 api.localhost admin.localhost`)
- http://admin.localhost — admin (basic auth: `admin/admin123`)
- http://localhost:8025 — MailHog UI

Wyślij brief na `/pl/contact`, sprawdź:
1. Pojawia się w bazie: `docker compose exec postgres psql -U postgres itsolutions -c "SELECT id, email, status FROM contact_requests ORDER BY created_at DESC LIMIT 5"`
2. Email w MailHog (http://localhost:8025) — 2 maile: admin notification + user confirmation.
3. Lista contacts w admin BO (`http://admin.localhost`) zawiera nowy wpis.

- [ ] **Step 7: Commit**

```bash
git add docker-compose.yml Caddyfile Caddyfile.dev .env.example deploy/
git commit -m "feat(deploy): full Docker Compose stack with Caddy reverse proxy"
```

---

### Task C5: docker-compose.dev.yml + docker-compose.prod.yml override

**Files:**
- Create: `docker-compose.dev.yml`
- Create: `docker-compose.prod.yml`

- [ ] **Step 1: `docker-compose.dev.yml`** (override do `docker compose -f docker-compose.yml -f docker-compose.dev.yml up`)

```yaml
services:
  caddy:
    volumes:
      - ./Caddyfile.dev:/etc/caddy/Caddyfile:ro
    environment:
      ACME_EMAIL: dev@example.com

  backend:
    environment:
      SPRING_PROFILES_ACTIVE: dev

  postgres:
    ports:
      - "5432:5432"
```

- [ ] **Step 2: `docker-compose.prod.yml`**

```yaml
services:
  postgres:
    ports: []   # nie expose'ujemy portu na hosta — dostęp tylko z innych kontenerów
    volumes:
      - /srv/itsolutions/postgres:/var/lib/postgresql/data

  caddy:
    environment:
      ACME_EMAIL: ${ACME_EMAIL}
      DOMAIN_PUBLIC: ${DOMAIN_PUBLIC}
      DOMAIN_API: ${DOMAIN_API}
      DOMAIN_ADMIN: ${DOMAIN_ADMIN}

  mailhog:
    profiles: ["dev"]   # nie startuje w prod

  ollama:
    profiles: ["dev"]   # w prod używamy Gemini lub Ollama na osobnym hoście
```

- [ ] **Step 3: Dodaj wygodne aliasy do `package.json`**

```json
"scripts": {
  ...
  "docker:dev":  "docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile dev up -d --build",
  "docker:prod": "docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build",
  "docker:logs": "docker compose logs -f",
  "docker:down": "docker compose down"
}
```

- [ ] **Step 4: Commit**

```bash
git commit -am "feat(deploy): dev/prod compose overrides + npm scripts"
```

---

### Task C6: VPS Deployment Runbook + backup script

**Files:**
- Create: `deploy/README.md`
- Create: `deploy/backup.sh`

- [ ] **Step 1: Stwórz `deploy/README.md`**

````markdown
# VPS Deployment Runbook

## Wymagania VPS
- 2 vCPU, 4GB RAM, 40GB SSD (rekomendowane Hetzner CX22 / Mikr.us / OVH VPS-1)
- Ubuntu 22.04 LTS lub Debian 12
- Otwarte porty: 80, 443 (publiczne); 22 (SSH, ograniczyć na firewall do swojego IP)
- Domena z DNS A/AAAA wskazującym na IP VPS:
  - `itsolutions.pl` → public site
  - `api.itsolutions.pl` → backend
  - `admin.itsolutions.pl` → BO (rekomendacja: na osobnym subdomenie + IP allowlist)

## Pierwsze uruchomienie

### 1. Setup hosta
```bash
# Update + Docker
apt update && apt upgrade -y
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin git ufw fail2ban htpasswd

# Firewall
ufw default deny incoming
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# fail2ban (default rules dla ssh OK)
systemctl enable --now fail2ban

# Tworzenie użytkownika
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
# Edytuj .env i ustaw wszystkie sekrety (lista poniżej):
# - DB_PASSWORD (generuj: openssl rand -base64 32)
# - JWT_SECRET (generuj: openssl rand -base64 64)
# - SMTP_* (Postmark/SendGrid/Mailgun creds)
# - GEMINI_API_KEY (jeśli używasz Gemini)
# - LLM_PRIMARY=gemini i LLM_FALLBACK=ollama (target: Gemini z fallbackiem na Ollamę gdy quota wyczerpana)
# - TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY (z dash.cloudflare.com)
# - DOMAIN_PUBLIC, DOMAIN_API, DOMAIN_ADMIN
# - ACME_EMAIL
# - CORS_ORIGINS=https://itsolutions.pl
```

### 4. Wygeneruj htpasswd dla admina BO
```bash
# Hasło zapisz w bezpiecznym miejscu (Bitwarden/1Password)
htpasswd -B -c deploy/htpasswd admin
# Dodaj kolejne konta przez:
htpasswd -B deploy/htpasswd <user2>
```

### 5. Build + start
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker compose ps
docker compose logs -f backend  # zaczekaj aż zobaczysz "Started ITSolutionsApplication"
```

### 6. Pobierz model Ollama (jeśli używasz)
```bash
# Tylko jeśli LLM_PROVIDER=ollama i ollama jest w stosie. Patrz uwaga niżej.
docker compose exec ollama ollama pull llama3.2
```

> **Uwaga (Ollama na produkcji):** model 3B+ na CPU jest wolny (~5-10s/odpowiedź). Rekomendacje:
> 1. Użyj Gemini API (LLM_PROVIDER=gemini) — szybki, ~$0.075/1M input.
> 2. ALBO postaw Ollamę na osobnym VPS z GPU lub przynajmniej 8GB RAM, i wskaż `OLLAMA_URL` w `.env` na ten host.
> 3. ALBO wyłącz chat w UI dopóki nie masz LLM, frontend gracefully fallback'uje na "Skorzystaj z formularza".

### 7. Health checks
```bash
curl https://api.itsolutions.pl/actuator/health  # → {"status":"UP"}
curl -I https://itsolutions.pl                   # → 200
curl -u admin:<pass> https://admin.itsolutions.pl  # → SPA HTML (jeśli IP allowed)
```

## Backupy

`deploy/backup.sh` robi `pg_dump` do `/srv/itsolutions/backups/` raz dziennie. Zaplanuj cron:

```bash
crontab -e
# Add:
0 3 * * * /home/app/itsolutions/deploy/backup.sh >> /var/log/itsolutions-backup.log 2>&1
```

Restore:
```bash
docker compose exec -T postgres psql -U postgres -d itsolutions < /srv/itsolutions/backups/dump-2026-04-30.sql
```

> **Krytyczne:** kopiuj backupy off-site (S3 / Backblaze B2 / restic do drugiego VPSa). Skrypt ma TODO — uzupełnij `aws s3 cp` lub `rclone copy`.

## Aktualizacje (deploy nowej wersji)

```bash
cd /home/app/itsolutions
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker image prune -f
```

> Zero-downtime: Caddy nadal serwuje stary kontener póki nowy nie odpowie na health-check. Backend ma `start_period: 40s` aby Flyway migracje miały czas.

## Bezpieczeństwo BO (back-office)

Domyślna konfiguracja: **2 warstwy** ochrony.

1. **Osobny subdomain** (`admin.itsolutions.pl`) — nie linkujemy go nigdzie publicznie + `X-Robots-Tag: noindex` (Caddy header). Wymusza świadome wpisanie URLa.
2. **Basic Auth** w Caddy (`/etc/caddy/htpasswd`) — pierwsza brama (HTTP 401 zanim ruch dotrze do SPA).
3. **JWT auth** w aplikacji — backend i tak wymaga loginu admina, więc nawet jeśli ktoś przebije Basic Auth, dostanie pustą SPA i 401 na każdym fetchu do `/api/v1/admin/*`.

> **Uwaga:** Basic Auth NIE chroni przed brute-force tak jak IP allowlist. Daje wystarczająco dużo "tarcia" by odbić scannery i boty, ale ktoś z konkretnym celem przejdzie. Dlatego JWT (3) jest realnym mechanizmem autoryzacji, a Basic Auth (2) pełni rolę gate'a żeby BO nie wystawiał zbędnie publicznego API attack-surface.

### Opcjonalne wzmocnienia (do rozważenia po MVP)

Jeśli chcesz dołożyć dodatkową warstwę później — modyfikujesz tylko `Caddyfile`:

**A. IP allowlist** — dodaj do bloku `{$DOMAIN_ADMIN}`:
```caddy
@notallowed not remote_ip 185.1.2.3 192.168.1.0/24
handle @notallowed { respond "Forbidden" 403 }
```

**B. Cloudflare Access** (Zero Trust) — wystaw `admin.*` przez Cloudflare Tunnel, w Caddy zostaw tylko Basic Auth jako fallback. Identity provider (Google/GitHub) załatwia autentykację, VPS nawet nie ma publicznego DNS dla `admin.*`. Najbezpieczniejsze.

**C. WireGuard VPN** — postaw kontener `wireguard` na VPS, dodaj IP allowlist tylko dla `10.8.0.0/24`. Pracownicy łączą się przez VPN. Wymaga setupu klienta na każdej maszynie.

**D. SSH tunnel-only** — w `docker-compose.prod.yml` usuń `admin.*` z Caddyfile, opublikuj `admin` service tylko na loopback:
```yaml
admin:
  ports:
    - "127.0.0.1:8090:80"
```
i tunelujesz: `ssh -L 8090:localhost:8090 app@vps`, otwierasz `http://localhost:8090`. Zero ekspozycji publicznej, ale wymaga SSH access dla każdej osoby z BO.

## Monitoring (opcjonalnie, nie w MVP)

- Logs: `docker compose logs -f --tail=200 <service>`
- Metryki: Spring Boot Actuator + Prometheus + Grafana (dodaj w późniejszej fazie)
- Uptime: UptimeRobot / Better Stack (darmowy plan), ping `https://api.itsolutions.pl/actuator/health`

## Troubleshooting

| Symptom | Przyczyna | Fix |
|---|---|---|
| 502 Bad Gateway na `/api/*` | backend nie wystartował (Flyway, brak DB) | `docker compose logs backend`, sprawdź `DB_*` env |
| Cert Let's Encrypt nie wystawia się | DNS jeszcze nie dotarł / port 80/443 zablokowany | `dig +short itsolutions.pl`, `ufw status` |
| `401 Unauthorized` na `admin.*` (browser dialog) | brak / zła Basic Auth | wpisz dane z `deploy/htpasswd` lub odśwież generację: `htpasswd -B deploy/htpasswd admin && docker compose up -d caddy` |
| Email nie wysyła się w prod | SMTP creds złe | sprawdź `email_logs` table: `SELECT * FROM email_logs WHERE status='failed' ORDER BY created_at DESC LIMIT 10` |
| Chat odpowiada "Sorry, technical issues" | Ollama nie odpowiada / model nie pobrany | `docker compose exec ollama ollama list`; albo przełącz na Gemini |
| Frontend ładuje się ale `submitBrief` rzuca CORS | `CORS_ORIGINS` nie zawiera `DOMAIN_PUBLIC` | popraw w `.env`, restart backend |
````

- [ ] **Step 2: Stwórz `deploy/backup.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/srv/itsolutions/backups"
DATE=$(date +%Y-%m-%d)
DUMP_FILE="${BACKUP_DIR}/dump-${DATE}.sql"

mkdir -p "${BACKUP_DIR}"

cd "$(dirname "$0")/.."

# Dump
docker compose exec -T postgres pg_dump -U "${DB_USER:-postgres}" "${DB_NAME:-itsolutions}" \
    > "${DUMP_FILE}"

# Compress
gzip -f "${DUMP_FILE}"

# Retention: keep last 14 daily backups
find "${BACKUP_DIR}" -name "dump-*.sql.gz" -mtime +14 -delete

echo "Backup OK: ${DUMP_FILE}.gz"

# TODO: off-site sync — uzupełnij wybraną metodą:
# aws s3 cp "${DUMP_FILE}.gz" "s3://itsolutions-backups/postgres/" --profile itsolutions
# rclone copy "${DUMP_FILE}.gz" b2:itsolutions-backups/postgres/
# restic -r s3:s3.eu-central-1.amazonaws.com/itsolutions-backups backup "${DUMP_FILE}.gz"
```

```bash
chmod +x deploy/backup.sh
```

- [ ] **Step 3: Commit**

```bash
git add deploy/README.md deploy/backup.sh
git commit -m "docs(deploy): VPS runbook + backup script"
```

---

### Task C7: README aktualizacja + diagram

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Dopisz na początku `README.md`** sekcje:

````markdown
## Architektura

```
┌──────────────┐     HTTPS    ┌──────────────────────────────┐
│  Browser     │ ─────────►   │  Caddy (reverse proxy)       │
└──────────────┘              │  - itsolutions.pl  → frontend │
                              │  - api.itsolutions.pl → bckd  │
                              │  - admin.itsolutions.pl       │
                              │     [IP allow + BasicAuth]→admin│
                              └────┬──────────┬───────────┬───┘
                                   │          │           │
                              ┌────▼───┐ ┌────▼────┐ ┌────▼────┐
                              │frontend│ │backend  │ │admin SPA│
                              │(nginx) │ │Spring   │ │(nginx)  │
                              │ static │ │Boot 3.4 │ │  Vite   │
                              └────────┘ └────┬────┘ └─────────┘
                                              │
                                  ┌───────────┼─────────────┐
                                  │           │             │
                            ┌─────▼─┐   ┌─────▼──┐   ┌──────▼─────┐
                            │Postgres│  │SMTP    │   │Ollama/Gemini│
                            │   16   │  │relay   │   │ LLM gateway │
                            └────────┘  └────────┘   └─────────────┘
```

## Quick Start (lokalnie, Docker)

```bash
cp .env.example .env
npm run docker:dev     # uruchamia full stack: postgres + mailhog + ollama + backend + frontend + admin + caddy
npm run docker:logs    # tail logs
```

Otwórz:
- http://localhost — strona publiczna
- http://localhost:8025 — MailHog UI (mail debug)
- http://admin.localhost — admin BO (login: `admin@itsolutions.pl` / `admin123`; basic-auth: `admin` / `admin123`)
- http://api.localhost/swagger-ui — OpenAPI docs

> Wymaga dodania w `C:\Windows\System32\drivers\etc\hosts`:
> ```
> 127.0.0.1 api.localhost admin.localhost
> ```

## Quick Start (deweloperka bez Dockera)

```bash
# 1. Tylko Postgres + MailHog w dockerze:
docker compose --profile dev up -d postgres mailhog ollama

# 2. Backend lokalnie:
cd backend && mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 3. Frontend lokalnie:
npm install && npm run dev   # :3000

# 4. Admin lokalnie:
cd admin-frontend && npm install && npm run dev   # :5173
```

## Deploy na VPS

Patrz `deploy/README.md` — pełen runbook + backupy + troubleshooting.

````

- [ ] **Step 2: Commit**

```bash
git commit -am "docs: README architecture diagram + Quick Start"
```

---

### Task C8: CI smoke (opcjonalnie, ale rekomendowane)

**Files:**
- Modify lub Create: `.github/workflows/docker-build.yml`

- [ ] **Step 1: Stwórz workflow który buduje obrazy na PR**

```yaml
name: docker-build
on:
  pull_request:
  push: { branches: [main] }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - name: Build backend
        run: docker build -f backend/Dockerfile -t backend:ci .
      - name: Build frontend
        run: docker build -f Dockerfile.frontend
                          --build-arg NEXT_PUBLIC_API_URL=https://api.example.com
                          -t frontend:ci .
      - name: Build admin
        run: docker build -f admin-frontend/Dockerfile -t admin:ci .
      - name: Compose up smoke
        run: |
          cp .env.example .env
          docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile dev up -d --wait
          curl -f http://localhost/health
          docker compose down -v
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/docker-build.yml
git commit -m "ci: docker build + compose smoke test"
```

---

## Final verification

- [ ] **Step 1: Pełny lint + test stosu**

Run (z root):
```bash
# Backend
cd backend && mvn -B verify
cd ..

# Frontend
npm run build

# Admin
cd admin-frontend && npm run build
cd ..

# Compose smoke
docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile dev up -d --build
docker compose ps   # all healthy
```

Expected: wszystko zielone, 0 failing, 0 errors. `docker compose ps` pokazuje wszystkie usługi `healthy`/`running`.

- [ ] **Step 2: End-to-end manual run-through**

1. Otwórz http://localhost (frontend)
2. Wejdź `/pl/pricing`, wybierz preset, kliknij "Wyślij brief" — wypełnij, wyślij.
3. Sprawdź MailHog (http://localhost:8025) — 2 wiadomości (admin + user).
4. Sprawdź `psql ... -c "SELECT * FROM contact_requests ORDER BY created_at DESC LIMIT 1"` — nowy rekord.
5. Otwórz http://admin.localhost (basic auth + login admin) — kontakt na liście.
6. Kliknij detail → reply → wpisz subject + treść → "Wyślij" → MailHog ma 3. mail.
7. Otwórz chat widget na home — wyślij wiadomość — odpowiedź z LLM (lub graceful fallback).
8. `/api/v1/admin/leads` — sprawdź że unauthorized strzał zwraca 401, autoryzowany działa.

- [ ] **Step 3: Final commit (jeśli jakieś dodatkowe poprawki)**

```bash
git status   # czysto
git log --oneline | head -20   # ~15-20 commitów Phase B/A/D/C
```

---

## Open questions (zostawić w notatce, do późniejszej decyzji)

1. **LLM w prod (rozstrzygnięte 2026-04-30)** — User chce mieć obie opcje gotowe. Default `LLM_PRIMARY=ollama, LLM_FALLBACK=` (no fallback). Target prod: `LLM_PRIMARY=gemini, LLM_FALLBACK=ollama` — Gemini darmowy tier, na 429/quota → automatyczny fallback na Ollamę (osobny VPS z RAM/GPU lub lokalny). User chce też móc przetestować Ollamę solo i ewentualnie zrezygnować z Gemini. Implementacja: Task B6 zarejestrowuje oba beany zawsze, `ChainedLlmGateway` wybiera kolejność po `application.yml`.
2. **Lekkie tracking** — backend ma `email_logs` ale nie przesyła statusu `delivered/bounced` (Postmark webhook). Można dodać w fazie 2.
3. **CSP** — Caddy nie ustawia `Content-Security-Policy`. Dla statycznego frontendu (next-intl, framer) trzeba przemyśleć source listy. Można dodać po pierwszym deployu, monitoring CSP-only mode.
4. **Rate limiting** — backend ma `rate-limit.requests-per-minute=60` w configu, ale w `SecurityConfig` nie widzę aktywacji filtra. Jeśli prod, dopisz Bucket4j filter (post-MVP).
5. **GDPR / cookie banner** — istnieje `components/cookies/`, sprawdź czy Turnstile + GA są blokowane przed consent (rekomendowane).
6. **Recaptcha vs Turnstile** — Turnstile jest już wpięty (Cloudflare). OK dla MVP.
7. **Czy `quote_payload` JSON powinien być sub-schemą zamiast freestyle JSONB?** — Decyzja: freestyle do MVP (BriefForm wysyła pełne `stored` z localStorage), dopiero przy raportach/analytics warto modelować kolumny.

---

## Self-review checklist

**Spec coverage:**
- ✅ "spiąć frontend z backendem (zbieranie briefów)" — Phase A2 (BriefForm → POST /api/v1/contact + Phase B1+B5 backend wiring + B9 e2e test)
- ✅ "wszystko inne co potrzebne" — chat (A3+B6+B4), lead intake (B8), email confirmation (B5), admin BO list+reply (D1+D2)
- ✅ "setup w jednym/kilku dockerach" — Phase C: 1 compose file definiuje 6 usług (postgres, mailhog/ollama dev, backend, frontend, admin, caddy)
- ✅ "łatwe wgranie na VPS" — Task C6 deploy/README + backup script + troubleshooting
- ✅ "BO niedostępny z internetu / pod innym adresem" — Caddyfile.prod ma osobny `admin.itsolutions.pl` host + IP allowlist + Basic Auth + JWT (4 warstwy)
- ✅ Best practices: multi-stage Dockerfile, non-root user, healthcheck, immutable cache headers, HSTS, JWT, BCrypt, Flyway migrations, Testcontainers IT, separate prod profile, .env-driven secrets

**Placeholder scan:**
- Brak `TBD`/`TODO` w stepach (poza świadomym TODO w `backup.sh` na off-site sync który wymaga decyzji userskiej)
- Każdy step ma konkretną komendę / kod blok lub jasną instrukcję

**Type consistency:**
- `ContactRepository.findAll(...)` ma identyczne sygnatury w portu i adapterze (B1 step 2 i 6)
- `EmailSender.EmailRequest` zgadza się między portem (B5 step 1) i wywołaniem w `ContactApplicationService` (już istnieje w kodzie, sprawdzony)
- `LlmGateway.LlmRequest` używany przez `ChatService` (już istniejący kod) zgadza się z definicją w B6 step 1
- Frontend `BriefSubmitPayload` (A1 step 2) → backend `ContactFormRequest` (już istnieje) — pola `name`, `email`, `phone`, `company`, `subject`, `message`, `turnstileToken` mapują się 1:1; `quotePayload` + `timelineNote` ląduje w `message` jako tekst (A1 step 2 `buildMessage`)

**Decyzje, które plan podejmuje za Ciebie (możesz zmienić):**
- Caddy zamiast nginx jako reverse proxy (auto-HTTPS)
- BO za IP allowlist + Basic Auth + JWT (3 warstwy) — zamiast VPN-only (zostawione jako alternatywa w `deploy/README.md`)
- Ollama jako default LLM (z dokumentacją że Gemini jest lepszym choice'em na prod CPU)
- MapStruct w domain↔jpa mapper (już jest w `pom.xml`); jeśli walczy z immutable Lombok, plan zawiera fallback na `default` metody mapujące przez Builder
- Static export Next.js zostaje (nie przepisujemy frontu na SSR Node) — frontend strzela bezpośrednio w backend, CORS na backendzie

**Ryzyka:**
- Build Dockera frontu jest najcięższy (Next 16 + GSAP + Framer = duże node_modules); pierwszy build ~5-8 min na VPS (potem cache).
- Pierwszy `mvn package` w Dockerze backendu pobierze ~300MB Maven deps; planuj 5-10 min.
- Ollama image to 1.5GB sam w sobie + model 2GB = 3.5GB na disk. Na VPS 40GB to spoko, ale upewnij się.
- Postgres bez ograniczenia rozmiaru `quote_payload` JSONB to potencjalna dziura DOS — dodaj limit w validatorze BriefSubmit (np. JSON < 10KB).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-30-backend-wiring-and-docker-deploy.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task (B1, B2, ... C8), review between tasks, fast iteration. Daje najlepszą kontekst-izolację dla dużej liczby plików (~80 plików nowych/zmodyfikowanych).

**2. Inline Execution** — Execute tasks in this session using `superpowers:executing-plans`. Batch execution z checkpointami, ale ten plan ma ~50 stepów × 4 fazy — może być long.

**Sugestia: split na 4 PR-y** (B → A → D → C), żeby każdy review był łatwiejszy:
- PR1: Phase B (backend, ~25 plików, kluczowe zmiany)
- PR2: Phase A (frontend wiring, ~10 plików)
- PR3: Phase D (admin MVP, ~12 plików)
- PR4: Phase C (Docker + deploy, ~15 plików)

Which approach?
