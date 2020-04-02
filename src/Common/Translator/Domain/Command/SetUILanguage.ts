import {LanguageIds} from "Common/Translator/Domain/Types";
import {TranslatorCommandTypes} from "Common/Translator/Domain/Translator";
import {Command, CommandAction, createCommandAction} from "Common/Bootstrap/Command";

export function createSetUILanguageAction(languageId: LanguageIds): CommandAction {
    return createCommandAction(createSetUILanguage(languageId));
}

export function createSetUILanguage(languageId: LanguageIds): SetUILanguage {
    return {
        type: TranslatorCommandTypes.SET_UI_LANGUAGE,
        payload: {
            languageId: languageId
        },
    };
}

export type SetUILanguage = Command<TranslatorCommandTypes.SET_UI_LANGUAGE, {
    languageId: LanguageIds
}>;