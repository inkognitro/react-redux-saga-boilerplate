import {
    LanguageIds,
    TranslationIdToTranslationMapping,
    TranslatorState,
    TranslatorStateSelector,
} from "Packages/Common/Translator/Domain/Types";
import { put, select } from "redux-saga/effects";
import { getCurrentLanguageId } from "Packages/Common/Translator/Domain/Query/LanguageIdQuery";
import { translationIdToTranslationMapping } from "Packages/Common/Translator/Domain/Translation/en";
import { createUILanguageWasSet } from "Packages/Common/Translator/Domain/Event/UILanguageWasSet";
import { SetUILanguage } from "Packages/Common/Translator/Domain/Command/SetUILanguage";

export function* handleSetUILanguage(translatorStateSelector: TranslatorStateSelector, command: SetUILanguage): Generator {
    // @ts-ignore
    const translatorState: TranslatorState = yield select(
        translatorStateSelector,
    );
    const currentLanguageId = getCurrentLanguageId(translatorState);
    if (command.payload.languageId === currentLanguageId) {
        return;
    }
    if (command.payload.languageId === LanguageIds.EN) {
        const mapping: TranslationIdToTranslationMapping = translationIdToTranslationMapping;
        put(createUILanguageWasSet(command.payload.languageId, mapping));
        return;
    }
    throw new Error(
        `languageId "${command.payload.languageId}" is not supported`,
    );
}
