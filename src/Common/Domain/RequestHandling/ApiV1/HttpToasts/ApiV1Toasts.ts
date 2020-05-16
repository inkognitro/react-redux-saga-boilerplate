import { put, takeEvery } from "redux-saga/effects";
import { ApiV1HttpEventTypes } from "Common/Domain/RequestHandling/ApiV1/Http/Types";
import { COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID } from "Common/Domain/Translator/Translation/en";
import { createShowMessage } from "Common/Domain/Toaster/Command/ShowMessage";
import { ToastTypes } from "Common/Domain/Toaster/Types";
import { ApiV1HttpConnectionFailed } from "Common/Domain/RequestHandling/ApiV1/Http/Event/ApiV1HttpConnectionFailed";
import { ApiV1HttpResponseWasReceived } from "Common/Domain/RequestHandling/ApiV1/Http/Event/ApiV1HttpResponseWasReceived";
import { MessageTypes } from "Common/Domain/Model/Message";

const apiV1EventTypesToWatch = [
    ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED,
    ApiV1HttpEventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
];

type ApiV1Event = ApiV1HttpConnectionFailed | ApiV1HttpResponseWasReceived;

export function createApiV1HttpToastsSaga(): () => Generator {
    return function* (): Generator {
        yield takeEvery(apiV1EventTypesToWatch, function* (event: ApiV1Event) {
            // @ts-ignore
            if (event.type === ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED) {
                yield put(
                    createShowMessage({
                        id: COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID,
                        toastType: ToastTypes.ERROR,
                        content: {
                            translationId: COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID,
                            fallback: 'Could not connect to server.',
                        },
                    }),
                );
                return;
            }
            const messages = event.payload.response.body.generalMessages;
            if (!messages) {
                return;
            }
            for (const index in messages) {
                const message = messages[index];
                yield put(
                    createShowMessage({
                        id: message.id,
                        toastType: getToastTypeByMessageType(message.type),
                        content: message.content,
                    }),
                );
            }
        });
    };
}

function getToastTypeByMessageType(messageType: MessageTypes) {
    if (messageType === MessageTypes.ERROR) {
        return ToastTypes.ERROR;
    }
    if (messageType === MessageTypes.SUCCESS) {
        return ToastTypes.SUCCESS;
    }
    if (messageType === MessageTypes.WARNING) {
        return ToastTypes.WARNING;
    }
    return ToastTypes.INFO;
}
