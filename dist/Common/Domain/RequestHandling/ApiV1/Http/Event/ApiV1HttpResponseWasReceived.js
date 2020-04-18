"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/ApiV1/Http/Types");
function createApiV1HttpResponseWasReceived(request, response) {
    return {
        type: Types_1.ApiV1HttpEventTypes.API_V1_HTTP_RESPONSE_WAS_RECEIVED,
        payload: { request, response }
    };
}
exports.createApiV1HttpResponseWasReceived = createApiV1HttpResponseWasReceived;
//# sourceMappingURL=ApiV1HttpResponseWasReceived.js.map