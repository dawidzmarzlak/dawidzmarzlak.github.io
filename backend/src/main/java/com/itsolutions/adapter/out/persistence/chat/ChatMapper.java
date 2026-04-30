package com.itsolutions.adapter.out.persistence.chat;

import com.itsolutions.domain.chat.model.ChatMessage;
import com.itsolutions.domain.chat.model.ChatSession;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Hand-written mapper between {@link ChatSession} / {@link ChatMessage} (Lombok
 * {@code @Builder}-immutable domain) and {@link ChatSessionJpaEntity} /
 * {@link ChatMessageJpaEntity}; MapStruct can't generate setters into the
 * immutable domain {@link ChatMessage} builder, and an all-{@code default}-method
 * MapStruct {@code @Mapper} interface leaves Spring with no bean.
 *
 * <p>No field-name asymmetries between domain and JPA — every {@link ChatSession}
 * and {@link ChatMessage} field maps 1:1 to entity fields and SQL columns.</p>
 *
 * <p><strong>Notes on the parent-child relationship:</strong></p>
 * <ul>
 *   <li>{@link ChatSession#getMessages()} is the in-memory aggregate's list,
 *       mutated via {@link ChatSession#addMessage(ChatMessage)}.</li>
 *   <li>{@link ChatSessionJpaEntity#getMessages()} is a <strong>READ-ONLY mirror</strong>
 *       ({@code insertable=false, updatable=false}) populated only when the JPQL
 *       query uses {@code @EntityGraph} (see
 *       {@link ChatSessionJpaRepository#findByIdWithMessages}).</li>
 *   <li>Inserts go through {@link ChatMessageJpaRepository#save(Object)} —
 *       <strong>NOT cascade</strong>. {@link #toEntity(ChatSession)} therefore
 *       does NOT copy the messages list onto the entity.</li>
 *   <li>{@link #toDomain(ChatSessionJpaEntity)} copies messages back into the
 *       domain builder. If the entity was loaded without {@code @EntityGraph},
 *       the LAZY collection is empty (or, in an open persistence context such
 *       as {@code @DataJpaTest}, it may auto-load on access — both paths
 *       produce a valid domain object). The plain {@code findById} path
 *       therefore returns a session with NO conversation history; callers that
 *       need messages must use {@code findByIdWithMessages}.</li>
 * </ul>
 *
 * <p><strong>Reserved for future use (NOT mapped):</strong> none. The V1
 * {@code chat_sessions}/{@code chat_messages} columns and the domain models
 * are fully aligned after V6.</p>
 */
@Component
public class ChatMapper {

    public ChatSessionJpaEntity toEntity(ChatSession d) {
        if (d == null) {
            return null;
        }
        return ChatSessionJpaEntity.builder()
                .id(d.getId())
                .visitorId(d.getVisitorId())
                .locale(d.getLocale())
                .status(d.getStatus())
                .llmProvider(d.getLlmProvider())
                .llmModel(d.getLlmModel())
                .totalTokens(d.getTotalTokens())
                .leadId(d.getLeadId())
                .createdAt(d.getCreatedAt())
                .updatedAt(d.getUpdatedAt())
                .archivedAt(d.getArchivedAt())
                // messages intentionally NOT copied — read-only mirror, written via ChatMessageJpaRepository
                .build();
    }

    public ChatSession toDomain(ChatSessionJpaEntity e) {
        if (e == null) {
            return null;
        }
        // Use ArrayList (not Collections.unmodifiableList / List.copyOf) so the
        // resulting domain ChatSession can still mutate via addMessage(...).
        List<ChatMessage> mappedMessages = e.getMessages() == null
                ? new ArrayList<>()
                : e.getMessages().stream()
                        .map(this::toDomain)
                        .collect(Collectors.toCollection(ArrayList::new));
        return ChatSession.builder()
                .id(e.getId())
                .visitorId(e.getVisitorId())
                .locale(e.getLocale())
                .status(e.getStatus())
                .llmProvider(e.getLlmProvider())
                .llmModel(e.getLlmModel())
                .totalTokens(e.getTotalTokens() != null ? e.getTotalTokens() : 0)
                .leadId(e.getLeadId())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .archivedAt(e.getArchivedAt())
                .messages(mappedMessages)
                .build();
    }

    public ChatMessageJpaEntity toEntity(ChatMessage d) {
        if (d == null) {
            return null;
        }
        return ChatMessageJpaEntity.builder()
                .id(d.getId())
                .sessionId(d.getSessionId())
                .role(d.getRole())
                .content(d.getContent())
                .tokensUsed(d.getTokensUsed())
                .responseTimeMs(d.getResponseTimeMs())
                .createdAt(d.getCreatedAt())
                .build();
    }

    public ChatMessage toDomain(ChatMessageJpaEntity e) {
        if (e == null) {
            return null;
        }
        return ChatMessage.builder()
                .id(e.getId())
                .sessionId(e.getSessionId())
                .role(e.getRole())
                .content(e.getContent())
                .tokensUsed(e.getTokensUsed())
                .responseTimeMs(e.getResponseTimeMs())
                .createdAt(e.getCreatedAt())
                .build();
    }
}
