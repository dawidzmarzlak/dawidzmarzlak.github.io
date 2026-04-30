package com.itsolutions.adapter.out.persistence.admin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code admin_users} table (V1 schema).
 *
 * <p>Read by {@link com.itsolutions.infrastructure.security.AdminUserDetailsService}
 * during authentication: the {@code passwordHash} feeds the BCrypt check via the
 * {@code DaoAuthenticationProvider} configured in {@code SecurityConfig}, and
 * {@code role} (stored lowercase: {@code 'admin'} / {@code 'viewer'}) is upcased
 * to a {@code ROLE_X} authority.</p>
 *
 * <p>{@code lastLogin} is touched by the auth flow on every successful login.</p>
 */
@Entity
@Table(name = "admin_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUserJpaEntity {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    private String name;

    /**
     * Stored lowercase ('admin', 'viewer'). {@code AdminUserDetailsService} upcases
     * for the {@code ROLE_X} authority.
     */
    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "last_login")
    private Instant lastLogin;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}
