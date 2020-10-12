import { TranslationIds } from 'packages/common/types/util/domain';

export type TranslatorStateSelector<State = any> = (state: State) => TranslatorState;

export enum LanguageIds {
    EN = 'en',
}

export type TranslationIdToTranslationMapping = {
    [TranslationIds.COULD_NOT_CONNECT_TO_SERVER]: string;
    [TranslationIds.BACK_TO_START]: string;
    [id: string]: string;
};

export type TranslatorState = {
    currentLanguageId: LanguageIds;
    translations: TranslationIdToTranslationMapping;
};
