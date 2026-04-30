package com.itsolutions.domain.email.port.out;

import com.itsolutions.domain.email.model.EmailTemplate;

import java.util.Optional;

/**
 * Outbound port for resolving email templates by code (V1: {@code email_templates.name})
 * and locale.
 *
 * <p>The V1 schema stores PL and EN copies side-by-side (one row per template, with
 * {@code subject_pl/subject_en/body_pl/body_en}). The adapter reconciles this onto the
 * domain's per-locale value-object shape — see
 * {@link com.itsolutions.adapter.out.persistence.email.EmailTemplateRepositoryAdapter}.</p>
 */
public interface EmailTemplateRepository {

    Optional<EmailTemplate> findByCodeAndLocale(String code, String locale);
}
