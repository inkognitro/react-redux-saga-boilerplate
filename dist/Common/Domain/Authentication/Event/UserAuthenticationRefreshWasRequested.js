"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createUserAuthenticationRefreshWasRequested(authUser) {
    return {
        type: Types_1.AuthEventTypes.USER_AUTHENTICATION_REFRESH_WAS_REQUESTED,
        payload: { authUser },
    };
}
exports.createUserAuthenticationRefreshWasRequested = createUserAuthenticationRefreshWasRequested;
//# sourceMappingURL=UserAuthenticationRefreshWasRequested.js.map