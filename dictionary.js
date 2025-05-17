const dictionaryObject = {
  es: {
    TEST: 'Simplemente un test',
    HOME_HEADER: 'Mis equipajes :)'
  },
  en: {
    TEST: 'Just a test',
    HOME_HEADER: 'My Luggages :)'
  }
}
const supportedLanguages = [
  'en',
  'es'
]
const navigatorLanguage = navigator.language.substring(0, 2)
const localStorageLanguage = localStorage.getItem('language')
let currentLanguage = 'en'

if(localStorageLanguage && supportedLanguages.includes(localStorageLanguage)) {
  currentLanguage = localStorageLanguage
}else if (supportedLanguages.includes(navigatorLanguage)) {
  currentLanguage = navigatorLanguage
}


const dictionary = query => dictionaryObject[currentLanguage][query]
// console.log(dictionary('TEST'))