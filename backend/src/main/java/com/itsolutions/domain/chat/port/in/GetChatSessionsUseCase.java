package com.itsolutions.domain.chat.port.in;

import com.itsolutions.domain.chat.model.ChatSession;
import com.itsolutions.domain.chat.model.ChatSessionStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Use case for admin BO listings of chat sessions.
 */
public interface GetChatSessionsUseCase {

    ChatSessionListResult getSessions(ChatSessionQuery query);

    /** With messages eager-loaded. */
    Optional<ChatSession> getSessionWithMessages(UUID sessionId);

    @Getter
    @Builder
    class ChatSessionQuery {
        private final ChatSessionStatus status;
        private final String search;
        private final int page;
        private final int size;
        private final String sortBy;
        private final String sortDirection;
    }

    @Getter
    @Builder
    class ChatSessionListResult {
        private final List<ChatSession> sessions;
        private final int totalElements;
        private final int totalPages;
        private final int currentPage;
    }
}
