import { Command } from "packages/common/entity-base/common-types";
import { LanguageIds } from "./types";

export enum TranslatorCommandTypes {
    SET_UI_LANGUAGE = "SET_UI_LANGUAGE-42486f3c-e848-4371-810e-5c55d3cce2a6"
}

export function createSetUILanguage(languageId: LanguageIds): SetUILanguage {
    return {
        type: TranslatorCommandTypes.SET_UI_LANGUAGE,
        payload: {
            languageId,
        },
    };
}

export type SetUILanguage = Command<TranslatorCommandTypes.SET_UI_LANGUAGE, {
    languageId: LanguageIds;
}>;
