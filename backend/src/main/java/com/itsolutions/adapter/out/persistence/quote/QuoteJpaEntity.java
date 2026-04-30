package com.itsolutions.adapter.out.persistence.quote;

import com.itsolutions.domain.quote.model.ProjectSize;
import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.model.ServiceType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code quote_requests} table.
 *
 * <p>Columns reserved for future use are intentionally NOT mapped here:
 * {@code turnstile_verified}, {@code lead_id}, {@code accepted_at}. They live
 * in the V1 schema and will be wired in a future migration when the domain
 * grows the corresponding fields.</p>
 *
 * <p>Field-name asymmetries between this entity and {@code QuoteRequest}
 * (handled by {@link QuoteMapper}):
 * <ul>
 *   <li>domain {@code timeline} ↔ entity {@code deadline} ({@code deadline} column)</li>
 *   <li>domain {@code internalNotes} ↔ entity {@code quoteNotes} ({@code quote_notes} column)</li>
 * </ul></p>
 */
@Entity
@Table(name = "quote_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuoteJpaEntity {

    @Id
    private UUID id;

    @Column(name = "reference_number", nullable = false, unique = true, length = 20)
    private String referenceNumber;

    @Column(name = "service", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Column(name = "project_size", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ProjectSize projectSize;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String company;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String budget;

    /** Domain calls this {@code timeline}; column is {@code deadline} (V1). */
    @Column(name = "deadline", length = 50)
    private String deadline;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private QuoteStatus status;

    @Column(name = "quoted_amount", precision = 10, scale = 2)
    private BigDecimal quotedAmount;

    @Column(name = "quoted_currency", length = 3)
    private String quotedCurrency;

    /** Domain calls this {@code internalNotes}; column is {@code quote_notes} (V1). */
    @Column(name = "quote_notes", columnDefinition = "TEXT")
    private String quoteNotes;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(nullable = false, length = 5)
    private String locale;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "quoted_at")
    private Instant quotedAt;

    @Column(name = "quoted_by")
    private UUID quotedBy;

    /**
     * Owned attachments. Unidirectional one-to-many with {@code @JoinColumn} on the
     * child — JPA owns the {@code quote_id} FK from the {@link QuoteAttachmentJpaEntity}
     * side without a back-reference. Cascade ALL + orphan removal keeps the collection
     * lifecycle bound to the parent quote.
     */
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "quote_id", nullable = false, updatable = false)
    @Builder.Default
    private List<QuoteAttachmentJpaEntity> attachments = new ArrayList<>();
}
