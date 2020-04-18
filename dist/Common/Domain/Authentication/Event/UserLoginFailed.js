"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserLoginFailed(loginSettings) {
    return {
        type: Types_1.AuthEventTypes.USER_LOGIN_FAILED,
        payload: { loginSettings }
    };
}
exports.createUserLoginFailed = createUserLoginFailed;
//# sourceMappingURL=UserLoginFailed.js.map