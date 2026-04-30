package com.itsolutions.adapter.out.persistence.chat;

import com.itsolutions.domain.chat.model.ChatRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code chat_messages} table.
 *
 * <p>The {@code session_id} FK is owned by this side (the message), unlike
 * other parent-child entities in this codebase where the parent owns the FK
 * via {@code @JoinColumn}. This is because chat messages are persisted
 * independently of their session — see
 * {@link com.itsolutions.application.chat.ChatService} which calls
 * {@code chatRepository.saveMessage(...)} directly between LLM calls.</p>
 *
 * <p>The corresponding {@link ChatSessionJpaEntity#getMessages()} collection
 * is a read-only mirror ({@code insertable=false, updatable=false}) that only
 * materializes when the query opts in via {@code @EntityGraph}.</p>
 */
@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageJpaEntity {

    @Id
    private UUID id;

    /**
     * FK to {@code chat_sessions.id}. Writable from this side (this is the
     * authoritative column for the relationship); the parent's
     * {@link ChatSessionJpaEntity#getMessages()} collection mirrors it as
     * read-only.
     */
    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ChatRole role;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "tokens_used")
    private Integer tokensUsed;

    @Column(name = "response_time_ms")
    private Integer responseTimeMs;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}
