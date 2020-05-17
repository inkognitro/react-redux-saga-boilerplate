import {
    LanguageIds,
    TranslationIdToTranslationMapping,
    TranslatorEventTypes,
} from "Packages/Common/Domain/Translator/Types";
import { Event } from "Packages/Common/Domain/Bus/Event";

export function createUILanguageWasSet(
    languageId: LanguageIds,
    translationIdToTranslationMapping: TranslationIdToTranslationMapping,
): UILanguageWasSet {
    return {
        type: TranslatorEventTypes.UI_LANGUAGE_WAS_SET,
        payload: {
            languageId,
            translationIdToTranslationMapping,
        },
    };
}

export type UILanguageWasSet = Event<
  TranslatorEventTypes.UI_LANGUAGE_WAS_SET,
  {
    languageId: LanguageIds;
    translationIdToTranslationMapping: TranslationIdToTranslationMapping;
  }
>;
