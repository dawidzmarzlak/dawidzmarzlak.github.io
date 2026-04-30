package com.itsolutions.adapter.out.email;

import com.itsolutions.adapter.out.persistence.email.EmailLogJpaEntity;
import com.itsolutions.adapter.out.persistence.email.EmailLogJpaRepository;
import com.itsolutions.domain.email.model.EmailLogStatus;
import com.itsolutions.domain.email.model.EmailTemplate;
import com.itsolutions.domain.email.port.out.EmailSender;
import com.itsolutions.domain.email.port.out.EmailTemplateRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

/**
 * SMTP-backed implementation of {@link EmailSender}.
 *
 * <p>Two paths share a single {@code doSend} core:</p>
 * <ul>
 *   <li>{@link #send(EmailRequest)} — caller-composed subject/body.</li>
 *   <li>{@link #sendTemplate(String, String, String, Map)} — looks up a template
 *       via {@link EmailTemplateRepository}, renders {@code {{var}}} placeholders,
 *       then dispatches through the same path.</li>
 * </ul>
 *
 * <p>Every send attempt — success or failure — is persisted to {@code email_logs}
 * via {@link EmailLogJpaRepository}. The provider message id (RFC 822 Message-ID)
 * is recorded on success; the exception's message is recorded on failure.</p>
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;
    private final EmailTemplateRepository templateRepo;
    private final EmailTemplateRenderer renderer;
    private final EmailLogJpaRepository logRepo;

    @Value("${spring.mail.from:noreply@itsolutions.pl}")
    private String from;

    @Override
    public EmailResult send(EmailRequest request) {
        return doSend(null, request);
    }

    @Override
    public EmailResult sendTemplate(String templateName, String to, String locale, Map<String, Object> variables) {
        EmailTemplate tpl = templateRepo.findByCodeAndLocale(templateName, locale)
                .orElseThrow(() -> new IllegalArgumentException("Email template not found: " + templateName));
        if (!tpl.isActive()) {
            return EmailResult.builder()
                    .success(false)
                    .errorMessage("Template is inactive: " + templateName)
                    .build();
        }
        return doSend(templateName, EmailRequest.builder()
                .to(to)
                .subject(renderer.render(tpl.getSubject(), variables))
                .body(renderer.render(tpl.getBodyHtml(), variables))
                .html(true)
                .build());
    }

    private EmailResult doSend(String templateName, EmailRequest request) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper h = new MimeMessageHelper(msg, true, "UTF-8");
            h.setFrom(from);
            h.setTo(request.getTo());
            h.setSubject(request.getSubject());
            h.setText(request.getBody(), request.isHtml());
            mailSender.send(msg);

            String providerId = msg.getMessageID();
            logSuccess(templateName, request, providerId);
            return EmailResult.builder()
                    .success(true)
                    .providerMessageId(providerId)
                    .build();
        } catch (Exception e) {
            log.error("Email send failed: to={} subject={} err={}",
                    request.getTo(), request.getSubject(), e.getMessage(), e);
            logFailure(templateName, request, e.getMessage());
            return EmailResult.builder()
                    .success(false)
                    .errorMessage(e.getMessage())
                    .build();
        }
    }

    private void logSuccess(String templateName, EmailRequest req, String providerMessageId) {
        Instant now = Instant.now();
        logRepo.save(EmailLogJpaEntity.builder()
                .id(UUID.randomUUID())
                .templateName(templateName)
                .recipient(req.getTo())
                .subject(req.getSubject())
                .status(EmailLogStatus.SENT)
                .providerMessageId(providerMessageId)
                .relatedEntityType(req.getRelatedEntityType())
                .relatedEntityId(req.getRelatedEntityId())
                .sentAt(now)
                .createdAt(now)
                .build());
    }

    private void logFailure(String templateName, EmailRequest req, String errorMessage) {
        logRepo.save(EmailLogJpaEntity.builder()
                .id(UUID.randomUUID())
                .templateName(templateName)
                .recipient(req.getTo())
                .subject(req.getSubject())
                .status(EmailLogStatus.FAILED)
                .errorMessage(errorMessage)
                .relatedEntityType(req.getRelatedEntityType())
                .relatedEntityId(req.getRelatedEntityId())
                .createdAt(Instant.now())
                .build());
    }
}
