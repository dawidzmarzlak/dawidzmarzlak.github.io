package com.itsolutions.adapter.out.persistence.lead;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
 * JPA entity mapped to the {@code lead_notes} child table.
 *
 * <p>The parent-child relationship is owned by {@link LeadJpaEntity} via a unidirectional
 * {@code @OneToMany} with {@code @JoinColumn(name = "lead_id")}; this entity therefore has
 * no inverse {@code lead} reference. The {@code lead_id} column on this entity is marked
 * {@code insertable=false, updatable=false} so Hibernate does not attempt to write the FK
 * twice (once via the parent's join column, once via this column).</p>
 */
@Entity
@Table(name = "lead_notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadNoteJpaEntity {

    @Id
    private UUID id;

    /**
     * FK to {@code leads.id}. Managed by the parent's
     * {@code @OneToMany @JoinColumn(name = "lead_id")} — kept here as a
     * read-only mirror so domain mappers can populate {@link com.itsolutions.domain.lead.model.LeadNote#getLeadId()}.
     */
    @Column(name = "lead_id", nullable = false, insertable = false, updatable = false)
    private UUID leadId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_by")
    private UUID createdBy;

    @Column(name = "created_at")
    private Instant createdAt;
}
