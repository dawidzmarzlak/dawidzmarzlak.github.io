package com.itsolutions.adapter.out.persistence.lead;

import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LeadJpaRepository extends JpaRepository<LeadJpaEntity, UUID> {

    Optional<LeadJpaEntity> findByEmail(String email);

    @Query("""
           SELECT l FROM LeadJpaEntity l
           WHERE (:status     IS NULL OR l.status = :status)
             AND (:source     IS NULL OR l.source = :source)
             AND (:assignedTo IS NULL OR l.assignedTo = :assignedTo)
             AND (:search     IS NULL OR :search = ''
                  OR LOWER(l.name)    LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(l.email)   LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(l.company) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    Page<LeadJpaEntity> search(@Param("status") LeadStatus status,
                               @Param("source") LeadSource source,
                               @Param("assignedTo") UUID assignedTo,
                               @Param("search") String search,
                               Pageable pageable);

    @Query("""
           SELECT COUNT(l) FROM LeadJpaEntity l
           WHERE (:status     IS NULL OR l.status = :status)
             AND (:source     IS NULL OR l.source = :source)
             AND (:assignedTo IS NULL OR l.assignedTo = :assignedTo)
             AND (:search     IS NULL OR :search = ''
                  OR LOWER(l.name)    LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(l.email)   LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(l.company) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    long countSearch(@Param("status") LeadStatus status,
                     @Param("source") LeadSource source,
                     @Param("assignedTo") UUID assignedTo,
                     @Param("search") String search);
}
