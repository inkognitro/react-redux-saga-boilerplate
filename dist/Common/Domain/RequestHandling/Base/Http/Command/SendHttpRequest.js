"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
const HttpRequestWasSent_1 = require("Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasSent");
const HttpSuccessResponseWasReceived_1 = require("Common/Domain/RequestHandling/Base/Http/Event/HttpSuccessResponseWasReceived");
const HttpErrorResponseWasReceived_1 = require("Common/Domain/RequestHandling/Base/Http/Event/HttpErrorResponseWasReceived");
const HttpRequestQuery_1 = require("Common/Domain/RequestHandling/Base/Http/Query/HttpRequestQuery");
const HttpRequestWasNotSent_1 = require("Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasNotSent");
const HttpRequestFailed_1 = require("Common/Domain/RequestHandling/Base/Http/Event/HttpRequestFailed");
const HttpRequestWasCancelled_1 = require("Common/Domain/RequestHandling/Base/Http/Event/HttpRequestWasCancelled");
function createWatchSendHttpRequestFlow(httpStateSelector, requestDispatcher) {
    const handleSendHttpRequest = function* (command) {
        const httpState = yield effects_1.select(httpStateSelector);
        if (HttpRequestQuery_1.findRunningHttpRequestById(httpState, command.payload.request.id)) {
            effects_1.put(HttpRequestWasNotSent_1.createHttpRequestWasNotSent(command.payload.request, HttpRequestWasNotSent_1.Reasons.REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING));
            return;
        }
        yield effects_1.put(HttpRequestWasSent_1.createRequestWasSent(command.payload.request));
        try {
            const requestResponse = yield effects_1.call(requestDispatcher.executeRequest, command.payload.request);
            if (!requestResponse.response) {
                yield effects_1.put(HttpRequestFailed_1.createHttpRequestFailed(requestResponse.request));
                return;
            }
            if (requestResponse.response.statusCode !== 200) {
                yield effects_1.put(HttpErrorResponseWasReceived_1.createHttpErrorResponseWasReceived(requestResponse.request, requestResponse.response));
                return;
            }
            yield effects_1.put(HttpSuccessResponseWasReceived_1.createHttpSuccessResponseWasReceived(requestResponse.request, requestResponse.response));
            return;
        }
        finally {
            if (yield effects_1.cancelled()) {
                yield effects_1.put(HttpRequestWasCancelled_1.createHttpRequestWasCancelled(command.payload.request));
            }
        }
    };
    return function* () {
        yield effects_1.takeEvery(Types_1.HttpRequestHandlerCommandTypes.SEND_HTTP_REQUEST, handleSendHttpRequest);
    };
}
exports.createWatchSendHttpRequestFlow = createWatchSendHttpRequestFlow;
function createSendHttpRequest(request) {
    return {
        type: Types_1.HttpRequestHandlerCommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}
exports.createSendHttpRequest = createSendHttpRequest;
//# sourceMappingURL=SendHttpRequest.js.map