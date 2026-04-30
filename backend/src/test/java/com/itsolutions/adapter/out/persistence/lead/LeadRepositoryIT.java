package com.itsolutions.adapter.out.persistence.lead;

import com.itsolutions.domain.lead.model.Lead;
import com.itsolutions.domain.lead.model.LeadNote;
import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;
import com.itsolutions.domain.lead.port.out.LeadRepository;
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

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test for the Lead persistence adapter.
 *
 * <p>Mirrors {@code QuoteRepositoryIT}: real Postgres 16 via Testcontainers, narrow
 * {@link DataJpaTest} context, Flyway runs V1..V5. Exercises the full domain port:
 * round-trip save/load, lookup by email, lead_notes cascade persistence (both at
 * create-time and after-save), and the assignedTo filter in findAll.</p>
 */
@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({LeadRepositoryAdapter.class, LeadMapper.class})
class LeadRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    LeadRepository repository;

    private static Lead sampleContactLead(String email) {
        return Lead.createFromContact(
                "Anna Nowak",
                email,
                "+48 600 700 800",
                "Acme Sp. z o.o.",
                UUID.randomUUID()
        );
    }

    @Test
    void saves_and_loads_lead() {
        Lead lead = sampleContactLead("anna@example.com");
        UUID contactRequestId = lead.getContactRequestId();

        Lead saved = repository.save(lead);

        Optional<Lead> loaded = repository.findById(saved.getId());
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getEmail()).isEqualTo("anna@example.com");
        assertThat(loaded.get().getStatus()).isEqualTo(LeadStatus.NEW);
        assertThat(loaded.get().getSource()).isEqualTo(LeadSource.CONTACT_FORM);
        assertThat(loaded.get().getContactRequestId()).isEqualTo(contactRequestId);
    }

    @Test
    void finds_by_email() {
        Lead lead = sampleContactLead("byemail@example.com");
        Lead saved = repository.save(lead);

        Optional<Lead> loaded = repository.findByEmail("byemail@example.com");
        assertThat(loaded).isPresent();
        assertThat(loaded.get().getId()).isEqualTo(saved.getId());
    }

    @Test
    void add_note_to_existing_lead() {
        Lead saved = repository.save(sampleContactLead("withnote@example.com"));
        UUID adminUuid = UUID.randomUUID();

        Lead loaded = repository.findById(saved.getId()).orElseThrow();
        loaded.addNote(LeadNote.create(loaded.getId(), "First contact", adminUuid));
        repository.save(loaded);

        Optional<Lead> reloaded = repository.findById(saved.getId());
        assertThat(reloaded).isPresent();
        assertThat(reloaded.get().getNotes()).hasSize(1);
        LeadNote note = reloaded.get().getNotes().get(0);
        assertThat(note.getContent()).isEqualTo("First contact");
        assertThat(note.getCreatedBy()).isEqualTo(adminUuid);
        assertThat(note.getLeadId()).isEqualTo(saved.getId());
    }

    @Test
    void persists_initial_notes() {
        UUID leadId = UUID.randomUUID();
        UUID adminUuid = UUID.randomUUID();
        Instant now = Instant.now();

        List<LeadNote> initialNotes = new ArrayList<>();
        initialNotes.add(LeadNote.create(leadId, "Initial intake", adminUuid));

        Lead lead = Lead.builder()
                .id(leadId)
                .name("Initial Notes")
                .email("initial@example.com")
                .source(LeadSource.MANUAL)
                .status(LeadStatus.NEW)
                .createdAt(now)
                .updatedAt(now)
                .notes(initialNotes)
                .build();

        Lead saved = repository.save(lead);

        Optional<Lead> reloaded = repository.findById(saved.getId());
        assertThat(reloaded).isPresent();
        assertThat(reloaded.get().getNotes()).hasSize(1);
        assertThat(reloaded.get().getNotes().get(0).getContent()).isEqualTo("Initial intake");
        assertThat(reloaded.get().getNotes().get(0).getLeadId()).isEqualTo(leadId);
    }

    @Test
    void assigned_to_filter_works() {
        UUID admin1 = UUID.randomUUID();
        UUID admin2 = UUID.randomUUID();

        Lead l1 = sampleContactLead("filter1@example.com");
        l1.assignTo(admin1);
        repository.save(l1);

        Lead l2 = sampleContactLead("filter2@example.com");
        l2.assignTo(admin2);
        repository.save(l2);

        List<Lead> forAdmin1 = repository.findAll(null, null, admin1, null, 0, 10, null, null);
        assertThat(forAdmin1).hasSize(1);
        assertThat(forAdmin1.get(0).getEmail()).isEqualTo("filter1@example.com");
        assertThat(forAdmin1.get(0).getAssignedTo()).isEqualTo(admin1);
    }
}
