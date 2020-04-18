"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiV1Http_1 = require("Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http");
function createSendHttpRequest(request) {
    return {
        type: ApiV1Http_1.ApiV1CommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}
exports.createSendHttpRequest = createSendHttpRequest;
//# sourceMappingURL=SendHttpRequest.js.map