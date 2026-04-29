package com.itsolutions.domain.quote.model;

/**
 * Status of a quote request.
 */
public enum QuoteStatus {
    /**
     * New quote request, not yet reviewed.
     */
    NEW,

    /**
     * Quote request is being reviewed.
     */
    REVIEWING,

    /**
     * Quote/proposal has been sent.
     */
    QUOTED,

    /**
     * Quote was accepted by client.
     */
    ACCEPTED,

    /**
     * Quote was rejected by client.
     */
    REJECTED,

    /**
     * Quote request expired without response.
     */
    EXPIRED,

    /**
     * Marked as spam.
     */
    SPAM
}
