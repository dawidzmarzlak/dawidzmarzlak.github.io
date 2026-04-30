package com.itsolutions.adapter.out.persistence.lead;

import com.itsolutions.domain.lead.model.Lead;
import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;
import com.itsolutions.domain.lead.port.out.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Outbound adapter implementing {@link LeadRepository} on top of Spring Data JPA.
 *
 * <p>Notes on a {@link Lead} aggregate are persisted via JPA cascade: the application
 * service calls {@code lead.addNote(note); repository.save(lead);} and the parent
 * {@link LeadJpaEntity} owns the {@code lead_id} FK assignment through its
 * {@code @OneToMany @JoinColumn} mapping.</p>
 */
@Component
@RequiredArgsConstructor
public class LeadRepositoryAdapter implements LeadRepository {

    private static final Set<String> ALLOWED_SORT = Set.of(
            "createdAt", "updatedAt", "name", "email", "status", "source",
            "contactedAt", "convertedAt"
    );

    private final LeadJpaRepository jpa;
    private final LeadMapper mapper;

    @Override
    public Lead save(Lead lead) {
        return mapper.toDomain(jpa.save(mapper.toEntity(lead)));
    }

    @Override
    public Optional<Lead> findById(UUID id) {
        return jpa.findById(id).map(mapper::toDomain);
    }

    @Override
    public Optional<Lead> findByEmail(String email) {
        return jpa.findByEmail(email).map(mapper::toDomain);
    }

    @Override
    public List<Lead> findAll(LeadStatus status,
                              LeadSource source,
                              UUID assignedTo,
                              String search,
                              int page,
                              int size,
                              String sortBy,
                              String sortDirection) {
        Sort.Direction dir = "asc".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        String prop = (sortBy != null && ALLOWED_SORT.contains(sortBy)) ? sortBy : "createdAt";
        return jpa.search(status, source, assignedTo, search,
                        PageRequest.of(page, size, Sort.by(dir, prop)))
                .map(mapper::toDomain)
                .getContent();
    }

    @Override
    public long count(LeadStatus status, LeadSource source, UUID assignedTo, String search) {
        return jpa.countSearch(status, source, assignedTo, search);
    }
}
