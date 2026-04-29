package com.itsolutions.domain.contact.port.in;

import com.itsolutions.domain.contact.model.ContactStatus;

import java.util.UUID;

/**
 * Use case for updating contact request status.
 */
public interface UpdateContactStatusUseCase {

    /**
     * Update the status of a contact request.
     *
     * @param contactId Contact request ID
     * @param status New status
     */
    void updateStatus(UUID contactId, ContactStatus status);

    /**
     * Mark contact as read.
     */
    void markAsRead(UUID contactId);

    /**
     * Archive contact request.
     */
    void archive(UUID contactId);

    /**
     * Mark as spam.
     */
    void markAsSpam(UUID contactId);
}
