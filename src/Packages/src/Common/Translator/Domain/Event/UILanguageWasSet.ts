import { Event } from "Packages/Entity/CommonTypes";
import { LanguageIds, TranslationIdToTranslationMapping } from "../Types";
import { TranslatorEventTypes } from "./Types";

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

export type UILanguageWasSet = Event<TranslatorEventTypes.UI_LANGUAGE_WAS_SET, {
    languageId: LanguageIds;
    translationIdToTranslationMapping: TranslationIdToTranslationMapping;
}>;
