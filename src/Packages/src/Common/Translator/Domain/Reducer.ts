import {
    LanguageIds,
    TranslatorState,
} from "./Types";
import { translationIdToTranslationMapping } from "./Translation/en";
import { UILanguageWasSet } from "./Event/UILanguageWasSet";
import { TranslatorEventTypes } from "./Event/Types";

type TranslatorEvent = UILanguageWasSet

export const initialTranslatorState: TranslatorState = {
    currentLanguageId: LanguageIds.EN,
    translations: translationIdToTranslationMapping,
};

export function translatorReducer(
    state: TranslatorState = initialTranslatorState,
    event?: TranslatorEvent,
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
