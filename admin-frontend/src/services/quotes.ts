import { api } from '../lib/api';
import type { Quote, QuoteListResponse, QuoteStatus, ServiceType, PaginationParams } from '../types';

interface QuoteFilters extends PaginationParams {
  status?: QuoteStatus;
  serviceType?: ServiceType;
}

export const quotesService = {
  async getQuotes(params: QuoteFilters = {}): Promise<QuoteListResponse> {
    const response = await api.get<QuoteListResponse>('/admin/quotes', { params });
    return response.data;
  },

  async getQuote(id: string): Promise<Quote> {
    const response = await api.get<Quote>(`/admin/quotes/${id}`);
    return response.data;
  },

  async updateStatus(id: string, status: QuoteStatus): Promise<void> {
    await api.patch(`/admin/quotes/${id}/status`, { status });
  },

  async sendQuote(
    id: string,
    data: { amount: number; currency: string; subject: string; message: string; validUntil?: string }
  ): Promise<{ success: boolean; emailSent: boolean }> {
    const response = await api.post(`/admin/quotes/${id}/send`, data);
    return response.data;
  },

  async addNotes(id: string, notes: string): Promise<void> {
    await api.patch(`/admin/quotes/${id}/notes`, { notes });
  },

  async markAccepted(id: string): Promise<void> {
    await api.post(`/admin/quotes/${id}/accept`);
  },

  async markRejected(id: string): Promise<void> {
    await api.post(`/admin/quotes/${id}/reject`);
  },

  async markAsSpam(id: string): Promise<void> {
    await api.post(`/admin/quotes/${id}/spam`);
  },
};
