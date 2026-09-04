import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import nlTranslations from './locales/nl.json';

export const i18nInit = () =>
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslations },
      nl: { translation: nlTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
