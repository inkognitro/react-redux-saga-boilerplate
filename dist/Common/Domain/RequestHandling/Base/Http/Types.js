"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpRequestMethods;
(function (HttpRequestMethods) {
    HttpRequestMethods["GET"] = "GET";
    HttpRequestMethods["POST"] = "POST";
    HttpRequestMethods["PUT"] = "PUT";
    HttpRequestMethods["PATCH"] = "PATCH";
    HttpRequestMethods["DELETE"] = "DELETE";
})(HttpRequestMethods = exports.HttpRequestMethods || (exports.HttpRequestMethods = {}));
var HttpEventTypes;
(function (HttpEventTypes) {
    HttpEventTypes["HTTP_REQUEST_WAS_SENT"] = "HTTP_REQUEST_WAS_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc";
    HttpEventTypes["HTTP_REQUEST_WAS_NOT_SENT"] = "HTTP_REQUEST_WAS_NOT_SENT-27fd0173-f640-46ce-8881-516cdf5c41fc";
    HttpEventTypes["HTTP_SUCCESS_RESPONSE_WAS_RECEIVED"] = "HTTP_SUCCESS_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc";
    HttpEventTypes["HTTP_ERROR_RESPONSE_WAS_RECEIVED"] = "HTTP_ERROR_RESPONSE_WAS_RECEIVED-27fd0173-f640-46ce-8881-516cdf5c41fc";
    HttpEventTypes["HTTP_REQUEST_FAILED"] = "HTTP_REQUEST_FAILED-27fd0173-f640-46ce-8881-516cdf5c41fc";
    HttpEventTypes["HTTP_REQUEST_WAS_CANCELLED"] = "HTTP_REQUEST_WAS_CANCELLED-27fd0173-f640-46ce-8881-516cdf5c41fc";
})(HttpEventTypes = exports.HttpEventTypes || (exports.HttpEventTypes = {}));
var HttpRequestHandlerCommandTypes;
(function (HttpRequestHandlerCommandTypes) {
    HttpRequestHandlerCommandTypes["SEND_HTTP_REQUEST"] = "SEND_HTTP_REQUEST-639d43a1-e8dd-426d-a868-5079aa60d064";
})(HttpRequestHandlerCommandTypes = exports.HttpRequestHandlerCommandTypes || (exports.HttpRequestHandlerCommandTypes = {}));
//# sourceMappingURL=Types.js.map