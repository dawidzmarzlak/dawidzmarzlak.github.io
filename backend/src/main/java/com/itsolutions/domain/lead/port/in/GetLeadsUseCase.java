package com.itsolutions.domain.lead.port.in;

import com.itsolutions.domain.lead.model.Lead;
import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Use case for retrieving leads.
 */
public interface GetLeadsUseCase {

    /**
     * Get paginated list of leads.
     */
    LeadListResult getLeads(LeadQuery query);

    /**
     * Get lead by ID.
     */
    Optional<Lead> getLeadById(UUID id);

    /**
     * Get lead by email.
     */
    Optional<Lead> getLeadByEmail(String email);

    @Getter
    @Builder
    class LeadQuery {
        private final LeadStatus status;
        private final LeadSource source;
        private final UUID assignedTo;
        private final String search;
        private final int page;
        private final int size;
        private final String sortBy;
        private final String sortDirection;
    }

    @Getter
    @Builder
    class LeadListResult {
        private final List<Lead> leads;
        private final int totalElements;
        private final int totalPages;
        private final int currentPage;
    }
}
