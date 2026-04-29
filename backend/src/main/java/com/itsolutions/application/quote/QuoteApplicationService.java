package com.itsolutions.application.quote;

import com.itsolutions.domain.email.port.out.EmailSender;
import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.port.in.*;
import com.itsolutions.domain.quote.port.out.QuoteRepository;
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
public class QuoteApplicationService implements
        SubmitQuoteUseCase,
        SendQuoteUseCase,
        GetQuotesUseCase,
        UpdateQuoteStatusUseCase {

    private final QuoteRepository quoteRepository;
    private final EmailSender emailSender;

    @Value("${app.admin.email:admin@itsolutions.pl}")
    private String adminEmail;

    @Override
    public SubmitQuoteResult execute(SubmitQuoteCommand command) {
        log.info("Processing quote request from: {}", command.getEmail());

        // Create quote request
        QuoteRequest quote = QuoteRequest.create(
                command.getName(),
                command.getEmail(),
                command.getPhone(),
                command.getCompany(),
                command.getServiceType(),
                command.getProjectSize(),
                command.getBudget(),
                command.getTimeline(),
                command.getDescription(),
                command.getLocale(),
                command.getIpAddress(),
                command.getUserAgent()
        );

        // Save to database
        QuoteRequest saved = quoteRepository.save(quote);
        log.info("Quote request saved with ID: {}", saved.getId());

        // Send notification email to admin
        boolean emailSent = sendAdminNotification(saved);

        // Send confirmation email to user
        sendUserConfirmation(saved);

        return SubmitQuoteResult.builder()
                .quoteId(saved.getId())
                .emailSent(emailSent)
                .build();
    }

    @Override
    public SendQuoteResult execute(SendQuoteCommand command) {
        log.info("Sending quote proposal for: {}", command.getQuoteId());

        QuoteRequest quote = quoteRepository.findById(command.getQuoteId())
                .orElseThrow(() -> new ResourceNotFoundException("Quote not found: " + command.getQuoteId()));

        // Send quote email
        EmailSender.EmailResult emailResult = emailSender.sendTemplate(
                "quote_proposal",
                quote.getEmail(),
                quote.getLocale(),
                Map.of(
                        "name", quote.getName(),
                        "amount", command.getAmount().toString(),
                        "currency", command.getCurrency(),
                        "message", command.getMessage(),
                        "validUntil", command.getValidUntil() != null ? command.getValidUntil() : ""
                )
        );

        if (emailResult.isSuccess()) {
            quote.sendQuote(command.getAdminId(), command.getAmount(), command.getCurrency());
            quoteRepository.save(quote);
            log.info("Quote proposal sent successfully to: {}", quote.getEmail());
        }

        return SendQuoteResult.builder()
                .success(emailResult.isSuccess())
                .emailSent(emailResult.isSuccess())
                .errorMessage(emailResult.getErrorMessage())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public QuoteListResult getQuotes(QuoteQuery query) {
        var quotes = quoteRepository.findAll(
                query.getStatus(),
                query.getServiceType(),
                query.getSearch(),
                query.getPage(),
                query.getSize(),
                query.getSortBy(),
                query.getSortDirection()
        );

        long total = quoteRepository.count(query.getStatus(), query.getServiceType(), query.getSearch());
        int totalPages = (int) Math.ceil((double) total / query.getSize());

        return QuoteListResult.builder()
                .quotes(quotes)
                .totalElements((int) total)
                .totalPages(totalPages)
                .currentPage(query.getPage())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuoteRequest> getQuoteById(UUID id) {
        return quoteRepository.findById(id);
    }

    @Override
    public void updateStatus(UUID quoteId, QuoteStatus status) {
        QuoteRequest quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new ResourceNotFoundException("Quote not found: " + quoteId));

        switch (status) {
            case REVIEWING -> quote.startReview();
            case ACCEPTED -> quote.markAccepted();
            case REJECTED -> quote.markRejected();
            case EXPIRED -> quote.markExpired();
            case SPAM -> quote.markAsSpam();
            default -> log.warn("Unsupported status update: {}", status);
        }

        quoteRepository.save(quote);
        log.info("Quote {} status updated to: {}", quoteId, status);
    }

    @Override
    public void startReview(UUID quoteId) {
        updateStatus(quoteId, QuoteStatus.REVIEWING);
    }

    @Override
    public void markAccepted(UUID quoteId) {
        updateStatus(quoteId, QuoteStatus.ACCEPTED);
    }

    @Override
    public void markRejected(UUID quoteId) {
        updateStatus(quoteId, QuoteStatus.REJECTED);
    }

    @Override
    public void markAsSpam(UUID quoteId) {
        updateStatus(quoteId, QuoteStatus.SPAM);
    }

    @Override
    public void addNotes(UUID quoteId, String notes) {
        QuoteRequest quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new ResourceNotFoundException("Quote not found: " + quoteId));

        quote.addInternalNotes(notes);
        quoteRepository.save(quote);
        log.info("Notes added to quote: {}", quoteId);
    }

    private boolean sendAdminNotification(QuoteRequest quote) {
        try {
            EmailSender.EmailResult result = emailSender.sendTemplate(
                    "quote_admin_notification",
                    adminEmail,
                    quote.getLocale(),
                    Map.of(
                            "name", quote.getName(),
                            "email", quote.getEmail(),
                            "phone", quote.getPhone() != null ? quote.getPhone() : "-",
                            "company", quote.getCompany() != null ? quote.getCompany() : "-",
                            "serviceType", quote.getServiceType().name(),
                            "projectSize", quote.getProjectSize() != null ? quote.getProjectSize().name() : "-",
                            "budget", quote.getBudget() != null ? quote.getBudget() : "-",
                            "timeline", quote.getTimeline() != null ? quote.getTimeline() : "-",
                            "description", quote.getDescription(),
                            "quoteId", quote.getId().toString()
                    )
            );
            return result.isSuccess();
        } catch (Exception e) {
            log.error("Failed to send admin notification: {}", e.getMessage());
            return false;
        }
    }

    private void sendUserConfirmation(QuoteRequest quote) {
        try {
            emailSender.sendTemplate(
                    "quote_confirmation",
                    quote.getEmail(),
                    quote.getLocale(),
                    Map.of(
                            "name", quote.getName(),
                            "serviceType", quote.getServiceType().name()
                    )
            );
        } catch (Exception e) {
            log.error("Failed to send user confirmation: {}", e.getMessage());
        }
    }
}
