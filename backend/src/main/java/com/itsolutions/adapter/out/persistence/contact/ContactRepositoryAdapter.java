package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;
import com.itsolutions.domain.contact.port.out.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Outbound adapter implementing {@link ContactRepository} on top of Spring Data JPA.
 */
@Component
@RequiredArgsConstructor
public class ContactRepositoryAdapter implements ContactRepository {

    private final ContactJpaRepository jpa;
    private final ContactMapper mapper;

    @Override
    public ContactRequest save(ContactRequest contact) {
        ContactJpaEntity saved = jpa.save(mapper.toEntity(contact));
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<ContactRequest> findById(UUID id) {
        return jpa.findById(id).map(mapper::toDomain);
    }

    @Override
    public List<ContactRequest> findAll(ContactStatus status,
                                        String search,
                                        int page,
                                        int size,
                                        String sortBy,
                                        String sortDirection) {
        Sort.Direction dir = "asc".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        String prop = (sortBy != null && !sortBy.isBlank()) ? sortBy : "createdAt";
        return jpa.search(status, search, PageRequest.of(page, size, Sort.by(dir, prop)))
                .map(mapper::toDomain)
                .getContent();
    }

    @Override
    public long count(ContactStatus status, String search) {
        return jpa.countSearch(status, search);
    }
}
