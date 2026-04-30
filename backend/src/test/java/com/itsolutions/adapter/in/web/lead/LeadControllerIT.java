package com.itsolutions.adapter.in.web.lead;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class LeadControllerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
        r.add("jwt.secret", () -> "dGVzdC1qd3Qtc2VjcmV0LWtleS1mb3ItYXV0aC1jb250cm9sbGVyLWl0LXRlc3RzLW11c3QtYmUtMzItYnl0ZXM=");
        r.add("spring.mail.host", () -> "localhost");
        r.add("spring.mail.port", () -> 3025);
        r.add("turnstile.secret-key", () -> "1x0000000000000000000000000000000AA");
    }

    @Autowired MockMvc mvc;

    @Test
    void creates_lead_from_contact_form() throws Exception {
        mvc.perform(post("/api/v1/leads")
                .contentType(APPLICATION_JSON)
                .content("""
                    {
                      "name":"Anna Test",
                      "email":"anna@test.pl",
                      "phone":"+48 555 666 777",
                      "company":"Acme",
                      "source":"contact_form"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.leadId").exists())
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void rejects_request_without_email() throws Exception {
        mvc.perform(post("/api/v1/leads")
                .contentType(APPLICATION_JSON)
                .content("""
                    {"name":"Anna","email":""}
                    """))
            .andExpect(status().is4xxClientError());
    }

    @Test
    void rejects_invalid_email_format() throws Exception {
        mvc.perform(post("/api/v1/leads")
                .contentType(APPLICATION_JSON)
                .content("""
                    {"name":"Anna","email":"not-an-email"}
                    """))
            .andExpect(status().is4xxClientError());
    }

    @Test
    void unknown_source_defaults_to_other() throws Exception {
        mvc.perform(post("/api/v1/leads")
                .contentType(APPLICATION_JSON)
                .content("""
                    {"name":"Anna","email":"anna2@test.pl","source":"facebook-ads"}
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
