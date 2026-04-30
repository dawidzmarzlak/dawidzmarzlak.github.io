package com.itsolutions.adapter.out.email;

import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetupTest;
import com.itsolutions.adapter.out.persistence.email.EmailLogJpaEntity;
import com.itsolutions.adapter.out.persistence.email.EmailLogJpaRepository;
import com.itsolutions.domain.email.model.EmailLogStatus;
import com.itsolutions.domain.email.model.EmailTemplate;
import com.itsolutions.domain.email.port.out.EmailSender;
import com.itsolutions.domain.email.port.out.EmailTemplateRepository;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * SMTP integration test for {@link SmtpEmailSender}.
 *
 * <p>Pure JUnit 5 (no Spring context) — GreenMail provides an in-process SMTP server,
 * the template repository and email-log repository are Mockito mocks. This keeps the
 * test independent of the persistence stack (no Postgres / Testcontainers needed).</p>
 */
class SmtpEmailSenderTest {

    @RegisterExtension
    static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP);

    private JavaMailSenderImpl javaMailSender(int port) {
        JavaMailSenderImpl jms = new JavaMailSenderImpl();
        jms.setHost("localhost");
        jms.setPort(port);
        return jms;
    }

    @Test
    void sends_simple_email_and_logs_success() throws Exception {
        JavaMailSenderImpl jms = javaMailSender(ServerSetupTest.SMTP.getPort());
        EmailLogJpaRepository logRepo = mock(EmailLogJpaRepository.class);
        when(logRepo.save(any(EmailLogJpaEntity.class))).thenAnswer(inv -> inv.getArgument(0));
        EmailTemplateRepository tplRepo = mock(EmailTemplateRepository.class);

        SmtpEmailSender sender = new SmtpEmailSender(jms, tplRepo, new EmailTemplateRenderer(), logRepo);
        ReflectionTestUtils.setField(sender, "from", "noreply@example.com");

        EmailSender.EmailResult result = sender.send(EmailSender.EmailRequest.builder()
                .to("recipient@example.com")
                .subject("Test")
                .body("<p>Hi</p>")
                .html(true)
                .build());

        assertThat(result.isSuccess()).isTrue();
        MimeMessage[] msgs = greenMail.getReceivedMessages();
        assertThat(msgs).hasSize(1);
        assertThat(msgs[0].getSubject()).isEqualTo("Test");
        assertThat(GreenMailUtil.getBody(msgs[0])).contains("<p>Hi</p>");
        verify(logRepo).save(argThat(log -> log.getStatus() == EmailLogStatus.SENT
                && "recipient@example.com".equals(log.getRecipient())
                && log.getSentAt() != null));
    }

    @Test
    void sends_templated_email_with_variable_substitution() throws Exception {
        JavaMailSenderImpl jms = javaMailSender(ServerSetupTest.SMTP.getPort());
        EmailLogJpaRepository logRepo = mock(EmailLogJpaRepository.class);
        when(logRepo.save(any(EmailLogJpaEntity.class))).thenAnswer(inv -> inv.getArgument(0));

        EmailTemplateRepository tplRepo = mock(EmailTemplateRepository.class);
        when(tplRepo.findByCodeAndLocale("welcome", "pl")).thenReturn(Optional.of(
                EmailTemplate.builder()
                        .code("welcome").name("welcome").locale("pl")
                        .subject("Cześć {{name}}!")
                        .bodyHtml("<p>Witaj {{name}}, dzięki za kontakt.</p>")
                        .active(true)
                        .build()));

        SmtpEmailSender sender = new SmtpEmailSender(jms, tplRepo, new EmailTemplateRenderer(), logRepo);
        ReflectionTestUtils.setField(sender, "from", "noreply@example.com");

        EmailSender.EmailResult result = sender.sendTemplate("welcome", "user@example.com", "pl",
                Map.of("name", "Anna"));

        assertThat(result.isSuccess()).isTrue();
        MimeMessage[] msgs = greenMail.getReceivedMessages();
        assertThat(msgs).hasSize(1);
        assertThat(msgs[0].getSubject()).isEqualTo("Cześć Anna!");
        assertThat(GreenMailUtil.getBody(msgs[0])).contains("Witaj Anna");
        verify(logRepo).save(argThat(log -> log.getStatus() == EmailLogStatus.SENT
                && "welcome".equals(log.getTemplateName())));
    }

    @Test
    void records_failure_in_log_when_send_fails() {
        // Port 1 is the TCP "tcpmux" port — refused on every modern host, so connect() throws.
        JavaMailSenderImpl jms = javaMailSender(1);

        EmailLogJpaRepository logRepo = mock(EmailLogJpaRepository.class);
        when(logRepo.save(any(EmailLogJpaEntity.class))).thenAnswer(inv -> inv.getArgument(0));
        EmailTemplateRepository tplRepo = mock(EmailTemplateRepository.class);

        SmtpEmailSender sender = new SmtpEmailSender(jms, tplRepo, new EmailTemplateRenderer(), logRepo);
        ReflectionTestUtils.setField(sender, "from", "x@example.com");

        EmailSender.EmailResult result = sender.send(EmailSender.EmailRequest.builder()
                .to("r@example.com").subject("X").body("y").html(false).build());

        assertThat(result.isSuccess()).isFalse();
        assertThat(result.getErrorMessage()).isNotBlank();
        verify(logRepo).save(argThat(log -> log.getStatus() == EmailLogStatus.FAILED
                && log.getErrorMessage() != null
                && log.getSentAt() == null));
    }

    @Test
    void inactive_template_short_circuits_without_sending() {
        JavaMailSenderImpl jms = javaMailSender(ServerSetupTest.SMTP.getPort());
        EmailLogJpaRepository logRepo = mock(EmailLogJpaRepository.class);
        EmailTemplateRepository tplRepo = mock(EmailTemplateRepository.class);
        when(tplRepo.findByCodeAndLocale("dormant", "pl")).thenReturn(Optional.of(
                EmailTemplate.builder()
                        .code("dormant").name("dormant").locale("pl")
                        .subject("S").bodyHtml("B")
                        .active(false)
                        .build()));

        SmtpEmailSender sender = new SmtpEmailSender(jms, tplRepo, new EmailTemplateRenderer(), logRepo);
        ReflectionTestUtils.setField(sender, "from", "x@example.com");

        EmailSender.EmailResult result = sender.sendTemplate("dormant", "r@example.com", "pl", Map.of());

        assertThat(result.isSuccess()).isFalse();
        assertThat(result.getErrorMessage()).contains("inactive");
        assertThat(greenMail.getReceivedMessages()).isEmpty();
    }
}
