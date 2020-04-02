import {ToasterStateSelector} from "Common/Toaster/Domain/Types";

export enum TranslatorCommandTypes {
    SET_UI_LANGUAGE = 'SET_UI_LANGUAGE-42486f3c-e848-4371-810e-5c55d3cce2a6',
}

export function createTranslatorSaga(toasterStateSelector: ToasterStateSelector): () => Generator {
    return function* translatorSaga() {

    }
}