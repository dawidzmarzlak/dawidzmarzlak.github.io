export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
  version: string;
}

export const CONSENT_VERSION = "1.0";
export const STORAGE_KEY = "cookie-consent";

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const consent = JSON.parse(stored) as CookieConsent;

    // Check if consent version matches current version
    if (consent.version !== CONSENT_VERSION) {
      return null; // Force re-consent on version change
    }

    return consent;
  } catch {
    return null;
  }
}

export function setConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage might be unavailable
  }
}

export function hasConsent(): boolean {
  return getConsent() !== null;
}

export function acceptAll(): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  setConsent(consent);
  return consent;
}

export function rejectAll(): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  setConsent(consent);
  return consent;
}

export function saveCustomConsent(options: {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: options.analytics,
    marketing: options.marketing,
    preferences: options.preferences,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  setConsent(consent);
  return consent;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage might be unavailable
  }
}
