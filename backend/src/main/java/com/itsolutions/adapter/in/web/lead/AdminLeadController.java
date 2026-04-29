package com.itsolutions.adapter.in.web.lead;

import com.itsolutions.domain.lead.model.Lead;
import com.itsolutions.domain.lead.model.LeadNote;
import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;
import com.itsolutions.domain.lead.port.in.CreateLeadUseCase;
import com.itsolutions.domain.lead.port.in.CreateLeadUseCase.CreateLeadCommand;
import com.itsolutions.domain.lead.port.in.GetLeadsUseCase;
import com.itsolutions.domain.lead.port.in.GetLeadsUseCase.LeadQuery;
import com.itsolutions.domain.lead.port.in.UpdateLeadUseCase;
import com.itsolutions.domain.lead.port.in.UpdateLeadUseCase.UpdateInfoCommand;
import com.itsolutions.infrastructure.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
@RequestMapping("/api/v1/admin/leads")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Leads", description = "Admin lead management API")
@SecurityRequirement(name = "bearerAuth")
public class AdminLeadController {

    private final GetLeadsUseCase getLeadsUseCase;
    private final CreateLeadUseCase createLeadUseCase;
    private final UpdateLeadUseCase updateLeadUseCase;

    @GetMapping
    @Operation(summary = "List leads", description = "Get paginated list of leads")
    public ResponseEntity<LeadListResponse> listLeads(
            @RequestParam(required = false) LeadStatus status,
            @RequestParam(required = false) LeadSource source,
            @RequestParam(required = false) UUID assignedTo,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        LeadQuery query = LeadQuery.builder()
                .status(status)
                .source(source)
                .assignedTo(assignedTo)
                .search(search)
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();

        var result = getLeadsUseCase.getLeads(query);

        List<LeadDto> leads = result.getLeads().stream()
                .map(this::toDto)
                .toList();

        return ResponseEntity.ok(new LeadListResponse(
                leads,
                result.getTotalElements(),
                result.getTotalPages(),
                result.getCurrentPage()
        ));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get lead", description = "Get lead by ID")
    public ResponseEntity<LeadDto> getLead(@PathVariable UUID id) {
        Lead lead = getLeadsUseCase.getLeadById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + id));

        return ResponseEntity.ok(toDto(lead));
    }

    @PostMapping
    @Operation(summary = "Create lead", description = "Create a new lead manually")
    public ResponseEntity<CreateLeadResponse> createLead(@Valid @RequestBody CreateLeadRequest request) {
        CreateLeadCommand command = CreateLeadCommand.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .company(request.company())
                .source(LeadSource.MANUAL)
                .estimatedValue(request.estimatedValue())
                .currency(request.currency())
                .build();

        var result = createLeadUseCase.execute(command);

        return ResponseEntity.ok(new CreateLeadResponse(
                result.getLeadId(),
                result.isSuccess()
        ));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update lead", description = "Update lead information")
    public ResponseEntity<Void> updateLead(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateLeadRequest request
    ) {
        UpdateInfoCommand command = UpdateInfoCommand.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .company(request.company())
                .build();

        updateLeadUseCase.updateInfo(id, command);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update status", description = "Update lead status")
    public ResponseEntity<Void> updateStatus(
            @PathVariable UUID id,
            @RequestBody StatusUpdateRequest request
    ) {
        updateLeadUseCase.updateStatus(id, request.status());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/assign")
    @Operation(summary = "Assign lead", description = "Assign lead to admin user")
    public ResponseEntity<Void> assignLead(
            @PathVariable UUID id,
            @RequestBody AssignRequest request
    ) {
        updateLeadUseCase.assignTo(id, request.adminId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/notes")
    @Operation(summary = "Add note", description = "Add note to lead")
    public ResponseEntity<Void> addNote(
            @PathVariable UUID id,
            @Valid @RequestBody AddNoteRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID adminId = UUID.randomUUID(); // TODO: Get from authenticated user
        updateLeadUseCase.addNote(id, request.content(), adminId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/value")
    @Operation(summary = "Set value", description = "Set estimated value for lead")
    public ResponseEntity<Void> setEstimatedValue(
            @PathVariable UUID id,
            @RequestBody SetValueRequest request
    ) {
        updateLeadUseCase.setEstimatedValue(id, request.value(), request.currency());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/tags")
    @Operation(summary = "Set tags", description = "Set tags for lead")
    public ResponseEntity<Void> setTags(
            @PathVariable UUID id,
            @RequestBody SetTagsRequest request
    ) {
        updateLeadUseCase.setTags(id, request.tags());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/contacted")
    @Operation(summary = "Mark contacted", description = "Mark lead as contacted")
    public ResponseEntity<Void> markContacted(@PathVariable UUID id) {
        updateLeadUseCase.updateStatus(id, LeadStatus.CONTACTED);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/qualified")
    @Operation(summary = "Mark qualified", description = "Mark lead as qualified")
    public ResponseEntity<Void> markQualified(@PathVariable UUID id) {
        updateLeadUseCase.updateStatus(id, LeadStatus.QUALIFIED);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/converted")
    @Operation(summary = "Mark converted", description = "Mark lead as converted")
    public ResponseEntity<Void> markConverted(@PathVariable UUID id) {
        updateLeadUseCase.updateStatus(id, LeadStatus.CONVERTED);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/lost")
    @Operation(summary = "Mark lost", description = "Mark lead as lost")
    public ResponseEntity<Void> markLost(@PathVariable UUID id) {
        updateLeadUseCase.updateStatus(id, LeadStatus.LOST);
        return ResponseEntity.noContent().build();
    }

    private LeadDto toDto(Lead lead) {
        List<NoteDto> notes = lead.getNotes().stream()
                .map(this::toNoteDto)
                .toList();

        return new LeadDto(
                lead.getId(),
                lead.getName(),
                lead.getEmail(),
                lead.getPhone(),
                lead.getCompany(),
                lead.getSource(),
                lead.getStatus(),
                lead.getEstimatedValue(),
                lead.getCurrency(),
                lead.getTags(),
                lead.getAssignedTo(),
                lead.getChatSessionId(),
                lead.getContactRequestId(),
                lead.getQuoteRequestId(),
                lead.getCreatedAt(),
                lead.getUpdatedAt(),
                lead.getContactedAt(),
                lead.getConvertedAt(),
                notes
        );
    }

    private NoteDto toNoteDto(LeadNote note) {
        return new NoteDto(
                note.getId(),
                note.getContent(),
                note.getCreatedBy(),
                note.getCreatedAt()
        );
    }

    // DTOs
    public record LeadListResponse(
            List<LeadDto> leads,
            int totalElements,
            int totalPages,
            int currentPage
    ) {}

    public record LeadDto(
            UUID id,
            String name,
            String email,
            String phone,
            String company,
            LeadSource source,
            LeadStatus status,
            BigDecimal estimatedValue,
            String currency,
            String tags,
            UUID assignedTo,
            UUID chatSessionId,
            UUID contactRequestId,
            UUID quoteRequestId,
            Instant createdAt,
            Instant updatedAt,
            Instant contactedAt,
            Instant convertedAt,
            List<NoteDto> notes
    ) {}

    public record NoteDto(
            UUID id,
            String content,
            UUID createdBy,
            Instant createdAt
    ) {}

    public record CreateLeadRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            String phone,
            String company,
            BigDecimal estimatedValue,
            String currency
    ) {}

    public record CreateLeadResponse(UUID leadId, boolean success) {}

    public record UpdateLeadRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            String phone,
            String company
    ) {}

    public record StatusUpdateRequest(LeadStatus status) {}

    public record AssignRequest(UUID adminId) {}

    public record AddNoteRequest(@NotBlank String content) {}

    public record SetValueRequest(BigDecimal value, String currency) {}

    public record SetTagsRequest(String tags) {}
}
