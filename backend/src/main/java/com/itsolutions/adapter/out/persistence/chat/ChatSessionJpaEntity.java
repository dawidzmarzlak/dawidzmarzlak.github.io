package com.itsolutions.adapter.out.persistence.chat;

import com.itsolutions.domain.chat.model.ChatSessionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code chat_sessions} table.
 *
 * <p>No field-name asymmetries between the entity and
 * {@link com.itsolutions.domain.chat.model.ChatSession}: domain fields map 1:1
 * to columns (snake_case in SQL, camelCase here).</p>
 *
 * <p>The {@link #messages} collection is a <strong>read-only mirror</strong>
 * managed via {@code @JoinColumn(insertable=false, updatable=false)}. Inserts
 * go through {@link ChatMessageJpaRepository#save(Object)} — there is no
 * cascade from the parent. Eager-loading of this collection is opt-in via the
 * {@code @EntityGraph} on {@link ChatSessionJpaRepository#findByIdWithMessages(UUID)};
 * the plain {@link org.springframework.data.jpa.repository.JpaRepository#findById(Object)}
 * path leaves it lazy and (in detached contexts) empty.</p>
 */
@Entity
@Table(name = "chat_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatSessionJpaEntity {

    @Id
    private UUID id;

    @Column(name = "visitor_id")
    private String visitorId;

    @Column(nullable = false, length = 5)
    private String locale;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ChatSessionStatus status;

    @Column(name = "llm_provider", length = 20)
    private String llmProvider;

    @Column(name = "llm_model", length = 50)
    private String llmModel;

    /**
     * Boxed because the V1 column has DEFAULT 0 — keeping the field nullable
     * allows partially populated entities (e.g. mappers) to round-trip without
     * triggering NPEs during unboxing.
     */
    @Column(name = "total_tokens")
    private Integer totalTokens;

    @Column(name = "lead_id")
    private UUID leadId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "archived_at")
    private Instant archivedAt;

    /**
     * Read-only mirror of the {@code chat_messages} rows for this session.
     *
     * <p>The FK is owned by {@link ChatMessageJpaEntity#getSessionId()} (writable
     * column); this side is {@code insertable=false, updatable=false} so
     * Hibernate never tries to write the FK from the parent. Messages are
     * persisted independently via {@link ChatMessageJpaRepository}. LAZY because
     * most read paths (notably the plain {@code findById}) don't need the
     * conversation history; the {@code findByIdWithMessages} query opts in via
     * {@code @EntityGraph}.</p>
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", insertable = false, updatable = false)
    @OrderBy("createdAt ASC")
    @Builder.Default
    private List<ChatMessageJpaEntity> messages = new ArrayList<>();
}
