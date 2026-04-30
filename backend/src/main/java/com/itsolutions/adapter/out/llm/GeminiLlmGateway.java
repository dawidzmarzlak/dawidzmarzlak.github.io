package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * LLM gateway backed by Google Gemini's {@code generativelanguage} REST API.
 *
 * <p>{@code base-url} is injectable so tests can point at a WireMock server.</p>
 */
@Component("geminiLlmGateway")
@RequiredArgsConstructor
@Slf4j
public class GeminiLlmGateway implements LlmGateway {

    private final SystemPromptBuilder promptBuilder;
    private final ChatActionDetector actionDetector;

    @Value("${llm.gemini.api-key:}")                                                              private String apiKey;
    @Value("${llm.gemini.model:gemini-1.5-flash}")                                                private String model;
    @Value("${llm.gemini.base-url:https://generativelanguage.googleapis.com/v1beta/models}")      private String baseUrl;

    @Override public String getProviderName() { return "gemini"; }
    @Override public String getModelName()    { return model; }

    @Override
    public LlmResponse chat(LlmRequest request) {
        long t0 = System.currentTimeMillis();
        if (apiKey == null || apiKey.isBlank()) {
            return error(t0, ErrorType.FATAL, "GEMINI_API_KEY not configured");
        }
        try {
            String systemPrompt = promptBuilder.build(request.getLocale(), request.getLeadContext());
            List<Map<String, Object>> contents = new ArrayList<>();
            for (var m : request.getMessages()) {
                contents.add(Map.of(
                        "role", "assistant".equals(m.role()) ? "model" : "user",
                        "parts", List.of(Map.of("text", m.content()))
                ));
            }
            Map<String, Object> body = new HashMap<>();
            if (!systemPrompt.isBlank()) {
                body.put("systemInstruction", Map.of("parts", List.of(Map.of("text", systemPrompt))));
            }
            body.put("contents", contents);
            body.put("generationConfig", Map.of("temperature", 0.3, "maxOutputTokens", 500));

            Map<?, ?> resp = RestClient.create()
                    .post()
                    .uri(baseUrl + "/" + model + ":generateContent?key={k}", apiKey)
                    .body(body)
                    .retrieve()
                    .body(Map.class);

            String content = extractText(resp);
            Integer tokens = extractTokens(resp);
            int elapsed = (int) Math.min(Integer.MAX_VALUE, System.currentTimeMillis() - t0);
            String lastUser = !request.getMessages().isEmpty()
                    ? request.getMessages().get(request.getMessages().size() - 1).content()
                    : "";
            return LlmResponse.builder()
                    .success(true).content(content).tokensUsed(tokens)
                    .responseTimeMs(elapsed)
                    .providerName(getProviderName())
                    .suggestedAction(actionDetector.detect(content, lastUser, request.getLocale()))
                    .build();
        } catch (HttpClientErrorException.TooManyRequests e) {
            return error(t0, ErrorType.QUOTA_EXCEEDED, "Gemini 429: " + e.getResponseBodyAsString());
        } catch (HttpClientErrorException e) {
            int sc = e.getStatusCode().value();
            return error(t0,
                    (sc == 401 || sc == 403) ? ErrorType.FATAL : ErrorType.FATAL,
                    "Gemini " + sc + ": " + e.getResponseBodyAsString());
        } catch (HttpServerErrorException | ResourceAccessException e) {
            return error(t0, ErrorType.TRANSIENT, "Gemini transient: " + e.getMessage());
        } catch (Exception e) {
            log.error("Gemini unexpected error: {}", e.getMessage(), e);
            return error(t0, ErrorType.TRANSIENT, e.getMessage());
        }
    }

    private String extractText(Map<?, ?> resp) {
        if (resp == null) return "";
        Object cand = resp.get("candidates");
        if (cand instanceof List<?> list && !list.isEmpty() && list.get(0) instanceof Map<?, ?> c0) {
            Object content = c0.get("content");
            if (content instanceof Map<?, ?> ct && ct.get("parts") instanceof List<?> parts && !parts.isEmpty()) {
                if (parts.get(0) instanceof Map<?, ?> pp && pp.get("text") != null) return String.valueOf(pp.get("text"));
            }
        }
        return "";
    }

    private Integer extractTokens(Map<?, ?> resp) {
        if (resp == null) return null;
        Object usage = resp.get("usageMetadata");
        if (usage instanceof Map<?, ?> u && u.get("totalTokenCount") instanceof Number n) {
            return n.intValue();
        }
        return null;
    }

    private LlmResponse error(long t0, ErrorType type, String msg) {
        int elapsed = (int) Math.min(Integer.MAX_VALUE, System.currentTimeMillis() - t0);
        return LlmResponse.builder()
                .success(false).errorType(type).errorMessage(msg)
                .responseTimeMs(elapsed)
                .providerName(getProviderName())
                .build();
    }
}
