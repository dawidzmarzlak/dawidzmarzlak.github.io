"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

export function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  // Don't render GA if no analytics consent
  if (!consent?.analytics) return null;

  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render if no GA ID configured
  if (!GA_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
