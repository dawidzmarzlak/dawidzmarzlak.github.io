/**
 * Contact form / brief submission client.
 *
 * Backend contract: see
 * `backend/src/main/java/com/itsolutions/adapter/in/web/contact/ContactController.java`.
 *
 * BriefForm sends quote details as embedded text inside `message` (not as
 * separate fields) so backend's existing email template renders them as part of
 * the body without schema changes.
 */

import { apiFetch } from "./client";

export interface BriefSubmitPayload {
  name: string;
  email: string;
  company?: string;
  /** Free-text description of the project. */
  message: string;
  /** User's note on schedule, embedded in `message` on submit. */
  timelineNote?: string;
  turnstileToken?: string | null;
  /** Optional pre-filled quote calculated on the pricing page. */
  quote?: {
    input: unknown;
    total: number;
    supportYearly: number;
    timestamp: number;
  };
}

export interface BriefSubmitResult {
  contactId: string;
  message: string;
  emailSent: boolean;
}

export async function submitBrief(
  payload: BriefSubmitPayload,
  locale: "pl" | "en",
): Promise<BriefSubmitResult> {
  return apiFetch<BriefSubmitResult>("/api/v1/contact", {
    method: "POST",
    locale,
    body: {
      name: payload.name,
      email: payload.email,
      company: payload.company || undefined,
      subject: buildSubject(payload, locale),
      message: buildMessage(payload, locale),
      turnstileToken: payload.turnstileToken || undefined,
    },
  });
}

function buildSubject(p: BriefSubmitPayload, locale: "pl" | "en"): string {
  const total = p.quote?.total;
  if (total != null) {
    const fmt = new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-US").format(total);
    return locale === "pl"
      ? `Brief — szacunkowa wycena ${fmt} PLN`
      : `Brief — estimated quote ${fmt} PLN`;
  }
  return locale === "pl" ? "Brief — formularz kontaktowy" : "Brief — contact form";
}

function buildMessage(p: BriefSubmitPayload, locale: "pl" | "en"): string {
  let msg = p.message;
  if (p.timelineNote) {
    msg +=
      locale === "pl"
        ? `\n\nTermin / uwagi: ${p.timelineNote}`
        : `\n\nTimeline / notes: ${p.timelineNote}`;
  }
  if (p.quote) {
    const header =
      locale === "pl"
        ? "--- Konfiguracja kalkulatora ---"
        : "--- Calculator configuration ---";
    msg += `\n\n${header}\n${JSON.stringify(p.quote.input, null, 2)}`;
    msg +=
      locale === "pl"
        ? `\nSzacunkowa cena: ${p.quote.total} PLN`
        : `\nEstimated price: ${p.quote.total} PLN`;
    msg +=
      locale === "pl"
        ? `\nWsparcie roczne: ${p.quote.supportYearly} PLN`
        : `\nYearly support: ${p.quote.supportYearly} PLN`;
  }
  return msg;
}
