package com.itsolutions.domain.lead.port.in;

import com.itsolutions.domain.lead.model.LeadStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Use case for updating a lead.
 */
public interface UpdateLeadUseCase {

    /**
     * Update lead info.
     */
    void updateInfo(UUID leadId, UpdateInfoCommand command);

    /**
     * Update lead status.
     */
    void updateStatus(UUID leadId, LeadStatus status);

    /**
     * Assign lead to admin.
     */
    void assignTo(UUID leadId, UUID adminId);

    /**
     * Add note to lead.
     */
    void addNote(UUID leadId, String content, UUID adminId);

    /**
     * Set estimated value.
     */
    void setEstimatedValue(UUID leadId, BigDecimal value, String currency);

    /**
     * Set tags.
     */
    void setTags(UUID leadId, String tags);

    @Getter
    @Builder
    class UpdateInfoCommand {
        private final String name;
        private final String email;
        private final String phone;
        private final String company;
    }
}
