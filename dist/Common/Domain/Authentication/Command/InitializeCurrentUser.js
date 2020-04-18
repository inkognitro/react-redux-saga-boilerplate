"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createInitializeCurrentUser() {
    return {
        type: Types_1.AuthCommandTypes.INITIALIZE_CURRENT_USER,
        payload: undefined,
    };
}
exports.createInitializeCurrentUser = createInitializeCurrentUser;
//# sourceMappingURL=InitializeCurrentUser.js.map