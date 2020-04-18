"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createLogout() {
    return {
        type: Types_1.AuthCommandTypes.LOGOUT,
        payload: undefined,
    };
}
exports.createLogout = createLogout;
//# sourceMappingURL=Logout.js.map