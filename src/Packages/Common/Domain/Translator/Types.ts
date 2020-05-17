import { UILanguageWasSet } from "Packages/Common/Domain/Translator/Event/UILanguageWasSet";

export type TranslatorStateSelector<State = any> = (
  state: State
) => TranslatorState;

export enum LanguageIds {
  EN = "en",
}

export type TranslationIdToTranslationMapping = { [id: string]: string };

export type TranslatorState = {
  currentLanguageId: LanguageIds;
  translations: TranslationIdToTranslationMapping;
};

export enum TranslatorEventTypes {
  UI_LANGUAGE_WAS_SET = "UI_LANGUAGE_WAS_SET-55f21563-0e8d-49d7-bba4-9a5d9d12ca2b",
}

export type TranslatorEvent = UILanguageWasSet;

export enum TranslatorCommandTypes {
  SET_UI_LANGUAGE = "SET_UI_LANGUAGE-42486f3c-e848-4371-810e-5c55d3cce2a6",
}
