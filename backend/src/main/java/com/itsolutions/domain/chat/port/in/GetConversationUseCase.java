package com.itsolutions.domain.chat.port.in;

import com.itsolutions.domain.chat.model.ChatMessage;
import com.itsolutions.domain.chat.model.ChatSession;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

/**
 * Use case for retrieving chat conversation history.
 */
public interface GetConversationUseCase {

    /**
     * Get conversation history for a session.
     *
     * @param sessionId The session ID
     * @return Conversation details with messages
     */
    GetConversationResult execute(UUID sessionId);

    @Getter
    @Builder
    class GetConversationResult {
        private final ChatSession session;
        private final List<ChatMessage> messages;
        private final int totalMessages;
        private final int totalTokens;
    }
}
