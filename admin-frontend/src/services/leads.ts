import { api } from '../lib/api';
import type { Lead, LeadListResponse, LeadStatus, LeadSource, PaginationParams } from '../types';

interface LeadFilters extends PaginationParams {
  status?: LeadStatus;
  source?: LeadSource;
  assignedTo?: string;
}

interface CreateLeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  estimatedValue?: number;
  currency?: string;
}

interface UpdateLeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export const leadsService = {
  async getLeads(params: LeadFilters = {}): Promise<LeadListResponse> {
    const response = await api.get<LeadListResponse>('/admin/leads', { params });
    return response.data;
  },

  async getLead(id: string): Promise<Lead> {
    const response = await api.get<Lead>(`/admin/leads/${id}`);
    return response.data;
  },

  async createLead(data: CreateLeadData): Promise<{ leadId: string; success: boolean }> {
    const response = await api.post('/admin/leads', data);
    return response.data;
  },

  async updateLead(id: string, data: UpdateLeadData): Promise<void> {
    await api.put(`/admin/leads/${id}`, data);
  },

  async updateStatus(id: string, status: LeadStatus): Promise<void> {
    await api.patch(`/admin/leads/${id}/status`, { status });
  },

  async assignTo(id: string, adminId: string): Promise<void> {
    await api.patch(`/admin/leads/${id}/assign`, { adminId });
  },

  async addNote(id: string, content: string): Promise<void> {
    await api.post(`/admin/leads/${id}/notes`, { content });
  },

  async setEstimatedValue(id: string, value: number, currency: string): Promise<void> {
    await api.patch(`/admin/leads/${id}/value`, { value, currency });
  },

  async setTags(id: string, tags: string): Promise<void> {
    await api.patch(`/admin/leads/${id}/tags`, { tags });
  },

  async markContacted(id: string): Promise<void> {
    await api.post(`/admin/leads/${id}/contacted`);
  },

  async markQualified(id: string): Promise<void> {
    await api.post(`/admin/leads/${id}/qualified`);
  },

  async markConverted(id: string): Promise<void> {
    await api.post(`/admin/leads/${id}/converted`);
  },

  async markLost(id: string): Promise<void> {
    await api.post(`/admin/leads/${id}/lost`);
  },
};
