package com.itsolutions.adapter.in.web;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

/**
 * Service for verifying Cloudflare Turnstile tokens.
 */
@Service
@Slf4j
public class TurnstileService {

    private static final String TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    @Value("${security.turnstile.secret-key:}")
    private String secretKey;

    @Value("${security.turnstile.enabled:false}")
    private boolean enabled;

    private final RestClient restClient;

    public TurnstileService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    /**
     * Verify a Turnstile token.
     *
     * @param token The token from the client
     * @param remoteIp The client's IP address (optional)
     * @return true if verification passed or is disabled, false otherwise
     */
    public boolean verify(String token, String remoteIp) {
        if (!enabled) {
            log.debug("Turnstile verification disabled, allowing request");
            return true;
        }

        if (token == null || token.isBlank()) {
            log.warn("Turnstile token is empty");
            return false;
        }

        if (secretKey == null || secretKey.isBlank()) {
            log.warn("Turnstile secret key not configured, allowing request");
            return true;
        }

        try {
            MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
            formData.add("secret", secretKey);
            formData.add("response", token);
            if (remoteIp != null && !remoteIp.isBlank()) {
                formData.add("remoteip", remoteIp);
            }

            TurnstileResponse response = restClient.post()
                    .uri(TURNSTILE_VERIFY_URL)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(formData)
                    .retrieve()
                    .body(TurnstileResponse.class);

            if (response != null && response.success()) {
                log.debug("Turnstile verification successful");
                return true;
            } else {
                log.warn("Turnstile verification failed: {}", response != null ? response.errorCodes() : "null response");
                return false;
            }
        } catch (Exception e) {
            log.error("Error verifying Turnstile token: {}", e.getMessage());
            // Fail open in case of service error (configurable)
            return true;
        }
    }

    record TurnstileResponse(
            boolean success,
            @JsonProperty("error-codes") String[] errorCodes,
            @JsonProperty("challenge_ts") String challengeTs,
            String hostname
    ) {}
}
