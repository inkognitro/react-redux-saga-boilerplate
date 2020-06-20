import { spawn, takeEvery } from "redux-saga/effects";
import { TranslatorStateSelector } from "../../Types";
import { handleSetUILanguage } from "./SetUILanguageHandling";
import { TranslatorCommandTypes } from "../../Command/Types";

function* watchSetUiLanguageCommands(translatorStateSelector: TranslatorStateSelector): Generator {
    yield takeEvery(TranslatorCommandTypes.SET_UI_LANGUAGE, handleSetUILanguage, translatorStateSelector);
}

export function createTranslatorSaga(translatorStateSelector: TranslatorStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSetUiLanguageCommands, translatorStateSelector);
    };
}
