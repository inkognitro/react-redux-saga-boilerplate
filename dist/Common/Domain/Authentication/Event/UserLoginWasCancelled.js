"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserLoginWasCancelled(loginSettings) {
    return {
        type: Types_1.AuthEventTypes.USER_LOGIN_WAS_CANCELLED,
        payload: { loginSettings },
    };
}
exports.createUserLoginWasCancelled = createUserLoginWasCancelled;
//# sourceMappingURL=UserLoginWasCancelled.js.map