import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import siteMetadata from '@/data/siteMetadata';

const { fallbackLanguage, languages } = siteMetadata;

const initI18next = async (lng = fallbackLanguage, ns = 'basic') => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init({
      // debug: true,
      supportedLngs: languages,
      fallbackLng: fallbackLanguage,
      lng,
      fallbackNS: 'basic',
      defaultNS: 'basic',
      ns,
    });
  return i18nInstance;
};

async function useTranslation(
  lng: string,
  ns?: string,
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}

export {
  useTranslation,
  /** 用于规避 useXxx 只能用于函数组件/hook 的报错 */
  useTranslation as createTranslation,
};
