package com.itsolutions.domain.lead.model;

/**
 * Source of a lead.
 */
public enum LeadSource {
    /**
     * From chatbot conversation.
     */
    CHAT,

    /**
     * From contact form.
     */
    CONTACT_FORM,

    /**
     * From quote request.
     */
    QUOTE_FORM,

    /**
     * Manual entry by admin.
     */
    MANUAL,

    /**
     * From external referral.
     */
    REFERRAL,

    /**
     * Other source.
     */
    OTHER
}
