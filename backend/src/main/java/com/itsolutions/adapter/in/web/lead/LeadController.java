package com.itsolutions.adapter.in.web.lead;

import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.port.in.CreateLeadUseCase;
import com.itsolutions.domain.lead.port.in.CreateLeadUseCase.CreateLeadCommand;
import com.itsolutions.domain.lead.port.in.CreateLeadUseCase.CreateLeadResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Leads", description = "Public lead intake")
public class LeadController {

    private final CreateLeadUseCase createLeadUseCase;

    @PostMapping
    @Operation(summary = "Submit a new lead")
    public ResponseEntity<LeadResponse> createLead(
            @Valid @RequestBody LeadFormRequest request,
            HttpServletRequest httpRequest
    ) {
        log.info("Public lead intake from email={} source={}", request.email(), request.source());

        CreateLeadCommand command = CreateLeadCommand.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .company(request.company())
                .source(parseSource(request.source()))
                .estimatedValue(request.estimatedValue())
                .currency(request.currency())
                .chatSessionId(request.chatSessionId())
                .contactRequestId(request.contactRequestId())
                .quoteRequestId(request.quoteRequestId())
                .build();

        CreateLeadResult result = createLeadUseCase.execute(command);

        return ResponseEntity.ok(new LeadResponse(
                result.getLeadId() != null ? result.getLeadId().toString() : null,
                result.isSuccess(),
                "Lead created successfully"
        ));
    }

    private LeadSource parseSource(String raw) {
        if (raw == null || raw.isBlank()) return LeadSource.MANUAL;
        try {
            return LeadSource.valueOf(raw.toUpperCase().replace('-', '_'));
        } catch (IllegalArgumentException e) {
            log.warn("Unknown lead source '{}', defaulting to OTHER", raw);
            return LeadSource.OTHER;
        }
    }

    public record LeadFormRequest(
            @NotBlank @Size(max = 255) String name,
            @NotBlank @Email @Size(max = 255) String email,
            @Size(max = 50)  String phone,
            @Size(max = 255) String company,
            String source,                    // freeform - controller maps to enum
            BigDecimal estimatedValue,
            @Size(max = 3) String currency,
            UUID chatSessionId,
            UUID contactRequestId,
            UUID quoteRequestId
    ) {}

    public record LeadResponse(
            String leadId,
            boolean success,
            String message
    ) {}
}
