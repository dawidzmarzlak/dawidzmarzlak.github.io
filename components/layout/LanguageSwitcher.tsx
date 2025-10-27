"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "en", label: "English", flag: "🇬🇧" }
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find(lang => lang.code === locale);
  const otherLanguage = languages.find(lang => lang.code !== locale);

  const handleChange = () => {
    if (otherLanguage) {
      router.push(pathname, { locale: otherLanguage.code });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleChange}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span>{currentLanguage?.flag}</span>
      <span className="hidden sm:inline">{currentLanguage?.label}</span>
    </Button>
  );
}
