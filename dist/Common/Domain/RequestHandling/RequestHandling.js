"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const ApiV1Http_1 = require("Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http");
const ApiV1Toasts_1 = require("Common/Domain/RequestHandling/ApiV1/HttpToasts/ApiV1Toasts");
const Http_1 = require("Common/Domain/RequestHandling/Base/Http/Http");
function createRequestHandlingFlow(httpStateSelector, httpRequestDispatcher, authStateSelector, translatorStateSelector) {
    return function* () {
        yield effects_1.spawn(Http_1.createHttpFlow(httpStateSelector, httpRequestDispatcher));
        yield effects_1.spawn(ApiV1Http_1.createApiV1HttpFlow(authStateSelector));
        yield effects_1.spawn(ApiV1Toasts_1.createApiV1HttpToastsFlow(translatorStateSelector));
    };
}
exports.createRequestHandlingFlow = createRequestHandlingFlow;
//# sourceMappingURL=RequestHandling.js.map