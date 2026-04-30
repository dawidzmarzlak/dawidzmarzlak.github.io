package com.itsolutions.adapter.in.web.contact;

import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.util.ServerSetupTest;
import com.itsolutions.adapter.out.persistence.contact.ContactJpaRepository;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class ContactControllerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @RegisterExtension
    static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP);

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);

        r.add("spring.mail.host", () -> "localhost");
        r.add("spring.mail.port", () -> ServerSetupTest.SMTP.getPort());
        r.add("spring.mail.from", () -> "noreply@itsolutions.pl");

        r.add("jwt.secret",
            () -> "dGVzdC1qd3Qtc2VjcmV0LWtleS1mb3ItYXV0aC1jb250cm9sbGVyLWl0LXRlc3RzLW11c3QtYmUtMzItYnl0ZXM=");
        r.add("turnstile.secret-key", () -> "1x0000000000000000000000000000000AA");

        r.add("app.admin.email", () -> "admin@itsolutions.pl");
        r.add("app.admin.url",   () -> "http://localhost:5173");
        r.add("app.public.url",  () -> "http://localhost:3000");
    }

    @Autowired MockMvc mvc;
    @Autowired ContactJpaRepository contactRepo;

    @Test
    void submit_brief_persists_and_sends_admin_and_user_emails() throws Exception {
        long countBefore = contactRepo.count();

        mvc.perform(post("/api/v1/contact")
                .contentType(APPLICATION_JSON)
                .header("Accept-Language", "pl")
                .content("""
                  {
                    "name":"Anna Smoke",
                    "email":"anna.smoke@example.com",
                    "company":"Acme",
                    "subject":"Brief — szacunkowa wycena 14 000 PLN",
                    "message":"Potrzebuję strony wizytówki. Stack Next.js + WordPress."
                  }
                """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.contactId").exists());

        // DB persistence — exactly one new row.
        assertThat(contactRepo.count()).isEqualTo(countBefore + 1);

        // GreenMail receives 2 messages: admin notification + user confirmation.
        await().atMost(5, TimeUnit.SECONDS).untilAsserted(() -> {
            MimeMessage[] msgs = greenMail.getReceivedMessages();
            assertThat(msgs).hasSize(2);
        });

        MimeMessage[] msgs = greenMail.getReceivedMessages();
        // The two recipients should be admin@itsolutions.pl and anna.smoke@example.com.
        var recipients = java.util.stream.Stream.of(msgs)
            .flatMap(m -> {
                try { return java.util.stream.Stream.of(m.getAllRecipients()); }
                catch (Exception e) { return java.util.stream.Stream.empty(); }
            })
            .map(Object::toString)
            .toList();

        assertThat(recipients).contains("admin@itsolutions.pl", "anna.smoke@example.com");
    }

    @Test
    void rejects_request_with_invalid_email_and_does_not_persist_or_email() throws Exception {
        long countBefore = contactRepo.count();

        mvc.perform(post("/api/v1/contact")
                .contentType(APPLICATION_JSON)
                .content("""
                  {"name":"X","email":"not-an-email","message":"hello"}
                """))
            .andExpect(status().is4xxClientError());

        assertThat(contactRepo.count()).isEqualTo(countBefore);
        // Some short window for any erroneous async send (there shouldn't be any).
        Thread.sleep(200);
        // The other test in the class may have left messages in GreenMail; we only
        // assert nothing NEW arrived. GreenMailExtension resets between tests by
        // default (BeforeEachCallback clears mailbox), but if order changes leaks,
        // we tolerate by asserting the count is 0 (post-reset state for this test).
        assertThat(greenMail.getReceivedMessages()).isEmpty();
    }
}
