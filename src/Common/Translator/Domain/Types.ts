import {UILanguageWasSet} from "Common/Translator/Domain/Event/UILanguageWasSet";

export type Translation = {
    id: string,
    text: string,
};

export enum LanguageIds {
    EN = 'en',
}

export type TranslationIdToTranslationMapping = { [id: string]: string; };

export type TranslatorState = {
    currentLanguageId: LanguageIds,
    translations: TranslationIdToTranslationMapping,
};

export enum TranslatorEventTypes {
    UI_LANGUAGE_WAS_SET = 'UI_LANGUAGE_WAS_SET-55f21563-0e8d-49d7-bba4-9a5d9d12ca2b',
}

export type TranslatorEvent = (UILanguageWasSet);

export type TranslatorStateSelector = () => TranslatorState;