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
 * LLM gateway backed by a local or self-hosted Ollama instance.
 *
 * <p>Ollama does not return token usage on the {@code /api/chat} endpoint by default,
 * so {@link LlmResponse#getTokensUsed()} is left {@code null}.</p>
 */
@Component("ollamaLlmGateway")
@RequiredArgsConstructor
@Slf4j
public class OllamaLlmGateway implements LlmGateway {

    private static final ObjectMapper JSON = new ObjectMapper();

    /** Force HTTP/1.1 — JDK 21's default HTTP/2 doesn't negotiate cleanly with Ollama or WireMock over plain h2c. */
    private static final RestClient REST_CLIENT = RestClient.builder()
            .requestFactory(new JdkClientHttpRequestFactory(
                    HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build()))
            .build();

    private final SystemPromptBuilder promptBuilder;
    private final ChatActionDetector actionDetector;

    @Value("${llm.ollama.url:http://localhost:11434}") private String url;
    @Value("${llm.ollama.model:llama3.2}")             private String model;
    @Value("${llm.ollama.api-key:}")                   private String apiKey;

    @Override public String getProviderName() { return "ollama"; }
    @Override public String getModelName()    { return model; }

    @Override
    public LlmResponse chat(LlmRequest request) {
        long t0 = System.currentTimeMillis();
        try {
            String systemPrompt = promptBuilder.build(request.getLocale(), request.getLeadContext());
            List<Map<String, String>> msgs = new ArrayList<>();
            msgs.add(Map.of("role", "system", "content", systemPrompt));
            for (var m : request.getMessages()) {
                msgs.add(Map.of("role", m.role(), "content", m.content()));
            }
            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("messages", msgs);
            body.put("stream", false);
            body.put("options", Map.of("temperature", 0.5, "num_predict", 500));

            var spec = REST_CLIENT.post().uri(url + "/api/chat")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body);
            if (apiKey != null && !apiKey.isBlank()) spec.header("Authorization", "Bearer " + apiKey);

            // .exchange() bypasses default status handlers — we own the response.
            ResponseEntity<String> entity = spec.exchange((req, res) -> {
                String b = res.getBody() == null ? "" :
                        new String(res.getBody().readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
                return ResponseEntity.status(res.getStatusCode()).body(b);
            }, false);

            HttpStatusCode status = entity.getStatusCode();
            if (status.is2xxSuccessful()) {
                Map<?, ?> resp = parseJson(entity.getBody());
                String content = "";
                if (resp != null && resp.get("message") instanceof Map<?, ?> mm) {
                    content = String.valueOf(mm.get("content"));
                }
                int elapsed = (int) Math.min(Integer.MAX_VALUE, System.currentTimeMillis() - t0);
                String lastUser = !request.getMessages().isEmpty()
                        ? request.getMessages().get(request.getMessages().size() - 1).content()
                        : "";
                return LlmResponse.builder()
                        .success(true).content(content)
                        .responseTimeMs(elapsed)
                        .providerName(getProviderName())
                        .suggestedAction(actionDetector.detect(content, lastUser, request.getLocale()))
                        .build();
            }
            if (status.value() == 429) {
                return error(t0, ErrorType.RATE_LIMITED, "Ollama 429: rate limited");
            }
            if (status.is4xxClientError()) {
                return error(t0, ErrorType.FATAL, "Ollama 4xx: " + status);
            }
            return error(t0, ErrorType.TRANSIENT, "Ollama 5xx: " + status);
        } catch (ResourceAccessException e) {
            return error(t0, ErrorType.TRANSIENT, "Ollama transient: " + e.getMessage());
        } catch (Exception e) {
            log.error("Ollama unexpected error: {}", e.getMessage(), e);
            return error(t0, ErrorType.TRANSIENT, e.getMessage());
        }
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
