package com.itsolutions.adapter.out.persistence.email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmailTemplateJpaRepository extends JpaRepository<EmailTemplateJpaEntity, UUID> {

    Optional<EmailTemplateJpaEntity> findByName(String name);
}
