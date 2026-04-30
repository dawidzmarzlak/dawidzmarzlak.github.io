package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.port.out.LlmGateway;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.Locale;
import java.util.Map;

/**
 * Wires the {@code @Primary} {@link LlmGateway} bean by selecting a primary and an
 * optional fallback gateway from {@code llm.primary} / {@code llm.fallback} config.
 *
 * <p>Both Ollama and Gemini gateways are always registered; this config picks among
 * them. Throws on misconfiguration so the application fails fast at startup.</p>
 */
@Configuration
@Slf4j
public class LlmGatewayConfig {

    @Bean
    @Primary
    public LlmGateway llmGateway(
            @Qualifier("ollamaLlmGateway") LlmGateway ollama,
            @Qualifier("geminiLlmGateway") LlmGateway gemini,
            @Value("${llm.primary:ollama}")  String primary,
            @Value("${llm.fallback:}")       String fallback
    ) {
        Map<String, LlmGateway> beans = Map.of("ollama", ollama, "gemini", gemini);
        LlmGateway p = beans.get(primary.toLowerCase(Locale.ROOT));
        if (p == null) {
            throw new IllegalStateException(
                    "Unknown llm.primary=" + primary + " (allowed: ollama, gemini)");
        }

        LlmGateway f = (fallback == null || fallback.isBlank())
                ? null
                : beans.get(fallback.toLowerCase(Locale.ROOT));
        if (fallback != null && !fallback.isBlank() && f == null) {
            throw new IllegalStateException(
                    "Unknown llm.fallback=" + fallback + " (allowed: ollama, gemini, or empty)");
        }
        if (f == p) {
            log.warn("llm.fallback equals llm.primary ({}). Ignoring fallback.", primary);
            f = null;
        }
        log.info("LLM chain: primary={} fallback={}",
                p.getProviderName(),
                f != null ? f.getProviderName() : "<none>");
        return new ChainedLlmGateway(p, f);
    }
}
