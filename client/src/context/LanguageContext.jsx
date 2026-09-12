import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy } from "../data/copy";

const LanguageContext = createContext(null);
const STORAGE_KEY = "shaimaa-minimal-language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
    return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = language === "ar"
      ? "د. شيماء محمود حسن | أعمال طب الأسنان"
      : "Dr. Shaimaa Mahmoud Hassan | Dental Portfolio";
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => ({
    language,
    isArabic: language === "ar",
    t: copy[language],
    toggleLanguage: () => setLanguage((current) => current === "ar" ? "en" : "ar"),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
