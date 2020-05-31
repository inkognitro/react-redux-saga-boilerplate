import { LanguageIds, TranslatorState } from "Packages/Common/Translator/Domain/Types";

export function getCurrentLanguageId(state: TranslatorState): LanguageIds {
    return state.currentLanguageId;
}
