import { api } from '../lib/api';
import type {
  ChatSession,
  ChatSessionListResponse,
  ChatSessionStatus,
  PaginationParams,
} from '../types';

interface ChatFilters extends PaginationParams {
  status?: ChatSessionStatus;
}

export const chatsService = {
  async getChats(params: ChatFilters = {}): Promise<ChatSessionListResponse> {
    const response = await api.get<ChatSessionListResponse>('/admin/chats', { params });
    return response.data;
  },

  async getChat(id: string): Promise<ChatSession> {
    const response = await api.get<ChatSession>(`/admin/chats/${id}`);
    return response.data;
  },
};
