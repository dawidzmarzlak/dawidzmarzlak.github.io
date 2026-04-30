package com.itsolutions.domain.email.port.out;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;
import java.util.UUID;

/**
 * Outbound port for sending email.
 *
 * <p>Two paths are supported:</p>
 * <ul>
 *   <li>{@link #send(EmailRequest)} — ad-hoc email composed by the caller (subject + body).</li>
 *   <li>{@link #sendTemplate(String, String, String, Map)} — template lookup by name + locale,
 *       variable substitution, then send.</li>
 * </ul>
 *
 * <p>Both paths return an {@link EmailResult} that captures success/failure plus the SMTP
 * provider message id (when available) and any error message. Implementations are expected
 * to log every attempt to the {@code email_logs} table (success and failure).</p>
 */
public interface EmailSender {

    EmailResult send(EmailRequest request);

    EmailResult sendTemplate(String templateName, String to, String locale, Map<String, Object> variables);

    @Getter
    @Builder
    class EmailRequest {
        private final String to;
        private final String subject;
        private final String body;
        private final boolean html;
        private final String relatedEntityType;
        private final UUID relatedEntityId;
    }

    @Getter
    @Builder
    class EmailResult {
        private final boolean success;
        private final String providerMessageId;
        private final String errorMessage;
    }
}
