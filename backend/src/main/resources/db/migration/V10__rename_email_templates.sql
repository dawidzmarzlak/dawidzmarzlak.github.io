-- V10: Align email_templates.name to what the application services actually look up.
-- V2 seeded the original names; the codebase that referenced them was renamed
-- but the seed wasn't updated. Rather than re-seed, rename in place.

UPDATE email_templates SET name = 'contact_admin_notification' WHERE name = 'admin_new_contact';
UPDATE email_templates SET name = 'quote_admin_notification'   WHERE name = 'admin_new_quote';
UPDATE email_templates SET name = 'quote_proposal'             WHERE name = 'quote_ready';
