import {
  LanguageIds,
  TranslatorEvent,
  TranslatorEventTypes,
  TranslatorState,
} from "Common/Domain/Translator/Types";
import { translationIdToTranslationMapping } from "Common/Domain/Translator/Translation/en";

const initialTranslatorState: TranslatorState = {
  currentLanguageId: LanguageIds.EN,
  translations: translationIdToTranslationMapping,
};

export function translatorReducer(
  state: TranslatorState = initialTranslatorState,
  event?: TranslatorEvent
): TranslatorState {
  if (!event) {
    return state;
  }

  if (event.type === TranslatorEventTypes.UI_LANGUAGE_WAS_SET) {
    return {
      ...state,
      currentLanguageId: event.payload.languageId,
      translations: event.payload.translationIdToTranslationMapping,
    };
  }

  return state;
}
