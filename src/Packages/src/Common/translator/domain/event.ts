import { Event } from "Packages/Entity/CommonTypes";
import { LanguageIds, TranslationIdToTranslationMapping } from "./types";

export enum TranslatorEventTypes {
    UI_LANGUAGE_WAS_SET = "UI_LANGUAGE_WAS_SET-55f21563-0e8d-49d7-bba4-9a5d9d12ca2b",
}

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
