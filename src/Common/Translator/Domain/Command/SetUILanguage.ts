import {LanguageIds} from "Common/Translator/Domain/Types";
import {CommandTypes} from "Common/Translator/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/Bootstrap/Command";

export function createSetUILanguageAction(languageId: LanguageIds): CommandAction {
    return createCommandAction(createSetUILanguage(languageId));
}

export function createSetUILanguage(languageId: LanguageIds): SetUILanguage {
    return {
        type: CommandTypes.SET_UI_LANGUAGE,
        payload: {
            languageId: languageId
        },
    };
}

export type SetUILanguage = Command<CommandTypes.SET_UI_LANGUAGE, {
    languageId: LanguageIds
}>;