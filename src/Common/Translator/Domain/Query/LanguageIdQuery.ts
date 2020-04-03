import {LanguageIds, TranslatorState} from "Common/Translator/Domain/Types";

export function getCurrentLanguageId(state: TranslatorState): LanguageIds {
    return state.currentLanguageId;
}