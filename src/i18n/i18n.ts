import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '../locales/en.json';
import ur from '../locales/ur.json';

const locales = RNLocalize.getLocales();
const language = locales[0]?.languageCode === 'ur' ? 'ur' : 'en';

i18n.use(initReactI18next).init({
  lng: language,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ur: { translation: ur },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
