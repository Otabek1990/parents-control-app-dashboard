import i18n from "i18next"
import {initReactI18next} from "react-i18next"

import translationUZ from "./uz/translation.json"
import translationUzCyr from "./ru/translation.json"
import {I18N_LANGUAGE} from "@config/constants";

const resources = {
    uz: {
        translation: translationUZ,
    },
    ru: {
        translation: translationUzCyr
    }
};

const language = localStorage.getItem(I18N_LANGUAGE);

if (!language) {
    localStorage.setItem(I18N_LANGUAGE, "uz")
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem(I18N_LANGUAGE) || "uz",

        keySeparator: false,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n