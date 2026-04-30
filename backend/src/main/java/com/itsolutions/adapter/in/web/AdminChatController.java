package com.itsolutions.adapter.in.web;

import com.itsolutions.domain.chat.model.ChatMessage;
import com.itsolutions.domain.chat.model.ChatRole;
import com.itsolutions.domain.chat.model.ChatSession;
import com.itsolutions.domain.chat.model.ChatSessionStatus;
import com.itsolutions.domain.chat.port.in.GetChatSessionsUseCase;
import com.itsolutions.domain.chat.port.in.GetChatSessionsUseCase.ChatSessionListResult;
import com.itsolutions.domain.chat.port.in.GetChatSessionsUseCase.ChatSessionQuery;
import com.itsolutions.infrastructure.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Admin BO endpoints for inspecting chat sessions.
 *
 * <p>The list endpoint is paginated and intentionally <em>excludes</em> message
 * bodies (each session DTO is returned with an empty {@code messages} list)
 * because the underlying {@link GetChatSessionsUseCase#getSessions} path uses
 * the lazy {@code findAllSessions} repo method — pulling messages on every row
 * would force an N+1 fan-out. The detail endpoint switches to
 * {@code findByIdWithMessages}, which opts in via {@code @EntityGraph}.</p>
 */
@RestController
@RequestMapping("/api/v1/admin/chats")
@RequiredArgsConstructor
@Tag(name = "Admin Chats", description = "Admin BO — chat session listings")
@SecurityRequirement(name = "bearerAuth")
public class AdminChatController {

    private final GetChatSessionsUseCase getChatSessionsUseCase;

    @GetMapping
    @Operation(summary = "List chat sessions")
    public ResponseEntity<ChatSessionListResponse> listSessions(
            @RequestParam(required = false) ChatSessionStatus status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        ChatSessionQuery query = ChatSessionQuery.builder()
                .status(status)
                .search(search)
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();

        ChatSessionListResult result = getChatSessionsUseCase.getSessions(query);

        List<ChatSessionDto> sessions = result.getSessions().stream()
                .map(s -> toDto(s, false))
                .toList();

        return ResponseEntity.ok(new ChatSessionListResponse(
                sessions,
                result.getTotalElements(),
                result.getTotalPages(),
                result.getCurrentPage()
        ));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get chat session with messages")
    public ResponseEntity<ChatSessionDto> getSession(@PathVariable UUID id) {
        ChatSession session = getChatSessionsUseCase.getSessionWithMessages(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chat session not found: " + id));
        return ResponseEntity.ok(toDto(session, true));
    }

    private ChatSessionDto toDto(ChatSession s, boolean includeMessages) {
        List<ChatMessageDto> msgs = includeMessages
                ? s.getMessages().stream().map(this::toMessageDto).toList()
                : List.of();
        return new ChatSessionDto(
                s.getId(),
                s.getVisitorId(),
                s.getLocale(),
                s.getStatus(),
                s.getLlmProvider(),
                s.getLlmModel(),
                s.getTotalTokens(),
                s.getLeadId(),
                s.getCreatedAt(),
                s.getUpdatedAt(),
                s.getArchivedAt(),
                msgs
        );
    }

    private ChatMessageDto toMessageDto(ChatMessage m) {
        return new ChatMessageDto(
                m.getId(),
                m.getRole(),
                m.getContent(),
                m.getTokensUsed(),
                m.getResponseTimeMs(),
                m.getCreatedAt()
        );
    }

    public record ChatSessionDto(
            UUID id,
            String visitorId,
            String locale,
            ChatSessionStatus status,
            String llmProvider,
            String llmModel,
            int totalTokens,
            UUID leadId,
            Instant createdAt,
            Instant updatedAt,
            Instant archivedAt,
            List<ChatMessageDto> messages
    ) {}

    public record ChatMessageDto(
            UUID id,
            ChatRole role,
            String content,
            Integer tokensUsed,
            Integer responseTimeMs,
            Instant createdAt
    ) {}

    public record ChatSessionListResponse(
            List<ChatSessionDto> sessions,
            int totalElements,
            int totalPages,
            int currentPage
    ) {}
}
