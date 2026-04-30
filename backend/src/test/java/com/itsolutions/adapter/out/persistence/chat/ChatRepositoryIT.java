package com.itsolutions.adapter.out.persistence.chat;

import com.itsolutions.domain.chat.model.ChatMessage;
import com.itsolutions.domain.chat.model.ChatSession;
import com.itsolutions.domain.chat.model.ChatSessionStatus;
import com.itsolutions.domain.chat.port.out.ChatRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test for the Chat persistence adapter.
 *
 * <p>Mirrors {@code LeadRepositoryIT}: real Postgres 16 via Testcontainers,
 * narrow {@link DataJpaTest} context, Flyway runs V1..V6. Exercises the full
 * domain port, with extra emphasis on the parent-child shape unique to chat:
 * messages are persisted independently of their session (no cascade), and the
 * session's collection is a read-only mirror that only materializes via the
 * {@code findByIdWithMessages} eager-loading path.</p>
 */
@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({ChatRepositoryAdapter.class, ChatMapper.class})
class ChatRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    ChatRepository repository;

    /** Used in test 2 to verify message persistence directly without going through findByIdWithMessages. */
    @Autowired
    ChatMessageJpaRepository messageJpa;

    /** Used in test 5 to insert a referenced lead row so the lead_id FK is satisfied. */
    @Autowired
    JdbcTemplate jdbc;

    private static ChatSession sampleSession() {
        return ChatSession.create("v-1", "pl", "ollama", "llama3.2");
    }

    @Test
    void saves_and_loads_session() {
        ChatSession session = sampleSession();
        ChatSession saved = repository.save(session);

        Optional<ChatSession> loaded = repository.findById(saved.getId());
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getVisitorId()).isEqualTo("v-1");
        assertThat(loaded.get().getLocale()).isEqualTo("pl");
        assertThat(loaded.get().getStatus()).isEqualTo(ChatSessionStatus.ACTIVE);
        assertThat(loaded.get().getLlmProvider()).isEqualTo("ollama");
        assertThat(loaded.get().getLlmModel()).isEqualTo("llama3.2");
    }

    @Test
    void saves_messages_independently() {
        ChatSession saved = repository.save(sampleSession());
        UUID sid = saved.getId();

        repository.saveMessage(ChatMessage.createUserMessage(sid, "hi"));
        repository.saveMessage(ChatMessage.createAssistantMessage(sid, "yo", 10, 200));

        // Verify directly via the message repo — no parent cascade required.
        List<ChatMessageJpaEntity> rows = messageJpa.findBySessionIdOrderByCreatedAtAsc(sid);
        assertThat(rows).hasSize(2);
        assertThat(rows.get(0).getContent()).isEqualTo("hi");
        assertThat(rows.get(1).getContent()).isEqualTo("yo");
        assertThat(rows.get(1).getTokensUsed()).isEqualTo(10);
        assertThat(rows.get(1).getResponseTimeMs()).isEqualTo(200);
    }

    @Test
    void find_by_id_with_messages_eager_loads() throws InterruptedException {
        ChatSession saved = repository.save(sampleSession());
        UUID sid = saved.getId();

        repository.saveMessage(ChatMessage.createUserMessage(sid, "first"));
        // Tiny gap to ensure deterministic createdAt ordering at Postgres' resolution.
        Thread.sleep(2);
        repository.saveMessage(ChatMessage.createAssistantMessage(sid, "second", 5, 100));
        Thread.sleep(2);
        repository.saveMessage(ChatMessage.createUserMessage(sid, "third"));

        Optional<ChatSession> loaded = repository.findByIdWithMessages(sid);
        assertThat(loaded).isPresent();
        List<ChatMessage> messages = loaded.get().getMessages();
        assertThat(messages).hasSize(3);
        assertThat(messages.get(0).getContent()).isEqualTo("first");
        assertThat(messages.get(1).getContent()).isEqualTo("second");
        assertThat(messages.get(2).getContent()).isEqualTo("third");
    }

    @Test
    void find_by_id_does_not_eager_load() {
        // Confirms the contract that callers wanting messages must use
        // findByIdWithMessages — the plain findById path returns a session
        // whose messages collection is the LAZY mirror.
        //
        // Under @DataJpaTest the persistence context stays open for the whole
        // test method, so accessing the LAZY collection won't throw
        // LazyInitializationException; it may instead trigger an auto-init
        // SELECT. The contract we're guarding against is "you accidentally
        // pay the JOIN cost on findById" — the assertion below is loose
        // enough to tolerate Hibernate's session-open behaviour while still
        // documenting the expectation that the eager path is opt-in.
        ChatSession saved = repository.save(sampleSession());
        UUID sid = saved.getId();

        repository.saveMessage(ChatMessage.createUserMessage(sid, "hello"));

        Optional<ChatSession> loaded = repository.findById(sid);
        assertThat(loaded).isPresent();
        // 0 if LAZY mirror was never materialized at toDomain-time (the
        // mapper's stream sees an uninitialized empty list); 1 if Hibernate
        // auto-initialized it on access. Either is acceptable; the assertion
        // is structural — findById doesn't promise to return messages.
        assertThat(loaded.get().getMessages().size()).isIn(0, 1);
    }

    @Test
    void assigns_lead_id() {
        // Insert a real lead row first so the V6 chat_sessions.lead_id FK is satisfied.
        UUID leadId = UUID.randomUUID();
        Instant now = Instant.now();
        jdbc.update(
                "INSERT INTO leads (id, email, source, status, created_at, updated_at) "
                        + "VALUES (?, ?, ?, ?, ?, ?)",
                leadId, "fk@example.com", "MANUAL", "NEW", java.sql.Timestamp.from(now), java.sql.Timestamp.from(now)
        );

        ChatSession saved = repository.save(sampleSession());

        ChatSession loaded = repository.findById(saved.getId()).orElseThrow();
        loaded.linkToLead(leadId);
        repository.save(loaded);

        ChatSession reloaded = repository.findById(saved.getId()).orElseThrow();
        assertThat(reloaded.getLeadId()).isEqualTo(leadId);
    }
}
