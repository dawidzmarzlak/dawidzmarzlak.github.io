// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AdminUser;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Contact types
export type ContactStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED' | 'SPAM';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  locale: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt?: string;
  repliedAt?: string;
  replyContent?: string;
}

export interface ContactListResponse {
  contacts: Contact[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// Quote types
export type QuoteStatus = 'NEW' | 'REVIEWING' | 'QUOTED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'SPAM';
export type ServiceType = 'WEBSITE' | 'ECOMMERCE' | 'WEBAPP' | 'MOBILE' | 'DESIGN' | 'SEO' | 'MAINTENANCE' | 'CONSULTING' | 'OTHER';
export type ProjectSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';

export interface Quote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: ServiceType;
  projectSize?: ProjectSize;
  budget?: string;
  timeline?: string;
  description: string;
  locale: string;
  status: QuoteStatus;
  quotedAmount?: number;
  quotedCurrency?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
  quotedAt?: string;
}

export interface QuoteListResponse {
  quotes: Quote[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// Lead types
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'LOST' | 'SPAM';
export type LeadSource = 'CHAT' | 'CONTACT_FORM' | 'QUOTE_FORM' | 'MANUAL' | 'REFERRAL' | 'OTHER';

export interface LeadNote {
  id: string;
  content: string;
  createdBy?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  status: LeadStatus;
  estimatedValue?: number;
  currency?: string;
  tags?: string;
  assignedTo?: string;
  chatSessionId?: string;
  contactRequestId?: string;
  quoteRequestId?: string;
  createdAt: string;
  updatedAt?: string;
  contactedAt?: string;
  convertedAt?: string;
  notes: LeadNote[];
}

export interface LeadListResponse {
  leads: Lead[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// Chat types
export type ChatSessionStatus = 'ACTIVE' | 'ARCHIVED' | 'SPAM';
export type ChatRole = 'USER' | 'ASSISTANT' | 'SYSTEM';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  tokensUsed?: number;
  responseTimeMs?: number;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  visitorId: string;
  locale: string;
  status: ChatSessionStatus;
  llmProvider: string;
  llmModel: string;
  totalTokens: number;
  leadId?: string;
  createdAt: string;
  updatedAt?: string;
  archivedAt?: string;
  messages: ChatMessage[];
}

export interface ChatSessionListResponse {
  sessions: ChatSession[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// Dashboard types
export interface DashboardStats {
  totalLeads: number;
  newLeadsToday: number;
  totalContacts: number;
  newContactsToday: number;
  totalQuotes: number;
  newQuotesToday: number;
  totalChats: number;
  activeChatsToday: number;
  conversionRate: number;
  avgResponseTime: number;
}

// Pagination
export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
}
