package com.itsolutions.domain.quote.port.in;

import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.model.ServiceType;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Use case for retrieving quote requests.
 */
public interface GetQuotesUseCase {

    /**
     * Get paginated list of quote requests.
     */
    QuoteListResult getQuotes(QuoteQuery query);

    /**
     * Get single quote request by ID.
     */
    Optional<QuoteRequest> getQuoteById(UUID id);

    @Getter
    @Builder
    class QuoteQuery {
        private final QuoteStatus status;
        private final ServiceType serviceType;
        private final String search;
        private final int page;
        private final int size;
        private final String sortBy;
        private final String sortDirection;
    }

    @Getter
    @Builder
    class QuoteListResult {
        private final List<QuoteRequest> quotes;
        private final int totalElements;
        private final int totalPages;
        private final int currentPage;
    }
}
