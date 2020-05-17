import { put, takeEvery } from "redux-saga/effects";
import { HttpApiV1EventTypes } from "Packages/Common/Domain/HttpApiV1/Types";
import { COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID } from "Packages/Common/Domain/Translator/Translation/en";
import { createShowMessage } from "Packages/Common/Domain/Toaster/Command/ShowMessage";
import { ToastTypes } from "Packages/Common/Domain/Toaster/Types";
import { ApiV1HttpConnectionFailed } from "Packages/Common/Domain/HttpApiV1/Event/ApiV1HttpConnectionFailed";
import { ApiV1HttpResponseWasReceived } from "Packages/Common/Domain/HttpApiV1/Event/ApiV1HttpResponseWasReceived";
import {MessageTypes} from "Packages/Common/Domain/Types";

const apiV1EventTypesToWatch = [
    HttpApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED,
    HttpApiV1EventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
];

type ApiV1Event = ApiV1HttpConnectionFailed | ApiV1HttpResponseWasReceived;

export function createHttpApiV1ToasterSaga(): () => Generator { // todo: integrate in a way that this can be enabled or disabled
    return function* (): Generator {
        yield takeEvery(apiV1EventTypesToWatch, function* (event: ApiV1Event) {
            // @ts-ignore
            if (event.type === HttpApiV1EventTypes.API_V1_HTTP_CONNECTION_FAILED) {
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
