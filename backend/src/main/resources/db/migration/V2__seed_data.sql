-- IT Solutions Database Seed Data
-- Version 2: Initial data

-- ============ DEFAULT ADMIN USER ============
-- Password: admin123 (BCrypt hashed)
INSERT INTO admin_users (id, email, password_hash, name, role, active)
VALUES (
    uuid_generate_v4(),
    'admin@itsolutions.pl',
    '$2a$10$rBV2JDeWW3.vKyeQcM8fHe8i2vLUNbhnW6VlK8Hn2sN7HQkQjK3vS',
    'Administrator',
    'admin',
    true
);

-- ============ EMAIL TEMPLATES ============

-- Contact confirmation (PL)
INSERT INTO email_templates (id, name, subject_pl, subject_en, body_pl, body_en, variables, active)
VALUES (
    uuid_generate_v4(),
    'contact_confirmation',
    'Dziękujemy za kontakt - IT Solutions',
    'Thank you for contacting us - IT Solutions',
    '<h2>Dziękujemy za wiadomość, {{name}}!</h2>
<p>Otrzymaliśmy Twoją wiadomość i odpowiemy najszybciej jak to możliwe, zazwyczaj w ciągu 24 godzin.</p>
<p>Twoja wiadomość:</p>
<blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
{{message}}
</blockquote>
<p>Pozdrawiamy,<br>Zespół IT Solutions</p>',
    '<h2>Thank you for your message, {{name}}!</h2>
<p>We received your message and will respond as soon as possible, usually within 24 hours.</p>
<p>Your message:</p>
<blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
{{message}}
</blockquote>
<p>Best regards,<br>IT Solutions Team</p>',
    '["name", "message"]'::jsonb,
    true
);

-- Quote confirmation
INSERT INTO email_templates (id, name, subject_pl, subject_en, body_pl, body_en, variables, active)
VALUES (
    uuid_generate_v4(),
    'quote_confirmation',
    'Otrzymaliśmy Twoje zapytanie o wycenę - {{reference}}',
    'We received your quote request - {{reference}}',
    '<h2>Dziękujemy za zapytanie, {{name}}!</h2>
<p>Otrzymaliśmy Twoje zapytanie o wycenę i przygotujemy ofertę w ciągu 48 godzin.</p>
<p><strong>Numer referencyjny:</strong> {{reference}}</p>
<p><strong>Usługa:</strong> {{service}}</p>
<p><strong>Rozmiar projektu:</strong> {{projectSize}}</p>
<p>Skontaktujemy się z Tobą pod adresem {{email}} z przygotowaną ofertą.</p>
<p>Pozdrawiamy,<br>Zespół IT Solutions</p>',
    '<h2>Thank you for your request, {{name}}!</h2>
<p>We received your quote request and will prepare an offer within 48 hours.</p>
<p><strong>Reference number:</strong> {{reference}}</p>
<p><strong>Service:</strong> {{service}}</p>
<p><strong>Project size:</strong> {{projectSize}}</p>
<p>We will contact you at {{email}} with our offer.</p>
<p>Best regards,<br>IT Solutions Team</p>',
    '["name", "email", "reference", "service", "projectSize"]'::jsonb,
    true
);

-- Quote ready notification
INSERT INTO email_templates (id, name, subject_pl, subject_en, body_pl, body_en, variables, active)
VALUES (
    uuid_generate_v4(),
    'quote_ready',
    'Twoja wycena jest gotowa - {{reference}}',
    'Your quote is ready - {{reference}}',
    '<h2>Cześć {{name}},</h2>
<p>Przygotowaliśmy wycenę dla Twojego projektu.</p>
<p><strong>Numer referencyjny:</strong> {{reference}}</p>
<p><strong>Kwota:</strong> {{amount}} PLN</p>
<p>Skontaktuj się z nami, aby omówić szczegóły i rozpocząć współpracę.</p>
<p>Pozdrawiamy,<br>Zespół IT Solutions</p>',
    '<h2>Hi {{name}},</h2>
<p>We have prepared a quote for your project.</p>
<p><strong>Reference number:</strong> {{reference}}</p>
<p><strong>Amount:</strong> {{amount}} PLN</p>
<p>Contact us to discuss the details and start the collaboration.</p>
<p>Best regards,<br>IT Solutions Team</p>',
    '["name", "reference", "amount"]'::jsonb,
    true
);

-- New contact notification (for admin)
INSERT INTO email_templates (id, name, subject_pl, subject_en, body_pl, body_en, variables, active)
VALUES (
    uuid_generate_v4(),
    'admin_new_contact',
    '[IT Solutions] Nowe zapytanie od {{name}}',
    '[IT Solutions] New inquiry from {{name}}',
    '<h2>Nowe zapytanie kontaktowe</h2>
<p><strong>Od:</strong> {{name}} ({{email}})</p>
<p><strong>Telefon:</strong> {{phone}}</p>
<p><strong>Wiadomość:</strong></p>
<blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
{{message}}
</blockquote>
<p><a href="{{adminUrl}}/contacts/{{contactId}}">Zobacz w panelu admina</a></p>',
    '<h2>New contact inquiry</h2>
<p><strong>From:</strong> {{name}} ({{email}})</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Message:</strong></p>
<blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
{{message}}
</blockquote>
<p><a href="{{adminUrl}}/contacts/{{contactId}}">View in admin panel</a></p>',
    '["name", "email", "phone", "message", "adminUrl", "contactId"]'::jsonb,
    true
);

-- New quote notification (for admin)
INSERT INTO email_templates (id, name, subject_pl, subject_en, body_pl, body_en, variables, active)
VALUES (
    uuid_generate_v4(),
    'admin_new_quote',
    '[IT Solutions] Nowe zapytanie o wycenę - {{reference}}',
    '[IT Solutions] New quote request - {{reference}}',
    '<h2>Nowe zapytanie o wycenę</h2>
<p><strong>Referencja:</strong> {{reference}}</p>
<p><strong>Od:</strong> {{name}} ({{email}})</p>
<p><strong>Firma:</strong> {{company}}</p>
<p><strong>Usługa:</strong> {{service}}</p>
<p><strong>Rozmiar:</strong> {{projectSize}}</p>
<p><strong>Budżet:</strong> {{budget}}</p>
<p><strong>Opis:</strong></p>
<blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
{{description}}
</blockquote>
<p><a href="{{adminUrl}}/quotes/{{quoteId}}">Zobacz w panelu admina</a></p>',
    '<h2>New quote request</h2>
<p><strong>Reference:</strong> {{reference}}</p>
<p><strong>From:</strong> {{name}} ({{email}})</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>Service:</strong> {{service}}</p>
<p><strong>Size:</strong> {{projectSize}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Description:</strong></p>
<blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
{{description}}
</blockquote>
<p><a href="{{adminUrl}}/quotes/{{quoteId}}">View in admin panel</a></p>',
    '["reference", "name", "email", "company", "service", "projectSize", "budget", "description", "adminUrl", "quoteId"]'::jsonb,
    true
);
