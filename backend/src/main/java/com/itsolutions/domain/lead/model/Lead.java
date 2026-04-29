package com.itsolutions.domain.lead.model;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * Domain aggregate for leads (potential customers).
 */
@Getter
@Builder
public class Lead {

    private final UUID id;
    private String name;
    private String email;
    private String phone;
    private String company;
    private LeadSource source;
    private LeadStatus status;
    private BigDecimal estimatedValue;
    private String currency;
    private String tags;
    private UUID assignedTo;
    private UUID chatSessionId;
    private UUID contactRequestId;
    private UUID quoteRequestId;
    private final Instant createdAt;
    private Instant updatedAt;
    private Instant contactedAt;
    private Instant convertedAt;

    @Builder.Default
    private final List<LeadNote> notes = new ArrayList<>();

    /**
     * Create a new lead from chat.
     */
    public static Lead createFromChat(
            String name,
            String email,
            String phone,
            UUID chatSessionId
    ) {
        return Lead.builder()
                .id(UUID.randomUUID())
                .name(name)
                .email(email)
                .phone(phone)
                .source(LeadSource.CHAT)
                .status(LeadStatus.NEW)
                .chatSessionId(chatSessionId)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    /**
     * Create a new lead from contact form.
     */
    public static Lead createFromContact(
            String name,
            String email,
            String phone,
            String company,
            UUID contactRequestId
    ) {
        return Lead.builder()
                .id(UUID.randomUUID())
                .name(name)
                .email(email)
                .phone(phone)
                .company(company)
                .source(LeadSource.CONTACT_FORM)
                .status(LeadStatus.NEW)
                .contactRequestId(contactRequestId)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    /**
     * Create a new lead from quote request.
     */
    public static Lead createFromQuote(
            String name,
            String email,
            String phone,
            String company,
            UUID quoteRequestId,
            BigDecimal estimatedValue
    ) {
        return Lead.builder()
                .id(UUID.randomUUID())
                .name(name)
                .email(email)
                .phone(phone)
                .company(company)
                .source(LeadSource.QUOTE_FORM)
                .status(LeadStatus.NEW)
                .quoteRequestId(quoteRequestId)
                .estimatedValue(estimatedValue)
                .currency("PLN")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    /**
     * Create a new lead manually.
     */
    public static Lead createManual(
            String name,
            String email,
            String phone,
            String company
    ) {
        return Lead.builder()
                .id(UUID.randomUUID())
                .name(name)
                .email(email)
                .phone(phone)
                .company(company)
                .source(LeadSource.MANUAL)
                .status(LeadStatus.NEW)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    /**
     * Update lead info.
     */
    public void updateInfo(String name, String email, String phone, String company) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.updatedAt = Instant.now();
    }

    /**
     * Update lead status.
     */
    public void updateStatus(LeadStatus newStatus) {
        this.status = newStatus;
        this.updatedAt = Instant.now();

        if (newStatus == LeadStatus.CONTACTED && this.contactedAt == null) {
            this.contactedAt = Instant.now();
        }
        if (newStatus == LeadStatus.CONVERTED) {
            this.convertedAt = Instant.now();
        }
    }

    /**
     * Mark as contacted.
     */
    public void markContacted() {
        updateStatus(LeadStatus.CONTACTED);
    }

    /**
     * Mark as qualified.
     */
    public void markQualified() {
        updateStatus(LeadStatus.QUALIFIED);
    }

    /**
     * Mark as converted.
     */
    public void markConverted() {
        updateStatus(LeadStatus.CONVERTED);
    }

    /**
     * Mark as lost.
     */
    public void markLost() {
        updateStatus(LeadStatus.LOST);
    }

    /**
     * Mark as spam.
     */
    public void markAsSpam() {
        updateStatus(LeadStatus.SPAM);
    }

    /**
     * Assign to admin user.
     */
    public void assignTo(UUID adminId) {
        this.assignedTo = adminId;
        this.updatedAt = Instant.now();
    }

    /**
     * Set estimated value.
     */
    public void setEstimatedValue(BigDecimal value, String currency) {
        this.estimatedValue = value;
        this.currency = currency != null ? currency : "PLN";
        this.updatedAt = Instant.now();
    }

    /**
     * Set tags.
     */
    public void setTags(String tags) {
        this.tags = tags;
        this.updatedAt = Instant.now();
    }

    /**
     * Add a note.
     */
    public void addNote(LeadNote note) {
        this.notes.add(note);
        this.updatedAt = Instant.now();
    }

    public List<LeadNote> getNotes() {
        return Collections.unmodifiableList(notes);
    }

    /**
     * Check if lead is new.
     */
    public boolean isNew() {
        return status == LeadStatus.NEW;
    }

    /**
     * Check if lead is converted.
     */
    public boolean isConverted() {
        return status == LeadStatus.CONVERTED;
    }

    /**
     * Check if lead is lost.
     */
    public boolean isLost() {
        return status == LeadStatus.LOST;
    }
}
