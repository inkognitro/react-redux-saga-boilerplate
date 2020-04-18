"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Authentication/Types");
function createLogin(settings) {
    return {
        type: Types_1.AuthCommandTypes.LOGIN,
        payload: settings,
    };
}
exports.createLogin = createLogin;
//# sourceMappingURL=Login.js.map