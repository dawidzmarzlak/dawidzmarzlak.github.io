package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import org.springframework.stereotype.Component;

/**
 * Hand-written mapper between {@link ContactRequest} (Lombok-immutable domain) and
 * {@link ContactJpaEntity}; MapStruct can't generate setters into the immutable domain builder.
 * The {@code quoteTotal} and {@code quotePayload} columns exist on the JPA entity but NOT in
 * the domain model — they are reserved for future use. When extending the domain to include
 * them, update BOTH {@link #toEntity} and {@link #toDomain}.
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
