package com.itsolutions.domain.quote.port.in;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Use case for sending a quote/proposal to client.
 */
public interface SendQuoteUseCase {

    /**
     * Send a quote/proposal to the client.
     *
     * @param command Quote details
     * @return Result indicating success
     */
    SendQuoteResult execute(SendQuoteCommand command);

    @Getter
    @Builder
    class SendQuoteCommand {
        private final UUID quoteId;
        private final UUID adminId;
        private final BigDecimal amount;
        private final String currency;
        private final String subject;
        private final String message;
        private final String validUntil;
    }

    @Getter
    @Builder
    class SendQuoteResult {
        private final boolean success;
        private final boolean emailSent;
        private final String errorMessage;
    }
}
