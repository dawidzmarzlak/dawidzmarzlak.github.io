"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type CookieConsent,
  getConsent,
  acceptAll as acceptAllConsent,
  rejectAll as rejectAllConsent,
  saveCustomConsent,
} from "@/lib/cookies/consent";

interface CookieConsentContextType {
  consent: CookieConsent | null;
  isLoaded: boolean;
  showBanner: boolean;
  showSettings: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (options: {
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
  }) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(
  null
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Load consent from localStorage on mount (hydration-safe)
  useEffect(() => {
    const storedConsent = getConsent();
    setConsent(storedConsent);
    setIsLoaded(true);
  }, []);

  const acceptAll = useCallback(() => {
    const newConsent = acceptAllConsent();
    setConsent(newConsent);
    setShowSettings(false);
  }, []);

  const rejectAll = useCallback(() => {
    const newConsent = rejectAllConsent();
    setConsent(newConsent);
    setShowSettings(false);
  }, []);

  const savePreferences = useCallback(
    (options: { analytics: boolean; marketing: boolean; preferences: boolean }) => {
      const newConsent = saveCustomConsent(options);
      setConsent(newConsent);
      setShowSettings(false);
    },
    []
  );

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  // Show banner if loaded and no consent given
  const showBanner = isLoaded && consent === null;

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isLoaded,
        showBanner,
        showSettings,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}
