package com.itsolutions.adapter.in.web.quote;

import com.itsolutions.domain.quote.model.ProjectSize;
import com.itsolutions.domain.quote.model.ServiceType;
import com.itsolutions.domain.quote.port.in.SubmitQuoteUseCase;
import com.itsolutions.domain.quote.port.in.SubmitQuoteUseCase.SubmitQuoteCommand;
import com.itsolutions.domain.quote.port.in.SubmitQuoteUseCase.SubmitQuoteResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quote")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Quote", description = "Public quote request API")
public class QuoteController {

    private final SubmitQuoteUseCase submitQuoteUseCase;

    @PostMapping
    @Operation(summary = "Submit quote request", description = "Submit a quote/pricing request")
    public ResponseEntity<QuoteResponse> submitQuote(
            @Valid @RequestBody QuoteFormRequest request,
            @RequestHeader(value = "Accept-Language", defaultValue = "pl") String locale,
            HttpServletRequest httpRequest
    ) {
        log.info("Quote request submission from: {}", request.email());

        SubmitQuoteCommand command = SubmitQuoteCommand.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .company(request.company())
                .serviceType(request.serviceType())
                .projectSize(request.projectSize())
                .budget(request.budget())
                .timeline(request.timeline())
                .description(request.description())
                .locale(locale)
                .ipAddress(getClientIp(httpRequest))
                .userAgent(httpRequest.getHeader("User-Agent"))
                .turnstileToken(request.turnstileToken())
                .build();

        SubmitQuoteResult result = submitQuoteUseCase.execute(command);

        return ResponseEntity.ok(new QuoteResponse(
                result.getQuoteId().toString(),
                "Quote request submitted successfully",
                result.isEmailSent()
        ));
    }

    @GetMapping("/service-types")
    @Operation(summary = "Get service types", description = "Get available service types")
    public ResponseEntity<ServiceType[]> getServiceTypes() {
        return ResponseEntity.ok(ServiceType.values());
    }

    @GetMapping("/project-sizes")
    @Operation(summary = "Get project sizes", description = "Get available project sizes")
    public ResponseEntity<ProjectSize[]> getProjectSizes() {
        return ResponseEntity.ok(ProjectSize.values());
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }

    public record QuoteFormRequest(
            @NotBlank(message = "Name is required")
            @Size(max = 100, message = "Name must be less than 100 characters")
            String name,

            @NotBlank(message = "Email is required")
            @Email(message = "Invalid email format")
            String email,

            @Size(max = 20, message = "Phone must be less than 20 characters")
            String phone,

            @Size(max = 100, message = "Company must be less than 100 characters")
            String company,

            @NotNull(message = "Service type is required")
            ServiceType serviceType,

            ProjectSize projectSize,

            @Size(max = 50, message = "Budget must be less than 50 characters")
            String budget,

            @Size(max = 100, message = "Timeline must be less than 100 characters")
            String timeline,

            @NotBlank(message = "Description is required")
            @Size(max = 5000, message = "Description must be less than 5000 characters")
            String description,

            String turnstileToken
    ) {}

    public record QuoteResponse(
            String quoteId,
            String message,
            boolean emailSent
    ) {}
}
