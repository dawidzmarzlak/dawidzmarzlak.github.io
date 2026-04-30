package com.itsolutions.adapter.out.email;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Pure unit test (no Spring) for the {@code {{var}}} placeholder renderer.
 */
class EmailTemplateRendererTest {

    private final EmailTemplateRenderer renderer = new EmailTemplateRenderer();

    @Test
    void replaces_single_variable() {
        String out = renderer.render("Hello {{name}}", Map.of("name", "World"));
        assertThat(out).isEqualTo("Hello World");
    }

    @Test
    void replaces_multiple_variables() {
        Map<String, Object> vars = new LinkedHashMap<>();
        vars.put("greeting", "Hi");
        vars.put("name", "Anna");
        vars.put("punct", "!");
        String out = renderer.render("{{greeting}}, {{name}}{{punct}}", vars);
        assertThat(out).isEqualTo("Hi, Anna!");
    }

    @Test
    void missing_variable_renders_empty() {
        String out = renderer.render("Hello {{undefined}}!", new HashMap<>());
        assertThat(out).isEqualTo("Hello !");
    }

    @Test
    void null_template_returns_empty() {
        assertThat(renderer.render(null, Map.of("x", "y"))).isEqualTo("");
    }
}
