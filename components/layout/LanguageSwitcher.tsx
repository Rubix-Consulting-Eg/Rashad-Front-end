"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/config";
import Button from "@mui/material/Button";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const handleSwitch = () => {
    const nextLocale: Locale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="text"
      onClick={handleSwitch}
      aria-label="Switch language"
      sx={{
        color: "text.primary",
        fontWeight: 500,
        fontSize: "0.875rem",
        minWidth: "auto",
        px: 1,
        gap: 0.5,
      }}
    >
      {t("language")}
    </Button>
  );
}
