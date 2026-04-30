package com.itsolutions.adapter.out.email;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Minimal {@code {{var}}} placeholder renderer for email templates.
 *
 * <p>Handles whitespace inside the braces ({@code {{ name }}}) and renders missing
 * variables as the empty string (rather than leaving the placeholder visible).
 * A {@code null} template renders to {@code ""} so callers don't need null-checks.</p>
 */
@Component
public class EmailTemplateRenderer {

    private static final Pattern VAR = Pattern.compile("\\{\\{\\s*(\\w+)\\s*\\}\\}");

    public String render(String template, Map<String, Object> variables) {
        if (template == null) {
            return "";
        }
        Matcher m = VAR.matcher(template);
        StringBuilder out = new StringBuilder();
        while (m.find()) {
            Object v = variables == null ? null : variables.get(m.group(1));
            m.appendReplacement(out, Matcher.quoteReplacement(v != null ? v.toString() : ""));
        }
        m.appendTail(out);
        return out.toString();
    }
}
