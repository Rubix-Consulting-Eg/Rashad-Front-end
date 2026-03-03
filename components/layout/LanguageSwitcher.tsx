"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/config";
import Button from "@mui/material/Button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = () => {
    const nextLocale: Locale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="text"
      color="inherit"
      onClick={handleSwitch}
      aria-label="Switch language"
      startIcon={<Languages size={16} />}
      sx={{
        fontWeight: 500,
        fontSize: "0.875rem",
        textTransform: "none",
        minWidth: "auto",
      }}
    >
      {localeNames[locale === "en" ? "ar" : "en"]}
    </Button>
  );
}
