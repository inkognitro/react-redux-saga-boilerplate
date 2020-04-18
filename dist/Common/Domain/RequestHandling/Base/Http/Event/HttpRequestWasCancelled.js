"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
function createHttpRequestWasCancelled(request) {
    return {
        type: Types_1.HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
        payload: { request }
    };
}
exports.createHttpRequestWasCancelled = createHttpRequestWasCancelled;
//# sourceMappingURL=HttpRequestWasCancelled.js.map