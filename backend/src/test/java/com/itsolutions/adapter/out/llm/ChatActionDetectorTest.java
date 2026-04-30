package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.model.ChatAction;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Plain JUnit tests for {@link ChatActionDetector}'s keyword heuristics.
 */
class ChatActionDetectorTest {

    private final ChatActionDetector detector = new ChatActionDetector();

    @Test
    void returns_null_when_no_keywords_match() {
        ChatAction action = detector.detect(
                "Witaj, czym mogę pomóc?",
                "Cześć",
                "pl");
        assertThat(action).isNull();
    }

    @Test
    void returns_redirect_quote_when_ai_mentions_form_and_user_asks_about_pricing_pl() {
        ChatAction action = detector.detect(
                "Najlepiej wypełnij formularz wyceny — szybko przygotuję ofertę.",
                "Ile kosztuje strona internetowa?",
                "pl");
        assertThat(action).isEqualTo(ChatAction.REDIRECT_QUOTE);
    }

    @Test
    void returns_redirect_quote_in_english() {
        ChatAction action = detector.detect(
                "Please fill out the form for a detailed quote.",
                "How much does a website cost?",
                "en");
        assertThat(action).isEqualTo(ChatAction.REDIRECT_QUOTE);
    }

    @Test
    void returns_redirect_contact_when_ai_mentions_form_and_user_asks_for_contact_pl() {
        ChatAction action = detector.detect(
                "Zapraszam do wypełnienia formularza kontaktowego.",
                "Chciałbym się z Państwem skontaktować.",
                "pl");
        assertThat(action).isEqualTo(ChatAction.REDIRECT_CONTACT);
    }

    @Test
    void returns_collect_lead_on_polish_intent_phrase_regardless_of_ai_message() {
        ChatAction action = detector.detect(
                "Świetnie, opowiedz mi więcej o swoim projekcie.",
                "Chcę zamówić stronę firmową",
                "pl");
        assertThat(action).isEqualTo(ChatAction.COLLECT_LEAD);
    }

    @Test
    void returns_collect_lead_on_english_intent_phrase() {
        ChatAction action = detector.detect(
                "Great, tell me more about your project.",
                "I want to order a website",
                "en");
        assertThat(action).isEqualTo(ChatAction.COLLECT_LEAD);
    }

    @Test
    void returns_null_when_keywords_match_but_ai_has_no_redirect_hint() {
        // Quote keyword is present in the user message, but AI does not suggest a form/redirect.
        ChatAction action = detector.detect(
                "Cena zależy od zakresu prac.",
                "Jaka jest cena?",
                "pl");
        assertThat(action).isNull();
    }
}
