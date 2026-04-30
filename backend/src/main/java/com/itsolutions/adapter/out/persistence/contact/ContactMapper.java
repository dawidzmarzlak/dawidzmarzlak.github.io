package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import org.springframework.stereotype.Component;

/**
 * Mapper between {@link ContactRequest} (domain) and {@link ContactJpaEntity} (persistence).
 *
 * <p>The domain model is built via Lombok {@code @Builder} with mostly {@code final} fields,
 * so MapStruct cannot generate setters into it. We therefore implement the mapping by hand
 * and rely on the builders on both sides — this is the explicit fallback the plan describes.</p>
 *
 * <p>Note the asymmetry: the domain field is {@code replyContent} while the JPA column is
 * {@code reply_message}. Both directions translate the name carefully.</p>
 *
 * <p>{@code quoteTotal} and {@code quotePayload} live on the JPA entity only; the current
 * domain model does not track them, so they are intentionally not mapped.</p>
 */
@Component
public class ContactMapper {

    public ContactJpaEntity toEntity(ContactRequest d) {
        if (d == null) {
            return null;
        }
        return ContactJpaEntity.builder()
                .id(d.getId())
                .name(d.getName())
                .email(d.getEmail())
                .phone(d.getPhone())
                .company(d.getCompany())
                .subject(d.getSubject())
                .message(d.getMessage())
                .status(d.getStatus())
                .locale(d.getLocale())
                .ipAddress(d.getIpAddress())
                .userAgent(d.getUserAgent())
                .createdAt(d.getCreatedAt())
                .updatedAt(d.getUpdatedAt())
                .repliedAt(d.getRepliedAt())
                .repliedBy(d.getRepliedBy())
                .replyMessage(d.getReplyContent())
                .build();
    }

    public ContactRequest toDomain(ContactJpaEntity e) {
        if (e == null) {
            return null;
        }
        return ContactRequest.builder()
                .id(e.getId())
                .name(e.getName())
                .email(e.getEmail())
                .phone(e.getPhone())
                .company(e.getCompany())
                .subject(e.getSubject())
                .message(e.getMessage())
                .status(e.getStatus())
                .locale(e.getLocale())
                .ipAddress(e.getIpAddress())
                .userAgent(e.getUserAgent())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .repliedAt(e.getRepliedAt())
                .repliedBy(e.getRepliedBy())
                .replyContent(e.getReplyMessage())
                .build();
    }
}
