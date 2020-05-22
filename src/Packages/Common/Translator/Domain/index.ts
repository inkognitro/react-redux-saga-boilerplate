import { spawn, takeEvery } from "redux-saga/effects";
import { TranslatorCommandTypes, TranslatorStateSelector } from "Packages/Common/Translator/Domain/Types";
import { handleSetUILanguage } from "Packages/Common/Translator/Domain/Saga/SetUILanguageHandling";

export function createTranslatorSaga(translatorStateSelector: TranslatorStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(watchSetUiLanguageCommands, translatorStateSelector);
    };
}

function* watchSetUiLanguageCommands(translatorStateSelector: TranslatorStateSelector): Generator {
    yield takeEvery(TranslatorCommandTypes.SET_UI_LANGUAGE, handleSetUILanguage, translatorStateSelector);
}
