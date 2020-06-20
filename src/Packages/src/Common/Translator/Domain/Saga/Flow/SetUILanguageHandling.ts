import { put, select } from "redux-saga/effects";
import { SetUILanguage } from "../../Command/SetUILanguage";
import {
    LanguageIds,
    TranslationIdToTranslationMapping,
    TranslatorState,
    TranslatorStateSelector,
} from "../../Types";
import { getCurrentLanguageId } from "../../Query/LanguageIdQuery";
import { translationIdToTranslationMapping } from "../../Translation/en";
import { createUILanguageWasSet } from "../../Event/UILanguageWasSet";

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
    throw new Error(`languageId "${command.payload.languageId}" not supported`);
}
