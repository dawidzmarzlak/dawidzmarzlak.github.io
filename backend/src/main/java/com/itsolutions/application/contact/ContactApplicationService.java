package com.itsolutions.application.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;
import com.itsolutions.domain.contact.port.in.*;
import com.itsolutions.domain.contact.port.out.ContactRepository;
import com.itsolutions.domain.email.port.out.EmailSender;
import com.itsolutions.infrastructure.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ContactApplicationService implements
        SubmitContactUseCase,
        ReplyToContactUseCase,
        GetContactsUseCase,
        UpdateContactStatusUseCase {

    private final ContactRepository contactRepository;
    private final EmailSender emailSender;

    @Value("${app.admin.email:admin@itsolutions.pl}")
    private String adminEmail;

    @Override
    public SubmitContactResult execute(SubmitContactCommand command) {
        log.info("Processing contact form submission from: {}", command.getEmail());

        // Create contact request
        ContactRequest contact = ContactRequest.create(
                command.getName(),
                command.getEmail(),
                command.getPhone(),
                command.getCompany(),
                command.getSubject(),
                command.getMessage(),
                command.getLocale(),
                command.getIpAddress(),
                command.getUserAgent()
        );

        // Save to database
        ContactRequest saved = contactRepository.save(contact);
        log.info("Contact request saved with ID: {}", saved.getId());

        // Send notification email to admin
        boolean emailSent = sendAdminNotification(saved);

        // Send confirmation email to user
        sendUserConfirmation(saved);

        return SubmitContactResult.builder()
                .contactId(saved.getId())
                .emailSent(emailSent)
                .build();
    }

    @Override
    public ReplyResult execute(ReplyCommand command) {
        log.info("Processing reply to contact: {}", command.getContactId());

        ContactRequest contact = contactRepository.findById(command.getContactId())
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found: " + command.getContactId()));

        // Send reply email
        EmailSender.EmailResult emailResult = emailSender.send(
                EmailSender.EmailRequest.builder()
                        .to(contact.getEmail())
                        .subject(command.getSubject())
                        .body(command.getMessage())
                        .html(true)
                        .build()
        );

        if (emailResult.isSuccess()) {
            contact.recordReply(command.getAdminId(), command.getMessage());
            contactRepository.save(contact);
            log.info("Reply sent successfully to: {}", contact.getEmail());
        }

        return ReplyResult.builder()
                .success(emailResult.isSuccess())
                .emailSent(emailResult.isSuccess())
                .errorMessage(emailResult.getErrorMessage())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ContactListResult getContacts(ContactQuery query) {
        var contacts = contactRepository.findAll(
                query.getStatus(),
                query.getSearch(),
                query.getPage(),
                query.getSize(),
                query.getSortBy(),
                query.getSortDirection()
        );

        long total = contactRepository.count(query.getStatus(), query.getSearch());
        int totalPages = (int) Math.ceil((double) total / query.getSize());

        return ContactListResult.builder()
                .contacts(contacts)
                .totalElements((int) total)
                .totalPages(totalPages)
                .currentPage(query.getPage())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ContactRequest> getContactById(UUID id) {
        return contactRepository.findById(id);
    }

    @Override
    public void updateStatus(UUID contactId, ContactStatus status) {
        ContactRequest contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found: " + contactId));

        switch (status) {
            case READ -> contact.markAsRead();
            case ARCHIVED -> contact.archive();
            case SPAM -> contact.markAsSpam();
            default -> log.warn("Unsupported status update: {}", status);
        }

        contactRepository.save(contact);
        log.info("Contact {} status updated to: {}", contactId, status);
    }

    @Override
    public void markAsRead(UUID contactId) {
        updateStatus(contactId, ContactStatus.READ);
    }

    @Override
    public void archive(UUID contactId) {
        updateStatus(contactId, ContactStatus.ARCHIVED);
    }

    @Override
    public void markAsSpam(UUID contactId) {
        updateStatus(contactId, ContactStatus.SPAM);
    }

    private boolean sendAdminNotification(ContactRequest contact) {
        try {
            EmailSender.EmailResult result = emailSender.sendTemplate(
                    "contact_admin_notification",
                    adminEmail,
                    contact.getLocale(),
                    Map.of(
                            "name", contact.getName(),
                            "email", contact.getEmail(),
                            "phone", contact.getPhone() != null ? contact.getPhone() : "-",
                            "company", contact.getCompany() != null ? contact.getCompany() : "-",
                            "subject", contact.getSubject() != null ? contact.getSubject() : "-",
                            "message", contact.getMessage(),
                            "contactId", contact.getId().toString()
                    )
            );
            return result.isSuccess();
        } catch (Exception e) {
            log.error("Failed to send admin notification: {}", e.getMessage());
            return false;
        }
    }

    private void sendUserConfirmation(ContactRequest contact) {
        try {
            emailSender.sendTemplate(
                    "contact_confirmation",
                    contact.getEmail(),
                    contact.getLocale(),
                    Map.of(
                            "name", contact.getName()
                    )
            );
        } catch (Exception e) {
            log.error("Failed to send user confirmation: {}", e.getMessage());
        }
    }
}
