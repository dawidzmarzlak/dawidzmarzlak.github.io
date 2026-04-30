/**
 * Public lead intake client.
 *
 * Backend contract: see
 * `backend/src/main/java/com/itsolutions/adapter/in/web/lead/LeadController.java`.
 *
 * Backend maps `source` to `LeadSource` enum case-insensitively, replacing `-`
 * with `_`. Unknown values default to `OTHER`; null/blank defaults to `MANUAL`.
 */

import { apiFetch } from "./client";

export type LeadSource =
  | "chat"
  | "contact_form"
  | "quote_form"
  | "manual"
  | "referral"
  | "other";

export interface LeadSubmitPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: LeadSource;
  estimatedValue?: number;
  /** ISO 4217 (e.g. "PLN"). Backend caps at 3 chars. */
  currency?: string;
  chatSessionId?: string;
  contactRequestId?: string;
  quoteRequestId?: string;
}

export interface LeadSubmitResult {
  leadId: string;
  success: boolean;
  message: string;
}

export async function submitLead(payload: LeadSubmitPayload): Promise<LeadSubmitResult> {
  return apiFetch<LeadSubmitResult>("/api/v1/leads", {
    method: "POST",
    body: payload,
  });
}
