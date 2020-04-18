"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const Types_1 = require("Common/Domain/RequestHandling/ApiV1/Http/Types");
const en_1 = require("Common/Domain/Translator/Translation/en");
const ShowMessage_1 = require("Common/Domain/Toaster/Command/ShowMessage");
const Types_2 = require("Common/Domain/Toaster/Types");
const TranslatedTextQuery_1 = require("Common/Domain/Translator/Query/TranslatedTextQuery");
const apiV1EventTypesToWatch = [
    Types_1.ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED,
    Types_1.ApiV1HttpEventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
];
function createApiV1HttpToastsFlow(translatorStateSelector) {
    return function* () {
        yield effects_1.takeEvery(apiV1EventTypesToWatch, function* (event) {
            const translatorState = effects_1.select(translatorStateSelector);
            if (event.type === Types_1.ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED) {
                const content = TranslatedTextQuery_1.findTranslatedText(translatorState, {
                    translationId: en_1.COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID
                });
                effects_1.put(ShowMessage_1.createShowMessage({
                    id: en_1.COULD_NOT_CONNECT_TO_SERVER_TRANSLATION_ID,
                    toastType: Types_2.ToastTypes.ERROR,
                    content: (content ? content : 'Could not connect to server.'),
                }));
                return;
            }
            const messages = event.payload.response.body.generalMessages;
            if (!messages) {
                return;
            }
            for (let index in messages) {
                const message = messages[index];
                const content = TranslatedTextQuery_1.findTranslatedText(translatorState, {
                    translationId: message.translationId,
                    placeholders: message.placeholders,
                });
                effects_1.put(ShowMessage_1.createShowMessage({
                    id: message.id,
                    toastType: getToastTypeByMessageType(message.type),
                    content: (content ? content : message.defaultText),
                }));
            }
        });
    };
}
exports.createApiV1HttpToastsFlow = createApiV1HttpToastsFlow;
function getToastTypeByMessageType(messageType) {
    if (messageType === Types_1.MessageTypes.ERROR) {
        return Types_2.ToastTypes.ERROR;
    }
    if (messageType === Types_1.MessageTypes.SUCCESS) {
        return Types_2.ToastTypes.SUCCESS;
    }
    if (messageType === Types_1.MessageTypes.WARNING) {
        return Types_2.ToastTypes.WARNING;
    }
    return Types_2.ToastTypes.INFO;
}
//# sourceMappingURL=ApiV1Toasts.js.map