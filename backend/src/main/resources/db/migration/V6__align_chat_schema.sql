-- V6: Align chat_sessions + chat_messages schema with the domain model.
--
-- V1 used legacy lowercase status/role values that clash with UPPERCASE enum
-- names written by Hibernate @Enumerated(EnumType.STRING). Drop the check
-- constraints and rely on Hibernate enum binding for validation.

-- SAFETY: dropping these CHECK constraints is non-destructive — no V1/V2-era
-- code path actually inserts data into chat_sessions or chat_messages, so
-- they are empty in every environment we care about. New inserts use
-- UPPERCASE values from JPA enum binding (ChatSessionStatus, ChatRole).
ALTER TABLE chat_sessions DROP CONSTRAINT IF EXISTS chk_chat_session_status;
ALTER TABLE chat_messages DROP CONSTRAINT IF EXISTS chk_chat_message_role;

-- SAFETY: status default in V1 was 'active' (lowercase). The domain enum's
-- "active" state is ChatSessionStatus.ACTIVE, written by Hibernate as 'ACTIVE'.
-- Strip the old default so new rows use the Hibernate-supplied uppercase value.
ALTER TABLE chat_sessions ALTER COLUMN status DROP DEFAULT;

-- Add the lead_id column on chat_sessions (domain has leadId; V1 missed it).
-- Nullable: a chat session without a converted lead is the common case.
ALTER TABLE chat_sessions
  ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id);

-- Index for lead-side join queries (find chat sessions linked to a given lead).
CREATE INDEX IF NOT EXISTS idx_chat_sessions_lead ON chat_sessions(lead_id);
