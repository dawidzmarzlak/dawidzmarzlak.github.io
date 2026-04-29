package com.itsolutions.domain.chat.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain entity representing a single chat message.
 * This is a pure domain object - no JPA annotations.
 */
@Getter
@Builder
public class ChatMessage {

    private final UUID id;
    private final UUID sessionId;
    private final ChatRole role;
    private final String content;
    private final Integer tokensUsed;
    private final Integer responseTimeMs;
    private final Instant createdAt;

    public static ChatMessage createUserMessage(UUID sessionId, String content) {
        return ChatMessage.builder()
                .id(UUID.randomUUID())
                .sessionId(sessionId)
                .role(ChatRole.USER)
                .content(content)
                .createdAt(Instant.now())
                .build();
    }

    public static ChatMessage createAssistantMessage(
            UUID sessionId,
            String content,
            Integer tokensUsed,
            Integer responseTimeMs
    ) {
        return ChatMessage.builder()
                .id(UUID.randomUUID())
                .sessionId(sessionId)
                .role(ChatRole.ASSISTANT)
                .content(content)
                .tokensUsed(tokensUsed)
                .responseTimeMs(responseTimeMs)
                .createdAt(Instant.now())
                .build();
    }

    public static ChatMessage createSystemMessage(UUID sessionId, String content) {
        return ChatMessage.builder()
                .id(UUID.randomUUID())
                .sessionId(sessionId)
                .role(ChatRole.SYSTEM)
                .content(content)
                .createdAt(Instant.now())
                .build();
    }

    public boolean isFromUser() {
        return role == ChatRole.USER;
    }

    public boolean isFromAssistant() {
        return role == ChatRole.ASSISTANT;
    }
}
