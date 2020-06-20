import { Command } from "Packages/Entity/CommonTypes";
import { LanguageIds } from "../Types";
import { TranslatorCommandTypes } from "./Types";

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
