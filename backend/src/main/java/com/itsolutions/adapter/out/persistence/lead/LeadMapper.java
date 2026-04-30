package com.itsolutions.adapter.out.persistence.lead;

import com.itsolutions.domain.lead.model.Lead;
import com.itsolutions.domain.lead.model.LeadNote;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Hand-written mapper between {@link Lead} / {@link LeadNote} (Lombok-immutable
 * domain) and {@link LeadJpaEntity} / {@link LeadNoteJpaEntity}; MapStruct can't
 * generate setters into the immutable domain builder, and an all-{@code default}-method
 * MapStruct {@code @Mapper} interface leaves Spring with no bean.
 *
 * <p>No field-name asymmetries between domain and JPA — {@link Lead} / {@link LeadNote}
 * fields map 1:1 to entity fields and SQL columns.</p>
 *
 * <p>Reserved for future use (NOT mapped):
 * <ul>
 *   <li>entity-only: {@code leads.score} (NUMERIC, V1) — no domain field; left for a
 *       future scoring feature.</li>
 * </ul></p>
 *
 * <p>{@link LeadNote} children are mapped both ways. Notes are managed via cascade on
 * save — the application service calls {@code lead.addNote(note); repository.save(lead);}
 * and the parent entity owns the FK assignment via
 * {@code @OneToMany @JoinColumn(name = "lead_id", nullable = false, updatable = false)}.</p>
 *
 * <p>Mapping {@link Lead#getNotes()} requires care: the domain returns
 * {@link java.util.Collections#unmodifiableList} which cannot be handed to Hibernate.
 * This mapper always copies into a fresh {@link ArrayList}.</p>
 */
@Component
public class LeadMapper {

    public LeadJpaEntity toEntity(Lead d) {
        if (d == null) {
            return null;
        }
        return LeadJpaEntity.builder()
                .id(d.getId())
                .name(d.getName())
                .email(d.getEmail())
                .phone(d.getPhone())
                .company(d.getCompany())
                .source(d.getSource())
                .status(d.getStatus())
                .estimatedValue(d.getEstimatedValue())
                .currency(d.getCurrency())
                .tags(d.getTags())
                .assignedTo(d.getAssignedTo())
                .chatSessionId(d.getChatSessionId())
                .contactRequestId(d.getContactRequestId())
                .quoteRequestId(d.getQuoteRequestId())
                .createdAt(d.getCreatedAt())
                .updatedAt(d.getUpdatedAt())
                .contactedAt(d.getContactedAt())
                .convertedAt(d.getConvertedAt())
                .notes(toEntityNotes(d.getNotes()))
                .build();
    }

    public Lead toDomain(LeadJpaEntity e) {
        if (e == null) {
            return null;
        }
        return Lead.builder()
                .id(e.getId())
                .name(e.getName())
                .email(e.getEmail())
                .phone(e.getPhone())
                .company(e.getCompany())
                .source(e.getSource())
                .status(e.getStatus())
                .estimatedValue(e.getEstimatedValue())
                .currency(e.getCurrency())
                .tags(e.getTags())
                .assignedTo(e.getAssignedTo())
                .chatSessionId(e.getChatSessionId())
                .contactRequestId(e.getContactRequestId())
                .quoteRequestId(e.getQuoteRequestId())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .contactedAt(e.getContactedAt())
                .convertedAt(e.getConvertedAt())
                .notes(toDomainNotes(e.getNotes(), e.getId()))
                .build();
    }

    private LeadNoteJpaEntity toNoteEntity(LeadNote n) {
        if (n == null) {
            return null;
        }
        return LeadNoteJpaEntity.builder()
                .id(n.getId())
                .content(n.getContent())
                .createdBy(n.getCreatedBy())
                .createdAt(n.getCreatedAt())
                .build();
    }

    private LeadNote toNoteDomain(LeadNoteJpaEntity n, java.util.UUID parentLeadId) {
        if (n == null) {
            return null;
        }
        // The entity's leadId column is insertable=false/updatable=false, so on a freshly
        // saved aggregate it may be null until reload. Fall back to the parent's id when
        // present so the domain LeadNote always exposes a leadId.
        java.util.UUID leadId = n.getLeadId() != null ? n.getLeadId() : parentLeadId;
        return LeadNote.builder()
                .id(n.getId())
                .leadId(leadId)
                .content(n.getContent())
                .createdBy(n.getCreatedBy())
                .createdAt(n.getCreatedAt())
                .build();
    }

    private List<LeadNoteJpaEntity> toEntityNotes(List<LeadNote> source) {
        List<LeadNoteJpaEntity> out = new ArrayList<>();
        if (source == null) {
            return out;
        }
        for (LeadNote n : source) {
            out.add(toNoteEntity(n));
        }
        return out;
    }

    private List<LeadNote> toDomainNotes(List<LeadNoteJpaEntity> source, java.util.UUID parentLeadId) {
        List<LeadNote> out = new ArrayList<>();
        if (source == null) {
            return out;
        }
        for (LeadNoteJpaEntity n : source) {
            out.add(toNoteDomain(n, parentLeadId));
        }
        return out;
    }
}
