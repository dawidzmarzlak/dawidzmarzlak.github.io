package com.itsolutions.adapter.out.persistence.email;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code email_templates} table.
 *
 * <p>V1 schema stores PL and EN copies of subject/body side-by-side on a single
 * row keyed by {@link #name} (UNIQUE). The locale split into a per-locale
 * domain value-object happens in
 * {@link EmailTemplateRepositoryAdapter#findByCodeAndLocale(String, String)}.</p>
 */
@Entity
@Table(name = "email_templates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailTemplateJpaEntity {

    @Id
    private UUID id;

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @Column(name = "subject_pl")
    private String subjectPl;

    @Column(name = "subject_en")
    private String subjectEn;

    @Column(name = "body_pl", columnDefinition = "TEXT")
    private String bodyPl;

    @Column(name = "body_en", columnDefinition = "TEXT")
    private String bodyEn;

    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private String variables;

    private boolean active;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;
}
