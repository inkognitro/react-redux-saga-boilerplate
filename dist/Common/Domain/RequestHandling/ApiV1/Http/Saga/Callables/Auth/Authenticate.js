"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiV1Http_1 = require("Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http");
const effects_1 = require("@redux-saga/core/effects");
const RequestFactory_1 = require("Common/Domain/RequestHandling/Base/Http/Command/RequestFactory");
const SendHttpRequest_1 = require("Common/Domain/RequestHandling/ApiV1/Http/Command/SendHttpRequest");
const HttpResponseReceiving_1 = require("Common/Domain/RequestHandling/Base/Http/Saga/Callables/HttpResponseReceiving");
var ResponseDataTypes;
(function (ResponseDataTypes) {
    ResponseDataTypes["SUCCESS"] = "success";
    ResponseDataTypes["ERROR"] = "error";
})(ResponseDataTypes = exports.ResponseDataTypes || (exports.ResponseDataTypes = {}));
function* authenticate(settings) {
    const request = RequestFactory_1.createPostRequest({
        url: ApiV1Http_1.apiV1BaseUrl + '/auth/authenticate',
        body: {
            username: settings.username,
            password: settings.password,
        },
        isLoaderEnabled: settings.isLoaderEnabled,
    });
    yield effects_1.put(SendHttpRequest_1.createSendHttpRequest(request));
    const response = yield effects_1.call(HttpResponseReceiving_1.receiveHttpResponse, request);
    if (!response) {
        return null;
    }
    if (response.statusCode === 200) {
        return {
            type: ResponseDataTypes.SUCCESS,
            token: response.body.data.token,
            user: response.body.data.user,
        };
    }
    return {
        type: ResponseDataTypes.ERROR,
    };
}
exports.authenticate = authenticate;
//# sourceMappingURL=Authenticate.js.map