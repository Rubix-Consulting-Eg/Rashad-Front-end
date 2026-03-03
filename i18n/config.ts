import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};
