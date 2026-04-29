package com.itsolutions.domain.lead.port.in;

import com.itsolutions.domain.lead.model.LeadSource;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Use case for creating a new lead.
 */
public interface CreateLeadUseCase {

    /**
     * Create a new lead.
     */
    CreateLeadResult execute(CreateLeadCommand command);

    @Getter
    @Builder
    class CreateLeadCommand {
        private final String name;
        private final String email;
        private final String phone;
        private final String company;
        private final LeadSource source;
        private final BigDecimal estimatedValue;
        private final String currency;
        private final UUID chatSessionId;
        private final UUID contactRequestId;
        private final UUID quoteRequestId;
    }

    @Getter
    @Builder
    class CreateLeadResult {
        private final UUID leadId;
        private final boolean success;
    }
}
