import {
    TranslationIdToTranslationMapping as TranslationIdToTranslationMappingType,
    TranslatorState as TranslatorStateType,
    TranslatorStateSelector as TranslatorStateSelectorType,
} from './types';
import { SetUILanguage as SetUILanguageType } from './command';
import { UILanguageWasSet as UILanguageWasSetType } from './event';

export type TranslationIdToTranslationMapping = TranslationIdToTranslationMappingType;
export type TranslatorState = TranslatorStateType;
export type TranslatorStateSelector = TranslatorStateSelectorType;
export type SetUILanguage = SetUILanguageType;
export type UILanguageWasSet = UILanguageWasSetType;

export { LanguageIds } from './types';
export { createTranslatorSaga } from './saga/flow';
export { translatorReducer } from './reducer';
export { initialTranslatorState } from './reducer';
export { TranslatorCommandTypes } from './command';
export { createSetUILanguage } from './command';
export { findTranslatedText } from './query';
export { TranslatorEventTypes } from './event';
