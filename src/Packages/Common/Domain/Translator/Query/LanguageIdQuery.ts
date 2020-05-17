import { LanguageIds, TranslatorState } from "Packages/Common/Domain/Translator/Types";

export function getCurrentLanguageId(state: TranslatorState): LanguageIds {
    return state.currentLanguageId;
}
