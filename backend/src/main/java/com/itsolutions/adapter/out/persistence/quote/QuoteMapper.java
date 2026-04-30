package com.itsolutions.adapter.out.persistence.quote;

import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteRequest.QuoteAttachment;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Hand-written mapper between {@link QuoteRequest} (Lombok-immutable domain) and
 * {@link QuoteJpaEntity}; MapStruct can't generate setters into the immutable domain
 * builder, and an all-{@code default}-method MapStruct {@code @Mapper} interface
 * leaves Spring with no bean.
 *
 * <p>Field-name asymmetries (handled both ways):
 * <ul>
 *   <li>domain {@code timeline}      ↔ entity {@code deadline}</li>
 *   <li>domain {@code internalNotes} ↔ entity {@code quoteNotes}</li>
 *   <li>domain {@code serviceType}   ↔ entity {@code serviceType} (column {@code service})</li>
 *   <li>domain {@code projectSize}   ↔ entity {@code projectSize} (column {@code project_size})</li>
 * </ul></p>
 *
 * <p>Columns / fields intentionally NOT mapped (out of scope for B2):
 * <ul>
 *   <li>DB-only: {@code turnstile_verified}, {@code lead_id}, {@code accepted_at} —
 *       reserved for future use; not present on the entity at all.</li>
 *   <li>Adapter-internal: {@code reference_number} is required NOT NULL by the V1
 *       schema but absent from the domain. The
 *       {@link QuoteRepositoryAdapter#save adapter's save} populates it via
 *       {@link QuoteRepositoryAdapter#generateReferenceNumber()} when missing,
 *       and round-trips it through the entity for {@code findByReferenceNumber}.</li>
 * </ul></p>
 *
 * <p>{@link QuoteAttachment} value objects are mapped both ways, including the generated
 * {@code id} and {@code uploadedAt} so JPA preserves identity across reloads.</p>
 */
@Component
public class QuoteMapper {

    public QuoteJpaEntity toEntity(QuoteRequest d) {
        if (d == null) {
            return null;
        }
        QuoteJpaEntity e = QuoteJpaEntity.builder()
                .id(d.getId())
                .name(d.getName())
                .email(d.getEmail())
                .phone(d.getPhone())
                .company(d.getCompany())
                .serviceType(d.getServiceType())
                .projectSize(d.getProjectSize())
                .budget(d.getBudget())
                .deadline(d.getTimeline())
                .description(d.getDescription())
                .locale(d.getLocale())
                .ipAddress(d.getIpAddress())
                .userAgent(d.getUserAgent())
                .status(d.getStatus())
                .quotedAmount(d.getQuotedAmount())
                .quotedCurrency(d.getQuotedCurrency())
                .quoteNotes(d.getInternalNotes())
                .createdAt(d.getCreatedAt())
                .updatedAt(d.getUpdatedAt())
                .quotedAt(d.getQuotedAt())
                .quotedBy(d.getQuotedBy())
                .attachments(toEntityAttachments(d.getAttachments()))
                .build();
        return e;
    }

    public QuoteRequest toDomain(QuoteJpaEntity e) {
        if (e == null) {
            return null;
        }
        return QuoteRequest.builder()
                .id(e.getId())
                .name(e.getName())
                .email(e.getEmail())
                .phone(e.getPhone())
                .company(e.getCompany())
                .serviceType(e.getServiceType())
                .projectSize(e.getProjectSize())
                .budget(e.getBudget())
                .timeline(e.getDeadline())
                .description(e.getDescription())
                .locale(e.getLocale())
                .ipAddress(e.getIpAddress())
                .userAgent(e.getUserAgent())
                .status(e.getStatus())
                .quotedAmount(e.getQuotedAmount())
                .quotedCurrency(e.getQuotedCurrency())
                .internalNotes(e.getQuoteNotes())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .quotedAt(e.getQuotedAt())
                .quotedBy(e.getQuotedBy())
                .attachments(toDomainAttachments(e.getAttachments()))
                .build();
    }

    private List<QuoteAttachmentJpaEntity> toEntityAttachments(List<QuoteAttachment> source) {
        List<QuoteAttachmentJpaEntity> out = new ArrayList<>();
        if (source == null) {
            return out;
        }
        for (QuoteAttachment a : source) {
            out.add(QuoteAttachmentJpaEntity.builder()
                    .id(a.getId())
                    .fileName(a.getFileName())
                    .contentType(a.getContentType())
                    .fileSize(a.getFileSize())
                    .storagePath(a.getStoragePath())
                    .uploadedAt(a.getUploadedAt())
                    .build());
        }
        return out;
    }

    private List<QuoteAttachment> toDomainAttachments(List<QuoteAttachmentJpaEntity> source) {
        List<QuoteAttachment> out = new ArrayList<>();
        if (source == null) {
            return out;
        }
        for (QuoteAttachmentJpaEntity a : source) {
            out.add(QuoteAttachment.builder()
                    .id(a.getId())
                    .fileName(a.getFileName())
                    .contentType(a.getContentType())
                    .fileSize(a.getFileSize() != null ? a.getFileSize() : 0L)
                    .storagePath(a.getStoragePath())
                    .uploadedAt(a.getUploadedAt())
                    .build());
        }
        return out;
    }
}
