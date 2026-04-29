package com.itsolutions.domain.contact.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain entity representing a contact form submission.
 */
@Getter
@Builder
public class ContactRequest {

    private final UUID id;
    private final String name;
    private final String email;
    private final String phone;
    private final String company;
    private final String subject;
    private final String message;
    private final String locale;
    private final String ipAddress;
    private final String userAgent;
    private ContactStatus status;
    private final Instant createdAt;
    private Instant updatedAt;
    private Instant repliedAt;
    private UUID repliedBy;
    private String replyContent;

    /**
     * Create a new contact request from form submission.
     */
    public static ContactRequest create(
            String name,
            String email,
            String phone,
            String company,
            String subject,
            String message,
            String locale,
            String ipAddress,
            String userAgent
    ) {
        return ContactRequest.builder()
                .id(UUID.randomUUID())
                .name(name)
                .email(email)
                .phone(phone)
                .company(company)
                .subject(subject)
                .message(message)
                .locale(locale != null ? locale : "pl")
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .status(ContactStatus.NEW)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    /**
     * Mark contact request as read.
     */
    public void markAsRead() {
        if (this.status == ContactStatus.NEW) {
            this.status = ContactStatus.READ;
            this.updatedAt = Instant.now();
        }
    }

    /**
     * Record a reply to this contact request.
     */
    public void recordReply(UUID adminId, String replyContent) {
        this.status = ContactStatus.REPLIED;
        this.repliedBy = adminId;
        this.repliedAt = Instant.now();
        this.replyContent = replyContent;
        this.updatedAt = Instant.now();
    }

    /**
     * Archive this contact request.
     */
    public void archive() {
        this.status = ContactStatus.ARCHIVED;
        this.updatedAt = Instant.now();
    }

    /**
     * Mark as spam.
     */
    public void markAsSpam() {
        this.status = ContactStatus.SPAM;
        this.updatedAt = Instant.now();
    }

    /**
     * Check if this request is new and unread.
     */
    public boolean isNew() {
        return status == ContactStatus.NEW;
    }

    /**
     * Check if this request has been replied to.
     */
    public boolean isReplied() {
        return status == ContactStatus.REPLIED;
    }

    /**
     * Check if this request is archived.
     */
    public boolean isArchived() {
        return status == ContactStatus.ARCHIVED;
    }
}
