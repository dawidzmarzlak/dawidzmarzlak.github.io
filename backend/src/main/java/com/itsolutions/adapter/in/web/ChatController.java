package com.itsolutions.adapter.in.web;

import com.itsolutions.domain.chat.model.ChatAction;
import com.itsolutions.domain.chat.port.in.GetConversationUseCase;
import com.itsolutions.domain.chat.port.in.SendMessageUseCase;
import com.itsolutions.infrastructure.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

/**
 * REST Controller for chat operations.
 */
@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SendMessageUseCase sendMessageUseCase;
    private final GetConversationUseCase getConversationUseCase;
    private final TurnstileService turnstileService;

    @PostMapping("/messages")
    public ResponseEntity<SendMessageResponseDto> sendMessage(
            @Valid @RequestBody SendMessageRequestDto request,
            HttpServletRequest httpRequest
    ) {
        // Verify Turnstile token
        String clientIp = getClientIp(httpRequest);
        if (!turnstileService.verify(request.turnstileToken(), clientIp)) {
            throw new BusinessException("Bot verification failed");
        }

        // Build command
        SendMessageUseCase.SendMessageCommand command = SendMessageUseCase.SendMessageCommand.builder()
                .sessionId(request.sessionId())
                .messages(request.messages().stream()
                        .map(m -> new SendMessageUseCase.SendMessageCommand.MessageDto(m.role(), m.content()))
                        .toList())
                .locale(request.locale())
                .leadData(request.leadData() != null
                        ? new SendMessageUseCase.SendMessageCommand.LeadDataDto(
                                request.leadData().name(),
                                request.leadData().email(),
                                request.leadData().phone())
                        : null)
                .visitorId(request.visitorId())
                .turnstileToken(request.turnstileToken())
                .build();

        // Execute use case
        SendMessageUseCase.SendMessageResult result = sendMessageUseCase.execute(command);

        // Build response
        SendMessageResponseDto response = new SendMessageResponseDto(
                result.getSessionId(),
                result.getMessage(),
                result.getAction() != null ? result.getAction().name().toLowerCase() : null,
                null
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<ChatSessionDto> getSession(@PathVariable UUID sessionId) {
        GetConversationUseCase.GetConversationResult result = getConversationUseCase.execute(sessionId);

        ChatSessionDto response = new ChatSessionDto(
                result.getSession().getId(),
                result.getSession().getVisitorId(),
                result.getSession().getLocale(),
                result.getSession().getStatus().name().toLowerCase(),
                result.getSession().getLlmProvider(),
                result.getSession().getLlmModel(),
                result.getTotalTokens(),
                result.getMessages().stream()
                        .map(m -> new ChatMessageDto(
                                m.getId(),
                                m.getSessionId(),
                                m.getRole().name().toLowerCase(),
                                m.getContent(),
                                m.getTokensUsed(),
                                m.getResponseTimeMs(),
                                OffsetDateTime.from(m.getCreatedAt().atZone(java.time.ZoneOffset.UTC))
                        ))
                        .toList(),
                result.getSession().getLeadId(),
                OffsetDateTime.from(result.getSession().getCreatedAt().atZone(java.time.ZoneOffset.UTC)),
                result.getSession().getUpdatedAt() != null
                        ? OffsetDateTime.from(result.getSession().getUpdatedAt().atZone(java.time.ZoneOffset.UTC))
                        : null,
                result.getSession().getArchivedAt() != null
                        ? OffsetDateTime.from(result.getSession().getArchivedAt().atZone(java.time.ZoneOffset.UTC))
                        : null
        );

        return ResponseEntity.ok(response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    // DTOs

    public record SendMessageRequestDto(
            UUID sessionId,
            @NotEmpty List<MessageDto> messages,
            @NotBlank String locale,
            LeadDataDto leadData,
            String visitorId,
            String turnstileToken
    ) {}

    public record MessageDto(
            @NotBlank String role,
            @NotBlank String content
    ) {}

    public record LeadDataDto(
            String name,
            String email,
            String phone
    ) {}

    public record SendMessageResponseDto(
            UUID sessionId,
            String message,
            String action,
            String error
    ) {}

    public record ChatSessionDto(
            UUID id,
            String visitorId,
            String locale,
            String status,
            String llmProvider,
            String llmModel,
            Integer totalTokens,
            List<ChatMessageDto> messages,
            UUID leadId,
            OffsetDateTime createdAt,
            OffsetDateTime updatedAt,
            OffsetDateTime archivedAt
    ) {}

    public record ChatMessageDto(
            UUID id,
            UUID sessionId,
            String role,
            String content,
            Integer tokensUsed,
            Integer responseTimeMs,
            OffsetDateTime createdAt
    ) {}
}
