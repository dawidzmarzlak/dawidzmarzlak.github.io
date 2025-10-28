'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const detectLocale = () => {
      // Get browser languages
      const browserLanguages = navigator.languages || [navigator.language];

      // Check if any browser language starts with 'pl'
      const preferredLocale = browserLanguages.some(lang =>
        lang.toLowerCase().startsWith('pl')
      ) ? 'pl' : 'en';

      // Redirect to the detected locale
      router.replace(`/${preferredLocale}`);
    };

    detectLocale();
  }, [router]);

  // Show loading state during redirect
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div>Loading...</div>
    </div>
  );
}
