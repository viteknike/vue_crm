import store from '../store'
import ru from '../locale/ru.json'
import en from '../locale/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function localFilter (key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
