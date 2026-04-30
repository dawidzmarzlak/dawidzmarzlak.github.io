package com.itsolutions.adapter.in.web.auth;

import com.itsolutions.adapter.out.persistence.admin.AdminUserJpaEntity;
import com.itsolutions.infrastructure.security.AuthApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

/**
 * Public auth endpoints — login, refresh, me.
 *
 * <p>{@code /login} and {@code /refresh} are wired {@code permitAll} in
 * {@code SecurityConfig} and skipped by {@code JwtAuthenticationFilter}.
 * {@code /me} reaches the controller only after the JWT filter populated the
 * {@code SecurityContext}; if no valid bearer was supplied, Spring Security
 * short-circuits with 401 before we get here.</p>
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Admin authentication")
public class AuthController {

    private final AuthApplicationService authService;

    @PostMapping("/login")
    @Operation(summary = "Admin login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            var result = authService.login(req.email(), req.password());
            return ResponseEntity.ok(new LoginResponse(
                result.accessToken(),
                result.refreshToken(),
                toUserDto(result.user())
            ));
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token")
    public ResponseEntity<?> refresh(@Valid @RequestBody RefreshRequest req) {
        try {
            var tokens = authService.refresh(req.refreshToken());
            return ResponseEntity.ok(new TokenResponse(
                tokens.accessToken(),
                tokens.refreshToken()
            ));
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid refresh token"));
        }
    }

    @GetMapping("/me")
    @Operation(summary = "Get current admin user")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(toUserDto(authService.me(auth.getName())));
    }

    private AdminUserDto toUserDto(AdminUserJpaEntity u) {
        return new AdminUserDto(u.getId(), u.getEmail(), u.getName(), u.getRole());
    }

    public record LoginRequest(@NotBlank String email, @NotBlank String password) {}

    public record LoginResponse(String accessToken, String refreshToken, AdminUserDto user) {}

    public record RefreshRequest(@NotBlank String refreshToken) {}

    public record TokenResponse(String accessToken, String refreshToken) {}

    public record AdminUserDto(UUID id, String email, String name, String role) {}
}
