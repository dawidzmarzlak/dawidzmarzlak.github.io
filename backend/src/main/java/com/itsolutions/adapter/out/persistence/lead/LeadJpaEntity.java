package com.itsolutions.adapter.out.persistence.lead;

import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;
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
 * JPA entity mapped to the {@code leads} table.
 *
 * <p>Columns reserved for future use are intentionally NOT mapped here:
 * {@code score} (NUMERIC, V1) — there is no domain field; left for a future
 * scoring feature. The {@code chk_lead_score} CHECK constraint (0..100) is
 * preserved on the DB side.</p>
 *
 * <p>No field-name asymmetries between the entity and {@link com.itsolutions.domain.lead.model.Lead}:
 * domain fields map 1:1 to columns (snake_case in SQL, camelCase here).</p>
 */
@Entity
@Table(name = "leads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadJpaEntity {

    @Id
    private UUID id;

    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String company;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private LeadSource source;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private LeadStatus status;

    @Column(name = "estimated_value", precision = 12, scale = 2)
    private BigDecimal estimatedValue;

    @Column(length = 3)
    private String currency;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(name = "assigned_to")
    private UUID assignedTo;

    @Column(name = "chat_session_id")
    private UUID chatSessionId;

    @Column(name = "contact_request_id")
    private UUID contactRequestId;

    @Column(name = "quote_request_id")
    private UUID quoteRequestId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "contacted_at")
    private Instant contactedAt;

    @Column(name = "converted_at")
    private Instant convertedAt;

    /**
     * Owned notes. Unidirectional one-to-many with {@code @JoinColumn} on the
     * child — JPA owns the {@code lead_id} FK from the {@link LeadNoteJpaEntity}
     * side without a back-reference. EAGER fetch is acceptable: notes per lead
     * is small (admin-authored). Cascade ALL + orphan removal binds note
     * lifecycle to the parent lead.
     */
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "lead_id", nullable = false, updatable = false)
    @Builder.Default
    private List<LeadNoteJpaEntity> notes = new ArrayList<>();
}
