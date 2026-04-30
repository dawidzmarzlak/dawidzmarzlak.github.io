-- V4: Align quote_requests schema with the domain model.
--
-- V1 used legacy lowercase service/status values that don't match the
-- ServiceType/QuoteStatus domain enums. Hibernate @Enumerated(EnumType.STRING)
-- writes UPPERCASE enum names, so the old CHECK constraints would reject every
-- insert. Drop them; rely on Hibernate enum binding for validation.

-- SAFETY: dropping these CHECK constraints is non-destructive — existing rows
-- (if any in dev/test DBs) keep their lowercase values and can still be read,
-- but new inserts will use UPPERCASE values from the JPA enum binding. The
-- adapter layer (QuoteMapper#toDomain) does not currently translate legacy
-- lowercase rows; in practice the V1 quote_requests table is empty in every
-- environment we care about (no V1/V2-era code path actually inserts data).
ALTER TABLE quote_requests
  DROP CONSTRAINT IF EXISTS chk_quote_service,
  DROP CONSTRAINT IF EXISTS chk_quote_size,
  DROP CONSTRAINT IF EXISTS chk_quote_status;

-- Add columns the domain model expects.
ALTER TABLE quote_requests
  ADD COLUMN IF NOT EXISTS updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS locale      VARCHAR(5)  NOT NULL DEFAULT 'pl',
  ADD COLUMN IF NOT EXISTS user_agent  TEXT,
  ADD COLUMN IF NOT EXISTS quoted_by   UUID;

-- SAFETY: status default in V1 was 'pending' (lowercase). The domain enum's
-- "new" state is QuoteStatus.NEW, which Hibernate writes as 'NEW'. Strip the
-- old default so new rows use the Hibernate-supplied uppercase value.
ALTER TABLE quote_requests ALTER COLUMN status DROP DEFAULT;

-- New child table for QuoteRequest.QuoteAttachment value objects. Owned by the
-- parent quote (ON DELETE CASCADE); JPA @OneToMany with @JoinColumn(quote_id)
-- manages the FK from the child side.
CREATE TABLE IF NOT EXISTS quote_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    content_type VARCHAR(100),
    file_size BIGINT,
    storage_path TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_attachments_quote ON quote_attachments(quote_id);

-- Auto-update updated_at on UPDATE (function defined in V1).
CREATE TRIGGER update_quote_requests_updated_at
    BEFORE UPDATE ON quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
