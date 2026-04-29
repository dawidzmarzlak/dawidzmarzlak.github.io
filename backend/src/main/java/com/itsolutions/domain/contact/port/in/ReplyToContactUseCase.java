package com.itsolutions.domain.contact.port.in;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

/**
 * Use case for admin replying to contact request.
 */
public interface ReplyToContactUseCase {

    /**
     * Send a reply to a contact request.
     *
     * @param command Reply command with message
     * @return Result indicating success
     */
    ReplyResult execute(ReplyCommand command);

    @Getter
    @Builder
    class ReplyCommand {
        private final UUID contactId;
        private final UUID adminId;
        private final String subject;
        private final String message;
    }

    @Getter
    @Builder
    class ReplyResult {
        private final boolean success;
        private final boolean emailSent;
        private final String errorMessage;
    }
}
