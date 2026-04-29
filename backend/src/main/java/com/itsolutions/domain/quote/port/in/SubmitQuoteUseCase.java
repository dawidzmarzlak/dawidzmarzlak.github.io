package com.itsolutions.domain.quote.port.in;

import com.itsolutions.domain.quote.model.ProjectSize;
import com.itsolutions.domain.quote.model.ServiceType;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

/**
 * Use case for submitting quote request.
 */
public interface SubmitQuoteUseCase {

    /**
     * Submit a new quote request.
     *
     * @param command The quote form data
     * @return Result with created quote request ID
     */
    SubmitQuoteResult execute(SubmitQuoteCommand command);

    @Getter
    @Builder
    class SubmitQuoteCommand {
        private final String name;
        private final String email;
        private final String phone;
        private final String company;
        private final ServiceType serviceType;
        private final ProjectSize projectSize;
        private final String budget;
        private final String timeline;
        private final String description;
        private final String locale;
        private final String ipAddress;
        private final String userAgent;
        private final String turnstileToken;
    }

    @Getter
    @Builder
    class SubmitQuoteResult {
        private final UUID quoteId;
        private final boolean emailSent;
    }
}
