package com.itsolutions.adapter.out.persistence.quote;

import com.itsolutions.domain.quote.model.ProjectSize;
import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteRequest.QuoteAttachment;
import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.model.ServiceType;
import com.itsolutions.domain.quote.port.out.QuoteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test for the Quote persistence adapter.
 *
 * <p>Mirrors {@code ContactRepositoryIT}: real Postgres 16 via Testcontainers, narrow
 * {@link DataJpaTest} context, Flyway runs V1..V4. Exercises the full domain port:
 * round-trip save/load, lookup by reference number, sequence-backed reference generation,
 * and attachment cascade persistence.</p>
 */
@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({QuoteRepositoryAdapter.class, QuoteMapper.class})
class QuoteRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    QuoteRepository repository;

    @Autowired
    QuoteJpaRepository jpa;

    private static QuoteRequest sampleQuote() {
        return QuoteRequest.create(
                "Anna Nowak",
                "anna@example.com",
                "+48 600 700 800",
                "Acme Sp. z o.o.",
                ServiceType.WEBSITE,
                ProjectSize.MEDIUM,
                "10000-25000 PLN",
                "2 months",
                "Need a multi-page company site with CMS.",
                "pl",
                "127.0.0.1",
                "test-agent"
        );
    }

    @Test
    void saves_and_loads_quote() {
        QuoteRequest q = sampleQuote();

        QuoteRequest saved = repository.save(q);

        Optional<QuoteRequest> loaded = repository.findById(saved.getId());
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getEmail()).isEqualTo("anna@example.com");
        assertThat(loaded.get().getStatus()).isEqualTo(QuoteStatus.NEW);
        assertThat(loaded.get().getServiceType()).isEqualTo(ServiceType.WEBSITE);
        assertThat(loaded.get().getProjectSize()).isEqualTo(ProjectSize.MEDIUM);
        assertThat(loaded.get().getTimeline()).isEqualTo("2 months");
    }

    @Test
    void finds_by_reference_number() {
        QuoteRequest saved = repository.save(sampleQuote());

        // Reference number is adapter-managed; read it back from the entity table so
        // the test does not depend on the domain exposing it.
        String reference = jpa.findById(saved.getId()).orElseThrow().getReferenceNumber();
        assertThat(reference).startsWith("Q-");

        Optional<QuoteRequest> loaded = repository.findByReferenceNumber(reference);
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getId()).isEqualTo(saved.getId());
    }

    @Test
    void generates_unique_reference_numbers() {
        String first = repository.generateReferenceNumber();
        String second = repository.generateReferenceNumber();

        assertThat(first).matches("Q-\\d{6}");
        assertThat(second).matches("Q-\\d{6}");
        assertThat(first).isNotEqualTo(second);
    }

    @Test
    void persists_attachments() {
        QuoteRequest q = sampleQuote();
        q.addAttachment(QuoteAttachment.create(
                "brief.pdf",
                "application/pdf",
                12345L,
                "uploads/abc/brief.pdf"
        ));

        QuoteRequest saved = repository.save(q);

        Optional<QuoteRequest> loaded = repository.findById(saved.getId());
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getAttachments()).hasSize(1);
        QuoteAttachment a = loaded.get().getAttachments().get(0);
        assertThat(a.getFileName()).isEqualTo("brief.pdf");
        assertThat(a.getContentType()).isEqualTo("application/pdf");
        assertThat(a.getFileSize()).isEqualTo(12345L);
        assertThat(a.getStoragePath()).isEqualTo("uploads/abc/brief.pdf");
    }
}
