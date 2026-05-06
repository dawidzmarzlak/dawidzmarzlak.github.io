package com.itsolutions.adapter.out.llm;

import com.github.tomakehurst.wiremock.junit5.WireMockExtension;
import com.itsolutions.domain.chat.model.ChatAction;
import com.itsolutions.domain.chat.port.out.LlmGateway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.containing;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.urlPathEqualTo;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * WireMock-based tests for {@link OllamaLlmGateway}.
 */
class OllamaLlmGatewayTest {

    @RegisterExtension
    static WireMockExtension server = WireMockExtension.newInstance()
            .options(wireMockConfig().dynamicPort())
            .build();

    private OllamaLlmGateway gateway;

    @BeforeEach
    void setUp() {
        gateway = new OllamaLlmGateway(new SystemPromptBuilder(), new ChatActionDetector());
        ReflectionTestUtils.setField(gateway, "url",    server.baseUrl());
        ReflectionTestUtils.setField(gateway, "model",  "llama3.2");
        ReflectionTestUtils.setField(gateway, "apiKey", "");
    }

    private LlmGateway.LlmRequest request(String userMsg, String locale) {
        return LlmGateway.LlmRequest.builder()
                .messages(List.of(new LlmGateway.LlmRequest.Message("user", userMsg)))
                .locale(locale)
                .build();
    }

    @Test
    void happy_path_returns_content_and_collect_lead_action_when_keywords_match() {
        server.stubFor(post(urlPathEqualTo("/api/chat"))
                .withHeader("Content-Type", containing("application/json"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                                {
                                  "model": "llama3.2",
                                  "message": {"role": "assistant", "content": "Świetnie, opowiedz więcej o projekcie."},
                                  "done": true
                                }
                                """)));

        LlmGateway.LlmResponse resp = gateway.chat(request("Chcę zamówić stronę firmową", "pl"));

        assertThat(resp.isSuccess()).isTrue();
        assertThat(resp.getContent()).contains("Świetnie");
        assertThat(resp.getProviderName()).isEqualTo("ollama");
        assertThat(resp.getResponseTimeMs()).isNotNull();
        assertThat(resp.getSuggestedAction()).isEqualTo(ChatAction.COLLECT_LEAD);
    }

    @Test
    void status_429_maps_to_rate_limited() {
        server.stubFor(post(urlPathEqualTo("/api/chat"))
                .willReturn(aResponse().withStatus(429).withBody("rate limited")));

        LlmGateway.LlmResponse resp = gateway.chat(request("hello", "pl"));

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.RATE_LIMITED);
        assertThat(resp.getProviderName()).isEqualTo("ollama");
    }

    @Test
    void status_503_maps_to_transient() {
        server.stubFor(post(urlPathEqualTo("/api/chat"))
                .willReturn(aResponse().withStatus(503).withBody("service unavailable")));

        LlmGateway.LlmResponse resp = gateway.chat(request("hello", "pl"));

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.TRANSIENT);
    }

    @Test
    void status_400_maps_to_fatal() {
        server.stubFor(post(urlPathEqualTo("/api/chat"))
                .willReturn(aResponse().withStatus(400).withBody("bad request")));

        LlmGateway.LlmResponse resp = gateway.chat(request("hello", "pl"));

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.FATAL);
    }
}
