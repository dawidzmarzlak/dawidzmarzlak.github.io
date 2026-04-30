package com.itsolutions.domain.quote.port.out;

import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.model.ServiceType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Outbound port for persisting and querying quote requests.
 */
public interface QuoteRepository {

    QuoteRequest save(QuoteRequest quote);

    Optional<QuoteRequest> findById(UUID id);

    Optional<QuoteRequest> findByReferenceNumber(String reference);

    List<QuoteRequest> findAll(QuoteStatus status,
                               ServiceType serviceType,
                               String search,
                               int page,
                               int size,
                               String sortBy,
                               String sortDirection);

    long count(QuoteStatus status, ServiceType serviceType, String search);

    /**
     * Generate a new unique quote reference number using the {@code quote_reference_seq}
     * Postgres sequence. Returned format: {@code Q-NNNNNN} (zero-padded to 6 digits).
     */
    String generateReferenceNumber();
}
