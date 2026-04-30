package com.itsolutions.adapter.out.persistence.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Spring Data JPA repository for {@link AdminUserJpaEntity}.
 *
 * <p>Surface deliberately narrow — the only lookup the auth flow needs is
 * {@link #findByEmail(String)} (driven by
 * {@link com.itsolutions.infrastructure.security.AdminUserDetailsService}).</p>
 */
@Repository
public interface AdminUserJpaRepository extends JpaRepository<AdminUserJpaEntity, UUID> {
    Optional<AdminUserJpaEntity> findByEmail(String email);
}
