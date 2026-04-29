package com.itsolutions.adapter.in.web.contact;

import com.itsolutions.domain.contact.model.ContactRequest;
import com.itsolutions.domain.contact.model.ContactStatus;
import com.itsolutions.domain.contact.port.in.GetContactsUseCase;
import com.itsolutions.domain.contact.port.in.GetContactsUseCase.ContactQuery;
import com.itsolutions.domain.contact.port.in.ReplyToContactUseCase;
import com.itsolutions.domain.contact.port.in.ReplyToContactUseCase.ReplyCommand;
import com.itsolutions.domain.contact.port.in.UpdateContactStatusUseCase;
import com.itsolutions.infrastructure.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/contacts")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Contacts", description = "Admin contact management API")
@SecurityRequirement(name = "bearerAuth")
public class AdminContactController {

    private final GetContactsUseCase getContactsUseCase;
    private final UpdateContactStatusUseCase updateContactStatusUseCase;
    private final ReplyToContactUseCase replyToContactUseCase;

    @GetMapping
    @Operation(summary = "List contacts", description = "Get paginated list of contact requests")
    public ResponseEntity<ContactListResponse> listContacts(
            @RequestParam(required = false) ContactStatus status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        ContactQuery query = ContactQuery.builder()
                .status(status)
                .search(search)
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();

        var result = getContactsUseCase.getContacts(query);

        List<ContactDto> contacts = result.getContacts().stream()
                .map(this::toDto)
                .toList();

        return ResponseEntity.ok(new ContactListResponse(
                contacts,
                result.getTotalElements(),
                result.getTotalPages(),
                result.getCurrentPage()
        ));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get contact", description = "Get contact request by ID")
    public ResponseEntity<ContactDto> getContact(@PathVariable UUID id) {
        ContactRequest contact = getContactsUseCase.getContactById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found: " + id));

        // Mark as read when viewed
        if (contact.isNew()) {
            updateContactStatusUseCase.markAsRead(id);
        }

        return ResponseEntity.ok(toDto(contact));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update status", description = "Update contact request status")
    public ResponseEntity<Void> updateStatus(
            @PathVariable UUID id,
            @RequestBody StatusUpdateRequest request
    ) {
        updateContactStatusUseCase.updateStatus(id, request.status());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reply")
    @Operation(summary = "Reply to contact", description = "Send reply email to contact")
    public ResponseEntity<ReplyResponse> replyToContact(
            @PathVariable UUID id,
            @Valid @RequestBody ReplyRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        // Get admin ID from user details (simplified - would need actual implementation)
        UUID adminId = UUID.randomUUID(); // TODO: Get from authenticated user

        ReplyCommand command = ReplyCommand.builder()
                .contactId(id)
                .adminId(adminId)
                .subject(request.subject())
                .message(request.message())
                .build();

        var result = replyToContactUseCase.execute(command);

        return ResponseEntity.ok(new ReplyResponse(
                result.isSuccess(),
                result.isEmailSent(),
                result.getErrorMessage()
        ));
    }

    @PostMapping("/{id}/archive")
    @Operation(summary = "Archive contact", description = "Archive a contact request")
    public ResponseEntity<Void> archiveContact(@PathVariable UUID id) {
        updateContactStatusUseCase.archive(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/spam")
    @Operation(summary = "Mark as spam", description = "Mark contact as spam")
    public ResponseEntity<Void> markAsSpam(@PathVariable UUID id) {
        updateContactStatusUseCase.markAsSpam(id);
        return ResponseEntity.noContent().build();
    }

    private ContactDto toDto(ContactRequest contact) {
        return new ContactDto(
                contact.getId(),
                contact.getName(),
                contact.getEmail(),
                contact.getPhone(),
                contact.getCompany(),
                contact.getSubject(),
                contact.getMessage(),
                contact.getLocale(),
                contact.getStatus(),
                contact.getCreatedAt(),
                contact.getUpdatedAt(),
                contact.getRepliedAt(),
                contact.getReplyContent()
        );
    }

    public record ContactListResponse(
            List<ContactDto> contacts,
            int totalElements,
            int totalPages,
            int currentPage
    ) {}

    public record ContactDto(
            UUID id,
            String name,
            String email,
            String phone,
            String company,
            String subject,
            String message,
            String locale,
            ContactStatus status,
            Instant createdAt,
            Instant updatedAt,
            Instant repliedAt,
            String replyContent
    ) {}

    public record StatusUpdateRequest(ContactStatus status) {}

    public record ReplyRequest(
            @NotBlank String subject,
            @NotBlank String message
    ) {}

    public record ReplyResponse(
            boolean success,
            boolean emailSent,
            String errorMessage
    ) {}
}
