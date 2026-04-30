package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;
import com.itsolutions.domain.contact.port.out.ContactRepository;
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
 * Integration test for the Contact persistence adapter.
 *
 * <p>Uses Testcontainers to spin up a real Postgres 16 (matching production), runs Flyway
 * (V1 + V2 + V3) and exercises the full {@code save → findById} round trip through the
 * domain port {@link ContactRepository}.</p>
 *
 * <p>{@link DataJpaTest} keeps the loaded Spring context narrow (entities + Spring Data
 * + Flyway) and the imported beans wire the adapter + MapStruct-generated mapper.</p>
 */
@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({ContactRepositoryAdapter.class, ContactMapper.class})
class ContactRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    ContactRepository repository;

    @Test
    void saves_and_loads_contact() {
        ContactRequest c = ContactRequest.create(
                "Jan Kowalski",
                "jan@example.com",
                null,
                "Acme",
                "Brief",
                "Potrzebuję strony",
                "pl",
                "127.0.0.1",
                "test-agent"
        );

        ContactRequest saved = repository.save(c);

        Optional<ContactRequest> loaded = repository.findById(saved.getId());
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getEmail()).isEqualTo("jan@example.com");
        assertThat(loaded.get().getStatus()).isEqualTo(ContactStatus.NEW);
        assertThat(loaded.get().getName()).isEqualTo("Jan Kowalski");
        assertThat(loaded.get().getCompany()).isEqualTo("Acme");
        assertThat(loaded.get().getLocale()).isEqualTo("pl");
    }
}
