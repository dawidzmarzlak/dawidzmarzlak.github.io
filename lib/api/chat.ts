/**
 * Chat client.
 *
 * Backend contract: see
 * `backend/src/main/java/com/itsolutions/adapter/in/web/ChatController.java`.
 *
 * Notes on the wire format:
 *  - `action` arrives as a lowercased `ChatAction.name()` (or null).
 *    Values: "collect_lead" | "redirect_contact" | "redirect_quote".
 *  - The response carries an optional `error` field (currently always null on
 *    success, but the type reflects the controller record).
 *  - Per-message `tokensUsed` / `responseTimeMs` are NOT returned by
 *    `POST /messages`; they're only exposed by `GET /sessions/{id}`.
 */

import { apiFetch } from "./client";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessageDto {
  role: ChatRole;
  content: string;
}

export interface ChatLeadData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface SendChatRequest {
  /** UUID of an existing session, or omit to start a new one. */
  sessionId?: string;
  /** Stable per-browser identifier (cookie/localStorage). */
  visitorId: string;
  locale: "pl" | "en";
  messages: ChatMessageDto[];
  leadData?: ChatLeadData;
  turnstileToken?: string | null;
}

export type ChatActionDto = "collect_lead" | "redirect_contact" | "redirect_quote";

export interface SendChatResponse {
  sessionId: string;
  message: string;
  action: ChatActionDto | null;
  error: string | null;
}

export async function sendChatMessage(req: SendChatRequest): Promise<SendChatResponse> {
  return apiFetch<SendChatResponse>("/api/v1/chat/messages", {
    method: "POST",
    body: {
      sessionId: req.sessionId,
      messages: req.messages,
      locale: req.locale,
      leadData: req.leadData,
      visitorId: req.visitorId,
      turnstileToken: req.turnstileToken ?? undefined,
    },
  });
}
