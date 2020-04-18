"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserAuthenticationWasRefreshed(authUser, previousAuthUser) {
    return {
        type: Types_1.AuthEventTypes.USER_AUTHENTICATION_WAS_REFRESHED,
        payload: { authUser, previousAuthUser }
    };
}
exports.createUserAuthenticationWasRefreshed = createUserAuthenticationWasRefreshed;
//# sourceMappingURL=UserAuthenticationWasRefreshed.js.map