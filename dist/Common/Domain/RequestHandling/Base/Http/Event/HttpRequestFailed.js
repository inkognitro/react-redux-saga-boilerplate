"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
function createHttpRequestFailed(request) {
    return {
        type: Types_1.HttpEventTypes.HTTP_REQUEST_FAILED,
        payload: { request }
    };
}
exports.createHttpRequestFailed = createHttpRequestFailed;
//# sourceMappingURL=HttpRequestFailed.js.map