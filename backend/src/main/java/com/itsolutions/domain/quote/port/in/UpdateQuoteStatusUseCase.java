package com.itsolutions.domain.quote.port.in;

import com.itsolutions.domain.quote.model.QuoteStatus;

import java.util.UUID;

/**
 * Use case for updating quote request status.
 */
public interface UpdateQuoteStatusUseCase {

    /**
     * Update the status of a quote request.
     *
     * @param quoteId Quote request ID
     * @param status New status
     */
    void updateStatus(UUID quoteId, QuoteStatus status);

    /**
     * Start reviewing quote.
     */
    void startReview(UUID quoteId);

    /**
     * Mark quote as accepted.
     */
    void markAccepted(UUID quoteId);

    /**
     * Mark quote as rejected.
     */
    void markRejected(UUID quoteId);

    /**
     * Mark as spam.
     */
    void markAsSpam(UUID quoteId);

    /**
     * Add internal notes to quote.
     */
    void addNotes(UUID quoteId, String notes);
}
