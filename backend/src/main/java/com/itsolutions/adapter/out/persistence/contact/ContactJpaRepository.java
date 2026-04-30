package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactJpaRepository extends JpaRepository<ContactJpaEntity, UUID> {

    @Query("""
           SELECT c FROM ContactJpaEntity c
           WHERE (:status IS NULL OR c.status = :status)
             AND (:search IS NULL OR :search = ''
                  OR LOWER(c.name)  LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    Page<ContactJpaEntity> search(@Param("status") ContactStatus status,
                                  @Param("search") String search,
                                  Pageable pageable);

    @Query("""
           SELECT COUNT(c) FROM ContactJpaEntity c
           WHERE (:status IS NULL OR c.status = :status)
             AND (:search IS NULL OR :search = ''
                  OR LOWER(c.name)  LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    long countSearch(@Param("status") ContactStatus status,
                     @Param("search") String search);
}
