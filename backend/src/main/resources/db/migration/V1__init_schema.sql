-- IT Solutions Database Schema
-- Version 1: Initial schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============ CHAT MODULE ============

CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id VARCHAR(100),
    locale VARCHAR(5) NOT NULL DEFAULT 'pl',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    llm_provider VARCHAR(20),
    llm_model VARCHAR(50),
    total_tokens INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    archived_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT chk_chat_session_status CHECK (status IN ('active', 'archived', 'spam')),
    CONSTRAINT chk_chat_session_locale CHECK (locale IN ('pl', 'en'))
);

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    tokens_used INTEGER,
    response_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT chk_chat_message_role CHECK (role IN ('user', 'assistant', 'system'))
);

CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_sessions_created ON chat_sessions(created_at DESC);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_sessions_visitor ON chat_sessions(visitor_id);

-- ============ LEAD MODULE ============

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    source VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    score INTEGER DEFAULT 0,
    notes TEXT,
    chat_session_id UUID REFERENCES chat_sessions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    converted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT chk_lead_source CHECK (source IN ('chat', 'contact', 'quote')),
    CONSTRAINT chk_lead_status CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    CONSTRAINT chk_lead_score CHECK (score >= 0 AND score <= 100)
);

CREATE TABLE lead_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_lead_notes_lead ON lead_notes(lead_id);

-- ============ CONTACT MODULE ============

CREATE TABLE contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    turnstile_verified BOOLEAN DEFAULT false,
    lead_id UUID REFERENCES leads(id),
    reply_message TEXT,
    replied_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    replied_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT chk_contact_status CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

CREATE TABLE quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(20) UNIQUE NOT NULL,
    service VARCHAR(50) NOT NULL,
    project_size VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    description TEXT,
    budget VARCHAR(50),
    deadline VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    quoted_amount DECIMAL(10, 2),
    quoted_currency VARCHAR(3) DEFAULT 'PLN',
    quote_notes TEXT,
    ip_address VARCHAR(45),
    turnstile_verified BOOLEAN DEFAULT false,
    lead_id UUID REFERENCES leads(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    quoted_at TIMESTAMP WITH TIME ZONE,
    accepted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT chk_quote_service CHECK (service IN ('nextjs', 'wordpress', 'woocommerce', 'prestashop', 'webapp')),
    CONSTRAINT chk_quote_size CHECK (project_size IN ('small', 'medium', 'large', 'enterprise')),
    CONSTRAINT chk_quote_status CHECK (status IN ('pending', 'quoted', 'accepted', 'rejected', 'expired'))
);

CREATE INDEX idx_contacts_status ON contact_requests(status);
CREATE INDEX idx_contacts_created ON contact_requests(created_at DESC);
CREATE INDEX idx_quotes_status ON quote_requests(status);
CREATE INDEX idx_quotes_created ON quote_requests(created_at DESC);
CREATE INDEX idx_quotes_reference ON quote_requests(reference_number);

-- Sequence for quote reference numbers
CREATE SEQUENCE quote_reference_seq START 1;

-- ============ EMAIL MODULE ============

CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    subject_pl VARCHAR(255),
    subject_en VARCHAR(255),
    body_pl TEXT,
    body_en TEXT,
    variables JSONB DEFAULT '[]'::jsonb,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES email_templates(id),
    template_name VARCHAR(100),
    recipient VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    provider_message_id VARCHAR(255),
    error_message TEXT,
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT chk_email_status CHECK (status IN ('pending', 'sent', 'delivered', 'bounced', 'failed'))
);

CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_logs_created ON email_logs(created_at DESC);
CREATE INDEX idx_email_logs_recipient ON email_logs(recipient);

-- ============ ADMIN MODULE ============

CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT chk_admin_role CHECK (role IN ('admin', 'viewer'))
);

CREATE TABLE admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON admin_activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON admin_activity_logs(created_at DESC);

-- ============ TRIGGERS ============

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON email_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
