export const languages = {
  ar: {
    display_name: 'Arabic',
    key: 'ar'
  },
  en: {
    display_name: 'English',
    key: 'en-us'
  },
  es: {
    display_name: 'Spanish',
    key: 'es-es'
  },
  fa: {
    display_name: 'Persian',
    key: 'fa-ir'
  },
  fr: {
    display_name: 'French',
    key: 'fr-fr'
  },
  id: {
    display_name: 'Bahasa Indonesia',
    key: 'id-id'
  },
  ja: {
    display_name: 'Japanese',
    key: 'ja'
  },
  ko: {
    display_name: 'Korean',
    key: 'ko-kr'
  },
  pt: {
    display_name: 'Portuguese (Brazil)',
    key: 'pt-br'
  },
  ru: {
    display_name: 'Russian',
    key: 'ru-ru'
  },
  ur: {
    display_name: 'Urdu',
    key: 'ur'
  },
  vi: {
    display_name: 'Vietnamese',
    key: 'vi'
  },
  'zh-CN': {
    display_name: 'Chinese (Simplified)',
    key: 'zh-cn'
  }
};


export const getDirection = language => ( ( [
  'ar', 'fa', 'fa-ir', 'ur'
].includes( language ) ) ? 'right' : 'left' );
