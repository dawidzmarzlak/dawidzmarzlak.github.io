package com.itsolutions.domain.email.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain entity representing an email template.
 */
@Getter
@Builder
public class EmailTemplate {

    private final UUID id;
    private final String code;
    private final String name;
    private final String locale;
    private String subject;
    private String bodyHtml;
    private String bodyText;
    private boolean active;
    private final Instant createdAt;
    private Instant updatedAt;

    /**
     * Create a new email template.
     */
    public static EmailTemplate create(
            String code,
            String name,
            String locale,
            String subject,
            String bodyHtml,
            String bodyText
    ) {
        return EmailTemplate.builder()
                .id(UUID.randomUUID())
                .code(code)
                .name(name)
                .locale(locale != null ? locale : "pl")
                .subject(subject)
                .bodyHtml(bodyHtml)
                .bodyText(bodyText)
                .active(true)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    /**
     * Update template content.
     */
    public void updateContent(String subject, String bodyHtml, String bodyText) {
        this.subject = subject;
        this.bodyHtml = bodyHtml;
        this.bodyText = bodyText;
        this.updatedAt = Instant.now();
    }

    /**
     * Activate template.
     */
    public void activate() {
        this.active = true;
        this.updatedAt = Instant.now();
    }

    /**
     * Deactivate template.
     */
    public void deactivate() {
        this.active = false;
        this.updatedAt = Instant.now();
    }
}
