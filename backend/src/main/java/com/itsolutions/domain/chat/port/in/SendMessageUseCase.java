package com.itsolutions.domain.chat.port.in;

import com.itsolutions.domain.chat.model.ChatAction;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

/**
 * Use case for sending messages to the AI chatbot.
 */
public interface SendMessageUseCase {

    /**
     * Send a message to the chatbot and receive a response.
     *
     * @param command The message command containing conversation context
     * @return Response with AI message and optional action
     */
    SendMessageResult execute(SendMessageCommand command);

    @Getter
    @Builder
    class SendMessageCommand {
        private final UUID sessionId;
        private final List<MessageDto> messages;
        private final String locale;
        private final LeadDataDto leadData;
        private final String visitorId;
        private final String turnstileToken;

        public record MessageDto(String role, String content) {}
        public record LeadDataDto(String name, String email, String phone) {}
    }

    @Getter
    @Builder
    class SendMessageResult {
        private final UUID sessionId;
        private final String message;
        private final ChatAction action;
        private final Integer tokensUsed;
        private final Integer responseTimeMs;
    }
}
