"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CurrentAuthUserQuery_1 = require("Common/Domain/Authentication/Query/CurrentAuthUserQuery");
const RequestFactory_1 = require("Common/Domain/RequestHandling/Base/Http/Command/RequestFactory");
const effects_1 = require("@redux-saga/core/effects");
const ApiV1Http_1 = require("Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http");
const SendHttpRequest_1 = require("Common/Domain/RequestHandling/Base/Http/Command/SendHttpRequest");
function createSendHttpRequestFlow(authStateSelector) {
    function getWithAuthTokenEnhancedRequest(authState, request) {
        const authUser = CurrentAuthUserQuery_1.findCurrentAuthUser(authState);
        if (!authUser) {
            return request;
        }
        const headerProperty = 'X-API-TOKEN';
        return RequestFactory_1.createWithHeaderEnhancedHttpRequest(request, headerProperty, authUser.token);
    }
    return function* () {
        yield effects_1.takeEvery(ApiV1Http_1.ApiV1CommandTypes.SEND_HTTP_REQUEST, function* (command) {
            const authState = yield effects_1.select(authStateSelector);
            const request = getWithAuthTokenEnhancedRequest(authState, command.payload.request);
            return yield effects_1.put(SendHttpRequest_1.createSendHttpRequest(request));
        });
    };
}
exports.createSendHttpRequestFlow = createSendHttpRequestFlow;
//# sourceMappingURL=SendHttpRequestHandling.js.map