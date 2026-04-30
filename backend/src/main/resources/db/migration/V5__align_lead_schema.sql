-- V5: Align leads + lead_notes schema with the domain model.
--
-- V1 used legacy lowercase source/status values that clash with UPPERCASE
-- enum names written by Hibernate @Enumerated(EnumType.STRING). Drop the
-- check constraints and rely on Hibernate enum binding for validation.

-- SAFETY: dropping these CHECK constraints is non-destructive — existing rows
-- (if any in dev/test DBs) keep their lowercase values and can still be read,
-- but new inserts will use UPPERCASE values from the JPA enum binding. The
-- adapter layer (LeadMapper#toDomain) does not currently translate legacy
-- lowercase rows; in practice the V1 leads table is empty in every
-- environment we care about (no V1/V2-era code path actually inserts data).
-- The V1 source CHECK was also missing MANUAL/REFERRAL/OTHER/CONTACT_FORM/
-- QUOTE_FORM, and the status CHECK was missing SPAM, so the constraints
-- would reject every domain-driven insert anyway.
ALTER TABLE leads
  DROP CONSTRAINT IF EXISTS chk_lead_source,
  DROP CONSTRAINT IF EXISTS chk_lead_status;

-- SAFETY: status default in V1 was 'new' (lowercase). The domain enum's "new"
-- state is LeadStatus.NEW, which Hibernate writes as 'NEW'. Strip the old
-- default so new rows use the Hibernate-supplied uppercase value.
ALTER TABLE leads ALTER COLUMN status DROP DEFAULT;

-- SAFETY: drop the legacy 'notes TEXT' column on leads — it duplicates the
-- lead_notes child table that the domain model uses. No data exists in this
-- column yet (no V1/V2-era code path writes to it), so the drop is safe.
ALTER TABLE leads DROP COLUMN IF EXISTS notes;

-- Add columns the domain model expects.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS estimated_value     NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS currency            VARCHAR(3),
  ADD COLUMN IF NOT EXISTS tags                TEXT,
  ADD COLUMN IF NOT EXISTS assigned_to         UUID,
  ADD COLUMN IF NOT EXISTS contact_request_id  UUID REFERENCES contact_requests(id),
  ADD COLUMN IF NOT EXISTS quote_request_id    UUID REFERENCES quote_requests(id),
  ADD COLUMN IF NOT EXISTS contacted_at        TIMESTAMP WITH TIME ZONE;

-- SAFETY: V1 declared lead_notes.created_by VARCHAR(255). The domain model
-- uses UUID createdBy. The cast assumes existing values are NULL or empty
-- (no working write path to lead_notes exists in V1/V2 era). If a future
-- migration finds non-empty non-UUID values, run a cleanup migration first.
ALTER TABLE lead_notes
  ALTER COLUMN created_by TYPE UUID USING NULLIF(created_by, '')::uuid;

-- Note: no trigger for update_leads_updated_at is needed — V1 already created
-- it on the leads table (V1__init_schema.sql lines 216-219).

-- Indices for new filterable / FK columns (mirror V1 conventions).
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to     ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_contact_request ON leads(contact_request_id);
CREATE INDEX IF NOT EXISTS idx_leads_quote_request   ON leads(quote_request_id);
