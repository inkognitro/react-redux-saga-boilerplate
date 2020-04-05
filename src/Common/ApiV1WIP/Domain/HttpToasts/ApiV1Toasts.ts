import {takeEvery} from "@redux-saga/core/effects";
import {ApiV1EventTypes} from "Common/ApiV1WIP/Domain/Http/Types";
import {COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID} from "Common/Translator/Domain/Translation/en";
import {createShowMessage} from "Common/Toaster/Domain/Command/ShowMessage";
import {ToastTypes} from "Common/Toaster/Domain/Types";
import {TranslatorStateSelector} from "Common/Translator/Domain/Types";
import {getTranslatedText} from "Common/Translator/Domain/Query/TranslatedTextQuery";

//todo!

export function createApiV1HttpToastsSaga(translatorStateSelector: TranslatorStateSelector): Generator {
    takeEvery(ApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED, function * () {
        const foundTranslatedText = getTranslatedText({
            translationId: COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID
        });
        const content = (foundTranslatedText ? foundTranslatedText : 'Could not connect to server.');
        const command = createShowMessage({
            type: ToastTypes.ERROR,
            content: content
        });
    });
}