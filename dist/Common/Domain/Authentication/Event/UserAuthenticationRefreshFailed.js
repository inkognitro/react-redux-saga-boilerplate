"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserAuthenticationRefreshFailed(payload) {
    return {
        type: Types_1.AuthEventTypes.USER_AUTHENTICATION_REFRESH_FAILED,
        payload: payload
    };
}
exports.createUserAuthenticationRefreshFailed = createUserAuthenticationRefreshFailed;
//# sourceMappingURL=UserAuthenticationRefreshFailed.js.map