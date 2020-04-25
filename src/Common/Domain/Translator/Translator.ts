import { spawn } from "redux-saga/effects";
import { TranslatorStateSelector } from "Common/Domain/Translator/Types";
import { createWatchSetUILanguageFlow } from "Common/Domain/Translator/Saga/Flow/SetUILanguageHandling";

export function createTranslatorFlow(translatorStateSelector: TranslatorStateSelector): () => Generator {
    return function* (): Generator {
        yield spawn(createWatchSetUILanguageFlow(translatorStateSelector));
    };
}
