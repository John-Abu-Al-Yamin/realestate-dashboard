import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// i18next configuration
i18n
  .use(Backend)          // Load translations from backend
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    fallbackLng: 'en',    // default language
    debug: true,
    ns: ['translation'],  // namespace matches your file name
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      // Path to translation.json inside each language folder
      loadPath: '/locales/{{lng}}/translation.json'
    },
    react: {
      useSuspense: true
    }
  });

export default i18n;
