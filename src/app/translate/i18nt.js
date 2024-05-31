import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import translationPtBr from './pt-br/translation.json';

const resources = { pt_br: { translation: translationPtBr } }

i18n
    // Habilita o backend do i18next
    .use(Backend)
    // Habilita a detecção automática de linguagem
    .use(LanguageDetector)
    // Habilita o módulo de inicialização do hook
    .use(initReactI18next)
    .init({
        resources,
        // Linguagem padrão utilizada
        fallbackLng: 'pt_br',
        debug: false,
        // Detecta e guarda um cookie em cache da linguagem fornecida
        detection: { order: ['queryString', 'cookie'], cache: ['cookie'] },
        interpolation: { escapeValue: false }
    })

export default i18n;