package com.itsolutions.domain.lead.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

/**
 * A note attached to a lead.
 */
@Getter
@Builder
public class LeadNote {

    private final UUID id;
    private final UUID leadId;
    private final String content;
    private final UUID createdBy;
    private final Instant createdAt;

    public static LeadNote create(UUID leadId, String content, UUID createdBy) {
        return LeadNote.builder()
                .id(UUID.randomUUID())
                .leadId(leadId)
                .content(content)
                .createdBy(createdBy)
                .createdAt(Instant.now())
                .build();
    }
}
