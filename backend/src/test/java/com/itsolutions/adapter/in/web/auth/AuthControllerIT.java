package com.itsolutions.adapter.in.web.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration test for {@link AuthController}.
 *
 * <p>Real Postgres 16 via Testcontainers, full Boot context with MockMvc.
 * The V2 seed + V8 fix-up migration are applied by Flyway, so login is exercised
 * against the real BCrypt hash for 'admin123'. The Turnstile secret is set to
 * Cloudflare's documented always-pass key so site-verify is a no-op even if any
 * controller transitively touched it.</p>
 */
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class AuthControllerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
        // Provide a real Base64-encoded JWT secret (>= 32 bytes after decode).
        r.add("jwt.secret", () ->
            "dGVzdC1qd3Qtc2VjcmV0LWtleS1mb3ItYXV0aC1jb250cm9sbGVyLWl0LXRlc3RzLW11c3QtYmUtMzItYnl0ZXM=");
        r.add("jwt.access-token-expiration", () -> 86400000L);
        r.add("jwt.refresh-token-expiration", () -> 604800000L);
        // Cloudflare's always-pass dummy key — keeps Turnstile-aware code paths quiet in tests.
        r.add("turnstile.secret-key", () -> "1x0000000000000000000000000000000AA");
    }

    @Autowired
    MockMvc mvc;

    @Test
    void login_returns_tokens_for_valid_credentials() throws Exception {
        mvc.perform(post("/api/v1/auth/login")
                .contentType(APPLICATION_JSON)
                .content("""
                    {"email":"admin@itsolutions.pl","password":"admin123"}
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.accessToken").exists())
            .andExpect(jsonPath("$.refreshToken").exists())
            .andExpect(jsonPath("$.user.email").value("admin@itsolutions.pl"))
            .andExpect(jsonPath("$.user.role").value("admin"));
    }

    @Test
    void login_returns_401_for_invalid_password() throws Exception {
        mvc.perform(post("/api/v1/auth/login")
                .contentType(APPLICATION_JSON)
                .content("""
                    {"email":"admin@itsolutions.pl","password":"wrong"}
                    """))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void login_returns_401_for_unknown_email() throws Exception {
        mvc.perform(post("/api/v1/auth/login")
                .contentType(APPLICATION_JSON)
                .content("""
                    {"email":"nobody@example.com","password":"admin123"}
                    """))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void me_requires_bearer_token() throws Exception {
        mvc.perform(get("/api/v1/auth/me"))
            .andExpect(status().isUnauthorized());
    }
}
