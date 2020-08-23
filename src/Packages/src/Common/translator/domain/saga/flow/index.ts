import {
    put, select, spawn, takeEvery,
} from "redux-saga/effects";
import {
    LanguageIds, TranslationIdToTranslationMapping, TranslatorState, TranslatorStateSelector,
} from "../../types";
import { SetUILanguage, TranslatorCommandTypes } from "../../command";
import { getCurrentLanguageId } from "../../query";
import { translationIdToTranslationMapping } from "../../translation/en";
import { createUILanguageWasSet } from "../../event";

function* handleSetUILanguage(translatorStateSelector: TranslatorStateSelector, command: SetUILanguage): Generator {
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

function* watchSetUiLanguageCommands(translatorStateSelector: TranslatorStateSelector): Generator {
    yield takeEvery(TranslatorCommandTypes.SET_UI_LANGUAGE, handleSetUILanguage, translatorStateSelector);
}

export function createTranslatorSaga(translatorStateSelector: TranslatorStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSetUiLanguageCommands, translatorStateSelector);
    };
}
