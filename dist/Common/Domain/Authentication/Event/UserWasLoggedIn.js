"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserWasLoggedIn(authUser) {
    return {
        type: Types_1.AuthEventTypes.USER_WAS_LOGGED_IN,
        payload: { authUser }
    };
}
exports.createUserWasLoggedIn = createUserWasLoggedIn;
//# sourceMappingURL=UserWasLoggedIn.js.map