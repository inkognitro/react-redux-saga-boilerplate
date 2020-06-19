import {
    TranslationIdToTranslationMapping as TranslationIdToTranslationMappingType,
    TranslatorState as TranslatorStateType,
    TranslatorStateSelector as TranslatorStateSelectorType,
    TranslatorEvent as TranslatorEventType,
} from './Types';
import { SetUILanguage as SetUILanguageType } from './Command/SetUILanguage';
import { UILanguageWasSet as UILanguageWasSetType } from './Event/UILanguageWasSet';

export type TranslationIdToTranslationMapping = TranslationIdToTranslationMappingType;
export type TranslatorState = TranslatorStateType;
export type TranslatorStateSelector = TranslatorStateSelectorType;
export type TranslatorEvent = TranslatorEventType;
export type SetUILanguage = SetUILanguageType;
export type UILanguageWasSet = UILanguageWasSetType;

export {
    TranslatorCommandTypes, LanguageIds, TranslatorEventTypes,
} from './Types';
export { createTranslatorSaga } from './Saga/Flow';
export { createSetUILanguage } from './Command/SetUILanguage';
export { translatorReducer } from './Reducer';
export { findTranslatedText } from './Query/TranslatedTextQuery';
