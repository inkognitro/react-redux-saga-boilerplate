import {
    TranslationIdToTranslationMapping as TranslationIdToTranslationMappingType,
    TranslatorState as TranslatorStateType,
    TranslatorStateSelector as TranslatorStateSelectorType,
} from './Types';
import { SetUILanguage as SetUILanguageType } from './Command/SetUILanguage';
import { UILanguageWasSet as UILanguageWasSetType } from './Event/UILanguageWasSet';

export type TranslationIdToTranslationMapping = TranslationIdToTranslationMappingType;
export type TranslatorState = TranslatorStateType;
export type TranslatorStateSelector = TranslatorStateSelectorType;
export type SetUILanguage = SetUILanguageType;
export type UILanguageWasSet = UILanguageWasSetType;

export {
    LanguageIds,
} from './Types';
export { createTranslatorSaga } from './Saga/Flow';
export { createSetUILanguage } from './Command/SetUILanguage';
export { translatorReducer } from './Reducer';
export { findTranslatedText } from './Query/TranslatedTextQuery';
export {TranslatorCommandTypes} from "Packages/Common/Translator/Domain/Command/Types";
export {TranslatorEventTypes} from "Packages/Common/Translator/Domain/Event/Types";
