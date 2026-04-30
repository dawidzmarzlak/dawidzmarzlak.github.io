package com.itsolutions.domain.chat.port.out;

import com.itsolutions.domain.chat.model.ChatAction;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Outbound port for sending chat messages to an LLM provider.
 *
 * <p>Implementations are typically thin HTTP clients (Ollama, Gemini, ...) and a chained
 * gateway that wires a primary + optional fallback. The system prompt is built INSIDE
 * each gateway from {@link LlmRequest#getLocale()} and {@link LlmRequest#getLeadContext()};
 * callers (e.g. ChatService) do not pass a system prompt.</p>
 */
public interface LlmGateway {

    /**
     * Send a chat request to the configured LLM provider and return its response.
     *
     * @param request the chat request (messages + locale + optional lead context)
     * @return the response — never {@code null}; check {@link LlmResponse#isSuccess()}
     */
    LlmResponse chat(LlmRequest request);

    /** Stable identifier for this provider. Persisted on {@code ChatSession.llmProvider}. */
    String getProviderName();

    /** Default model name for this provider. Persisted on {@code ChatSession.llmModel}. */
    String getModelName();

    @Getter
    @Builder
    class LlmRequest {
        private final List<Message> messages;
        private final String locale;
        private final LeadContext leadContext;

        public record Message(String role, String content) {}
        public record LeadContext(String name, String email, String phone) {}
    }

    @Getter
    @Builder
    class LlmResponse {
        private final boolean success;
        private final String content;
        private final Integer tokensUsed;
        private final Integer responseTimeMs;
        private final String errorMessage;
        private final ErrorType errorType;
        private final String providerName;
        private final ChatAction suggestedAction;
    }

    /**
     * Categorises gateway failures. {@link #QUOTA_EXCEEDED} and {@link #RATE_LIMITED}
     * trigger fallback in {@code ChainedLlmGateway}; {@link #TRANSIENT} and
     * {@link #FATAL} do not.
     */
    enum ErrorType {
        /** Gemini 429 RESOURCE_EXHAUSTED — provider-specific quota — triggers fallback. */
        QUOTA_EXCEEDED,
        /** Generic 429 — rate-limit — triggers fallback. */
        RATE_LIMITED,
        /** 5xx, timeout, connection refused — does NOT trigger fallback (might recover on retry). */
        TRANSIENT,
        /** 4xx (auth, bad request) — does NOT trigger fallback. */
        FATAL
    }
}
