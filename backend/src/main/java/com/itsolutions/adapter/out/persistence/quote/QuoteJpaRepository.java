package com.itsolutions.adapter.out.persistence.quote;

import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.model.ServiceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuoteJpaRepository extends JpaRepository<QuoteJpaEntity, UUID> {

    Optional<QuoteJpaEntity> findByReferenceNumber(String referenceNumber);

    @Query("""
           SELECT q FROM QuoteJpaEntity q
           WHERE (:status      IS NULL OR q.status = :status)
             AND (:serviceType IS NULL OR q.serviceType = :serviceType)
             AND (:search      IS NULL OR :search = ''
                  OR LOWER(q.name)            LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(q.email)           LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(q.referenceNumber) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    Page<QuoteJpaEntity> search(@Param("status") QuoteStatus status,
                                @Param("serviceType") ServiceType serviceType,
                                @Param("search") String search,
                                Pageable pageable);

    @Query("""
           SELECT COUNT(q) FROM QuoteJpaEntity q
           WHERE (:status      IS NULL OR q.status = :status)
             AND (:serviceType IS NULL OR q.serviceType = :serviceType)
             AND (:search      IS NULL OR :search = ''
                  OR LOWER(q.name)            LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(q.email)           LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(q.referenceNumber) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    long countSearch(@Param("status") QuoteStatus status,
                     @Param("serviceType") ServiceType serviceType,
                     @Param("search") String search);

    @Query(value = "SELECT nextval('quote_reference_seq')", nativeQuery = true)
    Long nextReferenceSeqValue();
}
