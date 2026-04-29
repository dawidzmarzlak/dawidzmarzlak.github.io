package com.itsolutions.domain.contact.port.in;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

/**
 * Use case for submitting contact form.
 */
public interface SubmitContactUseCase {

    /**
     * Submit a new contact form request.
     *
     * @param command The contact form data
     * @return Result with created contact request ID
     */
    SubmitContactResult execute(SubmitContactCommand command);

    @Getter
    @Builder
    class SubmitContactCommand {
        private final String name;
        private final String email;
        private final String phone;
        private final String company;
        private final String subject;
        private final String message;
        private final String locale;
        private final String ipAddress;
        private final String userAgent;
        private final String turnstileToken;
    }

    @Getter
    @Builder
    class SubmitContactResult {
        private final UUID contactId;
        private final boolean emailSent;
    }
}
