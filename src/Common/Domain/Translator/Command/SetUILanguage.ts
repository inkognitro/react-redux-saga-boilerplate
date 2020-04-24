import {
    LanguageIds,
    TranslatorCommandTypes,
} from "Common/Domain/Translator/Types";
import { Command } from "Common/Domain/Bus/Command";

export function createSetUILanguage(languageId: LanguageIds): SetUILanguage {
    return {
        type: TranslatorCommandTypes.SET_UI_LANGUAGE,
        payload: {
            languageId,
        },
    };
}

export type SetUILanguage = Command<
  TranslatorCommandTypes.SET_UI_LANGUAGE,
  {
    languageId: LanguageIds;
  }
>;
