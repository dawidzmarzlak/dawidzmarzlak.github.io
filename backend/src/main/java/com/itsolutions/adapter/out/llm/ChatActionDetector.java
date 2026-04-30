package com.itsolutions.adapter.out.llm;

import com.itsolutions.domain.chat.model.ChatAction;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;

/**
 * Heuristic detector that maps an LLM response (paired with the most recent user message)
 * to one of the {@link ChatAction} suggestions, or {@code null} when no action applies.
 *
 * <p>Ported from the Next.js {@code app/api/chat/route.ts} {@code detectAction()} function.
 * Locale-aware keyword matching for Polish and English.</p>
 */
@Component
public class ChatActionDetector {

    private static final List<String> QUOTE_KEYWORDS_PL = List.of(
            "wycena", "cena", "koszt", "ile kosztuje", "budzet", "budżet", "oferta");
    private static final List<String> QUOTE_KEYWORDS_EN = List.of(
            "quote", "price", "cost", "how much", "budget", "offer");

    private static final List<String> CONTACT_KEYWORDS_PL = List.of(
            "kontakt", "skontaktować", "skontaktowac", "porozmawiać", "porozmawiac", "zadzwonić", "zadzwonic");
    private static final List<String> CONTACT_KEYWORDS_EN = List.of(
            "contact", "get in touch", "reach out", "call", "talk");

    private static final List<String> LEAD_TRIGGERS_PL = List.of(
            "chcę zamówić", "chce zamowic", "potrzebuję strony", "potrzebuje strony",
            "interesuje mnie", "jestem zainteresowany");
    private static final List<String> LEAD_TRIGGERS_EN = List.of(
            "i want to order", "i need a website", "i am interested", "i'm interested", "interested in");

    private static final List<String> REDIRECT_HINTS_PL = List.of(
            "formularz", "wypełnij", "wypelnij", "przejdź", "przejdz");
    private static final List<String> REDIRECT_HINTS_EN = List.of(
            "form", "fill", "go to", "navigate");

    public ChatAction detect(String aiMessage, String lastUserMessage, String locale) {
        String ai = aiMessage == null ? "" : aiMessage.toLowerCase(Locale.ROOT);
        String user = lastUserMessage == null ? "" : lastUserMessage.toLowerCase(Locale.ROOT);
        String combined = user + " " + ai;
        boolean pl = locale == null || "pl".equalsIgnoreCase(locale);

        var quoteKw   = pl ? QUOTE_KEYWORDS_PL   : QUOTE_KEYWORDS_EN;
        var contactKw = pl ? CONTACT_KEYWORDS_PL : CONTACT_KEYWORDS_EN;
        var leadKw    = pl ? LEAD_TRIGGERS_PL    : LEAD_TRIGGERS_EN;
        var hints     = pl ? REDIRECT_HINTS_PL   : REDIRECT_HINTS_EN;

        boolean aiSuggestsRedirect = hints.stream().anyMatch(ai::contains);
        if (aiSuggestsRedirect && quoteKw.stream().anyMatch(combined::contains)) {
            return ChatAction.REDIRECT_QUOTE;
        }
        if (aiSuggestsRedirect && contactKw.stream().anyMatch(combined::contains)) {
            return ChatAction.REDIRECT_CONTACT;
        }
        if (leadKw.stream().anyMatch(user::contains)) {
            return ChatAction.COLLECT_LEAD;
        }
        return null;
    }
}
