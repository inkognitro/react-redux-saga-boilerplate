"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/RequestHandling/Base/Http/Types");
var Reasons;
(function (Reasons) {
    Reasons["REQUEST_WITH_SAME_ID_IS_ALREADY_RUNNING"] = "requestWithSameIdIsAlreadyRunning";
})(Reasons = exports.Reasons || (exports.Reasons = {}));
function createHttpRequestWasNotSent(request, reason) {
    return {
        type: Types_1.HttpEventTypes.HTTP_REQUEST_WAS_NOT_SENT,
        payload: {
            request: request,
            reason: reason
        }
    };
}
exports.createHttpRequestWasNotSent = createHttpRequestWasNotSent;
//# sourceMappingURL=HttpRequestWasNotSent.js.map