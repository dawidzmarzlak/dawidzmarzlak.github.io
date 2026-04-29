package com.itsolutions.adapter.in.web.contact;

import com.itsolutions.domain.contact.port.in.SubmitContactUseCase;
import com.itsolutions.domain.contact.port.in.SubmitContactUseCase.SubmitContactCommand;
import com.itsolutions.domain.contact.port.in.SubmitContactUseCase.SubmitContactResult;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Contact", description = "Public contact form API")
public class ContactController {

    private final SubmitContactUseCase submitContactUseCase;

    @PostMapping
    @Operation(summary = "Submit contact form", description = "Submit a contact form request")
    public ResponseEntity<ContactResponse> submitContact(
            @Valid @RequestBody ContactFormRequest request,
            @RequestHeader(value = "Accept-Language", defaultValue = "pl") String locale,
            HttpServletRequest httpRequest
    ) {
        log.info("Contact form submission from: {}", request.email());

        SubmitContactCommand command = SubmitContactCommand.builder()
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .company(request.company())
                .subject(request.subject())
                .message(request.message())
                .locale(locale)
                .ipAddress(getClientIp(httpRequest))
                .userAgent(httpRequest.getHeader("User-Agent"))
                .turnstileToken(request.turnstileToken())
                .build();

        SubmitContactResult result = submitContactUseCase.execute(command);

        return ResponseEntity.ok(new ContactResponse(
                result.getContactId().toString(),
                "Contact form submitted successfully",
                result.isEmailSent()
        ));
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

    public record ContactFormRequest(
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

            @Size(max = 200, message = "Subject must be less than 200 characters")
            String subject,

            @NotBlank(message = "Message is required")
            @Size(max = 5000, message = "Message must be less than 5000 characters")
            String message,

            String turnstileToken
    ) {}

    public record ContactResponse(
            String contactId,
            String message,
            boolean emailSent
    ) {}
}
