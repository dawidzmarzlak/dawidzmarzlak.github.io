package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.EnumSet;
import java.util.Set;

/**
 * Two-tier LLM gateway with primary + optional fallback.
 *
 * <p>Falls back ONLY when the primary returns {@link ErrorType#QUOTA_EXCEEDED} or
 * {@link ErrorType#RATE_LIMITED} — transient/fatal errors are surfaced directly.</p>
 *
 * <p>Not a {@code @Component} — wired manually by {@link LlmGatewayConfig}.</p>
 */
@Slf4j
@RequiredArgsConstructor
public class ChainedLlmGateway implements LlmGateway {

    private static final Set<ErrorType> FALLBACK_TRIGGERS =
            EnumSet.of(ErrorType.QUOTA_EXCEEDED, ErrorType.RATE_LIMITED);

    private final LlmGateway primary;
    private final LlmGateway fallback;   // may be null

    @Override
    public String getProviderName() {
        return fallback == null
                ? primary.getProviderName()
                : primary.getProviderName() + "->" + fallback.getProviderName();
    }

    @Override
    public String getModelName() {
        return fallback == null
                ? primary.getModelName()
                : primary.getModelName() + "/" + fallback.getModelName();
    }

    @Override
    public LlmResponse chat(LlmRequest request) {
        LlmResponse r = primary.chat(request);
        if (r.isSuccess()) return r;
        if (fallback != null && r.getErrorType() != null && FALLBACK_TRIGGERS.contains(r.getErrorType())) {
            log.warn("LLM primary={} returned {} ({}) — falling back to {}",
                    primary.getProviderName(), r.getErrorType(), r.getErrorMessage(), fallback.getProviderName());
            LlmResponse f = fallback.chat(request);
            if (!f.isSuccess()) {
                log.error("LLM fallback={} also failed: {} ({})",
                        fallback.getProviderName(), f.getErrorType(), f.getErrorMessage());
            }
            return f;
        }
        return r;
    }
}
