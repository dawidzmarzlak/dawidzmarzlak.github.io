package com.itsolutions.adapter.out.llm;

import com.github.tomakehurst.wiremock.junit5.WireMockExtension;
import com.itsolutions.domain.chat.port.out.LlmGateway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.urlPathMatching;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * WireMock-based tests for {@link GeminiLlmGateway}.
 *
 * <p>The gateway's {@code base-url} is overridden to point at the WireMock server.</p>
 */
class GeminiLlmGatewayTest {

    @RegisterExtension
    static WireMockExtension server = WireMockExtension.newInstance()
            .options(wireMockConfig().dynamicPort())
            .build();

    private GeminiLlmGateway gateway;

    @BeforeEach
    void setUp() {
        gateway = new GeminiLlmGateway(new SystemPromptBuilder(), new ChatActionDetector());
        ReflectionTestUtils.setField(gateway, "apiKey", "test-key");
        ReflectionTestUtils.setField(gateway, "model",  "gemini-1.5-flash");
        ReflectionTestUtils.setField(gateway, "baseUrl", server.baseUrl() + "/v1beta/models");
    }

    private LlmGateway.LlmRequest request(String userMsg, String locale) {
        return LlmGateway.LlmRequest.builder()
                .messages(List.of(new LlmGateway.LlmRequest.Message("user", userMsg)))
                .locale(locale)
                .build();
    }

    @Test
    void happy_path_with_usage_metadata_populates_tokens_used() {
        server.stubFor(post(urlPathMatching("/v1beta/models/gemini-1.5-flash:generateContent"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                                {
                                  "candidates": [
                                    {"content": {"parts": [{"text": "Hello there!"}], "role": "model"}}
                                  ],
                                  "usageMetadata": {"promptTokenCount": 10, "candidatesTokenCount": 5, "totalTokenCount": 15}
                                }
                                """)));

        LlmGateway.LlmResponse resp = gateway.chat(request("hi", "en"));

        assertThat(resp.isSuccess()).isTrue();
        assertThat(resp.getContent()).isEqualTo("Hello there!");
        assertThat(resp.getTokensUsed()).isEqualTo(15);
        assertThat(resp.getProviderName()).isEqualTo("gemini");
    }

    @Test
    void status_429_maps_to_quota_exceeded() {
        // NOTE: Gemini 429 is QUOTA_EXCEEDED (not RATE_LIMITED like Ollama).
        server.stubFor(post(urlPathMatching("/v1beta/models/.*:generateContent"))
                .willReturn(aResponse()
                        .withStatus(429)
                        .withBody("{\"error\":{\"code\":429,\"status\":\"RESOURCE_EXHAUSTED\"}}")));

        LlmGateway.LlmResponse resp = gateway.chat(request("hi", "en"));

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.QUOTA_EXCEEDED);
        assertThat(resp.getProviderName()).isEqualTo("gemini");
    }

    @Test
    void status_401_maps_to_fatal() {
        server.stubFor(post(urlPathMatching("/v1beta/models/.*:generateContent"))
                .willReturn(aResponse().withStatus(401).withBody("unauthorized")));

        LlmGateway.LlmResponse resp = gateway.chat(request("hi", "en"));

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.FATAL);
    }
}
