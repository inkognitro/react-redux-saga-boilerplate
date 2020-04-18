"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
function createHttpSuccessResponseWasReceived(request, response) {
    return {
        type: Types_1.HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
        payload: { request, response }
    };
}
exports.createHttpSuccessResponseWasReceived = createHttpSuccessResponseWasReceived;
//# sourceMappingURL=HttpSuccessResponseWasReceived.js.map