"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/ApiV1/Http/Types");
function createApiV1HttpConnectionFailed(request) {
    return {
        type: Types_1.ApiV1HttpEventTypes.API_V1_HTTP_CONNECTION_FAILED,
        payload: { request }
    };
}
exports.createApiV1HttpConnectionFailed = createApiV1HttpConnectionFailed;
//# sourceMappingURL=ApiV1HttpConnectionFailed.js.map