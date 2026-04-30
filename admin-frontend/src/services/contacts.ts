import { api } from '../lib/api';
import type { Contact, ContactListResponse, ContactStatus, PaginationParams } from '../types';

interface ContactFilters extends PaginationParams {
  status?: ContactStatus;
}

export const contactsService = {
  async getContacts(params: ContactFilters = {}): Promise<ContactListResponse> {
    const response = await api.get<ContactListResponse>('/admin/contacts', { params });
    return response.data;
  },

  async getContact(id: string): Promise<Contact> {
    const response = await api.get<Contact>(`/admin/contacts/${id}`);
    return response.data;
  },

  async updateStatus(id: string, status: ContactStatus): Promise<void> {
    await api.patch(`/admin/contacts/${id}/status`, { status });
  },

  async reply(
    id: string,
    subject: string,
    message: string
  ): Promise<{ success: boolean; emailSent: boolean }> {
    const response = await api.post<{ success: boolean; emailSent: boolean }>(
      `/admin/contacts/${id}/reply`,
      { subject, message }
    );
    return response.data;
  },

  async archive(id: string): Promise<void> {
    await this.updateStatus(id, 'ARCHIVED');
  },

  async markAsSpam(id: string): Promise<void> {
    await this.updateStatus(id, 'SPAM');
  },
};
