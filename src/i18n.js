// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import en from "./locales/en.json";
// import ar from "./locales/ar.json";

// i18n.use(initReactI18next).init({
//   resources: {
//     en: { translation: en },
//     ar: { translation: ar },
//   },
//   lng: "ar", // ✅ default Arabic
//   fallbackLng: "en",
//   interpolation: { escapeValue: false },
// });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector) // 👈 detect from localStorage, browser, etc.
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "ar",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"], // 👈 store language in localStorage
    },
  });

export default i18n;
