package com.itsolutions.domain.email.model;

/**
 * Status of an email send attempt.
 */
public enum EmailLogStatus {
    /**
     * Email was sent successfully.
     */
    SENT,

    /**
     * Email sending failed.
     */
    FAILED,

    /**
     * Email is queued for sending.
     */
    QUEUED,

    /**
     * Email was bounced.
     */
    BOUNCED
}
