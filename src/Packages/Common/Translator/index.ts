import {
    TranslationIdToTranslationMapping as TranslationIdToTranslationMappingType,
    TranslatorState as TranslatorStateType,
    TranslatorStateSelector as TranslatorStateSelectorType,
    TranslatorEvent as TranslatorEventType,
} from './Domain/Types';
import { SetUILanguage as SetUILanguageType } from './Domain/Command/SetUILanguage';
import { UILanguageWasSet as UILanguageWasSetType } from './Domain/Event/UILanguageWasSet';

export type TranslationIdToTranslationMapping = TranslationIdToTranslationMappingType;
export type TranslatorState = TranslatorStateType;
export type TranslatorStateSelector = TranslatorStateSelectorType;
export type TranslatorEvent = TranslatorEventType;
export type SetUILanguage = SetUILanguageType;
export type UILanguageWasSet = UILanguageWasSetType;

export {
    TranslationIds, TranslatorCommandTypes, LanguageIds, TranslatorEventTypes,
} from './Domain/Types';
export { createTranslatorSaga } from './Domain/Saga/Flow';
export { createSetUILanguage } from './Domain/Command/SetUILanguage';
export { translatorReducer } from './Domain/Reducer';
export { findTranslatedText } from './Domain/Query/TranslatedTextQuery';
export { TranslationTextWC } from './UI/TranslationTextWC';
