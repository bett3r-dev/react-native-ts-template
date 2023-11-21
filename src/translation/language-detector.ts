import i18next, {
    LanguageDetectorAsyncModule,
    Services,
    InitOptions,
  } from 'i18next';
  import {initReactI18next} from 'react-i18next';
  import { getLocales } from 'expo-localization';
  import en from './en.json';
  import es from './es.json';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  export enum SupportedLanguage {
    English = 'en',
    Spanish = 'es',
  }
  
  
  const languageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    // If this is set to true, your detect function receives a callback function that you should call with your language,
    async: true,
    init: (
      _services: Services,
      _detectorOptions: object,
      _i18nextOptions: InitOptions,
    ) => {
      /* use services and options */
    },
    detect: (callback: (lng: string) => void) => {
      AsyncStorage.getItem('APP_LANG').then( savedLanguage =>{
        if (savedLanguage) {
          callback(String(savedLanguage));
          return;
        } else {
          const languageCode = getLocales()[0].languageCode;
          const supportedLanguages: string[] = Object.values(SupportedLanguage);
          callback(supportedLanguages.includes(languageCode) ? languageCode : SupportedLanguage.English);
          return;
        }
      })
    },
    cacheUserLanguage: async (lng: string) => {
      await AsyncStorage.setItem('APP_LANG', lng);
    },
  };
  
  i18next
    .use(languageDetector)
    .use(initReactI18next) // passes i18next down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      resources: {
        en: {
          translation: en,
        },
        es: {
          translation: es,
        },
      },
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
    });