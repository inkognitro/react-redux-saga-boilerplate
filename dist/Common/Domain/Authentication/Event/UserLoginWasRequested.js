"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserLoginWasStarted(payload) {
    return {
        type: Types_1.AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
        payload: payload,
    };
}
exports.createUserLoginWasStarted = createUserLoginWasStarted;
//# sourceMappingURL=UserLoginWasRequested.js.map