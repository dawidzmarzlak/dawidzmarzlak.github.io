package com.itsolutions.adapter.in.web;

import com.itsolutions.adapter.out.persistence.chat.ChatMessageJpaEntity;
import com.itsolutions.adapter.out.persistence.chat.ChatMessageJpaRepository;
import com.itsolutions.adapter.out.persistence.chat.ChatSessionJpaEntity;
import com.itsolutions.adapter.out.persistence.chat.ChatSessionJpaRepository;
import com.itsolutions.domain.chat.model.ChatRole;
import com.itsolutions.domain.chat.model.ChatSessionStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.Instant;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * IT for {@link AdminChatController}.
 *
 * <p>Real Postgres via Testcontainers. The list endpoint must return sessions
 * with empty {@code messages} arrays (lazy path), and the detail endpoint must
 * return the full conversation (eager via {@code @EntityGraph}). Auth is
 * enforced by SecurityConfig — the unauth case asserts the path is gated.</p>
 */
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class AdminChatControllerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
        r.add("jwt.secret", () ->
            "dGVzdC1qd3Qtc2VjcmV0LWtleS1mb3ItYXV0aC1jb250cm9sbGVyLWl0LXRlc3RzLW11c3QtYmUtMzItYnl0ZXM=");
        r.add("turnstile.secret-key", () -> "1x0000000000000000000000000000000AA");
    }

    @Autowired
    MockMvc mvc;

    @Autowired
    ChatSessionJpaRepository sessionRepo;

    @Autowired
    ChatMessageJpaRepository messageRepo;

    @Test
    void list_endpoint_requires_auth() throws Exception {
        mvc.perform(get("/api/v1/admin/chats"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void lists_sessions_paginated_and_excludes_messages() throws Exception {
        Instant now = Instant.now();
        UUID sid = UUID.randomUUID();
        sessionRepo.save(ChatSessionJpaEntity.builder()
                .id(sid)
                .visitorId("v-1")
                .locale("pl")
                .status(ChatSessionStatus.ACTIVE)
                .llmProvider("ollama")
                .llmModel("llama3.2")
                .totalTokens(0)
                .createdAt(now)
                .updatedAt(now)
                .build());
        messageRepo.save(ChatMessageJpaEntity.builder()
                .id(UUID.randomUUID())
                .sessionId(sid)
                .role(ChatRole.USER)
                .content("hi")
                .createdAt(now)
                .build());

        mvc.perform(get("/api/v1/admin/chats?page=0&size=20"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalElements").isNumber())
            .andExpect(jsonPath("$.sessions[0].id").exists())
            .andExpect(jsonPath("$.sessions[0].messages.length()").value(0));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void detail_endpoint_includes_messages() throws Exception {
        Instant now = Instant.now();
        UUID sid = UUID.randomUUID();
        sessionRepo.save(ChatSessionJpaEntity.builder()
                .id(sid)
                .visitorId("v-2")
                .locale("pl")
                .status(ChatSessionStatus.ACTIVE)
                .llmProvider("ollama")
                .llmModel("llama3.2")
                .totalTokens(0)
                .createdAt(now)
                .updatedAt(now)
                .build());
        messageRepo.save(ChatMessageJpaEntity.builder()
                .id(UUID.randomUUID())
                .sessionId(sid)
                .role(ChatRole.USER)
                .content("first")
                .createdAt(now)
                .build());
        messageRepo.save(ChatMessageJpaEntity.builder()
                .id(UUID.randomUUID())
                .sessionId(sid)
                .role(ChatRole.ASSISTANT)
                .content("response")
                .tokensUsed(42)
                .responseTimeMs(200)
                .createdAt(now.plusMillis(1))
                .build());

        mvc.perform(get("/api/v1/admin/chats/{id}", sid))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(sid.toString()))
            .andExpect(jsonPath("$.messages.length()").value(2));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void detail_endpoint_404_for_unknown_id() throws Exception {
        mvc.perform(get("/api/v1/admin/chats/{id}", UUID.randomUUID()))
            .andExpect(status().isNotFound());
    }
}
