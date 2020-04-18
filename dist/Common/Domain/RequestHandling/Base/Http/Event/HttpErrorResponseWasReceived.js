"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
function createHttpErrorResponseWasReceived(request, response) {
    return {
        type: Types_1.HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
        payload: { request, response }
    };
}
exports.createHttpErrorResponseWasReceived = createHttpErrorResponseWasReceived;
//# sourceMappingURL=HttpErrorResponseWasReceived.js.map