-- Fix admin password hash to actually match the documented 'admin123'.
--
-- The V2 seed inserted '$2a$10$rBV2JDeWW3.vKyeQcM8fHe8i2vLUNbhnW6VlK8Hn2sN7HQkQjK3vS'
-- with the comment "Password: admin123 (BCrypt hashed)" — but the hash does NOT
-- BCrypt-verify against 'admin123' (verified with Spring's BCryptPasswordEncoder
-- before writing this migration). The hash below was generated fresh and was
-- confirmed to match.
UPDATE admin_users
   SET password_hash = '$2a$10$Fxw8vU5RdnX5gMZvpu6SMeg/QxX5qHPWrrqIz6FQNCM2ozNp3JfPm'
 WHERE email = 'admin@itsolutions.pl';
