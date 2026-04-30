package com.itsolutions.adapter.out.persistence.email;

import com.itsolutions.domain.email.model.EmailLogStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code email_logs} table.
 *
 * <p>Field-name asymmetries between this entity and the
 * {@link com.itsolutions.domain.email.model.EmailLog} domain object:</p>
 * <ul>
 *   <li>domain {@code recipientEmail} ↔ V1 {@code recipient}</li>
 *   <li>domain {@code templateCode}   ↔ V1 {@code template_name}</li>
 *   <li>domain {@code messageId}      ↔ V1 {@code provider_message_id}</li>
 * </ul>
 *
 * <p>The V1 {@code template_id} FK column is exposed here for completeness but is
 * <strong>not populated</strong> by the sender — kept reserved-for-future like the
 * {@code score} field on B3's lead entity. The V1 status CHECK constraint and
 * {@code 'pending'} default were dropped in V7 in favour of Hibernate-supplied
 * uppercase enum names.</p>
 */
@Entity
@Table(name = "email_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailLogJpaEntity {

    @Id
    private UUID id;

    /**
     * V1 FK column to {@code email_templates(id)}. Reserved-for-future — the sender
     * looks up templates by name and only persists {@link #templateName}.
     */
    @Column(name = "template_id")
    private UUID templateId;

    @Column(name = "template_name", length = 100)
    private String templateName;

    @Column(nullable = false)
    private String recipient;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private EmailLogStatus status;

    @Column(name = "provider_message_id")
    private String providerMessageId;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "related_entity_type", length = 50)
    private String relatedEntityType;

    @Column(name = "related_entity_id")
    private UUID relatedEntityId;

    @Column(name = "sent_at")
    private Instant sentAt;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}
