package com.itsolutions.domain.contact.port.out;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Outbound port for persisting and querying contact requests.
 */
public interface ContactRepository {

    ContactRequest save(ContactRequest contact);

    Optional<ContactRequest> findById(UUID id);

    List<ContactRequest> findAll(ContactStatus status,
                                 String search,
                                 int page,
                                 int size,
                                 String sortBy,
                                 String sortDirection);

    long count(ContactStatus status, String search);
}
