package com.itsolutions.domain.contact.model;

/**
 * Status of a contact request.
 */
public enum ContactStatus {
    /**
     * New contact request, not yet reviewed.
     */
    NEW,

    /**
     * Contact request has been read by admin.
     */
    READ,

    /**
     * Reply has been sent to the requester.
     */
    REPLIED,

    /**
     * Contact request has been archived.
     */
    ARCHIVED,

    /**
     * Marked as spam.
     */
    SPAM
}
