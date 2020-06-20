import { LanguageIds, TranslatorState } from "../Types";

export function getCurrentLanguageId(state: TranslatorState): LanguageIds {
    return state.currentLanguageId;
}
