package com.itsolutions.adapter.out.persistence.quote;

import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.model.ServiceType;
import com.itsolutions.domain.quote.port.out.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Outbound adapter implementing {@link QuoteRepository} on top of Spring Data JPA.
 *
 * <p>The {@code reference_number} column is NOT NULL UNIQUE in the V1 schema but is
 * not represented on the domain {@link QuoteRequest}. When saving, this adapter
 * generates a reference via {@link #generateReferenceNumber()} if the underlying
 * entity has none. The reference is preserved across update saves of an existing
 * row by reading the persisted entity first.</p>
 */
@Component
@RequiredArgsConstructor
public class QuoteRepositoryAdapter implements QuoteRepository {

    private static final Set<String> ALLOWED_SORT = Set.of(
            "createdAt", "updatedAt", "name", "email", "status",
            "quotedAt", "referenceNumber"
    );

    private final QuoteJpaRepository jpa;
    private final QuoteMapper mapper;

    @Override
    public QuoteRequest save(QuoteRequest quote) {
        QuoteJpaEntity entity = mapper.toEntity(quote);

        // Reference number is adapter-managed (not on the domain model). Preserve the
        // existing reference for updates; assign a new one for fresh inserts.
        if (entity.getReferenceNumber() == null || entity.getReferenceNumber().isBlank()) {
            String existing = jpa.findById(entity.getId())
                    .map(QuoteJpaEntity::getReferenceNumber)
                    .orElse(null);
            entity.setReferenceNumber(existing != null ? existing : generateReferenceNumber());
        }

        QuoteJpaEntity saved = jpa.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<QuoteRequest> findById(UUID id) {
        return jpa.findById(id).map(mapper::toDomain);
    }

    @Override
    public Optional<QuoteRequest> findByReferenceNumber(String reference) {
        return jpa.findByReferenceNumber(reference).map(mapper::toDomain);
    }

    @Override
    public List<QuoteRequest> findAll(QuoteStatus status,
                                      ServiceType serviceType,
                                      String search,
                                      int page,
                                      int size,
                                      String sortBy,
                                      String sortDirection) {
        Sort.Direction dir = "asc".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        String prop = (sortBy != null && ALLOWED_SORT.contains(sortBy)) ? sortBy : "createdAt";
        return jpa.search(status, serviceType, search, PageRequest.of(page, size, Sort.by(dir, prop)))
                .map(mapper::toDomain)
                .getContent();
    }

    @Override
    public long count(QuoteStatus status, ServiceType serviceType, String search) {
        return jpa.countSearch(status, serviceType, search);
    }

    @Override
    public String generateReferenceNumber() {
        Long n = jpa.nextReferenceSeqValue();
        return "Q-" + String.format("%06d", n);
    }
}
