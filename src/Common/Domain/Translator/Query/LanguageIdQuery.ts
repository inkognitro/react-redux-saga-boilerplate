import { LanguageIds, TranslatorState } from "Common/Domain/Translator/Types";

export function getCurrentLanguageId(state: TranslatorState): LanguageIds {
  return state.currentLanguageId;
}
