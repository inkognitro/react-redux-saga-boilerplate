import {
    LanguageIds,
    TranslatorCommandTypes,
} from "Packages/Common/Translator/Domain/Types";
import { Command } from "Packages/Common/CommonTypes";

export function createSetUILanguage(languageId: LanguageIds): SetUILanguage {
    return {
        type: TranslatorCommandTypes.SET_UI_LANGUAGE,
        payload: {
            languageId,
        },
    };
}

export type SetUILanguage = Command<TranslatorCommandTypes.SET_UI_LANGUAGE, {
    languageId: LanguageIds;
}>;
