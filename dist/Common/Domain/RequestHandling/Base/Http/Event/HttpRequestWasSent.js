"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
function createRequestWasSent(request) {
    return {
        type: Types_1.HttpEventTypes.HTTP_REQUEST_WAS_SENT,
        payload: {
            request: request
        }
    };
}
exports.createRequestWasSent = createRequestWasSent;
//# sourceMappingURL=HttpRequestWasSent.js.map