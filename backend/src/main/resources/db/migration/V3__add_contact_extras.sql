-- V3: Extend contact_requests with BriefForm fields (subject, company, locale, quote payload).
--      Convert replied_by VARCHAR -> UUID, expand status check to include 'spam',
--      add updated_at and email index.

ALTER TABLE contact_requests
  ADD COLUMN IF NOT EXISTS subject       VARCHAR(200),
  ADD COLUMN IF NOT EXISTS company       VARCHAR(255),
  ADD COLUMN IF NOT EXISTS locale        VARCHAR(5)  NOT NULL DEFAULT 'pl',
  ADD COLUMN IF NOT EXISTS quote_total   NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS quote_payload JSONB,
  ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Convert replied_by from VARCHAR(255) (V1) to UUID to match the domain model.
-- Existing values must be valid UUID strings; in fresh dev/test DBs the column is empty.
-- SAFETY: The USING NULLIF(replied_by, '')::uuid cast assumes every existing value is either
-- NULL or the empty string. This holds today because no V1/V2-era code path actually writes
-- to replied_by, so the cast cannot encounter a non-empty non-UUID string. If a future
-- migration discovers non-empty non-UUID values, run a cleanup migration first.
ALTER TABLE contact_requests
  ALTER COLUMN replied_by TYPE UUID USING NULLIF(replied_by, '')::uuid;

-- Replace status check to include 'spam' (V1 only had 'new','read','replied','archived').
ALTER TABLE contact_requests
  DROP CONSTRAINT IF EXISTS chk_contact_status;
ALTER TABLE contact_requests
  ADD CONSTRAINT chk_contact_status CHECK (status IN ('new','read','replied','archived','spam'));

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contact_requests(email);
