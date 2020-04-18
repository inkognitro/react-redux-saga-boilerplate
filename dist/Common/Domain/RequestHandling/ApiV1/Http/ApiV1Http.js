"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const SendHttpRequestHandling_1 = require("Common/Domain/RequestHandling/ApiV1/Http/Saga/Flow/SendHttpRequestHandling");
var ApiV1CommandTypes;
(function (ApiV1CommandTypes) {
    ApiV1CommandTypes["SEND_HTTP_REQUEST"] = "SEND_HTTP_REQUEST-47406dac-1dc9-4831-a20a-ac917a944ddb";
})(ApiV1CommandTypes = exports.ApiV1CommandTypes || (exports.ApiV1CommandTypes = {}));
exports.apiV1BaseUrl = '//localhost:9000';
function createApiV1HttpFlow(authStateSelector) {
    return function* () {
        yield effects_1.spawn(SendHttpRequestHandling_1.createSendHttpRequestFlow(authStateSelector));
    };
}
exports.createApiV1HttpFlow = createApiV1HttpFlow;
//# sourceMappingURL=ApiV1Http.js.map