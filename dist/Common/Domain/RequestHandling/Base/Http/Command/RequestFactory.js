"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
const v4_1 = __importDefault(require("uuid/v4"));
function createGetRequest(settings) {
    return createHttpRequest(settings, Types_1.HttpRequestMethods.GET);
}
exports.createGetRequest = createGetRequest;
function createPostRequest(settings) {
    return createHttpRequest(settings, Types_1.HttpRequestMethods.POST);
}
exports.createPostRequest = createPostRequest;
function createPutRequest(settings) {
    return createHttpRequest(settings, Types_1.HttpRequestMethods.PUT);
}
exports.createPutRequest = createPutRequest;
function createPatchRequest(settings) {
    return createHttpRequest(settings, Types_1.HttpRequestMethods.PATCH);
}
exports.createPatchRequest = createPatchRequest;
function createDeleteRequest(settings) {
    return createHttpRequest(settings, Types_1.HttpRequestMethods.DELETE);
}
exports.createDeleteRequest = createDeleteRequest;
function createWithHeaderEnhancedHttpRequest(request, headerProperty, headerValue) {
    return Object.assign(Object.assign({}, request), { headers: Object.assign(Object.assign({}, request.headers), { [headerProperty]: headerValue }) });
}
exports.createWithHeaderEnhancedHttpRequest = createWithHeaderEnhancedHttpRequest;
function createHttpRequest(settings, method) {
    return {
        id: (settings.id ? settings.id : v4_1.default()),
        method: method,
        url: settings.url,
        queryParameters: (settings.queryParameters ? settings.queryParameters : {}),
        headers: (settings.headers ? settings.headers : {}),
        isLoaderEnabled: (settings.isLoaderEnabled ? settings.isLoaderEnabled : false),
        body: (settings.body ? settings.body : undefined),
    };
}
//# sourceMappingURL=RequestFactory.js.map