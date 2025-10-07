import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from './locales/ko.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zhCN from './locales/zh-CN.json';
import zhHK from './locales/zh-HK.json';
import ru from './locales/ru.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import hi from './locales/hi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      ja: { translation: ja },
      'zh-CN': { translation: zhCN },
      'zh-HK': { translation: zhHK },
      ru: { translation: ru },
      es: { translation: es },
      pt: { translation: pt },
      fr: { translation: fr },
      de: { translation: de },
      hi: { translation: hi },
    },
    fallbackLng: 'ko',
    lng: 'ko',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

// 디버깅을 위해 i18n을 전역으로 노출
if (typeof window !== 'undefined') {
  (window as any).i18n = i18n;
}

export default i18n;
