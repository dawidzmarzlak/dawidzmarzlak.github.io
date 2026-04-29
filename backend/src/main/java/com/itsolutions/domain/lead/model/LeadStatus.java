package com.itsolutions.domain.lead.model;

/**
 * Status of a lead.
 */
public enum LeadStatus {
    /**
     * New lead, not yet contacted.
     */
    NEW,

    /**
     * Lead has been contacted.
     */
    CONTACTED,

    /**
     * Lead is qualified and interested.
     */
    QUALIFIED,

    /**
     * Proposal has been sent.
     */
    PROPOSAL_SENT,

    /**
     * Lead converted to customer.
     */
    CONVERTED,

    /**
     * Lead is not interested or unqualified.
     */
    LOST,

    /**
     * Marked as spam.
     */
    SPAM
}
