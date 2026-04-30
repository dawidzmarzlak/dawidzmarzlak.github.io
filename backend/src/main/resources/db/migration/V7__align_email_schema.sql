-- V7: Align email_logs schema with the domain model.

-- SAFETY: dropping the status CHECK constraint is non-destructive. Existing rows
-- (none, in dev/test) keep their lowercase values; new inserts use UPPERCASE
-- enum names from Hibernate @Enumerated(EnumType.STRING). The domain enum is
-- {SENT, FAILED, QUEUED, BOUNCED} -- V1 was missing QUEUED entirely, so the
-- constraint would reject it.
ALTER TABLE email_logs DROP CONSTRAINT IF EXISTS chk_email_status;

-- SAFETY: status default in V1 was 'pending' (lowercase). Strip so new rows
-- use Hibernate-supplied UPPERCASE values.
ALTER TABLE email_logs ALTER COLUMN status DROP DEFAULT;

-- Add sent_at column the domain model expects.
ALTER TABLE email_logs
  ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_email_logs_template_name ON email_logs(template_name);
