package com.itsolutions.infrastructure.security;

import com.itsolutions.adapter.out.persistence.admin.AdminUserJpaEntity;
import com.itsolutions.adapter.out.persistence.admin.AdminUserJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

/**
 * Application service backing the public auth endpoints (login / refresh / me).
 *
 * <p>Delegates the BCrypt password check to the configured
 * {@link AuthenticationManager} (which wraps the {@code DaoAuthenticationProvider}
 * + {@link AdminUserDetailsService} pair from {@code SecurityConfig}). On
 * success, mints an access/refresh JWT pair via {@link JwtTokenProvider} and
 * stamps {@code last_login} on the admin row.</p>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthApplicationService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final AdminUserJpaRepository adminRepo;
    private final JwtTokenProvider jwtTokenProvider;

    public record LoginResult(String accessToken, String refreshToken, AdminUserJpaEntity user) {}

    public record TokenPair(String accessToken, String refreshToken) {}

    /**
     * Authenticate by email + password, mint a token pair, stamp {@code last_login}.
     *
     * @throws BadCredentialsException   wrong password
     * @throws UsernameNotFoundException unknown email or disabled account
     */
    @Transactional
    public LoginResult login(String email, String password) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            log.warn("Login failed for email={}: {}", email, e.getClass().getSimpleName());
            throw e;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        AdminUserJpaEntity user = adminRepo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(email));

        String accessToken = jwtTokenProvider.generateAccessToken(userDetails);
        String refreshToken = jwtTokenProvider.generateRefreshToken(userDetails);

        user.setLastLogin(Instant.now());
        adminRepo.save(user);

        return new LoginResult(accessToken, refreshToken, user);
    }

    /**
     * Validate the supplied refresh token and mint a fresh access/refresh pair.
     *
     * @throws BadCredentialsException invalid or expired refresh token
     */
    public TokenPair refresh(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        }
        String email = jwtTokenProvider.extractUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        return new TokenPair(
            jwtTokenProvider.generateAccessToken(userDetails),
            jwtTokenProvider.generateRefreshToken(userDetails)
        );
    }

    /**
     * Look up the admin row for the principal name carried on the current
     * {@code Authentication} (set by {@code JwtAuthenticationFilter}).
     */
    public AdminUserJpaEntity me(String email) {
        return adminRepo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(email));
    }
}
