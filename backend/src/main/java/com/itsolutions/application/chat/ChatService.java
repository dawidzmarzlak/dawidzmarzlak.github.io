package com.itsolutions.application.chat;

import com.itsolutions.domain.chat.model.ChatAction;
import com.itsolutions.domain.chat.model.ChatMessage;
import com.itsolutions.domain.chat.model.ChatSession;
import com.itsolutions.domain.chat.port.in.GetConversationUseCase;
import com.itsolutions.domain.chat.port.in.SendMessageUseCase;
import com.itsolutions.domain.chat.port.out.ChatRepository;
import com.itsolutions.domain.chat.port.out.LlmGateway;
import com.itsolutions.infrastructure.exception.BusinessException;
import com.itsolutions.infrastructure.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Application service for chat operations.
 * Orchestrates domain logic and infrastructure.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService implements SendMessageUseCase, GetConversationUseCase {

    private final ChatRepository chatRepository;
    private final LlmGateway llmGateway;

    @Override
    @Transactional
    public SendMessageResult execute(SendMessageCommand command) {
        log.debug("Processing chat message for session: {}", command.getSessionId());

        // Get or create session
        ChatSession session = getOrCreateSession(command);

        // Save user message
        String userContent = extractLastUserMessage(command.getMessages());
        ChatMessage userMessage = ChatMessage.createUserMessage(session.getId(), userContent);
        chatRepository.saveMessage(userMessage);

        // Prepare LLM request
        LlmGateway.LlmRequest llmRequest = buildLlmRequest(command);

        // Call LLM
        LlmGateway.LlmResponse llmResponse = llmGateway.chat(llmRequest);

        if (!llmResponse.isSuccess()) {
            log.error("LLM call failed: {}", llmResponse.getErrorMessage());
            throw new BusinessException("Failed to get AI response: " + llmResponse.getErrorMessage());
        }

        // Save assistant message
        ChatMessage assistantMessage = ChatMessage.createAssistantMessage(
                session.getId(),
                llmResponse.getContent(),
                llmResponse.getTokensUsed(),
                llmResponse.getResponseTimeMs()
        );
        chatRepository.saveMessage(assistantMessage);

        log.info("Chat message processed for session {} in {}ms, tokens: {}",
                session.getId(),
                llmResponse.getResponseTimeMs(),
                llmResponse.getTokensUsed());

        return SendMessageResult.builder()
                .sessionId(session.getId())
                .message(llmResponse.getContent())
                .action(llmResponse.getSuggestedAction())
                .tokensUsed(llmResponse.getTokensUsed())
                .responseTimeMs(llmResponse.getResponseTimeMs())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public GetConversationResult execute(UUID sessionId) {
        ChatSession session = chatRepository.findByIdWithMessages(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat session not found: " + sessionId));

        return GetConversationResult.builder()
                .session(session)
                .messages(session.getMessages())
                .totalMessages(session.getMessageCount())
                .totalTokens(session.getTotalTokens())
                .build();
    }

    private ChatSession getOrCreateSession(SendMessageCommand command) {
        if (command.getSessionId() != null) {
            return chatRepository.findById(command.getSessionId())
                    .orElseGet(() -> createNewSession(command));
        }
        return createNewSession(command);
    }

    private ChatSession createNewSession(SendMessageCommand command) {
        ChatSession session = ChatSession.create(
                command.getVisitorId(),
                command.getLocale(),
                llmGateway.getProviderName(),
                llmGateway.getModelName()
        );
        return chatRepository.save(session);
    }

    private String extractLastUserMessage(List<SendMessageCommand.MessageDto> messages) {
        for (int i = messages.size() - 1; i >= 0; i--) {
            if ("user".equalsIgnoreCase(messages.get(i).role())) {
                return messages.get(i).content();
            }
        }
        throw new BusinessException("No user message found in request");
    }

    private LlmGateway.LlmRequest buildLlmRequest(SendMessageCommand command) {
        List<LlmGateway.LlmRequest.Message> messages = command.getMessages().stream()
                .map(m -> new LlmGateway.LlmRequest.Message(m.role(), m.content()))
                .toList();

        LlmGateway.LlmRequest.LeadContext leadContext = null;
        if (command.getLeadData() != null) {
            leadContext = new LlmGateway.LlmRequest.LeadContext(
                    command.getLeadData().name(),
                    command.getLeadData().email(),
                    command.getLeadData().phone()
            );
        }

        return LlmGateway.LlmRequest.builder()
                .messages(messages)
                .locale(command.getLocale())
                .leadContext(leadContext)
                .build();
    }
}
