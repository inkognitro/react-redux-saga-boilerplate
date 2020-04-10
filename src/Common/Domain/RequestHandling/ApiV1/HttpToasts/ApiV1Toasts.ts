import {takeEvery, put, select} from "@redux-saga/core/effects";
import {ApiV1HttpEventTypes, MessageTypes} from "Common/Domain/RequestHandling/ApiV1/Http/Types";
import {COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID} from "Common/Domain/Translator/Translation/en";
import {createShowMessage} from "Common/Domain/Toaster/Command/ShowMessage";
import {ToastTypes} from "Common/Domain/Toaster/Types";
import {TranslatorState, TranslatorStateSelector} from "Common/Domain/Translator/Types";
import {findTranslatedText} from "Common/Domain/Translator/Query/TranslatedTextQuery";
import {ApiV1HttpConnectionFailed} from "Common/Domain/RequestHandling/ApiV1/Http/Event/ApiV1HttpConnectionFailed";
import {ApiV1HttpResponseWasReceived} from "Common/Domain/RequestHandling/ApiV1/Http/Event/ApiV1HttpResponseWasReceived";

const apiV1EventTypesToWatch = [
    ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED,
    ApiV1HttpEventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
];

type ApiV1Event = (ApiV1HttpConnectionFailed | ApiV1HttpResponseWasReceived)

export function createApiV1HttpToastsSaga(translatorStateSelector: TranslatorStateSelector): () => Generator {
    return function* watchApiV1Events(): Generator {
        yield takeEvery(apiV1EventTypesToWatch, function * (event: ApiV1Event) {
            //@ts-ignore
            const translatorState: TranslatorState = select(translatorStateSelector);
            if(event.type === ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED) {
                const content = findTranslatedText(translatorState, {
                    translationId: COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID
                });
                put(createShowMessage({
                    id: COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID,
                    toastType: ToastTypes.ERROR,
                    content: (content ? content : 'Could not connect to server.'),
                }));
                return;
            }
            const messages = event.payload.response.body.generalMessages;
            if(!messages) {
                return;
            }
            for(let index in messages) {
                const message = messages[index];
                const content = findTranslatedText(translatorState, {
                    translationId: message.translationId,
                    placeholders: message.placeholders,
                });
                put(createShowMessage({
                    id: message.id,
                    toastType: getToastTypeByMessageType(message.type),
                    content: (content ? content : message.defaultText),
                }));
            }
        });
    };
}

function getToastTypeByMessageType(messageType: MessageTypes) {
    if (messageType === MessageTypes.ERROR) {
        return ToastTypes.ERROR
    }
    if (messageType === MessageTypes.SUCCESS) {
        return ToastTypes.SUCCESS
    }
    if (messageType === MessageTypes.WARNING) {
        return ToastTypes.WARNING
    }
    return ToastTypes.INFO;
}