package com.itsolutions.adapter.out.persistence.email;

import com.itsolutions.domain.email.model.EmailTemplate;
import com.itsolutions.domain.email.port.out.EmailTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Outbound adapter implementing {@link EmailTemplateRepository} on top of Spring Data JPA.
 *
 * <p>V1 schema stores PL and EN copies on a single row keyed by {@code name}. The adapter
 * translates a (code, locale) lookup into a single row fetch + locale-appropriate column
 * picking, producing a domain {@link EmailTemplate} populated for one locale only.</p>
 *
 * <p>The V1 {@code variables} column (JSONB) is intentionally not surfaced on the domain
 * model — variable substitution happens upstream by the renderer using the caller's map.</p>
 */
@Component
@RequiredArgsConstructor
public class EmailTemplateRepositoryAdapter implements EmailTemplateRepository {

    private final EmailTemplateJpaRepository jpa;

    @Override
    public Optional<EmailTemplate> findByCodeAndLocale(String code, String locale) {
        return jpa.findByName(code).map(e -> {
            boolean pl = locale == null || "pl".equalsIgnoreCase(locale);
            return EmailTemplate.builder()
                    .id(e.getId())
                    .code(e.getName())
                    .name(e.getName())
                    .locale(pl ? "pl" : "en")
                    .subject(pl ? e.getSubjectPl() : e.getSubjectEn())
                    .bodyHtml(pl ? e.getBodyPl() : e.getBodyEn())
                    .bodyText(null)
                    .active(e.isActive())
                    .createdAt(e.getCreatedAt())
                    .updatedAt(e.getUpdatedAt())
                    .build();
        });
    }
}
