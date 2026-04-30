/**
 * Thin typed wrapper around `fetch` for talking to the Spring Boot backend.
 *
 * Frontend is statically exported (`output: 'export'`), so API routes never run
 * in production — every request goes directly to `${NEXT_PUBLIC_API_URL}` (default
 * `http://localhost:8080`).
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiFetchInit extends Omit<RequestInit, "body"> {
  /** Anything JSON-serializable. Omit for GET/DELETE without payload. */
  body?: unknown;
  /** When set, sent as `Accept-Language` header. */
  locale?: "pl" | "en";
}

export async function apiFetch<T>(path: string, init: ApiFetchInit = {}): Promise<T> {
  const { body, locale, headers, ...rest } = init;

  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(locale ? { "Accept-Language": locale } : {}),
      ...(headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let parsed: unknown = null;
  if (text.length > 0) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!res.ok) {
    const message =
      (parsed && typeof parsed === "object" && "error" in parsed
        ? String((parsed as { error: unknown }).error)
        : null) ?? `HTTP ${res.status}`;
    throw new ApiError(res.status, message, parsed);
  }

  return parsed as T;
}

export const apiBaseUrl = BASE;
