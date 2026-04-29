package com.itsolutions.domain.email.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain entity for logging sent emails.
 */
@Getter
@Builder
public class EmailLog {

    private final UUID id;
    private final String recipientEmail;
    private final String subject;
    private final String templateCode;
    private final EmailLogStatus status;
    private final String errorMessage;
    private final String messageId;
    private final String relatedEntityType;
    private final UUID relatedEntityId;
    private final Instant sentAt;
    private final Instant createdAt;

    /**
     * Create a success log entry.
     */
    public static EmailLog success(
            String recipientEmail,
            String subject,
            String templateCode,
            String messageId,
            String relatedEntityType,
            UUID relatedEntityId
    ) {
        return EmailLog.builder()
                .id(UUID.randomUUID())
                .recipientEmail(recipientEmail)
                .subject(subject)
                .templateCode(templateCode)
                .status(EmailLogStatus.SENT)
                .messageId(messageId)
                .relatedEntityType(relatedEntityType)
                .relatedEntityId(relatedEntityId)
                .sentAt(Instant.now())
                .createdAt(Instant.now())
                .build();
    }

    /**
     * Create a failure log entry.
     */
    public static EmailLog failure(
            String recipientEmail,
            String subject,
            String templateCode,
            String errorMessage,
            String relatedEntityType,
            UUID relatedEntityId
    ) {
        return EmailLog.builder()
                .id(UUID.randomUUID())
                .recipientEmail(recipientEmail)
                .subject(subject)
                .templateCode(templateCode)
                .status(EmailLogStatus.FAILED)
                .errorMessage(errorMessage)
                .relatedEntityType(relatedEntityType)
                .relatedEntityId(relatedEntityId)
                .createdAt(Instant.now())
                .build();
    }
}
