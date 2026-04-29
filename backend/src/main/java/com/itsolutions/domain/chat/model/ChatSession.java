package com.itsolutions.domain.chat.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * Aggregate Root for chat conversations.
 * Encapsulates all business logic related to chat sessions.
 */
@Getter
@Builder
public class ChatSession {

    private final UUID id;
    private final String visitorId;
    private final String locale;
    private ChatSessionStatus status;
    private final String llmProvider;
    private final String llmModel;
    private int totalTokens;
    private UUID leadId;
    private final Instant createdAt;
    private Instant updatedAt;
    private Instant archivedAt;

    @Builder.Default
    private final List<ChatMessage> messages = new ArrayList<>();

    public static ChatSession create(String visitorId, String locale, String llmProvider, String llmModel) {
        return ChatSession.builder()
                .id(UUID.randomUUID())
                .visitorId(visitorId)
                .locale(locale != null ? locale : "pl")
                .status(ChatSessionStatus.ACTIVE)
                .llmProvider(llmProvider)
                .llmModel(llmModel)
                .totalTokens(0)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    public void addMessage(ChatMessage message) {
        messages.add(message);
        if (message.getTokensUsed() != null) {
            totalTokens += message.getTokensUsed();
        }
        updatedAt = Instant.now();
    }

    public void archive() {
        this.status = ChatSessionStatus.ARCHIVED;
        this.archivedAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public void markAsSpam() {
        this.status = ChatSessionStatus.SPAM;
        this.updatedAt = Instant.now();
    }

    public void linkToLead(UUID leadId) {
        this.leadId = leadId;
        this.updatedAt = Instant.now();
    }

    public List<ChatMessage> getMessages() {
        return Collections.unmodifiableList(messages);
    }

    public ChatMessage getLastUserMessage() {
        for (int i = messages.size() - 1; i >= 0; i--) {
            if (messages.get(i).isFromUser()) {
                return messages.get(i);
            }
        }
        return null;
    }

    public ChatMessage getLastAssistantMessage() {
        for (int i = messages.size() - 1; i >= 0; i--) {
            if (messages.get(i).isFromAssistant()) {
                return messages.get(i);
            }
        }
        return null;
    }

    public int getMessageCount() {
        return messages.size();
    }

    public boolean isActive() {
        return status == ChatSessionStatus.ACTIVE;
    }

    public boolean isArchived() {
        return status == ChatSessionStatus.ARCHIVED;
    }

    /**
     * Get conversation history formatted for LLM context.
     */
    public List<LlmMessage> getConversationHistory() {
        return messages.stream()
                .filter(m -> m.getRole() != ChatRole.SYSTEM)
                .map(m -> new LlmMessage(
                        m.getRole() == ChatRole.USER ? "user" : "assistant",
                        m.getContent()
                ))
                .toList();
    }

    public record LlmMessage(String role, String content) {}
}
