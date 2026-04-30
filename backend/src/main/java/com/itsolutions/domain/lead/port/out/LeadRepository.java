package com.itsolutions.domain.lead.port.out;

import com.itsolutions.domain.lead.model.Lead;
import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Outbound port for persisting and querying {@link Lead} aggregates.
 *
 * <p>{@link Lead} owns a list of {@link com.itsolutions.domain.lead.model.LeadNote}
 * children. The application service mutates the aggregate via
 * {@code lead.addNote(note); repository.save(lead);} — there is intentionally no
 * separate {@code addNote} port method. The persistence adapter wires the
 * {@code lead_notes} child table via JPA cascade.</p>
 */
public interface LeadRepository {

    Lead save(Lead lead);

    Optional<Lead> findById(UUID id);

    Optional<Lead> findByEmail(String email);

    List<Lead> findAll(LeadStatus status,
                       LeadSource source,
                       UUID assignedTo,
                       String search,
                       int page,
                       int size,
                       String sortBy,
                       String sortDirection);

    long count(LeadStatus status, LeadSource source, UUID assignedTo, String search);
}
