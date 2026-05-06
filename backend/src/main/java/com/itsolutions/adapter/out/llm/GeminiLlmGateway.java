package com.itsolutions.adapter.out.llm;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;

import java.net.http.HttpClient;

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

    private static final ObjectMapper JSON = new ObjectMapper();

    /** Force HTTP/1.1 — Gemini's REST endpoint is fine with HTTP/2 in prod, but
     * tests use WireMock which doesn't speak h2c, and JDK 21 defaults to HTTP/2. */
    private static final RestClient REST_CLIENT = RestClient.builder()
            .requestFactory(new JdkClientHttpRequestFactory(
                    HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build()))
            .build();

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

            // Build URI manually — Spring's URI template parser chokes on the ":generateContent" segment.
            String encodedKey = java.net.URLEncoder.encode(apiKey, java.nio.charset.StandardCharsets.UTF_8);
            java.net.URI uri = java.net.URI.create(baseUrl + "/" + model + ":generateContent?key=" + encodedKey);

            ResponseEntity<String> entity = REST_CLIENT.post()
                    .uri(uri)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .exchange((req, res) -> {
                        String b = res.getBody() == null ? "" :
                                new String(res.getBody().readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
                        return ResponseEntity.status(res.getStatusCode()).body(b);
                    }, false);

            HttpStatusCode status = entity.getStatusCode();
            if (status.is2xxSuccessful()) {
                Map<?, ?> resp = parseJson(entity.getBody());
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
            }
            // Gemini's 429 is RESOURCE_EXHAUSTED (per-minute or daily quota). Treat as fallback-trigger.
            if (status.value() == 429) {
                return error(t0, ErrorType.QUOTA_EXCEEDED, "Gemini 429: " + entity.getBody());
            }
            if (status.is4xxClientError()) {
                return error(t0, ErrorType.FATAL, "Gemini " + status + ": " + entity.getBody());
            }
            return error(t0, ErrorType.TRANSIENT, "Gemini 5xx: " + status);
        } catch (ResourceAccessException e) {
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

    private static Map<?, ?> parseJson(String body) {
        if (body == null || body.isBlank()) return null;
        try { return JSON.readValue(body, Map.class); }
        catch (Exception e) { return null; }
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
