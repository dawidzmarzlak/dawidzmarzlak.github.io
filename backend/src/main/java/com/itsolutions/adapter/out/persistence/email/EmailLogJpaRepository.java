package com.itsolutions.adapter.out.persistence.email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EmailLogJpaRepository extends JpaRepository<EmailLogJpaEntity, UUID> {
}
