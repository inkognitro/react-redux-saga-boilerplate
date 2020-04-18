"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
const effects_1 = require("@redux-saga/core/effects");
const httpRequestExecutionEndingEventTypes = [
    Types_1.HttpEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
    Types_1.HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
    Types_1.HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
    Types_1.HttpEventTypes.HTTP_REQUEST_FAILED,
    Types_1.HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
];
function* receiveHttpResponse(request) {
    let requestId = null;
    let event = null;
    while (requestId !== request.id) {
        event = yield effects_1.take(httpRequestExecutionEndingEventTypes);
        requestId = event.payload.request.id;
    }
    const eventToUse = event;
    if (eventToUse.type === Types_1.HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED) {
        return eventToUse.payload.response;
    }
    if (eventToUse.type === Types_1.HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED) {
        return eventToUse.payload.response;
    }
    return null;
}
exports.receiveHttpResponse = receiveHttpResponse;
//# sourceMappingURL=HttpResponseReceiving.js.map