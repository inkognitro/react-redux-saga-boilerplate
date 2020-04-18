"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserWasLoggedOut() {
    return {
        type: Types_1.AuthEventTypes.USER_WAS_LOGGED_OUT,
        payload: undefined
    };
}
exports.createUserWasLoggedOut = createUserWasLoggedOut;
//# sourceMappingURL=UserWasLoggedOut.js.map