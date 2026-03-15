import countriesI18n, { type LocaleData } from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import arLocale from "i18n-iso-countries/langs/ar.json";
import { countries as flagCountryCodes } from "country-flag-icons";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

// Register English and Arabic locales for country names
countriesI18n.registerLocale(enLocale as LocaleData);
countriesI18n.registerLocale(arLocale as LocaleData);

export interface Country {
  code: string;
  name_en: string;
  name_ar: string;
  flag: string;
}

const namesEn = countriesI18n.getNames("en", { select: "official" });
const namesAr = countriesI18n.getNames("ar", { select: "official" });

/** All countries with flags (from country-flag-icons), names in EN + AR (from i18n-iso-countries), sorted by English name */
export const countries: Country[] = flagCountryCodes
  .map((code) => {
    const name_en = namesEn[code];
    const name_ar = namesAr[code];
    if (!name_en) return null; // skip if no English name (e.g. non-standard codes)
    try {
      const flag = getUnicodeFlagIcon(code);
      console.log("flag", code, flag, name_en, name_ar);
      return {
        code,
        name_en,
        name_ar: typeof name_ar === "string" ? name_ar : name_en,
        flag,
      };
    } catch {
      return null;
    }
  })
  .filter((c): c is Country => c !== null)
  .sort((a, b) => a.name_en.localeCompare(b.name_en, "en"));
