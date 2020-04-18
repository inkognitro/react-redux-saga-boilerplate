"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const SendHttpRequest_1 = require("Common/Domain/RequestHandling/Base/Http/Command/SendHttpRequest");
function createHttpFlow(httpStateSelector, httpRequestDispatcher) {
    return function* () {
        yield effects_1.spawn(SendHttpRequest_1.createWatchSendHttpRequestFlow(httpStateSelector, httpRequestDispatcher));
    };
}
exports.createHttpFlow = createHttpFlow;
//# sourceMappingURL=Http.js.map