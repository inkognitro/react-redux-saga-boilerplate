import { LanguageIds, TranslatorState } from './types';
import { translationIdToTranslationMapping } from './translation/en';
import { TranslatorEventTypes, UILanguageWasSet } from './event';

type TranslatorEvent = UILanguageWasSet;

export const initialTranslatorState: TranslatorState = {
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
