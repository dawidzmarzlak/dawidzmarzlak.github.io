package com.itsolutions.domain.quote.model;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * Domain entity representing a quote/pricing request.
 */
@Getter
@Builder
public class QuoteRequest {

    private final UUID id;
    private final String name;
    private final String email;
    private final String phone;
    private final String company;
    private final ServiceType serviceType;
    private final ProjectSize projectSize;
    private final String budget;
    private final String timeline;
    private final String description;
    private final String locale;
    private final String ipAddress;
    private final String userAgent;
    private QuoteStatus status;
    private BigDecimal quotedAmount;
    private String quotedCurrency;
    private String internalNotes;
    private final Instant createdAt;
    private Instant updatedAt;
    private Instant quotedAt;
    private UUID quotedBy;

    @Builder.Default
    private final List<QuoteAttachment> attachments = new ArrayList<>();

    /**
     * Create a new quote request from form submission.
     */
    public static QuoteRequest create(
            String name,
            String email,
            String phone,
            String company,
            ServiceType serviceType,
            ProjectSize projectSize,
            String budget,
            String timeline,
            String description,
            String locale,
            String ipAddress,
            String userAgent
    ) {
        return QuoteRequest.builder()
                .id(UUID.randomUUID())
                .name(name)
                .email(email)
                .phone(phone)
                .company(company)
                .serviceType(serviceType)
                .projectSize(projectSize)
                .budget(budget)
                .timeline(timeline)
                .description(description)
                .locale(locale != null ? locale : "pl")
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .status(QuoteStatus.NEW)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    /**
     * Start reviewing this quote request.
     */
    public void startReview() {
        if (this.status == QuoteStatus.NEW) {
            this.status = QuoteStatus.REVIEWING;
            this.updatedAt = Instant.now();
        }
    }

    /**
     * Send a quote/proposal.
     */
    public void sendQuote(UUID adminId, BigDecimal amount, String currency) {
        this.status = QuoteStatus.QUOTED;
        this.quotedBy = adminId;
        this.quotedAmount = amount;
        this.quotedCurrency = currency != null ? currency : "PLN";
        this.quotedAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    /**
     * Mark quote as accepted.
     */
    public void markAccepted() {
        if (this.status == QuoteStatus.QUOTED) {
            this.status = QuoteStatus.ACCEPTED;
            this.updatedAt = Instant.now();
        }
    }

    /**
     * Mark quote as rejected.
     */
    public void markRejected() {
        if (this.status == QuoteStatus.QUOTED) {
            this.status = QuoteStatus.REJECTED;
            this.updatedAt = Instant.now();
        }
    }

    /**
     * Mark as expired.
     */
    public void markExpired() {
        if (this.status == QuoteStatus.QUOTED || this.status == QuoteStatus.NEW) {
            this.status = QuoteStatus.EXPIRED;
            this.updatedAt = Instant.now();
        }
    }

    /**
     * Mark as spam.
     */
    public void markAsSpam() {
        this.status = QuoteStatus.SPAM;
        this.updatedAt = Instant.now();
    }

    /**
     * Add internal notes.
     */
    public void addInternalNotes(String notes) {
        this.internalNotes = notes;
        this.updatedAt = Instant.now();
    }

    /**
     * Add attachment to quote request.
     */
    public void addAttachment(QuoteAttachment attachment) {
        this.attachments.add(attachment);
        this.updatedAt = Instant.now();
    }

    public List<QuoteAttachment> getAttachments() {
        return Collections.unmodifiableList(attachments);
    }

    /**
     * Check if this request is new.
     */
    public boolean isNew() {
        return status == QuoteStatus.NEW;
    }

    /**
     * Check if quote has been sent.
     */
    public boolean isQuoted() {
        return status == QuoteStatus.QUOTED;
    }

    /**
     * Check if quote was accepted.
     */
    public boolean isAccepted() {
        return status == QuoteStatus.ACCEPTED;
    }

    /**
     * Value object for quote attachments.
     */
    @Getter
    @Builder
    public static class QuoteAttachment {
        private final UUID id;
        private final String fileName;
        private final String contentType;
        private final long fileSize;
        private final String storagePath;
        private final Instant uploadedAt;

        public static QuoteAttachment create(
                String fileName,
                String contentType,
                long fileSize,
                String storagePath
        ) {
            return QuoteAttachment.builder()
                    .id(UUID.randomUUID())
                    .fileName(fileName)
                    .contentType(contentType)
                    .fileSize(fileSize)
                    .storagePath(storagePath)
                    .uploadedAt(Instant.now())
                    .build();
        }
    }
}
