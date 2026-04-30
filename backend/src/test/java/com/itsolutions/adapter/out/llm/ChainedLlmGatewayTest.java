package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Pure-JUnit tests for {@link ChainedLlmGateway} fallback behaviour.
 *
 * <p>Uses inline anonymous {@link LlmGateway} stubs (no Mockito, no Spring).</p>
 */
class ChainedLlmGatewayTest {

    private static final LlmGateway.LlmRequest REQUEST = LlmGateway.LlmRequest.builder()
            .messages(List.of(new LlmGateway.LlmRequest.Message("user", "hi")))
            .locale("pl")
            .build();

    private static LlmGateway stub(String name, LlmGateway.LlmResponse resp, AtomicInteger calls) {
        return new LlmGateway() {
            @Override public LlmResponse chat(LlmRequest request) {
                if (calls != null) calls.incrementAndGet();
                return resp;
            }
            @Override public String getProviderName() { return name; }
            @Override public String getModelName()    { return name + "-model"; }
        };
    }

    private static LlmGateway.LlmResponse ok(String name, String content) {
        return LlmGateway.LlmResponse.builder()
                .success(true).content(content)
                .responseTimeMs(10)
                .providerName(name)
                .build();
    }

    private static LlmGateway.LlmResponse err(String name, LlmGateway.ErrorType type, String msg) {
        return LlmGateway.LlmResponse.builder()
                .success(false).errorType(type).errorMessage(msg)
                .responseTimeMs(5)
                .providerName(name)
                .build();
    }

    @Test
    void returns_primary_response_on_success_without_calling_fallback() {
        AtomicInteger fallbackCalls = new AtomicInteger();
        LlmGateway primary  = stub("primary",  ok("primary", "ok"), null);
        LlmGateway fallback = stub("fallback", ok("fallback", "fb"), fallbackCalls);

        LlmGateway.LlmResponse resp = new ChainedLlmGateway(primary, fallback).chat(REQUEST);

        assertThat(resp.isSuccess()).isTrue();
        assertThat(resp.getContent()).isEqualTo("ok");
        assertThat(fallbackCalls.get()).isZero();
    }

    @Test
    void falls_back_on_quota_exceeded() {
        LlmGateway primary  = stub("primary",  err("primary", LlmGateway.ErrorType.QUOTA_EXCEEDED, "q"), null);
        LlmGateway fallback = stub("fallback", ok("fallback", "ok-fb"), null);

        LlmGateway.LlmResponse resp = new ChainedLlmGateway(primary, fallback).chat(REQUEST);

        assertThat(resp.isSuccess()).isTrue();
        assertThat(resp.getContent()).isEqualTo("ok-fb");
        assertThat(resp.getProviderName()).isEqualTo("fallback");
    }

    @Test
    void falls_back_on_rate_limited() {
        LlmGateway primary  = stub("primary",  err("primary", LlmGateway.ErrorType.RATE_LIMITED, "r"), null);
        LlmGateway fallback = stub("fallback", ok("fallback", "ok-fb"), null);

        LlmGateway.LlmResponse resp = new ChainedLlmGateway(primary, fallback).chat(REQUEST);

        assertThat(resp.isSuccess()).isTrue();
        assertThat(resp.getContent()).isEqualTo("ok-fb");
    }

    @Test
    void does_not_fall_back_on_fatal() {
        AtomicInteger fallbackCalls = new AtomicInteger();
        LlmGateway primary  = stub("primary",  err("primary", LlmGateway.ErrorType.FATAL, "boom"), null);
        LlmGateway fallback = stub("fallback", ok("fallback", "ok-fb"), fallbackCalls);

        LlmGateway.LlmResponse resp = new ChainedLlmGateway(primary, fallback).chat(REQUEST);

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.FATAL);
        assertThat(fallbackCalls.get()).isZero();
    }

    @Test
    void does_not_fall_back_on_transient() {
        AtomicInteger fallbackCalls = new AtomicInteger();
        LlmGateway primary  = stub("primary",  err("primary", LlmGateway.ErrorType.TRANSIENT, "timeout"), null);
        LlmGateway fallback = stub("fallback", ok("fallback", "ok-fb"), fallbackCalls);

        LlmGateway.LlmResponse resp = new ChainedLlmGateway(primary, fallback).chat(REQUEST);

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.TRANSIENT);
        assertThat(fallbackCalls.get()).isZero();
    }

    @Test
    void no_fallback_configured_returns_primary_error_directly() {
        LlmGateway primary = stub("primary", err("primary", LlmGateway.ErrorType.QUOTA_EXCEEDED, "q"), null);

        LlmGateway.LlmResponse resp = new ChainedLlmGateway(primary, null).chat(REQUEST);

        assertThat(resp.isSuccess()).isFalse();
        assertThat(resp.getErrorType()).isEqualTo(LlmGateway.ErrorType.QUOTA_EXCEEDED);
        assertThat(resp.getProviderName()).isEqualTo("primary");
    }
}
