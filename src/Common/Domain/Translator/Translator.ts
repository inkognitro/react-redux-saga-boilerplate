import { spawn, takeEvery } from "redux-saga/effects";
import { TranslatorCommandTypes, TranslatorStateSelector } from "Common/Domain/Translator/Types";
import { handleSetUILanguage } from "Common/Domain/Translator/Saga/SetUILanguageHandling";

export function createTranslatorSaga(translatorStateSelector: TranslatorStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSetUiLanguageCommands, translatorStateSelector);
    };
}

function* watchSetUiLanguageCommands(translatorStateSelector: TranslatorStateSelector): Generator {
    yield takeEvery(TranslatorCommandTypes.SET_UI_LANGUAGE, handleSetUILanguage, translatorStateSelector);
}
