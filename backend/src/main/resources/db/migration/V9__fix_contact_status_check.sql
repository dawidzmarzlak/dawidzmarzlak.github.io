-- V9: Fix chk_contact_status — V3 re-created it with lowercase values, but
-- Hibernate @Enumerated(EnumType.STRING) writes UPPERCASE enum names. Same
-- mistake as the other modules' V4-V7 needed but Contact was missed.

ALTER TABLE contact_requests DROP CONSTRAINT IF EXISTS chk_contact_status;
ALTER TABLE contact_requests
  ADD CONSTRAINT chk_contact_status
  CHECK (status IN ('NEW','READ','REPLIED','ARCHIVED','SPAM'));
