package com.itsolutions.adapter.in.web.quote;

import com.itsolutions.domain.quote.model.ProjectSize;
import com.itsolutions.domain.quote.model.QuoteRequest;
import com.itsolutions.domain.quote.model.QuoteStatus;
import com.itsolutions.domain.quote.model.ServiceType;
import com.itsolutions.domain.quote.port.in.GetQuotesUseCase;
import com.itsolutions.domain.quote.port.in.GetQuotesUseCase.QuoteQuery;
import com.itsolutions.domain.quote.port.in.SendQuoteUseCase;
import com.itsolutions.domain.quote.port.in.SendQuoteUseCase.SendQuoteCommand;
import com.itsolutions.domain.quote.port.in.UpdateQuoteStatusUseCase;
import com.itsolutions.infrastructure.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/quotes")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Quotes", description = "Admin quote management API")
@SecurityRequirement(name = "bearerAuth")
public class AdminQuoteController {

    private final GetQuotesUseCase getQuotesUseCase;
    private final UpdateQuoteStatusUseCase updateQuoteStatusUseCase;
    private final SendQuoteUseCase sendQuoteUseCase;

    @GetMapping
    @Operation(summary = "List quotes", description = "Get paginated list of quote requests")
    public ResponseEntity<QuoteListResponse> listQuotes(
            @RequestParam(required = false) QuoteStatus status,
            @RequestParam(required = false) ServiceType serviceType,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        QuoteQuery query = QuoteQuery.builder()
                .status(status)
                .serviceType(serviceType)
                .search(search)
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();

        var result = getQuotesUseCase.getQuotes(query);

        List<QuoteDto> quotes = result.getQuotes().stream()
                .map(this::toDto)
                .toList();

        return ResponseEntity.ok(new QuoteListResponse(
                quotes,
                result.getTotalElements(),
                result.getTotalPages(),
                result.getCurrentPage()
        ));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get quote", description = "Get quote request by ID")
    public ResponseEntity<QuoteDto> getQuote(@PathVariable UUID id) {
        QuoteRequest quote = getQuotesUseCase.getQuoteById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quote not found: " + id));

        // Start review when viewed for first time
        if (quote.isNew()) {
            updateQuoteStatusUseCase.startReview(id);
        }

        return ResponseEntity.ok(toDto(quote));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update status", description = "Update quote request status")
    public ResponseEntity<Void> updateStatus(
            @PathVariable UUID id,
            @RequestBody StatusUpdateRequest request
    ) {
        updateQuoteStatusUseCase.updateStatus(id, request.status());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/send")
    @Operation(summary = "Send quote proposal", description = "Send quote/pricing proposal to client")
    public ResponseEntity<SendQuoteResponse> sendQuote(
            @PathVariable UUID id,
            @Valid @RequestBody SendQuoteRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        // Get admin ID from user details (simplified)
        UUID adminId = UUID.randomUUID(); // TODO: Get from authenticated user

        SendQuoteCommand command = SendQuoteCommand.builder()
                .quoteId(id)
                .adminId(adminId)
                .amount(request.amount())
                .currency(request.currency())
                .subject(request.subject())
                .message(request.message())
                .validUntil(request.validUntil())
                .build();

        var result = sendQuoteUseCase.execute(command);

        return ResponseEntity.ok(new SendQuoteResponse(
                result.isSuccess(),
                result.isEmailSent(),
                result.getErrorMessage()
        ));
    }

    @PatchMapping("/{id}/notes")
    @Operation(summary = "Add notes", description = "Add internal notes to quote")
    public ResponseEntity<Void> addNotes(
            @PathVariable UUID id,
            @RequestBody NotesRequest request
    ) {
        updateQuoteStatusUseCase.addNotes(id, request.notes());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/accept")
    @Operation(summary = "Mark accepted", description = "Mark quote as accepted by client")
    public ResponseEntity<Void> markAccepted(@PathVariable UUID id) {
        updateQuoteStatusUseCase.markAccepted(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reject")
    @Operation(summary = "Mark rejected", description = "Mark quote as rejected by client")
    public ResponseEntity<Void> markRejected(@PathVariable UUID id) {
        updateQuoteStatusUseCase.markRejected(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/spam")
    @Operation(summary = "Mark as spam", description = "Mark quote as spam")
    public ResponseEntity<Void> markAsSpam(@PathVariable UUID id) {
        updateQuoteStatusUseCase.markAsSpam(id);
        return ResponseEntity.noContent().build();
    }

    private QuoteDto toDto(QuoteRequest quote) {
        return new QuoteDto(
                quote.getId(),
                quote.getName(),
                quote.getEmail(),
                quote.getPhone(),
                quote.getCompany(),
                quote.getServiceType(),
                quote.getProjectSize(),
                quote.getBudget(),
                quote.getTimeline(),
                quote.getDescription(),
                quote.getLocale(),
                quote.getStatus(),
                quote.getQuotedAmount(),
                quote.getQuotedCurrency(),
                quote.getInternalNotes(),
                quote.getCreatedAt(),
                quote.getUpdatedAt(),
                quote.getQuotedAt()
        );
    }

    public record QuoteListResponse(
            List<QuoteDto> quotes,
            int totalElements,
            int totalPages,
            int currentPage
    ) {}

    public record QuoteDto(
            UUID id,
            String name,
            String email,
            String phone,
            String company,
            ServiceType serviceType,
            ProjectSize projectSize,
            String budget,
            String timeline,
            String description,
            String locale,
            QuoteStatus status,
            BigDecimal quotedAmount,
            String quotedCurrency,
            String internalNotes,
            Instant createdAt,
            Instant updatedAt,
            Instant quotedAt
    ) {}

    public record StatusUpdateRequest(QuoteStatus status) {}

    public record SendQuoteRequest(
            @NotNull BigDecimal amount,
            String currency,
            @NotBlank String subject,
            @NotBlank String message,
            String validUntil
    ) {}

    public record SendQuoteResponse(
            boolean success,
            boolean emailSent,
            String errorMessage
    ) {}

    public record NotesRequest(String notes) {}
}
