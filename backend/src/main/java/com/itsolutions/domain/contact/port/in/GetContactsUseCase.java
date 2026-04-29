package com.itsolutions.domain.contact.port.in;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Use case for retrieving contact requests.
 */
public interface GetContactsUseCase {

    /**
     * Get paginated list of contact requests.
     */
    ContactListResult getContacts(ContactQuery query);

    /**
     * Get single contact request by ID.
     */
    Optional<ContactRequest> getContactById(UUID id);

    @Getter
    @Builder
    class ContactQuery {
        private final ContactStatus status;
        private final String search;
        private final int page;
        private final int size;
        private final String sortBy;
        private final String sortDirection;
    }

    @Getter
    @Builder
    class ContactListResult {
        private final List<ContactRequest> contacts;
        private final int totalElements;
        private final int totalPages;
        private final int currentPage;
    }
}
